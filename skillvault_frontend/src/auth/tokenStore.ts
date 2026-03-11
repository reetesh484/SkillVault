let accessTokenRef: string | null = null;
let onUnauthorized: (() => void) | null = null;
let onTokenUpdated: ((token: string | null) => void) | null = null;
let refreshPromise: Promise<string | null> | null = null;

export function registerUnauthorizedHandler(fn: () => void) {
  onUnauthorized = fn;
}

export function registerTokenUpdatedHandler(
  fn: (token: string | null) => void,
) {
  onTokenUpdated = fn;
}

export function triggerUnauthorized() {
  onUnauthorized?.();
}

export function setGlobalAccessToken(token: string | null) {
  accessTokenRef = token;
  // Token stored in memory only (XSS safe, HttpOnly cookie handles persistence)
  onTokenUpdated?.(token);
}

export function getGlobalAccessToken() {
  return accessTokenRef;
}
