// ==========================================
// 1. AMBIL SEMUA ELEMEN HTML YANG DIBUTUHKAN
// ==========================================
const btnLoginGoogle = document.getElementById('btn-login-google');
const btnLogout = document.getElementById('btn-logout');
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');

const navDashboard = document.getElementById('nav-dashboard');
const navKategori = document.getElementById('nav-kategori');
const subDashboard = document.getElementById('sub-dashboard');
const subKategori = document.getElementById('sub-kategori');

// Elemen fitur dinamis
const txKategoriDropdown = document.getElementById('tx-kategori');
const listKategoriAktif = document.getElementById('list-kategori-aktif');
const budgetProgressList = document.getElementById('budget-progress-list');
const formKategori = document.getElementById('form-kategori');
const formTransaksi = document.getElementById('form-transaksi');
const totalBalanceElement = document.getElementById('total-balance');

// ==========================================
// 2. DATABASE SIMULASI (DATA AWAL)
// ==========================================
// Anggap saja ini data yang nantinya kita tarik dari Google Sheets
let daftarKategori = [
    { nama: 'Makan & Minum', limit: 1500000, terpakai: 400000 },
    { nama: 'Transportasi', limit: 500000, terpakai: 450000 } // Sengaja dibikin mau habis buat tes warna bar
];

// ==========================================
// 3. FUNGSI UTAMA UNTUK UPDATE TAMPILAN (RENDER)
// ==========================================

function updateAplikasi() {
    // A. Kosongkan dulu tampilan yang lama biar gak dobel
    txKategoriDropdown.innerHTML = '<option value="">-- Pilih Kategori --</option>';
    listKategoriAktif.innerHTML = '';
    budgetProgressList.innerHTML = '';

    let totalSisaSaldo = 0;

    // B. Lakukan perulangan (looping) data kategori
    daftarKategori.forEach((kat) => {
        let sisaKategori = kat.limit - kat.terpakai;
        totalSisaSaldo += sisaKategori;

        // 1. Update Dropdown di Form Transaksi
        const option = document.createElement('option');
        option.value = kat.nama;
        option.textContent = kat.nama;
        txKategoriDropdown.appendChild(option);

        // 2. Update List di Halaman Kelola Kategori
        const li = document.createElement('li');
        li.textContent = `${kat.nama} (Batas: Rp ${kat.limit.toLocaleString('id-ID')} | Terpakai: Rp ${kat.terpakai.toLocaleString('id-ID')})`;
        listKategoriAktif.appendChild(li);

        // 3. Hitung Persentase Progress Bar
        let persen = (kat.terpakai / kat.limit) * 100;
        if (persen > 100) persen = 100; // Biar bar-nya gak jebol keluar kotak

        // Tentukan warna bar secara dinamis berdasarkan sisa budget
        let warnaBar = 'bar-safe'; // Hijau Sage (Aman < 70%)
        if (persen >= 70 && persen < 90) {
            warnaBar = 'bar-warning'; // Kuning (Waspada)
        } else if (persen >= 90) {
            warnaBar = 'bar-danger'; // Merah (Kritis/Boncos)
        }

        // 4. Update Progress Bar di Dashboard Utama
        const progressGroup = document.createElement('div');
        progressGroup.className = 'progress-group';
        progressGroup.innerHTML = `
            <div class="progress-labels">
                <span>${kat.nama}</span>
                <span>Rp ${kat.terpakai.toLocaleString('id-ID')} / Rp ${kat.limit.toLocaleString('id-ID')}</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar ${warnaBar}" style="width: ${persen}%;"></div>
            </div>
        `;
        budgetProgressList.appendChild(progressGroup);
    });

    // C. Update Total Sisa Saldo di Kartu Utama
    totalBalanceElement.textContent = `Rp ${totalSisaSaldo.toLocaleString('id-ID')}`;
}

// ==========================================
// 4. EVENT LISTENER (LOGIKA TOMBOL-TOMBOL)
// ==========================================

// Fitur Tambah Kategori Baru via Form
formKategori.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah halaman reload
    
    const namaBaru = document.getElementById('kat-nama').value;
    const limitBaru = parseInt(document.getElementById('kat-limit').value);

    // Masukkan data baru ke dalam array database simulasi
    daftarKategori.push({
        nama: namaBaru,
        limit: limitBaru,
        terpakai: 0 // Kategori baru pasti pemakaiannya masih 0
    });

    // Reset isi form input
    formKategori.reset();

    // Jalankan fungsi update agar tampilan berubah otomatis!
    updateAplikasi();
});

// Fitur Catat Transaksi Pengeluaran Baru
formTransaksi.addEventListener('submit', (e) => {
    e.preventDefault();

    const kategoriDipilih = txKategoriDropdown.value;
    const nominalInput = parseInt(document.getElementById('tx-nominal').value);

    // Cari kategori yang cocok di dalam array, lalu tambahkan nominal terpakainya
    const kategoriData = daftarKategori.find(kat => kat.nama === kategoriDipilih);
    if (kategoriData) {
        kategoriData.terpakai += nominalInput;
    }

    formTransaksi.reset();
    updateAplikasi(); // Update tampilan lagi
});

// Simulasi Perpindahan Halaman Login/Logout
btnLoginGoogle.addEventListener('click', () => {
    loginPage.classList.add('hidden');
    dashboardPage.classList.remove('hidden');
    updateAplikasi(); // Jalankan fungsi render saat pertama masuk app
});

btnLogout.addEventListener('click', () => {
    dashboardPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
});

// Navigasi Internal Menu Tab
navDashboard.addEventListener('click', () => {
    navDashboard.classList.add('active');
    navKategori.classList.remove('active');
    subDashboard.classList.remove('hidden');
    subKategori.classList.add('hidden');
});

navKategori.addEventListener('click', () => {
    navKategori.classList.add('active');
    navDashboard.classList.remove('active');
    subKategori.classList.remove('hidden');
    subDashboard.classList.add('hidden');
});
