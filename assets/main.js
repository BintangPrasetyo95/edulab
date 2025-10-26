const data = {
    '10': {
        'kimia': [
            { id: 'asam-basa', title: 'Asam Basa', image: './assets/images/image-asam-basa.jpg', desc: 'Belajar tentang pH dan reaksi kimia! Ini adalah topik dasar dalam kimia yang mencakup konsep asam, basa, indikator, dan reaksi netralisasi. Siswa akan mempelajari skala pH, sifat larutan, dan aplikasi dalam kehidupan sehari-hari seperti pengaturan pH tanah atau obat-obatan.', progress: 30 },
            { id: 'redoks', title: 'Redoks', image: './assets/images/image_redoks.jpg', desc: 'Pelajari reaksi reduksi-oksidasi! Topik ini menjelaskan transfer elektron, bilangan oksidasi, dan reaksi redoks dalam sel volta, korosi, dan proses biologis seperti respirasi.', progress: 0 }
        ],
        'fisika': [
            { id: 'gerak', title: 'Gerak Lurus', image: './assets/images/image-gerak-lurus.jpg', desc: 'Pelajari hukum Newton! Topik ini mencakup gerak lurus beraturan, berubah beraturan, gaya, massa, dan aplikasi seperti perhitungan kecepatan kendaraan atau gerak proyektil.', progress: 0 }
        ]
    },
    '11': {
        'kimia': [
            { id: 'stoikiometri', title: 'Stoikiometri', image: './assets/images/image-stoikiometri.jpg', desc: 'Kalkulasi jumlah zat! Ini melibatkan mol, persamaan reaksi, yield, dan perhitungan stoichiometri dalam reaksi kimia industri atau laboratorium.', progress: 0 }
        ],
        'fisika': [
            { id: 'energi', title: 'Energi', image: './assets/images/image-energi.jpg', desc: 'Pelajari energi kinetik! Topik ini membahas energi potensial, konservasi energi, kerja, daya, dan aplikasi dalam mesin atau sistem fisika seperti pendulum.', progress: 0 }
        ]
    },
    '12': {
        'kimia': [
            { id: 'polimer', title: 'Polimer', image: './assets/images/image-polimer.jpg', desc: 'Pelajari bahan polimer! Ini termasuk polimerisasi, jenis polimer seperti plastik, karet, dan aplikasi dalam industri, lingkungan, dan teknologi biomedis.', progress: 0 }
        ],
        'fisika': [
            { id: 'listrik', title: 'Listrik', image: './assets/images/image-listrik.jpg', desc: 'Pelajari rangkaian listrik! Topik ini mencakup arus, tegangan, hambatan, hukum Ohm, Kirchhoff, dan aplikasi seperti sirkuit elektronik atau distribusi listrik.', progress: 0 }
        ]
    }
};

window.onload = function () {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
};

function toggleLevel(element) {
    console.log('Toggling level:', element.textContent);
    element.classList.toggle('open');
    const subLevel = element.nextElementSibling;
    if (subLevel) subLevel.classList.toggle('show');
}

function toggleTopic(element) {
    console.log('Toggling topic:', element.textContent);
    element.classList.toggle('open');
    const topics = element.nextElementSibling;
    if (topics) topics.classList.toggle('show');
}

function changeTopic(topikId) {
    const currentPath = window.location.pathname;
    console.log('Changing topic to:', topikId, 'from:', currentPath);
    if (currentPath.includes('modul.html')) {
        window.location.href = `./modul.html?topic=${topikId}`;
    } else {
        window.location.href = `./topik.html?topic=${topikId}`;
    }
}

