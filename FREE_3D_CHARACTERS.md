# 🎭 Free 3D Character Models - Ready to Use

## Download & Use These Characters Immediately

### ✨ Mystical Characters (Sketchfab)

**Option 1: Elven Mage**
- URL: https://sketchfab.com/models/1234567 (search "free elf mage gltf")
- Download: GLB format
- Use in app: `/models/mystical-elf.glb`

**Option 2: Fantasy Wizard**
- URL: https://sketchfab.com/search?type=models&q=wizard+free+glb
- Best from results with ⭐ and "Downloadable" tag
- Use in app: `/models/mystical-wizard.glb`

**Option 3: Spirit Guardian**
- URL: Search Sketchfab "spirit character glb free"
- Download: GLB format
- Use in app: `/models/mystical-spirit.glb`

### 🌑 Dark Characters (Mixamo)

**Option 1: Armored Warrior**
1. Go to mixamo.com
2. Search: "warrior" or "knight"
3. Click character
4. Download → Format: glTF (GLB)
5. Place: `public/models/dark-warrior.glb`

**Option 2: Dark Mage**
1. Mixamo search: "dark mage" or "sorcerer"
2. Download as GLB
3. Place: `public/models/dark-mage.glb`

**Option 3: Shadow Guard**
1. Sketchfab search: "dark knight free glb"
2. Pick one with good reviews
3. Download GLB
4. Place: `public/models/dark-guard.glb`

### 🌟 Hopeful Characters

**Option 1: Hero Character** (Mixamo - Free)
1. Go mixamo.com
2. Pick any friendly-looking character
3. Download as GLB
4. Place: `public/models/hopeful-hero.glb`

**Option 2: Helper Avatar** (ReadyPlayerMe)
1. Go readyplayer.me
2. Create a happy character
3. Export as GLB
4. Place: `public/models/hopeful-helper.glb`

**Option 3: Light Guardian** (Sketchfab)
1. Search: "guardian character free glb"
2. Download
3. Place: `public/models/hopeful-guard.glb`

### 🌀 Surreal Characters

**Option 1: Abstract Figure**
1. Sketchfab search: "abstract character glb"
2. Download any with cool design
3. Place: `public/models/surreal-figure.glb`

**Option 2: Dream Character** (Mixamo)
1. Pick any unique-looking character
2. Download as GLB
3. Place: `public/models/surreal-dream.glb`

### 👹 Horror Characters

**Option 1: Zombie** (Free on Sketchfab)
1. Search: "zombie free glb"
2. Download
3. Place: `public/models/horror-zombie.glb`

**Option 2: Monster** (OpenGameArt)
1. Go opengameart.org
2. Search: "monster glb"
3. Download CC0 licensed
4. Place: `public/models/horror-monster.glb`

**Option 3: Dark Knight** (Mixamo)
1. Pick intimidating character
2. Download as GLB
3. Place: `public/models/horror-dark.glb`

## Copy-Paste: Complete Character Setup

### Step 1: Download Files

Create `public/models/` folder and place downloaded files:
```
public/
  models/
    mystical-guide.glb
    dark-warrior.glb
    hopeful-hero.glb
    surreal-figure.glb
    horror-zombie.glb
```

### Step 2: Update app.js Character Definition

Find this section in `src/app.js` around line 1270:

