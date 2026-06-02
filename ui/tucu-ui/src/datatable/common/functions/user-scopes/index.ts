let userScopes: string[] = [];

export function setScopes(scopes: string[]) {
  userScopes = scopes;
}

export function getScopes() {
  return userScopes;
}

export function validateScopes(requiredScopes?: string[] | string): boolean {
  if (!requiredScopes) return true;
  if (typeof requiredScopes === 'string') {
    return userScopes.includes(requiredScopes);
  }
  return requiredScopes.every((r) => userScopes.includes(r));
}
