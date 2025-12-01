import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

export default class Character {
  constructor({ scene, camera, initialPosition = new THREE.Vector3(-200, 0, 260) }) {
    this.scene = scene;
    this.camera = camera;

    this.loader = new GLTFLoader();   // <-- NO DRACO

    this.mixer = null;
    this.model = null;
    this.actions = {};
    this.currentAction = null;
    this.clock = new THREE.Clock();

    this.position = initialPosition.clone();
    this.followStrength = 0.06;

    this.isLoaded = false;
    this.isSpeaking = false;
  }

  // -----------------------------------------------------
  // MAIN MODEL LOADER
  // -----------------------------------------------------
  async loadMainModel(url) {
    return new Promise((resolve) => {
      this.loader.load(
        url,
        (gltf) => {
          this.model = gltf.scene;
          this.model.position.copy(this.position);
          this.scene.add(this.model);

          // Animation mixer
          this.mixer = new THREE.AnimationMixer(this.model);
          gltf.animations.forEach((clip) => {
            this.actions[clip.name] = this.mixer.clipAction(clip);
          });

          // --- BOUNDING BOX CALCULATION ---
          const box = new THREE.Box3().setFromObject(this.model);
          const size = new THREE.Vector3();
          const center = new THREE.Vector3();
          box.getSize(size);
          box.getCenter(center);

          // --- REQUIRED DEBUG LOG (copy this output to chat) ---
          console.log("Dreamware main.glb bounds:", {
            size: { x: size.x, y: size.y, z: size.z },
            center: { x: center.x, y: center.y, z: center.z }
          });

          // --- OPTIONAL auto-scaling ---
          const maxSize = Math.max(size.x, size.y, size.z);
          if (maxSize !== 0) {
            const scaleFactor = 150 / maxSize;
            this.model.scale.setScalar(scaleFactor);
          }

          // Re-center model
          this.model.position.sub(center);

          this.isLoaded = true;
          resolve(true);
        },

        undefined,

        (err) => {
          console.warn("Main model failed, using placeholder", err);
          this._createPlaceholderAndResolve(resolve);
        }
      );
    });
  }

  // Swap the main model at runtime (e.g. for mood-based variants)
  async swapMainModel(url) {
    try {
      if (this.model) {
        try {
          this.scene.remove(this.model);
        } catch (e) {}
        this.model = null;
      }
      this.mixer = null;
      this.actions = {};
      this.isLoaded = false;
      await this.loadMainModel(url);
    } catch (e) {
      console.warn('swapMainModel failed', e);
    }
  }

  // -----------------------------------------------------
  // LOAD ANIMATIONS
  // -----------------------------------------------------
  async loadAndRegisterAnimation(url, name) {
    return new Promise((resolve) => {
      this.loader.load(
        url,
        (gltf) => {
          if (this.mixer) {
            const clip = gltf.animations[0];
            this.actions[name] = this.mixer.clipAction(clip);
          }
          resolve();
        },
        undefined,
        (e) => {
          console.warn("Animation load failed:", name, e);
          resolve();
        }
      );
    });
  }

  // -----------------------------------------------------
  // PLACEHOLDER MODEL
  // -----------------------------------------------------
  _createPlaceholderAndResolve(resolve) {
    const geo = new THREE.CapsuleGeometry(50, 180, 8, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff66cc,
      roughness: 0.5,
      metalness: 0.2
    });

    this.model = new THREE.Mesh(geo, mat);
    this.model.position.copy(this.position);
    this.model.castShadow = true;

    this.scene.add(this.model);
    this.isLoaded = true;
    resolve(true);
  }

  // -----------------------------------------------------
  // PLAY ACTION
  // -----------------------------------------------------
  playAction(name, options = {}) {
    if (!this.actions[name]) return;

    const action = this.actions[name];

    if (options.fadeIn) action.fadeIn(options.fadeIn);
    if (options.fadeOut && this.currentAction) {
      this.currentAction.fadeOut(options.fadeOut);
    }

    action.reset().play();
    this.currentAction = action;
  }

  // -----------------------------------------------------
  // ENTRANCE
  // -----------------------------------------------------
  enterFrom(distance = 800, duration = 1.6) {
    if (!this.model) return;

    const target = this.position.clone();
    this.model.position.set(target.x, target.y, target.z + distance);

    gsap.to(this.model.position, {
      duration,
      z: target.z,
      ease: "power3.out"
    });
  }

  // -----------------------------------------------------
  // EXIT
  // -----------------------------------------------------
  exitTo(distance = 1200, duration = 1.6) {
    if (!this.model) return;

    gsap.to(this.model.position, {
      duration,
      z: this.model.position.z + distance,
      ease: "power3.in"
    });
  }

  // -----------------------------------------------------
  // CURSOR FOLLOW
  // -----------------------------------------------------
  followCursor(cursorNorm) {
    // Cursor-follow is intentionally disabled for this demo; idle motion
    // is handled in update() so characters do not track the mouse.
    return;
  }

  // -----------------------------------------------------
  // MOODS
  // -----------------------------------------------------
  setMood(mood) {
    if (!this.model) return;

    const moodMap = {
      happy: "Happy",
      sad: "Sad",
      angry: "Angry",
      neutral: null
    };

    const anim = moodMap[mood];
    if (anim) this.playAction(anim, { fadeIn: 0.3, fadeOut: 0.3 });

    gsap.to(this.model.rotation, {
      x: mood === "happy" ? -0.2 : mood === "sad" ? 0.2 : 0,
      duration: 0.6
    });
  }

  // -----------------------------------------------------
  // SPEAK
  // -----------------------------------------------------
  speak(text) {
    if (!this.actions["Talk"]) return;

    this.playAction("Talk");
    this.isSpeaking = true;

    setTimeout(() => {
      this.isSpeaking = false;
    }, Math.max(900, text.length * 45));
  }

  // -----------------------------------------------------
  // UPDATE LOOP (idle motion)
  // -----------------------------------------------------
  update() {
    const delta = this.clock.getDelta();
    if (this.mixer) this.mixer.update(delta);

    if (!this.model) return;

    const t = this.clock.elapsedTime;

    // Stronger idle bob and sway around the base position
    const idleYOffset = Math.sin(t * 1.2) * 12;   // bigger up/down
    const idleXOffset = Math.cos(t * 0.9) * 18;   // bigger side sway

    this.model.position.x = this.position.x + idleXOffset;
    this.model.position.y = this.position.y + idleYOffset;

    if (!this.isSpeaking) {
      // slow, continuous rotation
      this.model.rotation.y += delta * 0.4;
    }
  }
}
