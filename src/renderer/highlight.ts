// src/renderer/highlight.ts

// These two variables live outside the function
// so removeHighlight() can find and delete them later
let highlightBox: HTMLElement | null = null;
let overlayMask: HTMLElement | null = null;

export function highlight(el: Element): void {
  // Always clean up previous highlight before drawing new one
  removeHighlight();

  // getBoundingClientRect() gives exact pixel position of the element on screen
  // top, left = where it starts | width, height = its size
  const rect = el.getBoundingClientRect();

  // --- LAYER 1: Dark mask that covers the full screen ---
  overlayMask = document.createElement('div');
  Object.assign(overlayMask.style, {
    position: 'fixed',      // fixed = stays in place even when user scrolls
    top: '0',
    left: '0',
    width: '100vw',         // full screen width
    height: '100vh',        // full screen height
    backgroundColor: 'rgba(0, 0, 0, 0.55)',  // semi-transparent black
    zIndex: '9998',         // sits above your portfolio content
    pointerEvents: 'none',  // user can still interact with page behind it
  });

  // --- LAYER 2: Glowing border box around the target element ---
  highlightBox = document.createElement('div');
  Object.assign(highlightBox.style, {
    position: 'fixed',
    top: `${rect.top - 6}px`,        // 6px padding above element
    left: `${rect.left - 6}px`,      // 6px padding left of element
    width: `${rect.width + 12}px`,   // 12px wider (6px each side)
    height: `${rect.height + 12}px`, // 12px taller (6px each side)
    border: '2px solid #6366f1',     // indigo border color
    borderRadius: '8px',
    zIndex: '9999',                  // sits above the dark mask
    pointerEvents: 'none',
    boxShadow: '0 0 12px rgba(99, 102, 241, 0.6)', // soft glow effect
    transition: 'all 0.3s ease',     // smooth animation when moving steps
  });

  // Inject both layers into the page
  document.body.appendChild(overlayMask);
  document.body.appendChild(highlightBox);
}

export function removeHighlight(): void {
  // .remove() deletes the element from DOM completely
  highlightBox?.remove();
  overlayMask?.remove();

  // Reset to null = clean state, ready for next step
  highlightBox = null;
  overlayMask = null;
}
