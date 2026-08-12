# Tucu UI Demo Application

A comprehensive demo application showcasing the [Tucu UI](https://github.com/e-burgos/tucu-ui) component library. This application demonstrates all components, features, design system, form system, and Tailwind CSS utilities available in the library.

## 🌐 Live Demo

- **Production**: [https://ui.estebanburgos.com.ar/](https://ui.estebanburgos.com.ar/)

## ✨ Features

### 📚 Complete Documentation

- **Introduction**: Overview and getting started guide
- **Design System**: Layout system and theming guide
- **Components**: UI components, input components, and blockchain components
- **Form System**: Form examples and code patterns
- **Features**: Icons system, accessibility, hooks, and routing
- **Tailwind Utilities**: Complete Tailwind CSS v4 utilities documentation

### 🎨 Design System

- Layout system with multiple layout options
- Advanced theming guide with 34+ color presets
- Multi-layered color architecture
- Dark/light mode support

### 🧩 Components Showcase

- **UI Components**: 43+ components including buttons, cards, dialogs, notifications, and more
- **Input Components**: 11+ form input components with comprehensive examples
- **Blockchain Components**: 9+ specialized components for DeFi and Web3 applications

### 📝 Form System

- React Hook Form integration
- Comprehensive validation examples
- Live demo forms
- Code examples and best practices

### 🚀 Advanced Features

- **Icons System**: 5000+ icons integration
- **Accessibility**: WCAG 2.1 AA compliance
- **Hooks Utilities**: Custom React hooks
- **Routing System**: Standalone and MFE support

### 🎯 SEO & Analytics

- **SEO Optimized**: Dynamic meta tags, Open Graph, Twitter Cards
- **Sitemap**: Automatically generated sitemap.xml
- **Google Analytics**: Page view tracking for SPA navigation
- **Structured Data**: JSON-LD schema markup

## 🛠️ Tech Stack

- **React 19+**: Modern React with hooks
- **TypeScript**: Full type safety
- **Vite**: Fast build tool and dev server
- **Tucu UI**: Component library and design system
- **React Router**: Client-side routing

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Or using npm
npm install
```

## 🚀 Development

```bash
# Start development server
pnpm dev

# Or using npm
npm run dev
```

The application will be available at `http://localhost:4200` (or the port specified in `VITE_APP_PORT`).

## 🏗️ Build

```bash
# Build for production
pnpm build

# Or using npm
npm run build
```

The build output will be in the `dist/` directory.

### Build Features

- **Sitemap Generation**: Automatically generates `sitemap.xml` during build
- **Source Maps**: Enabled for debugging
- **Code Splitting**: Optimized chunking for performance
- **Minification**: Production-ready minified output

## 📁 Project Structure

```
apps/demo/
├── public/
│   ├── robots.txt          # SEO crawler configuration
│   ├── _redirects          # Netlify redirects for SPA
│   └── favicon.svg         # App favicon
├── src/
│   ├── components/
│   │   └── right-button.tsx    # Header right button with SEO/GA hooks
│   ├── hooks/
│   │   ├── useSEO.ts           # SEO meta tags hook
│   │   └── useGoogleAnalytics.ts # Google Analytics tracking hook
│   ├── router/
│   │   └── menuItems.tsx       # Route configuration
│   ├── utils/
│   │   ├── seo.ts              # SEO utilities and constants
│   │   └── generateSitemap.ts  # Sitemap generation logic
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Application entry point
├── index.html                  # HTML template with SEO meta tags
├── vite.config.ts              # Vite configuration
├── vite.config.sitemap.ts      # Sitemap generation plugin
└── SEO.md                      # SEO configuration guide
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application
VITE_APP_PORT=4200
VITE_APP_URL=https://ui.estebanburgos.com.ar

# Google Analytics
VITE_GOOGLE_ANALYTICS_TAG_ID=G-XXXXXXXXXX
```

### SEO Configuration

The application includes comprehensive SEO features:

- **Dynamic Meta Tags**: Automatically updated per route
- **Open Graph Tags**: For social media sharing
- **Twitter Cards**: Optimized Twitter sharing
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Auto-generated during build
- **Robots.txt**: Search engine crawler configuration

See [SEO.md](./SEO.md) for detailed SEO configuration guide.

## 📊 Google Analytics

Google Analytics is integrated and automatically tracks:

- Page views on route changes (SPA navigation)
- Page paths and titles
- User interactions

Configure your Google Analytics Measurement ID in the `.env` file.

## 🧪 Scripts

```bash
# Development
pnpm dev              # Start dev server

# Build
pnpm build            # Build for production

# Lint
pnpm lint             # Run ESLint

# Preview
pnpm preview          # Preview production build
```

## 🎯 Key Routes

- `/` - Introduction and getting started
- `/design-system` - Design system documentation
- `/components` - Component showcase
- `/form-system` - Form system examples
- `/features` - Advanced features
- `/tailwind-utilities` - Tailwind CSS utilities

## 📚 Documentation

- **SEO Guide**: [SEO.md](./SEO.md) - Complete SEO configuration guide
- **Tucu UI Docs**: [Main README](../../README.md) - Component library documentation
- **GitHub**: [https://github.com/e-burgos/tucu-ui](https://github.com/e-burgos/tucu-ui)

## 🔧 Customization

### Adding New Routes

Edit `src/router/menuItems.tsx` to add new routes:

```tsx
{
  name: 'My New Page',
  path: '/my-new-page',
  icon: <LucideIcons.Star />,
  component: <MyNewPage />,
}
```

### Custom SEO per Page

Use the `useSEO` hook in your page components:

```tsx
import { useSEO } from '../hooks/useSEO';

export function MyPage() {
  useSEO({
    title: 'My Custom Page',
    description: 'Custom page description',
    keywords: ['custom', 'keywords'],
  });

  return <div>My page content</div>;
}
```

## 🚀 Deployment

The application is deployed to Cloudflare Pages at [https://ui.estebanburgos.com.ar](https://ui.estebanburgos.com.ar) with:

- SPA redirects (`_redirects` file, natively supported by Cloudflare Pages)
- Automatic sitemap generation
- Environment variable support

### Cloudflare Pages Configuration

Deployment runs via CI on every push to `main` that touches `apps/demo/**` or `ui/tucu-docs/**` (see `.github/workflows/deploy-demo.yml`). The workflow builds with `pnpm nx build demo` and publishes `apps/demo/dist` using `wrangler pages deploy`. Required repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`. DNS (`ui` CNAME) is managed at Hostinger.

## 📝 License

This demo application is part of the Tucu UI project. See the main [LICENSE](../../LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please see the main [CONTRIBUTING](../../CONTRIBUTING.md) guide.

## 📞 Support

- **GitHub Issues**: [https://github.com/e-burgos/tucu-ui/issues](https://github.com/e-burgos/tucu-ui/issues)
- **Documentation**: [https://ui.estebanburgos.com.ar/](https://ui.estebanburgos.com.ar/)

---

Built with ❤️ using [Tucu UI](https://github.com/e-burgos/tucu-ui)
