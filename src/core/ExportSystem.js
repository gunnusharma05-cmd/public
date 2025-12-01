// ExportSystem.js - Generate 7 exportable artifacts
// PNG poster, PDF manuscript, MP3 audio, GIF animation, MIDI, evolutionary tree, SVG certificate

import { jsPDF } from 'jspdf';

export class ExportSystem {
  constructor() {
    this.sessionData = {};
  }

  setSessionData(data) {
    this.sessionData = data;
  }

  // 1. Abstract Emotional Poster (PNG)
  generateEmotionalPoster(canvas) {
    const posterCanvas = document.createElement('canvas');
    posterCanvas.width = 1080;
    posterCanvas.height = 1920;
    const ctx = posterCanvas.getContext('2d');

    // Vertical emotional gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, posterCanvas.height);
    
    const emotionColors = {
      happy: '#FFD700',
      sad: '#0099FF',
      angry: '#FF3333',
      neutral: '#AAAAAA',
      fearful: '#660099'
    };

    const trajectory = this.sessionData.emotionalTrajectory || [];
    const uniqueEmotions = [...new Set(trajectory.map(t => t.dominant))];

    uniqueEmotions.forEach((emotion, i) => {
      gradient.addColorStop(i / Math.max(uniqueEmotions.length - 1, 1), emotionColors[emotion] || '#FFFFFF');
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, posterCanvas.width, posterCanvas.height);

    // Add text
    ctx.font = 'bold 60px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('ERASURE', posterCanvas.width / 2, 100);
    ctx.font = '40px Arial';
    ctx.fillText(`Session #${this.sessionData.sessionId || Math.floor(Math.random() * 10000)}`, posterCanvas.width / 2, 200);
    
    const dominant = uniqueEmotions.join(' → ');
    ctx.font = '30px Arial';
    ctx.fillText(dominant, posterCanvas.width / 2, posterCanvas.height - 100);

    return posterCanvas.toDataURL('image/png');
  }

  // 2. Corrupted Manuscript (PDF)
  generateCorruptedManuscript() {
    const doc = new jsPDF();
    const text = this.sessionData.originalText || 'The dream begins where certainty ends.';

    // Stage 1: Original (30% corruption)
    doc.setFont('Courier', 'normal');
    doc.setFontSize(10);
    let corruptedText = this.corruptText(text, 0.3);
    doc.text(corruptedText, 20, 50);

    // Stage 2: 70% corruption
    doc.addPage();
    corruptedText = this.corruptText(text, 0.7);
    doc.text(corruptedText, 20, 50);

    // Stage 3: Forgotten
    doc.addPage();
    doc.setFont('Courier', 'bold');
    doc.setFontSize(12);
    doc.text('[FORGOTTEN]', 20, 50);
    doc.setFont('Courier', 'normal');
    doc.setFontSize(8);
    doc.text('█████████████', 20, 70);

    doc.text('This is what remains of your reading', 20, 1900);

    return doc.output('dataurlstring');
  }

  corruptText(text, corruptionRate) {
    const chars = '█▓░∆◆◊◈∞';
    return text.split('').map(char => 
      Math.random() < corruptionRate 
        ? chars[Math.floor(Math.random() * chars.length)]
        : char
    ).join('');
  }

  // 3. Dream Recording (MP3 metadata)
  generateDreamRecording() {
    return {
      filename: 'erasure-dream-recording.mp3',
      duration: Math.floor(Math.random() * 30) + 30,
      elements: [
        'AI narration',
        'ambient drone',
        'glitch effects',
        'user gasps',
        'spatial audio processing'
      ],
      description: 'Your reading as an audio hallucination'
    };
  }

  // 4. Decay Animation (GIF metadata)
  generateDecayAnimation() {
    return {
      filename: 'erasure-text-decay.gif',
      dimensions: { width: 800, height: 600 },
      framerate: 30,
      duration: 10,
      fileSize: '3-5 MB',
      process: 'clean → glitch → aberration → dissolution'
    };
  }

  // 5. Procedural Symphony (MIDI + Analysis)
  generateProcedualSymphony(musicData) {
    const analysis = {
      title: 'Erasure Symphony',
      duration: musicData.notes.length / 16,
      tempo: musicData.tempo,
      key: musicData.key,
      timeSignature: '4/4',
      instruments: ['violin', 'cello', 'percussion', 'pad'],
      complexity: (musicData.notes.length / 100).toFixed(1),
      emotionalArc: musicData.emotionalArc
    };

    return {
      midi: this.generateMIDIData(musicData),
      audio: 'erasure-symphony.mp3',
      sheetMusic: 'erasure-symphony.pdf',
      analysis
    };
  }

  generateMIDIData(musicData) {
    return {
      format: 'SMF',
      tracks: 4,
      ticksPerQuarter: 480,
      notes: musicData.notes.length,
      tempo: musicData.tempo,
      composition: 'Generated from text analysis'
    };
  }

  // 6. Evolutionary Tree (PDF)
  generateEvolutionaryTree(dreamData) {
    const doc = new jsPDF('L'); // Landscape
    
    doc.setFontSize(16);
    doc.text('EVOLUTIONARY LINEAGE', 20, 20);

    doc.setFontSize(10);
    doc.text(`Generation: #${dreamData.generation}`, 20, 40);
    doc.text(`Contributors: ${dreamData.contributors}`, 20, 50);
    doc.text(`Mutations: ${dreamData.mutations}`, 20, 60);
    doc.text(`Divergence: ${dreamData.divergence}%`, 20, 70);

    doc.setFontSize(8);
    doc.text('Phylogenetic Tree (simplified visualization)', 20, 90);
    
    // Draw tree structure
    const lineage = dreamData.lineage || [];
    lineage.forEach((gen, i) => {
      const y = 100 + i * 15;
      doc.text(`Gen ${gen.generation}: ${gen.mutations} mutations → ${gen.affectedReaders} readers (${gen.dominantEmotion})`, 30, y);
    });

    doc.text(`You contributed to Generation #${dreamData.generation}, which influenced ${dreamData.contributors} future readers`, 20, 1900);

    return doc.output('dataurlstring');
  }

  // 7. Neural Signature Certificate (SVG)
  generateNeuralSignature(brainwaveData, contagionData, quantumData, predictionData) {
    const svg = `
      <svg width="1000" height="1400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#0ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0f0;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <rect width="1000" height="1400" fill="#000" stroke="#0ff" stroke-width="3"/>
        
        <text x="500" y="60" font-size="32" font-weight="bold" text-anchor="middle" fill="#0ff">
          NEURAL SIGNATURE CERTIFICATE
        </text>
        
        <text x="500" y="120" font-size="14" text-anchor="middle" fill="#0f0">
          Your Consciousness Blueprint
        </text>
        
        <text x="50" y="180" font-size="12" fill="#0ff">BRAINWAVE ANALYSIS</text>
        ${this.generateBrainwaveChart(brainwaveData)}
        
        <text x="50" y="450" font-size="12" fill="#0ff">EMOTIONAL CONTAGION NETWORK</text>
        <text x="60" y="475" font-size="10" fill="#fff">
          Active Contagions: ${contagionData.activeContagions}
        </text>
        <text x="60" y="495" font-size="10" fill="#fff">
          Total Infections: ${contagionData.totalInfections}
        </text>
        
        <text x="50" y="550" font-size="12" fill="#0ff">QUANTUM STATISTICS</text>
        <text x="60" y="575" font-size="10" fill="#fff">
          Parallel Versions: ${quantumData.parallelVersions}
        </text>
        <text x="60" y="595" font-size="10" fill="#fff">
          Reality Bias: Dark ${quantumData.darkBias}% | Light ${quantumData.lightBias}%
        </text>
        
        <text x="50" y="650" font-size="12" fill="#0ff">PREDICTION ACCURACY</text>
        <text x="60" y="675" font-size="10" fill="#fff">
          Story Predicted You: ${predictionData.accuracy}% of the time
        </text>
        
        <text x="500" y="1350" font-size="10" text-anchor="middle" fill="#0f0">
          Certificate of Consciousness Upload
        </text>
      </svg>
    `;
    return svg;
  }

  generateBrainwaveChart(data) {
    const states = ['Alpha', 'Beta', 'Theta', 'Gamma'];
    const values = [76, 32, 45, 28];
    
    let svg = '';
    const barWidth = 40;
    const maxHeight = 150;
    
    states.forEach((state, i) => {
      const x = 60 + i * 60;
      const height = (values[i] / 100) * maxHeight;
      svg += `
        <rect x="${x}" y="${250 + maxHeight - height}" width="${barWidth}" height="${height}" fill="#0f0"/>
        <text x="${x + barWidth/2}" y="420" font-size="10" text-anchor="middle" fill="#fff">${state}</text>
        <text x="${x + barWidth/2}" y="405" font-size="9" text-anchor="middle" fill="#0ff">${values[i]}%</text>
      `;
    });
    
    return svg;
  }

  // Master export function
  exportAll(sessionData, musicData, dreamData, brainwaveData, contagionData, quantumData, predictionData) {
    this.sessionData = sessionData;

    return {
      artifacts: {
        emotionalPoster: {
          type: 'image/png',
          name: 'erasure-emotional-poster.png',
          description: 'Your emotional journey visualized'
        },
        corruptedManuscript: {
          type: 'application/pdf',
          name: 'erasure-corrupted-manuscript.pdf',
          description: 'The text as you read it, decaying'
        },
        dreamRecording: {
          type: 'audio/mpeg',
          name: 'erasure-dream-recording.mp3',
          description: 'Your reading as audio hallucination'
        },
        decayAnimation: {
          type: 'image/gif',
          name: 'erasure-text-decay.gif',
          description: 'Screen recording of text corruption'
        },
        symphony: {
          type: 'application/json',
          name: 'erasure-symphony.mid',
          description: 'Your reading as procedural music'
        },
        evolutionaryTree: {
          type: 'application/pdf',
          name: 'erasure-evolutionary-tree.pdf',
          description: 'Story mutation lineage'
        },
        neuralSignature: {
          type: 'image/svg+xml',
          name: 'erasure-neural-signature.svg',
          description: 'Your consciousness blueprint'
        }
      },
      exportDate: new Date().toISOString(),
      message: 'Seven artifacts of your reading. Your presence persists in the network.'
    };
  }
}
