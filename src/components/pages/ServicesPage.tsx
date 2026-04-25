import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, FileText, Activity, ArrowRight, CheckCircle2, Zap, GraduationCap, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, features, link, color }: { 
  icon: any, 
  title: string, 
  description: string, 
  features: string[],
  link: string,
  color: string
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-white border border-grey200 p-8 rounded-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
  >
    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors duration-500 ${color}`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="font-heading text-2xl text-primary mb-4 group-hover:text-accent-link transition-colors">{title}</h3>
    <p className="font-paragraph text-grey600 mb-8 leading-relaxed">{description}</p>
    
    <ul className="space-y-3 mb-10 mt-auto">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-grey500">
          <CheckCircle2 className="w-4 h-4 text-accent-link shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <Link 
      to={link} 
      className="inline-flex items-center text-primary font-medium group-hover:text-accent-link transition-colors"
    >
      Explore {title} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

export default function ServicesPage() {
  const services = [
    {
      icon: BookOpen,
      title: "Comprehensive Learning",
      description: "Dive deep into PCA with structured modules designed for students. From intuition to advanced theory, we cover it all.",
      features: [
        "Step-by-step conceptual guides",
        "Mathematical derivations simplified",
        "Interactive proof explorations",
        "Self-assessment quizzes"
      ],
      link: "/concepts",
      color: "bg-blue-600"
    },
    {
      icon: Calculator,
      title: "Integrated PCA Calculator",
      description: "Compute covariance matrices, eigenvalues, and principal components instantly with our powerful, transparent calculator.",
      features: [
        "Real-time step-by-step calculations",
        "Custom dataset upload support",
        "Matrix visualization tools",
        "Export results to CSV/JSON"
      ],
      link: "/calculators",
      color: "bg-purple-600"
    },
    {
      icon: FileText,
      title: "Expert Cheat Sheets",
      description: "Quick reference materials and condensed notes to help you master PCA concepts and formulas for exams or research.",
      features: [
        "High-resolution PDF downloads",
        "Key formula summaries",
        "Algorithm workflow diagrams",
        "Common pitfalls & tips"
      ],
      link: "/references",
      color: "bg-emerald-600"
    },
    {
      icon: Activity,
      title: "Real-World Simulations",
      description: "Experience PCA in action through interactive simulations. Visualize how dimensionality reduction works on real datasets.",
      features: [
        "3D point cloud projections",
        "Image compression demos",
        "Feature extraction simulations",
        "Dynamic variance plots"
      ],
      link: "/visualizations",
      color: "bg-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-grey100 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#007AFF_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>
        
        <div className="max-w-[100rem] mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-xs text-accent-link uppercase tracking-[0.3em] mb-6 block">Our Offerings</span>
            <h1 className="font-heading text-6xl md:text-7xl text-primary font-bold tracking-tight mb-8">
              Educational Services for <span className="text-accent-link">Future Data Scientists</span>
            </h1>
            <p className="font-paragraph text-xl text-grey600 leading-relaxed mb-0">
              PCAcademy provides a complete ecosystem for mastering Principal Component Analysis. 
              Our integrated tools and resources are crafted specifically for students to learn PCA in detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Impact Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-1">
              <h2 className="font-heading text-4xl font-bold mb-6">Designed by Students, For Students.</h2>
              <p className="text-grey300 text-lg">
                We understand the learning curve. That's why every service we offer is built with clarity and intuition as the top priority.
              </p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold text-accent-link">100%</div>
                <div className="text-sm text-grey400 uppercase tracking-widest">Free to Use</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold text-accent-link">Step-by-Step</div>
                <div className="text-sm text-grey400 uppercase tracking-widest">Mathematical Proofs</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-4xl font-bold text-accent-link">24/7</div>
                <div className="text-sm text-grey400 uppercase tracking-widest">Access to Library</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-grey100 border-t border-grey200 text-center">
        <div className="max-w-4xl mx-auto px-8">
          <GraduationCap className="w-16 h-16 text-accent-link mx-auto mb-8" />
          <h2 className="font-heading text-4xl md:text-5xl text-primary font-bold mb-6">Ready to start your journey?</h2>
          <p className="font-paragraph text-xl text-grey600 mb-12">
            Join thousands of students who have mastered dimensionality reduction through our platform.
          </p>
          <Link 
            to="/concepts" 
            className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white font-medium rounded-sm hover:bg-accent-link transition-all shadow-xl hover:shadow-accent-link/20"
          >
            Start Learning Now <Zap className="ml-3 w-5 h-5 fill-current" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
