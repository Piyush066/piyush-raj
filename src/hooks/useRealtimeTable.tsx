import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

type TableName = "portfolio_videos" | "services" | "site_content" | "ai_leads" | "contact_messages";

export function useRealtimeTable<T extends Record<string, any>>(
  table: TableName,
  orderBy: string = "created_at",
  ascending: boolean = false
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    try {
      const { data: rows, error: fetchError } = await supabase
        .from(table)
        .select("*")
        .order(orderBy, { ascending });

      if (fetchError) {
        console.error(`[Realtime] Fetch error on ${table}:`, fetchError);
        setError(fetchError.message);
        if (mountedRef.current) setLoading(false);
        return;
      }

      console.log(`[Realtime] Fetched ${(rows || []).length} rows from ${table}`);
      if (mountedRef.current) {
        setData((rows as unknown as T[]) || []);
        setError(null);
        setLoading(false);
      }
    } catch (e) {
      console.error(`[Realtime] Unexpected error on ${table}:`, e);
      if (mountedRef.current) {
        setError(String(e));
        setLoading(false);
      }
    }
  }, [table, orderBy, ascending]);

  useEffect(() => {
    mountedRef.current = true;
    fetchData();

    const channel = supabase
      .channel(`realtime-${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, (payload) => {
        console.log(`[Realtime] Change on ${table}:`, payload.eventType);
        fetchData();
      })
      .subscribe();

    return () => {
      mountedRef.current = false;
      supabase.removeChannel(channel);
    };
  }, [table, fetchData]);

  return { data, loading, error, refetch: fetchData };
}
