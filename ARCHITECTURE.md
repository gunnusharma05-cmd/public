// ARCHITECTURE.md - Technical Design Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ERASURE SYSTEM                        │
└─────────────────────────────────────────────────────────┘

┌──────────────── CLIENT LAYER ───────────────────┐
│                                                  │
│  app.js (Main Orchestrator)                     │
│  ├── QuantumTextEngine                          │
│  ├── EmotionEngine + BrainwaveDetector         │
│  ├── TextDecayEngine                            │
│  ├── ParticleSystem + StyleTransferRenderer    │
│  ├── MusicEngine                                │
│  ├── TemporalParadoxEngine                      │
│  ├── CollectiveDreamEngine                      │
│  ├── ConsciousnessUploadEngine                  │
│  └── ExportSystem                               │
│                                                  │
│  Three.js Renderer (WebGL)                      │
│  Tone.js Audio Engine                           │
│  Socket.io WebSocket Client                     │
│  Face-api.js (Emotion Detection)                │
│  Canvas API (GIF/Poster Export)                 │
│  IndexedDB (Local Emotional Memory)             │
│                                                  │
└──────────────────────────────────────────────────┘
                       │
                       │ Socket.io
                       │ JSON over WebSocket
                       ↓
┌──────────────── SERVER LAYER ───────────────────┐
│                                                  │
│  Express.js HTTP Server                         │
│  Socket.io WebSocket Server                     │
│                                                  │
│  Routes:                                        │
│  GET /api/readers/count                         │
│  GET /api/story/generation                      │
│  POST /api/fragments (collect for dream)        │
│  POST /api/consciousness (upload NPCs)          │
│                                                  │
│  In-Memory Data Structures:                     │
│  ├── activeReaders (Map<id, profile>)          │
│  ├── emotionalField (global heatmap)            │
│  ├── fragmentLibrary (for collective dream)     │
│  └── npcRegistry (uploaded consciousnesses)    │
│                                                  │
└──────────────────────────────────────────────────┘
                       │
                       │ Firebase API
                       │ (Optional Persistence)
                       ↓
