// ParticleSystem.js - Feature 6: 3D Particle Morphing
// NLP-based particle shapes and semantic colors

import * as THREE from 'three';

export class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.particleGroup = new THREE.Group();
    this.scene.add(this.particleGroup);
    this.maxParticles = 2000;
    this.nounMorphs = {};
    this.adjectiveColors = {};
    this.verbVelocities = {};
  }

  // Extract parts of speech and create particle morphs
  processSentence(sentence) {
    // Simple NLP (use compromise.js in full implementation)
    const nouns = this.extractNouns(sentence);
    const adjectives = this.extractAdjectives(sentence);
    const verbs = this.extractVerbs(sentence);

    nouns.forEach(noun => {
      this.createNounMorph(noun);
    });

    return {
      nounShapes: nouns.length,
      adjectiveColors: adjectives.length,
      verbMotions: verbs.length
    };
  }

  extractNouns(text) {
    // Simplified noun extraction
    const nouns = {
      'cat': 'cat_shape',
      'fire': 'fire_shape',
      'ocean': 'ocean_shape',
      'book': 'book_shape',
      'dream': 'star_field'
    };
    
    return Object.keys(nouns).filter(n => text.toLowerCase().includes(n));
  }

  extractAdjectives(text) {
    const adjectives = {
      'dark': 0x000000,
      'warm': 0xFF9900,
      'cold': 0x0099FF,
      'bright': 0xFFFFFF,
      'heavy': 0x333333,
      'light': 0xFFFF99
    };

    return Object.keys(adjectives).filter(a => text.toLowerCase().includes(a));
  }

  extractVerbs(text) {
    const verbs = {
      'explode': 'outward_velocity',
      'collapse': 'inward_velocity',
      'dance': 'orbital_motion',
      'scatter': 'random_velocity',
      'flow': 'wave_motion'
    };

    return Object.keys(verbs).filter(v => text.toLowerCase().includes(v));
  }

  createNounMorph(noun) {
    const morphShapes = {
      'cat_shape': this.createCatShape(),
      'fire_shape': this.createFireShape(),
      'ocean_shape': this.createOceanShape(),
      'book_shape': this.createBookShape(),
      'star_field': this.createStarField()
    };

    return morphShapes[this.nounMorphs[noun] || 'star_field'];
  }

  createCatShape() {
    const particles = [];
    // Head
    for (let i = 0; i < 30; i++) {
      particles.push({
        pos: new THREE.Vector3(
          Math.cos(i / 30 * Math.PI * 2) * 50,
          Math.sin(i / 30 * Math.PI * 2) * 50,
          0
        ),
        vel: new THREE.Vector3(0, 0, 0)
      });
    }
    return particles;
  }

  createFireShape() {
    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          Math.random() * 100,
          (Math.random() - 0.5) * 100
        ),
        vel: new THREE.Vector3(0, 0.5, 0),
        lifespan: Math.random() * 2000 + 500
      });
    }
    return particles;
  }

  createOceanShape() {
    const particles = [];
    for (let x = -50; x < 50; x += 10) {
      for (let z = -50; z < 50; z += 10) {
        particles.push({
          pos: new THREE.Vector3(x, Math.sin(x / 50) * 20, z),
          vel: new THREE.Vector3(0, 0, 0)
        });
      }
    }
    return particles;
  }

  createBookShape() {
    const particles = [];
    // Book cover outline
    for (let x = -30; x < 30; x += 5) {
      for (let y = -40; y < 40; y += 5) {
        particles.push({
          pos: new THREE.Vector3(x, y, 0),
          vel: new THREE.Vector3(0, 0, 0)
        });
      }
    }
    return particles;
  }

  createStarField() {
    const particles = [];
    for (let i = 0; i < 500; i++) {
      particles.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 1000,
          (Math.random() - 0.5) * 1000,
          (Math.random() - 0.5) * 1000
        ),
        vel: new THREE.Vector3(0, 0, 0)
      });
    }
    return particles;
  }

  // Semantic color mapping
  getAdjectiveColor(adjective) {
    const colorMap = {
      'dark': 0x000000,
      'light': 0xFFFF99,
      'warm': 0xFF9900,
      'cold': 0x0099FF,
      'bright': 0xFFFFFF,
      'heavy': 0x333333,
      'soft': 0xFF99FF,
      'hard': 0x999999
    };
    return colorMap[adjective] || 0xFFFFFF;
  }

  // Verb-based motion patterns
  applyVerbMotion(particles, verb) {
    const motions = {
      'explode': () => particles.forEach(p => {
        const len = p.pos.length();
        p.vel = p.pos.normalize().multiplyScalar(5);
      }),
      'collapse': () => particles.forEach(p => {
        p.vel = p.pos.normalize().multiplyScalar(-3);
      }),
      'dance': () => particles.forEach((p, i) => {
        p.vel = new THREE.Vector3(
          Math.cos(Date.now() * 0.001 + i) * 2,
          Math.sin(Date.now() * 0.001 + i) * 2,
          0
        );
      }),
      'flow': () => particles.forEach(p => {
        p.vel = new THREE.Vector3(
          Math.sin(p.pos.y * 0.01) * 2,
          0,
          1
        );
      })
    };

    if (motions[verb]) motions[verb]();
  }

  // Density affects ambient drone volume
  getParticleDensity() {
    return Math.min(1, this.particles.length / this.maxParticles);
  }

  // Update all particles
  update(deltaTime) {
    this.particles.forEach(p => {
      p.pos.add(p.vel.clone().multiplyScalar(deltaTime));
      p.vel.multiplyScalar(0.98); // Damping
    });
  }
}
