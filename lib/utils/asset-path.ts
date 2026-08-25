/**
 * Resolves static asset paths taking into account Next.js basePath in production (GitHub Pages)
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim();
  const basePath = rawBasePath !== '' ? rawBasePath : (process.env.NODE_ENV === 'production' ? '/RoboAtlas' : '');

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Avoid duplicate basePath prefixing
  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }

  return `${basePath}${cleanPath}`;
}
