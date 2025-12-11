/* ==============================
   REGISTER USER
============================== */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError("registerError");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    try {
      const res = await post("/auth/register", { name, email, password });
      saveToken(res.token);
      window.location.href = "dashboard.html";
    } catch (err) {
      showError("registerError", err.message || "Registration failed");
    }
  });
}


/* ==============================
   LOGIN USER
============================== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError("loginError");

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    try {
      const res = await post("/auth/login", { email, password });
      saveToken(res.token);
      window.location.href = "dashboard.html";
    } catch (err) {
      showError("loginError", err.message || "Login failed");
    }
  });
}
