export function getToken() {
  return sessionStorage.getItem("admin_token");
}

export function setToken(toKen) {
  return sessionStorage.setItem("admin_token", toKen);
}
export function removeToken() {
  return sessionStorage.removeItem("admin_token");
}

export function setUserName(username) {
  return sessionStorage.setItem("userName", username);
}
export function getUserName(username) {
  return sessionStorage.getItem("userName", username);
}
export function removeUserName() {
  return sessionStorage.removeItem("userName");
}
