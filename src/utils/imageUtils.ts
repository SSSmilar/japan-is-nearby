export const getImagePath = (path: string): string => {
  // If the path is already a full URL, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If it's a relative path, prepend the base URL in production
  const base = import.meta.env.PROD ? '/japan-is-nearby' : '';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}; 