import { Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-grey100 border-t border-grey200 py-16">
      <div className="max-w-[100rem] mx-auto px-8">
        <div className="grid grid-cols-12 gap-8">
          {/* About Section */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <h3 className="font-heading text-xl text-primary mb-4">
              PCA Education
            </h3>
            <p className="font-paragraph text-base text-foreground leading-relaxed">
              An interactive educational platform for mastering Principal Component Analysis 
              through visual demonstrations and hands-on learning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <h3 className="font-heading text-xl text-primary mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/concepts" 
                className="font-paragraph text-base text-foreground hover:text-accent-link transition-colors"
              >
                Conceptual Foundations
              </Link>
              <Link 
                to="/calculators" 
                className="font-paragraph text-base text-foreground hover:text-accent-link transition-colors"
              >
                Interactive Calculators
              </Link>
              <Link 
                to="/visualizations" 
                className="font-paragraph text-base text-foreground hover:text-accent-link transition-colors"
              >
                Visual Demonstrations
              </Link>
              <Link 
                to="/references" 
                className="font-paragraph text-base text-foreground hover:text-accent-link transition-colors"
              >
                Reference Materials
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="col-span-12 lg:col-span-4">
            <h3 className="font-heading text-xl text-primary mb-4">
              Resources
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="font-paragraph text-base text-accent-link hover:text-accent-hover transition-colors inline-flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  alert('PCA Cheat Sheet download would be available here');
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PCA Cheat Sheet
              </a>
              <Link
                to="/references"
                className="font-paragraph text-base text-accent-link hover:text-accent-hover transition-colors inline-flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Academic References
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-grey200">
          <p className="font-paragraph text-sm text-grey400 text-center">
            © {new Date().getFullYear()} PCA Education. Educational resource for college-level students.
          </p>
        </div>
      </div>
    </footer>
  );
}
