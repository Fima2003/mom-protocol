# 🏥 Mom's Sick Day Protocol

A playful, retro 8-bit web application for tracking recovery activities with cozy "mom advice" vibes.

## 🎮 Features

### 1. **Health Status Dashboard**
- Interactive slider to set how you're feeling (1-10)
- AI-predicted status based on completed recovery activities
- Pixel art emoticons that change based on your progress

### 2. **Bundle Up Section**
- Interactive pixel-art person figure
- Click to toggle cozy clothing items:
  - 🧦 Socks
  - 🧥 Sweater
  - 👖 Sweatpants
- Items glow with a pixel shine animation when active

### 3. **Nourishment Station**
- Track consumption with pixel counters:
  - 🍲 Soup Bowls
  - ☕ Hot Tea
  - 💧 Water Glasses
- Animated icons bounce when you increment

### 4. **Rest & Recovery Zone**
- **Sleep Loggers**: Track both nighttime sleep and day naps
  - Stepper controls to set hours
  - Animated 💤 when you log sleep
- **Ventilation Tracker**: 
  - Click to "open window" for fresh air
  - Automatic 5-minute countdown timer
  - Window closes automatically when timer ends

## 🎨 Design

- **Style**: Strictly 8-bit/pixel art aesthetic (SNES/Stardew Valley inspired)
- **Color Palette**: Warm, cozy colors - muted oranges, deep reds, creamy yellows, earthy browns, soft forest greens
- **Font**: Press Start 2P (retro pixel font from Google Fonts)
- **Animations**: 
  - Bouncy button presses
  - Shimmering/glowing active items
  - Depressing button effects on click

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with custom pixel-art utilities
- **State Management**: React useState
- **Language**: TypeScript

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles with pixel-art animations
├── components/
│   ├── BundleUpSection.tsx    # Clothing tracker with pixel person
│   ├── ClothingItem.tsx       # Individual clothing item component
│   ├── HealthStatus.tsx       # Health input & AI prediction
│   ├── ResourceCounter.tsx    # Reusable counter for food/drinks
│   ├── SleepLogger.tsx        # Sleep tracking with stepper
│   └── VentilationTracker.tsx # Window timer component
└── public/                    # Static assets
```

## 🎯 Component Overview

### `HealthStatus`
Displays the app title, user health input slider, and AI-predicted recovery status based on completed tasks.

### `BundleUpSection`
Central pixel-art figure with three clickable zones for clothing items. Items change color and animate when active.

### `ResourceCounter`
Reusable component for tracking soup, tea, and water consumption. Features animated icons and increment buttons.

### `SleepLogger`
Allows users to select hours slept using +/- buttons and log sleep sessions with animated feedback.

### `VentilationTracker`
Opens a "window" for fresh air with an automatic 5-minute countdown timer.

## 🎨 Custom Tailwind Utilities

The app includes custom pixel-art utilities in `globals.css`:

- `.pixel-border` - Retro pixelated border effect
- `.pixel-shadow` - 8-bit drop shadow
- `.pixel-glow` - Pulsing glow animation
- `.pixel-bounce` - Bouncy animation
- `.pixel-shine` - Shimmering effect
- `.pixel-press` - Button press effect

## 🌈 Color Scheme

```css
Background Gradient: Brown (#8B4513) → Sienna (#A0522D) → Peru (#CD853F)
Accent Colors:
- Orange (#FF8C00) - Warmth
- Red (#DC143C) - Cozy
- Yellow (#FFD700) - Cheerful
- Green (#228B22) - Nature
- Purple (#9370DB) - Rest
```

## 💝 Mom's Wisdom

*"Rest, hydrate, and listen to your body!"*

---

Built with ❤️ and pixel-perfect care.
