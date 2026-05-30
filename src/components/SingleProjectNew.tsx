import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  type FC,
  type MouseEvent,
  type TouchEvent,
  type RefObject,
} from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../services/googleAnalyticsTracking';
import { motion, useMotionValue } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './SingleProject.css';
import { type ProjectData } from '../data/projectsNew';
import {
  getCaseStudyVariant,
  usesExtendedCaseStudyLayout,
  usesPlaydagoCaseStudyLayout,
  usesUtoidCaseStudyLayout,
} from '../utils/caseStudyLayout';
import {
  buildUtoiAuditCarouselImages,
  UTOI_CONCEPTION_CONCEPT_GROUPS,
  UTOI_CARD_SWAP_SLIDE_SRCS,
  UTOI_DS_BENTO_IMAGE_SOURCES,
  UTOI_PRESENTATION_IMAGES,
  utoiFrameAlt,
} from '../data/utoiCaseStudyAssets';
import BlurText from './BlurText';
import DonutChartRace from './DonutChartRace';
import PositionnementMatrixChart from './PositionnementMatrixChart';
import UserFlowChart from './UserFlowChart';
import { TreeNode } from './flow/FlowTree';
import type { FlowNodeData } from '../data/flowData';
import Button from './Button';
import ContactModal from './ContactModal';
import { PlaydagoPaletteTable, PlaydagoTypescaleTable } from './PlaydagoDesignSystemTables';
import CardSwap, { Card } from './CardSwap';
import MagicBento from './MagicBento';
import PlaydagoH1HandwritingLogo from './PlaydagoH1HandwritingLogo';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

/** User flow → arbre : tous les enfants en branches (vertical) → Compte, Contact, Page Tâches, Formation, Laboratoire sur la même colonne après Dashboard */
function userFlowToFlowData(userFlow: { nodes: { id: string; name?: string; title?: string }[]; links: { from: string; to: string }[] }): FlowNodeData | null {
  const { nodes, links } = userFlow;
  if (!nodes?.length || !links?.length) return null;
  const nodeMap = new Map(nodes.map((n) => [n.id, { id: n.id, label: n.name || n.title || n.id }]));
  const childrenByFrom = new Map<string, string[]>();
  const toIds = new Set(links.map((l) => l.to));
  for (const l of links) {
    if (!childrenByFrom.has(l.from)) childrenByFrom.set(l.from, []);
    childrenByFrom.get(l.from)!.push(l.to);
  }
  const rootIds = nodes.map((n) => n.id).filter((id) => !toIds.has(id));
  if (rootIds.length === 0) return null;
  function buildNode(id: string): FlowNodeData {
    const info = nodeMap.get(id);
    const label = info?.label ?? id;
    const childIds = childrenByFrom.get(id) ?? [];
    if (childIds.length === 0) return { id, label };
    return { id, label, branches: childIds.map((cid) => buildNode(cid)) };
  }
  return buildNode(rootIds[0]);
}

// Constantes en dehors du composant pour éviter les re-créations
const CLOSE_THRESHOLD = 100;

/** Animation d'entrée au scroll pour les sections (comme les titres) */
const scrollSectionProps = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -60px 0px' as const },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
};

// Import des icônes SVG
import searchIconBlue from '../assets/4610de4ae01e3b351bbcba9c930287159bbda981.svg'
import searchIconWhite from '../assets/90ec6f610076fb768a47e2428a1538d04533d860.svg'
import filterIconBlue from '../assets/bde286e6c3f17f2b7616efd3cb0505db16cb2c80.svg'
import filterIconWhite from '../assets/d64646fec8e22fb6cc43fff0865f1aed605ce1db.svg'
import expandIconBlue from '../assets/0663ecdf0b920b6cf763604a0f82d6820aa79455.svg'
import expandIconWhite from '../assets/fd72e19660aeb34b38d4c1d978e7c4eb2c18625d.svg'
import penIconBlue from '../assets/263f9c29cac74d7682e3473ce21888bd06efd26b.svg'
import penIconWhite from '../assets/ad0941a6384370c3132550cf8e7b080872bf8c70.svg'
import bellIconBlue from '../assets/098befb8181ea6bad4360e3d71f1968d62a269ab.svg'
import bellIconWhite from '../assets/c5bca19bef4558c083d96fdc742e2d8e9f4a9d4c.svg'
import dashboardIconBlue from '../assets/a7ca5d8579da186571215f0d46b524b056c90c10.svg'
import dashboardIconWhite from '../assets/96565d943652d5bf44ea725b8aa77fe03479a74a.svg'
import clientIconBlue from '../assets/5920fd75dd2c6e76db991a9b942e996b1c710f0e.svg'
import laboratoireIconBlue from '../assets/4cdaeeb22fdcbf2d5c03c0c40e4bfa84e3124cc1.svg'
import laboratoireIconWhite from '../assets/43ff308b7a1db138e79250570a476d75f810d253.svg'
import dashboardIconNewBlue from '../assets/b710cf10aac89b656f43227be944d998471a6343.svg'
import dashboardIconNewWhite from '../assets/2132bf0ef9c4bc9f146dda1255d5e7d49b16171f.svg'
import contactIconBlue from '../assets/6319879794d05613192a650b6c2fff239e7a7ad1.svg'
import contactIconWhite from '../assets/d98522e79f209b17064ab4de482c788242183e6c.svg'
import formationIconBlue from '../assets/44168eca3dd85916f934d8ab1b7b41967aff31f4.svg'
import formationIconWhite from '../assets/93d42323f5ac3dc5fadde5c92e8d5135e38d2981.svg'
import boutiqueIconBlue from '../assets/9dc5c3ec76d7852c81cd48b560b25b52336544c2.svg'
import boutiqueIconWhite from '../assets/3bea835efaa0ca18d639afff7d53d9069da477c0.svg'
/** Première slide Audit : Playdago uniquement (Pedaboard / autres gardent l’asset Figma partagé) */
import auditCarouselBluePlaydago from '../assets/audit/Blue.png';
/** Slide 2 uniquement du carrousel #audit Playdago (pas le doublon Design system) */
import auditCarouselMacBookPlaydagoAuditSection from '../assets/audit/MacBook Pro 16_ - 5th Gen - Silver.png';
/** Slide 3 uniquement du carrousel #audit Playdago (pas le doublon Design system) */
import auditCarouselHandheldIpadPlaydagoAuditSection from '../assets/audit/Handheld-iPad-2.png';
/** Slides 2–4 carrousels Playdago (Design system & repli) — dossier « creation atelier » */
import auditCarouselCreationAtelierLancerDes from '../assets/audit/creation atelier/lancer de des.png';
import auditCarouselCreationAtelierPersonnalisationDes from '../assets/audit/creation atelier/lancer de des/personnalisation du des.png';
import auditCarouselCreationAtelierActionPopup from '../assets/audit/creation atelier/lancer de des/popup/action.png';
/** Design system Playdago — tuiles Magic Bento (exports Figma) */
import playdagoDsFrame1048 from '../assets/audit/Frame 1048.png';
import playdagoDsFrame1050 from '../assets/audit/Frame 1050.png';
import playdagoDsFrame1051 from '../assets/audit/Frame 1051.png';
import playdagoCardSwapDashboard from '../assets/audit/Dashboard.png';
import playdagoCardSwapPersonnalisationDes from '../assets/audit/creation atelier/lancer de des/personnalisation du des.png';
import playdagoCardSwapDistributionCartes from '../assets/audit/concept 2/matching/formateur/Distribution des cartes.png';
import playdagoLightModeMaine from '../assets/playdago/Dashboard/maine.png';
import playdagoLightModeSinglePage from '../assets/Atelier/SinglePage.png';
import playdagoLightModeSetp1 from '../assets/Participant·es/Atelier/Matching/Play/Setp1.png';
/** Chaque image des dossiers `audit/concept 1/` et `audit/concept 2/` = un trait cliquable sur la graduation (ordre = tri du chemin fichier). */
const PLAYDAGO_CONCEPTION_CONCEPT_1_GLOB = import.meta.glob<{ default: string }>(
  '../assets/audit/concept 1/**/*.{png,jpg,jpeg,webp}',
  { eager: true }
);
const PLAYDAGO_CONCEPTION_CONCEPT_2_GLOB = import.meta.glob<{ default: string }>(
  '../assets/audit/concept 2/**/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

function playdagoGlobToSortedSlides(glob: Record<string, { default: string }>): { src: string }[] {
  return Object.keys(glob)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }))
    .map((path) => ({ src: glob[path].default }));
}

/** Conception Playdago : 2 itérations = contenu des dossiers concept 1 & concept 2 (nombre de traits = nombre de fichiers par dossier). */
const PLAYDAGO_CONCEPTION_CONCEPT_GROUPS: { src: string }[][] = [
  playdagoGlobToSortedSlides(PLAYDAGO_CONCEPTION_CONCEPT_1_GLOB),
  playdagoGlobToSortedSlides(PLAYDAGO_CONCEPTION_CONCEPT_2_GLOB),
];

