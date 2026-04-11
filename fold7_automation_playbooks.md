# Fold 7 Agent-Like Automation Playbooks
## Galaxy Fold 7 Liquid Automation System — Phase 5

**Device Configuration:** Samsung Galaxy Z Fold 7 (SM-F946U) + Windows PC  
**Automation Stack:** Tasker + MacroDroid + Clipper + Shelter + Mullvad  
**Form Factor:** Dual-monitor mobile command center (not passive phone)

---

## CHAIN 1: Media Capture → AI Summarize (Fold 7 Optimized)

### Overview
Transform YouTube/video content into pinned AI summaries using the Fold 7's dual-screen advantage. Outer screen captures, inner screen displays actionable intelligence.

### Trigger
- **Primary:** Share intent from browser/YouTube ReVanced (outer screen)
- **Secondary:** Voice command "Summarize this" (Google Assistant → Tasker)
- **Tertiary:** NFC tag tap (desk mount) → process clipboard

### Flow Diagram
```
┌─────────────────────────────────────────────────────────────────────────┐
│                         MEDIA → AI PIPELINE                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [Outer Screen]                    [Inner Screen]                       │
│  ┌──────────────┐                  ┌──────────────────────────┐         │
│  │ YouTube      │                  │  Tasker Profile Active   │         │
│  │ ReVanced     │                  │                          │         │
│  │              │   Share Intent   │  ┌────────────────────┐  │         │
│  │  ▶ Video     │ ────────────────▶│  │ Clipper Detects    │  │         │
│  │              │                  │  │ YouTube URL Pattern│  │         │
│  └──────────────┘                  │  └─────────┬──────────┘  │         │
│                                    │            │             │         │
│                                    │            ▼             │         │
│                                    │  ┌────────────────────┐  │         │
│                                    │  │ Tasker: HTTP POST  │  │         │
│                                    │  │ to Local LLM       │  │         │
│                                    │  │ (Termux/Llama.cpp) │  │         │
│                                    │  └─────────┬──────────┘  │         │
│                                    │            │             │         │
│                                    │            ▼             │         │
│                                    │  ┌────────────────────┐  │         │
│                                    │  │ Samsung Notes API  │  │         │
│                                    │  │ → Pin Summary      │  │         │
│                                    │  └─────────┬──────────┘  │         │
│                                    │            │             │         │
│                                    │            ▼             │         │
│                                    │  ┌────────────────────┐  │         │
│                                    │  │  📌 PINNED NOTE    │  │         │
│                                    │  │  [AI Summary]      │  │         │
│                                    │  │  - Key points      │  │         │
│                                    │  │  - Timestamps      │  │         │
│                                    │  │  - Action items    │  │         │
│                                    │  └────────────────────┘  │         │
│                                    └──────────────────────────┘         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Stack
| Component | Role | Source | Risk Band |
|-----------|------|--------|-----------|
| YouTube ReVanced | Ad-free video capture | Appteka (MEDIA_PIPE) | YELLOW |
| Clipper | Clipboard monitor + auto-trigger | Play Store | GREEN |
| Tasker | Automation orchestrator | Play Store | GREEN |
| Termux + Llama.cpp | Local AI inference | F-Droid + GitHub | GREEN |
| Samsung Notes | Pinned summary display | Preinstalled | GREEN |

### Pre-Installation Checklist
- [ ] Create separate Android profile: Settings → System → Multiple users → "Mods"
- [ ] Install Mullvad → Connect to Switzerland (CH-12 or CH-13)
- [ ] Install Shelter → Clone work profile → Install YouTube ReVanced here
- [ ] Install Termux → `pkg install python` → Clone `llama.cpp` → Build
- [ ] Install Clipper → Enable clipboard monitoring → Grant notification access
- [ ] Install Tasker → Import profile (below) → Grant accessibility service

### Tasker Profile Export (XML snippet)
```xml
<TaskerData sr="" dvi="1" tv="6.2.20">
    <Profile sr="prof_media_ai" ve="2">
        <cdate>1711234567890</cdate>
        <clp>true</clp>
        <edate>1711234567890</edate>
        <flags>8</flags>
        <id>1</id>
        <mid sr="inid" ve="2">
            <Code sr="code" ve="2">
                <lhs>%CLIP</lhs>
                <op>1</op>
                <rhs>.*youtube\.com.*|.*youtu\.be.*</rhs>
                <ConditionList sr="if">
                    <Condition sr="c0" ve="3">
                        <lhs>%CLIP</lhs>
                        <op>1</op>
                        <rhs>.*youtube.*</rhs>
                    </Condition>
                </ConditionList>
            </Code>
        </mid>
        <Mum sr="mum" ve="2">
            <MediaAIPipeline sr="MediaAIPipeline" ve="2">
                <Action sr="act0" ve="2">
                    <code>398</code>
                    <Bundle sr="args">
                        <Vals>
                            <pair k="method" v="POST"/>
                            <pair k="url" v="http://localhost:8080/summarize"/>
                            <pair k="body" v='{"url": "%CLIP", "max_length": 500}'/>
                        </Vals>
                    </Bundle>
                </Action>
                <Action sr="act1" ve="2">
                    <code>400</code>
                    <Bundle sr="args">
                        <Vals>
                            <pair k="note_title" v="AI Summary: %CLIP_TITLE"/>
                            <pair k="note_content" v="%http_data"/>
                            <pair k="pin" v="true"/>
                        </Vals>
                    </Bundle>
                </Action>
            </MediaAIPipeline>
        </Mum>
    </Profile>
