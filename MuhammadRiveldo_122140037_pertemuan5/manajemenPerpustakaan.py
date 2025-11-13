from abc import ABC, abstractmethod
from tabulate import tabulate

class LibraryItem(ABC):
    # kelas abstrak untuk item perpustakaan
    def __init__(self, item_id, title, year, quantity):
        self._item_id = item_id  # Protected attribute
        self._title = title
        self._year = year
        self._quantity = quantity

    @abstractmethod
    def display_info(self):
        # metode abstrak untuk menampilkann informasi item 
        pass

    def get_display_data(self):
        # untuk mendapatkan data yang akan tampil di tabel
        return {
            'ID': self._item_id,
            'Judul': self._title,
            'Tahun': self._year,
            'Jumlah': self._quantity
        }

class Book(LibraryItem):
    # subclass untuk buku dengan atribut tambahan
    def __init__(self, item_id, title, year, quantity, author, pages, rating):
        super().__init__(item_id, title, year, quantity)
        self._author = author
        self._pages = pages
        self._rating = rating  # Private attribute dengan property

    @property
    def rating(self):
        """Getter untuk rating buku"""
        return self._rating

    @rating.setter
    def rating(self, value):
        """Validasi rating antara 1-5"""
        if 1 <= value <= 5:
            self._rating = value
        else:
            raise ValueError("Rating harus antara 1-5")

    def display_info(self):
        # menampilkan infromasi buku dengan metode abstrak""
        return (f"Buku\nID: {self._item_id}\nJudul: {self._title}\n"
                f"Penulis: {self._author}\nTahun: {self._year}\n"
                f"Jumlah Halaman: {self._pages}\nRating: {self._rating}/5\n"
                f"Stok: {self._quantity}")

    def get_display_data(self):
        # untuk menambahkan data spesifik buku untuk tabel
        data = super().get_display_data()
        data.update({
            'Penulis': self._author,
            'Halaman': self._pages,
            'Rating': f"{self._rating}/5"
        })
        return data

class Magazine(LibraryItem):
    # untuk majalan dengan atribut tambahan
    def __init__(self, item_id, title, year, quantity, issue, publisher):
        super().__init__(item_id, title, year, quantity)
        self._issue = issue
        self._publisher = publisher

    def display_info(self):
        return (f"Majalah\nID: {self._item_id}\nJudul: {self._title}\n"
                f"Edisi: {self._issue}\nTahun: {self._year}\n"
                f"Penerbit: {self._publisher}\nStok: {self._quantity}")

    def get_display_data(self):
        # untuk menambahkan data spesifik magazine untuk tabel
        data = super().get_display_data()
        data.update({
            'Edisi': self._issue,
            'Penerbit': self._publisher
        })
        return data

class Library:
    # kelas yang digunakan untuk mengelola koleksi item perpustakaan
    def __init__(self):
        self.__items = []  # Private collection

    def add_item(self, item):
        # untuk menambahkan item
        self.__items.append(item)

    def remove_item(self, item_id):
        # untuk mengahapus item
        for item in self.__items:
            if item._item_id == item_id:
                self.__items.remove(item)
                return True
        return False

    def search_by_id(self, item_id):
        # untuk mencarii item dengan ID
        for item in self.__items:
            if item._item_id == item_id:
                return item
        return None

    def search_by_title(self, title):
        # untuk mencari item dengan judul
        return [item for item in self.__items if title.lower() in item._title.lower()]

    def display_all_items(self):
        # untuk menampilkan semua item tabel
        if not self.__items:
            print("Tidak ada item yang tersedia")
            return

        headers = set()
        for item in self.__items:
            headers.update(item.get_display_data().keys())
        headers = list(headers)

        table_data = []
        for item in self.__items:
            row = {header: item.get_display_data().get(header, '-') for header in headers}
            table_data.append(row.values())

        print("\nDaftar Item Perpustakaan:")
        print(tabulate(table_data, headers=headers, tablefmt="grid"))

