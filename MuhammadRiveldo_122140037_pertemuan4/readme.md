# 🧮 Program Pengelolaan Data Nilai Mahasiswa
**Nama:** Muhammad Riveldo Hermawan Putra
**NIM:** 122140037

---

## 📖 Deskripsi

Program ini dibuat untuk mengelola data nilai mahasiswa menggunakan **bahasa pemrograman Python**.
Fitur-fitur yang tersedia mencakup perhitungan nilai akhir, penentuan grade, pencarian mahasiswa terbaik & terburuk, serta filter data berdasarkan grade.

Data mahasiswa disimpan dalam bentuk **list of dictionary**, dan semua interaksi dilakukan melalui menu di terminal.

---

## ⚙️ Fitur Utama

| Fitur                                    | Deskripsi                                                              |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| **1. Hitung Nilai Akhir**                | Menghitung nilai akhir berdasarkan bobot: 30% UTS, 40% UAS, 30% Tugas. |
| **2. Tentukan Grade**                    | Memberi grade (A–E) berdasarkan nilai akhir.                           |
| **3. Tampilkan Data Mahasiswa**          | Menampilkan seluruh data mahasiswa dalam format tabel.                 |
| **4. Tambah Data Mahasiswa Baru**        | Input data mahasiswa baru melalui terminal.                            |
| **5. Cari Mahasiswa Terbaik & Terburuk** | Menampilkan mahasiswa dengan nilai tertinggi dan terendah.             |
| **6. Filter Berdasarkan Grade**          | Menampilkan daftar mahasiswa dengan grade tertentu.                    |
| **7. Hitung Rata-Rata Nilai Kelas**      | Menghitung rata-rata nilai akhir seluruh mahasiswa.                    |

---

## 🧩 Struktur Data

Data mahasiswa disimpan dalam list berisi dictionary dengan format sebagai berikut:

```python
mahasiswa = [
    {"nama": "Riveldo", "nim": "122140037", "nilai_uts": 78, "nilai_uas": 85, "nilai_tugas": 80},
    {"nama": "Randy", "nim": "122140171", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 75},
    ...
]
```

---

## 📚 Rumus Perhitungan

### Nilai Akhir

[
\text{Nilai Akhir} = (0.3 \times \text{UTS}) + (0.4 \times \text{UAS}) + (0.3 \times \text{Tugas})
]

### Grade

| Rentang Nilai | Grade |
| ------------- | ----- |
| ≥ 80          | A     |
| ≥ 70          | B     |
| ≥ 60          | C     |
| ≥ 50          | D     |
| < 50          | E     |

---

## 🧠 Contoh Output

```
=============================================
  PROGRAM DATA NILAI MAHASISWA
=============================================
1. Tampilkan semua data
2. Tambah data mahasiswa
3. Cari mahasiswa terbaik & terburuk
4. Filter berdasarkan grade
5. Hitung rata-rata nilai kelas
6. Keluar
Pilih menu (1-6): 1

================================================================================
Nama            NIM        UTS    UAS    Tugas  Akhir   Grade
================================================================================
Riveldo         122140037  78     85     80     81.4    A
Randy           122140171  65     70     75     70.0    B
Syuhendar       122140092  90     95     88     91.4    A
Dewi            122140050  55     60     50     55.5    D
Putri           122140200  40     45     50     45.0    E
================================================================================
```

---

## 🛠️ Cara Menjalankan Program


### 2️⃣ Jalankan Program

1. **Persiapan**  
   ```bash
   Pastikan kamu sudah menginstall Python 3.8+ di perangkatmu.

2. **Clone repository**  
   ```bash
   git clone https://github.com/MuhammadRiveldo/pemrograman_web_itera_122140037.git
   cd MuhammadRiveldo pemrograman_web_itera_122140037

3. **Menjalankan Program**  
   ```bash
   Buka terminal di direktori tempat file disimpan, lalu jalankan perintah berikut:
   python Data_Mahasiswa.py

4. **Navigasi Menu**  
   ```bash
   Gunakan angka (1–6) untuk memilih fitur sesuai kebutuhan.
---

## 🧾 Struktur Folder

```
📦 MuhammadRiveldo_122140037_pertemuan4
 ┣ 📜 Data_Mahasiswa.py
 ┗ 📘 README.md
```

---
> Dibuat oleh Muhammad Riveldo Hermawan Putra (122140037)