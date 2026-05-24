export type AssetKind = 'props' | 'tiles' | 'icons'
export type VisualStyle = 'pixel' | 'flat' | 'tech'
export type ThemeName = 'forest' | 'desert' | 'ice' | 'lava' | 'cyber'

export interface GeneratorForm {
  projectName: string
  theme: ThemeName
  assetKind: AssetKind
  style: VisualStyle
  size: number
  count: number
}

export interface AssetItem {
  id: string
  name: string
  label: string
  svg: string
}

export interface AssetBatch {
  projectName: string
  size: number
  assets: AssetItem[]
}

const themeColors: Record<ThemeName, { bg: string; base: string; accent: string; line: string }> = {
  forest: { bg: '#eef7df', base: '#5b8c3a', accent: '#8b5a2b', line: '#2d3421' },
  desert: { bg: '#fff2dd', base: '#d8a15d', accent: '#9a5d2f', line: '#5a3a22' },
  ice: { bg: '#f3fbff', base: '#63b3d7', accent: '#90a8ff', line: '#224255' },
  lava: { bg: '#3a2525', base: '#ef7d42', accent: '#ffd166', line: '#180d0d' },
  cyber: { bg: '#141a2d', base: '#4f86ff', accent: '#52e5c7', line: '#08101f' },
}

const labels: Record<AssetKind, string[]> = {
  props: ['道具-1', '道具-2', '道具-3', '道具-4', '道具-5', '道具-6'],
  tiles: ['地块-1', '地块-2', '地块-3', '地块-4', '地块-5', '地块-6'],
  icons: ['图标-1', '图标-2', '图标-3', '图标-4', '图标-5', '图标-6'],
}

export function generateBatch(form: GeneratorForm): AssetBatch {
  const size = clamp(form.size, 64, 128)
  const count = clamp(form.count, 4, 12)
  const rand = makeRandom(`${form.projectName}-${form.theme}-${form.assetKind}-${form.style}-${size}`)
  const assets: AssetItem[] = []

  for (let index = 0; index < count; index += 1) {
    assets.push({
      id: `${form.assetKind}-${index + 1}`,
      name: `${slugify(form.projectName)}-${index + 1}`,
      label: labels[form.assetKind][index % labels[form.assetKind].length],
      svg: buildSvg(form.theme, form.assetKind, form.style, size, rand),
    })
  }

  return {
    projectName: form.projectName.trim() || 'asset-pack',
    size,
    assets,
  }
}

export function makePreviewUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function buildSvg(
  theme: ThemeName,
  kind: AssetKind,
  style: VisualStyle,
  size: number,
  rand: () => number,
) {
  const palette = themeColors[theme]
  const stroke = style === 'pixel' ? 10 : style === 'flat' ? 8 : 6
  const radius = style === 'tech' ? 28 : style === 'flat' ? 36 : 22
  const shift = Math.round(rand() * 30)

  const body =
    kind === 'tiles'
      ? `<rect x="110" y="110" width="292" height="292" rx="${radius}" fill="${palette.base}" stroke="${palette.line}" stroke-width="${stroke}" />
         <path d="M150 ${256 + shift} H362" stroke="${palette.accent}" stroke-width="${stroke}" stroke-linecap="round" />`
      : kind === 'icons'
        ? `<circle cx="256" cy="256" r="${110 + shift / 3}" fill="${palette.base}" />
           <path d="M256 146 L326 256 L256 366 L186 256 Z" fill="${palette.accent}" />`
        : `<rect x="${176 + shift / 2}" y="122" width="160" height="250" rx="${radius}" fill="${palette.base}" stroke="${palette.line}" stroke-width="${stroke}" />
           <circle cx="256" cy="255" r="36" fill="${palette.accent}" />
           <rect x="226" y="180" width="60" height="48" rx="12" fill="#ffffff" opacity="0.22" />`

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="48" fill="${palette.bg}" />
  <ellipse cx="256" cy="412" rx="110" ry="24" fill="${palette.line}" opacity="0.1" />
  ${body}
</svg>`.trim()
}

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'asset-pack'
}

function makeRandom(seed: string) {
  let value = hash(seed)

  return function random() {
    value += 0x6d2b79f5
    let next = value
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

function hash(input: string) {
  let value = 2166136261

  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index)
    value = Math.imul(value, 16777619)
  }

  return value >>> 0
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}
