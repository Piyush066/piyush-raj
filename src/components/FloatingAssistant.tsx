import { useState, useRef } from "react";
import { Mic, MicOff, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Vapi from "@vapi-ai/web";

const VAPI_PUBLIC_KEY = "0d456a9a-6dc8-4a8f-9abc-d281b1374496";
const ASSISTANT_ID = "d5db0294-6ae8-45ae-b376-b024c6588945";

const FloatingAssistant = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);

  const toggleCall = async () => {
    if (active) {
      vapiRef.current?.stop();
      setActive(false);
      return;
    }

    setLoading(true);
    try {
      if (!vapiRef.current) {
        vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);
        vapiRef.current.on("call-end", () => setActive(false));
      }
      await vapiRef.current.start(ASSISTANT_ID);
      setActive(true);
    } catch (e) {
      console.error("Vapi error:", e);
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const quickLinks = [
    { label: "Portfolio", id: "portfolio" },
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Tech", id: "tech" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="glass-card rounded-2xl border border-border w-72 overflow-hidden shadow-[0_8px_32px_hsl(0_0%_0%_/_0.5)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg    -gradient-to-r from-primary/10 to    -	transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Mic size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-heading font-bold">AI Assistant</p>
                    <p className="text-muted-foreground text-[10px]">Voice-powered navigation</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Voice control */}
            <div className="p-4">
              <button
                onClick={toggleCall}
                disabled={loading}
                className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(24_95%_53%_/_0.4)]"
                    : "border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {active ? <MicOff size={16} /> : <Mic size={16} />}
                <span>
                  {loading ? "Connecting…" : active ? "End Call" : "Talk to AI"}
                </span>
                {active && (
                  <span className="w-2 h-2 rounded-full bg-primary-foreground animate-ping" />
                )}
              </button>

              {active && (
                <p className="text-center text-muted-foreground text-[10px] mt-2">
                  Listening… Ask me to navigate anywhere
                </p>
              )}
            </div>

            {/* Quick links */}
            <div className="px-4 pb-4">
              <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-semibold mb-2">
                Quick Navigate
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => navigateTo(link.id)}
                    className="px-3 py-1.5 rounded-lg bg-secondary/80 border border-border text-muted-foreground text-xs font-medium hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_hsl(0_0%_0%_/_0.4)] transition-all duration-300 ${
          open
            ? "bg-secondary border border-border text-foreground"
            : "bg-primary text-primary-foreground shadow-[0_0_25px_hsl(24_95%_53%_/_0.4)]"
        }`}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>
    </div>
  );
};

export default FloatingAssistant;
