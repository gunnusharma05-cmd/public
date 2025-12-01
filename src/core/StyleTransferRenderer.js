// StyleTransferRenderer.js - Feature 2: Neural Style Transfer
// Transforms scene into famous painting styles based on emotion

export class StyleTransferRenderer {
  constructor() {
    this.currentStyle = 'abstract';
    this.transitionDuration = 2000;
    this.styleShaders = this.initializeShaders();
  }

  initializeShaders() {
    return {
      starry_night: {
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float time;
          void main() {
            vec2 p = vUv * 5.0;
            float n = sin(p.x * 7.0) * cos(p.y * 7.0);
            gl_FragColor = vec4(n * 0.3 + 0.4, n * 0.2 + 0.3, 1.0, 1.0);
          }
        `
      },
      the_scream: {
        fragmentShader: `
          varying vec2 vUv;
          void main() {
            vec2 distortion = sin(vUv * 10.0) * 0.1;
            gl_FragColor = vec4(1.0 - vUv.y, 0.5 + sin(vUv.x * 10.0) * 0.5, 0.2, 1.0);
          }
        `
      },
      guernica: {
        fragmentShader: `
          varying vec2 vUv;
          void main() {
            vec2 p = fract(vUv * 8.0);
            float block = step(0.5, p.x) * step(0.5, p.y);
            gl_FragColor = vec4(block * 0.8, 0.0, 0.0, 1.0);
          }
        `
      },
      dali_surreal: {
        fragmentShader: `
          varying vec2 vUv;
          uniform float time;
          void main() {
            float wave = sin(vUv.x * 10.0 + time * 0.001) * 0.5 + 0.5;
            gl_FragColor = vec4(vUv.x, wave, vUv.y, 1.0);
          }
        `
      },
      giger_biomech: {
        fragmentShader: `
          varying vec2 vUv;
          void main() {
            float organic = sin(vUv.x * 20.0) * cos(vUv.y * 20.0);
            gl_FragColor = vec4(0.2 + organic * 0.3, 0.0, 0.1, 1.0);
          }
        `
      }
    };
  }

  // Map emotion to art style
  selectStyle(emotion) {
    const styleMap = {
      happy: 'starry_night',
      sad: 'the_scream',
      angry: 'guernica',
      surprised: 'dali_surreal',
      disgusted: 'giger_biomech',
      neutral: 'abstract',
      fearful: 'dark_period'
    };

    return styleMap[emotion] || 'abstract';
  }

  // Smooth transition between styles
  transitionStyle(fromStyle, toStyle, progress) {
    // Blend between shaders
    const blendAmount = Math.min(1, progress / this.transitionDuration);
    
    return {
      fromStyle,
      toStyle,
      blendAmount,
      uniforms: {
        transitionAmount: blendAmount
      }
    };
  }

  // Apply brushstroke effects to text
  applyBrushstrokeEffect(textMaterial, style) {
    const effects = {
      starry_night: {
        brushSize: 'medium',
        swirl: 0.3,
        vibrato: 0.2
      },
      the_scream: {
        brushSize: 'thick',
        distortion: 0.8,
        vibrato: 0.5
      },
      guernica: {
        brushSize: 'sharp',
        fragmentation: 0.7,
        vibrato: 0
      }
    };

    return effects[style] || effects.starry_night;
  }

  // Paint splatter particles
  createPaintSplatters(particleSystem, style) {
    const splatConfig = {
      density: Math.random() * 100 + 50,
      size: Math.random() * 5 + 2,
      color: this.getStyleColor(style),
      opacity: 0.3 + Math.random() * 0.4,
      velocity: (Math.random() - 0.5) * 10
    };

    return splatConfig;
  }

  getStyleColor(style) {
    const colors = {
      starry_night: 0x1111CC,   // Deep blue
      the_scream: 0xDD6600,     // Orange red
      guernica: 0x000000,       // Black
      dali_surreal: 0xFF00FF,   // Magenta
      giger_biomech: 0x330033,  // Dark purple
      abstract: 0x00FF00       // Green
    };

    return colors[style] || 0xFFFFFF;
  }

  // Export style transfer settings
  getStyleConfig(emotion) {
    const style = this.selectStyle(emotion);
    
    return {
      style,
      shader: this.styleShaders[style],
      brushEffect: this.applyBrushstrokeEffect(null, style),
      color: this.getStyleColor(style),
      transitionTime: this.transitionDuration,
      description: `Style: ${style.replace(/_/g, ' ').toUpperCase()}`
    };
  }
}
