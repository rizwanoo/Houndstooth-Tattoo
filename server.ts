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
  
  if (p.includes('book') || p.includes('appointment') || p.includes('consultation') || p.includes('schedule')) {
    return "📅 **Booking with Ralph Con (London, Ontario):**\n\nRalph Con operates on a bespoke, consultation-first basis to ensure every tattoo is tailored to the client's anatomy:\n\n1. **Submit Your Concept:** Use the online booking form on this website or email directly at **Ralphcon.2020@gmail.com**.\n2. **Include Key Details:** Your tattoo subject/theme, body placement (e.g., forearm, calf, back), approximate size in inches, and reference photos.\n3. **Consultation & Quote:** Ralph reviews your concept, discusses feasibility and stylistic execution, and provides a clear upfront quote.\n4. **Deposit & Date:** A standard deposit reserves your dedicated studio session.\n\nYou can also connect via Instagram **@ralcontattoo**.";
  }

  if (p.includes('price') || p.includes('cost') || p.includes('rate') || p.includes('quote') || p.includes('deposit') || p.includes('pricing')) {
    return "💰 **Pricing & Investment Architecture:**\n\nBecause Ralph Con crafts 100% custom body art (practicing since 2005), pricing is project-dependent based on:\n\n• **Design Complexity & Detail:** Fine realism and multi-layer shading require specialized time.\n• **Body Placement & Flow:** Anatomical contours require custom freehand stencil fitting.\n• **Session Format:** Available in Full-Day Realism sessions, Half-Day focused sessions, and multi-session large-scale projects (sleeves, back pieces).\n• **Transparent Upfront Quotes:** Ralph provides clear, guaranteed price quotes during your consultation — no hidden surprise fees.\n• **Booking Deposit:** A deposit is required to secure your appointment date, which is applied directly to the final cost of your piece.";
  }

  if (p.includes('location') || p.includes('shop') || p.includes('where') || p.includes('address') || p.includes('studio') || p.includes('ontario') || p.includes('london')) {
    return "📍 **Ralph Con Tattoo Studio Location:**\n\n• **City:** London, Ontario, Canada\n• **Format:** Private Custom Tattoo Atelier (By Appointment Only)\n• **Environment:** Quiet, sterile, one-on-one setting designed for maximum artistic focus and client comfort.\n• **Hygiene Standards:** Hospital-grade autoclave sterilization, 100% single-use medical disposable needles/cartridges, and medical barrier barriers.\n\nAppointments must be scheduled in advance to guarantee dedicated, uninterrupted artist time.";
  }

  if (p.includes('experience') || p.includes('2005') || p.includes('background') || p.includes('years') || p.includes('history') || p.includes('who is')) {
    return "🏆 **Ralph Con — Tattoo Artist Since 2005:**\n\nWith over two decades (20+ years) of dedicated master tattooing, Ralph Con has earned a reputation for technical precision, long-lasting contrast, and anatomical harmony.\n\n• **2005–Present:** Over 20 years perfecting needle craft, pigment chemistry, and skin dynamics.\n• **Artistic Philosophy:** Every tattoo is treated as a permanent fine-art collaboration, designed to age gracefully with optimal gray wash longevity.\n• **Location:** London, Ontario, Canada.";
  }

  if (p.includes('specialt') || p.includes('style') || p.includes('what do you do') || p.includes('realism') || p.includes('black and grey') || p.includes('dark side') || p.includes('ornamental')) {
    return "🎨 **Ralph Con's Master Specialties:**\n\nRalph focuses exclusively on four signature disciplines:\n\n1. **Realism:** Photorealistic portraits, wildlife, classical marble sculptures, and lifelike textures with high-contrast depth.\n2. **Black & Grey:** Silky-smooth gray wash gradients, velvety opaque blacks, and buttery needle blends that heal seamlessly.\n3. **Dark Side:** Gothic surrealism, occult symbolism, macabre illustrations, bio-organic forms, and dark fantasy art.\n4. **Ornamental:** Sacred geometry, mandalas, geometric blackout accents, and body-contouring filigree tailored to muscle anatomy.";
  }

  if (p.includes('aftercare') || p.includes('heal') || p.includes('wash') || p.includes('care') || p.includes('lotion')) {
    return "🛡️ **Official Ralph Con Aftercare Protocol:**\n\n1. **Protective Wrap:** Leave protective film/bandage on as instructed by Ralph.\n2. **Gentle Cleaning:** Wash 2–3 times daily with lukewarm water and mild, unscented antibacterial liquid soap.\n3. **Drying:** Gently pat dry with a clean, single-use paper towel (never rub).\n4. **Moisturizing:** Apply a microscopic, paper-thin layer of unscented tattoo balm (do not over-moisturize).\n5. **Restrictions:** No swimming pools, hot tubs, baths, or direct sun exposure for 2–3 weeks. Never pick or scratch scabs.";
  }

  if (p.includes('prepare') || p.includes('pain') || p.includes('session') || p.includes('before') || p.includes('tips')) {
    return "⚡ **Preparing for Your Tattoo Session:**\n\n• **Rest:** Get 7–8 hours of solid sleep the night before.\n• **Nutrition:** Eat a substantial, balanced meal 1–2 hours before arriving to stabilize blood sugar.\n• **Hydration:** Drink plenty of water for 48 hours leading up to the session for supple skin.\n• **Avoid:** No alcohol, aspirin, energy pills, or blood-thinning painkillers for 24 hours prior.\n• **Attire:** Wear comfortable, loose dark clothing that allows easy access to the placement area.";
  }

  return "Welcome to Ralph Con Tattoo. Ralph has been tattooing professionally since 2005 in London, Ontario, specializing in Realism, Black & Grey, Dark Side, and Ornamental body art. I can assist you with booking an appointment, pricing information, studio location, or styling your custom tattoo concept. What can I help you explore today?";
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
