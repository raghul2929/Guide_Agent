// src/config/loader.ts

import { Step } from '../core/stepManager';

export interface GuideConfigFile {
  page: string;
  language?: string;
  steps: Step[];
}

export async function loadConfig(configUrl: string): Promise<GuideConfigFile> {
  try {
    const response = await fetch(configUrl);

    if (!response.ok) {
      throw new Error(
        `GuideAgent: Failed to load config from "${configUrl}" — HTTP ${response.status}`
      );
    }

    const config: GuideConfigFile = await response.json();

    // Validate steps array exists
    if (!config.steps || !Array.isArray(config.steps)) {
      throw new Error(
        `GuideAgent: Invalid config — "steps" array missing in "${configUrl}"`
      );
    }

    // Validate each step — matches NEW Step shape with translations
    config.steps.forEach((step, index) => {
      // Must have selector
      if (!step.selector) {
        throw new Error(
          `GuideAgent: Step ${index + 1} missing "selector" field`
        );
      }

      // Must have translations object
      if (!step.translations) {
        throw new Error(
          `GuideAgent: Step ${index + 1} missing "translations" field`
        );
      }

      // Must have at least English translation as fallback
      if (!step.translations['en']) {
        throw new Error(
          `GuideAgent: Step ${index + 1} missing "en" translation — English is required as fallback`
        );
      }

      // Each translation must have title and description
      Object.entries(step.translations).forEach(([lang, t]) => {
        if (!t.title) {
          throw new Error(
            `GuideAgent: Step ${index + 1} "${lang}" translation missing "title"`
          );
        }
        if (!t.description) {
          throw new Error(
            `GuideAgent: Step ${index + 1} "${lang}" translation missing "description"`
          );
        }
      });
    });

    console.log(
      `GuideAgent: Config loaded ✅ — ${config.steps.length} steps for page "${config.page}"`
    );

    return config;

  } catch (error) {
    console.error('GuideAgent config load failed:', error);
    throw error;
  }
}
