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

const notifications = [
    'Quiz Asam Basa besok jam 08.00!',
    'Tugas kelompok harus selesai minggu ini.'
];

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
                        <button class="pre-lab normal"><span>📚</span> Pre-Lab</button>
                        <button class="quiz normal"><span>❓</span> Quiz</button>
                        <button class="praktikum normal" onclick="window.location.href='./start-praktikum.html'"><span>🧪</span> Praktikum</button>
                        <button class="tugas-kelompok disabled"><span>🤝</span> Tugas Kelompok</button>
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
    const navLinks = document.querySelectorAll('.navbar a');
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('topic') || 'asam-basa';
    const currentPath = window.location.pathname.toLowerCase();

    navLinks.forEach(link => {
        link.classList.remove('active', 'disabled');
        const href = link.getAttribute('href').toLowerCase().replace(/^\.\//, '');
        if (href !== 'index.html') {
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
            contentCard.innerHTML = `
                <embed src="./data/MODUL ASAM BASA_merged.pdf" type="application/pdf" width="100%" height="600px">
            `;
        } else {
            contentCard.innerHTML = `
                <p>Modul untuk topik ini belum tersedia. Silakan pilih topik lain.</p>
            `;
        }
    } else if (type === 'video') {
        contentCard.innerHTML = `
            <video controls width="100%" height="400px">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
}

const notificationDropdown = document.getElementById('notification-dropdown');
if (notificationDropdown) {
    notificationDropdown.innerHTML = '<h3>Notifikasi</h3>' + notifications.map(n => `<p>${n}</p>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    highlightActiveNav();
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
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