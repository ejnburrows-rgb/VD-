# Fold 7 High-Performance Operating Layer
## Galaxy Fold 7 Liquid Automation System — Phase 6

**Device:** Samsung Galaxy Z Fold 7 (SM-F946U)  
**Desktop:** Windows PC (WSL Ubuntu optional)  
**Automation Stack:** Tasker + MacroDroid + Clipper + Shelter + Mullvad

---

## INITIAL HARDENING (Day 1 Setup)

### 1. Android Profile Isolation
```
Settings → System → Multiple users → Add user → "Mods"
```
- [ ] Create separate Android profile named "Mods"
- [ ] Set up with separate Google account (not primary)
- [ ] Disable Google Play Protect in this profile (Settings → Security)
- [ ] Install Shelter here (for work profile cloning)

**Why:** Contains potential malware to isolated sandbox. Apps cannot access main profile data.

---

### 2. VPN Hardening (Mullvad)
```
Install from Play Store → Settings → Killswitch: ON
```
- [ ] Install Mullvad VPN (Play Store)
- [ ] Enable killswitch: Settings → Killswitch → Always on
- [ ] Enable LAN access: Settings → Local network access → ON (for FTP)
- [ ] Connect to Switzerland (CH-12 or CH-13) — low surveillance, strong privacy laws
- [ ] Enable DNS leak protection: Settings → DNS → Use Mullvad DNS
- [ ] Enable IPv6 leak protection: Settings → IPv6 → Block

**Server Rotation Schedule:**
| Day | Server | Purpose |
|-----|--------|---------|
| Mon | CH-12 | YouTube ReVanced |
| Tue | IS-1 (Iceland) | Media downloads |
| Wed | RO-1 (Romania) | General browsing |
| Thu | CH-13 | Automation triggers |
| Fri | DE-1 (Germany) | Productivity apps |
| Sat | IS-2 | Media streaming |
| Sun | Random | Low-priority tasks |

---

### 3. Shelter Work Profile Setup
```
Install Shelter → Clone work profile → Install mods here
```
- [ ] Install Shelter (F-Droid or Play Store)
- [ ] Grant device admin permission
- [ ] Create work profile: "Shelter"
- [ ] Clone these apps to Shelter:
  - YouTube ReVanced
  - Solid Explorer Mod
  - Tasker
  - Clipper
  - MacroDroid
- [ ] Enable "Work profile toggle" in quick settings

**Why:** Apps in work profile cannot access personal data (contacts, photos, messages).

---

### 4. Permission Lockdown
```
Settings → Apps → [App] → Permissions → Revoke unnecessary
```
- [ ] Disable "Install unknown apps" for browser after install
- [ ] Revoke SMS permission from all apps except messaging apps
- [ ] Revoke Contacts permission from media apps
- [ ] Revoke Phone permission from automation apps
- [ ] Revoke Location permission from file managers
- [ ] Enable "Permission manager" → Review monthly

**High-Risk Permissions to Audit:**
| Permission | Risk | Allow Only If |
|------------|------|---------------|
| SEND_SMS | CRITICAL | Essential SMS automation |
| READ_CONTACTS | HIGH | Messaging apps only |
| DEVICE_ADMIN | HIGH | Shelter/Mullvad only |
| BIND_ACCESSIBILITY_SERVICE | HIGH | Tasker only |
| SYSTEM_ALERT_WINDOW | MEDIUM | Clipper/Tasker only |
| READ_EXTERNAL_STORAGE | MEDIUM | File managers only |

---

### 5. Hash Verification Workflow (Pre-Install)
```
1. Extract SHA256 from Appteka detail page
2. Verify on VirusTotal (virustotal.com)
3. Require 60+/70 clean engines
4. Install in emulator first (optional)
5. Monitor with NetGuard (firewall)
```
- [ ] Extract SHA256 hash from Appteka app detail page
- [ ] Submit hash to VirusTotal
- [ ] Verify ≥60/70 engines report "Clean"
- [ ] If <60/70: DO NOT INSTALL
- [ ] Optional: Install in Android emulator (LDPlayer/BlueStacks) first
- [ ] Monitor network activity with NetGuard (firewall app)

