/**
 * Generates a WebSocket URL based on the current window location and provided query parameters.
 * @param params An object containing query parameters to append to the URL.
 * @returns The constructed WebSocket URL string.
 */
export const getWsUrl = (params: Record<string, string | boolean | number | null | undefined>): string => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const url = new URL(`${protocol}//${window.location.host}`);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
};
