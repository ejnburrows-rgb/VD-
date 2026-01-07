export const runtime = 'nodejs';

const UA_LIST: string[] = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0) Gecko/20100101 Firefox/119.0',
];
const pickUA = (): string => UA_LIST[Math.floor(Math.random() * UA_LIST.length)];

function parseVideoId(input: string | null | undefined): string | null {
  if (!input) return null;
  const s = String(input);
  const q = s.match(/[?&]v=([\w-]{11})/); if (q) return q[1];
  const short = s.match(/youtu\.be\/([\w-]{11})/); if (short) return short[1];
  const id = s.match(/^[\w-]{11}$/); return id ? id[0] : null;
}

function htmlEntityDecode(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9A-Fa-f]+);/g, (_: string, hex: string) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_: string, num: string) => String.fromCharCode(parseInt(num, 10)));
}

type TranscriptItem = { text: string; start: number; duration: number };

type FetchResult = { body: string; contentType: string };

async function proxiedFetch(targetUrl: string, extraHeaders: Record<string,string> = {}): Promise<FetchResult> {
  const proxy = (process.env.PROXY_FETCH_URL || '').trim();
  const headers: Record<string, string> = {
    'User-Agent': pickUA(),
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'application/json,text/plain,text/xml,text/vtt,text/html,*/*',
    'Accept-Encoding': 'identity',
    ...extraHeaders,
  };
  const url = proxy
    ? (proxy.endsWith('=') ? proxy + encodeURIComponent(targetUrl) : `${proxy}${encodeURIComponent(targetUrl)}`)
    : targetUrl;
  const r = await fetch(url, { headers, method: 'GET', redirect: 'follow' });
  if (!r.ok) throw new Error(`Proxy fetch failed ${r.status}`);
  const ct = r.headers.get('content-type') || '';
  const text = await r.text();
  return { body: text, contentType: ct };
}

function parseXmlTranscript(xml: string): TranscriptItem[] {
  const items: TranscriptItem[] = [];
  const re = /<text\s+[^>]*start=\"([0-9.]+)\"\s+dur=\"([0-9.]+)\"[^>]*>([\s\S]*?)<\/text>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const start = parseFloat(m[1]);
    const duration = parseFloat(m[2]);
    const raw = m[3] || '';
    const text = htmlEntityDecode(raw.replace(/<\/?[^>]+>/g, '').trim());
    if (text) items.push({ text, start, duration });
  }
  return items;
}

function parseVttTimestamp(ts: string): number {
  // hh:mm:ss.mmm or mm:ss.mmm
  const m = ts.trim().match(/^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})[.,](\d{3})$/);
  if (!m) return 0;
  const h = parseInt(m[1] || '0', 10);
  const min = parseInt(m[2], 10);
  const s = parseInt(m[3], 10);
  const ms = parseInt(m[4], 10);
  return h * 3600 + min * 60 + s + ms / 1000;
}

