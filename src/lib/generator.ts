import { iconCatalog } from './iconCatalog'

export type AssetKind = 'props' | 'tiles' | 'icons'
export type VisualStyle = 'pixel' | 'flat' | 'tech'
export type ThemeName = 'forest' | 'desert' | 'ice' | 'lava' | 'cyber'

export interface GeneratorForm {
  projectName: string
  theme: ThemeName
  prompt: string
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
  theme: ThemeName
  palette: string[]
  assets: AssetItem[]
  meta: {
    themeLabel: string
    prompt: string
    style: VisualStyle
    styleLabel: string
    assetKind: AssetKind
    assetKindLabel: string
  }
}

interface PalettePack {
  background: string
  panel: string
  base: string
  accent: string
  light: string
  line: string
}

interface IconEntry {
  label: string
  icon: string
}

interface IconifyIcon {
  body: string
  width?: number
  height?: number
}

const iconSet = iconCatalog as Record<string, IconifyIcon>
const defaultViewBoxWidth = 512
const defaultViewBoxHeight = 512

const paletteMap: Record<ThemeName, Record<VisualStyle, PalettePack>> = {
  forest: {
    pixel: {
      background: '#f3edd8',
      panel: '#fbf7ea',
      base: '#6f8f45',
      accent: '#8b5a2b',
      light: '#b8d97d',
      line: '#2d3421',
    },
    flat: {
      background: '#edf6df',
      panel: '#f8fdf0',
      base: '#4c9a5b',
      accent: '#8a5b3d',
      light: '#b7e3ab',
      line: '#27412d',
    },
    tech: {
      background: '#eaf5e8',
      panel: '#f4fcf2',
      base: '#2f7c63',
      accent: '#b7ff61',
      light: '#8ce6bb',
      line: '#163328',
    },
  },
  desert: {
    pixel: {
      background: '#f8ecd0',
      panel: '#fff8e7',
      base: '#c89a4a',
      accent: '#9a5d2f',
      light: '#f2d994',
      line: '#4a3620',
    },
    flat: {
      background: '#fff2dd',
      panel: '#fff8ee',
      base: '#e2a34f',
      accent: '#bd6e33',
      light: '#ffe29e',
      line: '#6a4425',
    },
    tech: {
      background: '#fff0db',
      panel: '#fff8ef',
      base: '#92765e',
      accent: '#4ad5da',
      light: '#ffe29b',
      line: '#30221a',
    },
  },
  ice: {
    pixel: {
      background: '#eef7ff',
      panel: '#f7fbff',
      base: '#68a9d4',
      accent: '#7c68d4',
      light: '#d0ebff',
      line: '#24435b',
    },
    flat: {
      background: '#f3fbff',
      panel: '#fafdff',
      base: '#5cb6d8',
      accent: '#90a8ff',
      light: '#d8f3ff',
      line: '#224255',
    },
    tech: {
      background: '#edf9ff',
      panel: '#f5fdff',
      base: '#4f8cff',
      accent: '#91fff2',
      light: '#b0f1ff',
      line: '#173056',
    },
  },
  lava: {
    pixel: {
      background: '#2d1f1f',
      panel: '#412b2b',
      base: '#dd6a36',
      accent: '#ffe16b',
      light: '#ffb347',
      line: '#120b0b',
    },
    flat: {
      background: '#362222',
      panel: '#4a2f2f',
      base: '#ff8a4c',
      accent: '#ffe98a',
      light: '#ffc864',
      line: '#180d0d',
    },
    tech: {
      background: '#241818',
      panel: '#382424',
      base: '#ff5a36',
      accent: '#ffd60a',
      light: '#ffce6d',
      line: '#0e0909',
    },
  },
  cyber: {
    pixel: {
      background: '#171a28',
      panel: '#22273a',
      base: '#7385f1',
      accent: '#3cf2d3',
      light: '#aab7ff',
      line: '#080b15',
    },
    flat: {
      background: '#111827',
      panel: '#1c2436',
      base: '#7f87ff',
      accent: '#56f4d3',
      light: '#bac0ff',
      line: '#090f1c',
    },
    tech: {
      background: '#0f1423',
      panel: '#192236',
      base: '#00b8ff',
      accent: '#5bffb6',
      light: '#85f8ff',
      line: '#030712',
    },
  },
}

