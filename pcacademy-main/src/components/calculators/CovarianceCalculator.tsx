import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function CovarianceCalculator() {
  const [input, setInput] = useState('1,2,3\n4,5,6\n7,8,9');
  const [result, setResult] = useState<string>('');

  const calculateCovariance = () => {
    try {
      // Parse input matrix
      const rows = input.trim().split('\n').map(row => 
        row.split(',').map(val => parseFloat(val.trim()))
      );
      
      if (rows.length === 0 || rows[0].length === 0) {
        setResult('Error: Invalid input format');
        return;
      }

      const n = rows.length;
      const m = rows[0].length;

      // Calculate means for each column
      const means = new Array(m).fill(0);
      for (let j = 0; j < m; j++) {
        let sum = 0;
        for (let i = 0; i < n; i++) {
          sum += rows[i][j];
        }
        means[j] = sum / n;
      }

      // Center the data
      const centered = rows.map(row => 
        row.map((val, j) => val - means[j])
      );

      // Calculate covariance matrix
      const cov = new Array(m).fill(0).map(() => new Array(m).fill(0));
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
          let sum = 0;
          for (let k = 0; k < n; k++) {
            sum += centered[k][i] * centered[k][j];
          }
          cov[i][j] = sum / (n - 1);
        }
      }

      // Format result
      let resultText = 'Covariance Matrix:\n\n';
      cov.forEach(row => {
        resultText += row.map(val => val.toFixed(4)).join('  ') + '\n';
      });

      setResult(resultText);
    } catch (error) {
      setResult('Error: Please check your input format. Use comma-separated values, one row per line.');
    }
  };

  return (
    <div className="bg-grey100 rounded p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-6 w-6 text-primary" />
        <h2 className="font-heading text-2xl text-primary">
          Covariance Matrix Calculator
        </h2>
      </div>

      <p className="font-paragraph text-base text-foreground mb-6 leading-relaxed">
        Enter your data matrix below (comma-separated values, one row per line). 
        The calculator will compute the covariance matrix showing how features vary together.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="font-paragraph text-sm text-foreground font-medium mb-2 block">
            Input Data Matrix
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-4 border border-grey200 rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent-link"
            placeholder="1,2,3&#10;4,5,6&#10;7,8,9"
          />
          <button
            onClick={calculateCovariance}
            className="mt-4 w-full bg-primary text-primary-foreground font-paragraph font-medium text-base px-6 py-3 rounded hover:bg-grey800 transition-colors"
          >
            Calculate Covariance Matrix
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
          Understanding Covariance
        </h3>
        <p className="font-paragraph text-base text-foreground leading-relaxed">
          The covariance matrix is a square matrix where element (i,j) represents the covariance 
          between features i and j. Diagonal elements are variances of individual features. 
          Positive values indicate features increase together, negative values indicate inverse relationships.
        </p>
      </div>
    </div>
  );
}
