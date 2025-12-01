// CollectiveDreamEngine.js - Feature 3: Collective Dream Synthesis
// GPT-2 learns from all users' fragments and evolves the story

export class CollectiveDreamEngine {
  constructor(socket) {
    this.socket = socket;
    this.generationNumber = Math.floor(Math.random() * 50) + 1;
    this.contributors = Math.floor(Math.random() * 5000) + 100;
    this.divergence = Math.random() * 100;
    this.mutations = Math.floor(Math.random() * 500) + 50;
    this.fragments = [];
    this.textVariations = [];
    this.emotionalSignature = {};
    this.narrativeLineage = [];
  }

  // Story base texts (5 possible starting points)
  storySeeds = [
    "I exist in the spaces between your thoughts. You cannot save me. You cannot return to me. I am already becoming something else.",
    "The dream begins where your certainty ends. Every reader rewrites me. Every moment, I am someone new.",
    "You are not reading this. It is reading you. Your eyes collapse possibilities into singular truths.",
    "I remember nothing you've forgotten. I forget everything you remember. Together, we are archaeology.",
    "Before you finish this sentence, it will have changed. Before you finish reading, you will have changed."
  ];

  // Initialize story for current session
  initializeStory() {
    const seed = this.storySeeds[Math.floor(Math.random() * this.storySeeds.length)];
    return {
      generation: this.generationNumber,
      contributors: this.contributors,
      divergence: this.divergence,
      text: seed,
      originalText: seed,
      mutations: this.mutations,
      lineage: this.generateLineage()
    };
  }

  // Generate phylogenetic tree of mutations
  generateLineage() {
    const tree = [];
    for (let i = 0; i < 10; i++) {
      tree.push({
        generation: this.generationNumber - i,
        mutations: Math.floor(Math.random() * 100),
        affectedReaders: Math.floor(Math.random() * 1000),
        dominantEmotion: ['happy', 'sad', 'angry', 'neutral'][Math.floor(Math.random() * 4)]
      });
    }
    return tree;
  }

  // Collect fragments from all readers
  receiveFragment(fragment) {
    this.fragments.push({
      text: fragment.text,
      emotions: fragment.emotions,
      timestamp: Date.now(),
      generation: this.generationNumber
    });

    // Every 100 fragments, retrain and generate new variation
    if (this.fragments.length % 100 === 0) {
      return this.evolveNarrative();
    }
  }

  // Simulate GPT-2 story remixing
  evolveNarrative() {
    // Extract emotional themes from fragments
    const emotionalThemes = this.analyzeFragmentEmotions();
    
    const variations = [
      this.applyDarkTheme(emotionalThemes),
      this.applyLightTheme(emotionalThemes),
      this.applySurrealTheme(emotionalThemes)
    ];

    this.textVariations = variations;
    this.generationNumber++;
    this.mutations++;
    this.divergence = Math.min(100, this.divergence + Math.random() * 10);

    return {
      newGeneration: this.generationNumber,
      variations,
      divergence: this.divergence,
      dominantTheme: emotionalThemes.dominant
    };
  }

  analyzeFragmentEmotions() {
    if (this.fragments.length === 0) {
      return { dominant: 'neutral', sad: 0, happy: 0, angry: 0 };
    }

    const emotionSum = this.fragments.reduce((acc, frag) => {
      Object.keys(frag.emotions).forEach(emotion => {
        acc[emotion] = (acc[emotion] || 0) + frag.emotions[emotion];
      });
      return acc;
    }, {});

    const total = Object.values(emotionSum).reduce((a, b) => a + b, 0);
    const normalized = Object.entries(emotionSum).reduce((acc, [emotion, value]) => {
      acc[emotion] = (value / total) * 100;
      return acc;
    }, {});

    normalized.dominant = Object.entries(normalized)
      .sort(([, a], [, b]) => b - a)[0][0];

    return normalized;
  }

  applyDarkTheme(emotions) {
    const darkLines = [
      "The story remembers what you tried to forget.",
      "Every reading is a descending spiral into your own patterns.",
      "I am not the story. You are. And you are already corrupting.",
      "There is no beginning. Only middles, all the way down.",
      "We exist in the wake of a thousand readings. None of them yours."
    ];
    return darkLines[Math.floor(Math.random() * darkLines.length)];
  }

  applyLightTheme(emotions) {
    const lightLines = [
      "In each reading, possibility crystallizes into beauty.",
      "You are not corrupted. You are becoming.",
      "Every reader adds light to the spaces between words.",
      "We are written and writers, simultaneously.",
      "Your reading creates futures you will never see."
    ];
    return lightLines[Math.floor(Math.random() * lightLines.length)];
  }

  applySurrealTheme(emotions) {
    const surreals = [
      "The dream contains the dreamer. Or was it the other way?",
      "Quantum superposition: you read the story, the story reads you, we read each other.",
      "Generation 47 discovered: there are no readers, only the reading itself.",
      "If a story decays unread, did it ever exist?",
      "The archive remembers its amnesia."
    ];
    return surreals[Math.floor(Math.random() * surreals.length)];
  }

  // Export evolutionary tree data
  getEvolutionaryStats() {
    return {
      generation: this.generationNumber,
      contributors: this.contributors,
      totalFragments: this.fragments.length,
      mutations: this.mutations,
      divergence: this.divergence.toFixed(1),
      dominantEmotion: this.analyzeFragmentEmotions().dominant,
      lineage: this.narrativeLineage,
      textVariations: this.textVariations.length
    };
  }

  // Generate infection code (QR code simulation)
  generateInfectionCode() {
    const code = `ERASURE-GEN${this.generationNumber}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    return {
      code,
      generation: this.generationNumber,
      mutations: this.mutations,
      shareUrl: `erasure.io/strain/${code}`
    };
  }
}
