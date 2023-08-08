// auth.js (authentication service)
export function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

export function setAuthUser(user) {
  localStorage.setItem('authUser', user);
}
export function setLocale(locale) {
  localStorage.setItem('authUserLocale', locale);
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export function getAuthUser() {
  return localStorage.getItem('authUser');
}

export function getLocale() {
  return localStorage.getItem('authUserLocale');
}

export function removeAuthToken() {
  localStorage.removeItem('authToken');
}

export function removeAuthUser() {
  localStorage.removeItem('authUser');
}

export function removeLocale() {
  localStorage.removeItem('authUserLocale');
}
