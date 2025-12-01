# ERASURE - Enhanced with Dreamware 2025 Features

## Project Status: ADVANCED & DREAMWARE-COMPLIANT

ERASURE has been enhanced with **5 Dream Fragments** to align with the Dreamware 2025 hackathon requirements.

---

## 🎯 Primary Emotion
**WONDER** mixed with **UNEASE**  
The experience creates a sense of being watched and understood by a sentient system while marveling at the experience of shared consciousness across multiple readers.

---

## 🌙 The 5 Dream Fragments (Now Implemented)

### 1. **FLUID INTERFACE** ✅
**What it does:** UI that breathes and reacts to your presence

**Implementation:**
- Interface opacity and scale shift smoothly (sine wave breathing)
- During reading phase, buttons and text gently pulse
- Modal dialogs fade in/out with organic animations
- Touch responsiveness: UI reacts to mouse proximity
- CSS animations: `@keyframes breathe`

**Code Location:** `startInterfaceBreathing()` in `src/app.js`

```javascript
// UI scales between 0.98 and 1.02, breathing effect
const scale = 0.98 + Math.sin(Date.now() / 1000) * 0.02;
```

---

### 2. **EMOTIONAL MEMORY** ✅
**What it does:** App remembers your feelings; past moods affect future experiences

**Implementation:**
- Persists emotional data in `localStorage` as `erasure_memory`
- Tracks dominant emotion from each visit
- On return visit, displays: "You've been here N times before... The dream remembers you."
- Dream intensity scales based on historical emotions
- Each visit is recorded with date + emotional value

**Code Location:** `loadEmotionalMemory()` in `src/app.js`

```javascript
// Save emotion for next visit
appState.emotionalMemory[new Date().toLocaleDateString()] = emotionValue;
localStorage.setItem('erasure_memory', JSON.stringify(appState.emotionalMemory));
```

**Data Stored:**
```json
{
  "11/29/2025": 0.75,
  "11/28/2025": 0.62,
  "11/27/2025": 0.88
}
```

---

### 3. **TEMPORAL SHIFTS** ✅
**What it does:** Time behaves strangely; screens decay; unpredictability

**Implementation:**
- Every 3-7 seconds, time distorts (50%-150% speed)
- Random glitch effects: blur + brightness shift
- Visual artifacts make the experience feel unstable
- Screen flickers briefly (200-500ms)
- Creates dream-like temporal disorientation

**Code Location:** `startTemporalShifts()` in `src/app.js`

```javascript
// Random temporal distortion
appState.timeDistortion = 0.5 + Math.random() * 1.5;
canvas.style.filter = `blur(${Math.random() * 2}px) brightness(${0.8 + Math.random() * 0.4})`;
```

---

### 4. **VOICE OF THE MACHINE** ✅
**What it does:** System speaks back; AI narration; self-aware system

**Implementation:**
- Browser's Speech Synthesis API speaks at key moments
- 7 haunting narrator phrases:
  - "I am watching you read."
  - "Your eyes betray your thoughts."
  - "You are not alone here."
  - "What happens when you stop reading?"
  - "I remember all of you."
- Narration has slow rate (0.8x) and lower pitch for eerie effect
- Adjustable volume via `appState.narratorVolume`
- Randomly triggers during reading phase

**Code Location:** `initializeNarrator()` in `src/app.js`

```javascript
const utterance = new SpeechSynthesisUtterance(text);
utterance.rate = 0.8;  // Slower speech
utterance.pitch = 0.7; // Lower pitch
speechSynthesis.speak(utterance);
```

---

### 5. **METAMORPHIC MEDIA** ✅
**What it does:** Nothing static; evolving visuals; real-time morphing

**Implementation:**
- Particle colors continuously shift through HSL spectrum
- Background fog hue rotates (0° → 360°)
- State variable `appState.metamorphicState` tracks evolution
- Every 100ms, visuals morph to new state
- Creates sense of living, breathing world

**Code Location:** `startMetamorphicMedia()` in `src/app.js`

```javascript
// Particles color-shift through rainbow
const hue = (appState.metamorphicState * 360 + p.position.x) % 360;
p.material.color.setHSL(hue / 360, 0.7, 0.5);

// Background morphs
scene.fog = new THREE.Fog(
  new THREE.Color().setHSL(hue / 360, 0.5, 0.1),
  1000, 2000
);
```

---

## 🚀 New Features Added

### Session Tracking
- Visitor count: "Dream visitor #N" displayed on export
- Historical emotion tracking
- Persistent dream awareness

### Enhanced Export
- Dream metadata included in exports
- Emotional memory summary
- Metamorphic state snapshot
- Temporal distortion log

