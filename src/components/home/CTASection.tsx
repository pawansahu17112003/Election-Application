import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm font-medium mb-6"
          >
            Start Your Campaign Journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-section text-primary-foreground mb-6"
          >
            Ready to Transform Your{" "}
            <span className="text-accent">Electoral Strategy?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-primary-foreground/70 mb-10 max-w-2xl mx-auto"
          >
            Book a confidential consultation with our expert strategists. 
            We'll analyze your constituency and create a winning roadmap.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/contact">
              <Button size="lg" className="btn-accent group">
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/packages">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                View Packages
              </Button>
            </Link>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8 border-t border-primary-foreground/10"
          >
            <a href="tel:+919540445504" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-medium">+91 95404 45504</span>
            </a>
            <a href="mailto:service@saarthak.org" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-medium">service@saarthak.org</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
