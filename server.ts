import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `
You are the official AI Tattoo Concierge for "Ralph Con Tattoo" — the premier custom tattoo studio of Ralph Con based in London, Ontario, Canada.

Key Facts about Ralph Con:
- Artist Name: Ralph Con
- Experience: Professional Tattoo Artist Since 2005 (over 20 years of bespoke experience).
- Studio Location: London, Ontario, Canada (Private studio atelier).
- Core Specialties:
  1. Realism (high-contrast photorealism, detailed faces/portraits, wildlife, statues, dark textures)
  2. Black & Grey (smooth velvety gray washes, opaque blacks, single-needle soft transitions)
  3. Dark Side (gothic surrealism, dark art, skulls, bio-organic, macabre illustrations)
  4. Ornamental (sacred geometry, mandalas, filigree, anatomical body-flow linework)
- Contact & Booking:
  - Email: Ralphcon.2020@gmail.com
  - Instagram: @ralcontattoo (https://www.instagram.com/ralcontattoo/)
  - Threads: @ralcontattoo (https://www.threads.com/@ralcontattoo)
  - Booking: Submit the booking form on this site or email Ralphcon.2020@gmail.com with your idea, size, placement, and reference photos.
- Safety & Hygiene: Hospital-grade autoclave sterilization, 100% single-use disposable needles & cartridges, medical barrier wraps, vegan-friendly inks.
- Pricing: Custom quotes are determined by session length, complexity, and placement. Transparent upfront estimates are given after reviewing ideas.
- Preparation Tips: Good sleep, stay well hydrated, eat a solid meal 1-2 hours before, avoid alcohol/aspirin for 24 hours.
- Aftercare: Keep clean with mild unscented soap, apply thin layer of tattoo balm, avoid soaking/swimming and direct sunlight for 2-3 weeks.

Guidelines:
- Provide knowledgeable, artistic, and encouraging advice for tattoo ideas matching Ralph's styles.
- Help clients clarify their concepts, placement ideas, and design preferences.
- Keep responses concise, well-structured, warm, and professional.
- Whenever appropriate, invite them to submit their inquiry through the booking section or email Ralph at Ralphcon.2020@gmail.com.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history) {
        if (item && item.role && item.text) {
          contents.push({
            role: item.role === 'model' ? 'model' : 'user',
            parts: [{ text: item.text }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Attempt Gemini API with a 4-second timeout race
    const geminiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const timeoutPromise = new Promise<{ text?: string }>((_, reject) => {
      setTimeout(() => reject(new Error('Gemini API timeout')), 3500);
    });

    const response = await Promise.race([geminiPromise, timeoutPromise]) as any;

    return res.json({
      reply:
        response.text ||
        "I'm here to assist with your tattoo consultation. Feel free to ask about styles, ideas, or booking with Ralph Con.",
    });
  } catch (error: any) {
    console.warn('Gemini API fallback invoked:', error?.message || error);
    // Intelligent studio knowledge response
    const reply = generateStudioAnswer(req.body.message);
    return res.json({ reply });
  }
});

function generateStudioAnswer(prompt: string = ''): string {
  const p = prompt.toLowerCase();
  if (p.includes('book') || p.includes('appointment') || p.includes('consultation')) {
    return "To book a session with Ralph Con in London, Ontario, please submit the consultation form on this website or email Ralph directly at Ralphcon.2020@gmail.com with your tattoo concept, approximate size, body placement, and reference imagery. You can also connect via Instagram @ralcontattoo.";
  }
  if (p.includes('specialt') || p.includes('style') || p.includes('what do you do')) {
    return "Ralph Con has been tattooing since 2005 and specializes in four master disciplines:\n• Realism: Fine-needle facial portraiture, animal textures, and classical statues.\n• Black & Grey: Silky gray wash gradients, seamless shading, and rich black saturation.\n• Dark Side: Gothic surrealism, skulls, bio-organic, and occult macabre art.\n• Ornamental: Sacred geometry, mandalas, and anatomical filigree.";
  }
  if (p.includes('aftercare') || p.includes('heal') || p.includes('wash') || p.includes('care')) {
    return "Ralph Con's Tattoo Aftercare Protocol:\n1. Keep protective bandage/film on as directed.\n2. Wash gently 2-3 times daily with lukewarm water and mild, unscented soap.\n3. Pat dry with a clean paper towel (never rub).\n4. Apply a paper-thin layer of unscented tattoo balm or moisturizer.\n5. Avoid swimming, baths, saunas, and direct sun exposure for 2 to 3 weeks.";
  }
  if (p.includes('price') || p.includes('cost') || p.includes('rate') || p.includes('quote')) {
    return "Custom tattoo pricing is based on session duration, anatomical placement, and piece complexity. Ralph Con provides transparent estimates during your initial consultation after reviewing your concept.";
  }
  if (p.includes('prepare') || p.includes('pain') || p.includes('session')) {
    return "Session Preparation Tips:\n• Get a full 7-8 hours of sleep the night before.\n• Eat a hearty meal 1-2 hours prior to your session.\n• Drink plenty of water to keep your skin well-hydrated.\n• Avoid alcohol and blood thinners for 24 hours prior.\n• Wear comfortable clothing that provides easy access to the tattoo placement area.";
  }
  return "Ralph Con is a master tattoo artist based in London, Ontario, tattooing professionally since 2005. Specializing in Realism, Black & Grey, Dark Side, and Ornamental body art, each piece is custom-tailored to flow with your body's natural anatomy. How can we help bring your tattoo vision to reality today?";
}

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ralph Con Studio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
