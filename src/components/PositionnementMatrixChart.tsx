import { useMemo, useState, type FC, type RefObject } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export interface PositionnementMatrixPoint {
  name: string;
  description: string;
  x: number;
  y: number;
}

export interface PositionnementMatrixData {
  xAxisLabel: string;
  yAxisLabel: string;
  /** Optionnel : préfixe complet affiché dans la légende (avant le ':'), ex. "Axe X (Horizontal) " */
  axisHorizontalPrefix?: string;
  /** Optionnel : préfixe complet affiché dans la légende (avant le ':'), ex. "Axe Y (Vertical) " */
  axisVerticalPrefix?: string;
  xMinLabel: string;
  xMaxLabel: string;
  yMinLabel: string;
  yMaxLabel: string;
  points: PositionnementMatrixPoint[];
}

interface PositionnementMatrixChartProps {
  data: PositionnementMatrixData;
  className?: string;
  /** Référence du conteneur qui scroll (ex. .single-project-page) pour déclencher l'animation au bon moment */
  scrollRootRef?: RefObject<HTMLElement | null>;
}

/** Style inspiré du demo Highcharts "Sonified function" : axes croisés à 0, grille, rendu épuré */
const PositionnementMatrixChart: FC<PositionnementMatrixChartProps> = ({ data, className = '', scrollRootRef }) => {
  const { t } = useLanguage();
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const options = useMemo<Highcharts.Options>(() => ({
    chart: {
      type: 'scatter',
      backgroundColor: 'transparent',
      plotBackgroundColor: 'transparent',
      plotBorderWidth: 0,
      marginLeft: 56,
      marginRight: 56,
      marginBottom: 56,
      marginTop: 48,
    },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      min: -10,
      max: 10,
      gridLineWidth: 0,
      tickInterval: 2,
      crossing: 0,
      lineWidth: 1,
      tickLength: 0,
      labels: {
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          const v = this.value as number;
          if (v === -10) return data.xMinLabel;
          if (v === 10) return data.xMaxLabel;
          return String(v);
        },
        style: { fontSize: '11px', color: '#666' },
      },
    },
    yAxis: {
      min: -10,
      max: 10,
      gridLineWidth: 0,
      tickInterval: 2,
      crossing: 0,
      lineWidth: 1,
      tickLength: 0,
      title: { text: null },
      labels: {
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          const v = this.value as number;
          if (v === -10) return data.yMinLabel;
          if (v === 10) return data.yMaxLabel;
          return String(v);
        },
        style: { fontSize: '11px', color: '#666' },
      },
    },
    tooltip: { enabled: false },
    plotOptions: {
      scatter: {
        stickyTracking: false,
        marker: {
          enabled: true,
          radius: 6,
          symbol: 'circle',
          fillColor: '#222222',
          lineWidth: 2,
          lineColor: '#ffffff',
        },
        states: {
          hover: {
            lineWidthPlus: 0,
            halo: { size: 0 },
            marker: {
              enabled: true,
              radius: 6,
            },
          },
          inactive: {
            opacity: 1,
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          className: 'positionnement-matrix-point-label',
          style: {
            fontSize: '12px',
            fontWeight: '600',
            textOutline: 'none',
            color: '#000000',
          },
          verticalAlign: 'bottom',
          y: -10,
        },
      },
    },
    series: [{
      type: 'scatter',
      data: data.points.map((p) => ({
        x: p.x,
        y: p.y,
        name: p.name,
        description: p.description,
      })),
      color: '#333',
    }],
  }), [data]);

  return (
    <motion.div
      className="positionnement-matrix-entrance"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        root: scrollRootRef ?? undefined,
        once: true,
        margin: '0px 0px -80px 0px',
        amount: 0.15,
      }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      onViewportEnter={() => setHasEnteredView(true)}
    >
      <div className={`positionnement-matrix ${className} ${hasEnteredView ? 'in-view' : ''}`.trim()}>
        <div className="positionnement-matrix-chart-area">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div className="positionnement-matrix-legend">
          <span className="positionnement-matrix-legend-x">
            {(data.axisHorizontalPrefix ?? t('project.axisHorizontal'))}: {data.xAxisLabel}
          </span>
          <span className="positionnement-matrix-legend-y">
            {(data.axisVerticalPrefix ?? t('project.axisVertical'))}: {data.yAxisLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PositionnementMatrixChart;
