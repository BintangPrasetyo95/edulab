<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Penilaian - EduLab Guru</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./assets/style.css">
    <link rel="shortcut icon" href="./assets/images/Logo.png" type="image/x-icon">
    <style>
    .penilaian-header {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(102, 126, 234, 0.1);
    }

    .penilaian-header h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 0.5rem;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .penilaian-header p {
        color: #667eea;
        font-weight: 600;
        font-size: 1rem;
    }

    .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(102, 126, 234, 0.1);
        text-align: center;
        transition: all 0.3s ease;
    }

    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .stat-card .icon {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
    }

    .stat-card .number {
        font-size: 2rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 0.3rem;
    }

    .stat-card .label {
        color: #666;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .filter-section {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(102, 126, 234, 0.1);
    }

    .filter-controls {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
    }

    .filter-controls select,
    .filter-controls input {
        padding: 0.7rem 1rem;
        border: 2px solid rgba(102, 126, 234, 0.2);
        border-radius: 10px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.9);
        transition: all 0.3s ease;
    }

    .filter-controls select:focus,
    .filter-controls input:focus {
        outline: none;
        border-color: rgba(102, 126, 234, 0.5);
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .btn-export {
        padding: 0.7rem 1.5rem;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #2e7d32, #1b5e20);
        color: white;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
    }

    .btn-export:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
    }

    .students-table-container {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(102, 126, 234, 0.1);
        overflow-x: auto;
    }

    .students-table-container h2 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 1.5rem;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .students-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 900px;
    }

    .students-table thead {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
    }

    .students-table th {
        padding: 1rem;
        text-align: left;
        font-weight: 700;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .students-table th:first-child {
        border-radius: 12px 0 0 0;
    }

    .students-table th:last-child {
        border-radius: 0 12px 0 0;
    }

    .students-table tbody tr {
        background: rgba(255, 255, 255, 0.9);
        border-bottom: 1px solid rgba(102, 126, 234, 0.1);
        transition: all 0.3s ease;
    }

    .students-table tbody tr:hover {
        background: rgba(102, 126, 234, 0.05);
        transform: scale(1.01);
    }

    .students-table td {
        padding: 1rem;
        color: #2c3e50;
    }

    .students-table input[type="number"] {
        width: 70px;
        padding: 0.5rem;
        border: 2px solid rgba(102, 126, 234, 0.2);
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        font-family: 'Montserrat', sans-serif;
    }

    .students-table input[type="number"]:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .status-badge {
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        display: inline-block;
    }

    .status-selesai {
        background: rgba(46, 125, 50, 0.15);
        color: #2e7d32;
    }

    .status-belum {
        background: rgba(211, 47, 47, 0.15);
        color: #d32f2f;
    }

    .status-progress {
        background: rgba(251, 140, 0, 0.15);
        color: #f57c00;
    }

    .btn-save {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .btn-save:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .nilai-total {
        font-weight: 700;
        font-size: 1.1rem;
        color: #2e7d32;
    }

    @media (max-width: 768px) {
        .penilaian-header h1 {
            font-size: 1.5rem;
        }

        .stats-cards {
            grid-template-columns: repeat(2, 1fr);
        }

        .filter-controls {
            flex-direction: column;
            align-items: stretch;
        }

        .filter-controls select,
        .filter-controls input,
        .btn-export {
            width: 100%;
        }

        .students-table-container {
            padding: 1rem;
        }
    }
    </style>
</head>

<body>
    <div class="loader">
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>
    <div class="bg-circle circle1"></div>
    <div class="bg-circle circle2"></div>

    <header>
        <div class="header-left">
            <img src="./assets/images/Logo.png" alt="Logo EduLab" onclick="window.location.href='./beranda-guru.html'">
            <h1 onclick="window.location.href='./beranda-guru.html'">EduLab - Guru</h1>
        </div>
        <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">☰</button>
        <nav class="navbar">
            <a href="./beranda-guru.html" class="normal">Beranda</a>
            <a href="./penilaian-guru.html" class="active">Penilaian Individu</a>
            <a href="./penilaian-kelompok-guru.html" class="normal">Penilaian Kelompok</a>
        </nav>
        <div class="header-right">
            <div class="notification" onclick="toggleNotification()">
                <span class="notification-icon">🔔</span>
                <div class="notification-dropdown" id="notification-dropdown">
                    <h3>Notifikasi</h3>
                </div>
            </div>
            <div class="profile" onclick="toggleProfile()">
                <img src="./assets/images/profile-picture.jpeg" alt="Profil">
                <span class="profile-icon">Pak Joko</span>
                <div class="profile-dropdown" id="profile-dropdown">
                    <p>Profil</p>
                    <p>Pengaturan</p>
                    <p onclick="window.location.href='./index.html'" class="logout">Log Out</p>
                </div>
            </div>
        </div>
    </header>
    <aside>
        <div class="sidebar-header">
            <img src="./assets/images/Logo.png" alt="Logo EduLab" onclick="window.location.href='./beranda-guru.html'">
            <h2 onclick="window.location.href='./beranda-guru.html'">EduLab</h2>
        </div>

        <div class="mobile-nav">
            <div class="nav-item" onclick="window.location.href='./beranda-guru.html'">
                🏠 Dashboard
            </div>
            <div class="nav-item">
                📊 Laporan Siswa
            </div>
            <div class="nav-item">
                👥 Manajemen Kelas
            </div>
            <div class="nav-item">
                📝 Quiz & Tugas
            </div>
        </div>

        <hr>

        <div class="level" onclick="toggleLevel(this)"><span class="arrow">▶</span> Manajemen Topik</div>
        <div class="sub-level">
            <div class="topic" onclick="window.location.href='./beranda-guru.html'">Kelas 10</div>
            <div class="topic" onclick="window.location.href='./beranda-guru.html'">Kelas 11</div>
            <div class="topic" onclick="window.location.href='./beranda-guru.html'">Kelas 12</div>
        </div>

        <div class="level" onclick="toggleLevel(this)"><span class="arrow">▶</span> Mata Pelajaran</div>
        <div class="sub-level">
            <div class="topic" onclick="window.location.href='./beranda-guru.html'">Kimia</div>
            <div class="topic" onclick="window.location.href='./beranda-guru.html'">Fisika</div>
        </div>
    </aside>

    <main>
        <div class="main-card">
            <div class="penilaian-header">
                <h1 id="topic-title">Penilaian: Asam Basa</h1>
                <p>Kelas 10 - Kimia</p>
            </div>

            <div class="stats-cards">
                <div class="stat-card">
                    <div class="icon">👥</div>
                    <div class="number" id="total-students">45</div>
                    <div class="label">Total Siswa</div>
                </div>
                <div class="stat-card">
                    <div class="icon">✅</div>
                    <div class="number" id="completed-students">38</div>
                    <div class="label">Sudah Dinilai</div>
                </div>
                <div class="stat-card">
                    <div class="icon">⭐</div>
                    <div class="number" id="avg-score">85</div>
                    <div class="label">Rata-rata Nilai</div>
                </div>
                <div class="stat-card">
                    <div class="icon">📈</div>
                    <div class="number" id="completion-rate">84%</div>
                    <div class="label">Tingkat Selesai</div>
                </div>
            </div>

            <div class="filter-section">
                <div class="filter-controls">
                    <select id="filter-status" onchange="filterStudents()">
                        <option value="all">Semua Status</option>
                        <option value="selesai">Sudah Dinilai</option>
                        <option value="belum">Belum Dinilai</option>
                    </select>
                    <input type="text" id="search-student" placeholder="Cari nama siswa..." oninput="searchStudent()">
                    <button class="btn-export" onclick="exportData()">
                        <span>📥</span> Export ke Excel
                    </button>
                </div>
            </div>

            <div class="students-table-container">
                <h2>Daftar Nilai Siswa</h2>
                <table class="students-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>NIS</th>
                            <th>Nama Siswa</th>
                            <th>Pre-Lab</th>
                            <th>Post-Lab</th>
                            <th>Tugas Kelompok</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="students-tbody">
                        <!-- Data akan diisi oleh JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <footer>
        <p>©2025 EduLab. All Rights Reserved.</p>
        <p style="font-size: 0.8rem; margin-top: 0.5rem;">
            Developed by NeoEngineer |
            <a href="https://wa.me/6282185168851" style="color: white;">Contact Us</a>
        </p>
    </footer>

    <script src="./assets/main.js"></script>
    <script>
    // Data siswa dummy
    const studentsData = [{
            nis: '1001',
            nama: 'Ahmad Fauzi',
            prelab: 85,
            praktikum: 88,
            kelompok: 90
        },
        {
            nis: '1002',
            nama: 'Siti Nurhaliza',
            prelab: 90,
            praktikum: 92,
            kelompok: 88
        },
        {
            nis: '1003',
            nama: 'Budi Santoso',
            prelab: 78,
            praktikum: 80,
            kelompok: 82
        },
        {
            nis: '1004',
            nama: 'Dewi Lestari',
            prelab: 95,
            praktikum: 93,
            kelompok: 95
        },
        {
            nis: '1005',
            nama: 'Rizki Ramadan',
            prelab: 82,
            praktikum: 85,
            kelompok: 80
        },
        {
            nis: '1006',
            nama: 'Putri Ayu',
            prelab: 88,
            praktikum: 90,
            kelompok: 87
        },
        {
            nis: '1007',
            nama: 'Andi Wijaya',
            prelab: 0,
            praktikum: 0,
            kelompok: 0
        },
        {
            nis: '1008',
            nama: 'Rina Marlina',
            prelab: 92,
            praktikum: 88,
            kelompok: 90
        },
        {
            nis: '1009',
            nama: 'Farhan Maulana',
            prelab: 0,
            praktikum: 0,
            kelompok: 0
        },
        {
            nis: '1010',
            nama: 'Lina Anggraini',
            prelab: 87,
            praktikum: 89,
            kelompok: 85
        }
    ];

    function renderStudents(data = studentsData) {
        const tbody = document.getElementById('students-tbody');
        tbody.innerHTML = '';

        data.forEach((student, index) => {
            const total = Math.round((student.prelab + student.praktikum + student.kelompok) / 3);
            const status = total > 0 ? 'selesai' : 'belum';
            const statusText = total > 0 ? 'Sudah Dinilai' : 'Belum Dinilai';
            const statusClass = total > 0 ? 'status-selesai' : 'status-belum';

            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${student.nis}</td>
                    <td>${student.nama}</td>
                    <td><input type="number" min="0" max="100" value="${student.prelab}" 
                        onchange="updateScore('${student.nis}', 'prelab', this.value)"></td>
                    <td><input type="number" min="0" max="100" value="${student.praktikum}" 
                        onchange="updateScore('${student.nis}', 'praktikum', this.value)"></td>
                    <td><input type="number" min="0" max="100" value="${student.kelompok}" 
                        onchange="updateScore('${student.nis}', 'kelompok', this.value)"></td>
                    <td class="nilai-total">${total}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td><button class="btn-save" onclick="saveScore('${student.nis}')">Simpan</button></td>
                `;
            tbody.appendChild(row);
        });

        updateStats();
    }

    function updateScore(nis, field, value) {
        const student = studentsData.find(s => s.nis === nis);
        if (student) {
            student[field] = parseInt(value) || 0;
        }
    }

    function saveScore(nis) {
        const student = studentsData.find(s => s.nis === nis);
        if (student) {
            alert(
                `Nilai ${student.nama} berhasil disimpan!\n\nPre-Lab: ${student.prelab}\nPraktikum: ${student.praktikum}\nTugas Kelompok: ${student.kelompok}`);
            renderStudents();
        }
    }

    function updateStats() {
        const totalStudents = studentsData.length;
        const completedStudents = studentsData.filter(s => s.prelab > 0 || s.praktikum > 0 || s.kelompok > 0).length;
        const avgScore = Math.round(studentsData.reduce((acc, s) => {
            const total = (s.prelab + s.praktikum + s.kelompok) / 3;
            return acc + total;
        }, 0) / totalStudents);
        const completionRate = Math.round((completedStudents / totalStudents) * 100);

        document.getElementById('total-students').textContent = totalStudents;
        document.getElementById('completed-students').textContent = completedStudents;
        document.getElementById('avg-score').textContent = avgScore;
        document.getElementById('completion-rate').textContent = completionRate + '%';
    }

    function filterStudents() {
        const filter = document.getElementById('filter-status').value;
        let filtered = studentsData;

        if (filter === 'selesai') {
            filtered = studentsData.filter(s => s.prelab > 0 || s.praktikum > 0 || s.kelompok > 0);
        } else if (filter === 'belum') {
            filtered = studentsData.filter(s => s.prelab === 0 && s.praktikum === 0 && s.kelompok === 0);
        }

        renderStudents(filtered);
    }

    function searchStudent() {
        const query = document.getElementById('search-student').value.toLowerCase();
        const filtered = studentsData.filter(s =>
            s.nama.toLowerCase().includes(query) || s.nis.includes(query)
        );
        renderStudents(filtered);
    }

    function exportData() {
        alert(
            'Fitur export ke Excel akan segera tersedia!\n\nData akan diekspor dalam format:\n- Nama file: Penilaian_AsamBasa_2025.xlsx\n- Isi: NIS, Nama, Pre-Lab, Praktikum, Tugas Kelompok, Total');
    }

    // Get topic from URL
    const urlParams = new URLSearchParams(window.location.search);
    const topicId = urlParams.get('topic') || 'asam-basa';

    // Update title based on topic
    const topicTitles = {
        'asam-basa': 'Asam Basa',
        'redoks': 'Redoks',
        'gerak': 'Gerak Lurus',
        'stoikiometri': 'Stoikiometri',
        'energi': 'Energi',
        'polimer': 'Polimer',
        'listrik': 'Listrik'
    };

    document.getElementById('topic-title').textContent = `Penilaian: ${topicTitles[topicId] || 'Topik'}`;

    // Initialize
    window.onload = function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
        renderStudents();
    };
    </script>
</body>

</html>