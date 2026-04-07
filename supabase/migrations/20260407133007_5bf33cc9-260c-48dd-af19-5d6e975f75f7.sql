
-- Create portfolio_sections table
CREATE TABLE public.portfolio_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_sections ENABLE ROW LEVEL SECURITY;

-- Anyone can view sections
CREATE POLICY "Anyone can view portfolio sections"
ON public.portfolio_sections FOR SELECT
TO public
USING (true);

-- Admins can manage sections
CREATE POLICY "Admins can manage portfolio sections"
ON public.portfolio_sections FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add section_id to portfolio_videos
ALTER TABLE public.portfolio_videos
ADD COLUMN section_id UUID REFERENCES public.portfolio_sections(id) ON DELETE SET NULL;

-- Seed default sections from existing categories
INSERT INTO public.portfolio_sections (name, slug, display_order) VALUES
  ('Brand Videos', 'brand-videos', 0),
  ('Reels & Shorts', 'reels-shorts', 1),
  ('YouTube Videos', 'youtube-videos', 2),
  ('Ads & UGC', 'ads-ugc', 3);

-- Migrate existing videos to use section_id
UPDATE public.portfolio_videos v
SET section_id = s.id
FROM public.portfolio_sections s
WHERE v.category = s.name;

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_sections;
