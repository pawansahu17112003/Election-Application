import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Contact", path: "/contact" },
  ],
  legal: [
    { name: "Disclaimer", path: "/legal#disclaimer" },
    { name: "Privacy Policy", path: "/legal#privacy" },
    { name: "Terms & Conditions", path: "/legal#terms" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/image.png" alt="SAARTHAK" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-display text-xl font-bold text-primary-foreground">
                SAARTHAK
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              An independent election consulting and campaign management company. Services provided in compliance with Indian election laws.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:service@saarthak.org" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail size={14} />
                service@saarthak.org
              </a>
              <a href="tel:9540445504" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                <Phone size={14} />
                9540445504
              </a>
              <span className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin size={14} />
                New Delhi, India
              </span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Company</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Legal</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpline */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Helpline</h4>
            <a 
              href="tel:9540445504" 
              className="flex items-center gap-2 text-2xl font-bold text-accent hover:text-accent/80 transition-colors"
            >
              <Phone size={24} />
              9540445504
            </a>
            <p className="text-sm text-primary-foreground/60 mt-2">
              Available Mon-Sat, 9 AM - 6 PM
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} SAARTHAK. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-sm text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors">
              Admin
            </Link>
            <span className="text-primary-foreground/30">|</span>
            <p className="text-xs text-primary-foreground/40 text-center md:text-right">
              Not a political party. We do not guarantee election results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
