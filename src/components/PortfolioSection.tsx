import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X, TrendingUp, Eye, BarChart3 } from "lucide-react";

const categories = ["All", "YouTube Edits", "Reels & Shorts", "Ad Creatives", "Motion Graphics"];

const projects = [
  {
    title: "Brand Story Documentary",
    category: "YouTube Edits",
    stat: "+45% retention rate",
    statIcon: TrendingUp,
    color: "from-primary/40 to-primary/10",
  },
  {
    title: "Viral Product Launch Reel",
    category: "Reels & Shorts",
    stat: "2.5M+ views",
    statIcon: Eye,
    color: "from-orange-500/40 to-amber-500/10",
  },
  {
    title: "E-commerce Ad Campaign",
    category: "Ad Creatives",
    stat: "3.2x ROAS",
    statIcon: BarChart3,
    color: "from-amber-500/40 to-orange-500/10",
  },
  {
    title: "Animated Logo Reveal",
    category: "Motion Graphics",
    stat: "Premium quality",
    statIcon: TrendingUp,
    color: "from-primary/40 to-amber-600/10",
  },
  {
    title: "Podcast Highlight Clips",
    category: "YouTube Edits",
    stat: "+120% engagement",
    statIcon: BarChart3,
    color: "from-orange-600/40 to-primary/10",
  },
  {
    title: "Instagram Growth Series",
    category: "Reels & Shorts",
    stat: "500K+ reach",
    statIcon: Eye,
    color: "from-amber-500/40 to-orange-600/10",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
            My Work
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Selected <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => setSelected(p)}
              className="glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer group"
            >
              <div
                className={`aspect-video bg-gradient-to-br ${p.color} flex items-center justify-center relative`}
              >
                <div className="w-14 h-14 rounded-full bg-background/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={24} className="text-primary ml-1" />
                </div>
                <span className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-background/70 text-foreground font-medium">
                  {p.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {p.title}
                </h3>
                <div className="flex items-center gap-1.5 text-primary text-sm">
                  <p.statIcon size={14} /> {p.stat}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card rounded-2xl p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {selected.title}
                </h3>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>
              <div className={`aspect-video rounded-xl bg-gradient-to-br ${selected.color} flex items-center justify-center mb-6`}>
                <Play size={48} className="text-primary" />
              </div>
              <div className="flex items-center gap-2 text-primary font-medium mb-3">
                <selected.statIcon size={16} /> {selected.stat}
              </div>
              <p className="text-muted-foreground text-sm">
                Category: {selected.category}
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
