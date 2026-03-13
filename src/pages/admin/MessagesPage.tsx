import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, Trash2, Eye, EyeOff } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Message = Tables<"contact_messages">;

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (msg: Message) => {
    await supabase.from("contact_messages").update({ read: !msg.read }).eq("id", msg.id);
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    fetchMessages();
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div>;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Messages</h1>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`glass-card rounded-xl p-5 border transition-all ${m.read ? "border-border" : "border-primary/30 bg-primary/5"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={14} className="text-primary shrink-0" />
                  <span className="text-foreground font-medium text-sm">{m.name}</span>
                  <span className="text-muted-foreground text-xs">({m.email})</span>
                  {!m.read && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold">NEW</span>}
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground mb-2">
                  {m.project_type && <span>Type: {m.project_type}</span>}
                  {m.budget && <span>Budget: {m.budget}</span>}
                </div>
                <p className="text-muted-foreground text-sm">{m.message}</p>
                <p className="text-muted-foreground text-[10px] mt-2">{new Date(m.created_at).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleRead(m)} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" title={m.read ? "Mark unread" : "Mark read"}>
                  {m.read ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => handleDelete(m.id)} className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center py-12 text-muted-foreground">No messages yet.</p>}
      </div>
    </div>
  );
};

export default MessagesPage;
