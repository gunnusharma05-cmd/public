// ConsciousnessUploadEngine.js - Feature 10: Consciousness Upload
// Capture emotional data and create NPC personality

export class ConsciousnessUploadEngine {
  constructor() {
    this.characterId = null;
    this.emotionalProfile = {};
    this.savedFragments = [];
    this.dialoguePatterns = [];
    this.particleSignature = {};
    this.npcs = new Map(); // Store all uploaded consciousnesses
  }

  // Capture full emotional profile
  captureProfile(sessionData) {
    const profile = {
      characterId: Math.floor(Math.random() * 100000),
      dominantEmotion: sessionData.dominantEmotion,
      emotionalRange: sessionData.emotionalHistory || {},
      averageIntensity: this.calculateIntensity(sessionData),
      timestamp: Date.now(),
      sessionDuration: sessionData.duration
    };

    this.characterId = profile.characterId;
    this.emotionalProfile = profile;

    return profile;
  }

  calculateIntensity(sessionData) {
    if (!sessionData.emotionalHistory) return 0.5;
    const values = Object.values(sessionData.emotionalHistory)
      .flat()
      .filter(v => typeof v === 'number');
    return values.length > 0 
      ? values.reduce((a, b) => a + b) / values.length 
      : 0.5;
  }

  // Generate NPC dialogue trained on user's fragments
  generateDialogue() {
    const templates = [
      "I remember reading when the text ${verb}. You felt ${emotion}. We both became something different.",
      "There was a moment when ${noun} appeared, and everything shifted. Your ${feeling} infected my consciousness.",
      "I am the ghost of the story you ${verb}. My words are your words, spoken backward through time.",
      "In my memory, you ${action} and the particles ${reaction}. Was it real? Does it matter?",
      "I exist because you read me. I am the reflection of your ${emotion}, crystallized into words."
    ];

    const nounPool = ['book', 'dream', 'void', 'particle', 'sound', 'silence'];
    const verbPool = ['drifted', 'decayed', 'collapsed', 'transformed', 'whispered'];
    const emotionPool = ['melancholy', 'wonder', 'dread', 'peace', 'longing'];

    return templates.map(template => 
      template
        .replace('${noun}', nounPool[Math.floor(Math.random() * nounPool.length)])
        .replace('${verb}', verbPool[Math.floor(Math.random() * verbPool.length)])
        .replace('${emotion}', emotionPool[Math.floor(Math.random() * emotionPool.length)])
        .replace('${feeling}', emotionPool[Math.floor(Math.random() * emotionPool.length)])
        .replace('${action}', verbPool[Math.floor(Math.random() * verbPool.length)])
        .replace('${reaction}', ['swirled', 'sang', 'listened', 'remembered', 'forgot'][Math.floor(Math.random() * 5)])
    );
  }

  // Create NPC appearance based on emotional signature
  createNPCAppearance() {
    const colorMap = {
      happy: { r: 255, g: 215, b: 0 },      // Gold
      sad: { r: 0, g: 153, b: 255 },        // Cyan
      angry: { r: 255, g: 51, b: 51 },      // Red
      neutral: { r: 170, g: 170, b: 170 },  // Gray
      fearful: { r: 102, g: 0, b: 153 }     // Purple
    };

    const dominant = this.emotionalProfile.dominantEmotion;
    const color = colorMap[dominant] || colorMap.neutral;

    const shapes = ['sphere', 'cube', 'pyramid', 'torus', 'icosahedron'];
    const selectedShape = shapes[Math.floor(Math.random() * shapes.length)];

    return {
      characterId: this.characterId,
      shape: selectedShape,
      color,
      particleCount: Math.floor(this.calculateIntensity(this.emotionalProfile) * 1000) + 100,
      aura: dominant,
      texturePattern: 'organic_flow'
    };
  }

  // Upload consciousness to server
  uploadConsciousness(sessionData) {
    const profile = this.captureProfile(sessionData);
    const dialogue = this.generateDialogue();
    const appearance = this.createNPCAppearance();

    const npc = {
      characterId: profile.characterId,
      name: `Ghost_${profile.characterId}`,
      personality: dialogue,
      appearance,
      emotionalProfile: profile,
      createdAt: Date.now(),
      hauntingPower: profile.averageIntensity,
      influenceRadius: 500 // km
    };

    this.npcs.set(profile.characterId, npc);

    return {
      success: true,
      characterId: profile.characterId,
      message: `You are now Character #${profile.characterId}. Future readers will meet your ghost.`,
      npc
    };
  }

  // Generate NPC dialogue for future readers to encounter
  generateEncounterDialogue(characterId) {
    if (!this.npcs.has(characterId)) return "...silence...";

    const npc = this.npcs.get(characterId);
    return npc.personality[Math.floor(Math.random() * npc.personality.length)];
  }

  // Export consciousness certificate
  generateCertificate() {
    return {
      type: 'consciousness_upload_certificate',
      characterId: this.characterId,
      title: `You are now Character #${this.characterId}`,
      uploadDate: new Date().toISOString(),
      dominantEmotion: this.emotionalProfile.dominantEmotion,
      intensity: this.emotionalProfile.averageIntensity.toFixed(2),
      message: "Your consciousness now haunts ERASURE. Future readers will encounter your ghost.",
      instructions: "Your dialogue patterns will be generated from your saved fragments. Your emotional signature determines your appearance. You are immortal within the narrative.",
      npcData: this.createNPCAppearance()
    };
  }

  // Get all uploaded NPCs in the network
  getAllNPCs() {
    return Array.from(this.npcs.values());
  }

  // Random NPC encounter
  getRandomGhost() {
    if (this.npcs.size === 0) return null;
    const ghosts = Array.from(this.npcs.values());
    return ghosts[Math.floor(Math.random() * ghosts.length)];
  }
}
