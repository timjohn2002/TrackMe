import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'Next.js Starter' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A clean, production-ready Next.js starter template" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-semibold text-gray-900">
                {process.env.NEXT_PUBLIC_APP_NAME || 'Next.js Starter'}
              </h1>
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Home
                </a>
                <a href="/api/health" className="text-gray-500 hover:text-gray-900 transition-colors">
                  API Health
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Next.js Starter. Built with Next.js, TypeScript, and Tailwind CSS.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
