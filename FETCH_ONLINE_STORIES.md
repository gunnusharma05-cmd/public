# 📖 Fetch Real Stories from Online Sources

## Overview
Your app currently uses hardcoded stories. Here's how to fetch **real, long, addictive stories** from online APIs and databases.

---

## Option 1: Free Story APIs (Easiest) ⭐

### A. **Project Gutenberg API** - Classic Literature
**Best for:** Long, complete books (fantasy, mystery, classics)

```javascript
async function fetchFromGutenberg(moodType) {
  // Map mood to Gutenberg search
  const moodToGenre = {
    'mystical': 'fantasy',
    'dark': 'gothic',
    'hopeful': 'adventure',
    'surreal': 'science fiction',
    'horror': 'horror',
    'random': 'mystery'
  };
  
  const genre = moodToGenre[moodType];
  
  try {
    // Search Project Gutenberg (JSON API)
    const response = await fetch(
      `https://gutendex.com/books?search=${genre}&topic=${genre}`
    );
    const data = await response.json();
    
    if (!data.results.length) return null;
    
    // Get random book from results
    const book = data.results[Math.floor(Math.random() * data.results.length)];
    
    // Fetch full text from Project Gutenberg
    const textResponse = await fetch(
      `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.txt`
    );
    const fullText = await textResponse.text();
    
    // Extract interesting excerpts (3-5 paragraphs)
    const excerpts = extractExcerpts(fullText, 5);
    
    return {
      title: book.title,
      author: book.author,
      excerpts: excerpts,
      source: 'Project Gutenberg',
      mood: moodType,
      url: `https://www.gutenberg.org/ebooks/${book.id}`
    };
  } catch (error) {
    console.error('Gutenberg fetch failed:', error);
    return null;
  }
}

// Helper: Extract meaningful paragraphs from text
function extractExcerpts(text, count = 5) {
  // Remove headers, footers, metadata
  const lines = text.split('\n').filter(line => line.trim().length > 50);
  
  // Take random excerpts of 200-300 words each
  const excerpts = [];
  for (let i = 0; i < count; i++) {
    const startIdx = Math.random() * (lines.length - 50);
    const excerpt = lines.slice(startIdx, startIdx + 50).join(' ').trim();
    
    // Clean up
    const cleaned = excerpt
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .substring(0, 300);
    
    excerpts.push(cleaned);
  }
  return excerpts;
}
```

**Pros:** ✅ Free, legal, massive library
**Cons:** ❌ No mood tagging, text needs cleanup

---

### B. **Stories API** - Modern Short Stories
**Best for:** Contemporary short stories by mood

```javascript
async function fetchFromStoriesAPI(moodType) {
  // Map mood to story type
  const moodToType = {
    'mystical': 'mysteriously beautiful',
    'dark': 'dark and gloomy',
    'hopeful': 'inspiring and hopeful',
    'surreal': 'bizarre and surreal',
    'horror': 'horrifying',
    'random': 'random'
  };
  
  const storyType = moodToType[moodType];
  
  try {
    // Using Stories API (free tier available)
    const response = await fetch(
      `https://story-api.dicebear.com/api/story?type=${storyType}`,
      { method: 'GET' }
    );
    
    // Or use alternative: WriteSmith API
    const writeSmithResponse = await fetch(
      `https://api.writesmithstories.com/stories/by-mood/${moodType}`,
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY'
        }
      }
    );
    
    const data = await writeSmithResponse.json();
    
    return {
      title: data.title,
      content: data.content,  // Already formatted
      author: data.author,
      mood: data.mood,
      source: 'WriteSmith Stories',
      readTime: data.readTime
    };
  } catch (error) {
    console.error('Stories API fetch failed:', error);
    return null;
  }
}
```

**Pros:** ✅ Pre-formatted, mood-tagged
**Cons:** ❌ May require API key, limited free tier

---

## Option 2: Web Scraping (Advanced)

### Scrape from Wattpad, Reddit, Medium

```javascript
// Install: npm install cheerio node-fetch

import fetch from 'node-fetch';
import { load } from 'cheerio';

