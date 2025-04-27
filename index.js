const express = require('express');
const mysql = require('mysql2');
const app = express();

// Koneksi ke database RDS
const db = mysql.createConnection({
  host: 'dbecom.cnsc6gsk4w0n.ap-southeast-2.rds.amazonaws.com', // Ganti dengan endpoint RDS kamu
  user: 'admin', // default biasanya 'admin'
  password: 'uts123321!',
  database: 'ecommerce_db'
});

// Cek koneksi database
db.connect((err) => {
  if (err) {
    console.error('Gagal konek ke database:', err);
  } else {
    console.log('Berhasil konek ke database MySQL!');
  }
});

app.get('/products', (req, res) => {
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) {
      console.error('Gagal ambil data produk:', err);
      return res.status(500).send('Gagal ambil produk');
    }
    res.json(results);
  });
});

// Menyajikan file statis dari folder 'views'
app.use(express.static('views'));

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
