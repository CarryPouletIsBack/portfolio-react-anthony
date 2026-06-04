/** Non monté dans le header par défaut — voir README § Fond d’accueil selon l’heure. */
import { ACCUEIL_TIME_OF_DAY_PREVIEW_OPTIONS } from '../lib/accueilTimeOfDay';
import { useAccueilTimeOfDayPreview } from '../contexts/AccueilTimeOfDayContext';
import './AccueilTimeOfDayPreviewControls.css';

const AccueilTimeOfDayPreviewControls = () => {
  const { preview, setPreview } = useAccueilTimeOfDayPreview();

  return (
    <div className="header-time-preview" role="group" aria-label="Aperçu ambiance (test)">
      {ACCUEIL_TIME_OF_DAY_PREVIEW_OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`header-time-preview__btn${preview === id ? ' header-time-preview__btn--active' : ''}`}
          aria-pressed={preview === id}
          onClick={() => setPreview(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default AccueilTimeOfDayPreviewControls;
