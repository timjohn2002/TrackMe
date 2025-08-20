import React from 'react';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Home - Next.js Starter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Next.js Starter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A clean, production-ready Next.js template with TypeScript and Tailwind CSS.
            Perfect for building modern web applications.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Hello World
          </h2>
          <p className="text-gray-600 mb-6">
            This is your main content section. You can replace this with your actual application content.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">
              Get Started
            </button>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-primary-600 text-2xl mb-2">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Development</h3>
            <p className="text-gray-600 text-sm">
              Hot reloading and fast refresh for rapid development.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-primary-600 text-2xl mb-2">🔒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Type Safe</h3>
            <p className="text-gray-600 text-sm">
              Full TypeScript support for better development experience.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-primary-600 text-2xl mb-2">🎨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Beautiful UI</h3>
            <p className="text-gray-600 text-sm">
              Tailwind CSS for modern, responsive design.
            </p>
          </div>
        </div>

        {/* API Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Status</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">API is running</span>
            </div>
            <a 
              href="/api/health" 
              className="text-primary-600 hover:text-primary-700 text-sm underline"
            >
              Check API Health
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
