// HPI 1.7-G
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, BookOpen, Eye, Lightbulb, FileText, ChevronDown, Grid, Activity, Layers, MoveRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// --- Types & Interfaces ---

interface ModuleItem {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: React.ElementType;
  imagePlaceholder: string;
}

// --- Canonical Data Sources ---

const MODULES: ModuleItem[] = [
  {
    id: "01",
    title: "Conceptual Foundations",
    description: "Explore the core concepts of PCA with clear visual explanations and step-by-step theory. Understand variance, projection, and dimensionality reduction intuitively.",
    link: "/concepts",
    icon: BookOpen,
    imagePlaceholder: "https://static.wixstatic.com/media/9e5232_74405d78916645629ac8f8f874904702~mv2.png?originWidth=576&originHeight=384"
  },
  {
    id: "02",
    title: "Mathematical Breakdown",
    description: "Follow detailed mathematical derivations with interactive elements. From covariance matrices to eigendecomposition, master the linear algebra behind the algorithm.",
    link: "/mathematical-breakdown",
    icon: Calculator,
    imagePlaceholder: "https://static.wixstatic.com/media/9e5232_5a552a6a5fb2452d86d515d19ff95cba~mv2.png?originWidth=576&originHeight=384"
  },
  {
    id: "03",
    title: "Interactive Calculators",
    description: "Input your own data. Use powerful calculators for covariance matrices, eigenvalues, and complete PCA transformations to see the math in real-time.",
    link: "/calculators",
    icon: Activity,
    imagePlaceholder: "https://static.wixstatic.com/media/9e5232_634138f0e46b4dc7a5f9ef60158a2a9c~mv2.png?originWidth=576&originHeight=384"
  },
  {
    id: "04",
    title: "Visual Demonstrations",
    description: "Interact with rich visualizations showing PCA in action. Manipulate 3D point clouds and observe how principal components align with maximum variance.",
    link: "/visualizations",
    icon: Eye,
    imagePlaceholder: "https://static.wixstatic.com/media/9e5232_7319f32a254b4dca8489cbfc402f37eb~mv2.png?originWidth=576&originHeight=384"
  },
  {
    id: "05",
    title: "Real-World Examples",
    description: "Discover practical applications of PCA across various domains, from image compression and facial recognition to genomic data analysis.",
    link: "/examples",
    icon: Lightbulb,
    imagePlaceholder: "https://static.wixstatic.com/media/9e5232_e95335727e544390b62ebdf770ace81e~mv2.png?originWidth=576&originHeight=384"
  },
  {
    id: "06",
    title: "Reference Materials",
    description: "Access downloadable cheat sheets, academic papers, and additional learning resources to support your ongoing study of dimensionality reduction.",
    link: "/references",
    icon: FileText,
    imagePlaceholder: "https://static.wixstatic.com/media/9e5232_abe6333fdeea473a9df93d2d0754a8d4~mv2.png?originWidth=576&originHeight=384"
  }
];

// --- Components ---

const AnimatedGridBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
    </div>
  );
};

const PCAVisualization = () => {
  // A simplified, aesthetic representation of PCA: Points finding a line
  const points = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: 50 + Math.random() * 300,
    y: 100 + Math.random() * 100 + (Math.random() * 40 - 20), // Slight correlation
    delay: i * 0.02
  }));

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-grey100/50 border border-grey200 rounded-sm">
      <svg className="w-full h-full absolute inset-0" viewBox="0 0 400 300">
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E0E0E0" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
        
        {/* The Principal Component Line */}
        <motion.line
          x1="0" y1="150" x2="400" y2="150"
          stroke="#007AFF"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: 1 }}
        />

        {/* Data Points */}
        {points.map((p) => (
          <motion.g key={p.id}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="3"
              fill="#101010"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, delay: p.delay }}
            />
            {/* Projection Lines (The "Error" being minimized) */}
            <motion.line
              x1={p.x} y1={p.y} x2={p.x} y2={150}
              stroke="#000"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1, delay: 2 + p.delay }}
            />
          </motion.g>
        ))}
      </svg>
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-mono text-grey500 border border-grey200">
        FIG 1.0 — VARIANCE MAXIMIZATION
      </div>
    </div>
  );
};

const SectionHeading = ({ number, title, className = "" }: { number: string, title: string, className?: string }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <span className="font-mono text-xs text-accent-link tracking-widest uppercase">{number}</span>
    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary tracking-tight">{title}</h2>
    <div className="h-px w-12 bg-primary mt-4" />
  </div>
);

