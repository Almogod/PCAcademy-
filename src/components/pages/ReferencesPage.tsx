import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/lib/mock-service';
import { ReferenceMaterials } from '@/entities';
import { ExternalLink, Download, BookOpen, FileText, Video } from 'lucide-react';

export default function ReferencesPage() {
  const [references, setReferences] = useState<ReferenceMaterials[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadReferences();
  }, []);

  const loadReferences = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<ReferenceMaterials>('referencematerials');
    setReferences(result.items);
    setIsLoading(false);
  };

  const getIcon = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
      case 'paper':
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'book':
        return <BookOpen className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const filteredReferences = filterType === 'all' 
    ? references 
    : references.filter(ref => ref.resourceType?.toLowerCase() === filterType.toLowerCase());

  const uniqueTypes = ['all', ...Array.from(new Set(references.map(r => r.resourceType).filter(Boolean)))];

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
            Reference Materials
          </h1>
          <p className="font-paragraph text-xl text-foreground max-w-4xl leading-relaxed">
            Access curated academic papers, textbooks, tutorials, and additional learning resources 
            to deepen your understanding of Principal Component Analysis.
          </p>
        </motion.div>
      </section>

      {/* Download Cheat Sheet */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-grey100 rounded p-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-heading text-2xl text-primary mb-3">
                PCA Quick Reference Cheat Sheet
              </h2>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Download a comprehensive one-page reference with all key formulas, steps, 
                and concepts for quick review during study or presentations.
              </p>
            </div>
            <button
              onClick={() => alert('PCA Cheat Sheet download would be available here')}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph font-medium text-base px-6 py-3 rounded hover:bg-grey800 transition-colors"
            >
              <Download className="h-5 w-5" />
              Download PDF
            </button>
          </div>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      {!isLoading && references.length > 0 && (
        <section className="w-full max-w-[100rem] mx-auto px-8 pb-8">
          <div className="flex flex-wrap gap-3">
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`font-paragraph text-sm px-4 py-2 rounded transition-colors capitalize ${
                  filterType === type
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-grey100 text-foreground hover:bg-grey200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* References List */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-24">
        <div className="min-h-[400px]">
          {isLoading ? null : filteredReferences.length > 0 ? (
            <div className="space-y-6">
              {filteredReferences.map((reference, index) => (
                <motion.article
                  key={reference._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-grey100 rounded p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-background rounded">
                      {getIcon(reference.resourceType)}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-heading text-xl text-primary mb-2">
                            {reference.resourceTitle}
                          </h3>
                          {reference.authorSource && (
                            <p className="font-paragraph text-sm text-grey400">
                              {reference.authorSource}
                            </p>
                          )}
                        </div>
                        {reference.resourceType && (
                          <span className="flex-shrink-0 font-paragraph text-xs text-grey400 px-3 py-1 bg-background rounded capitalize">
                            {reference.resourceType}
                          </span>
                        )}
                      </div>
                      
                      {reference.shortDescription && (
                        <p className="font-paragraph text-base text-foreground leading-relaxed mb-4">
                          {reference.shortDescription}
                        </p>
                      )}
                      
                      {reference.resourceLink && (
                        <a
                          href={reference.resourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-paragraph text-base text-accent-link hover:text-accent-hover transition-colors"
                        >
                          Access Resource
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-grey400">
                {filterType === 'all' 
                  ? 'No references available at this time.' 
                  : `No ${filterType} resources available.`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="w-full bg-grey100 py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl text-primary mb-12">
              Recommended Learning Path
            </h2>
            
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="bg-background rounded p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-2xl text-grey400 font-medium">01</span>
                    <h3 className="font-heading text-xl text-primary">
                      Start with Concepts
                    </h3>
                  </div>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Begin by understanding the foundational concepts of variance, covariance, 
                    and linear transformations before diving into PCA mathematics.
                  </p>
                </div>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="bg-background rounded p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-2xl text-grey400 font-medium">02</span>
                    <h3 className="font-heading text-xl text-primary">
                      Practice with Calculators
                    </h3>
                  </div>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Use the interactive calculators to work through examples step-by-step. 
                    Start with small datasets to build intuition.
                  </p>
                </div>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="bg-background rounded p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading text-2xl text-grey400 font-medium">03</span>
                    <h3 className="font-heading text-xl text-primary">
                      Explore Applications
                    </h3>
                  </div>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Study real-world examples to understand how PCA solves practical problems 
                    in different domains and industries.
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
