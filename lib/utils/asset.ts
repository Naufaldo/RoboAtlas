export function getAssetPath(path: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim();
  const basePath = rawBasePath !== '' ? rawBasePath : (isProd ? '/RoboAtlas' : '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