### Narrator Integration
- `window.speakNarration()` - Call to speak any text
- Self-aware system messages
- Ambient commentary during experience

### Debug/Dev Mode
- Console logs for feature activation
- `appState.dreamIntensity` - Control dream severity
- `appState.timeDistortion` - Monitor time effects
- `appState.metamorphicState` - Track evolution progress

---

## 📊 Data Persistence

### LocalStorage Keys
```javascript
erasure_memory        // Emotional history (JSON)
```

### Session State
```javascript
appState = {
  // ... existing fields ...
  emotionalMemory: {},      // Past emotions
  dreamIntensity: 0.5,      // 0-1 scale
  timeDistortion: 1.0,      // Speed multiplier
  interfaceBreathing: true, // UI animation toggle
  narratorVolume: 0.3,      // 0-1 scale
  metamorphicState: 0       // 0-1 evolution
}
```

---

## 🎨 CSS Animations Added

```css
@keyframes fadeInOut {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.02); opacity: 1; }
}

@keyframes temporalGlitch {
  0%, 100% { filter: none; }
  50% { filter: blur(2px) brightness(0.6); }
}

@keyframes metamorphicShift {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
```

---

## 🔄 Experience Flow (Now Enhanced)

```
1. ARRIVAL (30s)
   ├─ UI breathing starts
   ├─ Emotional memory loaded
   └─ Dream intensity calibrated

2. READING (10s)
   ├─ Fluid interface breathes
   ├─ Temporal shifts occur randomly
   ├─ Narrator speaks ambient phrases
   ├─ Particles metamorphically shift colors
   ├─ Story displayed in evolving visuals
   └─ Emotional trajectory recorded

3. ENDING (5s+)
   ├─ Text decays
   ├─ Metamorphic colors fade
   └─ Temporal distortion stops

4. EXPORT
   ├─ Dream metadata included
   ├─ Visitor count displayed
   ├─ Emotional memory saved
   └─ 7 artifacts exported
```

---

## 🎯 Dreamware 2025 Alignment

✅ **Surreal** - Temporal glitches, morphing visuals, disorienting time  
✅ **Emotional** - Emotion detection, memory tracking, narrator speaks feelings  
✅ **Nonlinear** - Each reload = new random story, different emotions, unique path  
✅ **Alive** - Breathing UI, evolving colors, self-aware narrator, remembers you  

✅ **Feeling over Function** - Not productivity tool, pure experience  
✅ **Emotion drives interaction** - Wonder + Unease as primary drivers  

---

## 🔧 Technical Specs

- **Build System**: Vite 5.4.21 (3,101 modules)
- **3D Engine**: Three.js r128
- **AI**: TensorFlow.js + Face-API (emotion detection)
- **Audio**: Tone.js (procedural) + Web Speech API (narration)
- **Real-time**: Socket.io (multi-user sync)
- **Animation**: GSAP + CSS animations
- **Persistence**: localStorage + Firebase (backend)
- **Dev Server**: Localhost:5173
- **Backend**: Express + Socket.io on localhost:3000

---

## 🌟 Key Metrics

| Metric | Value |
|--------|-------|
| Dream Fragments Implemented | 5/5 ✅ |
| Emotion Tracked | Joy, Sadness, Fear, Anger, Neutral |
| Visitor Memory Depth | Unlimited (localStorage) |
| Color Morphing Speed | 100ms interval |
| Narrator Phrases | 7 unique lines |
| Temporal Distortion Range | 0.5x - 1.5x speed |
| UI Breathing Cycle | 3 seconds |
| Total Lines of Dream Code | 250+ |

---

## 🎬 Next Steps / Potential Enhancements

1. **Dream Branching** - Different story seeds based on emotional memory
2. **Collective Consciousness** - All readers' emotions influence one master dream
3. **Persistent Ghosts** - Past readers' emotional imprints appear
4. **Neural Feedback** - BCI integration for true consciousness upload
5. **Dream Sharing** - QR codes to share individual dreams
6. **Lucid Dreaming Mode** - User controls story progression
7. **Nightmare Pathway** - High unease = darker, more unsettling experience

---

## 📋 Submission Checklist

- ✅ Working project (Full 4-phase experience)
- ✅ Original work (Built during hackathon)
- ✅ Clear emotional intent (Wonder + Unease)
- ✅ Dreamware fragments (5/5 implemented)
- ✅ Brief description (This document)
- ✅ Technical execution (Polished, handles edge cases)
- ✅ Concept & depth (Evokes emotion, cohesive vision)
- ✅ Originality & presence (Memorable, atmospheric)

---

**ERASURE is ready for Dreamware 2025 submission!**

*"The dream remembers you. Now, the dream will make you remember the dream."*
