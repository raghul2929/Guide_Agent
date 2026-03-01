🧭 GuideAgent
✨ Why GuideAgent?

Most web applications are hard to understand for first-time users.

GuideAgent solves this by:

Highlighting important UI elements

Explaining features step-by-step

Supporting multiple languages out of the box

👉 Perfect for dashboards, admin panels, SaaS tools, and portfolios.

✨ Features

🧭 Step-by-step guided tours

🌐 Multi-language support (English, Tamil, Hindi)

⚡ Lightweight & fast

🧩 Works with React, Vue, Angular, or plain HTML

🎯 Flexible selector targeting

🔄 Auto start on first visit

⚙️ Installation
npm install guideagent
🚀 Usage
React / Next.js
import GuideAgent from 'guideagent'

setTimeout(() => {
  GuideAgent.initFromUrl('/guide.json')
}, 800)
Vue.js
import GuideAgent from 'guideagent'

app.mount('#app')

setTimeout(() => {
  GuideAgent.initFromUrl('/guide.json')
}, 800)
Angular
import GuideAgent from 'guideagent'

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  setTimeout(() => {
    GuideAgent.initFromUrl('/guide.json')
  }, 800)
})
Plain HTML (No Install)
<script type="module">
  import GuideAgent from 'https://unpkg.com/guideagent/dist/index.mjs'
  await GuideAgent.initFromUrl('./guide.json')
</script>
🧩 Step 2 — Add Guide Targets
<header data-guide-id="navbar"></header>
<section data-guide-id="hero"></section>
<div data-guide-id="features"></div>
<section data-guide-id="contact"></section>
📄 Step 3 — Create guide.json
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
🎯 Selector Options
<div data-guide-id="dashboard"></div>
<div id="dashboard"></div>
<div class="hero-section"></div>
📚 API Reference
Method	Description
GuideAgent.initFromUrl('/guide.json')	Load guide from JSON
GuideAgent.init({ steps })	Load guide from JS
GuideAgent.start()	Start guide manually
GuideAgent.stop()	Stop guide
GuideAgent.setLang('ta')	Change language
GuideAgent.getStrings()	Get current strings
🌐 Supported Languages
Code	Language
en	English
ta	Tamil
hi	Hindi
⚡ How It Works
Page Load
   ↓
Welcome Popup (first visit)
   ↓
Start Guide / Maybe Later
   ↓
Guide Runs
   ↓
Floating Button
   ↓
Stop Anytime
📦 NPM Package

👉 https://www.npmjs.com/package/guideagent

💡 Author

Built with ❤️ to simplify user onboarding in modern web applications.


## 🔴 Live Demo

👉 https://raghulportfolio.hub29.online