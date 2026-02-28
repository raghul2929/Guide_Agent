// src/index.ts
import { GuideEngine, GuideConfig } from './core/engine';
import { setLanguage, getStrings } from './config/i18n';
import {
  showWelcomeDialog,
  showLanguagePicker,
  showCloseButton,
  removeCloseButton,
  removeWelcomeDialog
} from './renderer/welcome';

let engine: GuideEngine | null = null;
let floatingBtn: HTMLElement | null = null;

const GuideAgent = {
  version: '0.1.0',

  init(config: GuideConfig): void {
    engine = new GuideEngine(config);
    this.createFloatingButton();
    this.showWelcomeOnFirstVisit();
  },

  async initFromUrl(configUrl: string): Promise<void> {
    try {
      const { loadConfig } = await import('./config/loader');
      const config = await loadConfig(configUrl);
      engine = new GuideEngine({ steps: config.steps });
      this.createFloatingButton();
      this.showWelcomeOnFirstVisit();
    } catch (error) {
      console.error('GuideAgent: initFromUrl failed:', error);
    }
  },

  showWelcomeOnFirstVisit(): void {
    const hasVisited = sessionStorage.getItem('ga_visited');
    if (hasVisited) return;

    setTimeout(() => {
      showWelcomeDialog(
        () => {
          // Start clicked
          sessionStorage.setItem('ga_visited', 'true');
          this.updateFloatingButtonText();
          showCloseButton(() => this.stop());
          engine?.start();
        },
        () => {
          // Cancel clicked
          sessionStorage.setItem('ga_visited', 'true');
        }
      );
    }, 1000);
  },

  start(): void {
    engine?.start();
    showCloseButton(() => this.stop());
  },

  stop(): void {
    engine?.stop();
    removeCloseButton();
    removeWelcomeDialog();
  },

  setLang(lang: string): void {
    setLanguage(lang);
    this.updateFloatingButtonText();
  },

  getStrings() {
    return getStrings();
  },

  updateFloatingButtonText(): void {
    if (floatingBtn) {
      floatingBtn.textContent = getStrings().guide_me_btn;
    }
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

    // Guide Me click → show language picker first
    floatingBtn.addEventListener('click', () => {
      showLanguagePicker(
        () => {
          // Continue clicked → start guide
          this.updateFloatingButtonText();
          showCloseButton(() => this.stop());
          engine?.start();
        },
        () => {
          // Picker closed → do nothing, button stays
        }
      );
    });

    document.body.appendChild(floatingBtn);
  }
};

export default GuideAgent;
