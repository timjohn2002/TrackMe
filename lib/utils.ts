import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a readable format
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date string to a short format
 */
export function formatDateShort(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get the current environment
 */
export function getEnvironment(): string {
  return process.env.NODE_ENV || 'development';
}

/**
 * Check if the current environment is production
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

/**
 * Check if the current environment is development
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

