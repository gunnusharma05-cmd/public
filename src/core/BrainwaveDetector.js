// BrainwaveDetector.js - Feature 5: Synesthetic Brain-Wave Detection
// Detects micro-facial movements and maps to brainwave states

export class BrainwaveDetector {
  constructor(videoElement) {
    this.video = videoElement;
    this.blinkRate = 0;
    this.eyeMovementSpeed = 0;
    this.muscleTwitchActivity = 0;
    this.estimatedBrainwaves = {
      alpha: 0,    // 8-12 Hz (relaxed)
      beta: 0,     // 12-30 Hz (active)
      theta: 0,    // 4-8 Hz (drowsy)
      gamma: 0     // 30-100 Hz (focused)
    };
  }

  // Detect micro-movements from video
  detectMicroMovements() {
    // Simplified simulation (real implementation would use face-api)
    const now = Date.now();
    
    return {
      blinkRate: (Math.sin(now * 0.002) + 1) * 15,      // blinks per minute
      eyeMovementSpeed: Math.random() * 500,             // pixels per second
      muscleTwitchActivity: Math.random() * 0.5,         // activity level 0-1
      facialAspectRatio: 0.3 + Math.random() * 0.2,
      eyeOpenness: 0.5 + Math.sin(now * 0.003) * 0.4
    };
}

  // Map facial metrics to brainwave states
  estimateBrainwaveState(movements) {
    // Alpha (relaxed): Low blink rate, slow eye movement
    if (movements.blinkRate < 15 && movements.eyeMovementSpeed < 100) {
      this.estimatedBrainwaves.alpha = 0.8;
      this.estimatedBrainwaves.beta = 0.2;
    }
    // Beta (active): High blink rate, fast eye movement
    else if (movements.blinkRate > 20 && movements.eyeMovementSpeed > 300) {
      this.estimatedBrainwaves.beta = 0.9;
      this.estimatedBrainwaves.alpha = 0.1;
    }
    // Theta (drowsy): Closed eyes, slow movement
    else if (movements.eyeOpenness < 0.3) {
      this.estimatedBrainwaves.theta = 0.7;
      this.estimatedBrainwaves.alpha = 0.3;
    }
    // Gamma (focused): Intense activity, muscle tension
    else if (movements.muscleTwitchActivity > 0.6) {
      this.estimatedBrainwaves.gamma = 0.8;
      this.estimatedBrainwaves.beta = 0.2;
    }
    // Neutral default
    else {
      Object.keys(this.estimatedBrainwaves).forEach(state => {
        this.estimatedBrainwaves[state] = 0.25;
      });
    }

    return this.estimatedBrainwaves;
  }

  // Visual effects based on brainwave state
  getVisualEffects() {
    const effects = {
      alpha: {
        particlePattern: 'flowing_waves',
        motionSmoothing: 0.9,
        colorPalette: 'blues_purples',
        particleSize: 'medium',
        glowIntensity: 0.4
      },
      beta: {
        particlePattern: 'geometric_grid',
        motionSmoothing: 0.3,
        colorPalette: 'sharp_colors',
        particleSize: 'small',
        glowIntensity: 0.8
      },
      theta: {
        particlePattern: 'dreamy_blur',
        motionSmoothing: 0.95,
        colorPalette: 'soft_gradient',
        particleSize: 'large',
        glowIntensity: 0.1
      },
      gamma: {
        particlePattern: 'fractal_zoom',
        motionSmoothing: 0.1,
        colorPalette: 'high_contrast',
        particleSize: 'tiny',
        glowIntensity: 1.0,
        cameraShake: 0.5
      }
    };

    // Return effects for dominant brainwave
    const dominant = Object.entries(this.estimatedBrainwaves)
      .sort(([, a], [, b]) => b - a)[0][0];

    return effects[dominant];
  }

  // Audio frequencies matching brainwave states
  getAudioFrequency() {
    const frequencies = {
      alpha: 400,      // 400 Hz
      beta: 1000,      // 1000 Hz
      theta: 200,      // 200 Hz
      gamma: 2000      // 2000 Hz
    };

    const dominant = Object.entries(this.estimatedBrainwaves)
      .sort(([, a], [, b]) => b - a)[0][0];

    return frequencies[dominant];
  }

  // Binaural beating for brainwave entrainment
  generateBinauralBeat(baseFrequency) {
    const beatFrequencies = {
      alpha: 10,  // 10 Hz alpha wave
      beta: 20,   // 20 Hz beta wave
      theta: 6,   // 6 Hz theta wave
      gamma: 40   // 40 Hz gamma wave
    };

    const dominant = Object.entries(this.estimatedBrainwaves)
      .sort(([, a], [, b]) => b - a)[0][0];

    return {
      leftFrequency: baseFrequency,
      rightFrequency: baseFrequency + beatFrequencies[dominant],
      beatFrequency: beatFrequencies[dominant]
    };
  }

  // Export neural signature
  exportNeuralSignature() {
    const total = Object.values(this.estimatedBrainwaves)
      .reduce((a, b) => a + b, 0);

    const normalized = Object.entries(this.estimatedBrainwaves)
      .reduce((acc, [state, value]) => {
        acc[state] = (value / total * 100).toFixed(1);
        return acc;
      }, {});

    normalized.dominant = Object.entries(this.estimatedBrainwaves)
      .sort(([, a], [, b]) => b - a)[0][0];

    return normalized;
  }
}
