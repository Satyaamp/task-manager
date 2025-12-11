/* ==============================
   BASE URL (CHANGE IF NEEDED)
============================== */
const BASE_URL = "http://localhost:5000/api";  
// Change this to your deployed backend URL when hosting.


/* ==============================
   MAIN FETCH WRAPPER
============================== */
async function apiFetch(path, options = {}) {
  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";

  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(BASE_URL + path, {
    ...options,
    headers,
  });

  const text = await response.text(); 
  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw {
      status: response.status,
      message: (data && data.message) || "Request failed",
    };
  }

  return data;
}


/* ==============================
   SHORTCUT FUNCTIONS
============================== */
function get(path) {
  return apiFetch(path, { method: "GET" });
}

function post(path, body) {
  return apiFetch(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

function put(path, body) {
  return apiFetch(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

function del(path) {
  return apiFetch(path, {
    method: "DELETE",
  });
}
