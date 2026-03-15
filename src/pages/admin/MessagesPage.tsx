import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, Trash2, Eye, EyeOff, Bot, Phone } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Message = Tables<"contact_messages">;
type Lead = Tables<"ai_leads">;

const MessagesPage = () => {
  const [tab, setTab] = useState<"messages" | "leads">("messages");
  const { data: messages, loading: loadingMsgs } = useRealtimeTable<Message>("contact_messages");
  const { data: leads, loading: loadingLeads } = useRealtimeTable<Lead>("ai_leads");

  const loading = loadingMsgs || loadingLeads;

  const toggleRead = async (msg: Message) => {
    await supabase.from("contact_messages").update({ read: !msg.read }).eq("id", msg.id);
  };

  const toggleLeadRead = async (lead: Lead) => {
    await supabase.from("ai_leads").update({ read: !lead.read }).eq("id", lead.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    toast({ title: "Message deleted" });
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await supabase.from("ai_leads").delete().eq("id", id);
    toast({ title: "Lead deleted" });
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Messages</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("messages")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            tab === "messages" ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Mail size={16} /> Contact Messages
          {messages.filter((m) => !m.read).length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-[10px] font-bold">{messages.filter((m) => !m.read).length}</span>
          )}
        </button>
        <button
          onClick={() => setTab("leads")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            tab === "leads" ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bot size={16} /> AI Voice Leads
          {leads.filter((l) => !l.read).length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-[10px] font-bold">{leads.filter((l) => !l.read).length}</span>
          )}
        </button>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Contact Messages */}
      {!loading && tab === "messages" && (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`glass-card rounded-xl p-5 border transition-all ${m.read ? "border-border" : "border-primary/30 bg-primary/5"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Mail size={14} className="text-primary shrink-0" />
                    <span className="text-foreground font-medium text-sm">{m.name}</span>
                    <span className="text-muted-foreground text-xs">({m.email})</span>
                    {!m.read && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold">NEW</span>}
                  </div>
                  <div className="flex gap-3 text-xs text-muted-foreground mb-2 flex-wrap">
                    {m.project_type && <span>Type: {m.project_type}</span>}
                    {m.budget && <span>Budget: {m.budget}</span>}
                  </div>
                  <p className="text-muted-foreground text-sm">{m.message}</p>
                  <p className="text-muted-foreground text-[10px] mt-2">{new Date(m.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleRead(m)} className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" title={m.read ? "Mark unread" : "Mark read"}>
                    {m.read ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {messages.length === 0 && <p className="text-center py-12 text-muted-foreground">No messages yet.</p>}
        </div>
      )}

      {/* AI Voice Leads */}
      {!loading && tab === "leads" && (
        <div className="space-y-3">
          {leads.map((l) => (
            <div key={l.id} className={`glass-card rounded-xl p-5 border transition-all ${l.read ? "border-border" : "border-primary/30 bg-primary/5"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Bot size={14} className="text-primary shrink-0" />
                    <span className="text-foreground font-medium text-sm">{l.client_name || "Unknown"}</span>
                    {l.email && <span className="text-muted-foreground text-xs">({l.email})</span>}
                    {(l as any).source === "voice_assistant" && (
                      <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-semibold">AI VOICE LEAD</span>
                    )}
                    {!l.read && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold">NEW</span>}
                  </div>
                  <div className="flex gap-3 text-xs text-muted-foreground mb-2 flex-wrap">
                    {l.project_type && <span>Type: {l.project_type}</span>}
                    {l.budget && <span>Budget: {l.budget}</span>}
                    {l.deadline && <span>Deadline: {l.deadline}</span>}
                    {(l as any).whatsapp && (
                      <span className="flex items-center gap-1"><Phone size={10} /> {(l as any).whatsapp}</span>
                    )}
                  </div>
                  {l.message && <p className="text-muted-foreground text-sm">{l.message}</p>}
                  <p className="text-muted-foreground text-[10px] mt-2">{new Date(l.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleLeadRead(l)} className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                    {l.read ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => handleDeleteLead(l.id)} className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {leads.length === 0 && <p className="text-center py-12 text-muted-foreground">No AI voice leads yet.</p>}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
