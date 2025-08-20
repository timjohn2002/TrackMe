# Next.js Starter

A clean, production-ready Next.js starter template with TypeScript and Tailwind CSS.

## Features

- ⚡ **Next.js 14** with App Router
- 🔒 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 📱 **Responsive design** for all devices
- 🚀 **Production ready** configuration
- 🔧 **Easy to extend** and customize

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
nextjs-starter/
├── components/          # Reusable React components
│   └── Layout.tsx     # Main layout component
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   │   └── health.ts  # Health check endpoint
│   └── index.tsx      # Home page
├── public/             # Static assets
├── styles/             # Global styles
│   └── globals.css    # Tailwind CSS and custom styles
├── lib/                # Utility functions and configurations
├── .env.local          # Environment variables (create from env.example)
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

Create a `.env.local` file based on `env.example`:

```bash
# App Configuration
NEXT_PUBLIC_APP_NAME=Next.js Starter

# API Configuration
API_KEY=your_api_key_here

# Environment
NODE_ENV=development
```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns: `{ status: "ok", timestamp: "...", environment: "..." }`

## Customization

### Adding New Pages
1. Create a new file in `pages/` directory
2. Export a default React component
3. Use the `Layout` component for consistent styling

### Adding New API Routes
1. Create a new file in `pages/api/` directory
2. Export a default function handler
3. Use Next.js API types for request/response

### Styling
- Use Tailwind CSS utility classes
- Custom styles in `styles/globals.css`
- Component-specific styles with CSS modules if needed

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
1. Run `npm run build`
2. Deploy the `.next` folder to your hosting platform
3. Set environment variables in your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
