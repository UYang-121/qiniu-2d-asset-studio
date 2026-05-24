import type { AssetBatch } from './generator'
import { makePreviewUrl } from './generator'

export async function downloadAtlasPng(batch: AssetBatch) {
  const sheet = await renderAtlasPng(batch)
  triggerDownload(`${slug(batch.projectName)}-atlas.png`, sheet.blob)
}

export async function downloadAtlasJson(batch: AssetBatch) {
  const columns = Math.min(4, batch.assets.length)
  const atlas = buildAtlasJson(batch, columns)

  triggerDownload(
    `${slug(batch.projectName)}-atlas.json`,
    new Blob([JSON.stringify(atlas, null, 2)], { type: 'application/json' }),
  )
}

export function downloadSvg(name: string, svg: string) {
  triggerDownload(`${name}.svg`, new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
}

async function renderAtlasPng(batch: AssetBatch) {
  const columns = Math.min(4, batch.assets.length)
  const rows = Math.ceil(batch.assets.length / columns)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('canvas 初始化失败')
  }

  canvas.width = columns * batch.size
  canvas.height = rows * batch.size

  for (const [index, asset] of batch.assets.entries()) {
    const image = await loadImage(makePreviewUrl(asset.svg))
    const x = (index % columns) * batch.size
    const y = Math.floor(index / columns) * batch.size
    ctx.drawImage(image, x, y, batch.size, batch.size)
  }

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => {
      if (value) {
        resolve(value)
        return
      }

      reject(new Error('图集导出失败'))
    }, 'image/png')
  })

  return { blob }
}

function buildAtlasJson(batch: AssetBatch, columns: number) {
  return {
    projectName: batch.projectName,
    size: batch.size,
    theme: batch.theme,
    style: batch.meta.style,
    prompt: batch.meta.prompt,
    frames: batch.assets.map((asset, index) => ({
      id: asset.id,
      name: asset.name,
      label: asset.label,
      x: (index % columns) * batch.size,
      y: Math.floor(index / columns) * batch.size,
      w: batch.size,
      h: batch.size,
    })),
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('图片加载失败'))
    image.src = src
  })
}

function triggerDownload(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()

  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function slug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'asset-pack'
}
