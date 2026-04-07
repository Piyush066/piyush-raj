import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface ContentItem {
  id?: string;
  section: string;
  key: string;
  value: string;
}

const defaultContent: ContentItem[] = [
  { section: "hero", key: "headline", value: "" },
  { section: "hero", key: "subheadline", value: "" },
  { section: "hero", key: "cta_text", value: "" },
  { section: "about", key: "bio", value: "" },
  { section: "about", key: "experience", value: "" },
  { section: "about", key: "education", value: "" },
  { section: "skills", key: "primary_skills", value: "" },
  { section: "skills", key: "tools", value: "" },
  { section: "contact", key: "email", value: "" },
  { section: "contact", key: "phone", value: "" },
  { section: "contact", key: "location", value: "" },
  { section: "social", key: "linkedin", value: "" },
  { section: "social", key: "github", value: "" },
  { section: "social", key: "youtube", value: "" },
  { section: "social", key: "instagram", value: "" },
];

const ContentEditor = () => {
  const [content, setContent] = useState<ContentItem[]>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from("site_content").select("*");
      if (data) {
        const merged = defaultContent.map((d) => {
          const existing = data.find((r) => r.section === d.section && r.key === d.key);
          return existing ? { ...d, id: existing.id, value: existing.value } : d;
        });
        setContent(merged);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  const updateField = (section: string, key: string, value: string) => {
    setContent((prev) => prev.map((c) => (c.section === section && c.key === key ? { ...c, value } : c)));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const item of content) {
      if (item.id) {
        const { data, error } = await supabase.from("site_content").update({ value: item.value }).eq("id", item.id).select();
        if (error) console.error("[ContentEditor] Update error:", error);
        else console.log("[ContentEditor] Updated:", data);
      } else if (item.value) {
        const { data, error } = await supabase.from("site_content").insert({ section: item.section, key: item.key, value: item.value }).select();
        if (error) console.error("[ContentEditor] Insert error:", error);
        else console.log("[ContentEditor] Inserted:", data);
      }
    }
    // Re-fetch to get fresh IDs for newly inserted rows
    const { data: fresh } = await supabase.from("site_content").select("*");
    if (fresh) {
      const merged = defaultContent.map((d) => {
        const existing = fresh.find((r) => r.section === d.section && r.key === d.key);
        return existing ? { ...d, id: existing.id, value: existing.value } : d;
      });
      setContent(merged);
    }
    setSaving(false);
    toast({ title: "Changes saved and published." });
  };

  const field = (label: string, section: string, key: string, multiline = false, placeholder = "") => {
    const item = content.find((c) => c.section === section && c.key === key);
    return (
      <div>
        <label className="text-xs text-muted-foreground font-medium mb-1 block capitalize">{label}</label>
        {multiline ? (
          <textarea rows={3} value={item?.value || ""} onChange={(e) => updateField(section, key, e.target.value)} placeholder={placeholder} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none resize-none" />
        ) : (
          <input value={item?.value || ""} onChange={(e) => updateField(section, key, e.target.value)} placeholder={placeholder} className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none" />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Website Content</h1>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {saving ? "Saving..." : "Save & Publish"}
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">{[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}</div>
      ) : (
        <div className="space-y-6">
          <div className="glass-card rounded-xl border border-border p-5 space-y-4">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-primary">Hero Section</h2>
            {field("Headline", "hero", "headline", false, "Your main headline")}
            {field("Sub-headline", "hero", "subheadline", true, "Supporting text")}
            {field("CTA Button Text", "hero", "cta_text", false, "View My Work")}
          </div>
          <div className="glass-card rounded-xl border border-border p-5 space-y-4">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-primary">About</h2>
            {field("Bio", "about", "bio", true, "Your bio / description")}
            {field("Experience Summary", "about", "experience", true)}
            {field("Education", "about", "education", true)}
          </div>
          <div className="glass-card rounded-xl border border-border p-5 space-y-4">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-primary">Skills</h2>
            {field("Primary Skills (comma-separated)", "skills", "primary_skills", true)}
            {field("Tools & Software (comma-separated)", "skills", "tools", true)}
          </div>
          <div className="glass-card rounded-xl border border-border p-5 space-y-4">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-primary">Contact</h2>
            {field("Email", "contact", "email", false, "your@email.com")}
            {field("Phone", "contact", "phone")}
            {field("Location", "contact", "location")}
          </div>
          <div className="glass-card rounded-xl border border-border p-5 space-y-4">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-primary">Social Links</h2>
            {field("LinkedIn", "social", "linkedin", false, "https://linkedin.com/in/...")}
            {field("GitHub", "social", "github", false, "https://github.com/...")}
            {field("YouTube", "social", "youtube", false, "https://youtube.com/...")}
            {field("Instagram", "social", "instagram", false, "https://instagram.com/...")}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;
