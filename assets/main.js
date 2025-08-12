// Simulasi data hierarki: Tingkat Kelas > Mata Pelajaran > Topik
const data = {
    '10': {
        'kimia': [
            { id: 'asam-basa', title: 'Asam Basa', image: 'https://placehold.co/300x100?text=Asam+Basa', desc: 'Belajar tentang pH dan reaksi kimia! Ini adalah topik dasar dalam kimia yang mencakup konsep asam, basa, indikator, dan reaksi netralisasi. Siswa akan mempelajari skala pH, sifat larutan, dan aplikasi dalam kehidupan sehari-hari seperti pengaturan pH tanah atau obat-obatan.' },
            { id: 'redoks', title: 'Redoks', image: 'https://placehold.co/300x100?text=Redoks', desc: 'Pelajari reaksi reduksi-oksidasi! Topik ini menjelaskan transfer elektron, bilangan oksidasi, dan reaksi redoks dalam sel volta, korosi, dan proses biologis seperti respirasi.' }
        ],
        'fisika': [
            { id: 'gerak', title: 'Gerak Lurus', image: 'https://placehold.co/300x100?text=Gerak+Lurus', desc: 'Pelajari hukum Newton! Topik ini mencakup gerak lurus beraturan, berubah beraturan, gaya, massa, dan aplikasi seperti perhitungan kecepatan kendaraan atau gerak proyektil.' }
        ]
    },
    '11': {
        'kimia': [
            { id: 'stoikiometri', title: 'Stoikiometri', image: 'https://placehold.co/300x100?text=Stoikiometri', desc: 'Kalkulasi jumlah zat! Ini melibatkan mol, persamaan reaksi, yield, dan perhitungan stoichiometri dalam reaksi kimia industri atau laboratorium.' }
        ],
        'fisika': [
            { id: 'energi', title: 'Energi', image: 'https://placehold.co/300x100?text=Energi', desc: 'Pelajari energi kinetik! Topik ini membahas energi potensial, konservasi energi, kerja, daya, dan aplikasi dalam mesin atau sistem fisika seperti pendulum.' }
        ]
    },
    '12': {
        'kimia': [
            { id: 'polimer', title: 'Polimer', image: 'https://placehold.co/300x100?text=Polimer', desc: 'Pelajari bahan polimer! Ini termasuk polimerisasi, jenis polimer seperti plastik, karet, dan aplikasi dalam industri, lingkungan, dan teknologi biomedis.' }
        ],
        'fisika': [
            { id: 'listrik', title: 'Listrik', image: 'https://placehold.co/300x100?text=Listrik', desc: 'Pelajari rangkaian listrik! Topik ini mencakup arus, tegangan, hambatan, hukum Ohm, Kirchhoff, dan aplikasi seperti sirkuit elektronik atau distribusi listrik.' }
        ]
    }
};

// Simulasi notifikasi
const notifications = [
    'Quiz Asam Basa besok jam 08.00!',
    'Tugas kelompok harus selesai minggu ini.'
];

// Toggle level (Kelas)
function toggleLevel(element) {
    element.classList.toggle('open');
    const subLevel = element.nextElementSibling;
    if (subLevel) subLevel.classList.toggle('show');
}

// Toggle topics (Mata Pelajaran)
function toggleTopic(element) {
    element.classList.toggle('open');
    const topics = element.nextElementSibling;
    if (topics) topics.classList.toggle('show');
}

// Update konten topik
function changeTopic(topikId) {
    let topik = null;
    for (let kelas in data) {
        for (let mp in data[kelas]) {
            topik = data[kelas][mp].find(t => t.id === topikId);
            if (topik) break;
        }
        if (topik) break;
    }
    if (topik) {
        document.getElementById('topic-title').textContent = `Topik: ${topik.title}`;
        document.getElementById('topic-image').src = topik.image;
        document.getElementById('topic-desc').textContent = topik.desc;
    }
}

// Toggle notification dropdown
function toggleNotification() {
    const dropdown = document.getElementById('notification-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
        const profileDropdown = document.getElementById('profile-dropdown');
        if (profileDropdown && profileDropdown.classList.contains('show')) {
            profileDropdown.classList.remove('show');
        }
    }
}

// Toggle profile dropdown
function toggleProfile() {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
        const notificationDropdown = document.getElementById('notification-dropdown');
        if (notificationDropdown && notificationDropdown.classList.contains('show')) {
            notificationDropdown.classList.remove('show');
        }
    }
}

// Render notifikasi di dropdown
const notificationDropdown = document.getElementById('notification-dropdown');
if (notificationDropdown) {
    notificationDropdown.innerHTML = '<h3>Notifikasi</h3>' + notifications.map(n => `<p>${n}</p>`).join('');
}