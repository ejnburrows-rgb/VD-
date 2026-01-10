const functions = require('firebase-functions');
const admin = require('firebase-admin');
const youtubedl = require('youtube-dl-exec');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Cloud Function to extract YouTube audio URL
exports.extractYouTubeAudio = functions
  .runWith({ 
    timeoutSeconds: 540, // 9 min for long videos
    memory: '2GB'
  })
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      // Only allow POST
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      // Validate YouTube URL
      const youtubePattern = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/;
      if (!youtubePattern.test(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
      }

      try {
        console.log('[Firebase] Extracting audio from:', url);

        // Extract video info with yt-dlp
        const info = await youtubedl(url, {
          dumpSingleJson: true,
          noCheckCertificates: true,
          noWarnings: true,
          preferFreeFormats: true,
          addHeader: [
            'referer:youtube.com', 
            'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
          ]
        });

        console.log('[Firebase] Video title:', info.title);
        console.log('[Firebase] Duration:', info.duration, 'seconds');

        // Filter audio-only formats
        const audioFormats = info.formats.filter(f => 
          f.acodec !== 'none' && f.vcodec === 'none' && f.url
        );

        if (audioFormats.length === 0) {
          return res.status(400).json({ 
            error: 'No audio format available for this video' 
          });
        }

        // Sort by bitrate and get best quality
        const bestAudio = audioFormats.sort((a, b) => 
          (b.abr || 0) - (a.abr || 0)
        )[0];

        console.log('[Firebase] Best audio format:', bestAudio.format_id, 'bitrate:', bestAudio.abr);

        return res.status(200).json({
          success: true,
          audioUrl: bestAudio.url, // Direct URL valid for ~6 hours
          duration: info.duration,
          title: info.title,
          format: bestAudio.ext || 'webm',
          bitrate: bestAudio.abr
        });

      } catch (error) {
        console.error('[Firebase] Error:', error.message);
        
        // Handle specific errors
        if (error.message.includes('private')) {
          return res.status(403).json({ 
            error: 'Video is private. Use Texto Directo instead.' 
          });
        }
        
        if (error.message.includes('unavailable')) {
          return res.status(404).json({ 
            error: 'Video not available. Use Texto Directo instead.' 
          });
        }

        return res.status(500).json({ 
          error: 'Could not extract audio: ' + error.message 
        });
      }
    });
  });

// Health check endpoint
exports.health = functions.https.onRequest((req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