const assetCatalog: Record<AssetKind, Record<ThemeName, IconEntry[]>> = {
  props: {
    forest: [
      { label: '木箱', icon: 'wooden-crate' },
      { label: '蘑菇', icon: 'mushroom' },
      { label: '树桩', icon: 'stump-regrowth' },
      { label: '路牌', icon: 'wooden-sign' },
      { label: '果桶', icon: 'barrel' },
      { label: '草丛', icon: 'berry-bush' },
    ],
    desert: [
      { label: '仙人掌', icon: 'cactus' },
      { label: '陶罐', icon: 'broken-pottery' },
      { label: '骨堆', icon: 'crossed-bones' },
      { label: '补给箱', icon: 'cargo-crate' },
      { label: '石柱', icon: 'stone-tower' },
      { label: '麻袋', icon: 'powder-bag' },
    ],
    ice: [
      { label: '冰晶', icon: 'crystal-cluster' },
      { label: '雪桶', icon: 'barrel' },
      { label: '符文石', icon: 'rune-stone' },
      { label: '冰箱', icon: 'ice-cube' },
      { label: '雪松', icon: 'pine-tree' },
      { label: '补给箱', icon: 'cargo-crate' },
    ],
    lava: [
      { label: '火晶', icon: 'fire-gem' },
      { label: '铁箱', icon: 'cargo-crate' },
      { label: '熔岩石', icon: 'rock' },
      { label: '警示牌', icon: 'wooden-sign' },
      { label: '煤桶', icon: 'coal-pile' },
      { label: '黑岩柱', icon: 'stone-tower' },
    ],
    cyber: [
      { label: '电池箱', icon: 'battery-pack' },
      { label: '终端机', icon: 'circuitry' },
      { label: '能量罐', icon: 'energy-tank' },
      { label: '悬浮箱', icon: 'cargo-crate' },
      { label: '芯片柱', icon: 'microchip' },
      { label: '扫描塔', icon: 'radio-tower' },
    ],
  },
  tiles: {
    forest: [
      { label: '草地块', icon: 'grass' },
      { label: '泥土地块', icon: 'stone-path' },
      { label: '花边地块', icon: 'flower-pot' },
      { label: '木桥地块', icon: 'bridge' },
      { label: '石路地块', icon: 'stone-path' },
      { label: '藤蔓地块', icon: 'wood-pile' },
    ],
    desert: [
      { label: '沙地块', icon: 'sandstorm' },
      { label: '石砖地块', icon: 'stone-block' },
      { label: '裂纹地块', icon: 'rock' },
      { label: '骨架地块', icon: 'crossed-bones' },
      { label: '台阶地块', icon: 'stone-wall' },
      { label: '岩层地块', icon: 'stone-bridge' },
    ],
    ice: [
      { label: '雪地块', icon: 'snowflake-1' },
      { label: '冰面地块', icon: 'ice-cube' },
      { label: '裂冰地块', icon: 'ice-bolt' },
      { label: '符文地块', icon: 'rune-stone' },
      { label: '霜石地块', icon: 'crystal-growth' },
      { label: '台阶地块', icon: 'stone-path' },
    ],
    lava: [
      { label: '焦土地块', icon: 'rock' },
      { label: '火纹地块', icon: 'lava' },
      { label: '黑岩地块', icon: 'stone-block' },
      { label: '机关地块', icon: 'groundbreaker' },
      { label: '裂隙地块', icon: 'lava' },
      { label: '金属地块', icon: 'metal-bar' },
    ],
    cyber: [
      { label: '合金地块', icon: 'metal-bar' },
      { label: '光轨地块', icon: 'energy-tank' },
      { label: '面板地块', icon: 'circuitry' },
      { label: '通风地块', icon: 'computer-fan' },
      { label: '能源地块', icon: 'battery-pack' },
      { label: '网格地块', icon: 'circuitry' },
    ],
  },
  icons: {
    forest: [
      { label: '叶子徽记', icon: 'chestnut-leaf' },
      { label: '果实徽记', icon: 'berries-bowl' },
      { label: '小刀图标', icon: 'curvy-knife' },
      { label: '背包图标', icon: 'backpack' },
      { label: '钥匙图标', icon: 'key' },
      { label: '药瓶图标', icon: 'health-potion' },
    ],
    desert: [
      { label: '太阳徽记', icon: 'sun' },
      { label: '护符图标', icon: 'gems' },
      { label: '水袋图标', icon: 'waterskin' },
      { label: '宝石图标', icon: 'gems' },
      { label: '钥匙图标', icon: 'key' },
      { label: '弯刀图标', icon: 'curvy-knife' },
    ],
    ice: [
      { label: '雪花徽记', icon: 'snowflake-1' },
      { label: '冰晶图标', icon: 'crystal-cluster' },
      { label: '盾牌图标', icon: 'shield' },
      { label: '卷轴图标', icon: 'scroll-unfurled' },
      { label: '钥匙图标', icon: 'key' },
      { label: '药瓶图标', icon: 'health-potion' },
    ],
    lava: [
      { label: '火焰徽记', icon: 'fire-gem' },
      { label: '矿石图标', icon: 'rock' },
      { label: '护甲图标', icon: 'chest-armor' },
      { label: '锤子图标', icon: 'flat-hammer' },
      { label: '钥匙图标', icon: 'key' },
      { label: '药瓶图标', icon: 'health-potion' },
    ],
    cyber: [
      { label: '芯片徽记', icon: 'microchip' },
      { label: '闪电图标', icon: 'energy-arrow' },
      { label: '模块图标', icon: 'circuitry' },
      { label: '护盾图标', icon: 'energy-shield' },
      { label: '钥匙图标', icon: 'key-card' },
      { label: '核心图标', icon: 'energy-tank' },
    ],
  },
}

