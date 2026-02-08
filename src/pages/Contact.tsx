import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubmitContact } from "@/hooks/useContacts";
import { z } from "zod";

const electionTypes = [
  "Panchayat",
  "Nagar Palika / Nagar Nigam",
  "Vidhan Sabha",
  "Lok Sabha",
  "Other",
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().optional(),
  organization: z.string().optional(),
  election_type: z.string().optional(),
  message: z.string().optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    election_type: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
    try {
      contactSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    try {
      await submitContact.mutateAsync({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone || null,
        organization: formData.organization || null,
        election_type: formData.election_type || null,
        message: formData.message.trim(),
      });
      
      setSubmitted(true);
      toast({
        title: "Consultation Request Received",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center py-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg px-4"
          >
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h1 className="heading-section text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              Your consultation request has been received. Our team will contact 
              you within 24 hours to discuss your campaign needs.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Submit Another Request
            </Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm font-medium mb-6">
              Get in Touch
            </span>
            <h1 className="heading-display text-primary-foreground mb-6">
              Schedule a <span className="text-accent">Consultation</span>
            </h1>
            <p className="text-body-lg text-primary-foreground/70">
              Ready to discuss your campaign? Fill out the form below and our 
              expert strategists will reach out within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <h2 className="heading-card text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Reach out through any of these channels. All inquiries are 
                  treated with strict confidentiality.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a href="tel:+919540445504" className="text-muted-foreground hover:text-accent transition-colors">
                      +91 95404 45504
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:service@saarthak.org" className="text-muted-foreground hover:text-accent transition-colors">
                      service@saarthak.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Office</h3>
                    <p className="text-muted-foreground">
                      New Delhi, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Mon - Sat: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
                <p className="text-sm text-primary-foreground/80">
                  <strong className="text-primary-foreground">Confidentiality Assured:</strong> All information 
                  shared with us is treated with utmost confidentiality and used 
                  solely for consultation purposes.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-2xl border border-border shadow-brand-md p-8 md:p-10">
                <h2 className="heading-card text-foreground mb-8">
                  Request a Consultation
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="h-12"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="h-12"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="h-12"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="election-type">Election Type</Label>
                      <Select 
                        value={formData.election_type} 
                        onValueChange={(value) => setFormData({ ...formData, election_type: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select election type" />
                        </SelectTrigger>
                        <SelectContent>
                          {electionTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization / Party Name</Label>
                    <Input
                      id="organization"
                      placeholder="Enter organization name (optional)"
                      className="h-12"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your requirements</Label>
                    <Textarea
                      id="message"
                      placeholder="Briefly describe your campaign goals, timeline, and any specific services you're interested in..."
                      className="min-h-[140px] resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full btn-accent"
                    disabled={submitContact.isPending}
                  >
                    {submitContact.isPending ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="/legal#privacy" className="text-accent hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/legal#terms" className="text-accent hover:underline">
                      Terms of Service
                    </a>
                    .
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
