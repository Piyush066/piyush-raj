import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, X, ExternalLink } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import type { Tables } from "@/integrations/supabase/types";

type Section = Tables<"portfolio_sections">;
type Video = Tables<"portfolio_videos">;

interface Project {
  title: string;
  category: string;
  sectionId: string;
  youtubeUrl: string;
  thumbnailUrl?: string | null;
}

function getYouTubeId(url: string): string {
  if (!url) return "";
  const shorts = url.match(/youtube\.com\/shorts\/([^?&]+)/);
  if (shorts) return shorts[1];
  const standard = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^?&]+)/);
  if (standard) return standard[1];
  return "";
}

function getThumbnail(project: Project): string {
  if (project.thumbnailUrl) return project.thumbnailUrl;
  const id = getYouTubeId(project.youtubeUrl);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

/* ─── Video Card ─── */
const VideoCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="group rounded-xl overflow-hidden border border-border bg-secondary/40 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.12)] cursor-pointer transition-all duration-400"
    onClick={onClick}
  >
    <div className="aspect-video relative overflow-hidden bg-background">
      <img src={getThumbnail(project)} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-11 h-11 rounded-full bg-background/90 border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
          <Play size={16} className="text-primary group-hover:text-primary-foreground ml-0.5 transition-colors" />
        </div>
      </div>
    </div>
    <div className="p-4">
      <h4 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{project.title}</h4>
    </div>
  </motion.div>
);

/* ─── Player Modal ─── */
const VideoPlayerModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const videoId = getYouTubeId(project.youtubeUrl);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-background/90 backdrop-blur-lg flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.25 }} className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-foreground">{project.title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><X size={16} /></button>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden border border-border bg-background">
          <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title={project.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Category Modal ─── */
const CategoryModal = ({ sectionName, projects, onClose }: { sectionName: string; projects: Project[]; onClose: () => void }) => {
  const [playerProject, setPlayerProject] = useState<Project | null>(null);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ duration: 0.25 }} className="glass-card rounded-2xl max-w-3xl w-full border border-border max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-start p-6 pb-4 border-b border-border shrink-0">
            <div>
              <span className="text-xs font-heading font-bold text-primary uppercase tracking-widest">{sectionName.toUpperCase()}</span>
              <h3 className="font-heading text-2xl font-bold text-foreground mt-1">{sectionName} Showcase</h3>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><X size={16} /></button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain modal-scroll">
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p, i) => (
                <VideoCard key={`${p.sectionId}-${p.title}-${i}`} project={p} onClick={() => setPlayerProject(p)} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {playerProject && <VideoPlayerModal project={playerProject} onClose={() => setPlayerProject(null)} />}
      </AnimatePresence>
    </>
  );
};

/* ─── Main Section ─── */
const PortfolioSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");
  const [selectedSection, setSelectedSection] = useState<{ id: string; name: string } | null>(null);

  const { data: dbSections } = useRealtimeTable<Section>("portfolio_sections", "display_order", true);
  const { data: dbVideos } = useRealtimeTable<Video>("portfolio_videos", "display_order", true);

  const sectionMap = new Map(dbSections.map((s) => [s.id, s.name]));

  const allProjects: Project[] = dbVideos.map((v) => ({
    title: v.title,
    category: sectionMap.get(v.section_id || "") || v.category,
    sectionId: v.section_id || "",
    youtubeUrl: v.youtube_url || v.drive_url || "",
    thumbnailUrl: v.thumbnail_url,
  }));

  // Grid: one card per section (first video as thumbnail)
  const gridCards = dbSections
    .filter((s) => allProjects.some((p) => p.sectionId === s.id))
    .map((s) => {
      const first = allProjects.find((p) => p.sectionId === s.id)!;
      return { ...first, category: s.name, sectionId: s.id };
    });

  const filteredGrid = filter === "All" ? gridCards : gridCards.filter((p) => p.sectionId === filter);

  const filterOptions = [{ id: "All", name: "All" }, ...dbSections];

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase mb-4">My Work</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Selected <span className="gradient-text">Work</span></h2>
          <p className="text-muted-foreground max-w-md mx-auto">A curated collection of projects showcasing cinematic editing and impactful results.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button key={opt.id} onClick={() => setFilter(opt.id)} className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${filter === opt.id ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)_/_0.3)]" : "bg-secondary/80 text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border"}`}>{opt.name}</button>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGrid.map((p, i) => (
              <motion.div
                key={p.sectionId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedSection({ id: p.sectionId, name: p.category })}
                className="group glass-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 cursor-pointer transition-all duration-500"
              >
                <div className="aspect-video relative overflow-hidden bg-background">
                  <img src={getThumbnail(p)} alt={p.category} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-background/90 border border-border flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <Play size={20} className="text-primary group-hover:text-primary-foreground ml-0.5 transition-colors" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] px-3 py-1 rounded-lg bg-background/80 backdrop-blur-sm text-foreground font-medium border border-border/50">{p.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">{p.category}</h3>
                  <div className="flex items-center justify-end">
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGrid.length === 0 && dbVideos.length === 0 && (
          <p className="text-center py-12 text-muted-foreground">No portfolio items yet.</p>
        )}

        {selectedSection && createPortal(
          <AnimatePresence>
            <CategoryModal
              sectionName={selectedSection.name}
              projects={allProjects.filter((p) => p.sectionId === selectedSection.id)}
              onClose={() => setSelectedSection(null)}
            />
          </AnimatePresence>,
          document.body
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
