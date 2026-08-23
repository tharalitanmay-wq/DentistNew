export const getApiUrl = (path: string = ''): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  let baseUrl = '';

  if (envUrl) {
    baseUrl = envUrl.replace(/\/+$/, '');
  } else if (typeof window !== 'undefined') {
    // Relative path in browser so requests proxy over HTTPS to backend on port 5000
    baseUrl = '';
  } else {
    baseUrl = 'http://127.0.0.1:5000';
  }

  if (!path) return baseUrl || '/';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
