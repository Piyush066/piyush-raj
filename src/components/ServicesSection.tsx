import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import {
  Film,
  Smartphone,
  Youtube,
  Megaphone,
  ArrowUpRight,
  X,
  CheckCircle2,
  ListChecks,
  Target,
  BarChart3,
  Users,
  TrendingUp,
  PlayCircle,
  Loader2,
} from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import type { Tables } from "@/integrations/supabase/types";

const iconMap: Record<string, React.ElementType> = {
  Film, Smartphone, Youtube, Megaphone,
};

// Fallback hardcoded services (used only if DB is empty)
const fallbackServices = [
  { icon_name: "Film", title: "Brand Videos", description: "Cinematic brand films that tell your story and captivate audiences.", num: "01", summary: "I craft compelling brand videos.", features: ["Cinematic intros & outros", "Narrative-driven storytelling", "Custom graphics", "Color grading & audio mixing"], process_steps: ["Receive raw footage", "Structure narrative", "First cut", "Add graphics & sound", "Revisions", "Final export"], audience: ["Brands", "Startups", "Corporate teams"], results: ["Elevated perception", "Stronger connection", "Professional content"], turnaround: "3–5 days", example_title: "Brand Story Documentary" },
  { icon_name: "Smartphone", title: "Reels & Shorts", description: "Scroll-stopping short-form content optimized for virality.", num: "02", summary: "Punchy short-form content.", features: ["Trending audio", "Quick-cut hooks", "Auto-captions", "Platform optimization"], process_steps: ["Strategy call", "Select hooks", "Edit", "Branded overlays", "Revision", "Deliver"], audience: ["Influencers", "Brands", "Coaches", "E-commerce"], results: ["Higher engagement", "Faster growth", "Consistent pipeline"], turnaround: "1–2 days", example_title: "Viral Product Launch Reel" },
  { icon_name: "Youtube", title: "YouTube Videos", description: "Engaging edits that maximize watch time and audience retention.", num: "03", summary: "Keep viewers glued.", features: ["Cinematic intros", "Pattern-interrupt cuts", "Custom lower thirds", "Color grading"], process_steps: ["Receive footage", "Structure arc", "First cut", "Add graphics", "Revisions", "Final export"], audience: ["YouTubers", "Educators", "Tech reviewers", "Vloggers"], results: ["Higher watch time", "Better retention", "Consistent uploads"], turnaround: "3–5 days", example_title: "Brand Story Documentary" },
  { icon_name: "Megaphone", title: "Ads & UGC", description: "High-converting ad creatives and UGC-style content that drives action.", num: "04", summary: "Scroll-stopping ad creatives.", features: ["Hook-driven frames", "A/B variations", "CTA overlays", "UGC-style editing"], process_steps: ["Review audience", "Script hooks", "Edit variations", "Add CTAs", "Quality check", "Deliver"], audience: ["DTC brands", "SaaS companies", "Agencies", "Product launches"], results: ["Lower CPA", "Higher CTR", "Faster testing", "Scalable pipeline"], turnaround: "2–4 days", example_title: "E-commerce Ad Campaign" },
];

type ServiceRow = Tables<"services">;

interface ServiceData {
  icon: React.ElementType;
  title: string;
  desc: string;
  num: string;
  details: {
    summary: string;
    features: string[];
    process: string[];
    audience: string[];
    results: string[];
    turnaround: string;
    exampleProject: { title: string; id: string };
  };
}

function mapService(s: ServiceRow | typeof fallbackServices[number]): ServiceData {
  return {
    icon: iconMap[s.icon_name] || Film,
    title: s.title,
    desc: s.description,
    num: s.num,
    details: {
      summary: s.summary || s.description,
      features: s.features || [],
      process: s.process_steps || [],
      audience: s.audience || [],
      results: ('results' in s ? s.results : []) || [],
      turnaround: s.turnaround || "3–5 days",
      exampleProject: {
        title: s.example_title || s.title,
        id: `project-${s.title.toLowerCase().replace(/\s+/g, "-")}`,
      },
    },
  };
}

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
  service: ServiceData;
  onClose: () => void;
}) => {
  const Icon = service.icon;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

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
        className="relative z-10 w-full max-w-2xl glass-card rounded-2xl border border-border overflow-hidden"
        style={{ maxHeight: "90vh" }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-20" />
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors z-20">
          <X size={16} />
        </button>
        <div className="overflow-y-auto modal-scroll" style={{ maxHeight: "90vh" }}>
          <div className="p-7 space-y-5">
            <div className="flex items-center gap-4 pr-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon size={26} className="text-primary" />
              </div>
              <div>
                <span className="text-xs font-semibold text-primary tracking-widest">SERVICE {service.num}</span>
                <h3 className="font-heading font-bold text-2xl text-foreground">{service.title}</h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{service.details.summary}</p>

            <SectionCard icon={CheckCircle2} title="What You Get">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.details.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard icon={ListChecks} title="My Process">
              <ol className="space-y-2">
                {service.details.process.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </SectionCard>

            <SectionCard icon={Users} title="Who This Is For">
              <div className="flex flex-wrap gap-2">
                {service.details.audience.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
                    <Target size={10} className="text-primary" />{a}
                  </span>
                ))}
              </div>
            </SectionCard>

            <SectionCard icon={BarChart3} title="Expected Results">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.details.results.map((r) => (
                  <div key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <TrendingUp size={14} className="text-primary mt-0.5 shrink-0" />{r}
                  </div>
                ))}
              </div>
            </SectionCard>

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <PlayCircle size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-heading font-bold text-primary uppercase tracking-widest">See Real Example</p>
                  <p className="text-sm text-muted-foreground">{service.details.exampleProject.title}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent("navigate-portfolio", { detail: { category: service.title } }));
                    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 350);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary border border-border text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all shrink-0"
              >
                View Project <ArrowUpRight size={12} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Turnaround: <span className="text-foreground font-medium">{service.details.turnaround}</span>
              </div>
              <a href="#contact" onClick={onClose} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
                Get Started <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<ServiceData | null>(null);

  const { data: dbServices, loading } = useRealtimeTable<Tables<"services">>("services", "display_order", true);

  const servicesSource = dbServices.length > 0 ? dbServices : fallbackServices;
  const services: ServiceData[] = [...servicesSource]
    .sort((a, b) => Number(("display_order" in a ? a.display_order : undefined) ?? 999) - Number(("display_order" in b ? b.display_order : undefined) ?? 999))
    .map(mapService);

  console.log("Sorted services:", servicesSource.map((s) => Number(("display_order" in s ? s.display_order : undefined) ?? 999)).sort((a, b) => a - b));

  return (
    <>
      <section id="services" className="section-padding relative overflow-hidden" ref={ref}>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[180px]" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-4">What I Do</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">My <span className="gradient-text">Services</span></h2>
            <p className="text-muted-foreground max-w-md mx-auto">Premium video editing services tailored for brands that want to stand out and grow.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                    <span className="text-3xl font-heading font-bold text-border group-hover:text-primary/20 transition-colors">{s.num}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
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
        {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
};

export default ServicesSection;
