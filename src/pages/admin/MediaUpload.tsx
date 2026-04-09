import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit2, Trash2, ExternalLink, X, Loader2 } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Video = Tables<"portfolio_videos">;
type Section = Tables<"portfolio_sections">;

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/watch\?v=)([^?&]+)/);
  return m ? m[1] : null;
}

const MediaUpload = () => {
  const { data: videos, loading: loadingVideos, refetch: refetchVideos } = useRealtimeTable<Video>("portfolio_videos", "display_order", true);
  const { data: sections, loading: loadingSections } = useRealtimeTable<Section>("portfolio_sections", "display_order", true);
  const [editing, setEditing] = useState<Partial<Video> | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("All");

  const loading = loadingVideos || loadingSections;
  const sectionMap = new Map(sections.map((s) => [s.id, s.name]));
  const filtered = filter === "All" ? videos : videos.filter((v) => v.section_id === filter);

  const handleSave = async () => {
    if (!editing?.title || !editing?.section_id) {
      toast.error("Please fill all required fields (title and section).");
      return;
    }

    setSaving(true);
    toast.loading("Saving video...", { id: "video-save" });

    const section = sections.find((s) => s.id === editing.section_id);
    const payload = {
      title: editing.title,
      category: section?.name || "",
      section_id: editing.section_id,
      youtube_url: editing.youtube_url || null,
      drive_url: editing.drive_url || null,
      thumbnail_url: editing.thumbnail_url || null,
      display_order: editing.display_order || 0,
    };

    console.log("Uploading video:", payload);

    try {
      let response;
      if (editing.id) {
        response = await supabase.from("portfolio_videos").update(payload).eq("id", editing.id);
      } else {
        response = await supabase.from("portfolio_videos").insert(payload);
      }

      console.log("Insert/Update response:", response);

      if (response.error) {
        console.error("Supabase error:", response.error);
        toast.error("❌ Upload failed. Please try again.", { id: "video-save" });
        setSaving(false);
        return;
      }

      await refetchVideos();
      toast.success("✅ Video saved successfully!", { id: "video-save" });
      setEditing(null);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("❌ Upload failed. Please try again.", { id: "video-save" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    const { error } = await supabase.from("portfolio_videos").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete video.");
      return;
    }
    await refetchVideos();
    toast.success("Video deleted.");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Media Upload</h1>
        <button onClick={() => setEditing({ display_order: 0 })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
          <Plus size={16} /> Add New Video
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setFilter("All")} className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${filter === "All" ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground hover:text-foreground"}`}>
          All
        </button>
        {sections.map((s) => (
          <button key={s.id} onClick={() => setFilter(s.id)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${filter === s.id ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground hover:text-foreground"}`}>
            {s.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="aspect-video rounded-xl" />)}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => !saving && setEditing(null)}>
          <div className="glass-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg text-foreground">{editing.id ? "Edit Video" : "Add Video"}</h2>
              <button onClick={() => !saving && setEditing(null)} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"><X size={14} /></button>
            </div>
            <div><label className="text-xs text-muted-foreground font-medium mb-1 block">Title *</label><input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" /></div>
            <div><label className="text-xs text-muted-foreground font-medium mb-1 block">Section *</label><select value={editing.section_id || ""} onChange={(e) => setEditing({ ...editing, section_id: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none"><option value="">Select...</option>{sections.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
            <div><label className="text-xs text-muted-foreground font-medium mb-1 block">YouTube URL</label><input value={editing.youtube_url || ""} onChange={(e) => setEditing({ ...editing, youtube_url: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" placeholder="https://youtube.com/..." /></div>
            <div><label className="text-xs text-muted-foreground font-medium mb-1 block">Custom Thumbnail URL</label><input value={editing.thumbnail_url || ""} onChange={(e) => setEditing({ ...editing, thumbnail_url: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" placeholder="Optional" /></div>
            <div><label className="text-xs text-muted-foreground font-medium mb-1 block">Display Order</label><input type="number" value={editing.display_order || 0} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" /></div>
            <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {saving && <Loader2 size={16} className="animate-spin" />} {saving ? "Saving..." : "Save & Publish"}
            </button>
          </div>
        </div>
      )}

      {!loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => {
            const ytId = v.youtube_url ? getYouTubeId(v.youtube_url) : null;
            const thumb = v.thumbnail_url || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);
            return (
              <div key={v.id} className="group glass-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-all">
                <div className="aspect-video relative bg-secondary">
                  {thumb && <img src={thumb} alt={v.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => setEditing(v)} className="w-10 h-10 rounded-xl bg-secondary/90 border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(v.id)} className="w-10 h-10 rounded-xl bg-secondary/90 border border-border flex items-center justify-center text-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm text-[10px] font-medium text-foreground border border-border/50">{sectionMap.get(v.section_id || "") || v.category}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-foreground truncate">{v.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">{new Date(v.created_at).toLocaleDateString()}</span>
                    {v.youtube_url && <a href={v.youtube_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={12} /></a>}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="col-span-full text-center py-12 text-muted-foreground">No videos found.</p>}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
