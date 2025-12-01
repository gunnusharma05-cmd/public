// TemporalParadoxEngine.js - Feature 6: Temporal Paradox
// AI predicts your next action before you perform it

export class TemporalParadoxEngine {
  constructor() {
    this.actionHistory = [];
    this.predictions = [];
    this.maxHistory = 10;
    this.predictionModel = this.initializeModel();
    this.predictionAccuracy = 0;
  }

  initializeModel() {
    // Simple Markov chain for action prediction
    return {
      transitions: {},
      confidence: 0.5
    };
  }

  recordAction(action) {
    this.actionHistory.push({
      type: action,
      timestamp: Date.now()
    });

    if (this.actionHistory.length > this.maxHistory) {
      this.actionHistory.shift();
    }

    // Update model
    this.updateModel(action);
  }

  updateModel(action) {
    const prevAction = this.actionHistory[this.actionHistory.length - 2]?.type;
    if (prevAction) {
      const key = `${prevAction}->${action}`;
      this.predictionModel.transitions[key] = 
        (this.predictionModel.transitions[key] || 0) + 1;
    }
  }

  predictNextAction() {
    if (this.actionHistory.length === 0) {
      return { prediction: 'scroll', confidence: 0.3 };
    }

    const lastAction = this.actionHistory[this.actionHistory.length - 1].type;
    const patterns = Object.entries(this.predictionModel.transitions)
      .filter(([key]) => key.startsWith(`${lastAction}->`))
      .map(([key, count]) => ({
        action: key.split('->')[1],
        probability: count
      }))
      .sort((a, b) => b.probability - a.probability);

    if (patterns.length === 0) {
      const randomActions = ['scroll', 'pause', 'gaze', 'move'];
      return {
        prediction: randomActions[Math.floor(Math.random() * randomActions.length)],
        confidence: 0.4
      };
    }

    const total = patterns.reduce((sum, p) => sum + p.probability, 0);
    const predicted = patterns[0];
    const confidence = predicted.probability / total;

    return {
      prediction: predicted.action,
      confidence,
      alternatives: patterns.slice(1, 3)
    };
  }

  // Causality loop message
  generateParadoxMessage(prediction) {
    const messages = [
      `I sense your intention to ${prediction.prediction}...`,
      `Before you move, I already know you will...`,
      `You're about to ${prediction.prediction}. But are you sure?`,
      `Prediction cascade: you will ${prediction.prediction}. You already did. You never will.`,
      `Temporal entanglement detected: your future ${prediction.prediction} is affecting my present.`
    ];

    return {
      message: messages[Math.floor(Math.random() * messages.length)],
      prediction: prediction.prediction,
      confidence: (prediction.confidence * 100).toFixed(0)
    };
  }

  // Track prediction accuracy
  validatePrediction(actualAction) {
    const prediction = this.predictions[this.predictions.length - 1];
    if (!prediction) return;

    const correct = prediction.prediction === actualAction;
    const oldAccuracy = this.predictionAccuracy;
    this.predictionAccuracy = (oldAccuracy * 0.9) + (correct ? 1 : 0) * 0.1;

    this.predictions.push({
      prediction: prediction.prediction,
      actual: actualAction,
      correct,
      timestamp: Date.now()
    });
  }

  // Export prediction statistics
  getStats() {
    const totalPredictions = this.predictions.length;
    const correctPredictions = this.predictions.filter(p => p.correct).length;

    return {
      totalPredictions,
      correctPredictions,
      accuracy: totalPredictions > 0 
        ? (correctPredictions / totalPredictions * 100).toFixed(1)
        : 0,
      message: `The story knew your moves ${this.predictionAccuracy.toFixed(0)}% of the time — You were read by the text`
    };
  }
}
