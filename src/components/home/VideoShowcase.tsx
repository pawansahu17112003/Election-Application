import { motion } from "framer-motion";
import { Play, Video } from "lucide-react";
import { useVideos } from "@/hooks/useVideos";

const getYouTubeEmbedUrl = (url: string) => {
  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  
  if (videoId) {
    // Add parameters for better mobile compatibility
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  }
  return url;
};

export const VideoShowcase = () => {
  const { data: videos = [], isLoading } = useVideos('home');

  if (isLoading) {
    return (
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return null; // Don't show section if no videos
  }

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
            <Video className="w-4 h-4 inline mr-2" />
            Watch Our Work
          </span>
          <h2 className="heading-section text-primary-foreground mb-4">
            Campaign Showcases
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            See how we transform campaign strategies into winning results through our 
            comprehensive approach to election management.
          </p>
        </motion.div>

        <div className={`grid gap-6 ${videos.length === 1 ? 'max-w-4xl mx-auto' : videos.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-brand-lg bg-black">
                {video.video_type === 'youtube' ? (
                  <iframe
                    src={getYouTubeEmbedUrl(video.video_url)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <video
                    src={video.video_url}
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                    poster=""
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="mt-4">
                <h3 className="font-display text-lg font-semibold text-primary-foreground">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-primary-foreground/60 text-sm mt-1">
                    {video.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