</TaskerData>
```

### Termux AI Backend Setup
```bash
# Termux commands (run once)
pkg update && pkg upgrade
pkg install python git cmake
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make -j4
pip install flask requests

# Create Flask API (save as ~/api.py)
cat > ~/api.py << 'EOF'
from flask import Flask, request, jsonify
import subprocess
import re

app = Flask(__name__)

def extract_video_id(url):
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})'
    ]
    for p in patterns:
        m = re.search(p, url)
        if m:
            return m.group(1)
    return None

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    url = data.get('url', '')
    video_id = extract_video_id(url)
    
    if not video_id:
        return jsonify({'error': 'Invalid URL'}), 400
    
    # Fetch transcript (requires youtube-transcript-api)
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = ' '.join([t['text'] for t in transcript])
        
        # Run through llama.cpp (quantized model required)
        cmd = [
            './llama.cpp/main', '-m', 'models/llama-2-7b-chat.Q4_K_M.gguf',
            '-p', f'Summarize this video transcript in 5 bullet points:\n\n{text[:4000]}',
            '-n', '256', '--silent'
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        return jsonify({'summary': result.stdout.strip()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)
EOF

# Start API server
python ~/api.py &
```

### Fold 7 UI Layout (by Mode)
| Mode | Outer Screen | Inner Screen | Edge Panel |
|------|-------------|--------------|------------|
| **Capture** | YouTube ReVanced (fullscreen) | Tasker logs (floating window) | Clipper shortcut |
| **Review** | Browser (research) | Samsung Notes (pinned summary, left) + Tasker (right) | Notes widget |
| **DeX** | — | Extended desktop: Left: Notes | Right: Browser | Bottom: Tasker status |

### Security Posture
| Layer | Configuration | Purpose |
|-------|--------------|---------|
| Profile isolation | Separate Android user "Mods" | Contains potential malware |
| VPN | Mullvad (Switzerland, killswitch ON) | Hides YouTube ReVanced traffic |
| Network | Termux localhost only (no external exposure) | Prevents LLM API abuse |
| Permissions | Tasker: Clipboard + Notification only | Least privilege |
| Hash verification | VirusTotal SHA256 check pre-install | Catches trojanized APKs |

### Failure Modes + Recovery
| Failure | Symptom | Recovery |
|---------|---------|----------|
| Clipper not detecting | No Tasker trigger | Re-grant notification access → Reboot |
| Termux API down | HTTP 500 error | `pkill -f api.py` → `python ~/api.py &` |
| Samsung Notes API blocked | Summary not pinned | Grant Tasker storage permission → Retry |
| VPN disconnect | YouTube ReVanced warns | Mullvad auto-reconnect → Pause pipeline |

---

## CHAIN 2: Privacy-First File Sync (No-Root)

### Overview
Automated FTP sync between Fold 7 and Windows PC via USB-C trigger, with VPN killswitch and hash verification. Zero cloud dependency.

### Trigger
- **Primary:** USB connection state change (Tasker USB state)
- **Secondary:** Time-based (8 AM, 6 PM) + WiFi SSID match (home/office)
- **Tertiary:** NFC tag (desk mount) → Force sync

### Flow Diagram
```
┌─────────────────────────────────────────────────────────────────────────┐
│                      PRIVACY FILE SYNC PIPELINE                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [Fold 7]                            [Windows PC]                       │
│  ┌──────────────────────┐            ┌──────────────────────┐           │
│  │  USB Connection      │            │  FTP Client          │           │
│  │  (Tasker Detects)    │            │  (WinSCP CLI)        │           │
│  │         │            │            │         │            │           │
│  │         ▼            │            │         ▼            │           │
│  │  ┌────────────────┐  │            │  ┌────────────────┐  │           │
│  │  │ Mullvad        │  │            │  │  Scheduled     │  │           │
│  │  │ Killswitch ON  │  │            │  │  Task:         │  │           │
│  │  └────────┬───────┘  │            │  │  winscp.com    │  │           │
│  │           │          │            │  └────────┬───────┘  │           │
│  │           ▼          │            │           │          │           │
│  │  ┌────────────────┐  │            │           │          │           │
│  │  │ Solid Explorer │  │◀───FTP───▶ │           │          │           │
│  │  │ Mod (FTP Srv)  │  │  (SSE)     │           │          │           │
│  │  └────────┬───────┘  │            │           │          │           │
│  │           │          │            │           │          │           │
│  │           ▼          │            │           │          │           │
│  │  ┌────────────────┐  │            │           │          │           │
│  │  │ SHA256 Verify  │  │            │  ┌────────────────┐  │           │
│  │  │ Cryptomator    │  │            │  │  Drop Files    │  │           │
│  │  │ Journal Log    │  │            │  │  → FTP Folder  │  │           │
│  │  └────────────────┘  │            │  └────────────────┘  │           │
│  └──────────────────────┘            └──────────────────────┘           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Stack
| Component | Role | Source | Risk Band |
|-----------|------|--------|-----------|
| Solid Explorer Mod | FTP server + SMB client | Appteka (FILE_MANAGER) | YELLOW |
| Tasker | USB trigger + VPN control | Play Store | GREEN |
| Mullvad | VPN with killswitch | Play Store | GREEN |
| Cryptomator | Client-side encryption | F-Droid | GREEN |
| WinSCP (Windows) | FTP client + scripting | winscp.net | GREEN |

### Pre-Installation Checklist
- [ ] Install Solid Explorer Mod → Enable FTP server (Settings → FTP)
- [ ] Configure FTP: Port 2222, Authentication ON, Encryption (SFTP preferred)
- [ ] Install Tasker → Import USB sync profile → Grant device admin
- [ ] Install Mullvad → Enable killswitch → Allow LAN (for FTP)
- [ ] Install Cryptomator → Create vault at `/storage/emulated/0/Encrypted/`
- [ ] Windows: Install WinSCP → Create saved session "Fold7" (SFTP, port 2222)

### Tasker Profile: USB Sync Trigger
```xml
<TaskerData sr="" dvi="1" tv="6.2.20">
    <Profile sr="prof_usb_sync" ve="2">
        <cdate>1711234567890</cdate>
        <clp>true</clp>
        <edate>1711234567890</edate>
        <flags>8</flags>
        <id>2</id>
        <mid sr="inid" ve="2">
            <State sr="state" ve="2">
                <code>109</code>
                <Int sr="arg0" val="2"/>  <!-- Connected -->
            </State>
        </mid>
        <Mum sr="mum" ve="2">
            <USBSyncPipeline sr="USBSyncPipeline" ve="2">
                <Action sr="act0" ve="2">
                    <code>547</code>
                    <Str sr="arg0" ve="2">[SYNC] USB connected → Enabling FTP</Str>
                    <Int sr="arg1" val="1"/>
                </Action>
                <Action sr="act1" ve="2">
                    <code>1232053754</code>
                    <Bundle sr="args">
                        <Vals>
                            <pair k="intent_action" v="com.solidexplorer.START_FTP"/>
                            <pair k="intent_class" v="com.solidexplorer.ftp.FtpService"/>
                        </Vals>
                    </Bundle>
                </Action>
                <Action sr="act2" ve="2">
                    <code>1232053754</code>
                    <Bundle sr="args">
                        <Vals>
                            <pair k="intent_action" v="se.mullvad.android.action.CONNECT"/>
                        </Vals>
                    </Bundle>
                </Action>
                <Action sr="act3" ve="2">
                    <code>398</code>
                    <Bundle sr="args">
                        <Vals>
                            <pair k="method" v="GET"/>
                            <pair k="url" v="http://localhost:2222/api/hash?path=/Encrypted"/>
                        </Vals>
                    </Bundle>
                </Action>
                <Action sr="act4" ve="2">
                    <code>547</code>
                    <Str sr="arg0" ve="2">[SYNC] Hash verified: %http_data</Str>
                    <Int sr="arg1" val="1"/>
                </Action>
            </USBSyncPipeline>
        </Mum>
    </Profile>
</TaskerData>
```

### Windows WinSCP Script (sync.bat)
```batch
@echo off
REM WinSCP automated sync script (scheduled via Task Scheduler)
REM Usage: sync.bat [local_folder] [remote_folder]

set LOCAL_FOLDER=%~1
set REMOTE_FOLDER=%~2
set FTP_HOST=localhost
set FTP_PORT=2222
set FTP_USER=ftpuser
set FTP_PASS=ftppassword

"C:\Program Files (x86)\WinSCP\WinSCP.com" /command ^
    "open sftp://%FTP_USER%:%FTP_PASS%@%FTP_HOST%:%FTP_PORT%/" ^
    "synchronize remote %LOCAL_FOLDER% %REMOTE_FOLDER%" ^
    "exit"

echo [%DATE% %TIME%] Sync completed >> C:\logs\fold7_sync.log
```

### Fold 7 UI Layout (by Mode)
| Mode | Outer Screen | Inner Screen | Edge Panel |
|------|-------------|--------------|------------|
| **Sync Active** | Mullvad status (fullscreen) | Solid Explorer (sync folder view) | Tasker shortcut |
| **Idle** | Always-on display (clock) | — | Mullvad + Tasker widgets |
| **DeX** | — | Extended desktop: Left: Solid Explorer | Right: File history log |

### Security Posture
| Layer | Configuration | Purpose |
|-------|--------------|---------|
| VPN killswitch | Mullvad (LAN allowed, block internet) | FTP works, no external leak |
| Encryption | Cryptomator vault (SSE) | Files encrypted at rest |
| Authentication | FTP user/pass + IP whitelist | Prevents unauthorized access |
| Hash verification | SHA256 pre/post sync | Detects tampering |
| No-root | Uses Solid Explorer built-in FTP | No system modification |

### Failure Modes + Recovery
| Failure | Symptom | Recovery |
|---------|---------|----------|
| FTP not starting | Tasker action fails | Restart Solid Explorer → Retry |
| VPN blocks FTP | Connection timeout | Mullvad → Settings → Allow LAN |
| Hash mismatch | Verification fails | Re-sync → Check Cryptomator vault |
| USB not detected | No trigger | Tasker → Preferences → USB State → Enable |

---

## CHAIN 3: Clipboard → AI Router (Ambient Intelligence)

### Overview
Continuous clipboard monitoring with intelligent routing: URLs → AI summary, addresses → Maps, products → Price comparison.

### Trigger
- **Primary:** Clipboard change event (Clipper + Tasker)
- **Secondary:** Shake gesture (Fold 7 flex mode)
- **Tertiary:** Edge panel shortcut (force process)

### Flow Diagram
```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CLIPBOARD AI ROUTER PIPELINE                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [Clipper Monitor]                                                      │
│         │                                                               │
│         ▼                                                               │
│  ┌────────────────────────────────────────────────────────────┐         │
│  │              CONTENT CLASSIFIER (Tasker If/Else)           │         │
│  ├────────────────────────────────────────────────────────────┤         │
│  │                                                            │         │
│  │  Pattern Match              Route To                       │         │
│  │  ─────────────────────────  ─────────────────────────────  │         │
│  │                                                            │         │
│  │  .*youtube\.com.*      →   Termux/Llama (summarize)       │         │
│  │  .*amazon\.com.*       →   Price API (camelcamelcamel)    │         │
│  │  .*maps\.google.*      →   Waze/Google Maps (navigate)    │         │
│  │  [0-9]{3}-[0-9]{4}     →   Dialer (call contact)          │         │
│  │  .*\.pdf$              →   Xodo Mod (open + annotate)     │         │
│  │  BTC:[a-zA-Z0-9]{26,}  →   Blockchain explorer (browser)  │         │
│  │  DEFAULT               →   Google Search (new tab)        │         │
│  │                                                            │         │
│  └────────────────────────────────────────────────────────────┘         │
│         │                                                               │
│         ▼                                                               │
│  [Inner Screen: Result Pane (contextual)]                               │
│  ┌────────────────────────────────────────────────────────────┐         │
│  │  📌 AI Summary  │  🗺️ Navigation  │  🛒 Price History     │         │
│  └────────────────────────────────────────────────────────────┘         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Stack
| Component | Role | Source | Risk Band |
|-----------|------|--------|-----------|
| Clipper | Clipboard history + monitor | Play Store | GREEN |
| Tasker | Pattern classifier + router | Play Store | GREEN |
| Termux/Llama | AI summarization | F-Droid + GitHub | GREEN |
| Xodo Mod | PDF annotation | Appteka (PRODUCTIVITY) | YELLOW |
| CamelCamelCamel API | Price tracking | Public API | GREEN |

### Tasker Classifier Profile (snippet)
```xml
<TaskerData sr="" dvi="1" tv="6.2.20">
    <Profile sr="prof_clip_router" ve="2">
        <cdate>1711234567890</cdate>
        <clp>true</clp>
        <edate>1711234567890</edate>
        <flags>8</flags>
        <id>3</id>
        <mid sr="inid" ve="2">
            <Event sr="event" ve="2">
                <code>1002</code>  <!-- Clipboard Changed -->
            </Event>
        </mid>
        <Mum sr="mum" ve="2">
            <ClipboardRouter sr="ClipboardRouter" ve="2">
                <Action sr="act0" ve="2">
                    <Code sr="code" ve="2">
                        <lhs>%CLIP</lhs>
                        <op>1</op>
                        <rhs>.*youtube\.com.*</rhs>
                    </Code>
                </Action>
                <Action sr="act1" ve="2">
                    <code>398</code>
                    <Bundle sr="args">
                        <Vals>
                            <pair k="url" v="http://localhost:8080/summarize"/>
                            <pair k="body" v='{"url": "%CLIP"}'/>
                        </Vals>
                    </Bundle>
                </Action>
                <Action sr="act2" ve="2">
                    <code>1081985664</code>
                    <Bundle sr="args">
                        <Vals>
                            <pair k="title" v="AI Summary"/>
                            <pair k="text" v="%http_data"/>
                            <pair k="layout" v="popup"/>
                        </Vals>
                    </Bundle>
                </Action>
            </ClipboardRouter>
        </Mum>
    </Profile>
</TaskerData>
```

### Fold 7 UI Layout
| Mode | Outer Screen | Inner Screen | Edge Panel |
|------|-------------|--------------|------------|
| **Active** | Clipboard preview (mini) | Result pane (contextual) | Clipper history |
| **Idle** | Always-on display | — | Clipper + Tasker |

---

## Quick Reference: All Chains by Priority

| Priority | Chain | Trigger | Time to Value | Risk Band |
|----------|-------|---------|---------------|-----------|
| 1 | Media → AI Summarize | Share intent | 30s | YELLOW |
| 2 | Privacy File Sync | USB connect | 10s | YELLOW |
| 3 | Clipboard AI Router | Clipboard change | 5s | GREEN |
| 4 | NFC Desk Mode | NFC tap | 2s | GREEN |
| 5 | Voice Command | "Hey Google" | 3s | GREEN |

---

## Next Steps (Phase 6)
Proceed to **High-Performance Operating Layer** for:
- Initial hardening checklist
- Daily driver routines (time-based)
- Fold 7 layout system (by mode)
- Periodic audits (weekly)
