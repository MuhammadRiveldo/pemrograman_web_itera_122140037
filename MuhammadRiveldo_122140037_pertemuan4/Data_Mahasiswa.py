# Program Pengelolaan Data Nilai Mahasiswa
# Oleh: Muhammad Riveldo Hermawan Putra
# NIM: 122140037

# === Data Awal ===
mahasiswa = [
    {"nama": "Riveldo", "nim": "122140037", "nilai_uts": 78, "nilai_uas": 85, "nilai_tugas": 80},
    {"nama": "Randy", "nim": "122140171", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 75},
    {"nama": "Syuhendar", "nim": "122140092", "nilai_uts": 90, "nilai_uas": 95, "nilai_tugas": 88},
    {"nama": "Dewi", "nim": "122140050", "nilai_uts": 55, "nilai_uas": 60, "nilai_tugas": 50},
    {"nama": "Putri", "nim": "122140200", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50}
]

# === Fungsi-Fungsi ===

def hitung_nilai_akhir(m):
    """Menghitung nilai akhir berdasarkan bobot 30% UTS, 40% UAS, 30% Tugas"""
    return round((0.3 * m["nilai_uts"]) + (0.4 * m["nilai_uas"]) + (0.3 * m["nilai_tugas"]), 2)

def tentukan_grade(nilai_akhir):
    """Menentukan grade berdasarkan nilai akhir"""
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

def tampilkan_data(data):
    """Menampilkan data mahasiswa dalam bentuk tabel"""
    print("="*80)
    print(f"{'Nama':<15} {'NIM':<10} {'UTS':<6} {'UAS':<6} {'Tugas':<6} {'Akhir':<7} {'Grade':<6}")
    print("="*80)
    for m in data:
        nilai_akhir = hitung_nilai_akhir(m)
        grade = tentukan_grade(nilai_akhir)
        print(f"{m['nama']:<15} {m['nim']:<10} {m['nilai_uts']:<6} {m['nilai_uas']:<6} {m['nilai_tugas']:<6} {nilai_akhir:<7} {grade:<6}")
    print("="*80)

def cari_mahasiswa_terbaik_terburuk(data):
    """Mencari mahasiswa dengan nilai tertinggi dan terendah"""
    terbaik = max(data, key=lambda m: hitung_nilai_akhir(m))
    terburuk = min(data, key=lambda m: hitung_nilai_akhir(m))
    print(f"\nMahasiswa Nilai Tertinggi: {terbaik['nama']} ({hitung_nilai_akhir(terbaik)})")
    print(f"Mahasiswa Nilai Terendah : {terburuk['nama']} ({hitung_ni1lai_akhir(terburuk)})")

def tambah_mahasiswa(data):
    """Menambah data mahasiswa baru"""
    print("\n=== Tambah Data Mahasiswa Baru ===")
    nama = input("Nama        : ")
    nim = input("NIM         : ")
    uts = float(input("Nilai UTS   : "))
    uas = float(input("Nilai UAS   : "))
    tugas = float(input("Nilai Tugas : "))
    data.append({"nama": nama, "nim": nim, "nilai_uts": uts, "nilai_uas": uas, "nilai_tugas": tugas})
    print(f"✅ Mahasiswa {nama} berhasil ditambahkan!\n")

def filter_berdasarkan_grade(data):
    """Menampilkan mahasiswa berdasarkan grade tertentu"""
    grade_cari = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
    hasil = [m for m in data if tentukan_grade(hitung_nilai_akhir(m)) == grade_cari]
    if hasil:
        print(f"\nMahasiswa dengan grade {grade_cari}:")
        tampilkan_data(hasil)
    else:
        print(f"\n⚠️ Tidak ada mahasiswa dengan grade {grade_cari}.")

def hitung_rata_rata_kelas(data):
    """Menghitung rata-rata nilai akhir kelas"""
    rata = sum(hitung_nilai_akhir(m) for m in data) / len(data)
    print(f"\n📊 Rata-rata nilai akhir kelas: {rata:.2f}")

# === Menu Utama ===
def menu():
    while True:
        print("""
=============================
  PROGRAM DATA NILAI MAHASISWA
=============================
1. Tampilkan semua data
2. Tambah data mahasiswa
3. Cari mahasiswa terbaik & terburuk
4. Filter berdasarkan grade
5. Hitung rata-rata nilai kelas
6. Keluar
""")
        pilihan = input("Pilih menu (1-6): ")

        if pilihan == "1":
            tampilkan_data(mahasiswa)
        elif pilihan == "2":
            tambah_mahasiswa(mahasiswa)
        elif pilihan == "3":
            cari_mahasiswa_terbaik_terburuk(mahasiswa)
        elif pilihan == "4":
            filter_berdasarkan_grade(mahasiswa)
        elif pilihan == "5":
            hitung_rata_rata_kelas(mahasiswa)
        elif pilihan == "6":
            print("Terima kasih! Program selesai 👋")
            break
        else:
            print("⚠️ Pilihan tidak valid, coba lagi!")

# === Jalankan Program ===
if __name__ == "__main__":
    menu()
