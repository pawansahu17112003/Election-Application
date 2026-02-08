import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Vote,
  Megaphone,
  Globe,
  Users,
  BarChart3,
  ArrowRight,
  ClipboardList,
  PenTool,
  MessageSquare,
  Search,
  Smartphone,
  TrendingUp,
  Video,
  MapPin,
  DoorOpen,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const serviceCategories = [
  {
    title: "Election Solutions",
    description: "Tailored strategies for every level of election in India",
    icon: Vote,
    items: [
      { name: "Panchayat Election Solutions", desc: "Grassroots level campaign management" },
      { name: "Nagar Palika / Nigam Solutions", desc: "Urban local body election expertise" },
      { name: "Vidhan Sabha Election Solutions", desc: "State assembly level strategies" },
      { name: "Lok Sabha Election Solutions", desc: "Parliamentary election management" },
    ],
  },
  {
    title: "Core Services",
    description: "Strategic consulting and campaign management essentials",
    icon: Megaphone,
    items: [
      { name: "Election Campaign Management", desc: "End-to-end campaign coordination", icon: ClipboardList },
      { name: "Political PR & Branding", desc: "Image building and media relations", icon: PenTool },
      { name: "Speech Writing & Narrative", desc: "Compelling political messaging", icon: MessageSquare },
      { name: "Opposition Analysis", desc: "Competitive intelligence and strategy", icon: Search },
    ],
  },
  {
    title: "Digital Services",
    description: "Modern digital campaign solutions for maximum reach",
    icon: Globe,
    items: [
      { name: "Social Media Campaigns", desc: "Facebook, Instagram, YouTube, WhatsApp", icon: Smartphone },
      { name: "Political Ads Management", desc: "Targeted advertising campaigns", icon: TrendingUp },
      { name: "Candidate Website & App", desc: "Digital presence development", icon: Globe },
      { name: "Video Reels & Short Films", desc: "Viral content creation", icon: Video },
    ],
  },
  {
    title: "Ground Operations",
    description: "On-the-ground execution and voter engagement",
    icon: Users,
    items: [
      { name: "Booth Management", desc: "Polling station coordination", icon: MapPin },
      { name: "Panna Pramukh Planning", desc: "Page-level voter tracking", icon: ClipboardList },
      { name: "Volunteer Management", desc: "Campaign workforce coordination", icon: Users },
      { name: "Door-to-Door Campaign", desc: "Direct voter outreach programs", icon: DoorOpen },
    ],
  },
  {
    title: "Survey & Data",
    description: "Data-driven insights for informed decision making",
    icon: BarChart3,
    items: [
      { name: "Voter Survey", desc: "Comprehensive voter preference analysis" },
      { name: "Issue-Based Survey", desc: "Key issue identification and tracking" },
      { name: "Feedback & Sentiment Analysis", desc: "Real-time public opinion monitoring" },
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="pt-32 md:pt-36 pb-12 relative"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/85" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-primary-foreground/70 text-base md:text-lg">
              From strategic planning to ground-level execution, we offer a complete 
              suite of election consulting services designed to maximize your electoral success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <div className="space-y-12">
            {serviceCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <category.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="p-4 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-brand-sm transition-all duration-300"
                    >
                      <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12 pt-8 border-t border-border"
          >
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              Need a Custom Solution?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get Custom Proposal
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline">View Packages</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
