import { motion } from "framer-motion";
import { CheckCircle2, Shield, Award, Clock, Users, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "100% Legal & Ethical",
    description: "All services comply with Indian election laws and ECI guidelines.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "500+ successful campaigns across all levels of elections.",
  },
  {
    icon: Clock,
    title: "24/7 War Room Support",
    description: "Round-the-clock monitoring and rapid response during campaign periods.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Seasoned strategists, analysts, and ground operation experts.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Approach",
    description: "Real-time analytics and voter sentiment tracking for informed decisions.",
  },
  {
    icon: CheckCircle2,
    title: "End-to-End Solutions",
    description: "From strategy to execution, we handle every aspect of your campaign.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why SAARTHAK
            </span>
            <h2 className="heading-section text-foreground mb-6">
              The Strategic Partner Your Campaign Deserves
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              SAARTHAK combines deep political expertise with modern campaign 
              technology to deliver results. Our independent, non-partisan approach 
              ensures professional service for candidates across the political spectrum.
            </p>
            
            <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
              <p className="text-lg font-medium mb-2">
                "Independent consulting, impactful results."
              </p>
              <p className="text-sm text-primary-foreground/70">
                We don't affiliate with any political party – our loyalty is to your success.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Reasons Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border shadow-brand-sm hover:shadow-brand-md transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <reason.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