```javascript
function getCharactersForStory(storyType) {
  const characterMap = {
    mystical: [
      { name: 'Guide', color: 0x9d4edd, emissive: 0x7c3aed, role: 'narrator', 
        modelUrl: '/models/mystical-guide.glb' },
      { name: 'Spirit', color: 0xb5a3ff, emissive: 0xa855f7, role: 'companion',
        modelUrl: '/models/mystical-guide.glb' },
      { name: 'Witness', color: 0xd8b4fe, emissive: 0xc084fc, role: 'observer',
        modelUrl: '/models/mystical-guide.glb' }
    ],
    
    dark: [
      { name: 'Shadow', color: 0x1a1a2e, emissive: 0x0f0f1e, role: 'antagonist',
        modelUrl: '/models/dark-warrior.glb' },
      { name: 'Echo', color: 0x16213e, emissive: 0x0a1428, role: 'follower',
        modelUrl: '/models/dark-warrior.glb' },
      { name: 'Void', color: 0x0f3460, emissive: 0x081f3e, role: 'presence',
        modelUrl: '/models/dark-warrior.glb' }
    ],
    
    hopeful: [
      { name: 'Hope', color: 0x06d6a0, emissive: 0x14b8a6, role: 'guide',
        modelUrl: '/models/hopeful-hero.glb' },
      { name: 'Light', color: 0x118ab2, emissive: 0x06b6d4, role: 'beacon',
        modelUrl: '/models/hopeful-hero.glb' },
      { name: 'Helper', color: 0x073b4c, emissive: 0x0d7377, role: 'companion',
        modelUrl: '/models/hopeful-hero.glb' }
    ],
    
    surreal: [
      { name: 'Dreamer', color: 0xf43f5e, emissive: 0xec4899, role: 'self',
        modelUrl: '/models/surreal-figure.glb' },
      { name: 'Other', color: 0x9f1239, emissive: 0xbe185d, role: 'alter',
        modelUrl: '/models/surreal-figure.glb' },
      { name: 'Mirror', color: 0xff006e, emissive: 0xe00b7a, role: 'reflection',
        modelUrl: '/models/surreal-figure.glb' }
    ],
    
    horror: [
      { name: 'Terror', color: 0xdc2626, emissive: 0xb91c1c, role: 'threat',
        modelUrl: '/models/horror-zombie.glb' },
      { name: 'Fear', color: 0x991b1b, emissive: 0x7f1d1d, role: 'dread',
        modelUrl: '/models/horror-zombie.glb' },
      { name: 'Darkness', color: 0x450a0a, emissive: 0x2d0404, role: 'ominous',
        modelUrl: '/models/horror-zombie.glb' }
    ],
    
    random: [
      { name: 'Mystery1', color: 0x6366f1, emissive: 0x4f46e5, role: 'unknown',
        modelUrl: '/models/mystical-guide.glb' },
      { name: 'Mystery2', color: 0x8b5cf6, emissive: 0x7c3aed, role: 'enigma',
        modelUrl: '/models/surreal-figure.glb' },
      { name: 'Mystery3', color: 0xa78bfa, emissive: 0x9333ea, role: 'puzzle',
        modelUrl: '/models/hopeful-hero.glb' }
    ]
  };
  
  return characterMap[storyType] || characterMap.random;
}
```

### Step 3: Build & Test

```bash
npm run build
```

Then open in browser and enjoy your 3D characters! 🎉

## Using Same Character Multiple Times

**Easy way** - Use same file multiple times:
```javascript
mystical: [
  { name: 'Guide', modelUrl: '/models/mystical-guide.glb' },
  { name: 'Spirit', modelUrl: '/models/mystical-guide.glb' },  // Same
  { name: 'Witness', modelUrl: '/models/mystical-guide.glb' }  // Same
]
```

The character will appear 3 times on screen with different colors and positions!

## Using Different Characters

**Advanced way** - Download multiple and mix:
```javascript
mystical: [
  { name: 'Guide', modelUrl: '/models/wizard.glb' },
  { name: 'Spirit', modelUrl: '/models/elf.glb' },
  { name: 'Witness', modelUrl: '/models/mage.glb' }
]
```

## Where to Download More Free Characters

### Sketchfab (Best variety)
- Site: sketchfab.com
- Filter: Free models
- Format: GLB or GLTF
- License: Check CC0 or similar

### Mixamo (Best animations)
- Site: mixamo.com
- Require: Free account
- Format: Export as GLB
- Includes: Pre-made animations

### ReadyPlayerMe (AI-generated)
- Site: readyplayer.me
- Create: Custom avatar
- Export: As GLB
- Perfect for: Human-like characters

### OpenGameArt (CC Licensed)
- Site: opengameart.org
- Search: "glb" or "gltf"
- License: Creative Commons
- Use: Game-ready assets

### CGTrader (Some free)
- Site: cgtrader.com/free-3d-models
- Search: "free gltf"
- Check: Free tag
- Quality: Very high

## Pro Tips

1. **Compress GLB files** - Use Blender to reduce file size
2. **Use same character** - Faster to load, different colors look different
3. **Match theme** - Use "dark" characters for dark stories
4. **Test locally first** - Use small files for faster testing
5. **Optimize for web** - Aim for < 5MB per character

## Quick Test

Want to test without downloading?

Just update one character in `getCharactersForStory()`:

```javascript
hopeful: [
  { name: 'Hope', color: 0x06d6a0, role: 'guide',
    modelUrl: '/models/hopeful-hero.glb' },
  { name: 'Light', color: 0x118ab2, role: 'beacon',
    modelUrl: '/models/hopeful-hero.glb' },
  { name: 'Helper', color: 0x073b4c, role: 'companion',
    modelUrl: '/models/hopeful-hero.glb' }
],
```

Build and select a Hopeful story to see the characters!

## Support

If characters don't load:
1. Check browser console (F12)
2. Verify file exists in `public/models/`
3. Check file format is `.glb` or `.gltf`
4. Try a different simpler model
5. Fallback geometry will show automatically

Happy customizing! 🚀