/** Card Swap (React Bits) : Dashboard, personnalisation du dé, distribution des cartes */
const PLAYDAGO_CARD_SWAP_SLIDE_SRCS: string[] = [
  playdagoCardSwapDashboard,
  playdagoCardSwapPersonnalisationDes,
  playdagoCardSwapDistributionCartes,
];

/** Base URL pour les assets (public/) – respecte base en prod si défini) */
const assetBase = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

/** Slide 2 Audit par défaut (Pedaboard, Kaldera, etc.) */
const AUDIT_CAROUSEL_SLIDE_2_DEFAULT_SRC = `${assetBase}single-project/f6437219-c377-476d-820c-a6d2a5f9fabd.png`;

/** Slide 3 du carrousel Audit (Pedaboard, Kaldera — Playdago : creation atelier) */
const AUDIT_CAROUSEL_SLIDE_3_DEFAULT = {
  src: `${assetBase}single-project/f6a7cf16-6dd5-4dee-9cb5-9231547be2f4.png`,
  alt: 'Audit – veille UX/UI 3',
} as const;

/** Première slide Audit par défaut (ex. Pedaboard, Kaldera) — ne pas confondre avec Playdago */
const AUDIT_CAROUSEL_FIRST_DEFAULT = {
  src: `${assetBase}single-project/16399a4e-f4ad-465b-beb3-98b56cc27f6b.png`,
  alt: 'Audit – veille UX/UI 1',
} as const;

/** Carrousel Audit : slides 2–3 Playdago surchargées (défauts = assets « creation atelier ») */
function buildAuditCarouselImages(
  title: string,
  playdagoSecondSlideSrc: string = auditCarouselCreationAtelierLancerDes,
  playdagoThirdSlideSrc: string = auditCarouselCreationAtelierPersonnalisationDes
): Array<{ src: string; alt: string }> {
  if (getCaseStudyVariant(title) === 'utoi') {
    return buildUtoiAuditCarouselImages().map((slide) => ({
      src: slide.src,
      alt: slide.alt ?? 'UTOI — audit',
    }));
  }
  const first = usesPlaydagoCaseStudyLayout(title)
    ? { src: auditCarouselBluePlaydago, alt: 'Audit – veille UX/UI 1' }
    : { src: AUDIT_CAROUSEL_FIRST_DEFAULT.src, alt: AUDIT_CAROUSEL_FIRST_DEFAULT.alt };
  const second = usesPlaydagoCaseStudyLayout(title)
    ? { src: playdagoSecondSlideSrc, alt: 'Audit – veille UX/UI 2' }
    : { src: AUDIT_CAROUSEL_SLIDE_2_DEFAULT_SRC, alt: 'Audit – veille UX/UI 2' };
  const third = usesPlaydagoCaseStudyLayout(title)
    ? { src: playdagoThirdSlideSrc, alt: 'Audit – veille UX/UI 3' }
    : { src: AUDIT_CAROUSEL_SLIDE_3_DEFAULT.src, alt: AUDIT_CAROUSEL_SLIDE_3_DEFAULT.alt };
  const fourth = usesPlaydagoCaseStudyLayout(title)
    ? { src: auditCarouselCreationAtelierActionPopup, alt: 'Audit – veille UX/UI 4' }
    : null;
  return fourth ? [first, second, third, fourth] : [first, second, third];
}

