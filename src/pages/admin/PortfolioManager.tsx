import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Pencil, X, Save, Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Video = Tables<"portfolio_videos">;

const categories = ["Brand Videos", "Reels & Shorts", "YouTube Videos", "Ads & UGC"];

const emptyVideo = { title: "", category: "Brand Videos", youtube_url: "", drive_url: "", display_order: 0 };

const PortfolioManager = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Video> | null>(null);
  const [saving, setSaving] = useState(false);

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

    if (editing.id) {
      await supabase.from("portfolio_videos").update({
        title: editing.title,
        category: editing.category,
        youtube_url: editing.youtube_url || null,
        drive_url: editing.drive_url || null,
        display_order: editing.display_order || 0,
      }).eq("id", editing.id);
    } else {
      await supabase.from("portfolio_videos").insert({
        title: editing.title,
        category: editing.category,
        youtube_url: editing.youtube_url || null,
        drive_url: editing.drive_url || null,
        display_order: editing.display_order || 0,
      });
    }

    setSaving(false);
    setEditing(null);
    fetchVideos();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    await supabase.from("portfolio_videos").delete().eq("id", id);
    fetchVideos();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Portfolio Manager</h1>
        <button
          onClick={() => setEditing(emptyVideo)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(24_95%_53%_/_0.4)] transition-all"
        >
          <Plus size={16} /> Add Video
        </button>
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
              <input
                placeholder="Video Title"
                value={editing.title || ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
              />
              <select
                value={editing.category || "Brand Videos"}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:border-primary text-sm"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input
                placeholder="YouTube URL"
                value={editing.youtube_url || ""}
                onChange={(e) => setEditing({ ...editing, youtube_url: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
              />
              <input
                placeholder="Drive / External URL"
                value={editing.drive_url || ""}
                onChange={(e) => setEditing({ ...editing, drive_url: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
              />
              <input
                type="number"
                placeholder="Display Order"
                value={editing.display_order || 0}
                onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
              />
              <button
                onClick={handleSave}
                disabled={saving || !editing.title}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video list */}
      <div className="space-y-3">
        {categories.map((cat) => {
          const catVideos = videos.filter((v) => v.category === cat);
          if (catVideos.length === 0) return null;
          return (
            <div key={cat}>
              <h3 className="text-sm font-heading font-bold text-primary uppercase tracking-widest mb-2">{cat}</h3>
              <div className="space-y-2 mb-6">
                {catVideos.map((v) => (
                  <div key={v.id} className="glass-card rounded-xl p-4 border border-border flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-medium text-sm truncate">{v.title}</p>
                      <p className="text-muted-foreground text-xs truncate">{v.youtube_url || v.drive_url || "No URL"}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => setEditing(v)} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(v.id)} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {videos.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No videos yet. Click "Add Video" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioManager;