export function generateBatch(form: GeneratorForm): AssetBatch {
  const theme = form.theme
  const palette = applyPromptPalette(paletteMap[theme][form.style], form.prompt)
  const safeCount = clamp(form.count, 4, 12)
  const size = clamp(form.size, 64, 128)
  const styleLabel = getStyleLabel(form.style)
  const themeLabel = inferThemeLabel(theme)
  const assetKindLabel = getAssetKindLabel(form.assetKind)
  const items = assetCatalog[form.assetKind][theme]
  const rand = makeRandom(
    `${form.projectName}-${form.prompt}-${form.assetKind}-${form.style}-${theme}-${size}`,
  )
  const assets: AssetItem[] = []

  for (let index = 0; index < safeCount; index += 1) {
    const item = items[index % items.length]

    assets.push({
      id: `${form.assetKind}-${index + 1}`,
      name: `${slugify(form.projectName)}-${index + 1}`,
      label: item.label,
      svg: buildIconSvg(item.icon, palette, size, form.style, rand),
    })
  }

  return {
    projectName: form.projectName.trim() || 'asset-pack',
    size,
    theme,
    palette: [
      palette.background,
      palette.panel,
      palette.base,
      palette.accent,
      palette.light,
      palette.line,
    ],
    assets,
    meta: {
      themeLabel,
      prompt: form.prompt,
      style: form.style,
      styleLabel,
      assetKind: form.assetKind,
      assetKindLabel,
    },
  }
}

export function makePreviewUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export function inferThemeLabel(theme: ThemeName) {
  const map: Record<ThemeName, string> = {
    forest: '森林',
    desert: '沙漠',
    ice: '冰雪',
    lava: '熔岩',
    cyber: '赛博',
  }

  return map[theme]
}

function getStyleLabel(style: VisualStyle) {
  const map: Record<VisualStyle, string> = {
    pixel: '像素风',
    flat: '扁平风',
    tech: '科技风',
  }

  return map[style]
}

function getAssetKindLabel(kind: AssetKind) {
  const map: Record<AssetKind, string> = {
    props: '道具',
    tiles: '地块',
    icons: '图标',
  }

  return map[kind]
}

