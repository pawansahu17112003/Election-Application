import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const packages = [
  {
    name: "Starter Campaign",
    subtitle: "For Panchayat & Local Elections",
    description: "Essential campaign setup for grassroots level elections with compliance-oriented advisory.",
    popular: false,
    features: [
      "Basic campaign strategy development",
      "Digital presence setup",
      "Social media starter kit",
      "Compliance advisory",
      "Basic voter outreach plan",
      "Post-election analysis report",
    ],
  },
  {
    name: "Standard Campaign",
    subtitle: "For Nagar Palika / Nagar Nigam",
    description: "Comprehensive digital and ground-level campaign execution with surveys and branding.",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Full digital campaign management",
      "Ground-level execution support",
      "Voter survey & analysis",
      "Political PR & branding",
      "Booth management planning",
      "Weekly performance reviews",
      "Dedicated campaign manager",
    ],
  },
  {
    name: "Premium War Room",
    subtitle: "For Vidhan Sabha & Lok Sabha",
    description: "End-to-end campaign management with 24/7 war room support and real-time analytics.",
    popular: false,
    features: [
      "Everything in Standard, plus:",
      "24/7 Digital War Room",
      "Real-time analytics dashboard",
      "Opposition monitoring",
      "Rapid response team",
      "Multi-platform ad campaigns",
      "Volunteer management system",
      "Crisis management protocol",
      "Post-election audit & report",
    ],
  },
  {
    name: "Custom Campaign",
    subtitle: "Tailored to Your Needs",
    description: "Fully customized campaign solution designed around your specific requirements and goals.",
    popular: false,
    features: [
      "Flexible scope & timeline",
      "À la carte service selection",
      "Dedicated strategy team",
      "Custom reporting structure",
      "Scalable resource allocation",
      "Direct leadership access",
    ],
    isCustom: true,
  },
];

const Packages = () => {
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
              Campaign <span className="text-accent">Packages</span>
            </h1>
            <p className="text-primary-foreground/70 text-base md:text-lg">
              Select a package that matches your election level and campaign goals. 
              All packages can be customized to your specific needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-6 ${
                  pkg.popular
                    ? "bg-primary text-primary-foreground shadow-brand-elevated ring-2 ring-accent"
                    : pkg.isCustom
                    ? "bg-gradient-to-br from-cream to-background border-2 border-dashed border-accent/50"
                    : "bg-card border border-border shadow-brand-md"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                <div className="mb-5">
                  <h3 className={`font-display text-xl font-bold mb-1 ${pkg.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    {pkg.name}
                  </h3>
                  <p className="text-sm font-medium text-accent mb-3">
                    {pkg.subtitle}
                  </p>
                  <p className={`text-sm leading-relaxed ${pkg.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className="mb-6">
                  <p className={`text-xs font-medium mb-3 ${pkg.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    What's included:
                  </p>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.popular ? "text-accent" : "text-accent"}`} />
                        <span className={pkg.popular ? "text-primary-foreground/90" : "text-foreground/80"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact">
                  <Button
                    className={`w-full ${
                      pkg.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {pkg.isCustom ? "Request Quote" : "Get Started"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Important Disclaimer
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pricing is customized based on election level, constituency size, campaign duration, 
                  and specific requirements. All services are provided in strict compliance with Indian 
                  election laws and ECI guidelines. We do not guarantee election results.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Packages;
