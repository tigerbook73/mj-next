# MJ Next

A modern, full-stack Next.js application built with the latest web technologies and best practices.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router and Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Component Library**: Custom components with [shadcn/ui](https://ui.shadcn.com/) patterns
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Styling Utilities**: 
  - [Class Variance Authority (CVA)](https://cva.style/docs) for component variants
  - [clsx](https://github.com/lukeed/clsx) and [tailwind-merge](https://github.com/dcastil/tailwind-merge) for conditional styling
- **Development Tools**:
  - [Storybook](https://storybook.js.org/) for component development and documentation
  - [Vitest](https://vitest.dev/) for testing with browser testing support
  - [Playwright](https://playwright.dev/) for end-to-end testing
  - [ESLint 9](https://eslint.org/) for code linting

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   └── ui/            # UI component library
│       └── button.tsx # Button component
├── lib/               # Utility functions
│   └── utils.ts       # Common utilities
└── stories/           # Storybook stories
    └── Button.stories.tsx
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mj-next
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Start the development server:
```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `yarn dev` - Start the development server with Turbopack
- `yarn build` - Build the application for production
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint for code linting
- `yarn storybook` - Start Storybook development server on port 6006
- `yarn build-storybook` - Build Storybook for production

## 🎨 Component Development

This project uses a modern component development workflow:

### Storybook
Components are documented and developed in isolation using Storybook. Start the Storybook server:

```bash
yarn storybook
```

Visit [http://localhost:6006](http://localhost:6006) to view the component library.

### UI Components
The project includes a comprehensive UI component library built with:
- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- **CVA** for variant management
- **TypeScript** for type safety

Example component usage:
```tsx
import { Button } from "@/components/ui/button"

<Button variant="outline" size="lg">
  Click me
</Button>
```

## 🧪 Testing

The project is set up with modern testing tools:

- **Vitest** for unit and integration tests
- **Playwright** for end-to-end tests
- **@vitest/browser** for browser-based testing

## 🎯 Features

- ⚡ **Fast Development**: Turbopack for lightning-fast builds
- 🎨 **Modern UI**: Beautiful, accessible components with Radix UI
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🔧 **Type Safety**: Full TypeScript support
- 📖 **Component Documentation**: Comprehensive Storybook setup
- 🧪 **Testing Ready**: Vitest and Playwright configured
- 🔍 **Code Quality**: ESLint 9 with modern configuration
- 🚀 **Performance**: Optimized for production builds

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tigerbook73/mj-next)

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Storybook](https://storybook.js.org/docs) - Tool for building UI components in isolation

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
