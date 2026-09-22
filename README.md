# Hitung Ceria

Website latihan matematika kelas 3 SD tanpa akun atau backend aplikasi. Dibangun dengan React, TypeScript, Vinext, dan Nitro untuk Vercel.

## Menjalankan

Dari folder `web`, gunakan Node.js 24 (untuk menjalankan tes TypeScript langsung):

```sh
npm install
npm run dev
```

Buka http://localhost:5173. Server harus tetap berjalan selama website dipakai.

## Pemeriksaan

```sh
node --test tests/math.test.ts
node node_modules/typescript/bin/tsc --noEmit
npm run build
```

Tersedia juga `npm test`, `npm run typecheck`, dan `npm run build`.

Build produksi menggunakan preset Nitro `vercel` dan menghasilkan folder `.output`.

## Deploy ke Vercel

Hubungkan repository GitHub ke Vercel. Konfigurasi deployment sudah tersimpan di `vercel.json`:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `.output`

Vercel akan memakai konfigurasi tersebut pada setiap deployment.

## Perilaku

- Lima level, 10 soal per sesi, empat pilihan jawaban, pembahasan setelah setiap jawaban.
- Hafalan memiliki pilihan perkalian, pembagian, atau campuran (5+5).
- Mudah–Sulit memiliki minimal dua soal setiap operasi. Pembagian habis, hasil tidak negatif, tanpa soal identik dalam sesi.
- HOTS memilih 10 dari 20 cerita/logika terkurasi.
- Hanya nama disimpan pada localStorage (`hitung-nama`). Penyimpanan yang tidak tersedia tidak menghentikan aplikasi. Nilai, jawaban, dan waktu hilang saat reload.
- Motivasi dipilih secara deterministik menurut tanggal lokal, sehingga tetap sepanjang hari tanpa menyimpan data tambahan.
- Timer hafalan menghitung waktu saat menjawab dan halaman terlihat. Membaca pembahasan, tab tersembunyi, serta dialog keluar tidak dihitung. Tidak ada batas waktu.
- Pilihan ganda mengukur pengenalan jawaban; skor bukan sertifikasi penguasaan hafalan.
- Font Nunito dimuat dari Google Fonts. Jika offline, font sistem menjadi fallback; soal dan pembahasan tetap lokal.

## Struktur

- `app/page.tsx`: beranda, nama, pemilihan latihan, Study Card.
- `components/quiz.tsx`: soal, feedback, pembahasan, konfirmasi keluar, hasil.
- `lib/math/`: tipe data, generator, pembahasan, bank HOTS, reducer sesi, timer.
- `tests/math.test.ts`: batas angka, ketepatan aritmetika/pembahasan, pilihan jawaban, komposisi sesi, Study Card, bank HOTS, skor, timer.
- `hooks/use-study-tool.ts`: akses Study Card lewat WebMCP bila browser mendukung. Tanpa dukungan ini, UI tetap berjalan normal.

## Validasi

12 tes otomatis mencakup 1.400 sesi (14.000 soal), semua 162 baris tabel, dan 20 soal HOTS. Pengujian browser mencakup sesi lengkap semua level/jenis hafalan, jawaban benar/salah, pembahasan, skor 5/10 yang disengaja, latihan ulang, konfirmasi keluar, dan navigasi keyboard. Layout diperiksa pada 360, 768, 1280 piksel dan teks 200%. Hasil ini merupakan pengujian teknis; pengujian bersama anak belum dilakukan.

Evaluasi berikutnya: amati apakah anak memahami pembahasan dan apakah lonjakan level Sulit terlalu tinggi. Jangan menambah fitur dulu sebelum alur belajar ini terbukti nyaman.
