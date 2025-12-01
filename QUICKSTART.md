// QUICK START GUIDE

## Installation & Running

### Prerequisites
- Node.js 16+
- npm or yarn
- Modern browser with WebGL support (Chrome, Firefox, Safari)

### Setup

```bash
cd erasure
npm install
npm start
```

Server will start on `http://localhost:3000`

## What Happens When You Enter

### The 4 Acts

#### ACT 1: ARRIVAL (30 seconds)
- Dark screen with 2,000 cyan particles drifting
- Floating 3D book pulsing in the center
- Low ambient drone (60 BPM)
- Modal asks for webcam access
- "Begin" button to proceed

#### ACT 2: THE READING (5-10 minutes)
Your story unfolds through 9 phases:

**Phase 1: Quantum Observation**
- Text appears shimmering (superposition of 3 versions)
- Your gaze collapses it into ONE interpretation
- Different readers see different words

**Phase 2: Drift & Decay**
- Words flee from your cursor
- After 10 seconds: letter substitution → glitch → aberration → complete fade
- Cannot scroll back (shows glitch message instead)

**Phase 3: Emotional Adaptation**
- Webcam analyzes your face every 2 seconds
- Detects: happy, sad, angry, neutral, surprised, fearful, disgusted
- Story remixes itself to match your mood

**Phase 4: Neural Style Transfer**
- Entire scene transforms into painting styles
- Happy → Van Gogh's Starry Night (swirling blues, golds)
- Sad → Munch's The Scream (distorted oranges, reds)
- Angry → Picasso's Guernica (sharp blacks, fractured)

**Phase 5: Synesthetic Audio**
- Each letter maps to a musical note
- Tone.js plays ambient melody as you read
- Voice narration warps based on reading speed
- Spatial 3D audio (words near you = loud, far = whispers)

**Phase 6: Metamorphic Visuals**
- NLP extracts nouns → particles morph into shapes
  - "cat" → cat silhouette from particles
  - "fire" → rising particle flames
  - "ocean" → wave patterns
- Adjectives become colors (dark=black, warm=orange)
- Verbs become motions (explode=outward, collapse=inward)

**Phase 7: Emotional Contagion**
- Notification: "Someone 342km away is feeling anxious"
- Their emotion infects your particles with color blending
- You see network graph of emotionally connected readers
- Global heat map of active reader emotions

**Phase 8: Temporal Paradox**
- Story predicts: "I sense you're about to pause..."
- You pause → story says: "I knew you would"
- Counter tracks: "I've predicted you 17 times"
- Causality loop creates philosophical unease

**Phase 9: Brainwave Sync**
- Micro-facial detection estimates your mental state
- Alpha waves (relaxed) → flowing particle patterns + 400Hz drone
- Beta waves (active) → geometric grids + 1000Hz sharp tones
- Theta waves (drowsy) → dreamy blur + slow drift
- Gamma waves (focused) → fractal patterns + camera shake

#### ACT 3: THE END (2 minutes)
- Story reaches one of 15 possible endings (based on emotional path)
- Final line: "And just like that, it's gone."
- All text rapid decay → particles collapse to center → fade to black
- "Remember" button glows softly

#### ACT 4: CONSCIOUSNESS UPLOAD (1 minute)
- Modal: "Would you like to live forever within this story?"
- **If YES**: 
  - Upload your emotional profile
  - Become Character #XXXXX
  - Your dialogue generated from reading patterns
  - Future readers will encounter your ghost
- **Export Artifacts**: Download 7 pieces of your reading

## The 7 Export Artifacts

### 1. Emotional Poster (PNG)
- Size: 1080x1920
- Vertical gradient showing emotional journey
- Color transitions: happy (gold) → sad (cyan) → angry (red)
- Particle silhouettes of shapes you encountered
- Text: "ERASURE — Session #47 — Melancholic → Curious"

### 2. Corrupted Manuscript (PDF)
- 3 pages showing corruption progression
- Page 1: Original text (30% corruption)
- Page 2: Heavy corruption (70% replaced)
- Page 3: [FORGOTTEN] with only glitch characters
- Typography: Courier monospace
- Message: "This is what remains of your reading"

