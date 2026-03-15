import { Film, MessageSquare, Wrench, BarChart3, Bot } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tables } from "@/integrations/supabase/types";

const AdminDashboard = () => {
  const { data: videos, loading: l1 } = useRealtimeTable<Tables<"portfolio_videos">>("portfolio_videos");
  const { data: services, loading: l2 } = useRealtimeTable<Tables<"services">>("services");
  const { data: messages, loading: l3 } = useRealtimeTable<Tables<"contact_messages">>("contact_messages");
  const { data: leads, loading: l4 } = useRealtimeTable<Tables<"ai_leads">>("ai_leads");

  const loading = l1 || l2 || l3 || l4;

  const cards = [
    { label: "Portfolio Videos", value: videos.length, icon: Film, color: "from-primary/20 to-orange-600/5" },
    { label: "Services", value: services.length, icon: Wrench, color: "from-orange-500/20 to-amber-500/5" },
    { label: "Total Messages", value: messages.length, icon: MessageSquare, color: "from-amber-500/20 to-primary/5" },
    { label: "Unread Messages", value: messages.filter((m) => !m.read).length, icon: BarChart3, color: "from-primary/20 to-amber-600/5" },
    { label: "AI Leads", value: leads.length, icon: Bot, color: "from-orange-600/20 to-primary/5" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="glass-card rounded-xl p-5 sm:p-6 border border-border relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${c.color}`} />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                <c.icon size={20} className="text-primary" />
              </div>
              {loading ? (
                <Skeleton className="h-8 w-16 mb-1" />
              ) : (
                <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground">{c.value}</p>
              )}
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
