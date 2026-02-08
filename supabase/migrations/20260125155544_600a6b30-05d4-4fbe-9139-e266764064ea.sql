-- Create posters table for auto-sliding carousel
CREATE TABLE public.posters (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    page_assignment TEXT NOT NULL DEFAULT 'home',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.posters ENABLE ROW LEVEL SECURITY;

-- Create policies for poster access
CREATE POLICY "Anyone can view active posters" 
ON public.posters 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can view all posters" 
ON public.posters 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can insert posters" 
ON public.posters 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can update posters" 
ON public.posters 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins can delete posters" 
ON public.posters 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_posters_updated_at
BEFORE UPDATE ON public.posters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for poster images
INSERT INTO storage.buckets (id, name, public) VALUES ('posters', 'posters', true);

-- Storage policies for poster images
CREATE POLICY "Poster images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'posters');

CREATE POLICY "Admins can upload poster images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'posters' AND (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'))
));

CREATE POLICY "Admins can update poster images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'posters' AND (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'))
));

CREATE POLICY "Admins can delete poster images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'posters' AND (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin'))
));