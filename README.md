# Amul Kool Gold — Exotic Rose | Interactive Scroll Experience

An immersive, premium landing page for **Amul Kool Gold (Exotic Rose)** featuring a high-performance interactive scroll sequence animation, custom physics-based loader, and modern material design layouts.

---

## ✨ Features

- **Interactive Scroll-Scrubbing Canvas**: Renders fluid milk cream splashes and bottle animations mapping scroll depth to 147 high-quality image frames.
- **Inertia Rendering Engine**: Uses `requestAnimationFrame` with linear interpolation (lerp) for buttery-smooth scrolling transitions.
- **Fluid Dripping Preloader**: A custom preloading screen with CSS liquid physics and a loading progress percentage tracker.
- **Animated Typography Overlay**: A centered serif title **"Amul Kool"** and subtitle **"THE TASTE OF INDIA"** that fades out and translates upwards within the first 30% of scroll progress.
- **Tailwind Bento Grid**: Highlighting the product's main features (100% Real Milk, Naturally Flavorful, Chilled Refreshment).
- **Asymmetric Lifestyle Gallery**: Clean Masonry-style grid showcasing lifestyle shots of the beverage.
- **High-Contrast Call to Action**: An elegant, accessibility-focused location finder button.

---

## 🛠️ Tech Stack

- **Core**: Vanilla JS, HTML5 Canvas
- **Styling**: Vanilla CSS + Tailwind CSS (via CDN configuration)
- **Fonts**: Playfair Display (Serif), Manrope & Outfit (Sans-Serif)
- **Bundler**: Vite
- **Deployment Platform**: Vercel

---

## 📂 Project Structure

```text
├── public/                 # Static assets
│   ├── frames/             # 147 animation sequence images
│   ├── GIRL.png            # Gallery lifestyle asset
│   └── favicon.svg         # Tab favicon
├── src/                    # Source files
│   ├── main.js             # Canvas, scroll, and animation logic
│   ├── style.css           # Styling rules and page layout
│   └── code.html           # Original reference template
├── index.html              # Core HTML structure and Tailwind setup
├── package.json            # Node scripts and dependencies
├── package-lock.json       # Dependency tree lockfile
└── README.md               # Project documentation
```

---

## 🚀 Running Locally

Follow these steps to set up and run the project on your machine:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   This generates optimized files in the `dist/` directory.

---

## ⚡ Deployment on Vercel

This repository is pre-configured for automatic deployment:
1. Push this code to GitHub.
2. Link the repository in your Vercel Dashboard.
3. Vercel will auto-detect **Vite** as the framework preset, use `npm run build` as the build command, and deploy the contents of the `dist/` folder.
