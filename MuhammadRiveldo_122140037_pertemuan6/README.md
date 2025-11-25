# Proyek API Matakuliah dengan Pyramid
**Nama:** Muhammad Riveldo Hermawan Putra \
**NIM:** 122140037 \
**Tugas Praktikum Ke 6**

## Deskripsi Proyek
Aplikasi ini adalah sebuah API sederhana untuk mengelola data matakuliah. Dibangun menggunakan framework Pyramid untuk Python, aplikasi ini menyediakan endpoint untuk operasi CRUD (Create, Read, Update, Delete) pada data matakuliah.

## Cara Instalasi

### 1. Membuat Virtual Environment
Pastikan Anda memiliki Python terinstal. Buat dan aktifkan virtual environment:
```bash
python -m venv env
source env/bin/activate  # Untuk Linux/macOS
# atau
env\Scripts\activate  # Untuk Windows
```

### 2. Instalasi Dependensi
Install semua dependensi yang dibutuhkan dari file `setup.py`:
```bash
pip install -e .
```

### 3. Konfigurasi Database
Aplikasi ini menggunakan SQLAlchemy dan Alembic untuk migrasi database. Konfigurasi database berada di file `development.ini`. Secara default, aplikasi ini menggunakan SQLite.

Pastikan file `pyramid_matakuliah.db` dapat dibuat di direktori proyek.

## Cara Menjalankan

### 1. Menjalankan Migrasi
Untuk membuat skema database, jalankan perintah migrasi Alembic:
```bash
alembic -c development.ini revision --autogenerate -m "init"
alembic -c development.ini upgrade head
```

### 2. Menjalankan Server
Jalankan server Pyramid dengan perintah berikut:
```bash
pserve development.ini --reload
```
Server akan berjalan di `http://localhost:6543`.

## API Endpoints

### 1. Get All Matakuliah
- **Endpoint:** `GET /api/matakuliah`
- **Deskripsi:** Mengambil semua data matakuliah.
- **Contoh Request:**
  ```bash
  curl -X GET http://localhost:6543/api/matakuliah
  ```
- **Contoh Response:**
  ```json
  {
    "matakuliahs": [
      {
        "id": 8,
        "kode_mk": "IF2025",
        "nama_mk": "Basis Data",
        "sks": 4,
        "semester": "5"
      },
      {
        "id": 12,
        "kode_mk": "IF2122",
        "nama_mk": "Jaringan Komputer",
        "sks": 3,
        "semester": "5"
      },
      {
        "id": 14,
        "kode_mk": "IF2024",
        "nama_mk": "Pengembangan Aplikasi Web",
        "sks": 4,
        "semester": "5"
      }
    ]
  }
  ```

### 2. Get Matakuliah by ID
- **Endpoint:** `GET /api/matakuliah/{id}`
- **Deskripsi:** Mengambil data matakuliah berdasarkan ID.
- **Contoh Request:**
  ```bash
  curl -X GET http://localhost:6543/api/matakuliah/12
  ```
- **Contoh Response:**
  ```json
  {
    "matakuliah": {
      "id": 12,
      "kode_mk": "IF2122",
      "nama_mk": "Jaringan Komputer",
      "sks": 3,
      "semester": "5"
    }
  }
  ```

### 3. Add Matakuliah
- **Endpoint:** `POST /api/matakuliah`
- **Deskripsi:** Menambahkan matakuliah baru.
- **Contoh Request:**
  ```bash
  curl -X POST http://localhost:6543/api/matakuliah \
       -H "Content-Type: application/json" \
       -d '{"kode_mk": "IF1022", "nama_mk": "Struktur Data", "sks": 3, "semester": 2}'
  ```
- **Contoh Response:**
  ```json
  {
    "success": true,
    "matakuliah": {
      "id": 16,
      "kode_mk": "IF1022",
      "nama_mk": "Struktur Data",
      "sks": 3,
      "semester": 2
    }
  }
  ```

### 4. Update Matakuliah
- **Endpoint:** `PUT /api/matakuliah/{id}`
- **Deskripsi:** Memperbarui data matakuliah berdasarkan ID.
- **Contoh Request:**
  ```bash
  curl -X PUT http://localhost:6543/api/matakuliah/16 \
       -H "Content-Type: application/json" \
       -d '{"sks": 4}'
  ```
- **Contoh Response:**
  ```json
  {
    "success": true,
    "matakuliah": {
      "id": 16,
      "kode_mk": "IF1022",
      "nama_mk": "Struktur Data",
      "sks": 4,
      "semester": 2
    }
  }
  ```

### 5. Delete Matakuliah
- **Endpoint:** `DELETE /api/matakuliah/{id}`
- **Deskripsi:** Menghapus data matakuliah berdasarkan ID.
- **Contoh Request:**
  ```bash
  curl -X DELETE http://localhost:6543/api/matakuliah/12
  ```
- **Contoh Response:**
  ```json
  {
    "success": true,
    "message": "Mta Kuliah dengan id 12 berhasil dihapus"
  }
  ```

## Testing
Gunakan perintah `curl` yang ada di setiap dokumentasi endpoint untuk melakukan testing. Pastikan server sedang berjalan sebelum melakukan testing.

---
> Dibuat oleh Muhammad Riveldo Hermawan Putra