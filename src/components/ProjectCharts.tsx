import React from 'react';
import './ProjectCharts.css';

interface ChartData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface ProjectChartsProps {
  className?: string;
}

const ProjectCharts: React.FC<ProjectChartsProps> = ({ className = '' }) => {
  // Données fictives pour les graphiques
  const conversionData: ChartData[] = [
    { label: 'Avant', value: 65, color: '#e2e8f0', percentage: 65 },
    { label: 'Après', value: 85, color: '#f1582a', percentage: 85 }
  ];

  const retentionData: ChartData[] = [
    { label: 'Jour 1', value: 100, color: '#f1582a', percentage: 100 },
    { label: 'Jour 7', value: 75, color: '#ff9501', percentage: 75 },
    { label: 'Jour 30', value: 45, color: '#ffb84d', percentage: 45 },
    { label: 'Jour 90', value: 35, color: '#ffd699', percentage: 35 }
  ];

  const userFlowData: ChartData[] = [
    { label: 'Visiteurs', value: 10000, color: '#e2e8f0', percentage: 100 },
    { label: 'Inscriptions', value: 2000, color: '#ff9501', percentage: 20 },
    { label: 'Utilisateurs actifs', value: 1500, color: '#f1582a', percentage: 15 }
  ];

  const satisfactionData: ChartData[] = [
    { label: 'Très satisfait', value: 45, color: '#f1582a', percentage: 45 },
    { label: 'Satisfait', value: 35, color: '#ff9501', percentage: 35 },
    { label: 'Neutre', value: 15, color: '#ffb84d', percentage: 15 },
    { label: 'Insatisfait', value: 5, color: '#ffd699', percentage: 5 }
  ];

  const timeReductionData: ChartData[] = [
    { label: 'Avant', value: 180, color: '#e2e8f0', percentage: 100 },
    { label: 'Après', value: 60, color: '#f1582a', percentage: 33 }
  ];

  const supportTicketsData: ChartData[] = [
    { label: 'Q1', value: 100, color: '#e2e8f0', percentage: 100 },
    { label: 'Q2', value: 85, color: '#ffb84d', percentage: 85 },
    { label: 'Q3', value: 70, color: '#ff9501', percentage: 70 },
    { label: 'Q4', value: 50, color: '#f1582a', percentage: 50 }
  ];

  return (
    <div className={`project-charts ${className}`}>
      <div className="charts-container">
        <h2 className="charts-title">Métriques visuelles</h2>
        <p className="charts-description">
          Visualisation des données clés du projet avec des graphiques interactifs
        </p>

        <div className="charts-grid">
          {/* Graphique de conversion */}
          <div className="chart-card">
            <h3 className="chart-title">Taux de conversion</h3>
            <div className="bar-chart">
              {conversionData.map((item, index) => (
                <div key={index} className="bar-item">
                  <div className="bar-label">{item.label}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ 
                        width: `${item.percentage}%`, 
                        backgroundColor: item.color 
                      }}
                    >
                      <span className="bar-value">{item.value}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graphique de rétention */}
          <div className="chart-card">
            <h3 className="chart-title">Rétention utilisateurs</h3>
            <div className="line-chart">
              <div className="line-chart-container">
                {retentionData.map((item, index) => (
                  <div key={index} className="line-point">
                    <div 
                      className="point" 
                      style={{ 
                        bottom: `${item.percentage}%`,
                        backgroundColor: item.color 
                      }}
                    >
                      <span className="point-value">{item.value}%</span>
                    </div>
                    <div className="point-label">{item.label}</div>
                  </div>
                ))}
                <svg className="line-svg" viewBox="0 0 300 100">
                  <polyline
                    points="0,35 100,25 200,55 300,65"
                    fill="none"
                    stroke="#f1582a"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Graphique en entonnoir */}
          <div className="chart-card">
            <h3 className="chart-title">Entonnoir de conversion</h3>
            <div className="funnel-chart">
              {userFlowData.map((item, index) => (
                <div key={index} className="funnel-item">
                  <div 
                    className="funnel-bar"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color 
                    }}
                  >
                    <span className="funnel-label">{item.label}</span>
                    <span className="funnel-value">{item.value.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graphique en secteurs */}
          <div className="chart-card">
            <h3 className="chart-title">Satisfaction utilisateurs</h3>
            <div className="pie-chart">
              <div className="pie-container">
                <div className="pie-slice" style={{ 
                  background: `conic-gradient(#f1582a 0deg 162deg, #ff9501 162deg 288deg, #ffb84d 288deg 342deg, #ffd699 342deg 360deg)` 
                }}>
                  <div className="pie-center">
                    <span className="pie-total">8.5/10</span>
                    <span className="pie-label">Score moyen</span>
                  </div>
                </div>
              </div>
              <div className="pie-legend">
                {satisfactionData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div 
                      className="legend-color" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="legend-label">{item.label} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Graphique de réduction de temps */}
          <div className="chart-card">
            <h3 className="chart-title">Réduction du temps de création</h3>
            <div className="comparison-chart">
              {timeReductionData.map((item, index) => (
                <div key={index} className="comparison-item">
                  <div className="comparison-label">{item.label}</div>
                  <div className="comparison-bar-container">
                    <div 
                      className="comparison-bar" 
                      style={{ 
                        width: `${item.percentage}%`, 
                        backgroundColor: item.color 
                      }}
                    >
                      <span className="comparison-value">{item.value}s</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="improvement-badge">
                <span className="improvement-text">-67% de temps</span>
              </div>
            </div>
          </div>

          {/* Graphique d'évolution des tickets */}
          <div className="chart-card">
            <h3 className="chart-title">Évolution des tickets support</h3>
            <div className="area-chart">
              <div className="area-chart-container">
                {supportTicketsData.map((item, index) => (
                  <div key={index} className="area-point">
                    <div 
                      className="area-bar" 
                      style={{ 
                        height: `${item.percentage}%`,
                        backgroundColor: item.color 
                      }}
                    >
                      <span className="area-value">{item.value}</span>
                    </div>
                    <div className="area-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCharts;
