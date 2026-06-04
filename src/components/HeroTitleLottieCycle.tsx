import Lottie from 'lottie-react';
import { heroLottieAnimation } from '../data/heroLottieAnimations';
import './HeroTitleLottieCycle.css';

const HeroTitleLottieCycle = () => {
  if (!heroLottieAnimation) {
    return null;
  }

  return (
    <div className="hero-title-lottie" aria-hidden>
      <Lottie
        animationData={heroLottieAnimation}
        loop
        className="hero-title-lottie__player"
      />
    </div>
  );
};

export default HeroTitleLottieCycle;
