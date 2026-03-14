import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Link, Loader2, Pencil, Trash2, X, Save, ExternalLink, Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Video = Tables<"portfolio_videos">;

const categories = ["Brand Videos", "Reels & Shorts", "YouTube Videos", "Ads & UGC"];

const getYouTubeId = (url: string) => {
  const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/);
  return match ? match[1] : null;
};

const MediaUpload = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Video> | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("All");

  const fetchVideos = async () => {
    const { data } = await supabase
      .from("portfolio_videos")
      .select("*")
      .order("display_order", { ascending: true });
    setVideos(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.category) return;
    setSaving(true);
    const payload = {
      title: editing.title,
      category: editing.category,
      youtube_url: editing.youtube_url || null,
      drive_url: editing.drive_url || null,
      thumbnail_url: editing.thumbnail_url || null,
      display_order: editing.display_order || 0,
    };
    if (editing.id) {
      await supabase.from("portfolio_videos").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("portfolio_videos").insert(payload);
    }
    setSaving(false);
    setEditing(null);
    fetchVideos();
    toast({ title: "Saved!", description: "Video updated successfully." });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    await supabase.from("portfolio_videos").delete().eq("id", id);
    fetchVideos();
    toast({ title: "Deleted", description: "Video removed." });
  };

  const filtered = filter === "All" ? videos : videos.filter((v) => v.category === filter);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <h1 className="font-heading text-2xl font-bold text-foreground">Media Upload</h1>
        <button
          onClick={() => setEditing({ title: "", category: "Brand Videos", youtube_url: "", drive_url: "", display_order: 0 })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(24_95%_53%_/_0.4)] transition-all"
        >
          <Upload size={16} /> Add New Video
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-md border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-foreground">{editing.id ? "Edit" : "Add"} Video</h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Video Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm" />
              <select value={editing.category || "Brand Videos"} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:border-primary text-sm">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input placeholder="YouTube URL" value={editing.youtube_url || ""} onChange={(e) => setEditing({ ...editing, youtube_url: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm" />
              <input placeholder="Drive / External URL" value={editing.drive_url || ""} onChange={(e) => setEditing({ ...editing, drive_url: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm" />
              <input placeholder="Custom Thumbnail URL" value={editing.thumbnail_url || ""} onChange={(e) => setEditing({ ...editing, thumbnail_url: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm" />
              <input type="number" placeholder="Display Order" value={editing.display_order || 0} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm" />
              <button onClick={handleSave} disabled={saving || !editing.title} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 text-sm disabled:opacity-50">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v) => {
          const ytId = getYouTubeId(v.youtube_url || "");
          const thumb = v.thumbnail_url || (ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null);
          return (
            <div key={v.id} className="glass-card rounded-xl border border-border overflow-hidden group">
              {/* Thumbnail */}
              <div className="aspect-video bg-secondary/50 relative">
                {thumb ? (
                  <img src={thumb} alt={v.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Film size={32} />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditing(v)} className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(v.id)} className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <p className="text-foreground font-medium text-sm truncate">{v.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">{v.category}</span>
                  <span className="text-muted-foreground text-[10px]">{new Date(v.created_at).toLocaleDateString()}</span>
                </div>
                {(v.youtube_url || v.drive_url) && (
                  <a href={v.youtube_url || v.drive_url || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary text-xs mt-2 hover:underline">
                    <ExternalLink size={10} /> View Link
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="text-center py-12 text-muted-foreground">No videos found. Click "Add New Video" to get started.</p>}
    </div>
  );
};

export default MediaUpload;
