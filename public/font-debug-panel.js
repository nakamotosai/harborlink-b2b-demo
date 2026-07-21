/**
 * font-debug-panel.js — 字体调试面板（仅内部调试用）
 * 功能：滑块调节实时预览 + 自动滚动到对应文字 + 红色高亮
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'harborlink-demo-font-debug';

  // ── 每个字体变量对应的选择器列表（按优先级排序） ──
  const VAR_SELECTORS = {
    '--text-xs': [
      '#header-search-input',
      '.language-menu',
      '.hero-url-line',
      '.hero-email-line',
      '.hero-badge',
      '.task-card span',
      '.task-card small',
      '.product-code',
      '.product-meta small',
      '.product-specs dt',
      '.product-specs dd',
      '.search-result',
      '.catalog-card p',
      '.catalog-meta',
      '.catalog-total-box > span',
      '.catalog-card-btn-action',
      '.tag-grid span',
      '.japan-support-grid p',
      '.quality-card p',
      '.footer-info-desc',
      '.footer-contact-details span',
      '.footer-subtitle',
      '.footer-message',
      '.footer-nav a',
      '.footer-button',
      '.case-year',
      '.case-details div',
      '.company-lead',
      '.company-facts dt',
      '.company-facts dd',
      '.contact-card p',
      '.catalog-action-copy small',
      '.catalog-action-copy em',
      '.catalog-storage-note',
      '.catalog-card-button',
      '.image-edit-upload',
      '.settings-switcher-panel p',
      '.font-choice small',
      '.theme-kicker',
      '.preview-header',
    ],
    '--text-sm': [
      '.main-nav',
      '.task-card strong',
      '.section-heading > p',
      '.product-card p',
      '.product-card:first-child p',
      '.search-panel p',
      '.pdf-button',
      '.processing-content p',
      '.details-column h3',
      '.details-column p',
      '.japan-support-grid strong',
      '.quality-card h3',
      '.footer-info-tagline',
      '.footer-col-title',
      '.footer-col-links a',
      '.footer-contact-details strong',
      '.footer-bottom p',
      '.catalog-action-copy strong',
      '.hero-copy',
      '.company-lead',
    ],
    '--text-base': [
      '.processing-lead',
      '.theme-hero p:not(.theme-kicker)',
      '.product-card:first-child h3',
    ],
    '--text-lg': [
      '.product-card h3',
      '.catalog-card h3 span',
      '.case-card-body h3',
      '.hero-copy',
    ],
    '--text-xl': [
      '.catalog-card h3',
      '.details-num',
      '.japan-support-head h3',
      '.quality-card h3',
      '.contact-card h2',
      '.product-card:first-child h3',
    ],
    '--text-2xl': [
      '.section-heading h2',
      '.processing-content .section-heading h2',
      '.quality-body > span',
      '.theme-card h2',
      '.preview-hero h3',
      '.company-facts .section-heading h2',
    ],
    '--text-3xl': [
      '.theme-hero h1',
    ],
    '--text-4xl': [
      '.hero h1',
    ],
  };

  const CSS_VARS = [
    { name: '--text-xs',   label: 'xs（最小标签）',   min: 10, max: 28, default: 17 },
    { name: '--text-sm',   label: 'sm（辅助文字）',   min: 12, max: 32, default: 19 },
    { name: '--text-base', label: 'base（正文）',     min: 14, max: 36, default: 23 },
    { name: '--text-lg',   label: 'lg（强调正文）',   min: 16, max: 40, default: 26 },
    { name: '--text-xl',   label: 'xl（小标题）',     min: 18, max: 52, default: 40 },
    { name: '--text-2xl',  label: '2xl（标题）',      min: 22, max: 64, default: 50 },
    { name: '--text-3xl',  label: '3xl（大标题）',    min: 28, max: 72, default: 40 },
    { name: '--text-4xl',  label: '4xl（英雄区）',    min: 36, max: 90, default: 57 },
  ];

  let currentHighlight = null;

  function loadSaved() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  }

  function saveValues(vals) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vals));
  }

  function applyValues(vals) {
    const root = document.documentElement;
    CSS_VARS.forEach(v => {
      if (vals[v.name] !== undefined) {
        root.style.setProperty(v.name, vals[v.name] + 'px');
      }
    });
  }

  // ── 找到第一个匹配元素 ──
  function findFirstElement(selectors) {
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  // ── 高亮所有匹配元素（红色） + 滚动到第一个 ──
  function highlightAndScroll(varName) {
    clearHighlight();
    const selectors = VAR_SELECTORS[varName];
    if (!selectors) return;

    const elements = [];
    for (const sel of selectors) {
      try {
        document.querySelectorAll(sel).forEach(el => elements.push(el));
      } catch {}
    }

    if (elements.length === 0) return;

    // 红色高亮所有匹配元素
    elements.forEach(el => {
      el.style.outline = '3px solid #e54b4b';
      el.style.outlineOffset = '2px';
      el.style.transition = 'outline 0.2s';
    });

    currentHighlight = elements;

    // 滚动到第一个
    const first = elements[0];
    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ── 清除高亮 ──
  function clearHighlight() {
    if (currentHighlight) {
      currentHighlight.forEach(el => {
        el.style.outline = '';
        el.style.outlineOffset = '';
        el.style.transition = '';
      });
      currentHighlight = null;
    }
  }

  function buildPanel() {
    const saved = loadSaved();

    // 触发按钮
    const toggle = document.createElement('button');
    toggle.className = 'font-debug-toggle';
    toggle.textContent = 'F';
    toggle.title = '字体调试面板';
    document.body.appendChild(toggle);

    // 面板容器
    const panel = document.createElement('div');
    panel.className = 'font-debug-panel';
    document.body.appendChild(panel);

    // 标题
    const title = document.createElement('h3');
    title.textContent = '字体大小调试';
    panel.appendChild(title);

    // 控件区
    const controls = document.createElement('div');
    panel.appendChild(controls);

    CSS_VARS.forEach(v => {
      const item = document.createElement('div');
      item.className = 'font-debug-item';

      const currentVal = saved[v.name] || v.default;

      item.innerHTML = `
        <label>
          <span>${v.label} <span class="var-name">${v.name}</span></span>
          <span class="current-val" data-var="${v.name}">${currentVal}px</span>
        </label>
        <input type="range" min="${v.min}" max="${v.max}" value="${currentVal}" data-var="${v.name}">
      `;
      controls.appendChild(item);
    });

    // 预览区
    const preview = document.createElement('div');
    preview.className = 'font-debug-preview';
    preview.innerHTML = `
      <p class="preview-4xl">4xl 英雄区标题</p>
      <p class="preview-3xl">3xl 大标题</p>
      <p class="preview-2xl">2xl 标题</p>
      <p class="preview-xl">xl 小标题</p>
      <p class="preview-lg">lg 强调正文</p>
      <p class="preview-base">base 正文默认</p>
      <p class="preview-sm">sm 辅助文字</p>
      <p class="preview-xs">xs 最小标签</p>
    `;
    panel.appendChild(preview);

    // 按钮组
    const actions = document.createElement('div');
    actions.className = 'font-debug-actions';
    actions.innerHTML = `
      <button class="btn-reset">重置</button>
      <button class="btn-save">保存</button>
      <button class="btn-export">导出CSS</button>
    `;
    panel.appendChild(actions);

    // --- 事件绑定 ---

    // 切换面板
    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('is-open');
      if (!isOpen) clearHighlight();
    });

    // 滑块实时调节 + 滚动 + 高亮
    controls.addEventListener('input', (e) => {
      if (e.target.type !== 'range') return;
      const varName = e.target.dataset.var;
      const val = parseInt(e.target.value, 10);

      // 实时应用
      document.documentElement.style.setProperty(varName, val + 'px');

      // 更新显示
      const valDisplay = controls.querySelector(`.current-val[data-var="${varName}"]`);
      if (valDisplay) valDisplay.textContent = val + 'px';

      // 滚动 + 红色高亮
      highlightAndScroll(varName);
    });

    // 滑块松手后 1.5 秒清除高亮
    controls.addEventListener('mouseup', () => {
      setTimeout(clearHighlight, 1500);
    });
    controls.addEventListener('touchend', () => {
      setTimeout(clearHighlight, 1500);
    });

    // 保存
    actions.querySelector('.btn-save').addEventListener('click', () => {
      const vals = {};
      controls.querySelectorAll('input[type="range"]').forEach(input => {
        vals[input.dataset.var] = parseInt(input.value, 10);
      });
      saveValues(vals);
      alert('已保存到浏览器本地存储');
    });

    // 重置
    actions.querySelector('.btn-reset').addEventListener('click', () => {
      CSS_VARS.forEach(v => {
        document.documentElement.style.setProperty(v.name, v.default + 'px');
        const input = controls.querySelector(`input[data-var="${v.name}"]`);
        const valDisplay = controls.querySelector(`.current-val[data-var="${v.name}"]`);
        if (input) input.value = v.default;
        if (valDisplay) valDisplay.textContent = v.default + 'px';
      });
      localStorage.removeItem(STORAGE_KEY);
    });

    // 导出 CSS
    actions.querySelector('.btn-export').addEventListener('click', () => {
      let css = ':root {\n';
      controls.querySelectorAll('input[type="range"]').forEach(input => {
        css += `  ${input.dataset.var}: ${input.value}px;\n`;
      });
      css += '}\n';

      navigator.clipboard.writeText(css).then(() => {
        alert('CSS 已复制到剪贴板：\n\n' + css);
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = css;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        alert('CSS 已复制到剪贴板：\n\n' + css);
      });
    });

    // 页面加载时应用已保存的值
    if (Object.keys(saved).length > 0) {
      applyValues(saved);
      CSS_VARS.forEach(v => {
        if (saved[v.name] !== undefined) {
          const input = controls.querySelector(`input[data-var="${v.name}"]`);
          const valDisplay = controls.querySelector(`.current-val[data-var="${v.name}"]`);
          if (input) input.value = saved[v.name];
          if (valDisplay) valDisplay.textContent = saved[v.name] + 'px';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildPanel);
  } else {
    buildPanel();
  }
})();
