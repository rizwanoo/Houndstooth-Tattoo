import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  RefreshCw,
  Calendar,
  MapPin,
  DollarSign,
  Award,
  ShieldCheck,
  Check,
  Copy,
  Mail,
  ExternalLink,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  cardType?: 'booking' | 'pricing' | 'location' | 'specialties' | 'none';
}

interface StudioAIChatbotProps {
  onBookClick?: () => void;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
  cardType?: 'booking' | 'pricing' | 'location' | 'specialties';
}

const STRUCTURED_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'book',
    label: 'Book Appointment',
    icon: <Calendar className="w-3.5 h-3.5 text-[#00d2b2]" />,
    prompt: 'How do I book a tattoo appointment with Ralph Con?',
    cardType: 'booking',
  },
  {
    id: 'pricing',
    label: 'Pricing & Rates',
    icon: <DollarSign className="w-3.5 h-3.5 text-[#00d2b2]" />,
    prompt: 'What is Ralph Con pricing and how are rates determined?',
    cardType: 'pricing',
  },
  {
    id: 'location',
    label: 'Shop Location',
    icon: <MapPin className="w-3.5 h-3.5 text-[#00d2b2]" />,
    prompt: 'Where is Ralph Con tattoo studio located in London, Ontario?',
    cardType: 'location',
  },
  {
    id: 'specialties',
    label: 'Specialties (Since 2005)',
    icon: <Award className="w-3.5 h-3.5 text-[#00d2b2]" />,
    prompt: "What are Ralph Con's master specialties and background since 2005?",
    cardType: 'specialties',
  },
  {
    id: 'aftercare',
    label: 'Aftercare Protocol',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-[#00d2b2]" />,
    prompt: 'What is the recommended tattoo aftercare guide?',
  },
];

