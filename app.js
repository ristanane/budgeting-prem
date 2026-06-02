// 1. AMBIL ELEMEN HTML
const btnLoginGoogle = document.getElementById('btn-login-google');
const btnLogout = document.getElementById('btn-logout');
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');

// 2. SIMULASI LOGIN (Klik tombol login)
btnLoginGoogle.addEventListener('click', () => {
    // Sembunyikan halaman login, munculkan dashboard
    loginPage.classList.add('hidden');
    dashboardPage.classList.remove('hidden');
});

// 3. SIMULASI LOGOUT (Klik tombol keluar)
btnLogout.addEventListener('click', () => {
    // Sembunyikan dashboard, munculkan halaman login lagi
    dashboardPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
});