async function scrapeWattpadStories(moodType) {
  const moodToGenre = {
    'mystical': 'Fantasy',
    'dark': 'Dark Fiction',
    'hopeful': 'Inspirational',
    'surreal': 'Sci-Fi',
    'horror': 'Horror',
    'random': 'Any'
  };
  
  const genre = moodToGenre[moodType];
  
  try {
    // Fetch Wattpad genre page
    const response = await fetch(
      `https://www.wattpad.com/stories/${genre.toLowerCase()}?length=all&sort=rating`
    );
    const html = await response.text();
    const $ = load(html);
    
    // Parse story elements
    const stories = [];
    $('div[data-testid="storyCard"]').each((i, element) => {
      if (i >= 3) return; // Get top 3
      
      const title = $(element).find('h2').text();
      const author = $(element).find('.author').text();
      const description = $(element).find('p').text();
      const url = $(element).find('a').attr('href');
      
      stories.push({
        title,
        author,
        description,
        url: `https://www.wattpad.com${url}`,
        mood: moodType
      });
    });
    
    return stories;
  } catch (error) {
    console.error('Wattpad scrape failed:', error);
    return [];
  }
}

// Scrape from Reddit (r/shortstories, r/HFY, etc.)
async function scrapeRedditStories(moodType) {
  const moodToSubreddit = {
    'mystical': 'shortstories',
    'dark': 'NoSleep',
    'hopeful': 'Wholesomememes',
    'surreal': 'surreal',
    'horror': 'LetsNotMeet',
    'random': 'RandomStories'
  };
  
  const subreddit = moodToSubreddit[moodType];
  
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/top.json?t=month&limit=10`,
      { headers: { 'User-Agent': 'ERASURE-App' } }
    );
    const data = await response.json();
    
    const stories = data.data.children.map(post => ({
      title: post.data.title,
      content: post.data.selftext,
      author: post.data.author,
      upvotes: post.data.ups,
      url: `https://reddit.com${post.data.permalink}`,
      mood: moodType,
      source: `r/${subreddit}`
    }));
    
    return stories.filter(s => s.content.length > 200); // Only substantial posts
  } catch (error) {
    console.error('Reddit scrape failed:', error);
    return [];
  }
}
```

**Pros:** ✅ Real user-generated content, massive variety
**Cons:** ❌ Complex setup, respect ToS, may need proxies

---

## Option 3: Combine Multiple Sources (Best)

```javascript
async function fetchMoodStories(moodType) {
  console.log(`📖 Fetching ${moodType} stories...`);
  
  // Try multiple sources in parallel
  const sources = [
    fetchFromGutenberg(moodType),
    fetchFromStoriesAPI(moodType),
    scrapeRedditStories(moodType),
    fallbackToHardcodedStories(moodType) // Backup
  ];
  
  try {
    const results = await Promise.allSettled(sources);
    
    // Collect successful results
    const allStories = [];
    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value) {
        const story = Array.isArray(result.value) 
          ? result.value[0] 
          : result.value;
        if (story) allStories.push(story);
      }
    });
    
    if (allStories.length === 0) {
      return fallbackToHardcodedStories(moodType);
    }
    
    // Return random story from combined pool
    return allStories[Math.floor(Math.random() * allStories.length)];
  } catch (error) {
    console.error('Multi-source fetch failed:', error);
    return fallbackToHardcodedStories(moodType);
  }
}
```

---

## Option 4: Dedicated Story APIs (Paid but Best Quality)

### Recommended Services:

| Service | Cost | Best For | Quality |
|---------|------|----------|---------|
| **Scribd API** | $50+/mo | Books, long-form | Excellent |
| **Google Books API** | Free | Book data, snippets | Good |
| **Feedbooks API** | Free tier | Public domain books | Good |
| **Quotable.io** | Free | Short quotes/stories | Good |
| **Text Synth** | Free/Paid | AI-generated stories | Excellent |

---

## 🔗 Implementation in Your App

### Step 1: Update Story Selection Modal

```javascript
// In renderStorySelection()
async function handleMoodClick(mood) {
  console.log(`🎯 Selected mood: ${mood}`);
  
  // Show loading spinner
  document.getElementById('story-display').innerHTML = 
    '<div style="text-align: center; padding: 2rem;">⏳ Loading immersive story...</div>';
  
  // Fetch real story
  const story = await fetchMoodStories(mood);
  
  if (!story) {
    console.error('Failed to fetch story');
    // Fallback to hardcoded
    const fallback = getHardcodedStory(mood);
    renderStory(fallback);
    return;
  }
  
  // Format fetched story
  const formattedStory = {
    title: story.title || 'Untitled',
    author: story.author || 'Unknown',
    type: mood,
    text: formatStoryContent(story),
    source: story.source || 'Online'
  };
  
  // Add to history
  appState.storyHistory.unshift({
    ...formattedStory,
    timestamp: Date.now(),
    mood: detectCurrentMood()
  });
  
  // Render with characters
  renderStory(formattedStory);
  animateStoryCharacters(formattedStory.type);
}

