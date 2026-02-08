import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Shield, Users, TrendingUp, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with complete transparency and honesty in all our dealings.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest standards in every aspect of our work.",
  },
  {
    icon: Users,
    title: "Independence",
    description: "We maintain strict non-partisan stance, serving all candidates equally.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We continuously evolve our strategies to stay ahead of the curve.",
  },
];

const About = () => {
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-4">
                Your Trusted Partner in{" "}
                <span className="text-accent">Electoral Excellence</span>
              </h1>
              <p className="text-primary-foreground/70 text-base md:text-lg mb-6">
                SAARTHAK is India's leading independent election consulting firm, 
                dedicated to empowering candidates with strategic expertise, 
                data-driven insights, and ethical campaign management.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "15+", label: "Years" },
                  { value: "500+", label: "Campaigns" },
                  { value: "28", label: "States" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-display text-2xl md:text-3xl font-bold text-accent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-display font-semibold text-primary-foreground mb-4">What We Do</h3>
                <p className="text-primary-foreground/80 text-sm leading-relaxed">
                  We provide comprehensive election consulting services from Panchayat 
                  to Lok Sabha level – including strategic planning, digital campaigns, 
                  ground operations, voter surveys, and 24/7 war room support.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Who We Are
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Independent. Professional. Ethical.
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Founded with a vision to professionalize election campaign management in India, 
                  SAARTHAK brings together a team of seasoned strategists, political analysts, 
                  digital marketing experts, and ground operation specialists.
                </p>
                <p>
                  We are NOT a political party and do not affiliate with any political organization. 
                  Our services are available to candidates across the political spectrum.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value, index) => (
                <div key={index} className="p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <value.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{value.title}</h3>
                  <p className="text-xs text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-primary text-primary-foreground"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                To be India's most trusted election consulting partner, known for ethical 
                practices, innovative strategies, and consistently delivering results while 
                upholding the democratic values of our nation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border shadow-brand-md"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower candidates with professional campaign management expertise, 
                leveraging data and technology to create compelling narratives that resonate 
                with voters, while maintaining the highest standards of legal and ethical compliance.
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              Ready to Partner with Us?
            </h3>
            <Link to="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
