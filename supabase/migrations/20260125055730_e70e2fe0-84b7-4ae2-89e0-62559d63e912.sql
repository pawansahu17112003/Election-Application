-- Create storage bucket for video uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true);

-- Create policy to allow admins to upload videos
CREATE POLICY "Admins can upload videos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'videos' AND 
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
);

-- Create policy to allow admins to update videos
CREATE POLICY "Admins can update uploaded videos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'videos' AND 
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
);

-- Create policy to allow admins to delete videos
CREATE POLICY "Admins can delete uploaded videos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'videos' AND 
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role))
);

-- Create policy to allow public read access to videos
CREATE POLICY "Anyone can view videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'videos');