// Format content to match your paragraph structure
function formatStoryContent(story) {
  if (Array.isArray(story.excerpts)) {
    return story.excerpts; // Already formatted
  }
  
  if (typeof story.content === 'string') {
    // Split into paragraphs
    const paragraphs = story.content
      .split('\n\n')
      .filter(p => p.trim().length > 50)
      .slice(0, 8); // Take first 8 paragraphs
    
    return paragraphs;
  }
  
  return [story.content || story.description];
}
```

---

## Step 2: Add Caching (Reduce API Calls)

```javascript
const storyCache = {
  mystical: [],
  dark: [],
  hopeful: [],
  surreal: [],
  horror: [],
  random: []
};

async function fetchMoodStoriesWithCache(moodType) {
  // Check cache first
  if (storyCache[moodType].length > 0) {
    const cachedStory = storyCache[moodType].shift();
    console.log('📚 Using cached story');
    return cachedStory;
  }
  
  // Fetch new batch
  console.log('🌐 Fetching new stories from API...');
  const stories = await fetchBatchOfStories(moodType, 5); // Fetch 5 at a time
  
  // Store in cache
  storyCache[moodType] = stories;
  
  // Save to localStorage for persistence
  localStorage.setItem(
    `erasure_cache_${moodType}`,
    JSON.stringify(stories.slice(0, 3)) // Keep top 3
  );
  
  return stories[0];
}

