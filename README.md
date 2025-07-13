# 🤖 AI Hackweek - Spin to Speak

A simple web-based roulette app that randomly selects presenters from a list of participants. Perfect for internal events like Hackweek!

## ✨ Features

- **CSV Upload**: Upload participant lists via CSV file
- **Colorful Roulette**: Beautiful spinning wheel with smooth animations
- **Fair Selection**: Once selected, participants are excluded from future spins
- **History Tracking**: Keep track of all selections with timestamps
- **Reset Functionality**: Start over with a fresh selection pool
- **Responsive Design**: Works on desktop and mobile devices
- **No Server Required**: Pure HTML/CSS/JavaScript - runs locally

## 🚀 Quick Start

1. **Download the files** to your local machine
2. **Open `index.html`** in your web browser
3. **Upload a CSV file** with participant names (see sample format below)
4. **Click "SPIN"** to randomly select a presenter
5. **View history** of all selections on the right panel

## 📁 CSV Format

Your CSV file should have a header row with "name" as the first column:

```csv
name
Alice Johnson
Bob Smith
Charlie Tanaka
Diana Rodriguez
```

## 🎮 How to Use

### For Facilitators

1. **Prepare your participant list** in CSV format
2. **Open the app** in a browser window
3. **Upload the CSV file** using the file selector
4. **Share your screen** on Microsoft Teams or other platforms
5. **Click SPIN** to randomly select the next presenter
6. **Track selections** using the history panel
7. **Reset when needed** to start a new round

### Features in Detail

- **Smart Selection**: Once someone is selected, they're automatically excluded from future spins
- **Visual Feedback**: Winners are highlighted with a glow effect
- **Session Persistence**: Selections are maintained until you reset or refresh
- **Mobile Friendly**: Responsive design works on tablets and phones
- **Accessibility**: Clear visual indicators and easy-to-read text

## 🛠️ Technical Details

- **Pure JavaScript**: No frameworks or dependencies required
- **Canvas-based Graphics**: Smooth animations and crisp visuals
- **Local Storage**: No data sent to external servers
- **Cross-browser Compatible**: Works in Chrome, Firefox, Safari, Edge

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎨 AI Hackweek Theme

The app features a custom AI Hackweek theme with:
- Dark futuristic background with AI-inspired gradients
- Neon cyan and pink color scheme
- Animated gradient text effects
- AI-themed visual elements
- Made with Cursor AI assistant

## 🔧 Troubleshooting

**CSV not loading?**
- Make sure your CSV has a "name" column in the first row
- Check that the file is properly formatted (no extra commas)
- Try the sample CSV file included

**Wheel not spinning?**
- Ensure you've uploaded a valid CSV file
- Check that all participants haven't been selected already
- Try refreshing the page if issues persist

**Visual issues?**
- Update your browser to the latest version
- Check that JavaScript is enabled
- Try a different browser if problems continue

## 📄 License

This project is open source and available under the MIT License.

---

**Happy presenting! 🎤** 