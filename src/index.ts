// src/index.ts
import { GuideEngine, GuideConfig } from './core/engine';
import { setLanguage, getStrings } from './config/i18n';   // ← add getStrings

let engine: GuideEngine | null = null;
let floatingBtn: HTMLElement | null = null;

const GuideAgent = {
  version: '0.1.0',

  init(config: GuideConfig): void {
    engine = new GuideEngine(config);
    this.createFloatingButton();
    console.log('GuideAgent initialized ✅');
  },

  async initFromUrl(configUrl: string): Promise<void> {
    try {
      const { loadConfig } = await import('./config/loader');
      const config = await loadConfig(configUrl);
      engine = new GuideEngine({ steps: config.steps });
      this.createFloatingButton();
      console.log('GuideAgent initialized from URL ✅');
    } catch (error) {
      console.error('GuideAgent: initFromUrl failed:', error);
    }
  },

  start(): void { engine?.start(); },
  stop(): void { engine?.stop(); },

  setLang(lang: string): void {
    setLanguage(lang);
    // Update floating button text to new language
    if (floatingBtn) {
      floatingBtn.textContent = getStrings().guide_me_btn;
    }
  },

  // Expose getStrings so HTML can read page content keys
  getStrings() {
    return getStrings();
  },

  createFloatingButton(): void {
    floatingBtn?.remove();
    floatingBtn = document.createElement('button');
    floatingBtn.textContent = getStrings().guide_me_btn;

    Object.assign(floatingBtn.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '999px',
      fontSize: '14px',
      fontWeight: '600',
      fontFamily: 'sans-serif',
      cursor: 'pointer',
      zIndex: '10001',
      boxShadow: '0 4px 20px rgba(99,102,241,0.5)',
      transition: 'transform 0.2s ease',
    });

    floatingBtn.addEventListener('mouseenter', () => {
      floatingBtn!.style.transform = 'scale(1.05)';
    });
    floatingBtn.addEventListener('mouseleave', () => {
      floatingBtn!.style.transform = 'scale(1)';
    });
    floatingBtn.addEventListener('click', () => {
      engine?.start();
    });

    document.body.appendChild(floatingBtn);
  }
};

export default GuideAgent;