**VirusTotal Threshold Guide:**
| Clean Engines | Action |
|---------------|--------|
| 70/70 | ✅ Safe to install |
| 60-69/70 | ⚠️ Proceed with caution (isolated profile) |
| 50-59/70 | ❌ Do not install (likely trojanized) |
| <50/70 | 🚫 Dangerous (report to Appteka) |

---

## DAILY DRIVER ROUTINES (Automated)

### 6 AM: Morning Briefing
```
Trigger: Time + Battery > 20%
Actions: RSS fetch → AI summarize → Pin to Notes
```
- [ ] Tasker profile: "Morning Briefing"
- [ ] Trigger: Time = 06:00 AND Battery > 20%
- [ ] Actions:
  1. Fetch RSS feeds (gReader Mod): TechCrunch, XDA, Hacker News
  2. Send to Termux/Llama for summarization
  3. Pin summary to Samsung Notes (title: "Daily Briefing [DATE]")
  4. Notify: "Morning briefing ready"

**Tasker Profile (XML):**
```xml
<Profile sr="prof_morning" ve="2">
    <mid sr="inid" ve="2">
        <Time sr="time">
            <fh>6</fh><fm>0</fm><th>6</th><tm>30</tm>
        </Time>
    </mid>
    <Action sr="act0" ve="2">
        <code>398</code>
        <Bundle sr="args">
            <pair k="url" v="http://localhost:8080/rss-summarize"/>
        </Bundle>
    </Action>
    <Action sr="act1" ve="2">
        <code>400</code>
        <Bundle sr="args">
            <pair k="note_title" v="Daily Briefing %DATE"/>
            <pair k="note_content" v="%http_data"/>
            <pair k="pin" v="true"/>
        </Bundle>
    </Action>
</Profile>
```

---

### 8 AM: Work Mode Activation
```
Trigger: WiFi SSID match (office) OR Time = 08:00
Actions: Enable Focus mode, sync files, start VPN
```
- [ ] Tasker profile: "Work Mode"
- [ ] Trigger: WiFi SSID = "Office" OR Time = 08:00 (weekdays)
- [ ] Actions:
  1. Enable Focus mode (Settings → Digital Wellbeing)
  2. Start Mullvad (connect to DE-1)
  3. Trigger FTP sync (Solid Explorer)
  4. Disable notifications from social apps
  5. Set display refresh rate to 60Hz (battery save)

---

### 12 PM: Permission Audit (Micro)
```
Trigger: Time = 12:00
Actions: Bouncer revokes day-old temporary permissions
```
- [ ] Install Bouncer (Play Store)
- [ ] Tasker profile: "Permission Cleanup"
- [ ] Trigger: Time = 12:00
- [ ] Actions:
  1. Launch Bouncer → Auto-revoke permissions granted >24h ago
  2. Log revoked permissions to file
  3. Notify: "Cleaned up X permissions"

---

### 6 PM: Media Pipeline Activation
```
Trigger: Time = 18:00 OR Location = Home
Actions: Queue downloads, organize Plex, notify
```
- [ ] Tasker profile: "Media Mode"
- [ ] Trigger: Time = 18:00 OR WiFi SSID = "Home"
- [ ] Actions:
  1. Launch NewPipe → Queue pending downloads
  2. Launch Plex Mod → Organize new media
  3. Notify: "Downloads queued, media organized"
  4. Switch VPN to IS-1 (Iceland) for streaming

---

### 10 PM: Work Profile Lockdown
```
Trigger: Time = 22:00 OR Battery < 20%
Actions: Shelter locks work profile, disable automation
```
- [ ] Tasker profile: "Night Lock"
- [ ] Trigger: Time = 22:00 OR Battery < 20%
- [ ] Actions:
  1. Shelter → Disable work profile
  2. Disable Tasker automation (except alarms)
  3. Enable Do Not Disturb
  4. Set alarm for 6 AM

