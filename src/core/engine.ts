// src/core/engine.ts
import { getStrings, getCurrentLang } from '../config/i18n';
import { highlight, removeHighlight } from '../renderer/highlight';
import { showTooltip, removeTooltip } from '../renderer/tooltip';
import { StepManager, Step } from './stepManager';



// Shape of the config object passed to GuideEngine.init()
export interface GuideConfig {
  steps: Step[];
  language?: string;   // optional — defaults to 'en'
}

export class GuideEngine {
  private manager: StepManager;
  private active: boolean = false; // tracks if guide is currently running

  constructor(config: GuideConfig) {
    this.manager = new StepManager(config.steps);
  }

  // ─── Public API ───────────────────────────────────────────

  start(): void {
    if (this.active) this.stop(); // if already running, reset first
    this.active = true;
    this.manager.reset();
    this.renderStep();
    console.log('GuideAgent ▶ Guide started');
  }

  next(): void {
    if (!this.active) return;
    const step = this.manager.next();
    if (step) {
      this.renderStep();
    } else {
      this.finish();
    }
  }

  prev(): void {
    if (!this.active) return;
    const step = this.manager.prev();
    if (step) {
      this.renderStep();
    }
  }

  stop(): void {
    this.active = false;
    removeHighlight();
    removeTooltip();
    console.log('GuideAgent ■ Guide stopped');
  }

  // Add this inside GuideEngine class in engine.ts
// after the stop() method

  // Loads config from a JSON file URL then starts the guide
  async loadFromUrl(configUrl: string): Promise<void> {
    try {
      const { loadConfig } = await import('../config/loader');
      const config = await loadConfig(configUrl);

      // Replace current steps with loaded ones
      this.manager = new StepManager(config.steps);

      console.log('GuideAgent: Config loaded from URL ✅');
    } catch (error) {
      console.error('GuideAgent: Could not load config:', error);
    }
  }


  // ─── Private Methods ──────────────────────────────────────

  private finish(): void {
    this.active = false;
    removeHighlight();
    removeTooltip();
    console.log('GuideAgent ✅ Guide complete');

    // Show a small completion message for 2 seconds
    this.showCompletionBadge();
  }

 private renderStep(): void {
  const step = this.manager.current();

  setTimeout(() => {
    const el = document.querySelector(step.selector);

    if (!el) {
      console.warn(`GuideAgent ⚠ "${step.selector}" not found — skipping`);
      this.next();
      return;
    }

    // First scroll element into view
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Wait for scroll animation to finish THEN calculate position
    // smooth scroll takes ~500ms — we wait 600ms to be safe
    setTimeout(() => {
      const lang = getCurrentLang();
      const translation = step.translations[lang] ?? step.translations['en'];

      highlight(el);

      showTooltip(
        el,
        translation.title,
        translation.description,
        () => this.next(),
        () => this.prev(),
        this.manager.isFirst(),
        this.manager.isLast(),
        this.manager.currentNumber(),
        this.manager.totalSteps()
      );

      console.log(
        `GuideAgent → Step ${this.manager.currentNumber()}/${this.manager.totalSteps()} [${lang}]: ${translation.title}`
      );

    }, 1000); // ← wait for scroll to complete

  }, 300);
}

 private showCompletionBadge(): void {
  const s = getStrings();
  const badge = document.createElement('div');
  Object.assign(badge.style, {
    position: 'fixed',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#22c55e',
    color: 'white',
    padding: '10px 24px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'sans-serif',
    zIndex: '10001',
    boxShadow: '0 4px 16px rgba(34,197,94,0.4)',
  });
  badge.textContent = s.guide_complete;  // ← uses language string
  document.body.appendChild(badge);
  setTimeout(() => badge.remove(), 2000);
}

}
