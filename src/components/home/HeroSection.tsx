import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";
import { useVideos } from "@/hooks/useVideos";
import { HomeContactForm } from "./HomeContactForm";
import { PosterSlider } from "./PosterSlider";

const getYouTubeEmbedUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  }
  return url;
};

export const HeroSection = () => {
  const { data: videos = [], isLoading } = useVideos('home');
  const featuredVideo = videos.length > 0 ? videos[0] : null;

  return (
    <section className="pt-32 md:pt-36">
      {/* Tagline Banner - Dark background with parliament building style */}
      <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-4 md:py-6 relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
        
        <div className="container-custom relative z-10 text-center">
          {/* Main heading - Orange/Yellow */}
          <h1 className="font-display text-xl md:text-3xl lg:text-4xl font-bold text-orange tracking-wide mb-1 md:mb-2">
            Winning Elections with Strategy
          </h1>
          
          {/* Subheading - White/Light */}
          <p className="text-base md:text-xl lg:text-2xl font-semibold text-white/90 tracking-wide mb-2 md:mb-3">
            From Panchayat to Parliament
          </p>
          
          {/* Indian Flag colored underline */}
          <div className="flex justify-center">
            <div className="flex h-1 md:h-1.5 w-48 md:w-72 lg:w-96 rounded-full overflow-hidden">
              <div className="flex-1 bg-[#FF9933]" /> {/* Saffron */}
              <div className="flex-1 bg-white" /> {/* White */}
              <div className="flex-1 bg-[#138808]" /> {/* Green */}
            </div>
          </div>
        </div>
      </div>

      {/* Poster Slider Section */}
      <PosterSlider />

      {/* Main Content Area */}
      <div 
        className="relative min-h-[60vh] md:min-h-[70vh]"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/60" />

        <div className="container-custom relative z-10 py-4 md:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 items-start">
            {/* Video Section - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-lg shadow-brand-lg overflow-hidden">
                {isLoading ? (
                  <div className="aspect-video flex items-center justify-center bg-muted">
                    <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-primary"></div>
                  </div>
                ) : featuredVideo ? (
                  <div className="aspect-video">
                    {featuredVideo.video_type === 'youtube' ? (
                      <iframe
                        src={getYouTubeEmbedUrl(featuredVideo.video_url)}
                        title={featuredVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <video
                        src={featuredVideo.video_url}
                        controls
                        className="w-full h-full object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video flex flex-col items-center justify-center bg-white p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">Video Link</h3>
                    <p className="text-muted-foreground text-sm md:text-base">watch for more information</p>
                  </div>
                )}
                {featuredVideo && (
                  <div className="p-2 md:p-3 bg-white">
                    <p className="text-center text-muted-foreground text-sm md:text-base font-medium">
                      {featuredVideo.title || 'watch for more information'}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <HomeContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
