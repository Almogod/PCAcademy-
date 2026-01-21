import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { InteractiveCalculators } from '@/entities';
import { Image } from '@/components/ui/image';
import CovarianceCalculator from '@/components/calculators/CovarianceCalculator';
import EigenCalculator from '@/components/calculators/EigenCalculator';
import PCACalculator from '@/components/calculators/PCACalculator';

export default function CalculatorsPage() {
  const [calculators, setCalculators] = useState<InteractiveCalculators[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCalculator, setActiveCalculator] = useState<string>('covariance');

  useEffect(() => {
    loadCalculators();
  }, []);

  const loadCalculators = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<InteractiveCalculators>('interactivecalculators');
    setCalculators(result.items);
    setIsLoading(false);
  };

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'covariance':
        return <CovarianceCalculator />;
      case 'eigen':
        return <EigenCalculator />;
      case 'pca':
        return <PCACalculator />;
      default:
        return <CovarianceCalculator />;
    }
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
            Interactive Calculators
          </h1>
          <p className="font-paragraph text-xl text-foreground max-w-4xl leading-relaxed">
            Use these interactive calculators to perform PCA computations step-by-step. 
            Enter your own data and see the mathematical transformations in real-time.
          </p>
        </motion.div>
      </section>

      {/* Calculator Tabs */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-8">
        <div className="flex flex-wrap gap-4 border-b border-grey200 pb-4">
          <button
            onClick={() => setActiveCalculator('covariance')}
            className={`font-paragraph text-base px-6 py-3 rounded transition-colors ${
              activeCalculator === 'covariance'
                ? 'bg-primary text-primary-foreground'
                : 'bg-transparent text-foreground border border-grey200 hover:bg-grey100'
            }`}
          >
            Covariance Matrix
          </button>
          <button
            onClick={() => setActiveCalculator('eigen')}
            className={`font-paragraph text-base px-6 py-3 rounded transition-colors ${
              activeCalculator === 'eigen'
                ? 'bg-primary text-primary-foreground'
                : 'bg-transparent text-foreground border border-grey200 hover:bg-grey100'
            }`}
          >
            Eigenvalues & Eigenvectors
          </button>
          <button
            onClick={() => setActiveCalculator('pca')}
            className={`font-paragraph text-base px-6 py-3 rounded transition-colors ${
              activeCalculator === 'pca'
                ? 'bg-primary text-primary-foreground'
                : 'bg-transparent text-foreground border border-grey200 hover:bg-grey100'
            }`}
          >
            Complete PCA
          </button>
        </div>
      </section>

      {/* Active Calculator */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-24">
        <motion.div
          key={activeCalculator}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderCalculator()}
        </motion.div>
      </section>

      {/* Available Calculators from CMS */}
      {!isLoading && calculators.length > 0 && (
        <section className="w-full bg-grey100 py-24">
          <div className="max-w-[100rem] mx-auto px-8">
            <h2 className="font-heading text-4xl text-primary mb-12">
              Available Calculators
            </h2>
            
            <div className="grid grid-cols-12 gap-8">
              {calculators.map((calc, index) => (
                <motion.div
                  key={calc._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <div className="bg-background rounded p-6 h-full">
                    {calc.thumbnailImage && (
                      <div className="mb-4 bg-grey100 rounded overflow-hidden h-48">
                        <Image
                          src={calc.thumbnailImage}
                          alt={calc.calculatorName || 'Calculator'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-heading text-xl text-primary mb-3">
                      {calc.calculatorName}
                    </h3>
                    <p className="font-paragraph text-base text-foreground leading-relaxed mb-4">
                      {calc.shortDescription}
                    </p>
                    {calc.conceptsCovered && (
                      <p className="font-paragraph text-sm text-grey400">
                        Concepts: {calc.conceptsCovered}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
