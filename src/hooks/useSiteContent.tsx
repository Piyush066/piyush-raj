import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContentRow {
  section: string;
  key: string;
  value: string;
}

let cachedContent: ContentRow[] | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

async function fetchAllContent() {
  const { data, error } = await supabase.from("site_content").select("section, key, value");
  if (error) {
    console.error("[SiteContent] Fetch error:", error);
    return;
  }
  cachedContent = data || [];
  notifyListeners();
}

// Set up global realtime subscription once
let channelInitialized = false;
function initChannel() {
  if (channelInitialized) return;
  channelInitialized = true;
  fetchAllContent();
  supabase
    .channel("site-content-global")
    .on("postgres_changes", { event: "*", schema: "public", table: "site_content" }, () => {
      console.log("[SiteContent] Realtime update received");
      fetchAllContent();
    })
    .subscribe();
}

export function useSiteContent() {
  const [content, setContent] = useState<ContentRow[]>(cachedContent || []);
  const [loading, setLoading] = useState(!cachedContent);

  useEffect(() => {
    initChannel();

    const update = () => {
      if (cachedContent) {
        setContent(cachedContent);
        setLoading(false);
      }
    };

    listeners.add(update);
    // If cache already populated
    if (cachedContent) update();

    return () => { listeners.delete(update); };
  }, []);

  const get = useCallback(
    (section: string, key: string, fallback = "") => {
      const row = content.find((c) => c.section === section && c.key === key);
      return row?.value || fallback;
    },
    [content]
  );

  return { content, loading, get };
}
