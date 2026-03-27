import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/lib/mock-service';
import { VisualDemonstrations } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink } from 'lucide-react';
import InteractivePCAVisualization from '@/components/visualizations/InteractivePCAVisualization';

export default function VisualizationsPage() {
  const [demonstrations, setDemonstrations] = useState<VisualDemonstrations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDemonstrations();
  }, []);

  const loadDemonstrations = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<VisualDemonstrations>('visualdemonstrations');
    setDemonstrations(result.items);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-6">
            Visual Demonstrations
          </h1>
          <p className="font-paragraph text-xl text-foreground max-w-4xl leading-relaxed">
            Interact with rich visualizations that bring PCA to life. Manipulate data points, 
            observe principal components, and understand how dimensionality reduction works in real-time.
          </p>
        </motion.div>
      </section>

      {/* Interactive Visualization */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-24">
        <InteractivePCAVisualization />
      </section>

      {/* Demonstrations from CMS */}
      {!isLoading && demonstrations.length > 0 && (
        <section className="w-full bg-grey100 py-24">
          <div className="max-w-[100rem] mx-auto px-8">
            <h2 className="font-heading text-4xl text-primary mb-12">
              Available Demonstrations
            </h2>
            
            <div className="grid grid-cols-12 gap-8">
              {demonstrations.map((demo, index) => (
                <motion.div
                  key={demo._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <div className="bg-background rounded p-6 h-full">
                    {demo.previewImage && (
                      <div className="mb-4 bg-grey100 rounded overflow-hidden h-48">
                        <Image
                          src={demo.previewImage}
                          alt={demo.demonstrationTitle || 'Demonstration'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-heading text-xl text-primary">
                        {demo.demonstrationTitle}
                      </h3>
                      {demo.complexityLevel && (
                        <span className="font-paragraph text-xs text-grey400 px-2 py-1 bg-grey100 rounded">
                          {demo.complexityLevel}
                        </span>
                      )}
                    </div>
                    
                    {demo.demoType && (
                      <p className="font-paragraph text-sm text-grey400 mb-3">
                        Type: {demo.demoType}
                      </p>
                    )}
                    
                    {demo.instructions && (
                      <p className="font-paragraph text-base text-foreground leading-relaxed mb-4">
                        {demo.instructions}
                      </p>
                    )}
                    
                    {demo.demoUrl && (
                      <a
                        href={demo.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-paragraph text-base text-accent-link hover:text-accent-hover transition-colors"
                      >
                        Launch Demo
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visualization Tips */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl text-primary mb-8">
            Understanding the Visualizations
          </h2>
          
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <h3 className="font-heading text-xl text-primary mb-4">
                Data Points
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Blue dots represent individual data points in the original feature space. 
                Observe how they cluster and spread across different dimensions.
              </p>
            </div>
            
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <h3 className="font-heading text-xl text-primary mb-4">
                Principal Components
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Black and grey arrows show the principal component directions. 
                PC1 (black) captures maximum variance, PC2 (grey) captures the next most.
              </p>
            </div>
            
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <h3 className="font-heading text-xl text-primary mb-4">
                Projection
              </h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Watch how data projects onto principal components. This demonstrates 
                dimensionality reduction while preserving the most important information.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
