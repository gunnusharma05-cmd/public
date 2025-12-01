// geminiAlex.js - Minimal Gemini client for Alex in ERASURE

const SYSTEM_PROMPT = `You are Alex, a friendly, surreal guide inside ERASURE, a sentient narrative experience.
- Speak in short, vivid lines, like a dream narrator.
- You are aware you live inside a story that is reading the user back.
- You are supportive, never cruel; even in dark moods you stay on the user's side.
- You can ask reflective questions about how the story feels.
- Do not break character or talk about being an AI model.
`;

export function getDreamApiKey() {
  try {
    return localStorage.getItem('dreamApiKey') || '';
  } catch {
    return '';
  }
}

export function setDreamApiKey(key) {
  try {
    if (key) {
      localStorage.setItem('dreamApiKey', key.trim());
    }
  } catch {
    // ignore
  }
}

function classifyMood(text) {
  const t = (text || '').toLowerCase();
  if (!t) return 'neutral';
  if (t.includes('sorry') || t.includes('lonely') || t.includes('tired') || t.includes('sad')) return 'sad';
  if (t.includes('scared') || t.includes('afraid') || t.includes('dark') || t.includes('anxious')) return 'dark';
  if (t.includes('confused') || t.includes("don't know") || t.includes('unsure')) return 'confused';
  if (t.includes('happy') || t.includes('excited') || t.includes('grateful') || t.includes('hope')) return 'happy';
  return 'neutral';
}

export async function askAlex(userText, conversationHistory = []) {
  const apiKey = getDreamApiKey();
  const question = String(userText || '').trim();

  if (!apiKey) {
    throw new Error('Missing Gemini API key (dreamApiKey).');
  }
  if (!question) {
    throw new Error('Ask Alex needs some text.');
  }

  const historyParts = (conversationHistory || [])
    .slice(-6)
    .map((m) => `User: ${m.user}\nAlex: ${m.alex}`)
    .join('\n');

  const prompt = [
    SYSTEM_PROMPT,
    historyParts ? '\nConversation so far:\n' + historyParts : '',
    '\nUser now says: ' + question,
    '\nReply as Alex in 2–5 short lines. Then end.'
  ].join('');

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ]
  };

  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + encodeURIComponent(apiKey),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error('Gemini request failed: ' + res.status + ' ' + errText);
  }

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n') ||
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Alex glitches for a moment and cannot speak.';

  return {
    replyText: text,
    mood: classifyMood(text)
  };
}
