'use strict';

class Dashboard {
  constructor() {
    // Ambil data dari localStorage atau inisialisasi array kosong
    this.schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
  }

  // localStorage
  saveData = () => {
    localStorage.setItem('schedules', JSON.stringify(this.schedules));
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('notes', JSON.stringify(this.notes));
  };

  // jadwal kuliah
  addSchedule = (course, day, startTime, endTime) => {
    const id = Date.now();
    const newSchedule = { id, course, day, startTime, endTime };
    this.schedules.push(newSchedule);
    this.saveData();
    this.renderSchedules();
  };

  deleteSchedule = (id) => {
    this.schedules = this.schedules.filter(item => item.id !== id);
    this.saveData();
    this.renderSchedules();
  };

  editSchedule = (id) => {
    const item = this.schedules.find(s => s.id === id);
    if (!item) return;
    // mengisi ulang untuk data yang diedit
    document.getElementById('scheduleCourse').value = item.course;
    document.getElementById('scheduleDay').value = item.day;
    document.getElementById('scheduleStart').value = item.startTime;
    document.getElementById('scheduleEnd').value = item.endTime;
    // Hapus data lama
    this.deleteSchedule(id);
  };

  renderSchedules = () => {
    const tbody = document.getElementById('scheduleTableBody');
    tbody.innerHTML = this.schedules.map(item => `
      <tr>
        <td>${item.course}</td>
        <td>${item.day}</td>
        <td>${item.startTime} - ${item.endTime}</td>
        <td>
          <div class="actions">
            <button class="btn-delete" onclick="dashboard.deleteSchedule(${item.id})">Delete</button>
            <button class="btn-edit" onclick="dashboard.editSchedule(${item.id})">Edit</button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  // tugas
  addTask = (taskName, deadline) => {
    const id = Date.now();
    const newTask = { id, taskName, deadline };
    this.tasks.push(newTask);
    this.saveData();
    this.renderTasks();
    this.checkDeadline();
  };

  deleteTask = (id) => {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveData();
    this.renderTasks();
  };

  editTask = (id) => {
    const item = this.tasks.find(t => t.id === id);
    if (!item) return;
    // mengisi ulang untuk data yang diedit
    document.getElementById('taskName').value = item.taskName;
    document.getElementById('taskDeadline').value = item.deadline;
    // Hapus data lama
    this.deleteTask(id);
  };

  renderTasks = () => {
    const tbody = document.getElementById('taskTableBody');
    tbody.innerHTML = this.tasks.map(item => `
      <tr>
        <td>${item.taskName}</td>
        <td>${item.deadline}</td>
        <td>
          <div class="actions">
            <button class="btn-delete" onclick="dashboard.deleteTask(${item.id})">Delete</button>
            <button class="btn-edit" onclick="dashboard.editTask(${item.id})">Edit</button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  // Filter Tugas
  filterTasks = (searchText) => {
    const filtered = this.tasks.filter(item =>
      item.taskName.toLowerCase().includes(searchText.toLowerCase())
    );
    const tbody = document.getElementById('taskTableBody');
    tbody.innerHTML = filtered.map(item => `
      <tr>
        <td>${item.taskName}</td>
        <td>${item.deadline}</td>
        <td>
          <div class="actions">
            <button class="btn-delete" onclick="dashboard.deleteTask(${item.id})">Delete</button>
            <button class="btn-edit" onclick="dashboard.editTask(${item.id})">Edit</button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  // Notifikasi deadline hari ini
  checkDeadline = () => {
    const today = new Date().toISOString().split('T')[0];
    this.tasks.forEach(item => {
      if (item.deadline === today) {
        alert(`Tugas "${item.taskName}" memiliki deadline hari ini!`);
      }
    });
  };

  // catatan 
  addNote = (noteText) => {
    const id = Date.now();
    const newNote = { id, noteText };
    this.notes.push(newNote);
    this.saveData();
    this.renderNotes();
  };

  deleteNote = (id) => {
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveData();
    this.renderNotes();
  };

  editNote = (id) => {
    const item = this.notes.find(n => n.id === id);
    if (!item) return;
    // mengisi ulang untuk data yang diedit
    document.getElementById('noteText').value = item.noteText;
    // Hapus data lama
    this.deleteNote(id);
  };

  renderNotes = () => {
    const tbody = document.getElementById('noteTableBody');
    tbody.innerHTML = this.notes.map(item => `
      <tr>
        <td>${item.noteText}</td>
        <td>
          <div class="actions">
            <button class="btn-delete" onclick="dashboard.deleteNote(${item.id})">Delete</button>
            <button class="btn-edit" onclick="dashboard.editNote(${item.id})">Edit</button>
          </div>
        </td>
      </tr>
    `).join('');
  };

  //Cuaca. terdapat ASYNC / AWAIT
 
  fetchWeather = async (region) => {
    const weatherDiv = document.getElementById('weather');
    try {
      // Contoh saja. Ganti URL dengan API cuaca yang valid bila diperlukan.
      const response = await fetch(`https://api.example.com/weather?city=${region}`);
      const data = await response.json().catch(() => ({ description: "Cerah", temperature: 30 }));
      weatherDiv.innerHTML = `<p>${region}: ${data.description} | Suhu: ${data.temperature}°C</p>`;
    } catch (error) {
      weatherDiv.innerHTML = `<p>${region}: Cerah | Suhu: 30°C</p>`;
    }
  };

  // Render waktu real-time
  renderTime = () => {
    const timeDiv = document.getElementById('time');
    const now = new Date();
    timeDiv.innerHTML = `<p>Waktu sekarang: ${now.toLocaleTimeString()}</p>`;
  };

  init = () => {
    this.renderSchedules();
    this.renderTasks();
    this.renderNotes();
    setInterval(this.renderTime, 1000);
  };
}

// Inisialisasi
const dashboard = new Dashboard();
dashboard.init();

// Jadwal Kuliah
const btnAddSchedule = document.getElementById('btnAddSchedule');
btnAddSchedule.addEventListener('click', () => {
  const course = document.getElementById('scheduleCourse').value.trim();
  const day = document.getElementById('scheduleDay').value;
  const startTime = document.getElementById('scheduleStart').value;
  const endTime = document.getElementById('scheduleEnd').value;
  
  if (!course || !day || !startTime || !endTime) {
    alert('Harap isi semua field Jadwal Kuliah.');
    return;
  }
  
  dashboard.addSchedule(course, day, startTime, endTime);
  // Reset
  document.getElementById('scheduleCourse').value = '';
  document.getElementById('scheduleDay').value = '';
  document.getElementById('scheduleStart').value = '';
  document.getElementById('scheduleEnd').value = '';
});

// Tugas
const btnAddTask = document.getElementById('btnAddTask');
btnAddTask.addEventListener('click', () => {
  const taskName = document.getElementById('taskName').value.trim();
  const deadline = document.getElementById('taskDeadline').value;
  if (!taskName || !deadline) {
    alert('Harap isi semua field Tugas.');
    return;
  }
  dashboard.addTask(taskName, deadline);
  // Reset
  document.getElementById('taskName').value = '';
  document.getElementById('taskDeadline').value = '';
});

// Filter Tugas
const taskFilter = document.getElementById('task-filter');
taskFilter.addEventListener('input', (e) => {
  const text = e.target.value;
  dashboard.filterTasks(text);
});

// Catatan
const btnAddNote = document.getElementById('btnAddNote');
btnAddNote.addEventListener('click', () => {
  const noteText = document.getElementById('noteText').value.trim();
  if (!noteText) {
    alert('Catatan tidak boleh kosong.');
    return;
  }
  dashboard.addNote(noteText);
  // Reset
  document.getElementById('noteText').value = '';
});

// Cuaca
const weatherForm = document.getElementById('weatherForm');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const region = document.getElementById('weatherRegion').value.trim();
  if (!region) {
    alert('Mohon masukkan nama daerah!');
    return;
  }
  dashboard.fetchWeather(region);
  document.getElementById('weatherRegion').value = '';
});

/* ========== TOGGLE THEME ========== */
const toggleTheme = document.getElementById('toggleTheme');
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
