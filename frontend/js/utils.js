/* ==============================
   TOKEN HANDLING
============================== */
const TOKEN_KEY = "tm_token";

function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/* ==============================
   AUTH GUARD
============================== */
function ensureAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = "index.html";
  }
}

/* ==============================
   LOGOUT
============================== */
function logout() {
  removeToken();
  window.location.href = "index.html";
}

/* ==============================
   ERROR HELPERS
============================== */
function showError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;

  el.textContent = msg;
  el.style.display = "block";
}

function hideError(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.style.display = "none";
}

/* ==============================
   ESCAPE HTML (XSS PROTECTION)
============================== */
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"]/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  }[m]));
}

/* ==============================
   REGISTER SERVICE WORKER (PWA)
============================== */
function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
      .catch(() => {});
  }
}
