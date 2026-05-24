export function downloadSvg(name: string, svg: string) {
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = `${name}.svg`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()

  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