def main():
    # untuk menjalankan proigram
    library = Library()

    while True:
        print("\n--- Sistem Manajemen Perpustakaan ---")
        print("1. Tambah Item")
        print("2. Hapus Item")
        print("3. Cari Item")
        print("4. Tampilkan Semua Item")
        print("5. Edit Item")
        print("6. Keluar")
        choice = input("Pilih opsi: ")

        if choice == '1':
            # untuk tambah item
            item_type = input("Jenis item (book/magazine): ").lower()
            if item_type not in ['book', 'magazine']:
                print("Jenis item tidak valid")
                continue

            item_id = input("ID item: ")
            title = input("Judul: ")
            year = int(input("Tahun terbit: "))
            quantity = int(input("Jumlah stok: "))

            if item_type == 'book':
                author = input("Penulis: ")
                pages = int(input("Jumlah halaman: "))
                rating = float(input("Rating (1-5): "))
                item = Book(item_id, title, year, quantity, author, pages, rating)
            else:
                issue = input("Edisi: ")
                publisher = input("Penerbit: ")
                item = Magazine(item_id, title, year, quantity, issue, publisher)

            library.add_item(item)
            print("Item berhasil ditambahkan!")

        elif choice == '2':
            # untuk hapus item
            item_id = input("Masukkan ID item yang akan dihapus: ")
            if library.remove_item(item_id):
                print("Item berhasil dihapus")
            else:
                print("Item tidak ditemukan")

        elif choice == '3':
            # untuk mencari item
            search_term = input("Cari berdasarkan ID/Judul: ")
            if search_term.isdigit():
                item = library.search_by_id(search_term)
                if item:
                    print("\n" + "="*40)
                    print(item.display_info())
                    print("="*40)
                else:
                    print("Item tidak ditemukan")
            else:
                results = library.search_by_title(search_term)
                if results:
                    print("\nHasil pencarian:")
                    for res in results:
                        print("-"*40)
                        print(res.display_info())
                else:
                    print("Tidak ada hasil yang cocok")

        elif choice == '4':
            # untuk menampilkan semua item
            library.display_all_items()

        elif choice == '5':
            # untuk edit item
            item_id = input("Masukkan ID item yang akan diedit: ")
            item = library.search_by_id(item_id)
            
            if not item:
                print("Item tidak ditemukan!")
                continue

            print("\nEdit item:")
            print("1. Judul")
            print("2. Tahun Terbit")
            print("3. Jumlah Stok")
            
            # Menambahkan opsi khusus berdasarkan tipe item
            if isinstance(item, Book):
                print("4. Penulis")
                print("5. Jumlah Halaman")
                print("6. Rating")
            elif isinstance(item, Magazine):
                print("4. Edisi")
                print("5. Penerbit")

            edit_choice = input("Pilih field yang akan diedit: ")

            try:
                if edit_choice == '1':
                    new_title = input("Masukkan judul baru: ")
                    item._title = new_title  # Akses protected attribute
                    
                elif edit_choice == '2':
                    new_year = int(input("Masukkan tahun baru: "))
                    item._year = new_year
                    
                elif edit_choice == '3':
                    new_quantity = int(input("Masukkan jumlah stok baru: "))
                    if new_quantity < 0:
                        raise ValueError
                    item._quantity = new_quantity
                    
                # Handler khusus untuk Book
                elif isinstance(item, Book):
                    if edit_choice == '4':
                        new_author = input("Masukkan penulis baru: ")
                        item._author = new_author
                    elif edit_choice == '5':
                        new_pages = int(input("Masukkan jumlah halaman baru: "))
                        item._pages = new_pages
                    elif edit_choice == '6':
                        new_rating = float(input("Masukkan rating baru (1-5): "))
                        item.rating = new_rating  # Menggunakan property setter
                
                # Handler khusus untuk Magazine
                elif isinstance(item, Magazine):
                    if edit_choice == '4':
                        new_issue = input("Masukkan edisi baru: ")
                        item._issue = new_issue
                    elif edit_choice == '5':
                        new_publisher = input("Masukkan penerbit baru: ")
                        item._publisher = new_publisher
                
                else:
                    print("Pilihan tidak valid")
                    continue

                print("Item berhasil diperbarui!")
                
            except ValueError:
                print("Input tidak valid!")

        elif choice == '6':
            print("Terima kasih, sampai jumpa lagiii!")
            break

        else:
            print("Pilihan tidak valid")

if __name__ == "__main__":
    main()