function renderTopicContent() {
    console.log('renderTopicContent running for:', window.location.pathname);
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('topic') || 'asam-basa';
    let topik = null;
    let category = '';
    let kelas = '';
    for (let k in data) {
        for (let mp in data[k]) {
            topik = data[k][mp].find(t => t.id === topicId);
            if (topik) {
                category = mp;
                kelas = k;
                break;
            }
        }
        if (topik) break;
    }

    if (window.location.pathname.includes('topik.html') || window.location.pathname.includes('start-praktikum.html') || window.location.pathname.includes('modul.html')) {
        const levels = document.querySelectorAll('.level');
        levels.forEach(level => {
            level.classList.remove('open');
            const subLevel = level.nextElementSibling;
            if (subLevel) {
                subLevel.classList.remove('show');
                const mataPelajaran = subLevel.querySelectorAll('.mata-pelajaran');
                mataPelajaran.forEach(mp => {
                    mp.classList.remove('open');
                    const topics = mp.nextElementSibling;
                    if (topics) {
                        topics.classList.remove('show');
                        const topicElements = topics.querySelectorAll('.topic');
                        topicElements.forEach(topic => {
                            topic.classList.remove('active');
                        });
                    }
                });
            }
        });

        if (topik) {
            levels.forEach(level => {
                const levelText = level.textContent.replace(/▶\s*/, '').trim().toLowerCase();
                const targetLevel = `kelas ${kelas}`.toLowerCase();
                if (levelText === targetLevel) {
                    level.classList.add('open');
                    const subLevel = level.nextElementSibling;
                    if (subLevel) {
                        subLevel.classList.add('show');
                        const mataPelajaran = subLevel.querySelectorAll('.mata-pelajaran');
                        mataPelajaran.forEach(mp => {
                            const mpText = mp.textContent.replace(/▶\s*/, '').trim().toLowerCase();
                            if (mpText === category.toLowerCase()) {
                                mp.classList.add('open');
                                const topics = mp.nextElementSibling;
                                if (topics) {
                                    topics.classList.add('show');
                                    const topicElements = topics.querySelectorAll('.topic');
                                    topicElements.forEach(topic => {
                                        const topicText = topic.textContent.trim().toLowerCase();
                                        if (topicText === topik.title.toLowerCase()) {
                                            topic.classList.add('active');
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    }

    if (window.location.pathname.includes('topik.html')) {
        if (topik) {
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

            const quickButtons = document.getElementById('quick-buttons');
            if (quickButtons) {
                if (topik.id === 'asam-basa') {
                    quickButtons.innerHTML = `
                        <button class="modul normal" onclick="window.location.href='./modul.html'"><span>📖</span> Modul</button>
                        <button class="pre-lab normal" onclick="window.location.href='./start-praktikum.html'"><span>📚</span> Pre-Lab</button>
                        <button class="praktikum normal" onclick="window.location.href='./start-praktikum.html'"><span>🧪</span> Praktikum</button>
                        <button class="tugas-kelompok normal" onclick="window.location.href='./kelompok.html'"><span>🤝</span> Tugas Kelompok</button>
                    `;
                } else {
                    quickButtons.innerHTML = '<div class="coming-soon">COMING SOON</div>';
                }
            } else {
                console.error('Quick buttons not found');
            }
        } else {
            console.error(`Topic with ID ${topicId} not found`);
        }
    }
}

function filterSubject(subject) {
    const levels = document.querySelectorAll('.level');
    levels.forEach(level => {
        const subLevel = level.nextElementSibling;
        const mataPelajaran = subLevel.querySelectorAll('.mata-pelajaran');
        mataPelajaran.forEach(mp => {
            const mpText = mp.textContent.replace(/▶\s*/, '').trim().toLowerCase();
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

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

function renderProgress() {
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

    ['10', '11', '12'].forEach(kelas => {
        const progressCircle = document.getElementById(`progress-kelas-${kelas}`);
        if (progressCircle) {
            const progress = classProgress[kelas] || 0;
            progressCircle.style.background = `conic-gradient(#2e7d32 ${progress}%, #ccc ${progress}% 100%)`;
            progressCircle.textContent = `${progress}%`;
        }
    });

    const topicGridContainer = document.getElementById('topic-grid-container');
    if (topicGridContainer) {
        topicGridContainer.innerHTML = '';
        for (let kelas in data) {
            for (let mp in data[kelas]) {
                data[kelas][mp].forEach(topic => {
                    const topicCard = document.createElement('div');
                    topicCard.className = 'topic-card';
                    topicCard.setAttribute('onclick', `window.location.href = './topik.html?topic=${topic.id}'`);
                    topicCard.innerHTML = `
                        <img src="${topic.image}" alt="${topic.title}">
                        <h3>${topic.title}</h3>
                        <div class="category">${mp.charAt(0).toUpperCase() + mp.slice(1)}</div>
                        <p class="short-desc">${truncateText(topic.desc, 100)}</p>
                        <div class="progress-circle" id="progress-${topic.id}">${topic.progress}%</div>
                    `;
                    topicGridContainer.appendChild(topicCard);
                    const progressCircle = document.getElementById(`progress-${topic.id}`);
                    if (progressCircle) {
                        progressCircle.style.background = `conic-gradient(#2e7d32 ${topic.progress}%, #ccc ${topic.progress}% 100%)`;
                    }
                });
            }
        }
    }
}

function renderProfile() {
    const completedTopics = document.getElementById('completed-topics');
    const inProgressTopics = document.getElementById('inprogress-topics-container');
    if (completedTopics && inProgressTopics) {
        const completed = [];
        const inProgress = [];

        for (let kelas in data) {
            for (let mp in data[kelas]) {
                data[kelas][mp].forEach(topic => {
                    if (topic.progress === 100) {
                        completed.push({ ...topic, category: mp });
                    } else if (topic.progress > 0 && topic.progress < 100) {
                        inProgress.push({ ...topic, category: mp });
                    }
                });
            }
        }

        if (completed.length === 0) {
            completedTopics.textContent = 'Belum ada topik yang selesai.';
        } else {
            completedTopics.innerHTML = '';
            completed.forEach(topic => {
                const topicCard = document.createElement('div');
                topicCard.className = 'topic-card';
                topicCard.setAttribute('onclick', `window.location.href = './topik.html?topic=${topic.id}'`);
                topicCard.innerHTML = `
                    <img src="${topic.image}" alt="${topic.title}">
                    <h3>${topic.title}</h3>
                    <div class="category">${topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}</div>
                    <p class="short-desc">${truncateText(topic.desc, 100)}</p>
                    <div class="progress-circle" id="progress-${topic.id}">${topic.progress}%</div>
                `;
                completedTopics.appendChild(topicCard);
                const progressCircle = document.getElementById(`progress-${topic.id}`);
                if (progressCircle) {
                    progressCircle.style.background = `conic-gradient(#2e7d32 ${topik.progress}%, #ccc ${topik.progress}% 100%)`;
                }
            });
        }

        if (inProgress.length === 0) {
            inProgressTopics.textContent = 'Belum ada topik yang sedang dijalani.';
        } else {
            inProgressTopics.innerHTML = '';
            inProgress.forEach(topic => {
                const topicCard = document.createElement('div');
                topicCard.className = 'topic-card';
                topicCard.setAttribute('onclick', `window.location.href = './topik.html?topic=${topic.id}'`);
                topicCard.innerHTML = `
                    <img src="${topic.image}" alt="${topic.title}">
                    <h3>${topic.title}</h3>
                    <div class="category">${topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}</div>
                    <p class="short-desc">${truncateText(topic.desc, 100)}</p>
                    <div class="progress-circle" id="progress-${topic.id}">${topic.progress}%</div>
                `;
                inProgressTopics.appendChild(topicCard);
                const progressCircle = document.getElementById(`progress-${topic.id}`);
                if (progressCircle) {
                    progressCircle.style.background = `conic-gradient(#2e7d32 ${topik.progress}%, #ccc ${topik.progress}% 100%)`;
                }
            });
        }
    } else {
        console.error('Completed or in-progress topics elements not found');
    }
}

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

function highlightActiveNav() {
    console.log('highlightActiveNav running, currentPath:', window.location.pathname);

    // Handle desktop navbar
    const navLinks = document.querySelectorAll('.navbar a');
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('topic') || 'asam-basa';
    const currentPath = window.location.pathname.toLowerCase();

    navLinks.forEach(link => {
        link.classList.remove('active', 'disabled');
        const href = link.getAttribute('href').toLowerCase().replace(/^\.\//, '');
        if (href !== 'beranda.html') {
            if (topicId !== 'asam-basa') {
                link.classList.add('disabled');
            } else {
                if (currentPath.includes('start-praktikum.html') || currentPath.includes('praktikum.html')) {
                    if (href === 'start-praktikum.html') {
                        link.classList.add('active');
                    }
                } else if (currentPath.includes('topik.html') && href === 'topik.html') {
                    link.classList.add('active');
                } else if (currentPath.includes('modul.html') && href === 'modul.html') {
                    link.classList.add('active');
                }
            }
        }
    });

    // Handle mobile sidebar navigation
    const mobileNavItems = document.querySelectorAll('.mobile-nav .nav-item');
    mobileNavItems.forEach(item => {
        item.classList.remove('active', 'disabled');

        // Check which page we're on and set active accordingly
        if (currentPath.includes('beranda.html')) {
            if (item.textContent.trim().includes('Beranda')) {
                item.classList.add('active');
            }
        } else if (currentPath.includes('topik.html')) {
            if (item.textContent.trim().includes('Topik')) {
                item.classList.add('active');
            }
        } else if (currentPath.includes('modul.html')) {
            if (item.textContent.trim().includes('Modul')) {
                item.classList.add('active');
            }
        } else if (currentPath.includes('start-praktikum.html') || currentPath.includes('praktikum.html')) {
            if (item.textContent.trim().includes('Praktikum')) {
                item.classList.add('active');
            }
        } else if (currentPath.includes('kelompok.html')) {
            if (item.textContent.trim().includes('Tugas Kelompok')) {
                item.classList.add('active');
            }
        }

        // Handle disabled states
        if (topicId !== 'asam-basa') {
            if (item.textContent.trim().includes('Modul') ||
                item.textContent.trim().includes('Praktikum') ||
                item.textContent.trim().includes('Tugas Kelompok')) {
                item.classList.add('disabled');
            }
        }
    });
}

function renderModulContent(type) {
    console.log('renderModulContent running, type:', type);
    const contentCard = document.getElementById('content-card');
    if (!contentCard) {
        console.error('Content card not found');
        return;
    }

    const headerBoxes = document.querySelectorAll('.header-box');
    headerBoxes.forEach(box => box.classList.remove('active'));
    const clickedBox = document.querySelector(`.header-box.${type}`);
    if (clickedBox) {
        clickedBox.classList.add('active');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('topic') || 'asam-basa';

    if (type === 'modul') {
        if (topicId === 'asam-basa') {
            // Check if it's mobile device (more reliable detection)
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

            if (isMobile) {
                // Mobile-friendly PDF display
                contentCard.innerHTML = `
                    <div class="mobile-pdf-container">
                        <div class="pdf-info">
                            <h3>📄 Modul Asam Basa</h3>
                            <p>Untuk pengalaman terbaik membaca modul, silakan download PDF atau buka di desktop.</p>
                        </div>
                        <div class="pdf-actions">
                            <a href="./data/MODUL ASAM BASA_merged.pdf" target="_blank" class="pdf-button view-pdf">
                                👁️ Lihat PDF
                            </a>
                            <a href="./data/MODUL ASAM BASA_merged.pdf" download class="pdf-button download-pdf">
                                📥 Download PDF
                            </a>
                        </div>
                        <div class="pdf-fallback">
                            <iframe src="./data/MODUL ASAM BASA_merged.pdf" 
                                    width="100%" 
                                    height="500px" 
                                    style="border: none; border-radius: 8px;">
                                <p>Browser Anda tidak mendukung tampilan PDF. 
                                   <a href="./data/MODUL ASAM BASA_merged.pdf" target="_blank">Klik di sini untuk membuka PDF</a>
                                </p>
                            </iframe>
                        </div>
                    </div>
                `;
            } else {
                // Desktop PDF display - use embed
                contentCard.innerHTML = `
                    <embed src="./data/MODUL ASAM BASA_merged.pdf" type="application/pdf" width="100%" height="600px" style="border-radius: 8px;">
                `;
            }
        } else {
            contentCard.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <p>Modul untuk topik ini belum tersedia. Silakan pilih topik lain.</p>
                </div>
            `;
        }
    } else if (type === 'video') {
        contentCard.innerHTML = `
            <video controls width="100%" height="400px" style="border-radius: 8px;">
                <source src="./assets/videos/VideoModul.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
}

// Sample data for topics
const topicsData = {
    completed: [
        { title: 'Pengenalan Alat Lab', subject: 'Kimia', progress: 100 },
        { title: 'Simbol Bahaya', subject: 'Kimia', progress: 100 }
    ],
    inProgress: [
        { title: 'Asam Basa', subject: 'Kimia', progress: 65 },
        { title: 'Redoks', subject: 'Kimia', progress: 30 }
    ]
};

// Function to populate topics
function populateTopics() {
    const completedContainer = document.querySelector('#completed-topics .grid-container');
    const inProgressContainer = document.querySelector('#inprogress-topics-container');

    if (!completedContainer || !inProgressContainer) return;

    // Calculate overall progress
    const completedProgress = 100;
    const inProgressAvg = topicsData.inProgress.reduce((acc, curr) => acc + curr.progress, 0) / topicsData.inProgress.length;

    // Update progress circles
    updateProgressCircle('completed-topics', completedProgress);
    updateProgressCircle('inprogress-topics', inProgressAvg);

    // Populate completed topics
    completedContainer.innerHTML = topicsData.completed.map(topic => `
        <div class="topic-card">
            <h4>${topic.title}</h4>
            <p>${topic.subject}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${topic.progress}%"></div>
            </div>
            <span class="progress-text">${topic.progress}%</span>
        </div>
    `).join('');

    // Populate in-progress topics
    inProgressContainer.innerHTML = topicsData.inProgress.map(topic => `
        <div class="topic-card">
            <h4>${topic.title}</h4>
            <p>${topic.subject}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${topic.progress}%"></div>
            </div>
            <span class="progress-text">${topic.progress}%</span>
        </div>
    `).join('');
}

// Function to update progress circles
function updateProgressCircle(sectionId, percentage) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const progressCircle = section.querySelector('.progress-circle');
    if (progressCircle) {
        progressCircle.style.background = `conic-gradient(#2e7d32 ${percentage}%, #ccc 0%)`;
        progressCircle.textContent = `${Math.round(percentage)}%`;
    }
}

// Call populateTopics when page loads
document.addEventListener('DOMContentLoaded', populateTopics);

document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();
    if (window.location.pathname.includes('beranda.html')) {
        renderProgress();
    } else if (window.location.pathname.includes('topik.html') || window.location.pathname.includes('start-praktikum.html') || window.location.pathname.includes('modul.html')) {
        renderTopicContent();
        if (window.location.pathname.includes('modul.html')) {
            renderModulContent('modul');
        }
    } else if (window.location.pathname.includes('profile.html')) {
        renderProfile();
    }
});

// Add to your main.js file
function toggleMobileMenu() {
    const aside = document.querySelector('aside');
    aside.classList.toggle('show');
}

// Add click handler to close menu when clicking outside
document.addEventListener('click', function (event) {
    const aside = document.querySelector('aside');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    if (window.innerWidth <= 768 &&
        !aside.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        aside.classList.contains('show')) {
        aside.classList.remove('show');
    }
});

// Add this new function
function filterTopics(filter) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.filter-btn[onclick*='${filter}']`).classList.add('active');

    const completedSection = document.getElementById('completed-topics');
    const inProgressSection = document.getElementById('inprogress-topics');

    switch (filter) {
        case 'completed':
            completedSection.style.display = 'block';
            inProgressSection.style.display = 'none';
            break;
        case 'ongoing':
            completedSection.style.display = 'none';
            inProgressSection.style.display = 'block';
            break;
        default:
            completedSection.style.display = 'block';
            inProgressSection.style.display = 'block';
    }
}

// ============================================
// GURU DASHBOARD FUNCTIONS
// ============================================

// Data topik guru (sama seperti data siswa tapi dengan info tambahan)
const topicsDataGuru = {
    '10': {
        'kimia': [
            { id: 'asam-basa', title: 'Asam Basa', image: './assets/images/image-asam-basa.jpg', students: 45, completed: 38, avgScore: 85 },
            { id: 'redoks', title: 'Redoks', image: './assets/images/image_redoks.jpg', students: 0, completed: 0, avgScore: 0 }
        ],
        'fisika': [
            { id: 'gerak', title: 'Gerak Lurus', image: './assets/images/image-gerak-lurus.jpg', students: 0, completed: 0, avgScore: 0 }
        ]
    },
    '11': {
        'kimia': [
            { id: 'stoikiometri', title: 'Stoikiometri', image: './assets/images/image-stoikiometri.jpg', students: 0, completed: 0, avgScore: 0 }
        ],
        'fisika': [
            { id: 'energi', title: 'Energi', image: './assets/images/image-energi.jpg', students: 0, completed: 0, avgScore: 0 }
        ]
    },
    '12': {
        'kimia': [
            { id: 'polimer', title: 'Polimer', image: './assets/images/image-polimer.jpg', students: 0, completed: 0, avgScore: 0 }
        ],
        'fisika': [
            { id: 'listrik', title: 'Listrik', image: './assets/images/image-listrik.jpg', students: 0, completed: 0, avgScore: 0 }
        ]
    }
};

let currentFilterGuru = 'all';

function renderTopicsGuru(filter = 'all') {
    const container = document.getElementById('topics-container');
    if (!container) return; // Tidak di halaman guru

    container.innerHTML = '';

    let totalTopics = 0;
    let hasTopics = false;

    for (let kelas in topicsDataGuru) {
        for (let subject in topicsDataGuru[kelas]) {
            topicsDataGuru[kelas][subject].forEach(topic => {
                totalTopics++;

                // Apply filter
                if (filter !== 'all') {
                    if (filter === kelas || filter === subject) {
                        // Show this topic
                    } else {
                        return; // Skip this topic
                    }
                }

                hasTopics = true;
                const completionRate = Math.round((topic.completed / topic.students) * 100);

                const topicCard = document.createElement('div');
                topicCard.className = 'topic-card-admin';
                topicCard.setAttribute('data-kelas', kelas);
                topicCard.setAttribute('data-subject', subject);

                topicCard.innerHTML = `
                    <img src="${topic.image}" alt="${topic.title}">
                    <div class="topic-info">
                        <h3>${topic.title}</h3>
                        <div class="topic-meta">
                            <span class="meta-badge kelas">Kelas ${kelas}</span>
                            <span class="meta-badge subject">${subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
                        </div>
                    </div>
                    <div class="topic-stats">
                        <div class="topic-stat-item">
                            <div class="value">${topic.students}</div>
                            <div class="label">Siswa</div>
                        </div>
                        <div class="topic-stat-item">
                            <div class="value">${completionRate}%</div>
                            <div class="label">Selesai</div>
                        </div>
                        <div class="topic-stat-item">
                            <div class="value">${topic.avgScore}</div>
                            <div class="label">Rata-rata</div>
                        </div>
                    </div>
                    <div class="topic-actions">
                        <button class="btn-edit" onclick="editTopicGuru('${topic.id}', '${kelas}', '${subject}')">
                            <span>✏️</span> Edit
                        </button>
                        <button class="btn-delete" onclick="deleteTopicGuru('${topic.id}', '${topic.title}')">
                            <span>🗑️</span> Hapus
                        </button>
                    </div>
                `;

                container.appendChild(topicCard);
            });
        }
    }

    // Update total topics counter
    const totalTopicsEl = document.getElementById('total-topics');
    if (totalTopicsEl) {
        totalTopicsEl.textContent = totalTopics;
    }

    if (!hasTopics) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <div class="empty-state-text">Tidak ada topik yang sesuai dengan filter</div>
            </div>
        `;
    }
}

function filterTopicsGuru(filter) {
    currentFilterGuru = filter;

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    renderTopicsGuru(filter);
}

function filterByKelasGuru(kelas) {
    const filterTab = Array.from(document.querySelectorAll('.filter-tab')).find(tab =>
        tab.textContent.includes(`Kelas ${kelas}`)
    );
    if (filterTab) {
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        filterTab.classList.add('active');
    }
    renderTopicsGuru(kelas);
}

function filterBySubjectGuru(subject) {
    const filterTab = Array.from(document.querySelectorAll('.filter-tab')).find(tab =>
        tab.textContent.toLowerCase().includes(subject)
    );
    if (filterTab) {
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        filterTab.classList.add('active');
    }
    renderTopicsGuru(subject);
}

function editTopicGuru(topicId, kelas, subject) {
    alert(`Edit topik: ${topicId}\nKelas: ${kelas}\nMata Pelajaran: ${subject}\n\nFitur edit akan membuka form untuk mengubah detail topik.`);
    // Di implementasi nyata, ini akan membuka modal atau halaman edit
}

function deleteTopicGuru(topicId, topicTitle) {
    if (confirm(`Apakah Anda yakin ingin menghapus topik "${topicTitle}"?\n\nTindakan ini tidak dapat dibatalkan.`)) {
        alert(`Topik "${topicTitle}" berhasil dihapus!`);
        // Di implementasi nyata, ini akan menghapus topik dari database
        // dan merender ulang daftar topik
    }
}

function createNewTopicGuru() {
    alert('Membuka form pembuatan topik baru...\n\nForm akan meminta:\n- Judul topik\n- Kelas\n- Mata pelajaran\n- Deskripsi\n- Gambar\n- Konten modul');
    // Di implementasi nyata, ini akan membuka modal atau halaman untuk membuat topik baru
}

// Initialize guru dashboard when DOM is ready
if (document.addEventListener) {
    const originalDOMContentLoaded = document.addEventListener;
    document.addEventListener('DOMContentLoaded', function () {
        // Check if we're on guru dashboard page
        if (window.location.pathname.includes('beranda-guru.html') ||
            window.location.pathname.includes('dashboard-guru.html')) {
            renderTopicsGuru('all');
        }
    });
}