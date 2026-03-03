import { ArrowUp, Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent" />

    <div className="container mx-auto px-4 py-12 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <a href="#home" className="font-heading text-xl font-bold">
            <span className="gradient-text">P</span>iyush{" "}
            <span className="text-muted-foreground">Raj</span>
          </a>
          <p className="text-muted-foreground text-sm mt-1">
            Creative Video Editor & AI-Based Tech Developer
          </p>
        </div>

        <div className="flex items-center gap-6">
          {["Home", "About", "Services", "Portfolio", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <ArrowUp size={16} />
        </button>
      </div>

      <div className="h-px bg-border mb-6" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© 2024 Piyush Raj. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart size={12} className="text-primary" /> and creativity
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
