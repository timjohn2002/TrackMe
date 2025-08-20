# Whop App Setup Guide

## 🚀 Quick Start

This is a Whop app built with Next.js that includes authentication and basic functionality out of the box.

### What's Included

✅ **Authentication**: Uses the Whop SDK for seamless user authentication  
✅ **Environment Setup**: Ready-to-use `.env.local` file for your variables  
✅ **Modern UI**: Built with Tailwind CSS and beautiful components  
✅ **TypeScript**: Full type safety for better development experience  
✅ **API Routes**: Server-side API endpoints for secure operations  

### 📋 Prerequisites

1. **Whop Developer Account**: You need a Whop developer account
2. **Node.js**: Version 22+ (already installed)
3. **pnpm**: Package manager (already installed)

### 🔧 Setup Steps

#### 1. Create Your Whop App

1. Go to [Whop Developer Dashboard](https://whop.com/dashboard/developer/)
2. Create a new app
3. In the "Hosting" section, set:
   - **Base URL**: Your deployment domain (e.g., `https://your-app.vercel.app`)
   - **App path**: `/experiences/[experienceId]`
   - **Discover path**: `/discover`

#### 2. Configure Environment Variables

1. Open `.env.local` in this project
2. Replace the placeholder values with your actual Whop credentials:

```env
WHOP_API_KEY="your_actual_api_key_from_dashboard"
WHOP_WEBHOOK_SECRET="your_webhook_secret_after_creating_webhook"
NEXT_PUBLIC_WHOP_AGENT_USER_ID="your_agent_user_id"
NEXT_PUBLIC_WHOP_APP_ID="your_app_id_from_dashboard"
NEXT_PUBLIC_WHOP_COMPANY_ID="your_company_id"
```

#### 3. Install Your App

1. Go to a Whop you own or manage
2. Navigate to the "Tools" section
3. Add your app to the Whop

#### 4. Run the Development Server

```bash
pnpm dev
```

The app will start on `http://localhost:3000`

### 🏗️ Project Structure

```
app/
├── layout.tsx          # Main layout with WhopApp wrapper
├── page.tsx           # Landing page with setup instructions
├── discover/          # App discovery page
├── experiences/       # Dynamic experience pages
│   └── [experienceId]/
└── api/              # API routes
lib/
└── whop-sdk.ts       # Whop SDK configuration
```

### 🔐 Authentication

The app uses the `@whop/react` package which automatically handles:
- User authentication
- Session management
- Access control
- User context

### 🎨 Customization

#### Adding New Pages

1. Create a new folder in `app/` for your route
2. Add a `page.tsx` file
3. The page will automatically be protected by Whop authentication

#### Styling

- Uses Tailwind CSS for styling
- Custom CSS in `app/globals.css`
- Responsive design included

#### API Routes

- Server-side API routes in `app/api/`
- Secure access to Whop SDK
- Environment variables available

### 🚀 Deployment

1. Push your code to GitHub
2. Deploy to Vercel (recommended)
3. Add environment variables in Vercel dashboard
4. Update your Whop app's base URL

### 📚 Next Steps

- Customize the landing page in `app/page.tsx`
- Add your app's features in `app/experiences/[experienceId]/page.tsx`
- Create API routes in `app/api/`
- Style your app using Tailwind CSS

### 🆘 Need Help?

- [Whop Documentation](https://dev.whop.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Happy coding! 🎉**
