// Generate a unique user ID
export function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Get or create user ID from localStorage
export function getUserId(): string {
  if (typeof window === 'undefined') return '';
  
  const existing = localStorage.getItem('user-id');
  if (existing) return existing;
  
  const newId = generateUserId();
  localStorage.setItem('user-id', newId);
  return newId;
}

// Set a specific user ID (for viewing shared links)
export function setUserId(userId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user-id', userId);
}

// Check if current view is read-only (viewing someone else's data)
export function isReadOnlyMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('read-only-mode') === 'true';
}

// Set read-only mode
export function setReadOnlyMode(readOnly: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('read-only-mode', readOnly.toString());
}

// Clear read-only mode and return to own data
export function exitReadOnlyMode(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('read-only-mode');
  const ownId = localStorage.getItem('own-user-id');
  if (ownId) {
    localStorage.setItem('user-id', ownId);
  }
}

// Store own user ID before entering read-only mode
export function storeOwnUserId(): void {
  if (typeof window === 'undefined') return;
  const currentId = getUserId();
  localStorage.setItem('own-user-id', currentId);
}
