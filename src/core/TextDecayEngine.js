// TextDecayEngine.js - Feature 2: Text Drift & Decay
// Words drift from cursor and decay after 10 seconds

export class TextDecayEngine {
  constructor() {
    this.decayTime = 10000; // 10 seconds
    this.glyphs = [];
    this.cursorPos = { x: 0, y: 0 };
    this.repulsionForce = 200;
  }

  createGlyph(char, x, y) {
    return {
      char,
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      createdAt: Date.now(),
      opacity: 1,
      corruption: 0,
      scale: 1,
      rotation: 0
    };
  }

  updateGlyphs(cursorPos, deltaTime) {
    this.cursorPos = cursorPos;

    this.glyphs.forEach(glyph => {
      const age = Date.now() - glyph.createdAt;
      const progress = age / this.decayTime;

      // Inverse gravity - repel from cursor
      const dx = glyph.x - cursorPos.x;
      const dy = glyph.y - cursorPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 300) {
        const force = this.repulsionForce / (dist + 1);
        glyph.vx += (dx / (dist + 1)) * force * deltaTime * 0.001;
        glyph.vy += (dy / (dist + 1)) * force * deltaTime * 0.001;
      }

      // Apply velocity with damping
      glyph.x += glyph.vx * deltaTime * 0.1;
      glyph.y += glyph.vy * deltaTime * 0.1;
      glyph.vx *= 0.99;
      glyph.vy *= 0.99;

      // Corruption increases over time
      glyph.corruption = Math.min(1, progress);

      // Decay stages
      if (progress < 0.3) {
        // Normal
        glyph.opacity = 1;
      } else if (progress < 0.5) {
        // Letter substitution
        const chars = '█▓░∆◆◊◈∞';
        glyph.char = chars[Math.floor((progress - 0.3) * 50) % chars.length];
        glyph.opacity = 1;
      } else if (progress < 0.7) {
        // Chromatic aberration
        glyph.aberration = (progress - 0.5) * 10;
        glyph.opacity = 0.8;
      } else if (progress < 0.9) {
        // Blur and fade
        glyph.blur = (progress - 0.7) * 50;
        glyph.opacity = 1 - (progress - 0.7) * 5;
      } else {
        // Complete corruption
        glyph.opacity = 0;
        glyph.corrupted = true;
      }

      // Rotation animation
      glyph.rotation += glyph.corruption * 0.1;
    });

    // Remove fully corrupted glyphs
    this.glyphs = this.glyphs.filter(g => !g.corrupted);
  }

  // Create corrupted fragment for memory archaeology
  createFragment(glyph) {
    return {
      original: glyph.char,
      corrupted: Math.random() > 0.5 ? '█' : '░',
      position: { x: glyph.x, y: glyph.y },
      age: Date.now() - glyph.createdAt,
      reconstructions: [
        glyph.char,
        String.fromCharCode(65 + Math.random() * 26),
        '█'
      ]
    };
  }

  // Memory archaeology - reconstruct corrupted text
  excavateFragments() {
    return {
      layers: [
        { name: 'Original', opacity: 0.3 },
        { name: 'Glitched', opacity: 0.6 },
        { name: 'Corrupted', opacity: 0.3 }
      ],
      reconstructions: this.glyphs.map(g => this.createFragment(g))
    };
  }

  // Prevent scrollback - only show glitches
  preventScrollback() {
    return {
      message: '◊ MEMORY NOT ACCESSIBLE ◊',
      glitchChars: '█▓░∞◊◈◆',
      effect: 'chromatic_aberration'
    };
  }
}
