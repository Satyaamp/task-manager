/* ==============================
   DASHBOARD STATS
============================== */
async function loadStats() {
  try {
    const tasks = await get("/tasks");

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "completed").length;
    const pending = tasks.filter(t => t.status === "pending").length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
  } catch (err) {
    console.error("Stats Error:", err);
  }
}


/* ==============================
   LOAD ALL TASKS
============================== */
async function loadTasks() {
  const container = document.getElementById("tasksContainer");
  container.innerHTML = "<p class='muted'>Loading...</p>";

  try {
    const tasks = await get("/tasks");

    if (!tasks.length) {
      container.innerHTML = "<p class='muted'>No tasks found.</p>";
      return;
    }

    container.innerHTML = "";

    tasks.forEach(task => {
      const card = document.createElement("div");
      card.className = "task-card glass";

      card.innerHTML = `
        <div class="task-meta">
          <strong>${escapeHtml(task.title)}</strong>
          <div class="card-actions">
            <span class="badge ${task.priority}">${task.priority}</span>
            <a href="edit-task.html?id=${task._id}" class="btn small-btn">Edit</a>
            <button class="btn danger small-btn" data-id="${task._id}">Delete</button>
          </div>
        </div>
        <p class="small">${escapeHtml(task.description || "")}</p>
        <div class="muted-small">
          Due: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
        </div>
      `;

      container.appendChild(card);
    });

    // Attach delete events
    container.querySelectorAll("button[data-id]").forEach(btn => {
      btn.onclick = () => openDeleteModal(btn.getAttribute("data-id"));
    });

  } catch (err) {
    container.innerHTML = `<p class="error">${err.message}</p>`;
  }
}


/* ==============================
   CREATE TASK
============================== */
async function createTaskFromForm() {
  hideError("addTaskError");

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value || null;

  if (!title) {
    showError("addTaskError", "Title is required");
    return;
  }

  try {
    await post("/tasks", {
      title,
      description,
      priority,
      dueDate
    });

    window.location.href = "tasks.html";
  } catch (err) {
    showError("addTaskError", err.message || "Failed to create task");
  }
}


/* ==============================
   LOAD TASK INTO EDIT PAGE
============================== */
async function loadTaskToEdit() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    window.location.href = "tasks.html";
    return;
  }

  try {
    const task = await get("/tasks/" + id);

    document.getElementById("taskId").value = task._id;
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description || "";
    document.getElementById("priority").value = task.priority;
    document.getElementById("status").value = task.status;
    if (task.dueDate) {
      document.getElementById("dueDate").value = task.dueDate.split("T")[0];
    }

  } catch (err) {
    showError("editTaskError", err.message || "Failed to load task");
  }
}


/* ==============================
   UPDATE TASK
============================== */
async function submitTaskEditForm() {
  hideError("editTaskError");

  const id = document.getElementById("taskId").value;
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value;
  const status = document.getElementById("status").value;
  const dueDate = document.getElementById("dueDate").value || null;

  if (!title) {
    showError("editTaskError", "Title is required");
    return;
  }

  try {
    await put("/tasks/" + id, {
      title,
      description,
      priority,
      status,
      dueDate
    });

    window.location.href = "tasks.html";
  } catch (err) {
    showError("editTaskError", err.message || "Failed to update task");
  }
}


/* ==============================
   DELETE TASK (with confirmation modal)
============================== */
let toDeleteId = null;

function openDeleteModal(id) {
  toDeleteId = id;
  const modal = document.getElementById("deleteModal");
  modal.setAttribute("aria-hidden", "false");

  document.getElementById("confirmDeleteBtn").onclick = confirmDelete;
  document.getElementById("cancelDeleteBtn").onclick = () =>
    modal.setAttribute("aria-hidden", "true");
}

async function confirmDelete() {
  try {
    await del("/tasks/" + toDeleteId);
    document.getElementById("deleteModal").setAttribute("aria-hidden", "true");
    loadTasks(); // refresh list
  } catch (err) {
    alert(err.message || "Failed to delete task");
  }
}
