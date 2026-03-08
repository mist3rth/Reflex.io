export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Si le chemin est déjà absolu ou commence déjà par le basePath, on ne le change pas
  if (path.startsWith('http') || (basePath && path.startsWith(basePath))) {
    return path;
  }
  
  // S'assurer que le chemin commence par /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${basePath}${normalizedPath}`;
}
