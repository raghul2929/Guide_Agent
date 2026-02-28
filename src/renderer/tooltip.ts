// src/renderer/tooltip.ts

import { getStrings, formatStep } from '../config/i18n';

let tooltipEl: HTMLElement | null = null;

export function showTooltip(
  el: Element,
  title: string,
  description: string,
  onNext: () => void,
  onPrev: () => void,
  isFirst: boolean,
  isLast: boolean,
  currentStep: number,   // ← new
  totalSteps: number     // ← new
): void {
  removeTooltip();

  // Get current language strings
  const s = getStrings();

  const rect = el.getBoundingClientRect();
  
  tooltipEl = document.createElement('div');
  Object.assign(tooltipEl.style, {
    position: 'fixed',
    zIndex: '10000',
    background: '#1e1e2e',
    color: '#ffffff',
    padding: '16px 20px',
    borderRadius: '10px',
    width: '280px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    lineHeight: '1.5',
    border: '1px solid #6366f1',
  });

  tooltipEl.innerHTML = `
    <div style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    ">
      <span style="font-size:12px; color:#a5b4fc; font-weight:600; text-transform:uppercase;">
        ${s.guide_label}
      </span>
      <span style="font-size:12px; color:#64748b;">
        ${formatStep(s.step_of, currentStep, totalSteps)}
      </span>
    </div>

    <div style="font-size:16px; font-weight:700; margin-bottom:8px; color:#ffffff;">
      ${title}
    </div>

    <div style="font-size:14px; color:#cbd5e1; margin-bottom:16px;">
      ${description}
    </div>

    <div style="display:flex; gap:8px; justify-content:flex-end;">
      ${!isFirst ? `
        <button id="guide-prev-btn" style="
          background:transparent; color:#a5b4fc;
          border:1px solid #6366f1; padding:6px 14px;
          border-radius:6px; cursor:pointer; font-size:13px;
        ">${s.prev_btn}</button>
      ` : ''}

      <button id="guide-next-btn" style="
        background:#6366f1; color:white; border:none;
        padding:6px 14px; border-radius:6px; cursor:pointer;
        font-size:13px; font-weight:600;
      ">${isLast ? s.finish_btn : s.next_btn}</button>
    </div>
  `;

  // Position tooltip below element, flip above if off screen
   // Position tooltip below element, flip above if off screen
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const tooltipWidth = 280;
  const tooltipHeight = 180;

  let top = rect.bottom + 12;
  let left = rect.left;

  // Flip above if goes off bottom
  if (top + tooltipHeight > viewportHeight) {
    top = rect.top - tooltipHeight - 12;
  }

  // Center vertically if still off top
  if (top < 16) {
    top = viewportHeight / 2 - tooltipHeight / 2;
  }

  // Shift left if goes off right edge
  if (left + tooltipWidth > viewportWidth) {
    left = viewportWidth - tooltipWidth - 16;
  }

  // Never go off left edge
  if (left < 16) {
    left = 16;
  }

  tooltipEl.style.top = `${top}px`;
  tooltipEl.style.left = `${left}px`;

  document.body.appendChild(tooltipEl);

  document.getElementById('guide-next-btn')?.addEventListener('click', onNext);
  document.getElementById('guide-prev-btn')?.addEventListener('click', onPrev);
}

export function removeTooltip(): void {
  tooltipEl?.remove();
  tooltipEl = null;
}
