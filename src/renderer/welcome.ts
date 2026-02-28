// src/renderer/welcome.ts

import { getStrings, setLanguage } from '../config/i18n';

let welcomeEl: HTMLElement | null = null;
let closeBtn: HTMLElement | null = null;

// ── Welcome Dialog (first visit) ─────────────────────
export function showWelcomeDialog(
  onStart: () => void,
  onCancel: () => void
): void {
  removeWelcomeDialog();
  renderDialog(onStart, onCancel);
}

// ── Language Picker (when Guide Me button clicked) ───
export function showLanguagePicker(
  onContinue: () => void,
  onCancel: () => void
): void {
  removeWelcomeDialog();

  const s = getStrings();

  welcomeEl = document.createElement('div');
  Object.assign(welcomeEl.style, {
    position: 'fixed',
    inset: '0',
    background: 'rgba(0,0,0,0.7)',
    zIndex: '10002',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
  });

  const dialog = document.createElement('div');
  Object.assign(dialog.style, {
    background: '#1e1e2e',
    border: '1px solid #6366f1',
    borderRadius: '16px',
    padding: '28px',
    width: '90%',
    maxWidth: '340px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
    color: '#ffffff',
    textAlign: 'center',
    position: 'relative',
  });

  dialog.innerHTML = `
    <!-- Close X -->
    <button id="ga-picker-close" style="
      position: absolute;
      top: 12px; right: 14px;
      background: transparent;
      border: none;
      color: #64748b;
      font-size: 18px;
      cursor: pointer;
      line-height: 1;
    ">✕</button>

    <!-- Title -->
    <div style="
      font-size: 12px;
      color: #a5b4fc;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    ">🧭 GUIDEAGENT</div>

    <h3 id="ga-picker-title" style="
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 20px;
      color: #ffffff;
    ">${s.select_language}</h3>

    <!-- Language Buttons -->
    <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 24px;">
      <button id="ga-lang-en" style="
        padding: 10px 20px;
        border-radius: 8px;
        border: 1px solid #6366f1;
        background: #6366f1;
        color: white;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
      ">EN</button>

      <button id="ga-lang-ta" style="
        padding: 10px 20px;
        border-radius: 8px;
        border: 1px solid #334155;
        background: transparent;
        color: #94a3b8;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      ">TA</button>

      <button id="ga-lang-hi" style="
        padding: 10px 20px;
        border-radius: 8px;
        border: 1px solid #334155;
        background: transparent;
        color: #94a3b8;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      ">HI</button>
    </div>

    <!-- Continue Button -->
    <button id="ga-continue-btn" style="
      width: 100%;
      padding: 12px;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    ">${s.welcome_start}</button>
  `;

  welcomeEl.appendChild(dialog);
  document.body.appendChild(welcomeEl);

  // Language switcher logic
  const setActiveLang = (lang: string) => {
    setLanguage(lang);
    ['en', 'ta', 'hi'].forEach(l => {
      const btn = document.getElementById(`ga-lang-${l}`);
      if (!btn) return;
      if (l === lang) {
        Object.assign(btn.style, {
          background: '#6366f1',
          color: 'white',
          border: '1px solid #6366f1'
        });
      } else {
        Object.assign(btn.style, {
          background: 'transparent',
          color: '#94a3b8',
          border: '1px solid #334155'
        });
      }
    });
    // Update continue button text
    const continueBtn = document.getElementById('ga-continue-btn');
    if (continueBtn) continueBtn.textContent = getStrings().welcome_start;
  };

  document.getElementById('ga-lang-en')?.addEventListener('click', () => setActiveLang('en'));
  document.getElementById('ga-lang-ta')?.addEventListener('click', () => setActiveLang('ta'));
  document.getElementById('ga-lang-hi')?.addEventListener('click', () => setActiveLang('hi'));

  document.getElementById('ga-continue-btn')?.addEventListener('click', () => {
    removeWelcomeDialog();
    onContinue();
  });

  document.getElementById('ga-picker-close')?.addEventListener('click', () => {
    removeWelcomeDialog();
    onCancel();
  });
}

// ── Global Close Button (visible during guide) ───────
export function showCloseButton(onClose: () => void): void {
  removeCloseButton();

  closeBtn = document.createElement('button');
  closeBtn.textContent = '✕ Stop Guide';

  Object.assign(closeBtn.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'rgba(30,30,46,0.95)',
    color: '#f87171',
    border: '1px solid #f87171',
    padding: '8px 16px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: '700',
    fontFamily: 'sans-serif',
    cursor: 'pointer',
    zIndex: '10003',
    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    transition: 'all 0.2s ease',
  });

  closeBtn.addEventListener('mouseenter', () => {
    closeBtn!.style.background = '#f87171';
    closeBtn!.style.color = 'white';
  });
  closeBtn.addEventListener('mouseleave', () => {
    closeBtn!.style.background = 'rgba(30,30,46,0.95)';
    closeBtn!.style.color = '#f87171';
  });

  closeBtn.addEventListener('click', () => {
    removeCloseButton();
    onClose();
  });

  document.body.appendChild(closeBtn);
}

