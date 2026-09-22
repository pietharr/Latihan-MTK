export interface Story { prompt: string; answer: number; steps: string[]; category: string }
const story=(category:string,prompt:string,answer:number,known:string,work:string,conclusion:string):Story=>({category,prompt,answer,steps:[`Yang kita tahu: ${known}`,`Caranya: ${work}`,`Jadi, ${conclusion}`]});
export const stories: Story[] = [
 story('pola','3, 6, 9, 12, … Angka berapa yang berikutnya?',15,'angkanya bertambah 3 setiap langkah.','12 + 3 = 15.','angka berikutnya 15.'),
 story('pola','40, 35, 30, 25, … Angka berapa yang berikutnya?',20,'setiap angka berkurang 5.','25 − 5 = 20.','angka berikutnya 20.'),
 story('pola','2, 4, 8, 16, … Setiap angka dikali 2. Berapa angka berikutnya?',32,'pola angkanya dikali 2.','16 × 2 = 32.','angka berikutnya 32.'),
 story('pola','7, 14, 21, 28, … Angka berapa yang berikutnya?',35,'setiap angka bertambah 7.','28 + 7 = 35.','angka berikutnya 35.'),
 story('hilang','Sebuah angka ditambah 18 hasilnya 45. Berapakah angka itu?',27,'angka yang dicari + 18 = 45.','balik penjumlahan menjadi pengurangan: 45 − 18 = 27.','angkanya 27. Cek: 27 + 18 = 45.'),
 story('hilang','6 × … = 42. Angka berapa yang hilang?',7,'6 kelompok berisi sama banyak, totalnya 42.','42 ÷ 6 = 7.','angkanya 7. Cek: 6 × 7 = 42.'),
 story('hilang','56 ÷ … = 8. Angka berapa yang hilang?',7,'56 dibagi sebuah angka hasilnya 8.','cari pasangan perkalian 8 × 7 = 56.','pembaginya 7.'),
 story('hilang','… − 24 = 39. Angka berapa yang hilang?',63,'setelah dikurangi 24, tersisa 39.','kembalikan yang diambil: 39 + 24 = 63.','angka awalnya 63.'),
 story('cerita','Lani punya 3 kotak pensil. Tiap kotak berisi 8 pensil. Ia memberikan 5 pensil. Berapa pensil yang tersisa?',19,'ada 3 kotak, tiap kotak berisi 8; 5 pensil diberikan.','3 × 8 = 24, lalu 24 − 5 = 19.','tersisa 19 pensil.'),
 story('cerita','Budi membeli 4 bungkus stiker, masing-masing berisi 6. Ia mendapat 7 stiker lagi. Berapa jumlah stikernya?',31,'ada 4 bungkus isi 6 dan tambahan 7 stiker.','4 × 6 = 24, lalu 24 + 7 = 31.','Budi punya 31 stiker.'),
 story('cerita','Ada 36 kue yang dibagi rata ke 6 piring. Rani mengambil 2 kue dari satu piring. Berapa kue tersisa di piring itu?',4,'tiap piring mendapat bagian sama; satu piring diambil 2 kuenya.','36 ÷ 6 = 6, lalu 6 − 2 = 4.','di piring itu tersisa 4 kue.'),
 story('cerita','Di bus ada 18 penumpang. Di halte, 7 turun dan 9 naik. Berapa penumpang sekarang?',20,'mula-mula 18, turun 7, lalu naik 9.','18 − 7 = 11, lalu 11 + 9 = 20.','ada 20 penumpang.'),
 story('kelompok','Ada 32 siswa. Tiap kelompok harus berisi 4 siswa. Berapa kelompok yang terbentuk?',8,'32 siswa dibagi menjadi kelompok isi 4.','32 ÷ 4 = 8. Cek: 8 × 4 = 32.','terbentuk 8 kelompok.'),
 story('kelompok','Ibu menata 45 jeruk ke kantong berisi 5 jeruk. Berapa kantong yang dibutuhkan?',9,'45 jeruk, setiap kantong berisi 5.','45 ÷ 5 = 9.','dibutuhkan 9 kantong.'),
 story('kelompok','Ada 6 meja. Setiap meja memiliki 4 kursi. Berapa kursi tambahan agar 28 anak bisa duduk?',4,'tersedia 6 × 4 kursi untuk 28 anak.','6 × 4 = 24, lalu 28 − 24 = 4.','perlu 4 kursi tambahan.'),
 story('kelompok','Ada 24 bunga. Setiap vas berisi 6 bunga. Dua vas sudah tersedia. Berapa vas lagi yang dibutuhkan?',2,'24 bunga dibagi 6 per vas; sudah ada 2 vas.','24 ÷ 6 = 4 vas, lalu 4 − 2 = 2.','perlu 2 vas lagi.'),
 story('banding','Ayu punya 3 kantong berisi 7 kelereng per kantong. Dito punya 18 kelereng. Berapa lebih banyak kelereng Ayu?',3,'Ayu punya 3 × 7 kelereng; Dito punya 18.','3 × 7 = 21, lalu 21 − 18 = 3.','Ayu punya 3 kelereng lebih banyak.'),
 story('banding','Buku Raka berjumlah 15. Buku Sinta dua kali jumlah buku Raka. Berapa buku Sinta?',30,'Sinta punya dua kali 15 buku.','2 × 15 = 30.','Sinta punya 30 buku.'),
 story('banding','Nina membaca 12 halaman pada Senin. Selasa ia membaca 8 halaman lebih banyak daripada Senin. Berapa total halaman selama dua hari?',32,'Senin 12 halaman; Selasa 8 halaman lebih banyak.','Selasa: 12 + 8 = 20. Total: 12 + 20 = 32.','Nina membaca 32 halaman.'),
 story('banding','Dua rak masing-masing berisi 16 dan 10 buku. Berapa buku harus dipindahkan dari rak pertama ke rak kedua agar sama banyak?',3,'selisih isi rak adalah 16 − 10 = 6.','pindahkan setengah selisih: 6 ÷ 2 = 3. Cek: 16 − 3 = 13 dan 10 + 3 = 13.','pindahkan 3 buku.'),
];
