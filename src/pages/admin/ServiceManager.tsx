import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Service = Tables<"services">;

const emptyService: Partial<Service> = {
  title: "", description: "", icon_name: "Film", num: "01",
  summary: "", features: [], process_steps: [], audience: [], results: [],
  turnaround: "", example_title: "", display_order: 0,
};

const ServiceManager = () => {
  const { data: services, loading } = useRealtimeTable<Service>("services", "display_order", true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editing?.title || !editing?.description) return;
    setSaving(true);
    const payload = {
      title: editing.title,
      description: editing.description,
      icon_name: editing.icon_name || "Film",
      num: editing.num || "01",
      summary: editing.summary || null,
      features: editing.features || [],
      process_steps: editing.process_steps || [],
      audience: editing.audience || [],
      results: editing.results || [],
      turnaround: editing.turnaround || null,
      example_title: editing.example_title || null,
      display_order: editing.display_order || 0,
    };
    if (editing.id) {
      await supabase.from("services").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("services").insert(payload);
    }
    setSaving(false);
    setEditing(null);
    toast({ title: "Changes saved and published." });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    toast({ title: "Service deleted." });
  };

  const arrayField = (label: string, key: keyof Pick<Service, "features" | "process_steps" | "audience" | "results">) => (
    <div>
      <label className="text-xs text-muted-foreground font-medium mb-1 block">{label} (one per line)</label>
      <textarea rows={3} value={(editing?.[key] as string[] || []).join("\n")} onChange={(e) => setEditing({ ...editing, [key]: e.target.value.split("\n").filter(Boolean) })} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none resize-none" />
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Services</h1>
        <button onClick={() => setEditing({ ...emptyService })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {loading && <div className="space-y-3">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}</div>}

      {editing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="glass-card rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg text-foreground">{editing.id ? "Edit Service" : "Add Service"}</h2>
              <button onClick={() => setEditing(null)} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"><X size={14} /></button>
            </div>
            <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Title" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
            <input value={editing.num || ""} onChange={(e) => setEditing({ ...editing, num: e.target.value })} placeholder="Number (01, 02...)" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
            <input value={editing.icon_name || ""} onChange={(e) => setEditing({ ...editing, icon_name: e.target.value })} placeholder="Icon name" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
            <textarea rows={2} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Short description" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none resize-none" />
            <textarea rows={3} value={editing.summary || ""} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} placeholder="Detailed summary" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none resize-none" />
            {arrayField("Features", "features")}
            {arrayField("Process Steps", "process_steps")}
            {arrayField("Audience", "audience")}
            {arrayField("Results", "results")}
            <input value={editing.turnaround || ""} onChange={(e) => setEditing({ ...editing, turnaround: e.target.value })} placeholder="Turnaround (e.g. 3-5 days)" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
            <input value={editing.example_title || ""} onChange={(e) => setEditing({ ...editing, example_title: e.target.value })} placeholder="Example project title" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
            <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2">
              {saving && <Loader2 size={16} className="animate-spin" />} {saving ? "Saving..." : "Save & Publish"}
            </button>
          </div>
        </div>
      )}

      {!loading && (
        <div className="space-y-2">
          {services.map((s) => (
            <div key={s.id} className="glass-card rounded-xl p-4 border border-border flex items-center gap-4 hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <span className="text-primary font-heading font-bold text-sm">{s.num}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.title}</p>
                <p className="text-xs text-muted-foreground truncate">{s.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(s)} className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(s.id)} className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {services.length === 0 && <p className="text-center py-12 text-muted-foreground">No services yet.</p>}
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
