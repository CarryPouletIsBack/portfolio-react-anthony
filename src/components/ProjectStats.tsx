import React, { useState, useEffect, useRef } from 'react';
import './ProjectStats.css';

interface StatData {
  value: number;
  label: string;
  description: string;
  suffix?: string;
  prefix?: string;
}

interface ProjectStatsProps {
  stats?: StatData[];
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ 
  stats = [
    // 🔑 Stats d'impact produit / business
    {
      value: 20,
      label: "Taux de conversion",
      description: "Augmentation des inscriptions après refonte",
      prefix: "+",
      suffix: "%"
    },
    {
      value: 35,
      label: "Taux de rétention",
      description: "Utilisateurs qui reviennent sur la plateforme",
      suffix: "%"
    },
    {
      value: 30,
      label: "Engagement utilisateur",
      description: "Augmentation du temps passé sur la plateforme",
      prefix: "+",
      suffix: "%"
    },
    {
      value: 15000,
      label: "Utilisateurs actifs",
      description: "Utilisateurs actifs mensuels (vs 8000 avant)",
      prefix: "+"
    },
    {
      value: 12,
      label: "Réduction taux de rebond",
      description: "Diminution sur la page d'accueil après redesign",
      prefix: "-",
      suffix: "%"
    },
    {
      value: 25,
      label: "Augmentation panier moyen",
      description: "Hausse du panier moyen en e-commerce",
      prefix: "+",
      suffix: "%"
    },
    
    // 🔑 Stats d'expérience utilisateur (UX)
    {
      value: 67,
      label: "Gain de temps",
      description: "Réduction du temps pour créer un compte (3min → 1min)",
      prefix: "-",
      suffix: "%"
    },
    {
      value: 8.5,
      label: "Score satisfaction",
      description: "Note moyenne utilisateur (sur 10)",
      suffix: "/10"
    },
    {
      value: 80,
      label: "Tests utilisateurs",
      description: "Testeurs trouvant la navigation plus simple",
      suffix: "%"
    },
    {
      value: 25,
      label: "Réduction tickets support",
      description: "Diminution des demandes liées à l'inscription",
      prefix: "-",
      suffix: "%"
    },
    
    // 🔑 Stats internes (efficacité équipe)
    {
      value: 40,
      label: "Gains de temps équipe",
      description: "Réduction sur la création de nouvelles pages grâce au Design System",
      prefix: "-",
      suffix: "%"
    },
    {
      value: 95,
      label: "Adoption Design System",
      description: "Taux d'adoption du Design System par l'équipe",
      suffix: "%"
    },
    {
      value: 12,
      label: "Prototypes validés",
      description: "Nombre de prototypes et itérations validées",
      suffix: " itérations"
    }
  ]
}) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000; // 2 secondes
      const startTime = Date.now();
      const startValue = 0;
      const endValue = stat.value;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function pour un effet plus naturel
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOutCubic;

        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = currentValue;
          return newValues;
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      // Délai progressif pour chaque carte
      setTimeout(animate, index * 200);
    });
  };

  const formatValue = (value: number, stat: StatData) => {
    if (stat.suffix === "/10" || stat.suffix === "/5") {
      return value.toFixed(1);
    }
    if (stat.suffix === " itérations") {
      return Math.round(value).toString();
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    }
    return Math.round(value).toString();
  };

  // Organiser les stats par catégories
  const businessStats = stats.slice(0, 6);
  const uxStats = stats.slice(6, 10);
  const internalStats = stats.slice(10, 13);

  return (
    <div className="project-stats" ref={sectionRef}>
      <div className="project-stats-container">
        <h2 className="project-stats-title">Impact du projet</h2>
        <p className="project-stats-description">
          Les métriques clés qui démontrent l'efficacité et l'impact de cette solution
        </p>
        
        {/* Stats d'impact produit / business */}
        <div className="stats-section">
          <h3 className="stats-section-title">🔑 Impact produit & business</h3>
          <div className="stats-grid">
            {businessStats.map((stat, index) => (
              <div key={index} className="project-stat-card">
                <div className="stat-value">
                  {stat.prefix}
                  {formatValue(animatedValues[index], stat)}
                  {stat.suffix}
                </div>
                <h4 className="stat-label">{stat.label}</h4>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats d'expérience utilisateur */}
        <div className="stats-section">
          <h3 className="stats-section-title">🔑 Expérience utilisateur (UX)</h3>
          <div className="stats-grid">
            {uxStats.map((stat, index) => (
              <div key={index + 6} className="project-stat-card">
                <div className="stat-value">
                  {stat.prefix}
                  {formatValue(animatedValues[index + 6], stat)}
                  {stat.suffix}
                </div>
                <h4 className="stat-label">{stat.label}</h4>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats internes */}
        <div className="stats-section">
          <h3 className="stats-section-title">🔑 Efficacité équipe & process</h3>
          <div className="stats-grid">
            {internalStats.map((stat, index) => (
              <div key={index + 10} className="project-stat-card">
                <div className="stat-value">
                  {stat.prefix}
                  {formatValue(animatedValues[index + 10], stat)}
                  {stat.suffix}
                </div>
                <h4 className="stat-label">{stat.label}</h4>
                <p className="stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;
