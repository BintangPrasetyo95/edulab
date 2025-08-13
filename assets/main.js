// Simulasi data hierarki: Tingkat Kelas > Mata Pelajaran > Topik
const data = {
    '10': {
        'kimia': [
            { id: 'asam-basa', title: 'Asam Basa', image: 'https://placehold.co/300x100?text=Asam+Basa', desc: 'Belajar tentang pH dan reaksi kimia! Ini adalah topik dasar dalam kimia yang mencakup konsep asam, basa, indikator, dan reaksi netralisasi. Siswa akan mempelajari skala pH, sifat larutan, dan aplikasi dalam kehidupan sehari-hari seperti pengaturan pH tanah atau obat-obatan.', progress: 75 },
            { id: 'redoks', title: 'Redoks', image: 'https://placehold.co/300x100?text=Redoks', desc: 'Pelajari reaksi reduksi-oksidasi! Topik ini menjelaskan transfer elektron, bilangan oksidasi, dan reaksi redoks dalam sel volta, korosi, dan proses biologis seperti respirasi.', progress: 0 }
        ],
        'fisika': [
            { id: 'gerak', title: 'Gerak Lurus', image: 'https://placehold.co/300x100?text=Gerak+Lurus', desc: 'Pelajari hukum Newton! Topik ini mencakup gerak lurus beraturan, berubah beraturan, gaya, massa, dan aplikasi seperti perhitungan kecepatan kendaraan atau gerak proyektil.', progress: 0 }
        ]
    },
    '11': {
        'kimia': [
            { id: 'stoikiometri', title: 'Stoikiometri', image: 'https://placehold.co/300x100?text=Stoikiometri', desc: 'Kalkulasi jumlah zat! Ini melibatkan mol, persamaan reaksi, yield, dan perhitungan stoichiometri dalam reaksi kimia industri atau laboratorium.', progress: 0 }
        ],
        'fisika': [
            { id: 'energi', title: 'Energi', image: 'https://placehold.co/300x100?text=Energi', desc: 'Pelajari energi kinetik! Topik ini membahas energi potensial, konservasi energi, kerja, daya, dan aplikasi dalam mesin atau sistem fisika seperti pendulum.', progress: 0 }
        ]
    },
    '12': {
        'kimia': [
            { id: 'polimer', title: 'Polimer', image: 'https://placehold.co/300x100?text=Polimer', desc: 'Pelajari bahan polimer! Ini termasuk polimerisasi, jenis polimer seperti plastik, karet, dan aplikasi dalam industri, lingkungan, dan teknologi biomedis.', progress: 0 }
        ],
        'fisika': [
            { id: 'listrik', title: 'Listrik', image: 'https://placehold.co/300x100?text=Listrik', desc: 'Pelajari rangkaian listrik! Topik ini mencakup arus, tegangan, hambatan, hukum Ohm, Kirchhoff, dan aplikasi seperti sirkuit elektronik atau distribusi listrik.', progress: 0 }
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

// Update konten topik (for topik.html)
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
        // Update topic card
        const topicTitle = document.getElementById('topic-title');
        const topicImage = document.getElementById('topic-image');
        const topicDesc = document.getElementById('topic-desc');
        if (topicTitle && topicImage && topicDesc) {
            topicTitle.textContent = `Topik: ${topik.title}`;
            topicImage.src = topik.image;
            topicDesc.textContent = topik.desc;
        } else {
            console.error('Topic elements not found');
        }

        // Update progress
        const progressCircle = document.getElementById('progress-circle');
        if (progressCircle) {
            progressCircle.style.background = `conic-gradient(#2e7d32 ${topik.progress}%, #ccc ${topik.progress}% 100%)`;
            progressCircle.textContent = `${topik.progress}%`;
            progressCircle.style.display = 'flex';
            progressCircle.style.visibility = 'visible';
            progressCircle.style.opacity = '1';
        } else {
            console.error('Progress circle not found');
        }

        // Update quick buttons
        const quickButtons = document.getElementById('quick-buttons');
        if (quickButtons) {
            if (topik.id === 'asam-basa') {
                quickButtons.innerHTML = `
                    <button class="pre-lab normal"><span>📚</span> Pre-Lab</button>
                    <button class="quiz normal"><span>❓</span> Quiz</button>
                    <button class="praktikum normal"><span>🧪</span> Praktikum</button>
                    <button class="tugas-kelompok disabled"><span>🤝</span> Tugas Kelompok</button>
                `;
            } else {
                quickButtons.innerHTML = '<div class="coming-soon">COMING SOON</div>';
            }
        } else {
            console.error('Quick buttons not found');
        }
    } else {
        console.error(`Topic with ID ${topikId} not found`);
    }
}

// Filter sidebar by subject (for index.html)
function filterSubject(subject) {
    const levels = document.querySelectorAll('.level');
    levels.forEach(level => {
        const subLevel = level.nextElementSibling;
        const mataPelajaran = subLevel.querySelectorAll('.mata-pelajaran');
        mataPelajaran.forEach(mp => {
            const mpText = mp.textContent.toLowerCase().trim();
            if (mpText === subject) {
                mp.classList.add('open');
                const topics = mp.nextElementSibling;
                if (topics) topics.classList.add('show');
                level.classList.add('open');
                if (subLevel) subLevel.classList.add('show');
            } else {
                mp.classList.remove('open');
                const topics = mp.nextElementSibling;
                if (topics) topics.classList.remove('show');
            }
        });
    });
}

// Calculate and render progress (for index.html)
function renderProgress() {
    // Calculate class progress
    const classProgress = {};
    for (let kelas in data) {
        let totalProgress = 0;
        let topicCount = 0;
        for (let mp in data[kelas]) {
            data[kelas][mp].forEach(topic => {
                totalProgress += topic.progress;
                topicCount++;
            });
        }
        classProgress[kelas] = topicCount > 0 ? Math.round(totalProgress / topicCount) : 0;
    }

    // Calculate subject progress
    const subjectProgress = {
        'kimia': { total: 0, count: 0 },
        'fisika': { total: 0, count: 0 }
    };
    for (let kelas in data) {
        for (let mp in data[kelas]) {
            data[kelas][mp].forEach(topic => {
                subjectProgress[mp].total += topic.progress;
                subjectProgress[mp].count++;
            });
        }
    }

    // Render class progress
    ['10', '11', '12'].forEach(kelas => {
        const progressCircle = document.getElementById(`progress-kelas-${kelas}`);
        if (progressCircle) {
            const progress = classProgress[kelas] || 0;
            progressCircle.style.background = `conic-gradient(#2e7d32 ${progress}%, #ccc ${progress}% 100%)`;
            progressCircle.textContent = `${progress}%`;
        }
    });

    // Render subject progress
    ['kimia', 'fisika'].forEach(subject => {
        const progressCircle = document.getElementById(`progress-${subject}`);
        if (progressCircle) {
            const progress = subjectProgress[subject].count > 0 ? Math.round(subjectProgress[subject].total / subjectProgress[subject].count) : 0;
            progressCircle.style.background = `conic-gradient(#2e7d32 ${progress}%, #ccc ${progress}% 100%)`;
            progressCircle.textContent = `${progress}%`;
        }
    });
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

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        renderProgress();
    } else if (window.location.pathname.includes('topik.html')) {
        changeTopic('asam-basa'); // Initialize with Asam Basa
    }
});