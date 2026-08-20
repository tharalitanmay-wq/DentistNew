export const getApiUrl = (path: string = ''): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  let baseUrl = '';

  if (envUrl) {
    baseUrl = envUrl.replace(/\/+$/, '');
  } else if (typeof window !== 'undefined') {
    // Automatically use the server hostname (e.g., http://13.205.137.98:5000)
    baseUrl = `${window.location.protocol}//${window.location.hostname}:5000`;
  } else {
    baseUrl = 'http://localhost:5000';
  }

  if (!path) return baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
