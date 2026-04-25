<div align="center">

# 🎓 PCAcademy

**The Zen of Data. An Interactive Educational Platform for Principal Component Analysis.**

[![Live Demo](https://img.shields.io/badge/Live_Site-View_Now-007AFF?style=for-the-badge&logo=vercel)](https://almogod.github.io/PCAcademy-/)
[![Framework](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#license)

---

A premium, highly aesthetic web platform designed specifically for students and data enthusiasts to master the complexities of **Principal Component Analysis (PCA)** through interactive visualizations, mathematical breakdowns, and modern UI/UX design.

</div>

<br />

## 📑 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Core Features](#-core-features)
- [🛠️ Technology Stack](#-technology-stack)
- [🎨 UI & Design Philosophy](#-ui--design-philosophy)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

<br />

## 🌟 Overview

**PCAcademy** serves as a lens through which high-dimensional chaos can be structured and understood. In a world drowning in data, clarity is power. By combining beautiful aesthetics, interactive visualizations, and rigorous mathematical breakdowns, we've created the ultimate ecosystem for learning dimensionality reduction.

Whether you're an undergraduate student learning linear algebra or a data scientist refreshing your machine learning fundamentals, PCAcademy provides an intuitive, step-by-step journey through the theory and application of PCA.

<br />

## ✨ Core Features

We provide a comprehensive learning ecosystem built on four core pillars:

| Feature | Description |
| :--- | :--- |
| 📖 **In-Depth Learning Modules** | Step-by-step conceptual guides, simplified mathematical derivations, and interactive proof explorations to build strong intuition. |
| 🧮 **Integrated PCA Calculators** | Powerful, transparent calculators for covariance matrices, eigenvalues, and full PCA transformations. Upload custom datasets to see the math in action. |
| 📄 **Expert Cheat Sheets** | High-quality reference materials, key formula summaries, and condensed notes designed for quick academic review and exam preparation. |
| 🌍 **Real-World Simulations** | Dynamic 3D point cloud projections, image compression demonstrations, and interactive applications showing PCA across various industries. |

<br />

## 🛠️ Technology Stack

Built with modern web technologies to ensure an incredibly fast, accessible, and visually stunning user experience:

### Frontend Architecture
- **[Astro](https://astro.build/)** - For blazing fast, content-driven static generation and seamless routing.
- **[React 18](https://react.dev/)** - For building rich, interactive UI components and state management.
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components for building high-quality design systems.

### Styling & Animation
- **[Tailwind CSS](https://tailwindcss.com/)** - For precise, scalable, and responsive utility-first styling.
- **[Framer Motion](https://www.framer.com/motion/)** - Driving fluid, native-feeling micro-interactions and complex page transitions.

### Data Visualization
- **[Three.js](https://threejs.org/)** - For rendering complex 3D data plots and immersive simulations.
- **[Recharts](https://recharts.org/)** - For clean, responsive 2D charts and variance plotting.

<br />

## 🎨 UI & Design Philosophy

> *"Reduce dimensionality. Maximize variance. Find clarity in the noise."*

Our design language reflects the core principles of PCA itself: finding order within complexity. We utilize a **"Zen of Data"** aesthetic:
- **Glassmorphism & Gradients:** Subtle use of depth to guide the user's eye without overwhelming the content.
- **Typography:** Crisp, modern sans-serif fonts prioritizing readability for long-form mathematical content.
- **Micro-animations:** purposeful motion that provides feedback and brings mathematical concepts to life visually.

<br />

## 🚀 Getting Started

Follow these steps to set up the project locally for development or study.

### Prerequisites
- **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
- **npm**, **yarn**, or **pnpm** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/almogod/PCAcademy-.git
   cd PCAcademy-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   *The site will be available at `http://localhost:4321` by default.*

4. **Build for production:**
   ```bash
   npm run build
   ```

<br />

## 📂 Project Structure

A clean, modular architecture separating UI components, routing, and data logic:

```text
PCAcademy-/
├── src/
│   ├── components/       # Reusable React & Astro components (Buttons, Layouts, Cards)
│   │   ├── pages/        # Page-level components wrapping complex logic
│   │   └── ui/           # Low-level UI primitives (Radix + Tailwind)
│   ├── lib/              # Utility functions, mathematical helpers, and hooks
│   └── styles/           # Global CSS, theme variables, and Tailwind directives
├── public/               # Static assets (images, icons, fonts)
├── astro.config.mjs      # Astro configuration and integrations
├── tailwind.config.mjs   # Tailwind theme, colors, and plugin configuration
└── package.json          # Project dependencies and npm scripts
```

<br />

## 🌐 Deployment

This project is configured for continuous deployment on modern edge platforms like **Netlify**, **Vercel**, or **GitHub Pages**.

To deploy manually:
1. Run `npm run build` to generate the `dist/` directory.
2. Publish the `dist/` folder to your preferred static hosting provider.
3. *Note: If using GitHub Pages, ensure your repository settings point to the correct output folder or use a GitHub Action workflow for Astro.*

<br />

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

Please ensure your code adheres to the existing styling conventions and runs without build errors.

<br />

## 📝 License

Distributed under the **MIT License**. See the `LICENSE` file for more information.

---

<div align="center">
  <p><i>Designed by Students, For Students. 🎓</i></p>
  <p>If you found this project helpful, please consider giving it a ⭐ on GitHub!</p>
</div>
