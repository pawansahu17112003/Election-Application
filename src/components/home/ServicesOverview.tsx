import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Vote,
  Megaphone,
  Globe,
  Users,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Vote,
    title: "Election Solutions",
    description: "Comprehensive strategies for Panchayat, Municipal, Vidhan Sabha, and Lok Sabha elections.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Megaphone,
    title: "Campaign Management",
    description: "End-to-end campaign execution including PR, branding, speech writing, and opposition analysis.",
    color: "bg-navy/10 text-navy",
  },
  {
    icon: Globe,
    title: "Digital Services",
    description: "Social media campaigns, political ads, candidate websites, and viral video content.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Users,
    title: "Ground Operations",
    description: "Booth management, Panna Pramukh planning, volunteer coordination, and D2D campaigns.",
    color: "bg-navy/10 text-navy",
  },
  {
    icon: BarChart3,
    title: "Survey & Analytics",
    description: "Voter surveys, issue-based research, sentiment analysis, and real-time feedback systems.",
    color: "bg-accent/10 text-accent",
  },
];

export const ServicesOverview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Expertise
          </span>
          <h2 className="heading-section text-foreground mb-4">
            Comprehensive Campaign Services
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            From strategic planning to ground-level execution, we provide all the 
            services needed for a successful electoral campaign.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/30 shadow-brand-sm hover:shadow-brand-md transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="heading-card text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: services.length * 0.1 }}
            className="p-8 rounded-2xl bg-primary text-primary-foreground flex flex-col justify-center"
          >
            <h3 className="heading-card mb-4">Ready to Win?</h3>
            <p className="text-primary-foreground/70 mb-6">
              Discover how our tailored strategies can transform your campaign.
            </p>
            <Link to="/services">
              <Button variant="secondary" className="w-full group">
                View All Services
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
