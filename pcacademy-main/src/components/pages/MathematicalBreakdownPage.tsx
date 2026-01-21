import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MathStep {
  id: string;
  title: string;
  description: string;
  formula: string;
  explanation: string;
}

const mathSteps: MathStep[] = [
  {
    id: 'step1',
    title: 'Step 1: Standardize the Data',
    description: 'Center the data by subtracting the mean from each feature.',
    formula: 'X̃ = X - μ',
    explanation: 'Where X is the original data matrix, μ is the mean vector, and X̃ is the centered data. This ensures that PCA is not biased by features with larger scales.',
  },
  {
    id: 'step2',
    title: 'Step 2: Compute the Covariance Matrix',
    description: 'Calculate how features vary together.',
    formula: 'C = (1/(n-1)) × X̃ᵀ × X̃',
    explanation: 'The covariance matrix C is a square matrix where each element C[i,j] represents the covariance between features i and j. The diagonal elements are the variances of individual features.',
  },
  {
    id: 'step3',
    title: 'Step 3: Calculate Eigenvalues and Eigenvectors',
    description: 'Find the principal directions of variance.',
    formula: 'C × v = λ × v',
    explanation: 'Solve the eigenvalue equation where v represents eigenvectors (principal components) and λ represents eigenvalues (amount of variance explained). Each eigenvector points in a direction of maximum variance.',
  },
  {
    id: 'step4',
    title: 'Step 4: Sort Eigenvalues and Select Components',
    description: 'Rank components by explained variance.',
    formula: 'λ₁ ≥ λ₂ ≥ ... ≥ λₙ',
    explanation: 'Sort eigenvalues in descending order. The first k eigenvectors corresponding to the k largest eigenvalues form the principal components that capture the most variance.',
  },
  {
    id: 'step5',
    title: 'Step 5: Transform the Data',
    description: 'Project data onto the principal components.',
    formula: 'Y = X̃ × W',
    explanation: 'Where W is the matrix of selected eigenvectors (principal components) and Y is the transformed data in the new coordinate system. This reduces dimensionality while preserving maximum variance.',
  },
];

export default function MathematicalBreakdownPage() {
  const [expandedStep, setExpandedStep] = useState<string | null>('step1');

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
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
            Mathematical Breakdown
          </h1>
          <p className="font-paragraph text-xl text-foreground max-w-4xl leading-relaxed">
            Follow the step-by-step mathematical derivation of Principal Component Analysis. 
            Each step includes the formula, explanation, and mathematical intuition behind the process.
          </p>
        </motion.div>
      </section>

      {/* Mathematical Steps */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-24">
        <div className="space-y-4">
          {mathSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-grey200 rounded"
            >
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-grey100 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="font-heading text-2xl text-grey400 font-medium">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-heading text-2xl text-primary text-left">
                    {step.title}
                  </h2>
                </div>
                {expandedStep === step.id ? (
                  <ChevronUp className="h-6 w-6 text-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-foreground flex-shrink-0" />
                )}
              </button>
              
              {expandedStep === step.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-8 pb-8 border-t border-grey200"
                >
                  <div className="pt-6 space-y-6">
                    <p className="font-paragraph text-lg text-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="bg-grey100 rounded p-8">
                      <p className="font-heading text-3xl text-primary text-center">
                        {step.formula}
                      </p>
                    </div>
                    
                    <div className="font-paragraph text-base text-foreground leading-relaxed">
                      <p className="font-medium text-primary mb-2">Explanation:</p>
                      <p>{step.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Insights */}
      <section className="w-full bg-grey100 py-24">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl text-primary mb-8">
              Key Mathematical Insights
            </h2>
            
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <h3 className="font-heading text-xl text-primary mb-4">
                  Variance Maximization
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  PCA finds directions that maximize variance in the data. The first principal 
                  component captures the most variance, the second captures the next most, and so on.
                </p>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <h3 className="font-heading text-xl text-primary mb-4">
                  Orthogonality
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  Principal components are orthogonal (perpendicular) to each other. This ensures 
                  that each component captures unique information not represented by others.
                </p>
              </div>
              
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <h3 className="font-heading text-xl text-primary mb-4">
                  Dimensionality Reduction
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  By selecting only the top k components, we reduce dimensionality while retaining 
                  most of the variance. This is the core power of PCA for data compression.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
