// auth.js (authentication service)
export function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

export function setAuthUser(user) {
  localStorage.setItem('authUser', user);
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}

export function getAuthUser() {
  return localStorage.getItem('authUser');
}

export function removeAuthToken() {
  localStorage.removeItem('authToken');
}

export function removeAuthUser() {
  localStorage.removeItem('authUser');
}