export default function StudioAIChatbot({ onBookClick }: StudioAIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialWelcomeText =
    "Welcome to Ralph Con Tattoo. I am your studio AI concierge.\n\nRalph Con has been crafting master custom tattoos in London, Ontario since 2005, specializing in Realism, velvety Black & Grey, Dark Side, and Ornamental body flow.\n\nHow can I guide your tattoo vision today?";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: initialWelcomeText,
      timestamp: 'Just now',
      cardType: 'none',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  // Determine card type based on text content
  const detectCardType = (text: string): 'booking' | 'pricing' | 'location' | 'specialties' | 'none' => {
    const lower = text.toLowerCase();
    if (lower.includes('book') || lower.includes('appointment') || lower.includes('consultation')) {
      return 'booking';
    }
    if (lower.includes('price') || lower.includes('pricing') || lower.includes('rate') || lower.includes('cost') || lower.includes('deposit')) {
      return 'pricing';
    }
    if (lower.includes('location') || lower.includes('where is') || lower.includes('address') || lower.includes('shop location')) {
      return 'location';
    }
    if (lower.includes('specialt') || lower.includes('2005') || lower.includes('realism') || lower.includes('dark side') || lower.includes('ornamental')) {
      return 'specialties';
    }
    return 'none';
  };

  const handleSendMessage = async (textToSend?: string, forcedCardType?: 'booking' | 'pricing' | 'location' | 'specialties') => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build history payload for Gemini backend
      const history = messages.slice(1).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || generateFallbackReply(text);
      const card = forcedCardType || detectCardType(replyText + ' ' + text);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType: card,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn('API call fallback triggered:', err);
      // Graceful offline/local knowledge fallback so the client is never stranded
      const fallbackReply = generateFallbackReply(text);
      const card = forcedCardType || detectCardType(fallbackReply + ' ' + text);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType: card,
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Comprehensive Local Knowledge Matcher
  const generateFallbackReply = (prompt: string): string => {
    const lower = prompt.toLowerCase();

    if (lower.includes('book') || lower.includes('appointment') || lower.includes('consultation') || lower.includes('schedule')) {
      return "📅 **Booking With Ralph Con (London, Ontario):**\n\nRalph Con operates strictly on a consultation basis to provide fully customized body art:\n\n1. **Submit Your Concept:** Use our direct booking form or email Ralph directly at **Ralphcon.2020@gmail.com**.\n2. **Include Key Details:** Subject matter, body placement (forearm, back, sleeve, etc.), approximate measurements in inches, and high-res visual references.\n3. **Consultation & Quote:** Ralph reviews your idea, anatomical flow, and provides an upfront estimate.\n4. **Secure Your Session:** A deposit secures your private appointment slot.";
    }

    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('deposit') || lower.includes('pricing')) {
      return "💰 **Pricing & Investment Breakdown:**\n\nBecause Ralph Con produces 100% bespoke tattoo art (practicing since 2005), pricing is determined by:\n\n• **Piece Scale & Placement:** Sleeves, backpieces, or focal placements.\n• **Artistic Complexity:** Hyper-realism, fine-line shading, and high-contrast saturation.\n• **Session Formats:** Full-day realism sessions, half-day sessions, or multi-session project packages.\n• **Transparent Upfront Quotes:** Ralph provides clear, guaranteed quotes before any needle touches skin — no surprises.\n• **Deposit:** A standard deposit holds your date and is deducted from the final session total.";
    }

    if (lower.includes('location') || lower.includes('where') || lower.includes('shop') || lower.includes('address') || lower.includes('studio') || lower.includes('london')) {
      return "📍 **Studio Location & Atelier Details:**\n\n• **City:** London, Ontario, Canada\n• **Format:** Private Custom Atelier (By Appointment Only)\n• **Environment:** Quiet, sterile, private setting allowing 100% undivided attention for your session.\n• **Hygiene:** Hospital-grade autoclave sterilization, 100% single-use medical disposable needles/cartridges, and medical barrier barriers.";
    }

    if (lower.includes('specialt') || lower.includes('style') || lower.includes('2005') || lower.includes('experience') || lower.includes('who is')) {
      return "🏆 **Ralph Con — Tattoo Artist Since 2005:**\n\nWith over 20 years of bespoke tattoo experience, Ralph specializes in four master disciplines:\n\n1. **Realism:** Photorealistic portraits, wildlife, marble statues, and high-contrast textures.\n2. **Black & Grey:** Silky-smooth gray wash gradients and deep opaque blacks.\n3. **Dark Side:** Gothic surrealism, occult symbolism, macabre art, and bio-organic forms.\n4. **Ornamental:** Sacred geometry, mandalas, and anatomical filigree designed to follow muscle contours.";
    }

    if (lower.includes('aftercare') || lower.includes('heal') || lower.includes('wash') || lower.includes('care')) {
      return "🛡️ **Official Ralph Con Aftercare Protocol:**\n\n1. **Bandage:** Keep protective film on as instructed.\n2. **Cleanse:** Wash 2–3 times daily with lukewarm water and mild fragrance-free antibacterial soap.\n3. **Pat Dry:** Gently dry with a clean paper towel (never rub).\n4. **Hydrate:** Apply a razor-thin layer of unscented tattoo balm (do not smother).\n5. **Protect:** No baths, swimming pools, saunas, or direct sun exposure for 2–3 weeks.";
    }

    if (lower.includes('prepare') || lower.includes('pain') || lower.includes('session')) {
      return "⚡ **Preparation Tips for Your Session:**\n\n• Get 7–8 hours of solid sleep the night before.\n• Eat a balanced, hearty meal 1–2 hours before arriving.\n• Hydrate thoroughly for 24–48 hours beforehand.\n• Avoid alcohol and blood-thinning painkillers for 24 hours prior.\n• Wear comfortable, loose dark clothing with easy access to the tattoo site.";
    }

    return "Ralph Con is a master tattoo artist based in London, Ontario, tattooing professionally since 2005. Specializing in Realism, Black & Grey, Dark Side, and Ornamental body art, each piece is custom-tailored to flow with your body's natural anatomy. How can we help bring your tattoo vision to reality today?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to format text with clean headings, bold, bullet points
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1.5">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          // Render formatted bullet points
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            const content = line.trim().replace(/^[•\-]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-[12px] leading-relaxed">
                <span className="text-[#00d2b2] font-bold text-xs mt-0.5">•</span>
                <span>{renderInlineStyles(content)}</span>
              </div>
            );
          }

          // Numbered lists (1. , 2. )
          const numberedMatch = line.trim().match(/^(\d+)\.\s*(.*)/);
          if (numberedMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-[12px] leading-relaxed">
                <span className="text-[#00d2b2] font-mono font-semibold text-[11px] shrink-0 mt-0.5">
                  {numberedMatch[1]}.
                </span>
                <span>{renderInlineStyles(numberedMatch[2])}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-[12px] leading-relaxed">
              {renderInlineStyles(line)}
            </p>
          );
        })}
      </div>
    );
  };

  // Inline formatting helper for **bold** text
  const renderInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Render contextual interactive action card
  const renderStructuredCard = (cardType?: string) => {
    if (!cardType || cardType === 'none') return null;

    if (cardType === 'booking') {
      return (
        <div className="mt-3 p-3.5 bg-neutral-950/90 border border-[#00d2b2]/40 rounded-none shadow-lg">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
            <span className="font-heading text-[11px] uppercase tracking-wider font-bold text-[#00d2b2] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Direct Booking Access
            </span>
            <span className="text-[9px] font-mono text-neutral-400 bg-neutral-900 px-1.5 py-0.5 border border-neutral-800">
              London, ON
            </span>
          </div>
          <p className="text-[11px] text-neutral-300 mb-3">
            Ready to initiate your custom tattoo piece with Ralph Con?
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
                if (onBookClick) onBookClick();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 font-heading font-bold text-xs uppercase tracking-wider px-3 py-2 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Open Booking Form</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <a
              href="mailto:Ralphcon.2020@gmail.com?subject=Tattoo%20Consultation%20Inquiry%20-%20Ralph%20Con"
              className="inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-700 hover:border-[#00d2b2] font-heading font-semibold text-xs uppercase tracking-wider px-3 py-2 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#00d2b2]" />
              <span>Email Ralph</span>
            </a>
          </div>
        </div>
      );
    }

    if (cardType === 'pricing') {
      return (
        <div className="mt-3 p-3.5 bg-neutral-950/90 border border-neutral-800 rounded-none shadow-lg">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-800">
            <span className="font-heading text-[11px] uppercase tracking-wider font-bold text-[#00d2b2] flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              Custom Project Rates
            </span>
            <span className="text-[9px] font-mono text-neutral-400">Since 2005</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3 text-[10px]">
            <div className="p-2 bg-neutral-900 border border-neutral-800/80">
              <span className="block font-heading text-neutral-200 uppercase tracking-wider text-[11px] font-bold">
                Full-Day Realism
              </span>
              <span className="text-neutral-400 block mt-0.5">Sleeves & large high-detail focal pieces</span>
            </div>
            <div className="p-2 bg-neutral-900 border border-neutral-800/80">
              <span className="block font-heading text-neutral-200 uppercase tracking-wider text-[11px] font-bold">
                Half-Day Session
              </span>
              <span className="text-neutral-400 block mt-0.5">Medium pieces, ornamental & single portraits</span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              if (onBookClick) onBookClick();
            }}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-[#00d2b2] hover:text-neutral-950 text-neutral-200 border border-neutral-700 hover:border-[#00d2b2] font-heading font-bold text-xs uppercase tracking-wider px-3 py-2 transition-colors cursor-pointer"
          >
            <span>Request Upfront Quote</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      );
    }

    if (cardType === 'location') {
      return (
        <div className="mt-3 p-3.5 bg-neutral-950/90 border border-neutral-800 rounded-none shadow-lg">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
            <span className="font-heading text-[11px] uppercase tracking-wider font-bold text-[#00d2b2] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Private Atelier Space
            </span>
            <span className="text-[9px] font-mono text-[#00d2b2] bg-[#00d2b2]/10 px-1.5 py-0.5 border border-[#00d2b2]/30">
              Appointment Only
            </span>
          </div>
          <div className="space-y-1.5 text-[11px] text-neutral-300 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-medium">Location:</span> London, Ontario, Canada
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-medium">Format:</span> Dedicated one-on-one custom sessions
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-medium">Inquiries:</span> Ralphcon.2020@gmail.com
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="https://www.instagram.com/ralcontattoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-700 hover:border-[#00d2b2] font-heading font-semibold text-xs uppercase tracking-wider px-3 py-1.5 transition-colors"
            >
              <span>Instagram @ralcontattoo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      );
    }

    if (cardType === 'specialties') {
      return (
        <div className="mt-3 p-3.5 bg-neutral-950/90 border border-neutral-800 rounded-none shadow-lg">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-800">
            <span className="font-heading text-[11px] uppercase tracking-wider font-bold text-[#00d2b2] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              4 Core Disciplines (Since 2005)
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mb-2.5">
            {[
              { name: 'Realism', desc: 'Portraits & Statues' },
              { name: 'Black & Grey', desc: 'Smooth Gray Washes' },
              { name: 'Dark Side', desc: 'Gothic & Surrealism' },
              { name: 'Ornamental', desc: 'Sacred Geometry' },
            ].map((s) => (
              <button
                key={s.name}
                onClick={() => handleSendMessage(`Tell me about your ${s.name} tattoo style and process`)}
                className="text-left p-2 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-[#00d2b2]/60 transition-colors cursor-pointer"
              >
                <div className="font-heading text-white uppercase tracking-wider text-[11px] font-bold">
                  {s.name}
                </div>
                <div className="text-[10px] text-neutral-400">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Floating Widget Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Ralph Con Studio AI Consultation Chat"
            className="group relative flex items-center gap-3 bg-neutral-950/95 hover:bg-neutral-900 border border-neutral-700/80 hover:border-[#00d2b2] text-white px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Glowing Indicator Badge */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d2b2] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00d2b2]" />
            </span>

            {/* Official Logo Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00d2b2]/80 bg-black shrink-0 flex items-center justify-center shadow-md">
              <img
                src={STUDIO_INFO.logo}
                alt="Ralph Con Official Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                  Ralph Con Studio AI
                </span>
                <Sparkles className="w-3 h-3 text-[#00d2b2]" />
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">
                Since 2005 · Booking & Consultation
              </span>
            </div>

            <div className="sm:hidden text-[#00d2b2]">
              <MessageSquare className="w-5 h-5" />
            </div>
          </button>
        )}
      </div>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="chat-heading"
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[440px] max-w-[440px] h-[610px] max-h-[88vh] bg-[#0c0c0c] border border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00d2b2] bg-black shrink-0 shadow-sm">
                  <img
                    src={STUDIO_INFO.logo}
                    alt="Ralph Con Official Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00d2b2] border-2 border-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="chat-heading" className="font-heading text-sm font-bold uppercase tracking-wider text-white">
                    Ralph Con Tattoo AI
                  </h3>
                  <span className="text-[9px] font-mono uppercase bg-[#00d2b2]/10 text-[#00d2b2] border border-[#00d2b2]/30 px-1.5 py-0.2">
                    Est. 2005
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono mt-0.5">
                  <MapPin className="w-3 h-3 text-[#00d2b2]" />
                  <span>London, Ontario · 20+ Yrs Mastery</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: `welcome-${Date.now()}`,
                      role: 'model',
                      text: "Conversation refreshed. How can I help you explore custom tattoo concepts, pricing, or appointment booking with Ralph Con today?",
                      timestamp: 'Just now',
                      cardType: 'none',
                    },
                  ]);
                }}
                title="Restart Chat"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Ribbon (Booking, Pricing, Location, Specialties) */}
          <div className="px-3 py-2 bg-neutral-950/90 border-b border-neutral-850/80 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max">
              {STRUCTURED_QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleSendMessage(action.prompt, action.cardType)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#00d2b2]/60 text-neutral-200 hover:text-white text-[11px] font-heading uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer shrink-0"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-neutral-200 bg-[#090909]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-neutral-900 border border-[#00d2b2]/50 text-[#00d2b2] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[86%] sm:max-w-[82%] p-3.5 shadow-md ${
                    m.role === 'user'
                      ? 'bg-[#00d2b2] text-neutral-950 font-medium border border-[#00e8c4]'
                      : 'bg-neutral-900/95 text-neutral-200 border border-neutral-800'
                  }`}
                >
                  {/* Message Content */}
                  <div>
                    {m.role === 'model' ? (
                      renderFormattedText(m.text)
                    ) : (
                      <p className="whitespace-pre-line text-xs font-medium leading-relaxed">
                        {m.text}
                      </p>
                    )}
                  </div>

                  {/* Contextual Structured Card */}
                  {m.role === 'model' && renderStructuredCard(m.cardType)}

                  {/* Footer / Timestamps / Copy */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-800/40 text-[9px] font-mono">
                    <span className={m.role === 'user' ? 'text-neutral-800' : 'text-neutral-500'}>
                      {m.timestamp}
                    </span>
                    {m.role === 'model' && (
                      <button
                        onClick={() => copyToClipboard(m.text, m.id)}
                        className="text-neutral-500 hover:text-neutral-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title="Copy message"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-[#00d2b2]" />
                            <span className="text-[#00d2b2]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-neutral-900 border border-[#00d2b2]/50 text-[#00d2b2] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs flex items-center gap-2.5">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d2b2] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d2b2] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d2b2] animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Ralph Con Concierge is responding...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions (if few messages) */}
          {messages.length <= 3 && (
            <div className="p-2.5 bg-neutral-950 border-t border-neutral-850">
              <div className="text-[9px] text-neutral-400 uppercase tracking-widest font-heading font-semibold mb-1.5 px-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00d2b2]" />
                <span>Frequently Asked Inquiries</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  'What are Ralph Con rates?',
                  'How do I prepare for a realism session?',
                  'Can you explain Dark Side vs Ornamental?',
                  'Where is the London Ontario studio located?',
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#00d2b2]/50 text-[11px] transition-colors shrink-0 cursor-pointer text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-neutral-950 border-t border-neutral-800">
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 focus-within:border-[#00d2b2] px-3 py-2 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about booking, pricing, styles, location..."
                className="flex-1 bg-transparent text-xs text-white placeholder:text-neutral-500 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="p-1.5 text-[#00d2b2] hover:text-[#00e8c4] disabled:opacity-30 disabled:hover:text-[#00d2b2] transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-2 font-mono px-0.5">
              <span>Direct inquiries:</span>
              <a
                href="mailto:Ralphcon.2020@gmail.com"
                className="text-neutral-400 hover:text-[#00d2b2] transition-colors"
              >
                Ralphcon.2020@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
