import { type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  PLAYDAGO_PEDAGO_IMAGES,
  PLAYDAGO_PEDAGO_SOURCE_URL,
} from '../data/playdagoPedagoImages';

type PlaydagoPedagoSectionProps = {
  lead: string;
  body: string;
  title: string;
  photoCreditLabel: string;
  photoCreditLinkLabel: string;
};

const PlaydagoPedagoSection: FC<PlaydagoPedagoSectionProps> = ({
  lead,
  body,
  title,
  photoCreditLabel,
  photoCreditLinkLabel,
}) => (
  <section id="pedago" className="project-section figma-pedago-section" aria-labelledby="pedago-section-title">
    <h2 id="pedago-section-title" className="section-title">
      {title}
    </h2>
    <div className="figma-two-cols figma-two-cols--pedago">
      <p className="figma-lead whitespace-pre-line">{lead}</p>
      <p className="figma-body whitespace-pre-line">{body}</p>
    </div>

    <div className="figma-pedago-carousel-stack">
      <div className="figma-pedago-carousel-wrapper">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView="auto"
          centeredSlides={false}
          pagination={{ clickable: true, type: 'bullets' }}
          className="figma-pedago-carousel"
          onSwiper={(swiper) => {
            const idealWidth = 520;
            const applySlideWidth = () => {
              const w = Math.min(idealWidth, Math.max(0, swiper.width - 20));
              swiper.slides.forEach((slide) => {
                const el = slide as HTMLElement;
                el.style.width = `${w}px`;
                el.style.minWidth = `${w}px`;
              });
              swiper.update();
            };
            applySlideWidth();
            swiper.on('resize', applySlideWidth);
          }}
        >
          {PLAYDAGO_PEDAGO_IMAGES.map((image, index) => (
            <SwiperSlide key={image.src}>
              <figure className="figma-pedago-slide">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className="figma-pedago-photo-credit">
        {photoCreditLabel}{' '}
        <a href={PLAYDAGO_PEDAGO_SOURCE_URL} target="_blank" rel="noopener noreferrer">
          {photoCreditLinkLabel}
        </a>
      </p>
    </div>
  </section>
);

export default PlaydagoPedagoSection;
