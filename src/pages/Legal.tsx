import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Lock } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const legalContent = {
  disclaimer: {
    title: "Disclaimer",
    icon: Shield,
    lastUpdated: "January 2024",
    content: `
## Important Legal Notice

SAARTHAK is an independent election consulting and campaign management company. We operate in full compliance with the laws of India, including the Representation of the People Act, 1951, and guidelines issued by the Election Commission of India (ECI).

### Not a Political Party

SAARTHAK is NOT a political party, nor is it affiliated with any political party, organization, or candidate. We provide professional consulting services on a commercial basis to candidates and political parties across the political spectrum.

### No Guarantee of Results

We explicitly state that:

- **We do not guarantee election results.** Electoral success depends on numerous factors including candidate merit, public perception, prevailing political conditions, and voter decisions.
- **We do not solicit votes** on behalf of any candidate or party.
- **We do not represent the Election Commission of India (ECI)** or any governmental body.

### Nature of Services

All services provided by SAARTHAK are:

1. **Advisory and strategic in nature** - We provide recommendations, strategies, and professional guidance
2. **Legally compliant** - All activities are conducted within the framework of Indian election laws
3. **Independent** - Our services are provided without any political bias or affiliation
4. **Professional** - We maintain the highest standards of professional conduct

### Client Responsibility

Clients engaging our services acknowledge that they are responsible for ensuring their campaign activities comply with applicable laws. Final decisions regarding campaign strategy and execution rest with the client.

For any concerns or clarifications, please contact our legal team at legal@saarthak.in.
    `,
  },
  privacy: {
    title: "Privacy Policy",
    icon: Lock,
    lastUpdated: "January 2024",
    content: `
## Privacy Policy

At SAARTHAK, we are committed to protecting your privacy and handling your personal information with care and transparency.

### Information We Collect

We collect information that you provide directly to us, including:

- **Contact Information**: Name, email address, phone number, mailing address
- **Campaign Information**: Details about your candidacy, constituency, and campaign requirements
- **Communication Records**: Correspondence with our team

### How We Use Your Information

Your information is used to:

1. Provide and improve our consulting services
2. Communicate with you about our services
3. Process your inquiries and requests
4. Comply with legal obligations

### Data Security

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

### Information Sharing

We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist in our operations under strict confidentiality.

### Your Rights

You have the right to access your personal information, correct inaccurate data, request deletion of your data, and withdraw consent for data processing.

### Contact Us

For privacy-related inquiries: privacy@saarthak.in
    `,
  },
  terms: {
    title: "Terms & Conditions",
    icon: FileText,
    lastUpdated: "January 2024",
    content: `
## Terms & Conditions

These Terms and Conditions govern your use of SAARTHAK's services and website.

### 1. Services Agreement

The specific scope of services will be defined in a separate Service Agreement for each engagement. Any changes to agreed services must be documented in writing.

### 2. Fees and Payment

Service fees are quoted based on project scope and requirements. Pricing is customized for each client. Payment schedules will be specified in the Service Agreement.

### 3. Intellectual Property

All strategies, methodologies, tools, and materials developed by SAARTHAK remain our intellectual property. Clients retain ownership of their pre-existing materials and data.

### 4. Confidentiality

Both parties agree to maintain strict confidentiality of all non-public information shared during the engagement. This obligation survives the termination of services.

### 5. Legal Compliance

All services are provided in compliance with Indian election laws and ECI guidelines. Clients are responsible for ensuring their campaign activities comply with all applicable laws.

### 6. Limitation of Liability

We do not guarantee election outcomes. Our liability is limited to the fees paid for the specific service in question.

### 7. Governing Law

These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi.

For questions about these terms: legal@saarthak.in
    `,
  },
};

const Legal = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("disclaimer");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && legalContent[hash as keyof typeof legalContent]) {
      setActiveTab(hash);
    }
  }, [location]);

  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-display font-bold text-foreground mt-6 mb-4">{line.replace('## ', '')}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-display font-semibold text-foreground mt-4 mb-2">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('- **')) {
          const match = line.match(/- \*\*(.+?)\*\*(.+)/);
          if (match) {
            return <li key={index} className="flex items-start gap-2 text-muted-foreground mb-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" /><span><strong className="text-foreground">{match[1]}</strong>{match[2]}</span></li>;
          }
        }
        if (line.match(/^\d+\. \*\*/)) {
          const match = line.match(/^\d+\. \*\*(.+?)\*\*(.+)/);
          if (match) {
            return <li key={index} className="flex items-start gap-2 text-muted-foreground mb-2"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" /><span><strong className="text-foreground">{match[1]}</strong>{match[2]}</span></li>;
          }
        }
        if (line.trim() === '') return null;
        return <p key={index} className="text-muted-foreground mb-3">{line}</p>;
      });
  };

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
              Legal & <span className="text-accent">Compliance</span>
            </h1>
            <p className="text-primary-foreground/70 text-base md:text-lg">
              Transparency and compliance are at the core of our operations. 
              Review our legal policies and terms of service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-xl mx-auto grid grid-cols-3 mb-8 bg-muted/50 p-1.5 rounded-xl">
              {Object.entries(legalContent).map(([key, content]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-brand-sm rounded-lg py-3"
                >
                  <content.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{content.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(legalContent).map(([key, content]) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-card rounded-2xl border border-border shadow-brand-sm p-6 md:p-10">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <content.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">{content.title}</h2>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {content.lastUpdated}
                        </p>
                      </div>
                    </div>
                    
                    <div className="prose-sm">
                      {renderContent(content.content)}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Legal;
