let accessTokenRef: string | null = null;
let onUnauthorized: (() => void) | null = null;

export function registerUnauthorizedHandler(fn: () => void) {
  onUnauthorized = fn;
}

export function triggerUnauthorized() {
  onUnauthorized?.();
}

export function setGlobalAccessToken(token: string | null) {
  accessTokenRef = token;
}

export function getGlobalAccessToken() {
  return accessTokenRef;
}
