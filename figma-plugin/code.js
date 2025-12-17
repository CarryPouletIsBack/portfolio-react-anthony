// Figma Plugin: test-cursor-2 (JS)

figma.on('run', () => {
  // D'abord afficher l'UI, puis redimensionner pour éviter "No UI to resize"
  figma.showUI(__html__, { themeColors: true })
  figma.ui.resize(360, 520)
  // Mode piloté: tenter de charger une config depuis le serveur local (Vite)
  tryAutoApplyFromConfig()
})

async function renameLayers(payload) {
  const selection = figma.currentPage.selection
  for (const node of selection) {
    visit(node, n => {
      if ('name' in n && typeof n.name === 'string') {
        const current = n.name || ''
        // Compat global: remplacer replaceAll par split/join
        n.name = current.split(payload.find).join(payload.replace)
      }
    })
  }
}

async function replaceFonts(payload) {
  await figma.loadFontAsync({ family: payload.replaceFamily, style: payload.style || 'Regular' })
  const selection = figma.currentPage.selection
  for (const node of selection) {
    visit(node, n => {
      if (n.type === 'TEXT') {
        const fontName = n.fontName
        if (fontName && fontName.family === payload.findFamily) {
          n.fontName = { family: payload.replaceFamily, style: payload.style || 'Regular' }
        }
      }
    })
  }
}

