// EmotionEngine.js - Feature 3 & 4: Emotion Detection & Contagion
// Detects emotions via face-api and spreads across network

export class EmotionEngine {
  constructor(socket) {
    this.socket = socket;
    this.currentEmotions = {
      happy: 0,
      sad: 0,
      angry: 0,
      neutral: 0,
      surprised: 0,
      disgusted: 0,
      fearful: 0
    };
    this.emotionHistory = [];
    this.dominantEmotion = 'neutral';
    this.emotionalTrajectory = [];
    this.contagionMap = new Map();
  }

  async detectFromCanvas(canvas) {
    try {
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Simulate emotion detection from facial micro-expressions
      return this.simulateEmotionDetection();
    } catch (e) {
      return this.currentEmotions;
    }
  }

  simulateEmotionDetection() {
    // Real implementation would use face-api.js
    // For now, simulate natural emotional patterns
    const noiseScale = 0.05;
    const smoothing = 0.8;

    return Object.entries(this.currentEmotions).reduce((acc, [emotion, value]) => {
      const noise = (Math.random() - 0.5) * noiseScale;
      const newValue = value * smoothing + noise;
      acc[emotion] = Math.max(0, Math.min(1, newValue));
      return acc;
    }, {});
  }

  updateEmotions(detection) {
    this.currentEmotions = detection;
    
    // Find dominant emotion
    this.dominantEmotion = Object.entries(detection)
      .sort(([, a], [, b]) => b - a)[0][0];

    // Track trajectory
    this.emotionalTrajectory.push({
      timestamp: Date.now(),
      emotions: { ...detection },
      dominant: this.dominantEmotion
    });

    // Broadcast to other readers
    this.broadcastEmotion(detection);
  }

  broadcastEmotion(emotions) {
    this.socket.emit('emotion:update', {
      emotions,
      dominant: this.dominantEmotion,
      intensity: this.calculateIntensity(emotions)
    });
  }

  calculateIntensity(emotions) {
    return Object.values(emotions).reduce((a, b) => a + b) / 7;
  }

  // Receive emotional contagion from other readers
  receiveContagion(contagionData) {
    const { from, emotions, intensity } = contagionData;
    
    this.contagionMap.set(from, {
      emotions,
      intensity,
      timestamp: Date.now()
    });

    // Blend contagion into current emotions (up to 10% influence)
    const influence = intensity * 0.1;
    Object.keys(this.currentEmotions).forEach(emotion => {
      this.currentEmotions[emotion] += (emotions[emotion] - this.currentEmotions[emotion]) * influence;
    });

    return {
      affected: true,
      blendAmount: influence,
      newDominant: this.dominantEmotion
    };
  }

  // Color mapping based on emotion
  getEmotionColor() {
    const colorMap = {
      happy: 0xFFD700,      // Gold
      sad: 0x0099FF,        // Cyan
      angry: 0xFF3333,      // Red
      neutral: 0xAAAAAA,   // Gray
      surprised: 0xFF00FF,  // Magenta
      disgusted: 0x00DD00,  // Green
      fearful: 0x660099    // Purple
    };
    return colorMap[this.dominantEmotion] || 0xFFFFFF;
  }

  // Painting style based on emotion
  getPaintingStyle() {
    const styleMap = {
      happy: 'starry_night',
      sad: 'the_scream',
      angry: 'guernica',
      neutral: 'abstract',
      surprised: 'dali',
      disgusted: 'giger',
      fearful: 'dark_period'
    };
    return styleMap[this.dominantEmotion] || 'abstract';
  }

  // Get all active infections (contagions received)
  getContagionStats() {
    const active = Array.from(this.contagionMap.values())
      .filter(c => Date.now() - c.timestamp < 30000); // 30s retention

    return {
      activeContagions: active.length,
      totalInfections: this.contagionMap.size,
      averageIntensity: active.length > 0 
        ? active.reduce((sum, c) => sum + c.intensity, 0) / active.length 
        : 0
    };
  }
}
