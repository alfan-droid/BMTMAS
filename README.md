# KSPP Syariah BMT MAS — Website Profil & Portal CMS

Aplikasi web modern berbasis **React (Vite)**, **Tailwind CSS**, **Lucide Icons**, dan **Supabase** untuk **KSPP Syariah BMT MAS (BMT Mitra Amanah Sejahtera)** di Gunungkidul, D.I. Yogyakarta.

- **Nomor Badan Hukum:** `0612/518/BH/XV.2/IV/2010`
- **Tagline:** *"Ke Syariah Agar Hidup Jadi Berkah"*
- **Arsitektur Halaman:** Mengadopsi struktur arsitektur multi-page & CMS terintegrasi (seperti referensi proyek `kopdeskampungbatikgiriloyo`).

---

## 1. Arsitektur Halaman Publik

1. **Beranda (`/`)**
   - **Bagian Beranda:** Hero section dengan badge Badan Hukum resmi, landasan syariah **QS. Al-Baqarah: 278**, pilar keunggulan (Bebas Biaya Admin, Layanan Jemput Bola, 100% Halal & Syar'i, Bagi Hasil Kompetitif).
   - **Bagian Tentang Kami (`#tentang`):** Profil KSPP Syariah BMT MAS, komitmen pelayanan, dan syarat pembukaan simpanan berjangka.
   - **Bagian Lokasi (`#lokasi`):** Informasi lengkap **Kantor Pusat Semanu** dan **Kantor Cabang Paliyan**, Call Center `(0274) 2903137`, serta tautan pencarian Google Maps.

2. **Halaman Khusus Produk Simpanan (`/produk`)**
   - Breadcrumbs navigasi.
   - Filter interaktif berdasarkan Akad (*Semua*, *Wadi'ah*, *Mudharabah*).
   - 4 Kartu produk unggulan (**TAMARA**, **TADIKA**, **TADURI**, **TAQURBA**) dengan badge Akad, Nisbah, rincian keunggulan, dan tombol langsung pendaftaran via WhatsApp.
   - Panduan 4 langkah mudah pembukaan tabungan syariah.
   - Banner konsultasi dan tautan ke halaman deposito.

3. **Halaman Khusus Simpanan Berjangka / Deposito (`/deposito`)**
   - Tabel Informasi Equivalent Rate Historis (Januari – Desember 2022) dengan tab filter Semester I, Semester II, dan 12 Bulan.
   - Kalkulator simulasi interaktif (pilihan nominal cepat 1 Jt, 5 Jt, 10 Jt, 50 Jt, pemilih tenor 3, 6, 12 bulan) dengan tombol pendaftaran ke WhatsApp.
   - Grid testimoni autentik para tokoh dan anggota di Gunungkidul.
   - Edukasi prinsip Akad *Mudharabah Muthlaqah* dan fasilitas *Automatic Roll Over (ARO)*.

---

## 2. Portal CMS (Content Management System)

Aplikasi dilengkapi CMS lengkap untuk mengelola konten website:

- **Login Admin:** `/admin/login`
  - **Akun Demo Cepat:** Klik tombol *"Gunakan Akun Demo Admin"* atau masukkan:
    - **Email:** `admin@bmtmas.id`
    - **Password:** `admin123`
- **Protected Admin Dashboard:** `/admin/dashboard`
  - Ringkasan total produk, tenor deposito, testimoni anggota, dan status penyimpanan.
  - Opsi reset data ke data brosur resmi asli kapan saja.
- **Kelola Produk Simpanan:** `/admin/produk`
  - CRUD (Tambah, Edit, Hapus) produk simpanan, ubah akad, nisbah, deskripsi, poin manfaat, pilihan ikon, dan status aktif.
- **Kelola Deposito & Rates:** `/admin/deposito`
  - Mengubah rata-rata rate bulanan, nisbah anggota, nisbah BMT, serta angka rate per bulan (Januari s.d. Desember) untuk tenor 3, 6, dan 12 bulan.
- **Kelola Testimoni:** `/admin/testimoni`
  - CRUD (Tambah, Edit, Hapus) ulasan anggota, nama, peran/profesi, dan highlight badge.
- **Profil Lembaga & Kontak:** `/admin/profil`
  - Mengubah nama koperasi, nomor badan hukum, tagline, call center, nomor WhatsApp, dan alamat operasional kantor cabang.

---

## 3. Menjalankan Proyek Secara Lokal

```bash
# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Bangun versi produksi
npm run build

# Pratinjau build produksi
npm run preview
```

---

## 4. Konfigurasi Supabase (Opsional)

Jika ingin menghubungkan ke database Supabase:
1. Salin file `.env.example` menjadi `.env`:
   ```env
   VITE_SUPABASE_URL=https://project-id-anda.supabase.co
   VITE_SUPABASE_ANON_KEY=anon-key-anda
   ```
2. Jalankan skrip di file [`supabase/seed.sql`](./supabase/seed.sql) pada Supabase SQL Editor.
3. Aplikasi secara otomatis menyinkronkan data dengan Supabase dan tetap memiliki *fallback* lokal jika koneksi terputus.
