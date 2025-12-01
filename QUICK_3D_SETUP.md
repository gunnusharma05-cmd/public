# Quick Start: Add Your First 3D Character Model

## Step 1: Download a Free 3D Character

### Option 1 - Sketchfab (Easiest)
1. Go to **sketchfab.com**
2. Search: "free character glb" or "free human gltf"
3. Filter by: `Downloadable` + `Rigged` (optional)
4. Click character you like
5. Click blue "Download" button
6. Select **GLB format**
7. Save the `.glb` file

### Option 2 - Mixamo (Best Quality)
1. Go to **mixamo.com**
2. Click "Characters" tab
3. Pick any character
4. Click "Download"
5. Format: **glTF**
6. Select any animation (optional)
7. Download the `.glb` file

### Option 3 - Ready Player Me (AI Generated)
1. Go to **readyplayer.me**
2. Create a character using their avatar builder
3. Export as **GLB**
4. Download file

## Step 2: Add File to Your Project

**Create folder:**
```
public/models/
```

**Add your downloaded file:**
```
public/
  models/
    character.glb  ← Place your downloaded file here
```

## Step 3: Update Character Definitions

**Open:** `src/app.js`

**Find function:** `getCharactersForStory()` (around line 1265)

**Before (current code with geometric shapes):**
```javascript
mystical: [
  { name: 'Guide', color: 0x9d4edd, emissive: 0x7c3aed, role: 'narrator' },
  { name: 'Spirit', color: 0xb5a3ff, emissive: 0xa855f7, role: 'companion' },
  { name: 'Witness', color: 0xd8b4fe, emissive: 0xc084fc, role: 'observer' }
],
```

**After (with GLTF model):**
```javascript
mystical: [
  { 
    name: 'Guide', 
    color: 0x9d4edd, 
    emissive: 0x7c3aed, 
    role: 'narrator',
    modelUrl: '/models/character.glb'  // ← Add this line
  },
  { 
    name: 'Spirit', 
    color: 0xb5a3ff, 
    emissive: 0xa855f7, 
    role: 'companion',
    modelUrl: '/models/character.glb'  // Use same or different model
  },
  { 
    name: 'Witness', 
    color: 0xd8b4fe, 
    emissive: 0xc084fc, 
    role: 'observer',
    modelUrl: '/models/character.glb'
  }
],
```

## Step 4: Update Character Creation Function

**Find function:** `createCharacterMesh()` (around line 1245)

**Replace the entire function with this enhanced version:**

```javascript
async function createCharacterMesh(charData, index) {
  let character;
  
  // Try to load GLTF model if URL provided
  if (charData.modelUrl) {
    try {
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(charData.modelUrl);
      character = gltf.scene;
      
      // Scale to appropriate size
      character.scale.set(0.8, 0.8, 0.8);
      
      // Play animations if available
      if (gltf.animations && gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(character);
        gltf.animations.forEach(clip => {
          // Play first animation
          if (clip.name === 'Idle' || clip.name === 'idle' || gltf.animations.indexOf(clip) === 0) {
            mixer.clipAction(clip).play();
          }
        });
        character3D.mixer = mixer;
      }
    } catch (e) {
      console.log('GLTF load failed, using geometric character:', e);
      character = null;
    }
  }
  
  // Fallback to geometric shape if no model or load failed
  if (!character) {
    const geometry = new THREE.CapsuleGeometry(0.3, 1.5, 8, 20);
    const material = new THREE.MeshStandardMaterial({
      color: charData.color,
      emissive: charData.emissive,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      metalness: 0.1
    });
    character = new THREE.Mesh(geometry, material);
  }
  
  // Position off-screen
  const xPos = (index % 2 === 0 ? -1 : 1) * (5 + index * 0.5);
  character.position.set(xPos, -0.5, -2 - index * 1);
  
  scene.add(character);
  character3D.models.push(character);
  
  // Animate character sliding in from the side
  const targetX = -2 + index * 2;
  const slideInDuration = 1.5 + index * 0.3;
  
  gsap.to(character.position, {
    x: targetX,
    duration: slideInDuration,
    ease: 'power2.inOut',
    delay: index * 0.4
  });
  
  gsap.to(character.rotation, {
    y: Math.PI * 0.05,
    duration: 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });
}
```

## Step 5: Rebuild and Test

**In terminal:**
```bash
npm run build
```

**Then open in browser and:**
1. Click "Begin"
2. Select a story type
3. Watch your 3D character slide in!

## Customization Options

### Change Character Size
```javascript
character.scale.set(1, 1, 1);  // Was 0.8
```

### Change Starting Position
```javascript
const xPos = (index % 2 === 0 ? -1 : 1) * (3 + index * 0.2);  // Closer to center
```

### Change Animation Speed
```javascript
gsap.to(character.position, {
  x: targetX,
  duration: 1,  // Was 1.5 + index * 0.3, now faster
  ease: 'power2.inOut',
  delay: index * 0.2  // Was 0.4, now faster
});
```

### Add Multiple Different Characters

**Step 1:** Download 3 different character models:
- `character1.glb`
- `character2.glb`
- `character3.glb`

**Step 2:** Update character definition:
```javascript
mystical: [
  { name: 'Guide', modelUrl: '/models/character1.glb' },
  { name: 'Spirit', modelUrl: '/models/character2.glb' },
  { name: 'Witness', modelUrl: '/models/character3.glb' }
],
```

## Recommended Free Characters to Download

### For Mystical Stories:
- **Elven Mage** - Sketchfab
- **Wizard** - Mixamo
- **Fantasy Character** - OpenGameArt

### For Dark Stories:
- **Armored Knight** - Sketchfab
- **Dark Warrior** - Mixamo
- **Villain Character** - Sketchfab

### For Hopeful Stories:
- **Hero Character** - Mixamo
- **Friendly Human** - Sketchfab
- **Happy Avatar** - ReadyPlayerMe

### For Horror Stories:
- **Zombie** - Sketchfab
- **Monster** - OpenGameArt
- **Creepy Figure** - Sketchfab

## Troubleshooting

**Q: Characters not appearing?**
A: Check browser console (F12 → Console tab):
- Look for error messages
- Verify file path: `/models/character.glb`
- Ensure file exists in `public/models/`

**Q: Characters look distorted?**
A: Try adjusting scale:
```javascript
character.scale.set(1.5, 1.5, 1.5);  // Make bigger
// or
character.scale.set(0.5, 0.5, 0.5);  // Make smaller
```

**Q: Animations not playing?**
A: Check GLTF file has animations:
```javascript
console.log('Available animations:', gltf.animations);
```

**Q: Page loading slowly?**
A: GLTF files can be large:
- Compress with Blender (File → Export → GLB → Compression)
- Or optimize online: gltf.report

## Next Steps

1. ✅ Add your first character model
2. Add different characters per story type
3. Add character animations
4. Add dialogue text above characters
5. Add sound effects per character
6. Deploy to production!

## Full Documentation

See **3D_CHARACTER_GUIDE.md** for complete system details!
