import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Presentation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/concepts', label: 'Concepts' },
    { path: '/mathematical-breakdown', label: 'Mathematics' },
    { path: '/calculators', label: 'Calculators' },
    { path: '/visualizations', label: 'Visualizations' },
    { path: '/examples', label: 'Examples' },
    { path: '/references', label: 'References' },
  ];

  const togglePresentationMode = () => {
    setPresentationMode(!presentationMode);
    if (!presentationMode) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <header className="w-full bg-background border-b border-grey200 sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl text-primary font-semibold">
            PCA Education
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-paragraph text-base transition-colors ${
                  location.pathname === item.path
                    ? 'text-accent-link font-medium'
                    : 'text-foreground hover:text-accent-link'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Presentation Mode Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePresentationMode}
              className="inline-flex items-center justify-center p-2 rounded hover:bg-grey100 transition-colors"
              aria-label="Toggle presentation mode"
            >
              <Presentation className={`h-5 w-5 ${presentationMode ? 'text-accent-link' : 'text-foreground'}`} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded hover:bg-grey100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 pt-6 border-t border-grey200"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-paragraph text-base transition-colors ${
                      location.pathname === item.path
                        ? 'text-accent-link font-medium'
                        : 'text-foreground hover:text-accent-link'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
