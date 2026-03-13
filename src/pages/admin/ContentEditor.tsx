import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id?: string;
  section: string;
  key: string;
  value: string;
}

const defaultContent: ContentItem[] = [
  { section: "about", key: "main_text", value: "" },
  { section: "about", key: "sub_text", value: "" },
  { section: "about", key: "skills_badge", value: "" },
  { section: "contact", key: "email", value: "" },
  { section: "contact", key: "phone", value: "" },
  { section: "contact", key: "location", value: "" },
  { section: "social", key: "linkedin", value: "" },
  { section: "social", key: "github", value: "" },
];

const ContentEditor = () => {
  const [content, setContent] = useState<ContentItem[]>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from("site_content").select("*");
      if (data && data.length > 0) {
        const merged = defaultContent.map((dc) => {
          const found = data.find((d) => d.section === dc.section && d.key === dc.key);
          return found ? { ...dc, id: found.id, value: found.value } : dc;
        });
        setContent(merged);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  const updateField = (section: string, key: string, value: string) => {
    setContent((prev) =>
      prev.map((c) => (c.section === section && c.key === key ? { ...c, value } : c))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    for (const item of content) {
      if (!item.value) continue;
      if (item.id) {
        await supabase.from("site_content").update({ value: item.value }).eq("id", item.id);
      } else {
        await supabase.from("site_content").upsert(
          { section: item.section, key: item.key, value: item.value },
          { onConflict: "section,key" }
        );
      }
    }
    setSaving(false);
    toast({ title: "Saved!", description: "Website content updated." });
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  const field = (label: string, section: string, key: string, multiline = false) => {
    const item = content.find((c) => c.section === section && c.key === key);
    const Component = multiline ? "textarea" : "input";
    return (
      <div>
        <label className="text-muted-foreground text-xs font-medium block mb-1">{label}</label>
        <Component
          value={item?.value || ""}
          onChange={(e: any) => updateField(section, key, e.target.value)}
          {...(multiline ? { rows: 4 } : {})}
          className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Website Content</h1>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving…" : "Save All"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="glass-card rounded-xl p-6 border border-border">
          <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-widest text-primary mb-4">About Section</h3>
          <div className="space-y-3">
            {field("Main Text", "about", "main_text", true)}
            {field("Sub Text", "about", "sub_text", true)}
            {field("Skills Badge", "about", "skills_badge")}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 border border-border">
          <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-widest text-primary mb-4">Contact Info</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {field("Email", "contact", "email")}
            {field("Phone", "contact", "phone")}
            {field("Location", "contact", "location")}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 border border-border">
          <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-widest text-primary mb-4">Social Links</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {field("LinkedIn URL", "social", "linkedin")}
            {field("GitHub URL", "social", "github")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
