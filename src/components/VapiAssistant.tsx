import { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

const VAPI_CDN = "https://cdn.jsdelivr.net/npm/@vapi-ai/web/dist/index.min.js";
const ASSISTANT_ID = "d5db0294-6ae8-45ae-b376-b024c6588945";

const VapiAssistant = () => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    // Load Vapi SDK once
    if (document.querySelector(`script[src="${VAPI_CDN}"]`)) return;
    const script = document.createElement("script");
    script.src = VAPI_CDN;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const toggle = async () => {
    if (active) {
      vapiRef.current?.stop?.();
      setActive(false);
      return;
    }

    setLoading(true);
    try {
      const Vapi = (window as any).Vapi;
      if (!Vapi) throw new Error("SDK not loaded");

      if (!vapiRef.current) {
        vapiRef.current = new Vapi(ASSISTANT_ID);
        vapiRef.current.on?.("call-end", () => setActive(false));
      }

      await vapiRef.current.start?.(ASSISTANT_ID);
      setActive(true);
    } catch (e) {
      console.error("Vapi error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm shadow-lg transition-all duration-300 ${
        active
          ? "bg-primary text-primary-foreground glow-orange"
          : "glass-card text-foreground hover:border-primary/50 hover:shadow-[0_0_20px_hsl(24_95%_53%_/_0.3)]"
      }`}
      disabled={loading}
    >
      {active ? <MicOff size={18} /> : <Mic size={18} />}
      <span>{loading ? "Connecting…" : active ? "End Call" : "Talk to AI"}</span>
      {active && (
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-ping" />
      )}
    </button>
  );
};

export default VapiAssistant;