┌──────────────── DATA LAYER ───────────────────────┐
│                                                    │
│  Firebase Realtime Database:                      │
│  ├── /users/{userId}/emotional-profile            │
│  ├── /fragments/{fragmentId}                      │
│  ├── /npcs/{characterId}                          │
│  ├── /sessions/{sessionId}                        │
│  └── /statistics/generations                      │
│                                                    │
│  Local Storage (Browser):                         │
│  └── IndexedDB: emotional-patterns (not text!)    │
│                                                    │
└────────────────────────────────────────────────────┘
```

## Core Engine Interactions

### 1. Quantum Text Engine (QTE)
- **Input**: Raw text, current emotions
- **Process**: 
  - Generate 3 parallel versions (dark/light/ambiguous)
  - Calculate superposition probabilities
  - Generate holographic glyphics
- **Output**: Superposed text object with multiple interpretations
- **Triggers**: Eye-tracking collapse → determine "real" version

### 2. Emotion Engine (EE)
- **Input**: Face-api detection OR manual emotion selection
- **Process**:
  - Smooth emotion detection over 2-second intervals
  - Calculate dominant emotion
  - Map to color, audio frequency, particle behavior
- **Output**: Emotion object + color + style + audio signal
- **Broadcast**: Via Socket.io to all active readers (contagion)

### 3. Text Decay Engine (TDE)
- **Input**: Glyphs with creation timestamp, cursor position
- **Process**:
  - Calculate age of each glyph
  - Apply inverse gravity (repel from cursor)
  - Apply corruption stages: substitution → aberration → blur → fade
- **Output**: Updated glyph positions + visual effects
- **Timeline**: 10 seconds to complete decay

### 4. Particle System (PS)
- **Input**: Sentence text (for NLP), emotion colors, verb motions
- **Process**:
  - Extract nouns → morph into shapes (cat, fire, ocean, etc)
  - Extract adjectives → apply semantic colors
  - Extract verbs → apply motion patterns
  - Update positions using velocity + damping
- **Output**: Three.js Point Cloud with material properties
- **Density**: Affects ambient drone volume/tempo

### 5. Music Engine (ME)
- **Input**: Text, reading speed, emotions
- **Process**:
  - Map each letter to pentatonic scale note
  - Calculate tempo from emotional intensity
  - Select key (major for happy, minor for sad)
  - Generate MIDI sequence
  - Synthesize audio with 4 instruments
- **Output**: MIDI data + MP3 audio + sheet music notation
- **Real-time**: Plays during reading; recorded for export

### 6. Collective Dream Engine (CDE)
- **Input**: User fragments (saved passages) + emotional metadata
- **Process**:
  - Every 100 fragments: GPT-2 style remixing
  - Analyze emotional themes across all contributions
  - Generate new story variations (dark/light/surreal)
  - Track generation number and mutation count
  - Build phylogenetic tree of narrative evolution
- **Output**: New story seed + evolution statistics
- **Persistence**: Firebase stores all fragments + lineage

### 7. Temporal Paradox Engine (TPE)
- **Input**: User action history (last 10 actions)
- **Process**:
  - Build Markov chain from action transitions
  - Predict next action with confidence score
  - Generate paradox message
  - Validate prediction when action occurs
  - Track accuracy over session
- **Output**: Prediction message + confidence + accuracy stats
- **UX Impact**: Creates causality loop unease

### 8. Brainwave Detector (BD)
- **Input**: Video stream (facial micro-movements)
- **Process**:
  - Measure blink rate, eye movement speed, muscle twitches
  - Map to brainwave states: Alpha, Beta, Theta, Gamma
  - Generate corresponding visual/audio effects
- **Output**: Brainwave state percentages + effects
- **Audio**: Binaural beat frequencies for entrainment

### 9. Style Transfer Renderer (STR)
- **Input**: Current emotion, scene geometry
- **Process**:
  - Select painting style based on emotion
  - Blend between current and new style over 2 seconds
  - Apply shader effects to text (brushstrokes)
  - Generate paint splatter particles
- **Output**: Modified Three.js scene + shader materials
- **Styles**: Van Gogh, Munch, Picasso, Dali, Giger, etc.

### 10. Consciousness Upload Engine (CUE)
- **Input**: Entire session data (emotions, fragments, profile)
- **Process**:
  - Capture emotional profile (dominant emotion + range)
  - Extract dialogue patterns from saved fragments
  - Create NPC appearance based on emotional colors/intensity
  - Fine-tune GPT-2 on user's writing patterns
  - Generate character ID and persistence data
- **Output**: NPC object (character, dialogue, appearance, personality)
- **Network**: Upload to Firebase, broadcast to all future readers

### 11. Export System (ES)
- **Input**: Full session data from all engines
- **Process**:
  - Generate 7 artifacts:
    1. Emotional Poster (canvas → PNG)
    2. Corrupted Manuscript (PDF with glitch text)
    3. Dream Recording (MP3 synthesis + effects)
    4. Decay Animation (GIF screen capture)
    5. Symphony (MIDI + MP3 + sheet music)
    6. Evolutionary Tree (PDF visualization)
    7. Neural Signature (SVG certificate)
- **Output**: Download package with all 7 files
- **Metadata**: Embedded session ID, timestamps, statistics

## Data Flow Example: User Reading Story

```
1. User arrives
   └─→ AudioContext initialized
   └─→ WebGL scene created
   └─→ Socket.io connected

2. Webcam permission → EmotionEngine starts
   ├─→ Face-api.js analyzes video
   ├─→ BrainwaveDetector estimates mental state
   ├─→ Emotions broadcast via Socket.io
   └─→ Server adds to activeReaders

3. Story text rendered via QuantumTextEngine
   ├─→ 3 parallel versions generated
   ├─→ Glyphics overlay created (superposition blur)
   ├─→ TextDecayEngine spawns decay timeline
   └─→ Glyphs position in 3D scene

