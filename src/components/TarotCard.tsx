import React from 'react';
import './TarotCard.css';

interface TarotCardProps {
  avatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  className?: string;
  onContactClick?: () => void;
}

const TarotCard: React.FC<TarotCardProps> = ({
  avatarUrl = '/images/pp-anthony.jpg',
  name = 'Anthony Merault',
  title = 'Développeur',
  handle = 'anthony',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  className = '',
  onContactClick
}) => {
  const handleContactClick = () => {
    onContactClick?.();
  };

  return (
    <div className={`tarot-card-wrapper ${className}`.trim()}>
      <section className="tarot-card">
        <div className="tarot-inside">
          <div className="tarot-shine" />
          <div className="tarot-content tarot-avatar-content">
            {showUserInfo && (
              <div className="tarot-user-info">
                <div className="tarot-user-details">
                  <div className="tarot-mini-avatar">
                    <img
                      src={avatarUrl}
                      alt={`${name} mini avatar`}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.opacity = '0.5';
                        target.src = avatarUrl;
                      }}
                    />
                  </div>
                  <div className="tarot-user-text">
                    <div className="tarot-handle">@{handle}</div>
                    <div className="tarot-status">{status}</div>
                  </div>
                </div>
                <button
                  className="tarot-contact-btn"
                  onClick={handleContactClick}
                  style={{ pointerEvents: 'auto' }}
                  type="button"
                  aria-label={`Contact ${name}`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
          <div className="tarot-content">
            <div className="tarot-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TarotCard;
