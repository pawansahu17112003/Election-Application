import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "SERVICE", path: "/services" },
  { name: "LEGAL", path: "/legal" },
  { name: "PACKAGES", path: "/packages" },
  { name: "ABOUT US", path: "/about" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-brand-md" : "shadow-brand-sm"}`}>
      {/* Logo Section */}

      <nav className="container-custom">
        {/* First Line - Logo */}
        <div className="relative flex items-center py-3">
          <Link to="/" className="absolute left-0 flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-brand-md group-hover:shadow-brand-lg transition-shadow duration-300 overflow-hidden">
              <img 
                src="/image.png" 
                alt="SAARTHAK Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <Link to="/" className="mx-auto">
            <span className="font-display text-3xl md:text-4xl font-bold text-foreground">
              SAARTHAK
            </span>
          </Link>
        </div>

        {/* Second Line - Navigation Links */}
        <div className="flex items-center justify-center flex-wrap gap-2 md:gap-6 lg:gap-10 py-2 md:py-3 border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-semibold text-sm md:text-base lg:text-lg tracking-wide transition-colors duration-300 py-1 px-1 md:px-2 ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