export function removeCloseButton(): void {
  closeBtn?.remove();
  closeBtn = null;
}

export function removeWelcomeDialog(): void {
  welcomeEl?.remove();
  welcomeEl = null;
}

// ── Private: shared welcome dialog renderer ──────────
function renderDialog(onStart: () => void, onCancel: () => void): void {
  const s = getStrings();

  welcomeEl = document.createElement('div');
  Object.assign(welcomeEl.style, {
    position: 'fixed',
    inset: '0',
    background: 'rgba(0,0,0,0.7)',
    zIndex: '10002',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
  });

  const dialog = document.createElement('div');
  Object.assign(dialog.style, {
    background: '#1e1e2e',
    border: '1px solid #6366f1',
    borderRadius: '16px',
    padding: '32px',
    width: '90%',
    maxWidth: '420px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
    color: '#ffffff',
    textAlign: 'center',
    position: 'relative',
  });

  dialog.innerHTML = `
    <button id="ga-welcome-close" style="
      position: absolute; top: 12px; right: 14px;
      background: transparent; border: none;
      color: #64748b; font-size: 18px; cursor: pointer;
    ">✕</button>

    <div style="
      display: inline-flex; align-items: center; gap: 8px;
      background: #6366f1; padding: 8px 16px;
      border-radius: 999px; font-size: 12px;
      font-weight: 700; color: white; margin-bottom: 20px;
    ">🧭 GUIDEAGENT</div>

    <h2 id="ga-welcome-title" style="
      font-size: 22px; font-weight: 800;
      margin-bottom: 12px; color: #ffffff;
    ">${s.welcome_title}</h2>

    <p id="ga-welcome-desc" style="
      font-size: 14px; color: #94a3b8;
      line-height: 1.6; margin-bottom: 24px;
    ">${s.welcome_desc}</p>

    <p id="ga-select-lang" style="
      font-size: 11px; color: #64748b;
      text-transform: uppercase; letter-spacing: 1px;
      margin-bottom: 10px; font-weight: 600;
    ">${s.select_language}</p>

    <div style="display:flex; gap:8px; justify-content:center; margin-bottom:24px;">
      <button id="ga-lang-en" style="padding:6px 16px; border-radius:6px; border:1px solid #6366f1; background:#6366f1; color:white; font-size:12px; font-weight:600; cursor:pointer;">EN</button>
      <button id="ga-lang-ta" style="padding:6px 16px; border-radius:6px; border:1px solid #334155; background:transparent; color:#94a3b8; font-size:12px; font-weight:600; cursor:pointer;">TA</button>
      <button id="ga-lang-hi" style="padding:6px 16px; border-radius:6px; border:1px solid #334155; background:transparent; color:#94a3b8; font-size:12px; font-weight:600; cursor:pointer;">HI</button>
    </div>

    <button id="ga-start-btn" style="
      width:100%; padding:12px; background:#6366f1;
      color:white; border:none; border-radius:10px;
      font-size:15px; font-weight:700; cursor:pointer; margin-bottom:10px;
    ">${s.welcome_start}</button>

    <button id="ga-cancel-btn" style="
      width:100%; padding:10px; background:transparent;
      color:#64748b; border:1px solid #1e293b;
      border-radius:10px; font-size:13px; cursor:pointer;
    ">${s.welcome_cancel}</button>
  `;

  welcomeEl.appendChild(dialog);
  document.body.appendChild(welcomeEl);

  const setActiveLang = (lang: string) => {
    setLanguage(lang);
    ['en', 'ta', 'hi'].forEach(l => {
      const btn = document.getElementById(`ga-lang-${l}`);
      if (!btn) return;
      if (l === lang) {
        Object.assign(btn.style, { background: '#6366f1', color: 'white', border: '1px solid #6366f1' });
      } else {
        Object.assign(btn.style, { background: 'transparent', color: '#94a3b8', border: '1px solid #334155' });
      }
    });
    const ns = getStrings();
    const t = document.getElementById('ga-welcome-title');
    const d = document.getElementById('ga-welcome-desc');
    const l = document.getElementById('ga-select-lang');
    const s = document.getElementById('ga-start-btn');
    const c = document.getElementById('ga-cancel-btn');
    if (t) t.textContent = ns.welcome_title;
    if (d) d.textContent = ns.welcome_desc;
    if (l) l.textContent = ns.select_language;
    if (s) s.textContent = ns.welcome_start;
    if (c) c.textContent = ns.welcome_cancel;
  };

  document.getElementById('ga-lang-en')?.addEventListener('click', () => setActiveLang('en'));
  document.getElementById('ga-lang-ta')?.addEventListener('click', () => setActiveLang('ta'));
  document.getElementById('ga-lang-hi')?.addEventListener('click', () => setActiveLang('hi'));

  document.getElementById('ga-start-btn')?.addEventListener('click', () => {
    removeWelcomeDialog();
    onStart();
  });
  document.getElementById('ga-cancel-btn')?.addEventListener('click', () => {
    removeWelcomeDialog();
    onCancel();
  });
  document.getElementById('ga-welcome-close')?.addEventListener('click', () => {
    removeWelcomeDialog();
    onCancel();
  });
}
