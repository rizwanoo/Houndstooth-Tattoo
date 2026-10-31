import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, ArrowRight, RefreshCw, Calendar, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface StudioAIChatbotProps {
  onBookClick?: () => void;
}

const QUICK_PROMPTS = [
  "How do I book a tattoo session?",
  "What styles does Ralph Con specialize in?",
  "What is the recommended aftercare?",
  "Tips for preparing for a long session?",
  "Can you help me brainstorm a realism piece?",
];

export default function StudioAIChatbot({ onBookClick }: StudioAIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome to Ralph Con Tattoo. I am your studio AI concierge. I can answer questions about Ralph's custom tattooing since 2005, discuss styles (Realism, Black & Grey, Dark Side, Ornamental), explain booking in London, Ontario, or give session preparation advice. How can I assist your tattoo vision today?",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
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
      // Build history payload
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
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || "I'm here to assist with your tattoo consultation. Feel free to ask about styles, ideas, or booking with Ralph Con.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn('API call fallback triggered:', err);
      // Graceful offline/local knowledge fallback so the client is never stranded
      const fallbackReply = generateFallbackReply(text);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Local knowledge matcher as fallback
  const generateFallbackReply = (prompt: string): string => {
    const lower = prompt.toLowerCase();
    if (lower.includes('book') || lower.includes('appointment') || lower.includes('consultation')) {
      return "To book with Ralph Con in London, Ontario, simply submit the booking form on this website or email Ralph directly at Ralphcon.2020@gmail.com with your idea, body placement, estimated size, and references. You can also connect via Instagram @ralcontattoo.";
    }
    if (lower.includes('style') || lower.includes('specialt') || lower.includes('do you do')) {
      return "Ralph Con has been tattooing since 2005 and specializes in four distinct disciplines: Realism (portraits, wildlife, statues), velvety smooth Black & Grey, Dark Side (gothic surrealism, skulls, macabre art), and Ornamental (sacred geometry, mandalas, anatomical filigree).";
    }
    if (lower.includes('aftercare') || lower.includes('heal') || lower.includes('wash')) {
      return "Recommended Aftercare:\n1. Keep bandage/second-skin on as directed.\n2. Wash gently 2-3 times daily with lukewarm water and mild antibacterial fragrance-free soap.\n3. Pat dry with a clean paper towel (don't rub).\n4. Apply a paper-thin layer of unscented tattoo balm/ointment.\n5. Avoid swimming, hot tubs, baths, and direct sun for 2 to 3 weeks.";
    }
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
      return "Pricing is based on design scale, complexity, anatomical placement, and session duration. Ralph Con provides clear upfront quotes during consultation once your concept and references are assessed.";
    }
    if (lower.includes('prepare') || lower.includes('pain') || lower.includes('session')) {
      return "Session Preparation Tips:\n• Get 7-8 hours of sound sleep.\n• Eat a substantial meal 1-2 hours prior.\n• Stay well hydrated throughout the preceding 24 hours.\n• Avoid alcohol, aspirin, or blood thinners for 24 hours before your session.\n• Wear comfortable, loose clothing giving easy access to the tattoo site.";
    }
    return `Ralph Con is an expert tattoo artist in London, Ontario with over two decades of custom artistry experience since 2005. Whether you are seeking a detailed Realism piece, dark surrealism, smooth black & grey, or sacred geometry, Ralph can bring your concept to life. Feel free to submit your idea through our consultation form or email Ralphcon.2020@gmail.com!`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Widget Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Ralph Con Tattoo AI Consultation Chat"
            className="group relative flex items-center gap-3 bg-neutral-950/95 hover:bg-neutral-900 border border-neutral-700 hover:border-[#00d2b2] text-white px-4 py-3 shadow-[0_0_25px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Glowing Accent Border Indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d2b2] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00d2b2]" />
            </span>

            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#00d2b2]/60 bg-black shrink-0 flex items-center justify-center">
              <img
                src={STUDIO_INFO.logo}
                alt="Ralph Con Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                  Studio AI Concierge
                </span>
                <Sparkles className="w-3 h-3 text-[#00d2b2]" />
              </div>
              <span className="text-[10px] text-neutral-400 font-mono block">
                Ask about styles, ideas & booking
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
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] h-[580px] max-h-[85vh] bg-[#0a0a0a] border border-neutral-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00d2b2] bg-black shrink-0 relative">
                <img
                  src={STUDIO_INFO.logo}
                  alt="Ralph Con Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 id="chat-heading" className="font-heading text-sm font-bold uppercase tracking-wider text-white">
                    Ralph Con Studio AI
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#00d2b2] animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                  <MapPin className="w-3 h-3 text-[#00d2b2]" />
                  <span>London, Ontario · Since 2005</span>
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
                      text: "Conversation refreshed. How can I help you explore custom tattoo ideas or session details today?",
                      timestamp: 'Just now',
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

          {/* Quick Consultation Ribbon */}
          <div className="px-4 py-2 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-neutral-300">
              Ready to ink your vision?
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                if (onBookClick) onBookClick();
              }}
              className="text-[#00d2b2] hover:text-[#00e8c4] font-heading text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-3 h-3" />
              <span>Book Consultation</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-neutral-200">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-neutral-900 border border-[#00d2b2]/40 text-[#00d2b2] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-none leading-relaxed shadow-md ${
                    m.role === 'user'
                      ? 'bg-[#00d2b2] text-neutral-950 font-medium'
                      : 'bg-neutral-900/90 text-neutral-200 border border-neutral-800'
                  }`}
                >
                  <p className="whitespace-pre-line text-xs">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1.5 font-mono ${
                      m.role === 'user' ? 'text-neutral-800' : 'text-neutral-500'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-neutral-900 border border-[#00d2b2]/40 text-[#00d2b2] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d2b2] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d2b2] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d2b2] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-neutral-400 font-mono ml-1">
                    Ralph Con AI thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions */}
          {messages.length <= 3 && (
            <div className="p-2.5 bg-neutral-950/90 border-t border-neutral-850 overflow-x-auto">
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-heading font-semibold mb-1.5 px-1">
                Suggested Questions
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#00d2b2]/60 text-[11px] transition-colors shrink-0 cursor-pointer text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-neutral-950 border-t border-neutral-800">
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 focus-within:border-[#00d2b2] px-3 py-1.5 transition-colors">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about design, placement, booking..."
                className="flex-1 bg-transparent text-xs text-white placeholder:text-neutral-500 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="p-1.5 text-[#00d2b2] hover:text-[#00e8c4] disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-neutral-500 text-center mt-1.5 font-mono">
              Direct inquiries: <a href="mailto:Ralphcon.2020@gmail.com" className="text-neutral-400 hover:text-[#00d2b2]">Ralphcon.2020@gmail.com</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
