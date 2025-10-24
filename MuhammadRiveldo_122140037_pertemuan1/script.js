// === Inisialisasi Data ===
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const form = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const course = document.getElementById("course");
const deadline = document.getElementById("deadline");
const errorMsg = document.getElementById("errorMsg");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");
const filterStatus = document.getElementById("filterStatus");
const countInfo = document.getElementById("countInfo");

// === Fungsi Simpan dan Muat ===
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// === Render Data ===
function renderTasks() {
  taskList.innerHTML = "";

  let filter = filterStatus.value;
  let search = searchTask.value.toLowerCase();

  let filteredTasks = tasks.filter(t => {
    let matchFilter = (filter === "all") ||
                      (filter === "pending" && !t.done) ||
                      (filter === "done" && t.done);
    let matchSearch = t.name.toLowerCase().includes(search) || 
                      t.course.toLowerCase().includes(search);
    return matchFilter && matchSearch;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<p style='text-align:center; color:#888;'>Tidak ada tugas yang cocok.</p>";
  } else {
    filteredTasks.forEach((task, i) => {
      const div = document.createElement("div");
      div.className = "task-card" + (task.done ? " done" : "");
      div.innerHTML = `
        <div class="task-info">
          <strong>${task.name}</strong> (${task.course})<br>
          Deadline: ${task.deadline}
        </div>
        <div class="task-actions">
          <button class="btn-done" onclick="toggleDone(${i})">${task.done ? "Batalkan" : "Selesai"}</button>
          <button class="btn-edit" onclick="editTask(${i})">Edit</button>
          <button class="btn-delete" onclick="deleteTask(${i})">Hapus</button>
        </div>
      `;
      taskList.appendChild(div);
    });
  }

  updateStats();
}

// === Statistik ===
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;
  countInfo.textContent = `Total: ${total} | Belum selesai: ${pending} | Selesai: ${done}`;
}

// === Tambah Tugas ===
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = taskName.value.trim();
  const matkul = course.value.trim();
  const date = deadline.value;

  if (!name || !matkul || !date) {
    errorMsg.textContent = "Semua field harus diisi!";
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  if (date < today) {
    errorMsg.textContent = "Deadline tidak boleh di masa lalu!";
    return;
  }

  errorMsg.textContent = "";

  tasks.push({ name, course: matkul, deadline: date, done: false });
  saveTasks();
  renderTasks();
  form.reset();
});

// === Edit Tugas ===
function editTask(index) {
  const t = tasks[index];
  const newName = prompt("Edit nama tugas:", t.name);
  const newCourse = prompt("Edit mata kuliah:", t.course);
  const newDeadline = prompt("Edit deadline (YYYY-MM-DD):", t.deadline);

  if (!newName || !newCourse || !newDeadline) {
    alert("Semua field wajib diisi!");
    return;
  }

  tasks[index] = { ...t, name: newName, course: newCourse, deadline: newDeadline };
  saveTasks();
  renderTasks();
}

// === Toggle Selesai ===
function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// === Hapus Tugas ===
function deleteTask(index) {
  if (confirm("Yakin ingin menghapus tugas ini?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// === Event Filter dan Search ===
filterStatus.addEventListener("change", renderTasks);
searchTask.addEventListener("input", renderTasks);

// === Jalankan Pertama Kali ===
renderTasks();