// Load cache from localStorage on app start
function initStoryCache() {
  ['mystical', 'dark', 'hopeful', 'surreal', 'horror', 'random'].forEach(mood => {
    const cached = localStorage.getItem(`erasure_cache_${mood}`);
    if (cached) {
      storyCache[mood] = JSON.parse(cached);
    }
  });
}
```

---

## Step 3: Handle Errors Gracefully

```javascript
async function fetchMoodStories(moodType) {
  try {
    // Try primary sources first (faster)
    const story = await Promise.race([
      fetchFromStoriesAPI(moodType),
      fetchFromGutenberg(moodType)
    ]);
    
    if (story) return story;
    
    // If race times out, try secondary sources
    const secondaryStory = await Promise.any([
      scrapeRedditStories(moodType),
      scrapeWattpadStories(moodType)
    ]);
    
    return secondaryStory[0];
    
  } catch (error) {
    console.warn(`Failed to fetch ${moodType} stories:`, error);
    
    // Fallback: Use cached stories
    if (storyCache[moodType].length > 0) {
      return storyCache[moodType][0];
    }
    
    // Final fallback: Use hardcoded stories
    return fallbackToHardcodedStories(moodType);
  }
}
```

---

## 🚀 Quick Start: Use Google Books API

**Easiest option to implement right now:**

```javascript
// No API key needed for basic search
async function fetchFromGoogleBooks(moodType) {
  const moodToQuery = {
    'mystical': 'fantasy adventure',
    'dark': 'dark fiction horror',
    'hopeful': 'inspirational uplifting',
    'surreal': 'surreal science fiction',
    'horror': 'horror scary',
    'random': 'fiction'
  };
  
  const query = moodToQuery[moodType];
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`
    );
    const data = await response.json();
    
    // Filter books with descriptions
    const books = data.items.filter(book => book.volumeInfo.description);
    
    if (!books.length) return null;
    
    const book = books[Math.floor(Math.random() * books.length)];
    
    // Use book description as story preview
    const description = book.volumeInfo.description;
    const paragraphs = description
      .split('. ')
      .slice(0, 5)
      .map(p => p + '.');
    
    return {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.[0] || 'Unknown',
      content: paragraphs.join(' '),
      source: 'Google Books',
      url: book.volumeInfo.infoLink,
      mood: moodType
    };
  } catch (error) {
    console.error('Google Books fetch failed:', error);
    return null;
  }
}
```

Add this to your app:
```javascript
// In loadStoryWithType()
const story = await fetchFromGoogleBooks(storyType);
if (story) {
  renderStory(story);
} else {
  // Fallback
  renderStory(getHardcodedStory(storyType));
}
```

---

## Comparison Table

| Source | Setup Time | Data Quality | Cost | Best For |
|--------|-----------|--------------|------|----------|
| Google Books API | ⭐ 5 min | ⭐⭐⭐ | Free | Quick start |
| Project Gutenberg | ⭐ 10 min | ⭐⭐ | Free | Classic books |
| Stories API | ⭐⭐ 20 min | ⭐⭐⭐⭐ | Free/Paid | Purpose-built |
| Reddit Scraping | ⭐⭐⭐ 30 min | ⭐⭐⭐ | Free | Real stories |
| Scribd API | ⭐⭐⭐⭐ 1hr | ⭐⭐⭐⭐⭐ | $50+/mo | Premium quality |

---

## My Recommendation

**Start with this simple approach:**

1. **Today:** Use Google Books API (no setup needed)
2. **Week 1:** Add Reddit scraping (more authentic)
3. **Week 2:** Implement caching (better performance)
4. **Week 3:** Add multiple sources with fallback

This ensures your app always has stories, even if one source fails!

---

## Code Template Ready to Use

Add this to your `src/app.js` right after `loadStoryWithType()`:

```javascript
// ============ FETCH ONLINE STORIES ============

async function loadOnlineStory(storyType) {
  console.log(`📖 Loading ${storyType} story from online sources...`);
  
  try {
    // Show loading state
    document.getElementById('story-display').innerHTML = 
      '<p style="text-align: center; color: #0ff; font-size: 1.2rem;">⏳ Fetching immersive tale...</p>';
    
    // Try multiple sources
    let story = await fetchFromGoogleBooks(storyType)
      .catch(() => fetchFromStoriesAPI(storyType))
      .catch(() => scrapeRedditStories(storyType));
    
    if (!story) {
      console.warn('All sources failed, using fallback');
      story = fallbackToHardcodedStories(storyType);
    }
    
    // Format and render
    const formattedStory = normalizeStoryFormat(story);
    renderStory(formattedStory);
    animateStoryCharacters(storyType);
    
  } catch (error) {
    console.error('Error loading story:', error);
    // Graceful fallback
    const fallback = fallbackToHardcodedStories(storyType);
    renderStory(fallback);
  }
}

// Helper: Normalize different story formats
function normalizeStoryFormat(story) {
  return {
    title: story.title || 'Untitled Tale',
    author: story.author || 'Anonymous',
    type: story.mood || story.type || 'random',
    text: Array.isArray(story.text) 
      ? story.text 
      : (story.text || story.content || story.description).split('\n').filter(p => p.trim()),
    source: story.source || 'Online',
    url: story.url || null
  };
}

// Fallback to hardcoded if online fails
function fallbackToHardcodedStories(storyType) {
  // Use your existing storyDatabase here
  return storyDatabase[storyType][Math.floor(Math.random() * storyDatabase[storyType].length)];
}
```

---

## Ready to Implement?

Would you like me to:
1. ✅ Add online story fetching to your app right now?
2. ✅ Integrate Google Books API?
3. ✅ Set up caching system?
4. ✅ Add all error handling?

**Just say the word!** 🚀