---

## FOLD 7 LAYOUT SYSTEM (BY MODE)

### Reading Mode
**Use Case:** Research, documentation, long-form content

| Screen | App | Configuration |
|--------|-----|---------------|
| **Outer** | Firefox Mod | Fullscreen, reader mode, uBlock Origin |
| **Inner** | Split View | Left: Pocket Mod (saved articles) | Right: Xodo Mod (PDF annotations) |
| **Edge Panel** | Zotero Mod | Quick reference manager |

**Setup:**
1. Enable split view: Recent apps → Tap app icon → "Open in split screen view"
2. Pin Pocket to left, Xodo to right
3. Edge panel: Enable Zotero shortcut

---

### Work Mode
**Use Case:** Productivity, file management, automation monitoring

| Screen | App | Configuration |
|--------|-----|---------------|
| **Outer** | Always-on display | Clock + notification preview |
| **Inner** | Split View | Left: Tasker (automation logs) | Right: Solid Explorer (SMB to NAS) |
| **Edge Panel** | TeslaVault (2FA) + Mullvad status | Quick toggles |

**Setup:**
1. Tasker: Floating window (tap to expand logs)
2. Solid Explorer: Connect to NAS via SMB (bookmark)
3. Edge panel: Add Mullvad + TeslaVault shortcuts

---

### Media Mode
**Use Case:** Video consumption, music, entertainment

| Screen | App | Configuration |
|--------|-----|---------------|
| **Outer** | NewPipe | Playlist queue (mini player) |
| **Inner** | YouTube ReVanced | 16:9 fullscreen, background play |
| **Edge Panel** | VLC Mod | Equalizer + subtitle controls |

**Setup:**
1. YouTube ReVanced: Enable background play, disable ads
2. NewPipe: Queue videos for offline download
3. VLC Mod: Edge panel shortcut for quick playback

---

### Research Mode
**Use Case:** Academic work, note-taking, AI-assisted analysis

| Screen | App | Configuration |
|--------|-----|---------------|
| **Outer** | PDF viewer (Xodo Mod) | Quick reference |
| **Inner** | Split View | Left: LectureNotes Mod (handwriting) | Right: AI Bridge (clipboard → summary) |
| **Edge Panel** | Zotero Mod | Citation manager |

**Setup:**
1. LectureNotes: Enable palm rejection, stylus optimization
2. AI Bridge: Tasker profile for clipboard summarization
3. Zotero: Sync with institutional library

---

### DeX Mode (Desktop)
**Use Case:** Extended productivity with monitor/PC

| Zone | App | Configuration |
|------|-----|---------------|
| **Left Monitor** | Samsung Notes + Browser | Research + note-taking |
| **Right Monitor** | Tasker + Solid Explorer | Automation + file management |
| **Taskbar** | Mullvad + Clipper + Shelter | Quick toggles |

**Setup:**
1. Connect Fold 7 to monitor via USB-C to HDMI
2. Enable DeX: Settings → Connected devices → DeX
3. Arrange windows: Notes (left), Browser (right), Tasker (floating)

---

## PERIODIC AUDITS (Weekly)

### Sunday Security Audit (30 min)
```
Trigger: Sunday 20:00
Duration: 30 minutes
```
- [ ] Uninstall unused apps (Settings → Apps → Sort by "Last used")
- [ ] Check permission creep: Settings → Privacy → Permission manager
- [ ] Re-scan all APK hashes on VirusTotal (batch check saved hashes)
- [ ] Clear Dalvik/cache: Settings → Storage → Cached data → Clear
- [ ] Verify mod functionality (test each automation chain)
- [ ] Rotate VPN server locations (avoid IP blacklisting)
- [ ] Review Tasker logs for errors
- [ ] Backup encrypted vault (Cryptomator → Export)

