import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface DataPoint {
  x: number;
  y: number;
}

export default function InteractivePCAVisualization() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [showComponents, setShowComponents] = useState(true);

  useEffect(() => {
    generateData();
  }, []);

  const generateData = () => {
    // Generate correlated 2D data
    const points: DataPoint[] = [];
    const numPoints = 30;
    
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * 2 * Math.PI;
      const noise = (Math.random() - 0.5) * 0.3;
      points.push({
        x: 200 + Math.cos(t) * 80 + noise * 40,
        y: 200 + Math.sin(t) * 40 + noise * 20,
      });
    }
    
    setDataPoints(points);
  };

  // Calculate mean
  const meanX = dataPoints.reduce((sum, p) => sum + p.x, 0) / (dataPoints.length || 1);
  const meanY = dataPoints.reduce((sum, p) => sum + p.y, 0) / (dataPoints.length || 1);

  // Simple PCA approximation for visualization
  const pc1Angle = Math.PI / 6; // Approximate first principal component direction
  const pc2Angle = pc1Angle + Math.PI / 2; // Perpendicular to PC1

  const pc1Length = 100;
  const pc2Length = 50;

  return (
    <div className="bg-grey100 rounded p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl text-primary">
          Interactive PCA Visualization
        </h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 font-paragraph text-base text-foreground">
            <input
              type="checkbox"
              checked={showComponents}
              onChange={(e) => setShowComponents(e.target.checked)}
              className="w-4 h-4"
            />
            Show Principal Components
          </label>
          <button
            onClick={generateData}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph font-medium text-sm px-4 py-2 rounded hover:bg-grey800 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate Data
          </button>
        </div>
      </div>

      <div className="bg-background rounded p-8 mb-6">
        <svg width="100%" height="400" viewBox="0 0 400 400" className="w-full">
          {/* Grid lines */}
          <g opacity="0.1">
            {[...Array(9)].map((_, i) => (
              <line
                key={`v-${i}`}
                x1={(i + 1) * 40}
                y1="0"
                x2={(i + 1) * 40}
                y2="400"
                stroke="#000000"
                strokeWidth="1"
              />
            ))}
            {[...Array(9)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={(i + 1) * 40}
                x2="400"
                y2={(i + 1) * 40}
                stroke="#000000"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* Axes */}
          <line x1="0" y1="200" x2="400" y2="200" stroke="#BDBDBD" strokeWidth="1" />
          <line x1="200" y1="0" x2="200" y2="400" stroke="#BDBDBD" strokeWidth="1" />

          {/* Principal Components */}
          {showComponents && (
            <>
              {/* PC1 - Primary direction */}
              <motion.line
                x1={meanX}
                y1={meanY}
                x2={meanX + Math.cos(pc1Angle) * pc1Length}
                y2={meanY + Math.sin(pc1Angle) * pc1Length}
                stroke="#000000"
                strokeWidth="3"
                markerEnd="url(#arrowhead1)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.line
                x1={meanX}
                y1={meanY}
                x2={meanX - Math.cos(pc1Angle) * pc1Length}
                y2={meanY - Math.sin(pc1Angle) * pc1Length}
                stroke="#000000"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* PC2 - Secondary direction */}
              <motion.line
                x1={meanX}
                y1={meanY}
                x2={meanX + Math.cos(pc2Angle) * pc2Length}
                y2={meanY + Math.sin(pc2Angle) * pc2Length}
                stroke="#757575"
                strokeWidth="2"
                markerEnd="url(#arrowhead2)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.line
                x1={meanX}
                y1={meanY}
                x2={meanX - Math.cos(pc2Angle) * pc2Length}
                y2={meanY - Math.sin(pc2Angle) * pc2Length}
                stroke="#757575"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />

              {/* Labels */}
              <text
                x={meanX + Math.cos(pc1Angle) * pc1Length + 10}
                y={meanY + Math.sin(pc1Angle) * pc1Length}
                className="font-paragraph text-xs"
                fill="#000000"
              >
                PC1
              </text>
              <text
                x={meanX + Math.cos(pc2Angle) * pc2Length + 10}
                y={meanY + Math.sin(pc2Angle) * pc2Length}
                className="font-paragraph text-xs"
                fill="#757575"
              >
                PC2
              </text>
            </>
          )}

          {/* Data points */}
          {dataPoints.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#007AFF"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ delay: i * 0.02 }}
            />
          ))}

          {/* Mean point */}
          <circle
            cx={meanX}
            cy={meanY}
            r="6"
            fill="#000000"
            opacity="0.5"
          />

          {/* Arrow markers */}
          <defs>
            <marker
              id="arrowhead1"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#000000" />
            </marker>
            <marker
              id="arrowhead2"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#757575" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-background rounded">
          <h3 className="font-heading text-lg text-primary mb-3">
            What You're Seeing
          </h3>
          <p className="font-paragraph text-base text-foreground leading-relaxed">
            The blue points represent your data in 2D space. The black arrow (PC1) shows 
            the direction of maximum variance, while the grey arrow (PC2) shows the 
            secondary direction, perpendicular to PC1.
          </p>
        </div>

        <div className="p-6 bg-background rounded">
          <h3 className="font-heading text-lg text-primary mb-3">
            Key Insight
          </h3>
          <p className="font-paragraph text-base text-foreground leading-relaxed">
            If we project all points onto PC1 (the black arrow), we reduce from 2D to 1D 
            while preserving the most variance. This is the essence of PCA: finding the 
            best lower-dimensional representation.
          </p>
        </div>
      </div>
    </div>
  );
}
