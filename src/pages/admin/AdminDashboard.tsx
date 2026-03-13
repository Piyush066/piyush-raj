import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Film, MessageSquare, Wrench, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ videos: 0, services: 0, messages: 0, unread: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [vids, svcs, msgs, unread] = await Promise.all([
        supabase.from("portfolio_videos").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
      ]);
      setStats({
        videos: vids.count || 0,
        services: svcs.count || 0,
        messages: msgs.count || 0,
        unread: unread.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Portfolio Videos", value: stats.videos, icon: Film, color: "from-primary/20 to-orange-600/5" },
    { label: "Services", value: stats.services, icon: Wrench, color: "from-orange-500/20 to-amber-500/5" },
    { label: "Total Messages", value: stats.messages, icon: MessageSquare, color: "from-amber-500/20 to-primary/5" },
    { label: "Unread Messages", value: stats.unread, icon: BarChart3, color: "from-primary/20 to-amber-600/5" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Dashboard Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="glass-card rounded-xl p-6 border border-border relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${c.color}`} />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <c.icon size={20} className="text-primary" />
              </div>
              <p className="text-3xl font-heading font-bold text-foreground">{c.value}</p>
              <p className="text-muted-foreground text-sm mt-1">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
