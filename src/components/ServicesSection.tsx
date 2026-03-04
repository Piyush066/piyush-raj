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
  ListChecks,
  Target,
  BarChart3,
  Users,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      process: [
        "Receive raw footage & creative brief",
        "Structure narrative arc & pacing",
        "First cut with rough edits",
        "Add graphics, music & sound design",
        "Two rounds of revisions",
        "Final export in platform-optimized formats",
      ],
      audience: [
        "YouTubers scaling past 10K subscribers",
        "Educators & course creators",
        "Tech reviewers & product channels",
        "Vlog & lifestyle creators",
      ],
      results: [
        "Up to 45% increase in average watch time",
        "Higher audience retention rates",
        "More consistent upload schedule",
        "Professional-grade channel identity",
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
      process: [
        "Content strategy alignment call",
        "Select trending hooks & formats",
        "Edit with fast-paced cuts & captions",
        "Add branded overlays & CTAs",
        "One revision round",
        "Deliver batch-ready files",
      ],
      audience: [
        "Influencers & content creators",
        "Brands launching social campaigns",
        "Coaches & personal brands",
        "E-commerce & DTC brands",
      ],
      results: [
        "3–5x increase in reel engagement",
        "Higher follower growth rate",
        "Consistent content pipeline",
        "Algorithm-friendly formatting",
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
      process: [
        "Brand asset & style guide review",
        "Storyboard & concept sketches",
        "Initial animation drafts",
        "Refine timing & easing curves",
        "Sound design integration",
        "Export in multiple formats & sizes",
      ],
      audience: [
        "Agencies needing branded assets",
        "SaaS & tech companies",
        "Creators wanting unique intros",
        "Event & conference organizers",
      ],
      results: [
        "Elevated brand perception",
        "Reusable animation asset library",
        "Stand-out visual identity",
        "Higher production value across content",
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
      process: [
        "Review product/service & target audience",
        "Script hook variations",
        "Edit 2–3 creative variations",
        "Add CTA overlays & captions",
        "Platform-spec quality check",
        "Deliver with A/B test notes",
      ],
      audience: [
        "DTC & e-commerce brands",
        "SaaS companies running paid ads",
        "Marketing agencies",
        "App & product launches",
      ],
      results: [
        "Lower cost per acquisition",
        "Higher click-through rates",
        "Faster creative testing cycles",
        "Scalable ad production pipeline",
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
      process: [
        "Brand voice & aesthetic discovery",
        "Create reusable templates",
        "Edit weekly content batches",
        "Repurpose long-form into shorts",
        "Maintain brand consistency",
        "Monthly performance review",
      ],
      audience: [
        "Coaches & consultants",
        "Thought leaders & speakers",
        "Entrepreneurs building in public",
        "Podcast hosts & authors",
      ],
      results: [
        "Consistent brand presence across platforms",
        "More time to focus on business",
        "Growing authority & trust",
        "Scalable content system",
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
      process: [
        "Audit current channel analytics",
        "Identify drop-off patterns",
        "Restructure video pacing",
        "Test hook & intro variations",
        "Implement data-backed changes",
        "Deliver monthly growth report",
      ],
      audience: [
        "Channels plateauing in growth",
        "Creators monetizing through YouTube",
        "Brands with educational content",
        "Anyone serious about YouTube growth",
      ],
      results: [
        "Sustainable subscriber growth",
        "Improved video performance metrics",
        "Clear content strategy roadmap",
        "Higher RPM & ad revenue",
      ],
      turnaround: "3–5 business days",
    },
  },
];

type Service = (typeof services)[number];

const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl bg-secondary/50 border border-border p-5">
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-primary" />
      </div>
      <h4 className="text-sm font-heading font-bold text-primary uppercase tracking-widest">
        {title}
      </h4>
    </div>
    {children}
  </div>
);

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
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      <motion.div
        className="relative z-10 w-full max-w-2xl glass-card rounded-2xl border border-border overflow-hidden max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors z-20"
        >
          <X size={16} />
        </button>

        <ScrollArea className="flex-1 max-h-[90vh]">
          <div className="p-7 space-y-5">
            {/* 1. Title */}
            <div className="flex items-center gap-4 pr-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon size={26} className="text-primary" />
              </div>
              <div>
                <span className="text-xs font-semibold text-primary tracking-widest">
                  SERVICE {service.num}
                </span>
                <h3 className="font-heading font-bold text-2xl text-foreground">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* 2. Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.details.summary}
            </p>

            {/* 3. What You Get */}
            <SectionCard icon={CheckCircle2} title="What You Get">
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
            </SectionCard>

            {/* 4. My Process */}
            <SectionCard icon={ListChecks} title="My Process">
              <ol className="space-y-2">
                {service.details.process.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </SectionCard>

            {/* 5. Who This Is For */}
            <SectionCard icon={Users} title="Who This Is For">
              <div className="flex flex-wrap gap-2">
                {service.details.audience.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs text-muted-foreground"
                  >
                    <Target size={10} className="text-primary" />
                    {a}
                  </span>
                ))}
              </div>
            </SectionCard>

            {/* 6. Expected Results */}
            <SectionCard icon={BarChart3} title="Expected Results">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.details.results.map((r) => (
                  <div
                    key={r}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <TrendingUp
                      size={14}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    {r}
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Footer: Turnaround + CTA */}
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
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
              >
                Get Started <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </ScrollArea>
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
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
