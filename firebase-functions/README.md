# Firebase Cloud Function - YouTube Audio Extractor

Esta función extrae URLs directas de audio de YouTube para pasarlas a Groq Whisper.

## Despliegue

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login en Firebase
```bash
firebase login
```

### 3. Crear proyecto en Firebase Console
1. Ve a https://console.firebase.google.com
2. Crea un nuevo proyecto (ej: "viajera-digital-audio")
3. Habilita Cloud Functions (requiere plan Blaze - pay as you go, pero tiene free tier generoso)

### 4. Inicializar proyecto
```bash
cd firebase-functions
firebase init functions
# Selecciona tu proyecto
# Selecciona JavaScript
# No sobrescribir archivos existentes
```

### 5. Instalar dependencias
```bash
npm install
```

### 6. Desplegar
```bash
firebase deploy --only functions
```

### 7. Obtener URL del endpoint
Después del deploy, obtendrás una URL como:
```
https://us-central1-TU-PROYECTO.cloudfunctions.net/extractYouTubeAudio
```

### 8. Configurar en Vercel
Agrega esta variable de entorno en Vercel:
```
FIREBASE_FUNCTION_URL=https://us-central1-TU-PROYECTO.cloudfunctions.net/extractYouTubeAudio
```

## Uso

```bash
curl -X POST https://us-central1-TU-PROYECTO.cloudfunctions.net/extractYouTubeAudio \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=VIDEO_ID"}'
```

Respuesta:
```json
{
  "success": true,
  "audioUrl": "https://...",
  "duration": 3600,
  "title": "Video Title",
  "format": "webm",
  "bitrate": 128
}
```

## Límites gratuitos de Firebase
- 2 millones de invocaciones/mes
- 400,000 GB-segundos de compute
- 200,000 CPU-segundos
