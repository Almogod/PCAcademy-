<div align="center">

# 🎓 PCAcademy

**The Zen of Data. An Interactive Educational Platform for Principal Component Analysis.**

[![Live Demo](https://img.shields.io/badge/Live_Site-View_Now-007AFF?style=for-the-badge&logo=vercel)](https://almogod.github.io/PCAcademy-/)
[![Framework](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#license)

</div>

---

<br />

## 🌟 Overview

**PCAcademy** is a modern, premium educational web platform designed specifically for students to master **Principal Component Analysis (PCA)**. 

In a world drowning in data, clarity is power. PCAcademy serves as a lens through which high-dimensional chaos can be structured and understood. By combining beautiful aesthetics, interactive visualizations, and rigorous mathematical breakdowns, we've created the ultimate ecosystem for learning dimensionality reduction.

<br />

## ✨ Core Services

We provide a comprehensive learning ecosystem built on four core pillars:

- 📖 **In-Depth Learning Modules:** Step-by-step conceptual guides, simplified mathematical derivations, and interactive proof explorations.
- 🧮 **Integrated PCA Calculators:** Powerful, transparent calculators for covariance matrices, eigenvalues, and full PCA transformations with custom dataset support.
- 📄 **Expert Cheat Sheets:** High-quality reference materials, key formula summaries, and condensed notes for quick academic review.
- 🌍 **Real-World Simulations:** Dynamic 3D point cloud projections, image compression demos, and interactive applications showing PCA across various industries.

<br />

## 🛠️ Technology Stack

Built with modern web technologies for unparalleled performance and a highly aesthetic user experience:

- **Framework:** [Astro](https://astro.build/) - For incredibly fast, content-driven static generation.
- **UI Components:** [React 18](https://react.dev/) & [Radix UI](https://www.radix-ui.com/) - For interactive, accessible, and robust components.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - For precise, scalable, and responsive utility-first styling.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) - For fluid, native-feeling micro-interactions and page transitions.
- **Visualizations:** [Three.js](https://threejs.org/) & [Recharts](https://recharts.org/) - For rendering complex data plots and 3D scenes.

<br />

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/almogod/PCAcademy-.git
   cd PCAcademy-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The site will be available at `http://localhost:4321` by default.*

<br />

## 📂 Project Structure

```text
PCAcademy-/
├── src/
│   ├── components/       # React & Astro UI components (Header, Footer, Calculators, etc.)
│   ├── entities/         # TypeScript interfaces and types
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and mock services
│   ├── pages/            # Astro routing (dynamic and static pages)
│   └── styles/           # Global CSS and Tailwind directives
├── public/               # Static assets (images, fonts, icons)
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind CSS theme and utility configuration
└── package.json          # Dependencies and build scripts
```

<br />

## 🌐 Deployment

This project is configured for deployment on **GitHub Pages**. 

To deploy updates, build the project and push to the main branch:
```bash
npm run build
```
*(Ensure your GitHub Actions are configured to deploy from the `dist/` directory, or use the `@astrojs/github-pages` integration).*

<br />

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br />

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

<br />

<div align="center">
  <p><i>"Reduce dimensionality. Maximize variance. Find clarity in the noise."</i></p>
  <p>Designed by Students, For Students. 🎓</p>
</div>
