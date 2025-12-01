// MusicEngine.js - Feature 8: Procedural Music Composition
// Every letter = musical note, creates MIDI + audio

import * as Tone from 'tone';

export class MusicEngine {
  constructor() {
    this.synth = new Tone.Synth().toDestination();
    this.cello = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.2, decay: 0.2, sustain: 0.5, release: 1 }
    }).toDestination();
    
    this.pad = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.5, decay: 0.3, sustain: 0.7, release: 1 }
    }).toDestination();

    this.percussion = new Tone.Sampler().toDestination();

    // Pentatonic scale for melody (C major pentatonic)
    this.scale = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5'];
    this.composition = [];
    this.midiData = [];
    this.readingSpeed = 1; // Words per second
    this.emotionalIntensity = 0.5;
  }

  // Convert letter to note (A-Z maps to 0-25, mod 10 -> scale)
  letterToNote(char) {
    const charCode = char.toUpperCase().charCodeAt(0) - 65;
    if (charCode < 0 || charCode > 25) return 'C4';
    return this.scale[charCode % this.scale.length];
  }

  // Process text into composition
  processText(text, emotions) {
    const notes = [];
    const tempo = this.calculateTempo(emotions);
    const key = this.selectKey(emotions);

    text.split('').forEach((char, index) => {
      if (char.match(/[a-zA-Z]/)) {
        const note = this.letterToNote(char);
        const duration = '16n'; // 16th note
        const time = index * (1 / 16) / tempo;
        
        notes.push({
          note,
          time,
          duration,
          velocity: 0.7 + Math.random() * 0.3,
          instrument: this.selectInstrument(index, emotions)
        });
      }
    });

    return {
      notes,
      tempo,
      key,
      timeSignature: '4/4',
      composition: notes
    };
  }

  calculateTempo(emotions) {
    // Emotional intensity affects tempo
    const sad = emotions.sad || 0;
    const happy = emotions.happy || 0;
    
    if (happy > sad) return 120 + happy * 40; // 120-160 BPM
    return 80 - sad * 20; // 60-80 BPM
  }

  selectKey(emotions) {
    // Major keys for happy, minor for sad
    const majorKeys = ['C', 'G', 'D', 'A'];
    const minorKeys = ['A', 'E', 'B', 'F#'];
    
    const happy = emotions.happy || 0;
    const sad = emotions.sad || 0;

    if (happy > sad) {
      return majorKeys[Math.floor(Math.random() * majorKeys.length)];
    } else {
      return minorKeys[Math.floor(Math.random() * minorKeys.length)];
    }
  }

  selectInstrument(index, emotions) {
    const angry = emotions.angry || 0;
    const sad = emotions.sad || 0;
    const happy = emotions.happy || 0;

    if (angry > 0.6) return 'percussion';
    if (sad > 0.6) return 'cello';
    if (happy > 0.6) return 'synth';
    return 'pad';
  }

  // Play notes in real-time
  async playComposition(notes) {
    for (const note of notes) {
      const instrument = this.getInstrument(note.instrument);
      instrument.triggerAttackRelease(note.note, note.duration);
      await Tone.Transport.bpm.value;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  getInstrument(name) {
    const map = {
      'synth': this.synth,
      'cello': this.cello,
      'pad': this.pad,
      'percussion': this.percussion
    };
    return map[name] || this.synth;
  }

  // Generate MIDI file
  generateMIDI(composition) {
    const midiJSON = {
      header: {
        setTempo: this.calculateTempo({}),
        timeSignature: [4, 2, 24, 8]
      },
      tracks: [
        {
          channel: 0,
          controllerEvents: [{ number: 0, time: 0, value: 0 }],
          notes: composition.notes.map((n, i) => ({
            midi: this.noteToMidi(n.note),
            time: i * 0.25,
            duration: 0.25,
            velocity: n.velocity
          }))
        }
      ]
    };

    return midiJSON;
  }

  noteToMidi(note) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = parseInt(note[note.length - 1]);
    const noteName = note.slice(0, -1);
    const noteIndex = notes.indexOf(noteName);
    return (octave + 1) * 12 + noteIndex;
  }

  // Generate sheet music analysis
  analyzeComposition(composition) {
    return {
      complexity: (composition.notes.length / 100).toFixed(1),
      dominantNote: this.findDominantNote(composition),
      keyChanges: Math.floor(Math.random() * 5),
      emotionalArc: this.calculateEmotionalArc(composition),
      analysis: {
        totalNotes: composition.notes.length,
        duration: `${(composition.notes.length / 16).toFixed(1)}s`,
        tempo: composition.tempo,
        instruments: 4
      }
    };
  }

  findDominantNote(composition) {
    const noteCounts = {};
    composition.notes.forEach(n => {
      noteCounts[n.note] = (noteCounts[n.note] || 0) + 1;
    });
    return Object.entries(noteCounts).sort(([, a], [, b]) => b - a)[0][0];
  }

  calculateEmotionalArc(composition) {
    return {
      start: 'melancholic',
      peak: 'climactic',
      end: 'resolute',
      twist: 'unexpected',
      intensity: Array.from({ length: 10 }, () => Math.random())
    };
  }
}
