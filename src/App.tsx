import { useState } from 'react'
import './App.css'
import {
  generateBatch,
  makePreviewUrl,
  type AssetBatch,
  type GeneratorForm,
} from './lib/generator'
import { downloadSvg } from './lib/export'

const defaultForm: GeneratorForm = {
  projectName: 'forest_pack_v1',
  theme: 'forest',
  assetKind: 'props',
  style: 'pixel',
  size: 96,
  count: 6,
}

function App() {
  const [form, setForm] = useState<GeneratorForm>(defaultForm)
  const [batch, setBatch] = useState<AssetBatch>(() => generateBatch(defaultForm))

  function patchForm<K extends keyof GeneratorForm>(key: K, value: GeneratorForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleGenerate() {
    setBatch(generateBatch(form))
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <div>
          <h1>2D 素材生成工具</h1>
          <p>用于快速生成一组基础 2D 素材预览。</p>
        </div>
        <button type="button" className="primary-btn" onClick={handleGenerate}>
          生成素材
        </button>
      </header>

      <section className="workspace">
        <aside className="control-panel">
          <div className="panel-head">
            <h2>生成参数</h2>
            <p>可按主题、类型、风格和尺寸生成一批素材草稿。</p>
          </div>

          <label className="field">
            <span>项目名</span>
            <input
              value={form.projectName}
              onChange={(event) => patchForm('projectName', event.target.value)}
            />
          </label>

          <div className="grid-two">
            <label className="field">
              <span>主题</span>
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
              <span>类型</span>
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
          </div>

          <div className="grid-three">
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

        </aside>

        <section className="result-panel">
          <div className="result-head">
            <div>
              <h2>{batch.projectName}</h2>
              <p>{batch.assets.length} 个预览素材</p>
            </div>
          </div>

          <div className="asset-grid">
            {batch.assets.map((asset) => (
              <article key={asset.id} className="asset-card">
                <div className="asset-preview">
                  <img
                    src={makePreviewUrl(asset.svg)}
                    alt={asset.label}
                    style={{ width: batch.size, height: batch.size }}
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
        </section>
      </section>
    </main>
  )
}

export default App
