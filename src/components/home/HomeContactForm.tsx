import { useState } from "react";
import { motion } from "framer-motion";
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
import { Send, CheckCircle2 } from "lucide-react";
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

export const HomeContactForm = () => {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-brand-lg p-6 md:p-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Thank You!
        </h2>
        <p className="text-muted-foreground mb-6">
          Your consultation request has been received. Our team will contact 
          you within 24 hours to discuss your campaign needs.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white rounded-lg shadow-brand-lg p-6 md:p-8"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">REQUEST CONSULTATION</h2>
        <p className="text-muted-foreground">Get expert campaign guidance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              className="h-10"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="h-10"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="h-10"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="election-type" className="text-sm font-medium">Election Type</Label>
            <Select 
              value={formData.election_type} 
              onValueChange={(value) => setFormData({ ...formData, election_type: value })}
            >
              <SelectTrigger className="h-10">
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
          <Label htmlFor="organization" className="text-sm font-medium">Organization / Party Name</Label>
          <Input
            id="organization"
            placeholder="Enter organization name (optional)"
            className="h-10"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium">Tell us about your requirements</Label>
          <Textarea
            id="message"
            placeholder="Briefly describe your campaign goals, timeline, and any specific services you're interested in..."
            className="min-h-[100px] resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
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
              <Send className="ml-2 w-4 h-4" />
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
    </motion.div>
  );
};
