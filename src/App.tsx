import { useState } from 'react'
import './App.css'
import {
  generateBatch,
  inferThemeLabel,
  makePreviewUrl,
  type AssetBatch,
  type GeneratorForm,
} from './lib/generator'
import { downloadAtlasJson, downloadAtlasPng, downloadSvg } from './lib/export'

const defaultForm: GeneratorForm = {
  projectName: 'forest_pack_v1',
  theme: 'forest',
  prompt: '木质道具，颜色为绿色',
  assetKind: 'props',
  style: 'pixel',
  size: 96,
  count: 6,
}

function App() {
  const [form, setForm] = useState<GeneratorForm>(defaultForm)
  const [batch, setBatch] = useState<AssetBatch>(() => generateBatch(defaultForm))
  const [busy, setBusy] = useState(false)
  const previewSize = Math.round(batch.size * 1.15)

  function patchForm<K extends keyof GeneratorForm>(key: K, value: GeneratorForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleGenerate() {
    setBusy(true)

    window.setTimeout(() => {
      setBatch(generateBatch(form))
      setBusy(false)
    }, 120)
  }

  async function handleExportPng() {
    setBusy(true)

    try {
      await downloadAtlasPng(batch)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <div>
          <h1>2D 素材生成工具</h1>
          <p>用于快速生成、预览和导出一组 2D 游戏素材。</p>
        </div>
        <div className="topbar-actions">
          <button type="button" className="secondary-btn" onClick={handleGenerate} disabled={busy}>
            {busy ? '处理中...' : '生成素材'}
          </button>
          <button type="button" className="primary-btn" onClick={handleExportPng} disabled={busy}>
            导出图集 PNG
          </button>
        </div>
      </header>

      <section className="workspace">
        <aside className="control-panel">
          <div className="panel-group">
            <div className="panel-head">
              <h2>项目设置</h2>
              <p>先设定项目名、主题和补充描述。</p>
            </div>

            <label className="field">
              <span>项目名</span>
              <input
                value={form.projectName}
                onChange={(event) => patchForm('projectName', event.target.value)}
                placeholder="比如：dungeon_props_v1"
              />
            </label>

            <label className="field">
              <span>场景主题</span>
              <select
                value={form.theme}
                onChange={(event) =>
                  patchForm('theme', event.target.value as GeneratorForm['theme'])
                }
              >
                <option value="forest">森林</option>
                <option value="desert">沙漠</option>
                <option value="ice">冰雪</option>
                <option value="lava">熔岩</option>
                <option value="cyber">赛博</option>
              </select>
            </label>

            <label className="field">
              <span>补充描述</span>
              <textarea
                value={form.prompt}
                onChange={(event) => patchForm('prompt', event.target.value)}
                rows={4}
                placeholder="可以描述您想定制的颜色和气质哦"
              />
            </label>
          </div>

          <div className="panel-group">
            <div className="panel-head">
              <h2>生成规则</h2>
              <p>按类型、风格、尺寸和数量控制本批素材。</p>
            </div>

            <div className="grid-two">
              <label className="field">
                <span>素材类型</span>
                <select
                  value={form.assetKind}
                  onChange={(event) =>
                    patchForm('assetKind', event.target.value as GeneratorForm['assetKind'])
                  }
                >
                  <option value="props">道具</option>
                  <option value="tiles">地块</option>
                  <option value="icons">图标</option>
                </select>
              </label>

              <label className="field">
                <span>风格</span>
                <select
                  value={form.style}
                  onChange={(event) =>
                    patchForm('style', event.target.value as GeneratorForm['style'])
                  }
                >
                  <option value="pixel">像素风</option>
                  <option value="flat">扁平风</option>
                  <option value="tech">科技风</option>
                </select>
              </label>
            </div>

            <div className="grid-three">
              <label className="field">
                <span>尺寸</span>
                <select
                  value={form.size}
                  onChange={(event) => patchForm('size', Number(event.target.value))}
                >
                  <option value={64}>64</option>
                  <option value={96}>96</option>
                  <option value={128}>128</option>
                </select>
              </label>

              <label className="field">
                <span>数量</span>
                <input
                  type="number"
                  min={4}
                  max={12}
                  value={form.count}
                  onChange={(event) => patchForm('count', Number(event.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="panel-group">
            <div className="panel-head">
              <h2>使用说明</h2>
            </div>
            <ul className="note-list">
              <li>补充描述里的颜色词会影响当前批次的主配色。</li>
              <li>修改尺寸后，预览区会同步调整素材显示大小。</li>
              <li>当前版本支持单张下载、图集 PNG 导出和 atlas JSON 导出。</li>
            </ul>
          </div>
        </aside>

        <section className="result-panel">
          <div className="result-head">
            <div>
              <h2>{batch.projectName}</h2>
              <p className="subtle-text">{batch.meta.prompt || '未填写补充描述'}</p>
            </div>
          </div>

          <div className="stats-grid">
            <article className="stat-card">
              <span>主题</span>
              <strong>{inferThemeLabel(batch.theme)}</strong>
            </article>
            <article className="stat-card">
              <span>素材类型</span>
              <strong>{batch.meta.assetKindLabel}</strong>
            </article>
            <article className="stat-card">
              <span>风格</span>
              <strong>{batch.meta.styleLabel}</strong>
            </article>
            <article className="stat-card">
              <span>输出尺寸</span>
              <strong>{batch.size}px</strong>
            </article>
          </div>

          <div className="sub-panel">
            <div className="sub-panel-head">
              <h3>配色</h3>
              <span>{batch.assets.length} 个素材</span>
            </div>
            <div className="palette-row">
              {batch.palette.map((color) => (
                <div key={color} className="palette-chip">
                  <i style={{ background: color }} />
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sub-panel">
            <div className="sub-panel-head">
              <h3>素材预览</h3>
              <span>支持单张下载</span>
            </div>
            <div className="asset-grid">
              {batch.assets.map((asset) => (
                <article key={asset.id} className="asset-card">
                  <div className="asset-preview">
                    <img
                      src={makePreviewUrl(asset.svg)}
                      alt={asset.name}
                      style={{ width: previewSize, height: previewSize }}
                    />
                  </div>
                  <div className="asset-meta">
                    <div>
                      <strong>{asset.name}</strong>
                      <p>{asset.label}</p>
                    </div>
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => downloadSvg(asset.name, asset.svg)}
                    >
                      下载 SVG
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="sub-panel">
            <div className="sub-panel-head">
              <h3>导出结果</h3>
              <span>整包导出</span>
            </div>
            <div className="file-list">
              <div className="file-row">
                <strong>{batch.projectName}-atlas.png</strong>
                <button
                  type="button"
                  className="text-btn"
                  onClick={handleExportPng}
                  disabled={busy}
                >
                  下载 PNG
                </button>
              </div>
              <div className="file-row">
                <strong>{batch.projectName}-atlas.json</strong>
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => downloadAtlasJson(batch)}
                  disabled={busy}
                >
                  下载 JSON
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
