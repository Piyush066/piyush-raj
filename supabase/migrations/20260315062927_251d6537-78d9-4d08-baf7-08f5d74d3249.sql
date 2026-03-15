
ALTER TABLE public.ai_leads ADD COLUMN IF NOT EXISTS whatsapp text;
ALTER TABLE public.ai_leads ADD COLUMN IF NOT EXISTS source text DEFAULT 'manual';

ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_videos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
