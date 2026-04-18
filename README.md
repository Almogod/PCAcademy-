   # PCAcademy

PCAcademy is an educational web platform built with **Astro** and **React**, designed to deliver structured learning content with a fast, modern web experience.

🌐 **Live Site:** [https://almogod.github.io/PCAcademy-/](https://almogod.github.io/PCAcademy-/)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/almogod/PCAcademy-.git
   cd PCAcademy-
   ```

2. **Install dependencies:**
   ``bash
   npm install
   ``

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:4321` by default.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## Project Structure

```
PCAcademy-/
├── src/                    # Source files
│   ├── components/         # Reusable Astro & React components
│   ├── layouts/            # Page layout templates
│   └── pages/              # Site pages (each file = a route)
├── public/                 # Static assets (images, fonts, icons)
├── astro.config.mjs        # Astro configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Astro](https://astro.build/) | Static site framework |
| [React](https://react.dev/) | Interactive UI components |
| GitHub Pages | Hosting & deployment |

---

## Deployment

This project is deployed to **GitHub Pages**. To deploy updates:

```bash
npm run build
```

Then push to the `main` branch — GitHub Actions will handle the rest (if configured), or manually deploy the `dist/` folder to your GitHub Pages branch.

---

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is open source. See the [LICENSE](LICENSE) file for details.