function extractPaintToHex(paint) {
  if (!paint || paint.type !== 'SOLID' || !paint.color) return null
  const { r, g, b } = paint.color
  const rr = Math.round(r * 255), gg = Math.round(g * 255), bb = Math.round(b * 255)
  const toHex = v => v.toString(16).padStart(2, '0')
  return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`
}

function extractTokens() {
  const paints = new Set()
  const selection = figma.currentPage.selection
  for (const node of selection) {
    visit(node, n => {
      if ('fills' in n && Array.isArray(n.fills)) {
        for (const p of n.fills) { const hex = extractPaintToHex(p); if (hex) paints.add(hex) }
      }
      if ('strokes' in n && Array.isArray(n.strokes)) {
        for (const p of n.strokes) { const hex = extractPaintToHex(p); if (hex) paints.add(hex) }
      }
    })
  }
  const tokens = Array.from(paints).map((hex, i) => ({ name: `color.${i+1}`, value: hex }))
  figma.ui.postMessage({ type: 'tokens', payload: tokens })
}

async function exportSelectedSVG() {
  const selection = figma.currentPage.selection
  const exports = []
  for (const node of selection) {
    if ('exportAsync' in node) {
      const data = await node.exportAsync({ format: 'SVG', svgIdAttribute: true, svgOutlineText: false })
      const text = String.fromCharCode.apply(null, Array.from(data))
      exports.push({ name: node.name || 'icon', data: text })
    }
  }
  figma.ui.postMessage({ type: 'exports', payload: exports })
}

function visit(node, fn) {
  try {
    if ('children' in node && Array.isArray(node.children)) {
      for (const c of node.children) visit(c, fn)
    }
  } catch (e) {}
  fn(node)
}

figma.ui.onmessage = async msg => {
  if (msg && msg.type === 'rename') await renameLayers(msg.payload || { find: '', replace: '' })
  if (msg && msg.type === 'replaceFonts') await replaceFonts(msg.payload || { findFamily: '', replaceFamily: '', style: 'Regular' })
  if (msg && msg.type === 'extractTokens') extractTokens()
  if (msg && msg.type === 'exportSVG') await exportSelectedSVG()
  if (msg && msg.type === 'setAutoLayout') await setAutoLayoutOnSelection(msg.payload || {})
  if (msg && msg.type === 'close') figma.closePlugin('Terminé')
}

// -------------------------
// Pilotage via config HTTP
// -------------------------
async function tryAutoApplyFromConfig() {
  try {
    // Essaie l'IP réseau en priorité si disponible, sinon localhost
    const hosts = [
      'http://localhost:5173',
      'http://192.168.1.79:5173',
      'http://192.168.1.74:5173'
    ]
    // Emplacements possibles de la config pour test-cursor-2
    const paths = [
      '/figma-plugin/test-cursor-2/config.json',
      '/figma-plugin/config.json'
    ]
    let cfg = null
    for (const base of hosts) {
      for (const p of paths) {
        try {
          const res = await fetch(base + p, { cache: 'no-store' })
          if (res && res.ok) { cfg = await res.json(); break }
        } catch (e) { /* ignore and try next */ }
      }
      if (cfg) break
    }
    if (!cfg) return

    // Scope: 'all' ou 'selection'
    const scope = (cfg.scope || 'selection').toLowerCase()
    const inScope = scope === 'all' ? getAllSceneNodes() : figma.currentPage.selection
    const pageFilter = typeof cfg.pageName === 'string' && cfg.pageName.trim() ? cfg.pageName.trim() : null
    const targetNodes = pageFilter ? filterNodesByPage(inScope, pageFilter) : inScope

    if (cfg.rename && Array.isArray(cfg.rename)) {
      for (const r of cfg.rename) {
        await applyRename(targetNodes, r.find || '', r.replace || '', cfg.renameOptions || {})
      }
    }

    if (cfg.fontReplace && cfg.fontReplace.findFamily && cfg.fontReplace.replaceFamily) {
      await applyFontReplace(targetNodes, cfg.fontReplace.findFamily, cfg.fontReplace.replaceFamily, cfg.fontReplace.style || 'Regular')
    }

    if (cfg.extractTokens === true) {
      extractTokens()
    }
  } catch (e) {
    // silencieux
  }
}

function getAllSceneNodes() {
  const out = []
  const walk = n => { if ('children' in n) for (const c of n.children) walk(c); out.push(n) }
  walk(figma.currentPage)
  return out
}

function filterNodesByPage(nodes, pageName) {
  const page = figma.root.children.find(p => p.name === pageName)
  if (!page) return []
  const ids = new Set(page.children.map(n => n.id))
  return nodes.filter(n => {
    try {
      let parent = n.parent
      while (parent) {
        if (ids.has(parent.id)) return true
        parent = parent.parent
      }
    } catch (e) {}
    return false
  })
}

async function applyRename(nodes, find, replace, options) {
  const opts = options || {}
  const exact = !!opts.exactMatch
  const ci = !!opts.caseInsensitive
  const norm = (s) => (ci ? (s || '').toLowerCase() : (s || ''))
  const needle = norm(find)
  for (const node of nodes) {
    visit(node, n => {
      if ('name' in n && typeof n.name === 'string') {
        const currentRaw = n.name || ''
        const current = norm(currentRaw)
        if (!needle) return
        if (exact ? (current === needle) : current.includes(needle)) {
          n.name = exact ? replace : currentRaw.split(find).join(replace)
        }
      }
    })
  }
}

function isAutoLayoutNode(n) {
  return (
    n && ('layoutMode' in n) && (n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'INSTANCE')
  )
}

async function setAutoLayoutOnSelection(values) {
  const selection = figma.currentPage.selection
  await setAutoLayoutOnNodes(selection, values)
}

async function setAutoLayoutOnNodes(nodes, values) {
  const v = values || {}
  for (const node of nodes) {
    visit(node, n => {
      if (!isAutoLayoutNode(n)) return
      if (typeof v.itemSpacing === 'number') n.itemSpacing = v.itemSpacing
      if (typeof v.paddingLeft === 'number') n.paddingLeft = v.paddingLeft
      if (typeof v.paddingRight === 'number') n.paddingRight = v.paddingRight
      if (typeof v.paddingTop === 'number') n.paddingTop = v.paddingTop
      if (typeof v.paddingBottom === 'number') n.paddingBottom = v.paddingBottom
      if (typeof v.paddingX === 'number') { n.paddingLeft = v.paddingX; n.paddingRight = v.paddingX }
      if (typeof v.paddingY === 'number') { n.paddingTop = v.paddingY; n.paddingBottom = v.paddingY }
    })
  }
}

async function applyFontReplace(nodes, findFamily, replaceFamily, style) {
  await figma.loadFontAsync({ family: replaceFamily, style: style || 'Regular' })
  for (const node of nodes) {
    visit(node, n => {
      if (n.type === 'TEXT') {
        const fontName = n.fontName
        if (fontName && fontName.family === findFamily) {
          n.fontName = { family: replaceFamily, style: style || 'Regular' }
        }
      }
    })
  }
}