const ModuleCard = ({ item, index }: { item: ModuleItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Link to={item.link} className="group block h-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative h-full bg-white border border-grey200 p-8 md:p-10 flex flex-col transition-all duration-500 hover:border-accent-link hover:shadow-lg hover:-translate-y-1"
      >
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
          <ArrowRight className="w-6 h-6 text-accent-link -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
        </div>

        <div className="mb-8">
          <span className="font-mono text-sm text-grey400 mb-4 block">{item.id}</span>
          <item.icon className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
          <h3 className="font-heading text-2xl text-primary mb-3 group-hover:text-accent-link transition-colors">
            {item.title}
          </h3>
          <p className="font-paragraph text-grey600 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="mt-auto pt-8 border-t border-grey100 flex items-center text-sm font-medium text-primary group-hover:text-accent-link transition-colors">
          <span className="mr-2">Explore Module</span>
          <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </motion.div>
    </Link>
  );
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, 50]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-grey200 selection:text-black overflow-clip">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-center overflow-hidden">
        <AnimatedGridBackground />
        
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16 relative z-10 h-full flex flex-col justify-center">
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="grid grid-cols-12 gap-8 items-center"
          >
            <div className="col-span-12 lg:col-span-7 pr-0 lg:pr-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block py-1 px-3 border border-grey300 rounded-full text-xs font-mono text-grey600 mb-6 bg-white/50 backdrop-blur-sm">
                  INTERACTIVE LEARNING PLATFORM v1.0
                </span>
                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-primary leading-[0.9] mb-8">
                  The Zen <br />
                  <span className="text-grey400">of Data.</span>
                </h1>
                <p className="font-paragraph text-xl md:text-2xl text-grey600 max-w-2xl leading-relaxed mb-10">
                  Master Principal Component Analysis through a serene, intuitive interface. 
                  Reduce dimensionality. Maximize variance. Find clarity in the noise.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/concepts"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-white overflow-hidden rounded-sm transition-all hover:bg-accent-link"
                  >
                    <span className="relative z-10 font-medium flex items-center">
                      Start Learning <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link 
                    to="/calculators"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-grey300 text-primary hover:bg-grey100 hover:border-grey400 transition-all rounded-sm font-medium"
                  >
                    Try Calculators
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="col-span-12 lg:col-span-5 mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/3] w-full shadow-2xl shadow-grey200/50"
              >
                <PCAVisualization />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-grey400">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 text-grey400 animate-bounce" />
        </motion.div>
      </section>

      {/* --- MANIFESTO SECTION (Sticky Side Layout) --- */}
      <section className="relative w-full py-32 bg-grey100 border-t border-grey200">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-12 gap-12 lg:gap-24">
            {/* Sticky Title */}
            <div className="col-span-12 lg:col-span-4 relative">
              <div className="lg:sticky lg:top-32">
                <SectionHeading number="01" title="Why Learn PCA?" />
                <div className="hidden lg:block mt-12">
                  <div className="w-full aspect-square bg-white border border-grey200 p-8 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                     <div className="w-32 h-32 border border-primary rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent-link rounded-full" />
                     </div>
                  </div>
                  <p className="mt-4 text-xs font-mono text-grey500">DIMENSIONALITY REDUCTION VISUALIZED</p>
                </div>
              </div>
            </div>

            {/* Scrolling Content */}
            <div className="col-span-12 lg:col-span-8">
              <div className="prose prose-xl max-w-none">
                <p className="font-paragraph text-2xl md:text-3xl leading-relaxed text-primary font-light mb-12">
                  In a world drowning in data, <span className="text-accent-link font-normal">clarity is power</span>. 
                  Principal Component Analysis is not just an algorithm; it is a lens through which we can view high-dimensional chaos and extract structured order.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <div className="bg-white p-8 border-l-2 border-accent-link">
                    <h3 className="font-heading text-lg font-bold mb-3">Dimensionality Reduction</h3>
                    <p className="text-base text-grey600">Simplify complex datasets while retaining the most critical information. Turn 100 variables into 3 meaningful components.</p>
                  </div>
                  <div className="bg-white p-8 border-l-2 border-grey300">
                    <h3 className="font-heading text-lg font-bold mb-3">Noise Filtering</h3>
                    <p className="text-base text-grey600">Separate the signal from the noise. PCA helps identify the underlying structure of your data by ignoring random variance.</p>
                  </div>
                  <div className="bg-white p-8 border-l-2 border-grey300">
                    <h3 className="font-heading text-lg font-bold mb-3">Feature Extraction</h3>
                    <p className="text-base text-grey600">Create new, uncorrelated variables that better describe your data than the original features ever could.</p>
                  </div>
                  <div className="bg-white p-8 border-l-2 border-grey300">
                    <h3 className="font-heading text-lg font-bold mb-3">Data Visualization</h3>
                    <p className="text-base text-grey600">Visualize high-dimensional data in 2D or 3D plots, making the impossible-to-see suddenly obvious.</p>
                  </div>
                </div>

                <p className="font-paragraph text-lg text-grey600 leading-relaxed">
                  Whether you are working in computer vision, genomics, finance, or social sciences, understanding PCA is the gateway to advanced machine learning techniques. It is the fundamental building block of modern data science.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTEGRATED SERVICES SECTION --- */}
      <section className="relative w-full py-32 bg-white">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-20">
            <SectionHeading number="02" title="Integrated Services" />
            <p className="mt-6 text-xl text-grey600 max-w-3xl">
              A comprehensive educational ecosystem designed for students to master Principal Component Analysis through four core pillars of learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "In-Depth Learning",
                desc: "Detailed educational content covering PCA from conceptual foundations to advanced mathematical theory.",
                link: "/concepts",
                tag: "LEARN"
              },
              {
                icon: Activity,
                title: "PCA Calculator",
                desc: "Integrated, step-by-step calculator for covariance matrices, eigenvalues, and full PCA transformations.",
                link: "/calculators",
                tag: "COMPUTE"
              },
              {
                icon: FileText,
                title: "Cheat Sheets",
                desc: "High-quality reference materials and condensed notes for quick review of key PCA formulas and concepts.",
                link: "/references",
                tag: "REFERENCE"
              },
              {
                icon: Layers,
                title: "Real-World Simulations",
                desc: "Dynamic simulations and applications showing PCA in action across various domains and industries.",
                link: "/visualizations",
                tag: "VISUALIZE"
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 bg-grey50 border border-grey200 rounded-sm hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary text-white flex items-center justify-center mb-6 rounded-sm group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-accent-link tracking-[0.2em] mb-4 block uppercase font-bold">{service.tag}</span>
                <h3 className="font-heading text-xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-grey600 text-sm leading-relaxed mb-8">{service.desc}</p>
                <Link to={service.link} className="inline-flex items-center text-sm font-medium text-primary hover:text-accent-link transition-colors">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Link 
               to="/services" 
               className="inline-flex items-center gap-2 text-grey500 hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest"
             >
               View All Service Details <MoveRight className="w-4 h-4" />
             </Link>
          </div>
        </div>
      </section>

      {/* --- MODULES GRID (Bento / Masonry Style) --- */}
      <section className="relative w-full py-32 bg-white">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-24 max-w-3xl">
            <SectionHeading number="03" title="Curriculum Modules" />
            <p className="mt-6 text-xl text-grey600">
              A structured approach to mastering PCA. From theory to application, explore our comprehensive learning modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            {MODULES.map((module, idx) => (
              <div 
                key={module.id} 
                className={`${idx === 0 || idx === 3 ? 'md:col-span-2' : 'col-span-1'}`}
              >
                <ModuleCard item={module} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VISUAL BREATHER / PARALLAX --- */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center bg-grey900 text-white">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://static.wixstatic.com/media/9e5232_3d38b187ba3c4993b39884920cd80610~mv2.png?originWidth=1280&originHeight=704" 
             alt="Abstract Data Texture" 
             className="w-full h-full object-cover opacity-30 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-grey900/50 via-transparent to-grey900/90" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              See the Math Come Alive
            </h2>
            <p className="font-paragraph text-xl md:text-2xl text-grey300 mb-12 font-light">
              Don't just memorize formulas. Experience the transformation of data through our interactive visualizers.
            </p>
            <Link 
              to="/visualizations"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-black font-medium rounded-sm hover:bg-grey200 transition-colors"
            >
              Launch Visualizer <Eye className="ml-3 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- RESOURCES TEASER --- */}
      <section className="w-full py-32 bg-background border-t border-grey200">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading number="04" title="Academic Resources" />
              <p className="mt-6 text-lg text-grey600 mb-8 leading-relaxed">
                We provide a curated collection of reference materials for students and educators. 
                Download cheat sheets, access raw datasets for practice, and explore seminal papers on Principal Component Analysis.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Linear Algebra Prerequisites Cheat Sheet",
                  "Step-by-Step PCA Implementation Guide (Python/R)",
                  "Standardized Datasets (Iris, Wine, MNIST)",
                  "Bibliography of Core Research Papers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-primary border-b border-grey100 pb-4">
                    <div className="w-1.5 h-1.5 bg-accent-link rounded-full mr-4" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                to="/references"
                className="text-accent-link font-medium hover:text-accent-hover inline-flex items-center group"
              >
                Access Library <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="relative h-[500px] bg-grey100 border border-grey200 p-8 flex flex-col justify-between overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-grey200 to-transparent rounded-bl-full opacity-50 transition-transform duration-700 group-hover:scale-110" />
              
              <div className="relative z-10">
                <FileText className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-heading text-3xl text-primary mb-2">Cheat Sheet</h3>
                <p className="text-grey500">PDF • 2.4 MB</p>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="w-full h-48 bg-white shadow-sm border border-grey200 p-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-2 bg-grey100 mb-3" />
                  <div className="w-3/4 h-2 bg-grey100 mb-3" />
                  <div className="w-full h-2 bg-grey100 mb-3" />
                  <div className="w-1/2 h-2 bg-grey100 mb-8" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 bg-grey100" />
                    <div className="h-12 bg-grey100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}