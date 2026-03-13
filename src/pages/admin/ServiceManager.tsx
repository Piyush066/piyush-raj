import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Pencil, X, Save, Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Service = Tables<"services">;

const emptyService: Partial<Service> = {
  title: "", description: "", icon_name: "Film", num: "01", summary: "",
  features: [], process_steps: [], audience: [], results: [],
  turnaround: "", example_title: "", display_order: 0,
};

const ServiceManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("display_order");
    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSave = async () => {
    if (!editing?.title || !editing?.description || !editing?.num) return;
    setSaving(true);

    const payload = {
      title: editing.title,
      description: editing.description,
      icon_name: editing.icon_name || "Film",
      num: editing.num,
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
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    fetchServices();
  };

  const arrayField = (label: string, key: keyof Service) => {
    const val = (editing as any)?.[key] as string[] || [];
    return (
      <div>
        <label className="text-muted-foreground text-xs font-medium block mb-1">{label} (one per line)</label>
        <textarea
          value={val.join("\n")}
          onChange={(e) => setEditing({ ...editing, [key]: e.target.value.split("\n").filter(Boolean) })}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
        />
      </div>
    );
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Service Manager</h1>
        <button onClick={() => setEditing(emptyService)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(24_95%_53%_/_0.4)] transition-all">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-lg border border-border max-h-[90vh] overflow-y-auto modal-scroll">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-foreground">{editing.id ? "Edit" : "Add"} Service</h3>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm" />
                <input placeholder="Number (01, 02...)" value={editing.num || ""} onChange={(e) => setEditing({ ...editing, num: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm" />
              </div>
              <textarea placeholder="Short description" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none" />
              <textarea placeholder="Detailed summary" value={editing.summary || ""} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Turnaround time" value={editing.turnaround || ""} onChange={(e) => setEditing({ ...editing, turnaround: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm" />
                <input placeholder="Example title" value={editing.example_title || ""} onChange={(e) => setEditing({ ...editing, example_title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm" />
              </div>
              {arrayField("Features", "features")}
              {arrayField("Process Steps", "process_steps")}
              {arrayField("Target Audience", "audience")}
              {arrayField("Expected Results", "results")}
              <button onClick={handleSave} disabled={saving || !editing.title} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 text-sm disabled:opacity-50">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="glass-card rounded-xl p-4 border border-border flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-foreground font-medium text-sm">{s.num}. {s.title}</p>
              <p className="text-muted-foreground text-xs truncate">{s.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setEditing(s)} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(s.id)} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {services.length === 0 && <p className="text-center py-12 text-muted-foreground">No services yet.</p>}
      </div>
    </div>
  );
};

export default ServiceManager;
