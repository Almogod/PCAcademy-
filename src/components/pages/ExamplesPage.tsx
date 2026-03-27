import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/lib/mock-service';
import { RealWorldExamples } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ExamplesPage() {
  const [examples, setExamples] = useState<RealWorldExamples[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExamples();
  }, []);

  const loadExamples = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<RealWorldExamples>('realworldexamples');
    setExamples(result.items);
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
            Real-World Examples
          </h1>
          <p className="font-paragraph text-xl text-foreground max-w-4xl leading-relaxed">
            Discover how Principal Component Analysis is applied across various domains and industries. 
            From computer vision to genomics, PCA solves real problems in data science and research.
          </p>
        </motion.div>
      </section>

      {/* Examples Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-24">
        <div className="min-h-[400px]">
          {isLoading ? null : examples.length > 0 ? (
            <div className="grid grid-cols-12 gap-8">
              {examples.map((example, index) => (
                <motion.article
                  key={example._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="col-span-12 lg:col-span-6"
                >
                  <div className="bg-grey100 rounded p-8 h-full">
                    {example.illustrationImage && (
                      <div className="mb-6 bg-background rounded overflow-hidden h-64">
                        <Image
                          src={example.illustrationImage}
                          alt={example.applicationTitle || 'Example'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-4">
                      {example.domainField && (
                        <span className="font-paragraph text-xs text-grey400 px-3 py-1 bg-background rounded">
                          {example.domainField}
                        </span>
                      )}
                    </div>
                    
                    <h2 className="font-heading text-2xl text-primary mb-4">
                      {example.applicationTitle}
                    </h2>
                    
                    {example.caseStudyDescription && (
                      <p className="font-paragraph text-base text-foreground leading-relaxed mb-6">
                        {example.caseStudyDescription}
                      </p>
                    )}
                    
                    {example.keyTakeaways && (
                      <div className="pt-6 border-t border-grey200">
                        <h3 className="font-heading text-sm text-primary font-medium mb-2">
                          Key Takeaways
                        </h3>
                        <p className="font-paragraph text-base text-foreground leading-relaxed">
                          {example.keyTakeaways}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-grey400">
                No examples available at this time.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Common Applications */}
      <section className="w-full bg-grey100 py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl text-primary mb-12">
              Common PCA Applications
            </h2>
            
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="p-6">
                  <h3 className="font-heading text-xl text-primary mb-4">
                    Computer Vision
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Face recognition, image compression, and feature extraction. PCA reduces 
                    high-dimensional image data while preserving essential visual information.
                  </p>
                </div>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="p-6">
                  <h3 className="font-heading text-xl text-primary mb-4">
                    Genomics
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Gene expression analysis and population genetics. PCA identifies patterns 
                    in genetic variation across thousands of genes.
                  </p>
                </div>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="p-6">
                  <h3 className="font-heading text-xl text-primary mb-4">
                    Finance
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Portfolio optimization and risk management. PCA identifies key factors 
                    driving asset returns and market movements.
                  </p>
                </div>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="p-6">
                  <h3 className="font-heading text-xl text-primary mb-4">
                    Natural Language
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Text analysis and document clustering. PCA reduces word vector dimensions 
                    while maintaining semantic relationships.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
