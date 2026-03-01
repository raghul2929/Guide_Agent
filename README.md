# 🧭 GuideAgent
<h1>IMPLEMENTED GUDIE AGENT IN PORTFOLIO</h1>
<a href="https://raghulportfolio.hub29.online">📦 PORTFOLO </a>
<p align="center">
  <b>Lightweight user onboarding & product tour library for modern web apps</b><br/>
  Guide users step-by-step with multi-language support.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/guideagent">📦 NPM</a> •
  <a href="#installation">⚙️ Installation</a> •
  <a href="#usage">🚀 Usage</a> •
  <a href="#api-reference">📚 API</a>
</p>

---

## ✨ Features

* 🧭 Step-by-step guided tours
* 🌐 Multi-language support (English, Tamil, Hindi)
* ⚡ Lightweight & fast
* 🧩 Works with React, Vue, Angular, or plain HTML
* 🎯 Flexible selector targeting
* 🔄 Auto start on first visit

---

## ⚙️ Installation

```bash
npm install guideagent
```

---

## 🚀 Usage

### React / Next.js

```jsx
import GuideAgent from 'guideagent'

setTimeout(() => {
  GuideAgent.initFromUrl('/guide.json')
}, 800)
```

---

### Vue.js

```js
import GuideAgent from 'guideagent'

app.mount('#app')

setTimeout(() => {
  GuideAgent.initFromUrl('/guide.json')
}, 800)
```

---

### Angular

```ts
import GuideAgent from 'guideagent'

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  setTimeout(() => {
    GuideAgent.initFromUrl('/guide.json')
  }, 800)
})
```

---

### Plain HTML (No Install)

```html
<script type="module">
  import GuideAgent from 'https://unpkg.com/guideagent/dist/index.mjs'
  await GuideAgent.initFromUrl('./guide.json')
</script>
```

---

## 🧩 Step 2 — Add Guide Targets

Add `data-guide-id` to elements you want to highlight:

```html
<header data-guide-id="navbar"></header>
<section data-guide-id="hero"></section>
<div data-guide-id="features"></div>
<section data-guide-id="contact"></section>
```

---

## 📄 Step 3 — Create guide.json

```json
{
  "page": "home",
  "steps": [
    {
      "selector": "[data-guide-id='hero']",
      "order": 1,
      "translations": {
        "en": {
          "title": "Welcome!",
          "description": "Let me walk you through this app."
        },
        "ta": {
          "title": "Vanakkam!",
          "description": "Ithai pathi kaattukirein."
        },
        "hi": {
          "title": "Swagat!",
          "description": "Main aapko guide karunga."
        }
      }
    }
  ]
}
```

---

## 🎯 Selector Options

```html
<!-- Recommended -->
<div data-guide-id="dashboard"></div>

<!-- ID selector -->
<div id="dashboard"></div>

<!-- Class selector -->
<div class="hero-section"></div>
```

---

## 📚 API Reference

| Method                                  | Description          |
| --------------------------------------- | -------------------- |
| `GuideAgent.initFromUrl('/guide.json')` | Load guide from JSON |
| `GuideAgent.init({ steps })`            | Load guide from JS   |
| `GuideAgent.start()`                    | Start guide manually |
| `GuideAgent.stop()`                     | Stop guide           |
| `GuideAgent.setLang('ta')`              | Change language      |
| `GuideAgent.getStrings()`               | Get current strings  |

---

## 🌐 Supported Languages

| Code | Language |
| ---- | -------- |
| en   | English  |
| ta   | Tamil    |
| hi   | Hindi    |

---

## ⚡ How It Works

```
Page Load
   ↓
Welcome Popup (first visit)
   ↓
Start Guide / Maybe Later
   ↓
Guide Runs
   ↓
Floating Button (bottom-right)
   ↓
Stop Anytime (top-right ✕)
```

---

## 📦 NPM Package

👉 https://www.npmjs.com/package/guideagent

---

## 💡 Author

Built with ❤️ for better onboarding experiences