function parseVttTranscript(vtt: string): TranscriptItem[] {
  // Basic WebVTT parser: split cues by blank lines, parse "start --> end" and text lines
  const items: TranscriptItem[] = [];
  const norm = vtt.replace(/\r\n?/g, '\n');
  const parts = norm.split(/\n\n+/);
  for (const part of parts) {
    const lines = part.split('\n').filter(Boolean);
    if (lines.length < 2) continue;
    // Skip WEBVTT header or NOTE blocks
    if (/^WEBVTT/i.test(lines[0]) || /^NOTE/i.test(lines[0])) continue;
    let i = 0;
    // Optional cue identifier on first line: if first line doesn’t contain -->, advance index
    if (!/-->/.test(lines[0]) && lines.length >= 2 && /-->/.test(lines[1])) i = 1;
    const timing = lines[i];
    const tm = timing.match(/([^\s]+)\s*-->\s*([^\s]+)/);
    if (!tm) continue;
    const start = parseVttTimestamp(tm[1]);
    const end = parseVttTimestamp(tm[2]);
    const duration = Math.max(0, end - start);
    const text = lines.slice(i + 1).join(' ').replace(/<\/?[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text) items.push({ text, start, duration });
  }
  return items;
}

// Invidious (inv.nadeko.net) — captions listing and content (JSON/XML/VTT)
async function fetchFromInvidious(videoId: string, lang: string): Promise<TranscriptItem[] | null> {
  const base = 'https://inv.nadeko.net';
  // 1) List available captions
  const listUrl = `${base}/api/v1/captions/${videoId}`;
  const { body: listBody } = await proxiedFetch(listUrl, { 'Accept': 'application/json' });
  const parsed = JSON.parse(listBody);
  const entries: any[] = Array.isArray(parsed) ? parsed : (parsed.captions || []);
  if (!Array.isArray(entries) || entries.length === 0) return null;

  // Prefer exact language, then English auto-generated, then English, then first available
  const lowerLang = lang.toLowerCase();
  let entry =
    entries.find((e: any) => (e.languageCode || e.language || '').toLowerCase() === lowerLang) ||
    entries.find((e: any) => String(e.label || '').toLowerCase().includes('auto-generated')) ||
    entries.find((e: any) => (e.languageCode || e.language || '').toLowerCase().startsWith('en')) ||
    entries[0];

  let capUrl: string = entry?.url || '';
  if (!capUrl) return null;
  if (capUrl.startsWith('/')) capUrl = base + capUrl; // absolute URL

  const { body: capBody, contentType } = await proxiedFetch(capUrl, { 'Accept': 'application/json,text/xml,text/vtt,text/plain,*/*' });
  const ct = (contentType || '').toLowerCase();
  if (ct.includes('json')) {
    const j = JSON.parse(capBody);
    const events: any[] = j.events || [];
    const items: TranscriptItem[] = [];
    for (const ev of events) {
      const start = (ev.tStartMs ?? 0) / 1000; const dur = (ev.dDurationMs ?? 0) / 1000;
      const text = (ev.segs || []).map((s: any) => s.utf8 || '').join('').replace(/\s+/g, ' ').trim();
      if (text) items.push({ text, start, duration: dur });
    }
    if (items.length) return items;
  }
  if (ct.includes('xml') || ct.includes('text/xml')) {
    const items = parseXmlTranscript(capBody);
    if (items.length) return items;
  }
  // Handle VTT or plain text VTT
  if (ct.includes('text/vtt') || ct.includes('text/plain') || capBody.startsWith('WEBVTT')) {
    const items = parseVttTranscript(capBody);
    if (items.length) return items;
  }
  return null;
}

async function handle(req: Request): Promise<Response> {
  const urlObj = new URL(req.url);
  const isGet = req.method === 'GET';
  const urlParam = isGet ? urlObj.searchParams.get('url') : null;
  const videoIdParam = isGet ? urlObj.searchParams.get('videoId') : null;

  let payload: any = {};
  if (!isGet) { try { payload = await req.json(); } catch {} }

  const inputUrl: string | null = isGet ? (urlParam || videoIdParam) : (payload.url || payload.videoId);
  const lang: string = (isGet ? (urlObj.searchParams.get('lang') || undefined) : payload.lang) || (process.env.TRANSCRIBE_DEFAULT_LANG || 'en');

  const videoId = parseVideoId(inputUrl);
  if (!videoId) return new Response(JSON.stringify({ error: 'Invalid or missing videoId/url' }), { status: 400 });

  try {
    const items = await fetchFromInvidious(videoId, lang);
    if (items && items.length > 0) {
      return new Response(JSON.stringify({ videoId, lang, items }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
    return new Response(JSON.stringify({ error: 'No subtitles available or access restricted' }), { status: 404 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'Error de Procesamiento: ' + String(e?.message || e) }), { status: 500 });
  }
}

export async function GET(req: Request): Promise<Response> { return handle(req); }
export async function POST(req: Request): Promise<Response> { return handle(req); }