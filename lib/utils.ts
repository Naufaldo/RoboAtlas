import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the base path configured for deployment (e.g. on GitHub Pages)
 */
export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

/**
 * Resolves a public asset or internal path with proper basePath prefix
 */
export function withBasePath(path: string): string {
  const base = getBasePath();
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  return `${base}${path}`;
}
