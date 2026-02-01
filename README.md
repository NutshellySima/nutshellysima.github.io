# Chijun Sima | Personal Website

[![Deploy to GitHub Pages](https://github.com/NutshellySima/nutshellysima.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/NutshellySima/nutshellysima.github.io/actions/workflows/deploy.yml)

A modern, performant personal website built with **Vite**, **TypeScript**, and **Tailwind CSS v4**.

**Live site:** [https://www.chijunsima.com](https://www.chijunsima.com)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Build Tool** | [Vite](https://vitejs.dev/) - Next generation frontend tooling |
| **Language** | [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework |
| **Icons** | [Lucide](https://lucide.dev/) - Beautiful & consistent icons |
| **PWA** | [Vite PWA Plugin](https://vite-pwa-org.netlify.app/) - Service worker & manifest |
| **Deployment** | [GitHub Pages](https://pages.github.com/) - Static site hosting |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) - Automated deployment |

---

## Features

- **Modern Build System**: Vite provides fast HMR, optimized builds, and tree-shaking
- **Type Safety**: Full TypeScript support for better maintainability
- **Component Architecture**: Modular, reusable components for maintainable code
- **Dark Mode**: Automatic theme detection with manual toggle
- **PWA Support**: Service worker for offline access, installable as an app
- **Performance Optimized**:
  - Code splitting and lazy loading
  - Optimized font loading with `font-display: swap`
  - Passive event listeners for scroll handlers
  - RequestAnimationFrame for smooth animations
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **SEO Ready**: Structured data (JSON-LD), Open Graph, Twitter Cards
- **Analytics**: Cloudflare Insights, Microsoft Clarity, Google Analytics 4

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommend using [nvm](https://github.com/nvm-sh/nvm))
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/NutshellySima/nutshellysima.github.io.git
cd nutshellysima.github.io

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

The site will be available at `http://localhost:5173/`

### Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch. See `.github/workflows/deploy.yml` for the CI/CD configuration.

To deploy manually:

```bash
# Build the site
npm run build

# Copy static assets to dist/
cp avatar.jpg cv.pdf favicon.svg CNAME robots.txt sitemap.xml 404.html dist/

# Deploy dist/ folder to GitHub Pages (via gh-pages branch or GitHub Actions)
```

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── src/
│   ├── components/             # UI components
│   │   ├── Header.ts
│   │   ├── Hero.ts
│   │   ├── Research.ts
│   │   ├── Work.ts
│   │   ├── Ekko.ts
│   │   ├── Publications.ts
│   │   ├── Service.ts
│   │   ├── Footer.ts
│   │   └── ScrollProgress.ts
│   ├── utils/                  # Utility functions
│   │   ├── storage.ts          # Safe localStorage wrapper
│   │   ├── theme.ts            # Dark mode management
│   │   └── animations.ts       # Scroll animations & effects
│   ├── app.ts                  # Main application class
│   ├── main.ts                 # Entry point
│   └── styles.css              # Global styles & Tailwind
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── avatar.jpg                  # Profile photo
├── cv.pdf                      # CV download
├── favicon.svg                 # Site favicon
├── CNAME                       # Custom domain config
├── robots.txt                  # SEO crawler instructions
├── sitemap.xml                 # SEO sitemap
└── 404.html                    # Custom error page
```

---

## Customization

### Content

All content is stored in the component files under `src/components/`. To edit:

1. Open the relevant component (e.g., `src/components/Research.ts`)
2. Modify the HTML string in the `render()` method
3. Save and the dev server will hot-reload

### Styling

- **Tailwind classes**: Use standard Tailwind utility classes in components
- **Custom CSS**: Add to `src/styles.css`
- **Theme colors**: Defined in `src/styles.css` using Tailwind v4's `@theme` directive

### Adding New Sections

1. Create a new component file in `src/components/`
2. Export a class with a static `render()` method
3. Import and add to `src/app.ts`

---

## Performance

- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: ~50KB gzipped (excluding images)

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+

---

## License

MIT License - see [LICENSE](LICENSE) file

---

## Credits

- Design inspired by modern portfolio trends
- Icons by [Lucide](https://lucide.dev/)
- Fonts: Inter, Space Grotesk, JetBrains Mono via Google Fonts