function buildIconSvg(
  iconName: string,
  palette: PalettePack,
  size: number,
  style: VisualStyle,
  rand: () => number,
) {
  const icon = iconSet[iconName]

  if (!icon) {
    return buildFallbackSvg(palette, size)
  }

  const iconWidth = icon.width ?? defaultViewBoxWidth
  const iconHeight = icon.height ?? defaultViewBoxHeight
  const scale = style === 'pixel' ? 0.68 : style === 'tech' ? 0.64 : 0.66
  const extraRotate = Math.round(rand() * 4 - 2)
  const offsetX = 256 - (iconWidth * scale) / 2
  const offsetY = 256 - (iconHeight * scale) / 2 - 4

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="${palette.background}" />
  <rect x="34" y="34" width="444" height="444" rx="42" fill="${palette.panel}" stroke="${palette.line}" stroke-width="8" />
  <ellipse cx="256" cy="426" rx="116" ry="28" fill="${palette.line}" opacity="0.1" />
  <g transform="translate(${offsetX + 8} ${offsetY + 10}) scale(${scale}) rotate(${extraRotate} ${iconWidth / 2} ${iconHeight / 2})" style="color:${palette.line}; opacity:0.22">
    ${icon.body}
  </g>
  <g transform="translate(${offsetX} ${offsetY}) scale(${scale}) rotate(${extraRotate} ${iconWidth / 2} ${iconHeight / 2})" style="color:${palette.base}">
    ${icon.body}
  </g>
  <rect x="92" y="78" width="122" height="34" rx="17" fill="${palette.light}" opacity="0.3" />
  <circle cx="398" cy="110" r="14" fill="${palette.accent}" opacity="0.75" />
</svg>`.trim()
}

function applyPromptPalette(basePalette: PalettePack, prompt: string) {
  const tone = detectPromptTone(prompt)

  if (!tone) {
    return basePalette
  }

  return {
    background: mixColor(basePalette.background, tone.background, tone.weight * 0.35),
    panel: mixColor(basePalette.panel, tone.background, tone.weight * 0.18),
    base: mixColor(basePalette.base, tone.base, tone.weight),
    accent: mixColor(basePalette.accent, tone.accent, tone.weight * 0.88),
    light: mixColor(basePalette.light, tone.light, tone.weight * 0.65),
    line: mixColor(basePalette.line, tone.line, tone.weight * 0.92),
  }
}

function detectPromptTone(prompt: string) {
  const text = prompt.trim().toLowerCase()

  if (!text) {
    return null
  }

  const presets = [
    {
      words: ['黑', '黑色', 'black', 'dark'],
      weight: 0.78,
      background: '#e5e7eb',
      base: '#374151',
      accent: '#111827',
      light: '#9ca3af',
      line: '#030712',
    },
    {
      words: ['白', '白色', 'white'],
      weight: 0.76,
      background: '#ffffff',
      base: '#f3f4f6',
      accent: '#d1d5db',
      light: '#ffffff',
      line: '#4b5563',
    },
    {
      words: ['红', '红色', 'red'],
      weight: 0.72,
      background: '#fff1f2',
      base: '#ef4444',
      accent: '#991b1b',
      light: '#fecaca',
      line: '#450a0a',
    },
    {
      words: ['蓝', '蓝色', 'blue'],
      weight: 0.72,
      background: '#eff6ff',
      base: '#3b82f6',
      accent: '#1d4ed8',
      light: '#bfdbfe',
      line: '#1e3a8a',
    },
    {
      words: ['绿', '绿色', 'green'],
      weight: 0.72,
      background: '#f0fdf4',
      base: '#22c55e',
      accent: '#15803d',
      light: '#bbf7d0',
      line: '#14532d',
    },
    {
      words: ['黄', '黄色', 'gold', 'yellow'],
      weight: 0.72,
      background: '#fefce8',
      base: '#eab308',
      accent: '#ca8a04',
      light: '#fde68a',
      line: '#713f12',
    },
    {
      words: ['紫', '紫色', 'purple'],
      weight: 0.72,
      background: '#faf5ff',
      base: '#a855f7',
      accent: '#7e22ce',
      light: '#e9d5ff',
      line: '#581c87',
    },
  ]

  return presets.find((preset) => preset.words.some((word) => text.includes(word))) ?? null
}

function mixColor(from: string, to: string, weight: number) {
  const start = hexToRgb(from)
  const end = hexToRgb(to)
  const safeWeight = clamp(weight, 0, 1)

  const mixed = {
    r: Math.round(start.r + (end.r - start.r) * safeWeight),
    g: Math.round(start.g + (end.g - start.g) * safeWeight),
    b: Math.round(start.b + (end.b - start.b) * safeWeight),
  }

  return rgbToHex(mixed.r, mixed.g, mixed.b)
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  const value = clean.length === 3 ? clean.split('').map((part) => part + part).join('') : clean

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')}`
}

function buildFallbackSvg(palette: PalettePack, size: number) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="${palette.background}" />
  <rect x="96" y="96" width="320" height="320" rx="32" fill="${palette.base}" />
  <circle cx="256" cy="256" r="72" fill="${palette.light}" />
</svg>`.trim()
}

function slugify(input: string) {
  const value = input.trim().toLowerCase()

  return value
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