/** Icône graduation minimaliste (axe + traits) — avant le libellé « Concept n » */
function PlaydagoConceptionGraduationIcon() {
  return (
    <svg
      className="playdago-conception-grad-icon"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 3v14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M9 5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 9h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 17h2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface SingleProjectProps {
  projectData: ProjectData;
  onBackClick: () => void;
  coverImage?: string | null;
  projectCategory?: string | null;
  onSwipeYChange?: (y: number) => void;
  onLiftProgressChange?: (progress: number) => void;
  /** Lift + scroll contenu (px) — ex. masquer le bouton fermer sur la cover */
  onProjectScrollCombinedChange?: (combinedPx: number) => void;
  coverFullscreenActive?: boolean;
}

const SingleProjectNew: FC<SingleProjectProps> = ({
  projectData,
  onBackClick,
  coverImage = null,
  projectCategory = null,
  onSwipeYChange,
  onLiftProgressChange,
  onProjectScrollCombinedChange,
  coverFullscreenActive = false,
}) => {
  const { t, language } = useLanguage();
  const isEn = language === 'en';
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  /** Conception & Itération : indice du concept (graduations) et indice du visuel dans le carrousel vertical du concept actif */
  const [playdagoConceptionConceptIndex, setPlaydagoConceptionConceptIndex] = useState(0);
  const [playdagoConceptionSlideIndex, setPlaydagoConceptionSlideIndex] = useState(0);
  const LIFT_SCROLL_MAX = 200; // Pixels de "scroll" pour que le panneau touche le haut
  const [liftScroll, setLiftScroll] = useState(0); // 0 à LIFT_SCROLL_MAX : phase où seul le panneau monte
  const [contentScrollTop, setContentScrollTop] = useState(0); // scroll du contenu une fois le panneau en haut
  const pageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const userflowTreeContainerRef = useRef<HTMLDivElement>(null);
  const userflowTreeWrapperRef = useRef<HTMLDivElement>(null);
  /** Hauteur de la zone image centrale → contraint graduations + carrousel vertical (scroll interne) */
  const playdagoConceptionStageInnerRef = useRef<HTMLDivElement>(null);
  const [playdagoConceptionSideMaxPx, setPlaydagoConceptionSideMaxPx] = useState<number | null>(null);

  const introText =
    isEn && projectData.translations?.en?.summary ? projectData.translations.en.summary : projectData.summary;
  const introParagraphs = introText
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  /** Nœud « feuille » cliqué : même bulle recliquée → désélection (sans popup) */
  const [userflowSelectedLeafId, setUserflowSelectedLeafId] = useState<string | null>(null);

  const findNode = useCallback((data: FlowNodeData, id: string): FlowNodeData | null => {
    if (data.id === id) return data;
    if (data.branches) {
      for (const branch of data.branches) {
        const found = findNode(branch, id);
        if (found) return found;
      }
    }
    if (data.next) {
      const found = findNode(data.next, id);
      if (found) return found;
    }
    return null;
  }, []);

  const findAncestors = useCallback((data: FlowNodeData, targetId: string, path: string[] = []): string[] | null => {
    if (data.id === targetId) return path;
    if (data.branches) {
      for (const branch of data.branches) {
        const result = findAncestors(branch, targetId, [...path, data.id]);
        if (result) return result;
      }
    }
    if (data.next) {
      const result = findAncestors(data.next, targetId, [...path, data.id]);
      if (result) return result;
    }
    return null;
  }, []);

  const userFlowTreeData = useMemo(() => {
    const uf = projectData.userFlow ? (isEn && projectData.translations?.en?.userFlow ? projectData.translations.en.userFlow : projectData.userFlow) : null;
    return uf ? userFlowToFlowData(uf) : null;
  }, [projectData.userFlow, projectData.translations, isEn]);

  /** Carrousels Playdago hors section #audit (ex. Design system — slides 2–3 = creation atelier) */
  const auditCarouselImages = useMemo(
    () => buildAuditCarouselImages(projectData.title),
    [projectData.title]
  );

  /** Section #audit uniquement : slide 2 MacBook, slide 3 iPad */
  const auditSectionCarouselImages = useMemo(
    () =>
      buildAuditCarouselImages(
        projectData.title,
        auditCarouselMacBookPlaydagoAuditSection,
        auditCarouselHandheldIpadPlaydagoAuditSection
      ),
    [projectData.title]
  );

  /** Design system — Bento 6 tuiles (Playdago & UTOI) */
  const playdagoDsBentoItems = useMemo(() => {
    const n = auditCarouselImages.length;
    const variant = getCaseStudyVariant(projectData.title);
    if (!variant || !projectData.designSystem) {
      return auditCarouselImages.map((img, index) => ({
        src: img.src,
        alt: t(`project.auditAlt${index + 1}`),
        label: `${index + 1} / ${n}`,
      }));
    }
    if (variant === 'utoi') {
      /* Bento 6 : tuiles 3 et 4 = grandes (F1, Grand Tourismo). */
      return [
        { src: UTOI_DS_BENTO_IMAGE_SOURCES.auditStrategy, alt: utoiFrameAlt('Composants UI') },
        { src: UTOI_DS_BENTO_IMAGE_SOURCES.forme, alt: utoiFrameAlt('Formes topographiques') },
        { src: UTOI_DS_BENTO_IMAGE_SOURCES.frame1, alt: utoiFrameAlt('La F1 des montagnes') },
        { src: UTOI_DS_BENTO_IMAGE_SOURCES.frame2, alt: utoiFrameAlt('Grand Tourismo') },
        {
          content: (
            <PlaydagoTypescaleTable
              projectData={projectData}
              t={t}
              typographyHeadingId="utoi-bento-typescale"
            />
          ),
        },
        {
          content: <PlaydagoPaletteTable projectData={projectData} isEn={isEn} t={t} />,
        },
      ];
    }
    const frameAlt = (id: string) => `Playdago — Design system (${id})`;
    return [
      {
        src: playdagoDsFrame1050,
        alt: frameAlt('Frame 1050'),
      },
      {
        src: playdagoDsFrame1051,
        alt: frameAlt('Frame 1051'),
      },
      {
        content: (
          <PlaydagoTypescaleTable
            projectData={projectData}
            t={t}
            typographyHeadingId="playdago-bento-typescale"
          />
        ),
      },
      {
        content: <PlaydagoPaletteTable projectData={projectData} isEn={isEn} t={t} />,
      },
      {
        src: playdagoDsFrame1048,
        alt: frameAlt('Frame 1048'),
      },
      {
        src: playdagoCardSwapDashboard,
        alt: frameAlt('Dashboard'),
        hideMediaFrame: true,
      },
    ];
  }, [projectData, isEn, t, auditCarouselImages]);

  /** Groupes d’images par concept (Playdago & UTOI) */
  const playdagoConceptionConceptGroups = useMemo(() => {
    const variant = getCaseStudyVariant(projectData.title);
    if (variant === 'utoi') return UTOI_CONCEPTION_CONCEPT_GROUPS;
    if (variant === 'playdago') return PLAYDAGO_CONCEPTION_CONCEPT_GROUPS;
    return [[{ src: AUDIT_CAROUSEL_FIRST_DEFAULT.src }]];
  }, [projectData.title]);

  const conceptionSafeConceptIdx =
    playdagoConceptionConceptGroups.length === 0
      ? 0
      : Math.min(
          Math.max(0, playdagoConceptionConceptIndex),
          playdagoConceptionConceptGroups.length - 1
        );

  const playdagoConceptionCurrentSlides = playdagoConceptionConceptGroups[conceptionSafeConceptIdx] ?? [];

  const caseStudyCardSwapSlideSrcs = useMemo(() => {
    if (getCaseStudyVariant(projectData.title) === 'utoi') return UTOI_CARD_SWAP_SLIDE_SRCS;
    return PLAYDAGO_CARD_SWAP_SLIDE_SRCS;
  }, [projectData.title]);

  /** Conception & Itération (Playdago) : H3 + corps — priorité aux champs conception*, repli sur le doublon design system */
  const playdagoConceptionPivotH3 = useMemo(() => {
    if (!usesExtendedCaseStudyLayout(projectData.title)) return undefined;
    return (
      (isEn && projectData.translations?.en?.conceptionDuplicatePivotH3
        ? projectData.translations.en.conceptionDuplicatePivotH3
        : projectData.conceptionDuplicatePivotH3) ??
      (isEn && projectData.translations?.en?.architectureDsDuplicatePivotH3
        ? projectData.translations.en.architectureDsDuplicatePivotH3
        : projectData.architectureDsDuplicatePivotH3)
    );
  }, [projectData, isEn]);

  const playdagoConceptionBody = useMemo(() => {
    if (!usesExtendedCaseStudyLayout(projectData.title)) return '';
    return (
      (isEn && projectData.translations?.en?.conceptionDuplicateBody
        ? projectData.translations.en.conceptionDuplicateBody
        : projectData.conceptionDuplicateBody) ??
      (isEn && projectData.translations?.en?.architectureDsDuplicateBody
        ? projectData.translations.en.architectureDsDuplicateBody
        : projectData.architectureDsDuplicateBody ?? '')
    );
  }, [projectData, isEn]);

  const conceptionSafeSlideIdx =
    playdagoConceptionCurrentSlides.length === 0
      ? 0
      : Math.min(
          Math.max(0, playdagoConceptionSlideIndex),
          playdagoConceptionCurrentSlides.length - 1
        );

  useEffect(() => {
    setPlaydagoConceptionConceptIndex((i) =>
      Math.min(i, Math.max(0, playdagoConceptionConceptGroups.length - 1))
    );
  }, [playdagoConceptionConceptGroups.length]);

  useEffect(() => {
    setPlaydagoConceptionSlideIndex((i) =>
      Math.min(i, Math.max(0, playdagoConceptionCurrentSlides.length - 1))
    );
  }, [conceptionSafeConceptIdx, playdagoConceptionCurrentSlides.length]);

  useEffect(() => {
    const el = playdagoConceptionStageInnerRef.current;
    if (!el) {
      setPlaydagoConceptionSideMaxPx(null);
      return;
    }
    const apply = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) setPlaydagoConceptionSideMaxPx(Math.round(h));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [
    projectData.title,
    conceptionSafeConceptIdx,
    conceptionSafeSlideIdx,
    playdagoConceptionCurrentSlides.length,
  ]);

  const handleUserflowNodeClick = useCallback(
    (nodeId: string) => {
      if (!userFlowTreeData) return;
      const node = findNode(userFlowTreeData, nodeId);
      if (!node) return;
      if (userflowSelectedLeafId === nodeId) {
        setUserflowSelectedLeafId(null);
        setSelectedNodes(new Set());
      } else {
        setUserflowSelectedLeafId(nodeId);
        const ancestors = findAncestors(userFlowTreeData, nodeId);
        setSelectedNodes(new Set(ancestors ? [...ancestors, nodeId] : [nodeId]));
      }
    },
    [findNode, findAncestors, userflowSelectedLeafId, userFlowTreeData]
  );

  /** Pan à la souris uniquement : sur tactile, le scroll natif du wrapper évite de casser les taps sur les bulles. */
  useEffect(() => {
    if (!userFlowTreeData) return;
    const container = userflowTreeContainerRef.current;
    const scrollEl = userflowTreeWrapperRef.current;
    if (!container || !scrollEl) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const PAN_THRESH_PX = 8;
    let activeId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let startScrollTop = 0;
    let panning = false;
    let movedPastThreshold = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button === 2) return;

      /* Ne pas setPointerCapture ici : sur mobile, une capture immédiate vole le pointeur aux bulles
       * et le clic / tap ne se déclenche plus. On ne capture qu’au-delà du seuil de pan (voir pointermove). */
      activeId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startScrollLeft = scrollEl.scrollLeft;
      startScrollTop = scrollEl.scrollTop;
      panning = true;
      movedPastThreshold = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!panning || activeId !== e.pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!movedPastThreshold) {
        if (Math.hypot(dx, dy) < PAN_THRESH_PX) return;
        movedPastThreshold = true;
        container.classList.add('userflow-tree--grabbing');
        try {
          container.setPointerCapture(e.pointerId);
        } catch {
          /* Safari / certains navigateurs : pan sans capture, moins fluide hors zone */
        }
      }
      e.preventDefault();
      scrollEl.scrollLeft = startScrollLeft - dx;
      scrollEl.scrollTop = startScrollTop - dy;
    };

    const endPointer = (e: PointerEvent) => {
      if (!panning || activeId !== e.pointerId) return;
      const didPan = movedPastThreshold;
      panning = false;
      movedPastThreshold = false;
      container.classList.remove('userflow-tree--grabbing');
      if (didPan) {
        try {
          container.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
      activeId = null;
      if (didPan) {
        const blockClick = (ev: MouseEvent) => {
          ev.preventDefault();
          ev.stopImmediatePropagation();
          container.removeEventListener('click', blockClick, true);
        };
        container.addEventListener('click', blockClick, true);
      }
    };

    /* Pas d’écoute wheel + preventDefault : ça bloquait le scroll de la page quand la souris était sur l’arbre. */

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove, { passive: false });
    container.addEventListener('pointerup', endPointer);
    container.addEventListener('pointercancel', endPointer);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', endPointer);
      container.removeEventListener('pointercancel', endPointer);
    };
  }, [userFlowTreeData]);

  // Motion values pour le swipe down
  const y = useMotionValue(0);
  
  // Mémoriser la hauteur de l'écran pour éviter les recalculs
  const screenHeight = useMemo(() => {
    return typeof window !== 'undefined' ? window.innerHeight : 800;
  }, []);

  // Position top : uniquement pilotée par liftScroll (pas par le scroll du contenu)
  const initialTop = useMemo(() => screenHeight * 0.48 + 100, [screenHeight]);
  const topPosition = useMemo(() => {
    const progress = Math.min(liftScroll / LIFT_SCROLL_MAX, 1);
    return initialTop * (1 - progress);
  }, [liftScroll, initialTop]);

  // Notifier le parent pour assombrir la cover (0 = pas assombri, 1 = panneau en haut)
  useEffect(() => {
    if (!onLiftProgressChange) return;
    const progress = Math.min(1, Math.max(0, 1 - topPosition / initialTop));
    onLiftProgressChange(progress);
  }, [topPosition, initialTop, onLiftProgressChange]);

  // Wheel/touch : pendant la phase de montée, seul le panneau monte ; mises à jour throttlées en rAF pour fluidité
  const liftDeltaRef = useRef(0);
  const rafScheduledRef = useRef(false);
  const liftScrollRef = useRef(0);
  liftScrollRef.current = liftScroll;

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const flushLift = () => {
      rafScheduledRef.current = false;
      const delta = liftDeltaRef.current;
      liftDeltaRef.current = 0;
      if (delta === 0) return;
      setLiftScroll(prev => {
        const next = Math.max(0, Math.min(LIFT_SCROLL_MAX, prev + delta));
        return next;
      });
    };

    const scheduleFlush = () => {
      if (rafScheduledRef.current) return;
      rafScheduledRef.current = true;
      requestAnimationFrame(flushLift);
    };

    const handleWheel = (e: WheelEvent) => {
      const scrollTop = el.scrollTop;
      const maxLift = LIFT_SCROLL_MAX;
      const current = liftScrollRef.current;

      if (e.deltaY > 0) {
        if (current < maxLift) {
          liftDeltaRef.current += e.deltaY;
          scheduleFlush();
          e.preventDefault();
        }
      } else {
        if (scrollTop <= 0 && current > 0) {
          liftDeltaRef.current += e.deltaY;
          scheduleFlush();
          e.preventDefault();
        }
      }
    };

    const touchStartY = { current: 0 };
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const deltaY = touchStartY.current - y;
      touchStartY.current = y;

      const scrollTop = el.scrollTop;
      const maxLift = LIFT_SCROLL_MAX;
      const current = liftScrollRef.current;

      if (deltaY > 0) {
        if (current < maxLift) {
          liftDeltaRef.current += deltaY;
          scheduleFlush();
          e.preventDefault();
        }
      } else {
        if (scrollTop <= 0 && current > 0) {
          liftDeltaRef.current += deltaY;
          scheduleFlush();
          e.preventDefault();
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Suivre le scroll du contenu (pour FAB et autres) une fois le panneau en haut
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const handleScroll = () => setContentScrollTop(el.scrollTop);
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    onProjectScrollCombinedChange?.(liftScroll + contentScrollTop);
  }, [liftScroll, contentScrollTop, onProjectScrollCombinedChange]);

  // Notifier le parent de la valeur initiale
  useEffect(() => {
    if (onSwipeYChange) {
      onSwipeYChange(0);
    }
  }, []); // Seulement au montage

  // Remonter en haut de la page et réinitialiser la phase de montée à chaque changement de projet (prev/next)
  useEffect(() => {
    setLiftScroll(0);
    setContentScrollTop(0);
    onLiftProgressChange?.(0);
    const el = pageRef.current;
    if (el) el.scrollTo(0, 0);
  }, [projectData.id, onLiftProgressChange]);

  // JSON-LD CreativeWork pour que les IA et crawlers (avec JS) puissent lire le contenu du projet
  useEffect(() => {
    const baseUrl = (import.meta.env.VITE_SITE_URL as string) || (typeof window !== 'undefined' ? window.location.origin : '')
    const slug = projectData.title.toLowerCase()
    const urlFr = `${baseUrl.replace(/\/$/, '')}/fr/${slug}`
    const urlEn = `${baseUrl.replace(/\/$/, '')}/en/${slug}`
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: projectData.title,
      description: projectData.summary,
      author: { '@type': 'Person', name: 'Anthony Merault', jobTitle: 'Product Designer | Building Complex SaaS & Design Systems' },
      datePublished: projectData.year || undefined,
      url: projectData.projectUrl || urlFr,
      mainEntityOfPage: [{ '@id': urlFr }, { '@id': urlEn }],
      inLanguage: ['fr', 'en'],
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    script.id = 'project-json-ld'
    document.head.appendChild(script)
    return () => {
      const el = document.getElementById('project-json-ld')
      if (el) el.remove()
    }
  }, [projectData.title, projectData.summary, projectData.year, projectData.projectUrl])



  // Vérifier si on peut swiper (on peut toujours swiper depuis la barre)
  const canSwipe = useCallback(() => {
    const target = pageRef.current;
    if (!target) return false;
    // Permettre le swipe même si on a scrollé un peu
    return true;
  }, []);

  // Gestion du drag avec logique exacte comme React Native (comportement Facebook)
  // Comme useAnimatedGestureHandler avec ctx.startY et event.translationY
  const [startY, setStartY] = useState<number | null>(null);
  const [startYValue, setStartYValue] = useState<number>(0); // ctx.startY
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0); // Sauvegarder le scroll initial

  const handleBarMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canSwipe()) {
      const target = pageRef.current;
      setInitialScrollTop(target ? target.scrollTop : 0);
      setIsDragging(true);
      setStartY(e.clientY);
      setStartYValue(y.get()); // Sauvegarder la position Y actuelle (comme ctx.startY)
    }
  };

  const handleBarTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canSwipe()) {
      const target = pageRef.current;
      setInitialScrollTop(target ? target.scrollTop : 0);
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
      setStartYValue(y.get()); // Sauvegarder la position Y actuelle (comme ctx.startY)
    }
  };

  // Event listeners globaux pour suivre le mouvement en temps réel (comme PanGestureHandler)
  useEffect(() => {
    if (!isDragging || startY === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = pageRef.current;
      
      // Calculer la translation depuis le point de départ (comme event.translationY en RN)
      const translationY = e.clientY - startY;
      
      // Si on tire vers le haut (translationY < 0), vérifier si on scroll
      if (translationY < 0) {
        // Si on a scrollé depuis le début du drag, annuler le drag pour permettre le scroll
        if (target && target.scrollTop > initialScrollTop + 5) {
          setIsDragging(false);
          setStartY(null);
          setStartYValue(0);
          y.set(0);
          if (onSwipeYChange) {
            onSwipeYChange(0);
          }
          return;
        }
        // Sinon, ne rien faire pour permettre le scroll normal
        return;
      }
      
      // Si on tire vers le bas (translationY > 0), continuer le drag même si on a scrollé
      e.preventDefault();
      e.stopPropagation();
      
      // Calculer la prochaine position Y (comme ctx.startY + event.translationY dans l'exemple RN)
      const nextY = startYValue + translationY;
      
      // Empêcher de monter au-dessus de 0 (comme Math.max(0, nextY) dans l'exemple RN)
      const newY = Math.max(0, nextY);
      y.set(newY);
      if (onSwipeYChange) {
        onSwipeYChange(newY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = pageRef.current;
      
      // Calculer la translation depuis le point de départ (comme event.translationY en RN)
      const translationY = e.touches[0].clientY - startY;
      
      // Si on tire vers le haut (translationY < 0), vérifier si on scroll
      if (translationY < 0) {
        // Si on a scrollé depuis le début du drag, annuler le drag pour permettre le scroll
        if (target && target.scrollTop > initialScrollTop + 5) {
          setIsDragging(false);
          setStartY(null);
          setStartYValue(0);
          y.set(0);
          if (onSwipeYChange) {
            onSwipeYChange(0);
          }
          return;
        }
        // Sinon, ne rien faire pour permettre le scroll normal
        return;
      }
      
      // Si on tire vers le bas (translationY > 0), continuer le drag même si on a scrollé
      e.preventDefault();
      e.stopPropagation();
      
      // Calculer la prochaine position Y (comme ctx.startY + event.translationY dans l'exemple RN)
      const nextY = startYValue + translationY;
      
      // Empêcher de monter au-dessus de 0 (comme Math.max(0, nextY) dans l'exemple RN)
      const newY = Math.max(0, nextY);
      y.set(newY);
      if (onSwipeYChange) {
        onSwipeYChange(newY);
      }
    };

    // Handler unifié pour mouseup et touchend
    const handleEnd = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const currentY = y.get();
      
      setIsDragging(false);
      setStartY(null);
      setStartYValue(0);
      
      // onEnd : décider de fermer ou revenir (comme dans l'exemple RN)
      if (currentY > CLOSE_THRESHOLD) {
        // Fermer avec animation (comme withSpring(SCREEN_HEIGHT))
        y.set(screenHeight);
        setIsClosing(true);
        setTimeout(() => {
          onBackClick();
        }, 400);
      } else {
        // Revenir à 0 avec animation (comme withSpring(0))
        y.set(0);
        if (onSwipeYChange) {
          onSwipeYChange(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleEnd, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, startY, startYValue, initialScrollTop, y, screenHeight, onSwipeYChange, onBackClick]);

  // Notifier le parent des changements de y directement dans les handlers

  return (
    <>
      <motion.div 
        ref={pageRef}
        className={`page active single-project-page ${isClosing ? 'closing' : ''} ${isDragging ? 'dragging' : ''} ${coverFullscreenActive ? 'cover-fullscreen-active' : ''}`}
        style={
          isDragging
            ? { y: y, top: `${topPosition}px`, borderRadius: topPosition <= 0 ? 0 : '24px 24px 0 0' }
            : { top: `${topPosition}px`, borderRadius: topPosition <= 0 ? 0 : '24px 24px 0 0' }
        }
        animate={
          isDragging
            ? undefined
            : (isClosing || coverFullscreenActive)
              ? { y: screenHeight }
              : { y: 0 }
        }
        transition={coverFullscreenActive
          ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
          : {
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
        initial={false}
      >
        {/* Barre de fermeture en haut */}
        <div 
          ref={barRef}
          className="swipe-indicator-bar"
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleBarMouseDown}
          onTouchStart={handleBarTouchStart}
        >
          <div className="swipe-indicator-handle"></div>
        </div>
        
        <div className="main-single-project">

        {/* 1. Header (Figma: titre → badges) */}
        {/* Bloc unique Figma : titre, badges + Contexte du projet, gap 40px */}
        <div className="project-top-block">
          <div className="project-header-section">
            <h1 className="project-main-title">
              <BlurText text={projectData.title} className="project-main-title" />
            </h1>
            <div className="project-badges">
              {projectCategory && projectCategory !== '2025' && <span className="project-badge">{projectCategory}</span>}
              {projectData.badges?.filter(badge => {
                const categoryBadges = ['Application', 'Site Web', 'Navigation', 'Logo', 'Motion', 'PLV'];
                return !categoryBadges.includes(badge);
              }).map((badge, index) => (
                <span key={index} className="project-badge">{badge}</span>
              ))}
            </div>
            {projectData.subtitle && <p className="project-subtitle">{isEn && projectData.translations?.en?.subtitle ? projectData.translations.en.subtitle : projectData.subtitle}</p>}
            {projectData.projectUrl && (
              <a
                href={projectData.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-external-link"
                onClick={() => trackEvent('click', 'project_external', projectData.title)}
              >
                {t('project.viewProject')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            )}
          </div>

          {/* Contexte du projet (même bloc, gap 40px) */}
          {(projectData.objectifs || projectData.teamNote) && (
            <motion.section id="context" className="project-section context-project-section" {...scrollSectionProps}>
              <div className="context-project-wrapper">
                <h2 className="section-title">{t('project.context')}</h2>
                <div className="context-project-grid">
                <div className="context-project-left">
                  <div className="context-intro">
                    <p>{isEn && projectData.translations?.en?.summary ? projectData.translations.en.summary : projectData.summary}</p>
                  </div>
                  {(projectData.objectifs?.length ?? 0) > 0 && (
                    <div className="context-objectifs">
                      <h3 className="context-subtitle">{t('project.objectives')}</h3>
                      <ol className="context-objectifs-list">
                        {(isEn && projectData.translations?.en?.objectifs ? projectData.translations.en.objectifs : projectData.objectifs!).map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
                <div className="context-project-right">
                  <h3 className="context-equipe-title">{t('project.team')}</h3>
                  <table className="figma-equipe-table">
                    <thead>
                      <tr>
                        <th>{t('project.role')}</th>
                        <th>{t('project.name')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(isEn && projectData.translations?.en?.team ? projectData.translations.en.team : projectData.team).map((member, index) => {
                        const parts = member.includes(',') ? member.split(',').map(s => s.trim()) : [member, ''];
                        const name = parts[0] ?? '';
                        const role = parts[1] ?? '';
                        return (
                          <tr key={index}>
                            <td>{role}</td>
                            <td>{name}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {projectData.teamNote && (
                    <div className="context-my-role">
                      <h3 className="context-subtitle">{t('project.myRole')}</h3>
                      <p className="context-team-note">{isEn && projectData.translations?.en?.teamNote ? projectData.translations.en.teamNote : projectData.teamNote}</p>
                    </div>
                  )}
                </div>
                </div>
              </div>
            </motion.section>
          )}
        </div>

        {/* 1.5. Sommaire */}
        <motion.section className="project-section table-of-contents-section" {...scrollSectionProps}>
          <div ref={tocRef} className="section-card">
            <nav className="table-of-contents">
              <ul className="toc-list">
                <li><a href="#introduction" className="toc-link">{t('project.tocSummary')}</a></li>
                <li><a href="#team" className="toc-link">{t('project.tocTeam')}</a></li>
                {projectData.approach && (
                  <li><a href="#approach" className="toc-link">{projectData.approach.title}</a></li>
                )}
                <li><a href="#case-studie" className="toc-link">{t('project.caseStudie')}</a></li>
                {projectData.wireframes && (
                  <li><a href="#wireframes" className="toc-link">{t('project.ideation')}</a></li>
                )}
                {projectData.designSystem && (
                  <li><a href="#design-system" className="toc-link">{projectData.designSystem.colorPalette.title}</a></li>
                )}
                {projectData.designSystem?.typography && !usesExtendedCaseStudyLayout(projectData.title) && (
                  <li><a href="#typography" className="toc-link">{projectData.designSystem.typography.title}</a></li>
                )}
                <li><a href="#implementation" className="toc-link">{t('project.implementation')}</a></li>
                <li><a href="#results" className="toc-link">{t('project.results')}</a></li>
              </ul>
            </nav>
          </div>
        </motion.section>

        {/* 2. Résumé / Introduction (masqué si Contexte du projet affiché) */}
        {!projectData.objectifs && !projectData.teamNote && (
        <motion.section id="introduction" className="project-section intro-section" {...scrollSectionProps}>
          <div className="section-card intro-metadata-container">
            {introParagraphs.map((part, index) => (
              <div
                key={index}
                className={
                  introParagraphs.length === 1
                    ? 'intro-text-block intro-text-block--full'
                    : `intro-text-block ${index === 0 ? 'intro-text-primary' : 'intro-text-secondary'}`
                }
              >
                <p className="intro-text">{part}</p>
              </div>
            ))}
          </div>
        </motion.section>
        )}

        {/* 2b. Problématique / Solution (gauche) + Matrice de positionnement (droite) */}
        {(projectData.problematique || projectData.solution || projectData.positionnementMatrix) && (
          <motion.section id="problematique" className="project-section problematique-section" {...scrollSectionProps}>
            <div className="problematique-solution-grid">
              <div className="problematique-solution-texts">
                <div className="problematique-block">
                  <h2 className="section-title">{t('project.problematique')}</h2>
                  <p className="problematique-text">{isEn && projectData.translations?.en?.problematique ? projectData.translations.en.problematique : projectData.problematique}</p>
                </div>
                <div className="solution-block">
                  <h2 className="section-title">{t('project.solution')}</h2>
                  <p className="solution-text">{isEn && projectData.translations?.en?.solution ? projectData.translations.en.solution : projectData.solution}</p>
                </div>
              </div>
              {projectData.positionnementMatrix && (
                <div className="positionnement-matrix-wrapper">
                  <PositionnementMatrixChart
                    data={isEn && projectData.translations?.en?.positionnementMatrix ? projectData.translations.en.positionnementMatrix : projectData.positionnementMatrix}
                    className="positionnement-matrix-chart"
                    scrollRootRef={pageRef}
                  />
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* 3. L'équipe projet (Figma 96-98) */}
        {!projectData.teamNote && (
        <motion.section id="team" className="project-section team-section" {...scrollSectionProps}>
          <div className="section-card">
            <h2 className="section-title">{t('project.team')}</h2>
            <table className="figma-equipe-table">
              <thead>
                <tr>
                    <th>{t('project.role')}</th>
                    <th>{t('project.name')}</th>
                </tr>
              </thead>
              <tbody>
                {(isEn && projectData.translations?.en?.team ? projectData.translations.en.team : projectData.team).map((member, index) => {
                  const parts = member.includes(',') ? member.split(',').map(s => s.trim()) : [member, ''];
                  const name = parts[0] ?? '';
                  const role = parts[1] ?? '';
                  return (
                    <tr key={index}>
                      <td>{role}</td>
                      <td>{name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.section>
        )}

        {/* 4. Processus détaillé – 4 cartes (Figma) */}
        {projectData.processReunions && projectData.processReunions.length > 0 && (
          <motion.section id="processus" className="project-section processus-cards-section" {...scrollSectionProps}>
            <h2 className="section-title">{t('project.process')}</h2>
            <p className="processus-intro">{t('project.processIntro')}</p>
            <div className="processus-cards-wrapper">
              <Swiper
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView="auto"
                centeredSlides={false}
                pagination={{ clickable: true }}
                className="processus-cards-swiper"
                onSwiper={(swiper) => {
                  const slideWidthPx = 406;
                  const applySlideWidth = () => {
                    swiper.slides.forEach((slide) => {
                      const el = slide as HTMLElement;
                      el.style.width = `${slideWidthPx}px`;
                      el.style.minWidth = `${slideWidthPx}px`;
                    });
                    swiper.update();
                  };
                  applySlideWidth();
                  swiper.on('resize', applySlideWidth);
                }}
              >
                {(isEn && projectData.translations?.en?.processReunions ? projectData.translations.en.processReunions : projectData.processReunions).map((reunion, index) => (
                  <SwiperSlide key={index} style={{ width: 406, minWidth: 406 }}>
                    <div className="processus-card">
                      <div className="processus-card-content">
                        <span className="processus-card-label">{reunion.label}</span>
                        <h3 className="processus-card-title">{reunion.title}</h3>
                        {reunion.subtitle && (
                          <p className="processus-card-subtitle">{reunion.subtitle}</p>
                        )}
                        <p className="processus-card-desc">{reunion.description}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <p className="processus-summary">{t('project.processSummary')}</p>
          </motion.section>
        )}

        {/* === Contenu Figma 10-84 (après processus) === */}

        {/* Audit */}
        <motion.section id="audit" className="project-section figma-audit-section" {...scrollSectionProps}>
          <h2 className="section-title">{t('project.audit')}</h2>
          {usesExtendedCaseStudyLayout(projectData.title) && (
            <p className="figma-audit-subtitle">
              {isEn ? 'Competitive benchmarking' : 'Benchmark concurrentiel'}
            </p>
          )}
          <div className="figma-two-cols">
            <p className="figma-lead">
              {isEn
                ? projectData.translations?.en?.auditLead ?? t('project.auditLead')
                : projectData.auditLead ?? t('project.auditLead')}
            </p>
            <p className="figma-body">
              {isEn
                ? projectData.translations?.en?.auditBody ?? t('project.auditBody')
                : projectData.auditBody ?? t('project.auditBody')}
            </p>
          </div>
          {/* Carrousel puis texte de synthèse : empilement explicite sous l’intro à deux colonnes */}
          <div
            className="figma-audit-carousel-stack"
            role="group"
            aria-label={isEn ? 'Audit carousel and summary' : 'Carrousel audit et synthèse'}
          >
            <div className="figma-audit-carousel-wrapper">
              <Swiper
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView="auto"
                centeredSlides={false}
                pagination={{ clickable: true }}
                className={
                  usesExtendedCaseStudyLayout(projectData.title)
                    ? 'figma-audit-carousel figma-audit-carousel--playdago'
                    : 'figma-audit-carousel'
                }
                onSwiper={(swiper) => {
                  const idealWidth = 506.667;
                  const applySlideWidth = () => {
                    const w = Math.min(idealWidth, Math.max(0, swiper.width - 24));
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
                {auditSectionCarouselImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={
                        usesExtendedCaseStudyLayout(projectData.title) && index === 0
                          ? 'figma-audit-slide figma-audit-slide--playdago-blue'
                          : 'figma-audit-slide'
                      }
                    >
                      <img src={img.src} alt={t(`project.auditAlt${index + 1}`)} loading="eager" decoding="async" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="figma-two-cols figma-two-cols--audit-after-carousel">
              <p className="figma-lead">
                {isEn
                  ? projectData.translations?.en?.auditLeadAfterCarousel ??
                    projectData.translations?.en?.auditLead ??
                    t('project.auditLead')
                  : projectData.auditLeadAfterCarousel ?? projectData.auditLead ?? t('project.auditLead')}
              </p>
              <p className="figma-body">
                {isEn
                  ? projectData.translations?.en?.auditBodyAfterCarousel ??
                    projectData.translations?.en?.auditBody ??
                    t('project.auditBody')
                  : projectData.auditBodyAfterCarousel ?? projectData.auditBody ?? t('project.auditBody')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Architecture & Flux */}
        <motion.section id="architecture" className="project-section figma-architecture-section" {...scrollSectionProps}>
          <h2 className="section-title">{t('project.architecture')}</h2>
          <div className="figma-two-cols">
            <p className="figma-lead">
              {isEn && projectData.translations?.en?.archLead
                ? projectData.translations.en.archLead
                : projectData.archLead ?? t('project.archLead')}
            </p>
            <p className="figma-body">{t('project.archBody')}</p>
          </div>
          <div className="figma-userflow userflow-arbre-style">
            {userFlowTreeData ? (
              <div className="skill-tree-wrapper" ref={userflowTreeWrapperRef}>
                <div ref={userflowTreeContainerRef} id="userflow-tree" className="skill-tree-container">
                  <TreeNode
                    data={userFlowTreeData}
                    selectedNodes={selectedNodes}
                    onNodeClick={handleUserflowNodeClick}
                    variant="userflow"
                  />
                </div>
              </div>
            ) : (
              <img src="/single-project/fe88fac0-9c5a-44ad-af6a-151d4da1bfa0.png" alt="User flow" className="figma-userflow-img" />
            )}
          </div>

          {/* Playdago : Design system — texte + bento (palette & typéchelle intégrés aux tuiles) */}
          {usesExtendedCaseStudyLayout(projectData.title) && (
            <>
              <div id="design-system" className="figma-audit-playdago-duplicate">
                <h3 className="figma-subsection-title">{t('project.designSystem')}</h3>
                <div className="figma-two-cols">
                  <p className="figma-lead whitespace-pre-line">
                    {isEn && projectData.translations?.en?.architectureDsDuplicateLead
                      ? projectData.translations.en.architectureDsDuplicateLead
                      : projectData.architectureDsDuplicateLead ?? ''}
                  </p>
                  <p className="figma-body whitespace-pre-line">
                    {isEn && projectData.translations?.en?.architectureDsDuplicateBody
                      ? projectData.translations.en.architectureDsDuplicateBody
                      : projectData.architectureDsDuplicateBody ?? ''}
                  </p>
                </div>
                <div
                  className={
                    usesUtoidCaseStudyLayout(projectData.title)
                      ? 'playdago-ds-magic-bento-wrap playdago-ds-magic-bento-wrap--utoi'
                      : 'playdago-ds-magic-bento-wrap'
                  }
                >
                  <MagicBento
                    className="playdago-ds-magic-bento"
                    imageItems={playdagoDsBentoItems}
                    glowColor={
                      usesUtoidCaseStudyLayout(projectData.title) ? '27, 122, 78' : '241, 88, 42'
                    }
                  />
                </div>
              </div>

              <div className="figma-audit-playdago-duplicate figma-audit-playdago-duplicate--stacked">
                <h3 className="figma-subsection-title">{t('project.conception')}</h3>
                <p className="figma-lead figma-lead--playdago-conception-stacked whitespace-pre-line">
                  {isEn && projectData.translations?.en?.conceptionDuplicateLead
                    ? projectData.translations.en.conceptionDuplicateLead
                    : projectData.conceptionDuplicateLead ?? ''}
                </p>
                <div
                  className={
                    usesUtoidCaseStudyLayout(projectData.title)
                      ? 'playdago-conception-swap-copy-row playdago-conception-swap-copy-row--text-only'
                      : 'playdago-conception-swap-copy-row'
                  }
                >
                  <div className="playdago-ds-stacked-body-col playdago-ds-stacked-body-col--swap-row">
                    {playdagoConceptionPivotH3 && (
                      <h3 className="figma-ds-pivot-h3">{playdagoConceptionPivotH3}</h3>
                    )}
                    <p className="figma-body whitespace-pre-line">{playdagoConceptionBody}</p>
                  </div>
                  {usesPlaydagoCaseStudyLayout(projectData.title) && (
                  <div className="figma-audit-carousel-wrapper playdago-conception-gallery-wrap playdago-conception-gallery-wrap--swap-copy-row">
                    <div
                      className="playdago-conception-gallery playdago-conception-gallery--hidden"
                      role="region"
                      aria-label={t('project.conception')}
                      style={
                        {
                          '--playdago-conception-n': playdagoConceptionConceptGroups.length,
                          '--playdago-conception-images-n': playdagoConceptionCurrentSlides.length,
                          ...(playdagoConceptionSideMaxPx != null
                            ? { '--playdago-conception-side-max-h': `${playdagoConceptionSideMaxPx}px` }
                            : {}),
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="playdago-conception-concept-triggers"
                        role="group"
                        aria-label={t('project.conceptionGraduationGroup')}
                      >
                      {playdagoConceptionConceptGroups.map((_, conceptIdx) => (
                        <button
                          key={conceptIdx}
                          type="button"
                          className={`playdago-conception-concept-item${
                            conceptionSafeConceptIdx === conceptIdx
                              ? ' playdago-conception-concept-item--active'
                              : ''
                          }`}
                          aria-pressed={conceptionSafeConceptIdx === conceptIdx}
                          aria-controls="playdago-conception-main"
                          onClick={() => {
                            setPlaydagoConceptionConceptIndex(conceptIdx);
                            setPlaydagoConceptionSlideIndex(0);
                          }}
                        >
                          <span className="playdago-conception-concept-item__icon">
                            <PlaydagoConceptionGraduationIcon />
                          </span>
                          <span className="playdago-conception-concept-item__label">
                            {t('project.conceptGraduationLabel', { n: conceptIdx + 1 })}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="playdago-conception-stage">
                      <div
                        ref={playdagoConceptionStageInnerRef}
                        className="playdago-conception-stage-inner"
                        id="playdago-conception-main"
                      >
                        <img
                          src={playdagoConceptionCurrentSlides[conceptionSafeSlideIdx]?.src}
                          alt={t('project.conceptionStageAlt', {
                            concept: conceptionSafeConceptIdx + 1,
                            slide: conceptionSafeSlideIdx + 1,
                          })}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => {
                            const el = playdagoConceptionStageInnerRef.current;
                            if (el) {
                              const h = el.getBoundingClientRect().height;
                              if (h > 0) setPlaydagoConceptionSideMaxPx(Math.round(h));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="playdago-conception-thumbs-wrap">
                      <div
                        className="playdago-conception-thumbs"
                        role="tablist"
                        aria-label={t('project.conceptionVerticalCarousel')}
                      >
                        {playdagoConceptionCurrentSlides.map((img, index) => (
                          <button
                            key={`${conceptionSafeConceptIdx}-${index}`}
                            type="button"
                            role="tab"
                            id={`playdago-conception-thumb-${conceptionSafeConceptIdx}-${index}`}
                            tabIndex={playdagoConceptionSlideIndex === index ? 0 : -1}
                            aria-selected={playdagoConceptionSlideIndex === index}
                            aria-controls="playdago-conception-main"
                            className={`playdago-conception-thumb${playdagoConceptionSlideIndex === index ? ' playdago-conception-thumb--active' : ''}`}
                            onClick={() => setPlaydagoConceptionSlideIndex(index)}
                          >
                            <img src={img.src} alt="" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {caseStudyCardSwapSlideSrcs.length >= 2 && (
                    <div
                      className="playdago-conception-card-swap-wrap"
                      role="region"
                      aria-label={t('project.cardSwapAria')}
                    >
                      <CardSwap
                        width="min(100%, 560px)"
                        height={400}
                        cardDistance={56}
                        verticalDistance={68}
                        dropDistance={320}
                        delay={8000}
                        pauseOnHover
                        skewAmount={0}
                        easing="elastic"
                        containerClassName="playdago-card-swap-aspect relative mx-auto perspective-[900px] overflow-visible max-[480px]:scale-[0.88]"
                      >
                        {caseStudyCardSwapSlideSrcs.map((src, idx) => (
                          <Card
                            key={`case-study-card-swap-${idx}`}
                            customClass="!border-[#b2aaaa] !bg-[#EAEAE6] shadow-md box-border overflow-hidden p-2"
                          >
                            <img
                              src={src}
                              alt=""
                              className="playdago-card-swap-img h-full w-full min-h-0 object-contain object-top"
                              loading="lazy"
                              decoding="async"
                            />
                          </Card>
                        ))}
                      </CardSwap>
                    </div>
                  )}
                  </div>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.section>

        {/* Design system — Playdago : contenu déplacé sous Architecture (switch carrousel / tables) */}
        {projectData.designSystem && !usesExtendedCaseStudyLayout(projectData.title) && (
          <motion.section id="design-system" className="project-section figma-design-system-section" {...scrollSectionProps}>
            <h2 className="section-title">{t('project.designSystem')}</h2>
            <h3 className="figma-palette-title">{t('project.palette')}</h3>
            <p className="figma-caption">{t('project.materialDesign')}</p>
            <div className="figma-palette-table">
              <div className="figma-palette-header">
                <span>{t('project.roleToken')}</span>
                <span>{t('project.usage')}</span>
                <span className="figma-palette-header-hex">{t('project.hexValue')}</span>
              </div>
              {(projectData.title === 'Pedaboard'
                ? (isEn
                    ? [
                        { role: 'Primary', usage: 'Brand color. Used for key elements (primary buttons, active states).', color: '#f07f00' },
                        { role: 'On Primary', usage: 'Text & icons on Primary color.', color: '#ffffff' },
                        { role: 'Secondary', usage: 'Brand & titles. The distinctive "Teal". Used for titles, logo and major interactive elements.', color: '#006d73' },
                        { role: 'On Secondary', usage: 'Readability. Ensures clarity of content on accent elements (Teal).', color: '#ffffff' },
                        { role: 'Surface (Main)', usage: 'App background. Very pale grey ("Off-White") to structure the workspace and reduce glare.', color: '#f1f3f4' },
                        { role: 'On Surface', usage: 'Main text. Navy blue (not black) to reduce eye strain.', color: '#2b2e48' },
                        { role: 'On Surface (Subtle)', usage: 'Secondary text. Medium grey for metadata and less important labels.', color: '#7d7d7d' },
                      ]
                    : [
                        { role: 'Primary', usage: 'Couleur de marque. Utilisée pour les éléments clés (Boutons principaux, États actifs).', color: '#f07f00' },
                        { role: 'On Primary', usage: 'Texte & Icônes posés sur la couleur Primary.', color: '#ffffff' },
                        { role: 'Secondary', usage: 'Marque & Titres. Le "Bleu Canard" identitaire. Utilisé pour les titres, le logo et les éléments interactifs majeurs.', color: '#006d73' },
                        { role: 'On Secondary', usage: "Lisibilité. Assure la clarté des contenus positionnés sur les éléments d'accentuation (Vert Canard).", color: '#ffffff' },
                        { role: 'Surface (Main)', usage: "Fond d'Application. Un gris très pâle (« Off-White ») pour structurer l'espace de travail et réduire l'éblouissement.", color: '#f1f3f4' },
                        { role: 'On Surface', usage: 'Texte Principal. Un Bleu Nuit (et non du noir) qui réduit la fatigue oculaire.', color: '#2b2e48' },
                        { role: 'On Surface (Subtle)', usage: "Texte Secondaire. Gris moyen pour les métadonnées et labels moins importants, afin de hiérarchiser l'information.", color: '#7d7d7d' },
                      ])
                : (projectData.designSystem.colorPalette?.categories?.neutrals?.colors ?? []).slice(0, 7).map((c: { role: string; usage?: string; color: string }, i: number) => {
                    const en = isEn && projectData.translations?.en?.designSystemNeutrals?.[i];
                    return { role: en?.role ?? c.role, usage: en?.usage ?? (c as { usage?: string }).usage ?? '', color: c.color };
                  })
              ).map((c: { role: string; usage: string; color: string }, i: number) => (
                <div key={i} className="figma-palette-row">
                  <span>{c.role}</span>
                  <span>{c.usage}</span>
                  <span className="figma-swatch" style={{ backgroundColor: c.color }}>{c.color}</span>
                </div>
              ))}
            </div>
            <h3 className="figma-typescale-title">{t('project.typescale')}</h3>
            <p className="figma-caption">{t('project.baseValue')}</p>
            {projectData.designSystem && (
              <div className="figma-typescale-table">
                <div className="figma-typescale-header">
                  <span>{t('project.roleCol')}</span>
                  <span>{t('project.typography')}</span>
                  <span>{t('project.size')}</span>
                  <span>{t('project.lineHeight')}</span>
                  <span>{t('project.example')}</span>
                </div>
                {(projectData.title === 'Pedaboard'
                  ? [
                      { role: 'H1', typo: 'Inter Bold', size: '32px (2.0rem)', line: '150% (48px)', weight: 700, sizePx: 32, example: 'The Quick Brown Fox Jumps Over The Lazy Dog' },
                      { role: 'H2', typo: 'Inter SemiBold', size: '29px (1.8rem)', line: '150% (44px)', weight: 600, sizePx: 29, example: 'The Quick Brown Fox Jumps Over The Lazy Dog' },
                      { role: 'H3', typo: 'Inter Medium', size: '26px (1.6rem)', line: '150% (39px)', weight: 500, sizePx: 26, example: 'The Quick Brown Fox Jumps Over The Lazy Dog' },
                      { role: 'H4', typo: 'Inter Medium', size: '23px (1.4rem)', line: '150% (35px)', weight: 500, sizePx: 23, example: 'The Quick Brown Fox Jumps Over The Lazy Dog' },
                      { role: 'Body', typo: 'Inter Regular', size: '16px (1.0rem)', line: '150% (24px)', weight: 400, sizePx: 16, example: 'The Quick Brown Fox Jumps Over The Lazy Dog' },
                      { role: 'Label', typo: 'Inter Medium', size: '14px (0.875rem)', line: '150% (21px)', weight: 500, sizePx: 14, example: 'The Quick Brown Fox Jumps Over The Lazy Dog' },
                      { role: 'Caption', typo: 'Inter Regular', size: '13px (0.8rem)', line: '150% (20px)', weight: 400, sizePx: 13, example: 'The quick brown fox jumps over the lazy dog' },
                    ]
                  : (projectData.designSystem.typography?.items ?? []).slice(0, 7).map((item: { style: string; font: string; size: string; lineHeight: string }) => {
                      const sizeNum = parseInt(item.size, 10) || 16;
                      const weight = item.font.toLowerCase().includes('bold') ? 700 : item.font.toLowerCase().includes('semi') ? 600 : item.font.toLowerCase().includes('medium') ? 500 : 400;
                      return {
                        role: item.style,
                        typo: item.font,
                        size: `${item.size}px`,
                        line: item.lineHeight,
                        weight,
                        sizePx: sizeNum,
                        example: 'The Quick Brown Fox Jumps Over The Lazy Dog',
                      };
                    })
                ).map((row: { role: string; typo: string; size: string; line: string; weight: number; sizePx: number; example: string }, i: number) => (
                  <div key={i} className="figma-typescale-row">
                    <span className="figma-typescale-role">{row.role}</span>
                    <span className="figma-typescale-typo">{row.typo}</span>
                    <span className="figma-typescale-size">{row.size}</span>
                    <span className="figma-typescale-line">{row.line}</span>
                    <span className="figma-typescale-example" style={{ fontWeight: row.weight, fontSize: row.sizePx, lineHeight: 1.5 }}>{row.example}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Conception & Itération (Figma 100-424) — masqué sur Playdago (doublon couvert par le bloc sous l’arbre user flow) */}
        {!usesExtendedCaseStudyLayout(projectData.title) && (
        <motion.section id="conception" className="project-section figma-conception-section" {...scrollSectionProps}>
          <h2 className="section-title">{t('project.conception')}</h2>
          <div className="figma-two-cols">
            <p className="figma-lead">{t('project.conceptionLead1')}</p>
            <p className="figma-lead">{t('project.conceptionLead2')}</p>
          </div>
          <div className="figma-conception-mockups">
            <div className="figma-conception-card">
              <div className="figma-conception-card-media">
                <img src="/single-project/92b9c4b3-3a47-4482-ba0f-a5d916be93e1.png" alt={t('project.wireframeAlt')} />
              </div>
              <div className="figma-conception-captions">
                <p className="figma-conception-caption">{t('project.conceptionCaption1')}</p>
                <p className="figma-conception-caption">{t('project.conceptionCaption2')}</p>
              </div>
            </div>
            <div className="figma-conception-card">
              <div className="figma-conception-card-media">
                <img src="/single-project/b81a3920-b92d-4a7d-af4c-4223b3f89174.png" alt={t('project.maquetteAlt')} />
              </div>
              <div className="figma-conception-captions">
                <p className="figma-conception-caption">{t('project.conceptionCaption3')}</p>
                <p className="figma-conception-caption">{t('project.conceptionCaption4')}</p>
              </div>
            </div>
          </div>
        </motion.section>
        )}

        {/* Bloc présentation plein écran (scroll stack) — Playdago & UTOI */}
        {(usesPlaydagoCaseStudyLayout(projectData.title) ||
          usesUtoidCaseStudyLayout(projectData.title)) && (
        <div
          className={
            usesUtoidCaseStudyLayout(projectData.title)
              ? 'figma-light-mode-group figma-light-mode-group--utoi'
              : 'figma-light-mode-group'
          }
        >
          {usesPlaydagoCaseStudyLayout(projectData.title) && (
            <PlaydagoH1HandwritingLogo className="figma-light-mode-h1-logo" scrollContainerRef={pageRef} />
          )}
          <motion.section id="light-mode" className="project-section figma-light-mode-section" {...scrollSectionProps}>
            <ScrollStack
              scrollRootRef={pageRef}
              centerStackVertically
              smoothFactor={0.22}
              itemDistance={72}
              itemStackDistance={32}
              stackPosition="22%"
              baseScale={0.82}
              itemScale={0.035}
              className="figma-light-mode-scroll-stack"
            >
              {(usesUtoidCaseStudyLayout(projectData.title)
                ? UTOI_PRESENTATION_IMAGES
                : [
                    { src: playdagoLightModeMaine, alt: t('project.contrastImageAlt') },
                    { src: playdagoLightModeSinglePage, alt: t('project.lightModeSinglePageAlt') },
                    { src: playdagoLightModeSetp1, alt: t('project.lightModeSetp1Alt') },
                  ]
              ).map((slide, index) => (
                <ScrollStackItem key={index} itemClassName="figma-light-mode-scroll-stack-card">
                  <div className="figma-light-mode-img-frame figma-light-mode-img-frame--stack-item">
                    <img
                      src={slide.src}
                      alt={slide.alt ?? ''}
                      className={
                        index === 0
                          ? 'figma-light-mode-zoom-img'
                          : 'figma-light-mode-zoom-img figma-light-mode-extra-img'
                      }
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </motion.section>
        </div>
        )}

        {/* Mes autres projets (Figma 117-135 : slider type carousel) */}
        <motion.section id="autres-projets" className="project-section figma-autres-projets-section" {...scrollSectionProps}>
          <h2 className="section-title">{t('project.otherProjects')}</h2>
          <div className="figma-autres-projets-carousel-wrapper">
            <Swiper
              modules={[Pagination]}
              className="figma-autres-projets-carousel"
              spaceBetween={24}
              slidesPerView="auto"
              centeredSlides
              centeredSlidesBounds
              watchSlidesProgress
              roundLengths
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                const idealWidth = 1118;
                const applySlideWidth = () => {
                  const w = Math.min(idealWidth, Math.max(0, Math.floor(swiper.width - 48)));
                  swiper.slides.forEach((slide) => {
                    const el = slide as HTMLElement;
                    el.style.width = `${w}px`;
                    el.style.minWidth = `${w}px`;
                    el.style.maxWidth = `${w}px`;
                  });
                  swiper.update();
                  swiper.slideTo(swiper.activeIndex, 0, false);
                };
                applySlideWidth();
                swiper.on('resize', applySlideWidth);
              }}
            >
              {[
                { slug: 'Pedaboard', title: 'Pedaboard', date: t('project.december2023'), badges: [t('hero.categoryApplicationWeb'), 'UX/UI', 'CRM'], coverImage: '/images/cover-project-pedaboard.png' },
                { slug: 'Playdago', title: 'Playdago', date: t('project.february2025'), badges: [t('hero.categoryApplication'), 'UX/UI', 'SaaS'], coverImage: '/images/cover-project-playdago.png' },
                { slug: 'UTOI', title: 'UTOI', date: '2025', badges: [t('hero.categorySiteWeb'), 'UX/UI'], coverImage: '/images/cover-project-utoi.png' },
                { slug: 'Kaldera', title: 'Kaldera', date: '2025', badges: [t('hero.categorySiteWeb'), 'UX/UI', 'Simulation'], coverImage: '/images/cover-project-kaldera.png' },
              ].map((proj) => (
                <SwiperSlide key={proj.slug}>
                  <a href={`/project/${proj.slug}`} className="figma-projet-mockup-card">
                    <div className="figma-projet-mockup">
                      <div className="figma-projet-mockup-screen">
                        <img src={proj.coverImage} alt={proj.title} loading="lazy" decoding="async" />
                      </div>
                      <div className="figma-projet-mockup-overlay">
                        {proj.date && <span className="figma-projet-date">{proj.date}</span>}
                        <h3 className="figma-projet-name">{proj.title}</h3>
                        {proj.badges && proj.badges.length > 0 && (
                          <div className="figma-projet-badges">
                            {proj.badges.map((badge: string) => (
                              <span key={badge} className="project-badge">{badge}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.section>

        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
        </div>
      </motion.div>

      {/* Bouton Contact fixe en bas d'écran, visible au scroll (même style que close/arrows) */}
      {(liftScroll + contentScrollTop) > 150 && (
        <div className="single-project-contact-fab-wrap">
          <button
            type="button"
            className="single-project-contact-fab"
            onClick={() => {
              trackEvent('click', 'project_cta', 'contact_fab');
              setShowContactModal(true);
            }}
            aria-label={t('project.contactMe')}
          >
            {t('project.contactMe')}
          </button>
        </div>
      )}
    </>
  );
};

export default SingleProjectNew;
