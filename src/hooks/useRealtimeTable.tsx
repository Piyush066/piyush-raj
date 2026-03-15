import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type TableName = "portfolio_videos" | "services" | "site_content" | "ai_leads" | "contact_messages";

export function useRealtimeTable<T extends Record<string, any>>(
  table: TableName,
  orderBy: string = "created_at",
  ascending: boolean = false
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data: rows } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending });
    setData((rows as unknown as T[]) || []);
    setLoading(false);
  }, [table, orderBy, ascending]);

  useEffect(() => {
    fetch();

    const channel = supabase
      .channel(`realtime-${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => {
        fetch();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, fetch]);

  return { data, loading, refetch: fetch };
}
