import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { PCAConcepts } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function ConceptsPage() {
  const [concepts, setConcepts] = useState<PCAConcepts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConcepts();
  }, []);

  const loadConcepts = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<PCAConcepts>('pcaconcepts');
    const sorted = result.items.sort((a, b) => (a.sequenceNumber || 0) - (b.sequenceNumber || 0));
    setConcepts(sorted);
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
            Conceptual Foundations
          </h1>
          <p className="font-paragraph text-xl text-foreground max-w-4xl leading-relaxed">
            Explore the fundamental concepts that underpin Principal Component Analysis. 
            Each concept builds upon the previous, creating a comprehensive understanding 
            of how PCA transforms and reduces dimensionality in data.
          </p>
        </motion.div>
      </section>

      {/* Concepts List */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-24">
        <div className="min-h-[400px]">
          {isLoading ? null : concepts.length > 0 ? (
            <div className="space-y-16">
              {concepts.map((concept, index) => (
                <motion.article
                  key={concept._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="grid grid-cols-12 gap-8 pb-16 border-b border-grey200 last:border-b-0"
                >
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-heading text-sm text-grey400 font-medium">
                        {String(concept.sequenceNumber || index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-heading text-3xl text-primary">
                        {concept.conceptTitle}
                      </h2>
                    </div>
                    
                    <p className="font-paragraph text-lg text-foreground mb-6 leading-relaxed">
                      {concept.shortDescription}
                    </p>
                    
                    {concept.detailedExplanation && (
                      <div className="font-paragraph text-base text-foreground leading-relaxed whitespace-pre-line">
                        {concept.detailedExplanation}
                      </div>
                    )}
                  </div>
                  
                  {concept.visualAssetUrl && (
                    <div className="col-span-12 lg:col-span-4">
                      <div className="bg-grey100 rounded p-6 h-full flex items-center justify-center">
                        <a
                          href={concept.visualAssetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-paragraph text-base text-accent-link hover:text-accent-hover transition-colors"
                        >
                          View Visual Asset →
                        </a>
                      </div>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-grey400">
                No concepts available at this time.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
