import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function EigenCalculator() {
  const [input, setInput] = useState('4,2\n2,3');
  const [result, setResult] = useState<string>('');

  const calculateEigen = () => {
    try {
      // Parse input matrix
      const rows = input.trim().split('\n').map(row => 
        row.split(',').map(val => parseFloat(val.trim()))
      );
      
      if (rows.length !== 2 || rows[0].length !== 2 || rows[1].length !== 2) {
        setResult('Error: Please enter a 2x2 matrix for this simplified calculator');
        return;
      }

      const a = rows[0][0];
      const b = rows[0][1];
      const c = rows[1][0];
      const d = rows[1][1];

      // Calculate eigenvalues using characteristic equation
      // λ² - (a+d)λ + (ad-bc) = 0
      const trace = a + d;
      const det = a * d - b * c;
      
      const discriminant = trace * trace - 4 * det;
      
      if (discriminant < 0) {
        setResult('Error: Complex eigenvalues detected. This calculator handles real eigenvalues only.');
        return;
      }

      const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
      const lambda2 = (trace - Math.sqrt(discriminant)) / 2;

      // Calculate eigenvectors
      // For λ1: (A - λ1*I)v = 0
      let v1x, v1y;
      if (Math.abs(b) > 0.0001) {
        v1x = 1;
        v1y = (lambda1 - a) / b;
      } else if (Math.abs(c) > 0.0001) {
        v1x = (lambda1 - d) / c;
        v1y = 1;
      } else {
        v1x = 1;
        v1y = 0;
      }

      // Normalize v1
      const norm1 = Math.sqrt(v1x * v1x + v1y * v1y);
      v1x /= norm1;
      v1y /= norm1;

      // For λ2
      let v2x, v2y;
      if (Math.abs(b) > 0.0001) {
        v2x = 1;
        v2y = (lambda2 - a) / b;
      } else if (Math.abs(c) > 0.0001) {
        v2x = (lambda2 - d) / c;
        v2y = 1;
      } else {
        v2x = 0;
        v2y = 1;
      }

      // Normalize v2
      const norm2 = Math.sqrt(v2x * v2x + v2y * v2y);
      v2x /= norm2;
      v2y /= norm2;

      // Format result
      let resultText = 'Eigenvalues:\n\n';
      resultText += `λ₁ = ${lambda1.toFixed(4)}\n`;
      resultText += `λ₂ = ${lambda2.toFixed(4)}\n\n`;
      resultText += 'Eigenvectors:\n\n';
      resultText += `v₁ = [${v1x.toFixed(4)}, ${v1y.toFixed(4)}]ᵀ\n`;
      resultText += `v₂ = [${v2x.toFixed(4)}, ${v2y.toFixed(4)}]ᵀ\n\n`;
      resultText += `Variance Explained:\n`;
      const total = lambda1 + lambda2;
      resultText += `PC1: ${((lambda1 / total) * 100).toFixed(2)}%\n`;
      resultText += `PC2: ${((lambda2 / total) * 100).toFixed(2)}%`;

      setResult(resultText);
    } catch (error) {
      setResult('Error: Please check your input format. Enter a 2x2 matrix with comma-separated values.');
    }
  };

  return (
    <div className="bg-grey100 rounded p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-6 w-6 text-primary" />
        <h2 className="font-heading text-2xl text-primary">
          Eigenvalue & Eigenvector Calculator
        </h2>
      </div>

      <p className="font-paragraph text-base text-foreground mb-6 leading-relaxed">
        Enter a 2x2 symmetric matrix (typically a covariance matrix). 
        The calculator will compute eigenvalues and eigenvectors, which represent 
        the principal components and their importance.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="font-paragraph text-sm text-foreground font-medium mb-2 block">
            Input Matrix (2x2)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-4 border border-grey200 rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent-link"
            placeholder="4,2&#10;2,3"
          />
          <button
            onClick={calculateEigen}
            className="mt-4 w-full bg-primary text-primary-foreground font-paragraph font-medium text-base px-6 py-3 rounded hover:bg-grey800 transition-colors"
          >
            Calculate Eigenvalues & Eigenvectors
          </button>
        </div>

        <div>
          <label className="font-paragraph text-sm text-foreground font-medium mb-2 block">
            Result
          </label>
          <div className="w-full h-64 p-4 bg-background border border-grey200 rounded font-mono text-sm overflow-auto whitespace-pre">
            {result || 'Results will appear here...'}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-background rounded">
        <h3 className="font-heading text-lg text-primary mb-3">
          Understanding Eigenvalues & Eigenvectors
        </h3>
        <p className="font-paragraph text-base text-foreground leading-relaxed">
          Eigenvectors represent the principal directions of variance in your data. 
          Eigenvalues indicate how much variance is captured along each direction. 
          The eigenvector with the largest eigenvalue is the first principal component (PC1), 
          capturing the most variance in the data.
        </p>
      </div>
    </div>
  );
}
