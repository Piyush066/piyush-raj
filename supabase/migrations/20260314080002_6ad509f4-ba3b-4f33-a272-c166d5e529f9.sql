
CREATE TABLE public.ai_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  client_name text,
  email text,
  project_type text,
  budget text,
  deadline text,
  message text,
  read boolean NOT NULL DEFAULT false
);

ALTER TABLE public.ai_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage leads" ON public.ai_leads
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can submit a lead" ON public.ai_leads
  FOR INSERT TO public
  WITH CHECK (true);