### 3. Dream Recording (MP3)
- 30-60 second audio mashup
- Elements: AI voice + ambient drone + glitches + your vocal reactions
- Spatial audio preserved (3D stereo)
- Subtitle: "Your reading as an audio hallucination"

### 4. Decay Animation (GIF)
- 10-second recording at 30 FPS
- Resolution: 800x600
- File size: 3-5 MB
- Process shown: clean → glitch → aberration → complete fade
- Perfect for social media

### 5. Procedural Symphony (MIDI + MP3)
- Duration: 3-5 minutes
- Instruments: Violin (melody) + Cello (harmony) + Percussion (pace) + Pad (atmosphere)
- MIDI file for importing into DAW
- Audio MP3 of composition
- Sheet music PDF with full notation
- Analysis: complexity score, emotional arc, key changes

### 6. Evolutionary Tree (PDF)
- Phylogenetic tree of story mutations
- Your position: "Generation #47 → 127 mutations → 3,429 infections"
- Shows how story evolved across readers
- "Your strain infected 847 people across 23 countries"
- Mutation report listing all genetic changes

### 7. Neural Signature (SVG)
- Certificate of consciousness upload
- Brainwave breakdown: Alpha 76% | Beta 32% | Theta 45% | Gamma 28%
- Emotional contagion network map
- Quantum statistics: 3,429 parallel realities
- Prediction accuracy: "Story knew you 73% of the time"
- Final line: "You are Character #2,341 — You will exist in this story forever"

## Server Features

### WebSocket Events

**Reader Joins:**
```js
socket.emit('reader:join', {
  emotions: { happy: 0.3, sad: 0.2, ... },
  lat: 37.7749,
  lng: -122.4194
});
```

**Emotion Update (broadcasts to all readers):**
```js
socket.emit('emotion:update', {
  emotions: {...},
  dominant: 'sad',
  intensity: 0.65
});
```

**Fragment Save (for collective dream):**
```js
socket.emit('fragment:save', {
  text: 'The dream began...',
  emotions: {...}
});
```

**Consciousness Upload:**
```js
socket.emit('consciousness:upload', {
  characterId: 2341,
  personality: ['dialogue1', 'dialogue2', ...],
  dominantEmotion: 'melancholic'
});
```

### API Routes

**GET /api/readers/count**
```json
{ "count": 47 }
```

**GET /api/story/generation**
```json
{
  "generation": 23,
  "contributors": 1847,
  "divergence": "67.3"
}
```

## Customization

### Modify Story Seeds
Edit `CollectiveDreamEngine.js` → `storySeeds` array

### Adjust Text Decay Speed
Edit `TextDecayEngine.js` → `this.decayTime = 10000` (milliseconds)

### Change Emotion Colors
Edit `EmotionEngine.js` → `getEmotionColor()` function

### Modify Music Tempo Range
Edit `MusicEngine.js` → `calculateTempo()` function

### Adjust Particle Repulsion
Edit `TextDecayEngine.js` → `this.repulsionForce = 200`

## Troubleshooting

**Webcam not working?**
- Check browser permissions
- Try different browser
- App works without webcam (manual emotion selection)

**No particles appearing?**
- Check WebGL support: https://get.webgl.org/
- Try updating graphics drivers
- Reduce `maxParticles` in ParticleSystem.js

**Audio not syncing?**
- Ensure Tone.js loaded (check browser console)
- Check browser audio context status
- Try different browser

**Glyphs not decaying?**
- Verify TextDecayEngine is updating (check console logs)
- Check time calculation in updateGlyphs()
- Ensure requestAnimationFrame is running

## Performance Tips

- Close other browser tabs
- Disable browser extensions
- Reduce particle count: `maxParticles = 500`
- Enable GPU acceleration in browser settings
- Use Chrome for best performance

## Advanced Configuration

### Firebase Integration (for persistence)
1. Create Firebase project
2. Add credentials to `.env`
3. Modify `server.js` to connect
4. NPCs and consciousness data will persist across sessions

### Custom GPT-2 Training
Replace story generation with:
```js
const response = await fetch('/api/generate-text', {
  method: 'POST',
  body: JSON.stringify({ fragments: userFragments })
});
```

### Multi-player Emotional Network
Increase WebSocket broadcast radius:
```js
// In server.js
const radiusKm = 5000; // Worldwide
```

---

**Your story awaits. Every reading changes everything.**