**Audit Checklist Template:**
```markdown
## Weekly Audit - [DATE]

### Apps Removed
- [ ] App 1 (reason: unused)
- [ ] App 2 (reason: permission creep)

### Permission Changes
- [ ] App X: Revoked SMS
- [ ] App Y: Revoked Location

### Hash Re-verification
- [ ] YouTube ReVanced: ✅ Clean
- [ ] Solid Explorer Mod: ✅ Clean
- [ ] [App]: ⚠️ Flagged (X engines) → Action: [Uninstall/Monitor]

### VPN Rotation
- Previous: CH-12 → New: IS-1

### Notes
[Any issues, observations, or action items]
```

---

### Monthly Deep Clean (2 hours)
```
Trigger: First Sunday of month
Duration: 2 hours
```
- [ ] Factory reset "Mods" profile (Settings → System → Reset → Erase "Mods" user)
- [ ] Reinstall only essential mods from verified hashes
- [ ] Update Termux packages: `pkg upgrade`
- [ ] Rebuild llama.cpp (latest version)
- [ ] Rotate all passwords (Bitwarden → Generate new)
- [ ] Review Mullvad logs (Settings → Advanced → Logs)
- [ ] Test all automation chains end-to-end
- [ ] Backup entire profile (Samsung Smart Switch)

---

## EMERGENCY PROCEDURES

### Malware Detection Response
```
Symptoms: Battery drain, unexpected network activity, popups
```
1. **Immediate:** Enable Airplane mode
2. **Isolate:** Shelter → Disable work profile
3. **Scan:** Install Malwarebytes → Full scan
4. **Identify:** Check Tasker logs for suspicious triggers
5. **Remove:** Uninstall suspected app
6. **Nuclear:** Factory reset "Mods" profile if unresolved

---

### VPN Failure Response
```
Symptoms: Mullvad disconnects, IP leak detected
```
1. **Immediate:** Enable Airplane mode (killswitch may fail)
2. **Verify:** Check IP on ipleak.net
3. **Reconnect:** Mullvad → Connect to different server
4. **Audit:** Review Mullvad logs for disconnect reason
5. **Compensate:** Pause all automation chains until VPN stable

---

### Automation Chain Failure
```
Symptoms: Tasker profiles not triggering, actions failing
```
1. **Check:** Tasker → Preferences → Display toast on action
2. **Test:** Run profile manually (long-press → Run)
3. **Logs:** Tasker → Variables → %ERR (error code)
4. **Permissions:** Settings → Apps → Tasker → Allow all
5. **Reboot:** Restart Fold 7 (clears stuck services)

---

## PERFORMANCE TUNING

### Battery Optimization
```
Settings → Device care → Battery → Background usage limits
```
- [ ] Put unused apps to "Deep sleeping"
- [ ] Enable "Adaptive battery"
- [ ] Disable "Always-on display" during work hours
- [ ] Set refresh rate to 60Hz (Settings → Display → Motion smoothness)
- [ ] Enable "Power saving" at 30% battery

### Memory Management
```
Settings → Device care → Memory
```
- [ ] Enable "Auto optimize" (daily at 3 AM)
- [ ] Manually clear memory before intensive tasks
- [ ] Limit background processes: Developer options → Background process limit → 4

### Thermal Management
```
Avoid thermal throttling during intensive tasks (AI inference, video encoding)
```
- [ ] Remove case during intensive tasks
- [ ] Use passive cooling stand (aluminum)
- [ ] Avoid direct sunlight
- [ ] Enable "Performance mode" only when plugged in

---

## NEXT STEPS (Phase 7)
Proceed to **Risk + Compliance Envelope** for:
- Malware vector analysis (2026 ENISA report)
- Copyright/licensing breakdown (DMCA, EU InfoSoc)
- Account/ban risk by tag band
- Legal jurisdiction considerations (FL, US)
