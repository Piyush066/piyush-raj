import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Video = Tables<"portfolio_videos">;
const categories = ["Brand Videos", "Reels & Shorts", "YouTube Videos", "Ads & UGC"];

const PortfolioManager = () => {
  const { data: videos, loading } = useRealtimeTable<Video>("portfolio_videos", "display_order", true);
  const [editing, setEditing] = useState<Partial<Video> | null>(null);
  const [saving, setSaving] = useState(false);

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
    toast({ title: "Changes saved and published." });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    await supabase.from("portfolio_videos").delete().eq("id", id);
    toast({ title: "Video deleted." });
  };

  const grouped = categories.reduce<Record<string, Video[]>>((acc, cat) => {
    acc[cat] = videos.filter((v) => v.category === cat);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Portfolio Manager</h1>
        <button onClick={() => setEditing({ display_order: 0 })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
          <Plus size={16} /> Add Video
        </button>
      </div>

      {loading && <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}</div>}

      {editing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="glass-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg text-foreground">{editing.id ? "Edit Video" : "Add Video"}</h2>
              <button onClick={() => setEditing(null)} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"><X size={14} /></button>
            </div>
            <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Title" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
            <select value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none">
              <option value="">Select category...</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={editing.youtube_url || ""} onChange={(e) => setEditing({ ...editing, youtube_url: e.target.value })} placeholder="YouTube URL" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
            <input value={editing.thumbnail_url || ""} onChange={(e) => setEditing({ ...editing, thumbnail_url: e.target.value })} placeholder="Thumbnail URL (optional)" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
            <input type="number" value={editing.display_order || 0} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} placeholder="Display order" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
            <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2">
              {saving && <Loader2 size={16} className="animate-spin" />} {saving ? "Saving..." : "Save & Publish"}
            </button>
          </div>
        </div>
      )}

      {!loading && categories.map((cat) => (
        grouped[cat].length > 0 && (
          <div key={cat} className="mb-6">
            <h2 className="font-heading font-bold text-sm text-primary uppercase tracking-widest mb-3">{cat}</h2>
            <div className="space-y-2">
              {grouped[cat].map((v) => (
                <div key={v.id} className="glass-card rounded-xl p-4 border border-border flex items-center gap-4 hover:border-primary/30 transition-all">
                  <div className="w-20 h-14 rounded-lg bg-secondary overflow-hidden shrink-0">
                    {v.youtube_url && (
                      <img src={`https://img.youtube.com/vi/${v.youtube_url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/watch\?v=)([^?&]+)/)?.[1]}/default.jpg`} alt="" className="w-full h-full object-cover" loading="lazy" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{v.title}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(v.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setEditing(v)} className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(v.id)} className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
      {!loading && videos.length === 0 && <p className="text-center py-12 text-muted-foreground">No videos yet.</p>}
    </div>
  );
};

export default PortfolioManager;
