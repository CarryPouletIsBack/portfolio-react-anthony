import type { ProjectData } from '../data/projectsNew';

type TFn = (key: string) => string;

/** Parse #RGB, #RRGGBB ou rgb()/rgba() → canaux 0–255 */
function parseColorToRgb(input: string): { r: number; g: number; b: number } | null {
  const s = input.trim();
  if (!s) return null;

  let m = s.match(/^#([0-9a-fA-F]{3})$/);
  if (m) {
    const x = m[1];
    return {
      r: parseInt(x[0] + x[0], 16),
      g: parseInt(x[1] + x[1], 16),
      b: parseInt(x[2] + x[2], 16),
    };
  }
  m = s.match(/^#([0-9a-fA-F]{6})$/);
  if (m) {
    const x = m[1];
    return {
      r: parseInt(x.slice(0, 2), 16),
      g: parseInt(x.slice(2, 4), 16),
      b: parseInt(x.slice(4, 6), 16),
    };
  }
  m = s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (m) {
    return {
      r: Math.round(Math.min(255, Math.max(0, Number(m[1])))),
      g: Math.round(Math.min(255, Math.max(0, Number(m[2])))),
      b: Math.round(Math.min(255, Math.max(0, Number(m[3])))),
    };
  }
  return null;
}

/** Texte lisible sur le fond : noir si fond clair, blanc si fond sombre (luminance WCAG). */
function contrastTextOnBackground(bg: string): '#000000' | '#ffffff' {
  const rgb = parseColorToRgb(bg);
  if (!rgb) return '#000000';
  const lin = (c: number) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b);
  return L > 0.52 ? '#000000' : '#ffffff';
}

interface BaseProps {
  projectData: ProjectData;
  isEn: boolean;
  t: TFn;
}

function buildPaletteRows(projectData: ProjectData, isEn: boolean) {
  const ds = projectData.designSystem;
  if (!ds) return [];
  return (ds.colorPalette?.categories?.neutrals?.colors ?? []).slice(0, 7).map(
    (c: { role: string; usage?: string; color: string }, i: number) => {
      const en = isEn && projectData.translations?.en?.designSystemNeutrals?.[i];
      return { role: en?.role ?? c.role, usage: en?.usage ?? (c as { usage?: string }).usage ?? '', color: c.color };
    }
  );
}

function buildTypoRows(projectData: ProjectData) {
  const ds = projectData.designSystem;
  if (!ds) return [];
  return (ds.typography?.items ?? []).slice(0, 7).map((item: { style: string; font: string; size: string; lineHeight: string }) => {
    const sizeNum = parseInt(item.size, 10) || 16;
    const weight = item.font.toLowerCase().includes('bold')
      ? 700
      : item.font.toLowerCase().includes('semi')
        ? 600
        : item.font.toLowerCase().includes('medium')
          ? 500
          : 400;
    return {
      role: item.style,
      typo: item.font,
      size: `${item.size}px`,
      line: item.lineHeight,
      weight,
      sizePx: sizeNum,
      example: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    };
  });
}

/** Table palette seule */
export function PlaydagoPaletteTable({ projectData, isEn, t }: BaseProps) {
  const ds = projectData.designSystem;
  if (!ds) return null;
  const paletteRows = buildPaletteRows(projectData, isEn);

  return (
    <div className="playdago-ds-tables playdago-ds-tables--palette">
      <h3 className="figma-palette-title">{t('project.palette')}</h3>
      <p className="figma-caption">{t('project.materialDesign')}</p>
      <div className="figma-palette-table">
        <div className="figma-palette-header">
          <span>{t('project.roleToken')}</span>
          <span>{t('project.usage')}</span>
          <span className="figma-palette-header-hex">{t('project.hexValue')}</span>
        </div>
        {paletteRows.map((c: { role: string; usage: string; color: string }, i: number) => (
          <div key={i} className="figma-palette-row">
            <span>{c.role}</span>
            <span>{c.usage}</span>
            <span
              className="figma-swatch"
              style={{
                backgroundColor: c.color,
                color: contrastTextOnBackground(c.color),
              }}
            >
              {c.color}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Taille d’exemple dans la tuile bento (évite le débordement tout en gardant une hiérarchie). */
function typescaleExamplePxForBento(designSizePx: number): number {
  return Math.min(26, Math.max(10, Math.round(8 + designSizePx * 0.36)));
}

/** Table typescale seule */
export function PlaydagoTypescaleTable({
  projectData,
  t,
  typographyHeadingId = 'typography',
}: Omit<BaseProps, 'isEn'> & { typographyHeadingId?: string }) {
  const ds = projectData.designSystem;
  if (!ds) return null;
  const typoRows = buildTypoRows(projectData);
  const bentoTile =
    typographyHeadingId === 'playdago-bento-typescale' ||
    typographyHeadingId === 'utoi-bento-typescale';

  return (
    <div className={`playdago-ds-tables playdago-ds-tables--typescale${bentoTile ? ' playdago-ds-tables--typescale-bento' : ''}`}>
      <h3 id={typographyHeadingId} className="figma-typescale-title">
        {t('project.typescale')}
      </h3>
      <p className="figma-caption">{t('project.baseValue')}</p>
      <div className={`figma-typescale-table${bentoTile ? ' figma-typescale-table--bento' : ''}`}>
        <div className="figma-typescale-header">
          <span>{t('project.roleCol')}</span>
          <span>{t('project.typography')}</span>
          <span>{t('project.size')}</span>
          <span>{t('project.lineHeight')}</span>
          <span>{t('project.example')}</span>
        </div>
        {typoRows.map(
          (
            row: { role: string; typo: string; size: string; line: string; weight: number; sizePx: number; example: string },
            i: number
          ) => {
            const examplePx = bentoTile ? typescaleExamplePxForBento(row.sizePx) : row.sizePx;
            return (
              <div key={i} className="figma-typescale-row">
                <span className="figma-typescale-role">{row.role}</span>
                <span className="figma-typescale-typo">{row.typo}</span>
                <span className="figma-typescale-size">{row.size}</span>
                <span className="figma-typescale-line">{row.line}</span>
                <span
                  className="figma-typescale-example"
                  style={{ fontWeight: row.weight, fontSize: examplePx, lineHeight: bentoTile ? 1.3 : 1.5 }}
                >
                  {row.example}
                </span>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
