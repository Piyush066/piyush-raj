import { useState, useEffect, useRef } from "react";
import { Menu, X, Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VAPI_CDN = "https://cdn.jsdelivr.net/npm/@vapi-ai/web/dist/index.min.js";
const VAPI_PUBLIC_KEY = "0d456a9a-6dc8-4a8f-9abc-d281b1374496";
const ASSISTANT_ID = "d5db0294-6ae8-45ae-b376-b024c6588945";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#tech", label: "Tech" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [vapiActive, setVapiActive] = useState(false);
  const [vapiLoading, setVapiLoading] = useState(false);
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Update active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Load Vapi SDK once
  useEffect(() => {
    if (document.querySelector(`script[src="${VAPI_CDN}"]`)) return;
    const script = document.createElement("script");
    script.src = VAPI_CDN;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const toggleVapi = async () => {
    if (vapiActive) {
      vapiRef.current?.stop?.();
      setVapiActive(false);
      return;
    }

    setVapiLoading(true);
    try {
      const VapiSDK = (window as any).Vapi;
      if (!VapiSDK) throw new Error("SDK not loaded");

      if (!vapiRef.current) {
        vapiRef.current = new VapiSDK(VAPI_PUBLIC_KEY);
        vapiRef.current.on?.("call-end", () => setVapiActive(false));
      }

      await vapiRef.current.start(ASSISTANT_ID);
      setVapiActive(true);
    } catch (e) {
      console.error("Vapi error:", e);
    } finally {
      setVapiLoading(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#home" className="font-heading text-xl font-bold group">
          <span className="gradient-text">P</span>
          <span className="text-foreground group-hover:text-primary transition-colors">iyush</span>
          <span className="text-muted-foreground ml-1">Raj</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm px-4 py-2 rounded-lg transition-all duration-200 ${
                active === l.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
              {active === l.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          <button
            onClick={toggleVapi}
            disabled={vapiLoading}
            className={`relative ml-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              vapiActive
                ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(24_95%_53%_/_0.4)]"
                : "border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {vapiActive ? <MicOff size={16} /> : <Mic size={16} />}
            <span>{vapiLoading ? "Connecting…" : vapiActive ? "End Call" : "Talk to Assistant"}</span>
            {vapiActive && (
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary animate-ping" />
            )}
          </button>
          <a
            href="#contact"
            className="ml-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-[0_0_20px_hsl(24_95%_53%_/_0.4)] transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground p-2 rounded-lg hover:bg-secondary transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-card mt-2 mx-4 rounded-2xl p-5 flex flex-col gap-1 border border-border"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${
                  active === l.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                toggleVapi();
              }}
              disabled={vapiLoading}
              className={`mt-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2 transition-all ${
                vapiActive
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {vapiActive ? <MicOff size={16} /> : <Mic size={16} />}
              <span>{vapiLoading ? "Connecting…" : vapiActive ? "End Call" : "Talk to Assistant"}</span>
            </button>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold text-center"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
