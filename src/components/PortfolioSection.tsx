import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, X, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories = ["All", "Brand Videos", "Reels & Shorts", "YouTube Videos", "Ads & UGC"];

const categoryShowcase: Record<string, { label: string; title: string }> = {
  "Brand Videos": { label: "BRAND VIDEOS", title: "Brand Video Showcase" },
  "Reels & Shorts": { label: "REELS & SHORTS", title: "Viral Reels Showcase" },
  "YouTube Videos": { label: "YOUTUBE VIDEOS", title: "YouTube Showcase" },
  "Ads & UGC": { label: "ADS & UGC", title: "Ad Campaign Showcase" },
};

interface Project {
  title: string;
  category: string;
  color: string;
  youtubeUrl: string;
}

function getYouTubeId(url: string): string {
  const shorts = url.match(/youtube\.com\/shorts\/([^?&]+)/);
  if (shorts) return shorts[1];
  const standard = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^?&]+)/);
  if (standard) return standard[1];
  return "";
}

const projects: Project[] = [
  // Brand Videos
  { title: "Video 1", category: "Brand Videos", color: "from-primary/30 via-primary/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/d9hrI5rOUVE" },
  { title: "Video 2", category: "Brand Videos", color: "from-orange-600/30 via-primary/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/jHg8fxezC3E" },
  { title: "Video 3", category: "Brand Videos", color: "from-primary/20 via-amber-500/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/m2OF0D87cBU" },
  { title: "Video 4", category: "Brand Videos", color: "from-amber-600/20 via-primary/10 to-transparent", youtubeUrl: "https://youtu.be/IEakhv6jdEs" },
  // Reels & Shorts
  { title: "Video 1", category: "Reels & Shorts", color: "from-orange-500/30 via-amber-500/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/xtnNK8Ox2fM" },
  { title: "Video 2", category: "Reels & Shorts", color: "from-amber-500/30 via-orange-600/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/aQxx3jlPHto" },
  { title: "Video 3", category: "Reels & Shorts", color: "from-primary/25 via-orange-500/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/37cL45hQHbM" },
  { title: "Video 4", category: "Reels & Shorts", color: "from-orange-600/25 via-amber-500/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/Ici8pbEnvhU" },
  // YouTube Videos
  { title: "Video 1", category: "YouTube Videos", color: "from-primary/30 via-amber-600/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/_SaHb7iHVoE" },
  { title: "Video 2", category: "YouTube Videos", color: "from-orange-500/25 via-primary/10 to-transparent", youtubeUrl: "https://youtu.be/sr2hvFhqQ_A" },
  { title: "Video 3", category: "YouTube Videos", color: "from-amber-500/25 via-orange-600/10 to-transparent", youtubeUrl: "https://youtu.be/8hMJzR30boI" },
  { title: "Video 4", category: "YouTube Videos", color: "from-primary/20 via-amber-500/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/DnyjAxkW6IE" },
  // Ads & UGC
  { title: "Video 1", category: "Ads & UGC", color: "from-amber-500/30 via-orange-500/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/jHg8fxezC3E" },
  { title: "Video 2", category: "Ads & UGC", color: "from-primary/25 via-amber-500/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/d9hrI5rOUVE" },
  { title: "Video 3", category: "Ads & UGC", color: "from-orange-500/25 via-primary/10 to-transparent", youtubeUrl: "https://youtube.com/shorts/e7iPozI-Iwc" },
  { title: "Video 4", category: "Ads & UGC", color: "from-amber-600/25 via-orange-500/10 to-transparent", youtubeUrl: "https://youtu.be/g6ugTXVvdpI" },
];

const gridProjects = [projects[0], projects[4], projects[8], projects[12]];

/* ─── YouTube Video Card ─── */
const VideoCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const videoId = getYouTubeId(project.youtubeUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl overflow-hidden border border-border bg-secondary/40 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.12)] cursor-pointer transition-all duration-400"
      onClick={onClick}
    >
      <div className="aspect-video relative overflow-hidden bg-background">
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-11 h-11 rounded-full bg-background/90 border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
            <Play size={16} className="text-primary group-hover:text-primary-foreground ml-0.5 transition-colors" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h4>
      </div>
    </motion.div>
  );
};

/* ─── YouTube Player Modal ─── */
const VideoPlayerModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const videoId = getYouTubeId(project.youtubeUrl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-background/90 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-foreground">{project.title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden border border-border bg-background">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Category Modal ─── */
const CategoryModal = ({
  category,
  onClose,
}: {
  category: string;
  onClose: () => void;
}) => {
  const [playerProject, setPlayerProject] = useState<Project | null>(null);
  const showcase = categoryShowcase[category];
  const categoryProjects = projects.filter((p) => p.category === category).slice(0, 4);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="glass-card rounded-2xl max-w-3xl w-full border border-border max-h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start p-6 pb-4 border-b border-border shrink-0">
            <div>
              <span className="text-xs font-heading font-bold text-primary uppercase tracking-widest">
                {showcase?.label}
              </span>
              <h3 className="font-heading text-2xl font-bold text-foreground mt-1">
                {showcase?.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable grid */}
          <div className="flex-1 overflow-y-auto overscroll-contain modal-scroll">
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryProjects.map((p) => (
                <VideoCard
                  key={`${p.category}-${p.title}`}
                  project={p}
                  onClick={() => setPlayerProject(p)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {playerProject && (
          <VideoPlayerModal project={playerProject} onClose={() => setPlayerProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Main Section ─── */
const PortfolioSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const category = (e as CustomEvent).detail?.category;
      if (category && categories.includes(category)) {
        setFilter(category);
      }
    };
    window.addEventListener("navigate-portfolio", handler);
    return () => window.removeEventListener("navigate-portfolio", handler);
  }, []);

  const filtered = filter === "All" ? gridProjects : gridProjects.filter((p) => p.category === filter);

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
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)_/_0.3)]"
                  : "bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const videoId = getYouTubeId(p.youtubeUrl);
              return (
                <motion.div
                  key={`${p.category}-${p.title}`}
                  id={`project-${p.category.toLowerCase().replace(/\s+/g, "-")}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setSelectedCategory(p.category)}
                  className="group glass-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 cursor-pointer transition-all duration-500"
                >
                  <div className="aspect-video relative overflow-hidden bg-background">
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt={p.category}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-background/90 border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                        <Play size={20} className="text-primary group-hover:text-primary-foreground ml-0.5 transition-colors" />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 text-[10px] px-3 py-1 rounded-lg bg-background/80 backdrop-blur-sm text-foreground font-medium border border-border/50">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {p.category}
                    </h3>
                    <div className="flex items-center justify-end">
                      <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {selectedCategory && createPortal(
          <AnimatePresence>
            <CategoryModal
              category={selectedCategory}
              onClose={() => setSelectedCategory(null)}
            />
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
