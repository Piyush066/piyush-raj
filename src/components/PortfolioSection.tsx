import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X, TrendingUp, Eye, BarChart3, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories = ["All", "YouTube Edits", "Reels & Shorts", "Ad Creatives", "Motion Graphics"];

const categoryShowcase: Record<string, { label: string; title: string }> = {
  "YouTube Edits": { label: "YOUTUBE EDITS", title: "Long-Form Showcase" },
  "Reels & Shorts": { label: "REELS & SHORTS", title: "Viral Reels Showcase" },
  "Ad Creatives": { label: "AD CREATIVES", title: "Ad Campaign Showcase" },
  "Motion Graphics": { label: "MOTION GRAPHICS", title: "Motion Design Showcase" },
};

interface Project {
  title: string;
  category: string;
  stat: string;
  statIcon: React.ElementType;
  desc: string;
  color: string;
  videoUrl?: string;
}

const projects: Project[] = [
  {
    title: "Brand Story Documentary",
    category: "YouTube Edits",
    stat: "+45% retention rate",
    statIcon: TrendingUp,
    desc: "Cinematic storytelling that captivated audiences and boosted subscriber growth by 32%.",
    color: "from-primary/30 via-primary/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Podcast Highlight Clips",
    category: "YouTube Edits",
    stat: "+120% engagement",
    statIcon: BarChart3,
    desc: "Bite-sized highlights that expanded audience reach across multiple platforms.",
    color: "from-orange-600/30 via-primary/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Creator Vlog Series",
    category: "YouTube Edits",
    stat: "1.2M+ views",
    statIcon: Eye,
    desc: "Dynamic vlog editing with jump cuts and b-roll that kept viewers watching till the end.",
    color: "from-primary/20 via-amber-500/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Tutorial Masterclass Edit",
    category: "YouTube Edits",
    stat: "+68% watch time",
    statIcon: TrendingUp,
    desc: "Educational content with clean graphics and pacing that maximized viewer retention.",
    color: "from-amber-600/20 via-primary/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Viral Product Launch Reel",
    category: "Reels & Shorts",
    stat: "2.5M+ views",
    statIcon: Eye,
    desc: "Trend-driven editing with dynamic pacing that drove massive organic reach.",
    color: "from-orange-500/30 via-amber-500/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Instagram Growth Series",
    category: "Reels & Shorts",
    stat: "500K+ reach",
    statIcon: Eye,
    desc: "Consistently viral content series that tripled follower growth rate.",
    color: "from-amber-500/30 via-orange-600/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Trending Audio Montage",
    category: "Reels & Shorts",
    stat: "1.8M+ plays",
    statIcon: Eye,
    desc: "Perfectly synced transitions to trending audio that exploded on Instagram and TikTok.",
    color: "from-primary/25 via-orange-500/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Before & After Reveal",
    category: "Reels & Shorts",
    stat: "850K+ views",
    statIcon: Eye,
    desc: "Dramatic reveal editing style that hooked viewers in the first second.",
    color: "from-orange-600/25 via-amber-500/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "E-commerce Ad Campaign",
    category: "Ad Creatives",
    stat: "3.2x ROAS",
    statIcon: BarChart3,
    desc: "Performance-focused creative that converted browsers into buyers.",
    color: "from-amber-500/30 via-orange-500/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "SaaS Product Demo Ad",
    category: "Ad Creatives",
    stat: "2.1x CTR",
    statIcon: BarChart3,
    desc: "Clean, benefit-driven ad creative that outperformed industry benchmarks.",
    color: "from-primary/25 via-amber-500/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Fashion Brand Spot",
    category: "Ad Creatives",
    stat: "4.5x ROAS",
    statIcon: TrendingUp,
    desc: "Cinematic ad spot with premium feel that elevated brand perception and drove sales.",
    color: "from-orange-500/25 via-primary/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "App Launch Promo",
    category: "Ad Creatives",
    stat: "50K+ installs",
    statIcon: TrendingUp,
    desc: "Snappy mobile-first ad with screen recordings and motion graphics that drove installs.",
    color: "from-amber-600/25 via-orange-500/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Animated Logo Reveal",
    category: "Motion Graphics",
    stat: "Premium quality",
    statIcon: TrendingUp,
    desc: "Sleek motion design delivering a memorable first impression for a tech startup.",
    color: "from-primary/30 via-amber-600/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Kinetic Typography Intro",
    category: "Motion Graphics",
    stat: "Award-winning",
    statIcon: TrendingUp,
    desc: "Bold animated text sequences that elevated channel intros to broadcast quality.",
    color: "from-orange-500/25 via-primary/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "Data Visualization Anim",
    category: "Motion Graphics",
    stat: "+90% clarity",
    statIcon: BarChart3,
    desc: "Complex data transformed into engaging animated infographics for investor presentations.",
    color: "from-amber-500/25 via-orange-600/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    title: "3D Product Explainer",
    category: "Motion Graphics",
    stat: "Studio quality",
    statIcon: TrendingUp,
    desc: "Detailed product breakdown with 3D-style motion and smooth transitions.",
    color: "from-primary/20 via-amber-500/10 to-transparent",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

// Get first 6 unique for grid display (one per original slot)
const gridProjects = [
  projects[0], projects[4], projects[8], projects[12], projects[1], projects[5],
];

/* ─── Video Card ─── */
const VideoCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl overflow-hidden border border-border bg-secondary/40 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(24_95%_53%_/_0.12)] cursor-pointer transition-all duration-400"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      onClick={onClick}
    >
      <div className={`aspect-video bg-gradient-to-br ${project.color} relative overflow-hidden`}>
        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-11 h-11 rounded-full bg-background/90 border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
            <Play size={16} className="text-primary group-hover:text-primary-foreground ml-0.5 transition-colors" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-heading font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h4>
        <p className="text-muted-foreground text-xs mb-2.5 line-clamp-2">{project.desc}</p>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
          <project.statIcon size={12} /> {project.stat}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Video Player Modal ─── */
const VideoPlayerModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-lg flex items-center justify-center p-4"
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
        <video
          src={project.videoUrl}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
          <project.statIcon size={12} /> {project.stat}
        </div>
        <p className="text-muted-foreground text-sm">{project.desc}</p>
      </div>
    </motion.div>
  </motion.div>
);

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="glass-card rounded-2xl max-w-3xl w-full border border-border max-h-[85vh] flex flex-col"
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
          <ScrollArea className="flex-1">
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryProjects.map((p, i) => (
                <VideoCard
                  key={p.title}
                  project={p}
                  onClick={() => setPlayerProject(p)}
                />
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>

      {/* Full video player */}
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
                id={`project-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedCategory(p.category)}
                className="group glass-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 cursor-pointer transition-all duration-500"
              >
                <div
                  className={`aspect-video bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="w-14 h-14 rounded-full bg-background/90 border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <Play size={20} className="text-primary group-hover:text-primary-foreground ml-0.5 transition-colors" />
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] px-3 py-1 rounded-lg bg-background/80 backdrop-blur-sm text-foreground font-medium border border-border/50">
                    {p.category}
                  </span>
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

        {/* Category Modal */}
        <AnimatePresence>
          {selectedCategory && (
            <CategoryModal
              category={selectedCategory}
              onClose={() => setSelectedCategory(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioSection;