4. Every frame (16ms):
   ├─→ TextDecayEngine.updateGlyphs() applies decay
   ├─→ ParticleSystem.update() moves particles
   ├─→ Emotion-based colors applied
   ├─→ MusicEngine synthesizes notes
   └─→ Renderer.render() draws frame

5. Every 2 seconds:
   ├─→ EmotionEngine.updateEmotions() gets new detection
   ├─→ StyleTransferRenderer transitions to new painting style
   ├─→ CollectiveDreamEngine receives contagion from other readers
   ├─→ Particles morph into new shapes (NLP update)
   └─→ Socket.io broadcasts updated emotions

6. Every 8 seconds:
   ├─→ TemporalParadoxEngine.predictNextAction()
   ├─→ Paradox notification displayed
   └─→ Prediction validated later

7. Reading ends (5-10 min):
   ├─→ TextDecayEngine clears all glyphs
   ├─→ ParticleSystem collapses particles
   ├─→ Scene fades to black
   └─→ End modal appears

8. User chooses "Upload Consciousness":
   ├─→ ConsciousnessUploadEngine.uploadConsciousness()
   ├─→ NPC data created (character #, dialogue, appearance)
   ├─→ Firebase stores NPC permanently
   ├─→ Socket.io broadcasts: "New Ghost #XXXX spawned"
   └─→ Future readers may encounter this NPC

9. User exports:
   ├─→ ExportSystem.exportAll() generates 7 artifacts
   ├─→ Canvas rendering for poster + animations
   ├─→ jsPDF for manuscripts + trees + certificate
   ├─→ MIME synthesis for symphony
   └─→ Browser downloads as ZIP or individual files

```

## Performance Considerations

### GPU Usage
- Three.js handles all rendering
- Point clouds optimized with BufferGeometry
- Shaders compiled once at startup
- Max 2000 particles (can reduce if needed)

### CPU Usage
- Emotion detection: ~50ms every 2 seconds
- Text decay calculations: ~10ms per frame
- Particle updates: ~15ms per frame
- Music synthesis: ~20ms per frame (offload to AudioContext thread)

### Network Usage
- Emotion broadcasts: ~100 bytes every 2 seconds per reader
- Fragment saves: ~500 bytes occasionally
- Total for 100 concurrent users: ~15 KB/s

### Memory
- Session data: ~2-5 MB per user
- Particle geometry: ~500 KB (2000 particles × 16 bytes)
- Audio buffers: ~1-2 MB (3-5 min symphony)
- IndexedDB: ~10 MB per browser (emotional patterns)

## Scalability

### Single Server Deployment
- Handles 500-1000 concurrent readers
- Limited by Socket.io connection pooling
- Text decay independent per client (no server processing)

### Scaled Deployment
```
[Load Balancer]
    ├─→ [Server 1] (Socket.io namespace: /reader-1)
    ├─→ [Server 2] (Socket.io namespace: /reader-2)
    ├─→ [Server 3] (Socket.io namespace: /reader-3)
    └─→ [Redis Adapter] (sync emotions between servers)
    
[Firebase Realtime DB]
    └─→ Persistent storage (fragments, NPCs, generations)
    
[CDN]
    └─→ Static assets (HTML, JS, WebGL models)
```

### Bottlenecks to Address
1. **WebSocket throughput**: Redis adapter scales horizontally
2. **Fragment storage**: Firebase auto-scales; add sharding if needed
3. **GPU rendering**: Client-side; limited by browser hardware
4. **MIDI/MP3 generation**: Can offload to cloud GPU (Replicate API)

## Security

### Client-Side
- Face video never sent to server (local processing only)
- Text fragments encrypted before upload (optional)
- IndexedDB not accessible cross-origin

### Server-Side
- Rate limiting on fragment submissions (100/hour)
- Validate consciousness upload data
- Sanitize input to prevent XSS
- HTTPS required in production

### Data Privacy
- Emotional data NOT linked to personal identity
- Text fragments deleted after 24 hours (unless saved as fragment)
- Consciousness NPCs public but anonymous (Character #XXXX only)
- No tracking or analytics (respects privacy)

---

**This architecture prioritizes artistic impact while maintaining technical scalability.**
