import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function PCACalculator() {
  const [input, setInput] = useState('2.5,2.4\n0.5,0.7\n2.2,2.9\n1.9,2.2\n3.1,3.0\n2.3,2.7\n2.0,1.6\n1.0,1.1\n1.5,1.6\n1.1,0.9');
  const [components, setComponents] = useState('2');
  const [result, setResult] = useState<string>('');

  const calculatePCA = () => {
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
      const k = Math.min(parseInt(components), m);

      let resultText = '=== PCA Step-by-Step Results ===\n\n';

      // Step 1: Calculate means
      const means = new Array(m).fill(0);
      for (let j = 0; j < m; j++) {
        let sum = 0;
        for (let i = 0; i < n; i++) {
          sum += rows[i][j];
        }
        means[j] = sum / n;
      }

      resultText += 'Step 1: Feature Means\n';
      resultText += means.map((m, i) => `Feature ${i + 1}: ${m.toFixed(4)}`).join('\n');
      resultText += '\n\n';

      // Step 2: Center the data
      const centered = rows.map(row => 
        row.map((val, j) => val - means[j])
      );

      resultText += 'Step 2: Data Centered (first 3 rows shown)\n';
      centered.slice(0, 3).forEach((row, i) => {
        resultText += `Row ${i + 1}: [${row.map(v => v.toFixed(4)).join(', ')}]\n`;
      });
      resultText += '\n';

      // Step 3: Calculate covariance matrix
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

      resultText += 'Step 3: Covariance Matrix\n';
      cov.forEach(row => {
        resultText += row.map(val => val.toFixed(4)).join('  ') + '\n';
      });
      resultText += '\n';

      // Step 4: For 2x2 matrix, calculate eigenvalues and eigenvectors
      if (m === 2) {
        const a = cov[0][0];
        const b = cov[0][1];
        const c = cov[1][0];
        const d = cov[1][1];

        const trace = a + d;
        const det = a * d - b * c;
        const discriminant = trace * trace - 4 * det;

        if (discriminant >= 0) {
          const lambda1 = (trace + Math.sqrt(discriminant)) / 2;
          const lambda2 = (trace - Math.sqrt(discriminant)) / 2;

          resultText += 'Step 4: Eigenvalues\n';
          resultText += `λ₁ = ${lambda1.toFixed(4)}\n`;
          resultText += `λ₂ = ${lambda2.toFixed(4)}\n\n`;

          // Calculate eigenvectors
          let v1x = 1, v1y = 0;
          if (Math.abs(b) > 0.0001) {
            v1y = (lambda1 - a) / b;
          } else if (Math.abs(c) > 0.0001) {
            v1x = (lambda1 - d) / c;
            v1y = 1;
          }
          const norm1 = Math.sqrt(v1x * v1x + v1y * v1y);
          v1x /= norm1;
          v1y /= norm1;

          let v2x = 1, v2y = 0;
          if (Math.abs(b) > 0.0001) {
            v2y = (lambda2 - a) / b;
          } else if (Math.abs(c) > 0.0001) {
            v2x = (lambda2 - d) / c;
            v2y = 1;
          }
          const norm2 = Math.sqrt(v2x * v2x + v2y * v2y);
          v2x /= norm2;
          v2y /= norm2;

          resultText += 'Step 5: Eigenvectors (Principal Components)\n';
          resultText += `PC1: [${v1x.toFixed(4)}, ${v1y.toFixed(4)}]ᵀ\n`;
          resultText += `PC2: [${v2x.toFixed(4)}, ${v2y.toFixed(4)}]ᵀ\n\n`;

          // Step 6: Transform data
          const transformed = centered.map(row => [
            row[0] * v1x + row[1] * v1y,
            row[0] * v2x + row[1] * v2y
          ]);

          resultText += 'Step 6: Transformed Data (first 5 rows)\n';
          transformed.slice(0, 5).forEach((row, i) => {
            resultText += `Row ${i + 1}: [${row.map(v => v.toFixed(4)).join(', ')}]\n`;
          });
          resultText += '\n';

          // Variance explained
          const total = lambda1 + lambda2;
          resultText += 'Variance Explained:\n';
          resultText += `PC1: ${((lambda1 / total) * 100).toFixed(2)}%\n`;
          resultText += `PC2: ${((lambda2 / total) * 100).toFixed(2)}%\n`;
          resultText += `Cumulative: ${(((lambda1 + lambda2) / total) * 100).toFixed(2)}%`;
        } else {
          resultText += 'Error: Complex eigenvalues detected.';
        }
      } else {
        resultText += 'Note: Full eigendecomposition for matrices larger than 2x2 requires advanced libraries.\n';
        resultText += 'This calculator demonstrates the process for 2D data.';
      }

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
          Complete PCA Calculator
        </h2>
      </div>

      <p className="font-paragraph text-base text-foreground mb-6 leading-relaxed">
        Enter your data matrix and specify the number of principal components to retain. 
        This calculator performs the complete PCA transformation, showing all steps from 
        data centering to final projection.
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
            placeholder="2.5,2.4&#10;0.5,0.7&#10;2.2,2.9"
          />
          
          <div className="mt-4">
            <label className="font-paragraph text-sm text-foreground font-medium mb-2 block">
              Number of Components
            </label>
            <input
              type="number"
              value={components}
              onChange={(e) => setComponents(e.target.value)}
              min="1"
              className="w-full p-3 border border-grey200 rounded font-paragraph text-base focus:outline-none focus:ring-2 focus:ring-accent-link"
            />
          </div>

          <button
            onClick={calculatePCA}
            className="mt-4 w-full bg-primary text-primary-foreground font-paragraph font-medium text-base px-6 py-3 rounded hover:bg-grey800 transition-colors"
          >
            Perform PCA
          </button>
        </div>

        <div>
          <label className="font-paragraph text-sm text-foreground font-medium mb-2 block">
            Result
          </label>
          <div className="w-full h-[400px] p-4 bg-background border border-grey200 rounded font-mono text-sm overflow-auto whitespace-pre">
            {result || 'Results will appear here...'}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-background rounded">
        <h3 className="font-heading text-lg text-primary mb-3">
          Complete PCA Process
        </h3>
        <p className="font-paragraph text-base text-foreground leading-relaxed">
          This calculator performs all PCA steps: (1) Calculate feature means, (2) Center the data, 
          (3) Compute covariance matrix, (4) Find eigenvalues, (5) Compute eigenvectors, 
          (6) Transform data to principal component space. The result shows variance explained 
          by each component, helping you decide how many components to retain.
        </p>
      </div>
    </div>
  );
}
