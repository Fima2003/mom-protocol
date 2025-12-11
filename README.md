# 🏥 Mom's Sick Day Protocol

A playful, retro 8-bit web application for tracking recovery activities with cozy "mom advice" vibes.

## ✨ New Features

### 🔥 Firebase Integration
- **Cloud Database**: All data is now stored in Firebase Firestore instead of localStorage
- **Multi-Device Sync**: Access your health data from any device
- **Real-time Updates**: Changes sync instantly across all devices

### 🔗 Live Share Links
- **Share Your Status**: Generate a unique shareable link to your health dashboard
- **Read-Only Access**: Others can view your health status live without being able to edit
- **Real-time Monitoring**: Perfect for letting someone check on you while you're resting!

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
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS with custom pixel-art utilities
- **State Management**: React Context API
- **Language**: TypeScript
- **Real-time Sync**: Firestore real-time listeners

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google account (for Firebase)

### Firebase Setup

Before running the app, you need to set up Firebase. Follow the detailed guide:

**[📖 Firebase Setup Guide](./FIREBASE_SETUP.md)**

### Quick Start

1. **Clone and install**:
   ```bash
   npm install
   ```

2. **Set up Firebase** (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

3. **Create `.env.local`** with your Firebase config:
   ```bash
   cp .env.example .env.local
   # Then edit .env.local with your Firebase credentials
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 🔗 Using Share Links

1. Click the **"🔗 Share Live Link"** button on your dashboard
2. Copy the generated link
3. Share it with friends or family
4. They can view your health status in real-time without editing privileges

Perfect for letting someone monitor your recovery remotely!

### Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with HealthProvider
│   ├── page.tsx            # Main dashboard page
│   ├── view/[userId]/      # Shared view page (read-only)
│   │   └── page.tsx
│   └── globals.css         # Global styles with pixel-art animations
├── components/
│   ├── BundleUpSection.tsx    # Clothing tracker with pixel person
│   ├── ClothingItem.tsx       # Individual clothing item component
│   ├── HealthStatus.tsx       # Health input & AI prediction
│   ├── ResourceCounter.tsx    # Reusable counter for food/drinks
│   ├── ShareLink.tsx          # Share link modal component
│   ├── SleepLogger.tsx        # Sleep tracking with stepper
│   ├── TotalSleep.tsx         # Total sleep display
│   └── VentilationTracker.tsx # Window timer component
├── lib/
│   ├── firebase.ts            # Firebase configuration
│   ├── healthData.ts          # Firestore data operations
│   ├── HealthContext.tsx      # React Context for health data
│   └── userId.ts              # User ID management
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
