import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X, TrendingUp, Eye, BarChart3, ExternalLink } from "lucide-react";

const categories = ["All", "YouTube Edits", "Reels & Shorts", "Ad Creatives", "Motion Graphics"];

const projects = [
  {
    title: "Brand Story Documentary",
    category: "YouTube Edits",
    stat: "+45% retention rate",
    statIcon: TrendingUp,
    desc: "Cinematic storytelling that captivated audiences and boosted subscriber growth by 32%.",
    color: "from-primary/30 via-primary/10 to-transparent",
  },
  {
    title: "Viral Product Launch Reel",
    category: "Reels & Shorts",
    stat: "2.5M+ views",
    statIcon: Eye,
    desc: "Trend-driven editing with dynamic pacing that drove massive organic reach.",
    color: "from-orange-500/30 via-amber-500/10 to-transparent",
  },
  {
    title: "E-commerce Ad Campaign",
    category: "Ad Creatives",
    stat: "3.2x ROAS",
    statIcon: BarChart3,
    desc: "Performance-focused creative that converted browsers into buyers.",
    color: "from-amber-500/30 via-orange-500/10 to-transparent",
  },
  {
    title: "Animated Logo Reveal",
    category: "Motion Graphics",
    stat: "Premium quality",
    statIcon: TrendingUp,
    desc: "Sleek motion design delivering a memorable first impression for a tech startup.",
    color: "from-primary/30 via-amber-600/10 to-transparent",
  },
  {
    title: "Podcast Highlight Clips",
    category: "YouTube Edits",
    stat: "+120% engagement",
    statIcon: BarChart3,
    desc: "Bite-sized highlights that expanded audience reach across multiple platforms.",
    color: "from-orange-600/30 via-primary/10 to-transparent",
  },
  {
    title: "Instagram Growth Series",
    category: "Reels & Shorts",
    stat: "500K+ reach",
    statIcon: Eye,
    desc: "Consistently viral content series that tripled follower growth rate.",
    color: "from-amber-500/30 via-orange-600/10 to-transparent",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            My Work
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A curated collection of projects showcasing cinematic editing and impactful results.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === c
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(24_95%_53%_/_0.3)]"
                  : "bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelected(p)}
                className="group glass-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 cursor-pointer transition-all duration-500"
              >
                <div
                  className={`aspect-video bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}
                >
                  {/* Animated play button */}
                  <div className="w-14 h-14 rounded-full bg-background/90 border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <Play size={20} className="text-primary group-hover:text-primary-foreground ml-0.5 transition-colors" />
                  </div>

                  {/* Category badge */}
                  <span className="absolute top-3 left-3 text-[10px] px-3 py-1 rounded-lg bg-background/80 backdrop-blur-sm text-foreground font-medium border border-border/50">
                    {p.category}
                  </span>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
                      <p.statIcon size={14} /> {p.stat}
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="glass-card rounded-2xl p-8 max-w-lg w-full border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{selected.category}</span>
                    <h3 className="font-heading text-2xl font-bold text-foreground mt-1">
                      {selected.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div
                  className={`aspect-video rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center mb-6 border border-border`}
                >
                  <div className="w-16 h-16 rounded-full bg-background/90 border border-primary/30 flex items-center justify-center">
                    <Play size={28} className="text-primary ml-1" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{selected.desc}</p>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium text-sm w-fit">
                  <selected.statIcon size={16} /> {selected.stat}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioSection;
