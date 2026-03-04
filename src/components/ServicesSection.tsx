import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  Film,
  Smartphone,
  Sparkles,
  Megaphone,
  User,
  TrendingUp,
  ArrowUpRight,
  X,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: Film,
    title: "YouTube Long-Form Editing",
    desc: "Engaging edits that maximize watch time and audience retention.",
    num: "01",
    details: {
      summary:
        "I craft compelling YouTube videos that keep viewers glued from intro to outro. Every cut, transition, and effect is designed to boost watch time and grow your channel.",
      features: [
        "Cinematic intros & outros",
        "Pattern-interrupt cuts to maintain attention",
        "Custom lower thirds & text animations",
        "Color grading & audio mixing",
        "Thumbnail-worthy frame selection",
        "SEO-optimized chapter markers",
      ],
      turnaround: "3–5 business days",
    },
  },
  {
    icon: Smartphone,
    title: "Reels / Shorts Editing",
    desc: "Scroll-stopping short-form content optimized for virality.",
    num: "02",
    details: {
      summary:
        "I create punchy, fast-paced short-form content that stops the scroll and drives massive engagement across Instagram Reels, YouTube Shorts, and TikTok.",
      features: [
        "Trending audio & effect integration",
        "Quick-cut storytelling hooks",
        "Auto-captions with branded styling",
        "Aspect-ratio optimization (9:16)",
        "Platform-specific formatting",
        "Batch delivery for content calendars",
      ],
      turnaround: "1–2 business days",
    },
  },
  {
    icon: Sparkles,
    title: "Motion Graphics & Transitions",
    desc: "Dynamic animations that elevate your brand's visual identity.",
    num: "03",
    details: {
      summary:
        "From logo reveals to complex infographic animations, I bring your brand to life with smooth, professional motion graphics that set you apart.",
      features: [
        "Logo animations & brand stingers",
        "Kinetic typography",
        "Infographic & data visualization",
        "Custom transition packs",
        "2D character animation",
        "Particle & light effects",
      ],
      turnaround: "4–7 business days",
    },
  },
  {
    icon: Megaphone,
    title: "Ad Creatives",
    desc: "High-converting social media ads designed to drive action.",
    num: "04",
    details: {
      summary:
        "I design scroll-stopping ad creatives that convert viewers into customers. Every frame is strategically crafted to drive clicks, sign-ups, and sales.",
      features: [
        "Hook-driven opening frames",
        "A/B test variations included",
        "CTA overlays & end cards",
        "Platform ad-spec compliance",
        "UGC-style editing",
        "Performance-focused iteration",
      ],
      turnaround: "2–4 business days",
    },
  },
  {
    icon: User,
    title: "Personal Brand Content",
    desc: "Consistent, polished content that builds authority and trust.",
    num: "05",
    details: {
      summary:
        "I help thought leaders, coaches, and creators build a magnetic personal brand through consistently high-quality video content that resonates.",
      features: [
        "Talking-head polish & cleanup",
        "Branded templates & overlays",
        "Multi-platform repurposing",
        "Podcast video editing",
        "Behind-the-scenes content",
        "Monthly content packages",
      ],
      turnaround: "2–3 business days",
    },
  },
  {
    icon: TrendingUp,
    title: "Growth-Focused Editing",
    desc: "Data-driven editing strategies for sustainable channel growth.",
    num: "06",
    details: {
      summary:
        "I combine creative editing with analytics insights to craft videos optimized for the algorithm. Every decision—from pacing to thumbnails—is backed by data.",
      features: [
        "Retention graph analysis",
        "CTR-optimized thumbnails",
        "Strategic pacing & hooks",
        "Competitor content analysis",
        "A/B intro testing",
        "Monthly growth reports",
      ],
      turnaround: "3–5 business days",
    },
  },
];

type Service = (typeof services)[number];

const ServiceModal = ({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-lg glass-card rounded-2xl border border-border overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors z-10"
        >
          <X size={16} />
        </button>

        <div className="p-7">
          {/* Icon + number */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Icon size={26} className="text-primary" />
            </div>
            <div>
              <span className="text-xs font-semibold text-primary tracking-widest">
                SERVICE {service.num}
              </span>
              <h3 className="font-heading font-bold text-xl text-foreground">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Summary */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {service.details.summary}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">
              What's Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.details.features.map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2
                    size={14}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Turnaround:{" "}
              <span className="text-foreground font-medium">
                {service.details.turnaround}
              </span>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:brightness-110 transition-all"
            >
              Get Started <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <>
      <section
        id="services"
        className="section-padding relative overflow-hidden"
        ref={ref}
      >
        {/* Background */}
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[180px]" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              What I Do
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              My <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Premium video editing services tailored for brands that want to
              stand out and grow.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative glass-card rounded-2xl p-7 border border-border hover:border-primary/40 transition-all duration-500 cursor-pointer overflow-hidden"
                onClick={() => setSelected(s)}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Number + Icon row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <s.icon size={22} className="text-primary" />
                    </div>
                    <span className="text-3xl font-heading font-bold text-border group-hover:text-primary/20 transition-colors">
                      {s.num}
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {s.desc}
                  </p>
                  <div className="flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    View details <ArrowUpRight size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ServiceModal
            service={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ServicesSection;
