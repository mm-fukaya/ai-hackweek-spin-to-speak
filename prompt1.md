
---

**Prompt: Build a Web App called "Spin to Speak"**

I want you to build a simple web-based roulette app called **"Spin to Speak"** that randomly selects a presenter from a given list of participants. It will be used during internal events like Hackweek. Here are the specifications:

---

### 🧩 **Functionality**

* Read a list of participants from a **CSV file** (user uploads one)

  * Example CSV:

    ```csv
    name
    Alice Johnson
    Bob Smith
    Charlie Tanaka
    ```
  
* Display the names on a **colorful spinning wheel** or roulette UI

  * Use CSS/Canvas animation to simulate spinning
  * After spinning, one name is selected randomly and shown in the center

* Once someone is selected:

  * Their name must be **grayed out or visually dimmed** on the wheel
  * They cannot be selected again in future spins (persistent for the session)

* Provide a **clear "Spin" button**

  * Clicking it triggers the animation and selection
  * Disable the button if all participants have already been chosen

* Show a **history log** on the side or bottom with previously selected names

* Optional: Add a **"Reset" button** to clear all previous selections and start over

---

### 🖥️ **Environment and Usage**

* Must run **locally on Mac** in a browser (e.g. open `index.html` directly)
* No server/backend required — pure **HTML/CSS/JS** (vanilla or lightweight framework)
* All code should be self-contained
* UI must be in **English**
* Screen should be easily shareable on **Microsoft Teams**

---

### ✨ **Bonus (optional)**

* Use a fun roulette sound effect when spinning
* Add smooth animations and responsive layout
* Highlight the winner visually (e.g., confetti, glow, popup)

---

## 🧪 Output expectation

* Provide the full `index.html`, `style.css`, and `script.js` or all code inline
* Prefer code that works offline (no CDN dependencies unless really small)
* Keep it simple and readable

---

## ✅ Notes for the Assistant

This app will be used by a facilitator during AI Hackweek to fairly select who presents next from a pool of engineers. The focus is on usability, visibility, and fairness. Thanks!

