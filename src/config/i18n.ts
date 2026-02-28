// src/config/i18n.ts

import en from '../i18n/en.json';
import ta from '../i18n/ta.json';
import hi from '../i18n/hi.json';

// Only GuideAgent UI strings — nothing about website content
export interface LanguageStrings {
  guide_label: string;
  next_btn: string;
  prev_btn: string;
  finish_btn: string;
  guide_me_btn: string;
  guide_complete: string;
  step_of: string;
  // Welcome dialog
  welcome_title: string;
  welcome_desc: string;
  welcome_start: string;
  welcome_cancel: string;
  select_language: string;
}


const languages: Record<string, LanguageStrings> = { en, ta, hi };

let currentLang: string = 'en';

export function setLanguage(lang: string): void {
  if (languages[lang]) {
    currentLang = lang;
    console.log(`GuideAgent: Language set to "${lang}" ✅`);
  } else {
    console.warn(`GuideAgent: "${lang}" not supported — using "en"`);
    currentLang = 'en';
  }
}
// Add this to i18n.ts
export function getCurrentLang(): string {
  return currentLang;
}

export function getStrings(): LanguageStrings {
  return languages[currentLang] ?? languages['en'];
}

export function formatStep(template: string, current: number, total: number): string {
  return template
    .replace('{current}', String(current))
    .replace('{total}', String(total));
}
