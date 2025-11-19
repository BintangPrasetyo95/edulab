<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Penilaian Kelompok - EduLab Guru</title>
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

        .kelompok-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .kelompok-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .kelompok-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .kelompok-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .kelompok-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(102, 126, 234, 0.1);
        }

        .kelompok-header h3 {
            font-size: 1.3rem;
            font-weight: 700;
            color: #2c3e50;
            display: flex;
            align-items: center;
            gap: 0.5rem;
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

        .anggota-section {
            margin-bottom: 1.5rem;
        }

        .anggota-section h4 {
            font-size: 0.9rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .anggota-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .anggota-item {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.6rem;
            background: rgba(102, 126, 234, 0.05);
            border-radius: 8px;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .anggota-item:hover {
            background: rgba(102, 126, 234, 0.1);
            transform: translateX(5px);
        }

        .anggota-item span:first-child {
            font-weight: 700;
            color: #667eea;
            min-width: 60px;
        }

        .nilai-section {
            background: rgba(102, 126, 234, 0.05);
            border-radius: 12px;
            padding: 1rem;
            margin-bottom: 1rem;
        }

        .nilai-section h4 {
            font-size: 0.9rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 0.8rem;
        }

        .nilai-input-group {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .nilai-input-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }

        .nilai-input-item label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #555;
            flex: 1;
        }

        .nilai-input-item input {
            width: 80px;
            padding: 0.5rem;
            border: 2px solid rgba(102, 126, 234, 0.2);
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
            font-family: 'Montserrat', sans-serif;
        }

        .nilai-input-item input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .nilai-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem;
            background: rgba(46, 125, 50, 0.1);
            border-radius: 8px;
            margin-top: 1rem;
            border: 2px solid rgba(46, 125, 50, 0.2);
        }

        .nilai-total span:first-child {
            font-weight: 700;
            color: #2c3e50;
        }

        .nilai-total span:last-child {
            font-size: 1.3rem;
            font-weight: 700;
            color: #2e7d32;
        }

        .btn-save {
            width: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 0.8rem;
            border-radius: 10px;
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .btn-save:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-detail {
            width: 100%;
            background: rgba(102, 126, 234, 0.1);
            color: #667eea;
            border: 2px solid rgba(102, 126, 234, 0.2);
            padding: 0.7rem;
            border-radius: 10px;
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .btn-detail:hover {
            background: rgba(102, 126, 234, 0.2);
            transform: translateY(-2px);
        }

        /* Guru Navigation Tabs */
        .guru-nav-tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            padding: 1rem 2rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            position: sticky;
            top: 4rem;
            z-index: 9;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .guru-nav-tabs .tab-item {
            flex: 1;
            max-width: 250px;
            padding: 1rem 2rem;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            text-decoration: none;
            color: #2c3e50;
            font-weight: 600;
            font-size: 1rem;
            text-align: center;
            transition: all 0.3s ease;
            border: 2px solid rgba(102, 126, 234, 0.1);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .guru-nav-tabs .tab-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            background: rgba(102, 126, 234, 0.1);
            border-color: rgba(102, 126, 234, 0.3);
        }

        .guru-nav-tabs .tab-item.active {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-color: transparent;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            transform: translateY(-3px);
        }

        .guru-nav-tabs .tab-item span {
            font-size: 1.2rem;
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

            .kelompok-grid {
                grid-template-columns: 1fr;
            }

            .guru-nav-tabs {
                flex-direction: column;
                padding: 1rem;
                gap: 0.75rem;
                top: 3.5rem;
            }

            .guru-nav-tabs .tab-item {
                max-width: 100%;
                padding: 0.8rem 1.5rem;
                font-size: 0.9rem;
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
            <a href="./penilaian-guru.html" class="normal">Penilaian Individu</a>
            <a href="./penilaian-kelompok-guru.html" class="active">Penilaian Kelompok</a>
        </nav>
        <div class="header-right">
            <div class="notification" onclick="toggleNotification()">
                <span class="notification-icon">🔔</span>
                <div class="notification-dropdown" id="notification-dropdown">
                    <h3>Notifikasi</h3>
                    <p>Kelompok 3 telah submit laporan</p>
                    <p>Kelompok 1 menunggu penilaian</p>
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
                <h1 id="topic-title">Penilaian Kelompok: Asam Basa</h1>
                <p>Kelas 10 - Kimia</p>
            </div>

            <div class="stats-cards">
                <div class="stat-card">
                    <div class="icon">👥</div>
                    <div class="number" id="total-kelompok">9</div>
                    <div class="label">Total Kelompok</div>
                </div>
                <div class="stat-card">
                    <div class="icon">✅</div>
                    <div class="number" id="completed-kelompok">6</div>
                    <div class="label">Sudah Dinilai</div>
                </div>
                <div class="stat-card">
                    <div class="icon">⭐</div>
                    <div class="number" id="avg-score">87</div>
                    <div class="label">Rata-rata Nilai</div>
                </div>
                <div class="stat-card">
                    <div class="icon">📈</div>
                    <div class="number" id="completion-rate">67%</div>
                    <div class="label">Tingkat Selesai</div>
                </div>
            </div>

            <div class="filter-section">
                <div class="filter-controls">
                    <select id="filter-status" onchange="filterKelompok()">
                        <option value="all">Semua Status</option>
                        <option value="selesai">Sudah Dinilai</option>
                        <option value="belum">Belum Dinilai</option>
                    </select>
                    <input type="text" id="search-kelompok" placeholder="Cari kelompok atau anggota..."
                        oninput="searchKelompok()">
                    <button class="btn-export" onclick="exportData()">
                        <span>📥</span> Export ke Excel
                    </button>
                </div>
            </div>

            <div class="kelompok-grid" id="kelompok-container">
                <!-- Data akan diisi oleh JavaScript -->
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
        // Data kelompok dummy
        const kelompokData = [
            {
                id: 1,
                nama: 'Kelompok 1',
                anggota: ['Ahmad Fauzi (1001)', 'Siti Nurhaliza (1002)', 'Budi Santoso (1003)', 'Dewi Lestari (1004)', 'Rizki Ramadan (1005)'],
                laporan: 88,
                presentasi: 85,
                kerjasama: 90
            },
            {
                id: 2,
                nama: 'Kelompok 2',
                anggota: ['Putri Ayu (1006)', 'Andi Wijaya (1007)', 'Rina Marlina (1008)', 'Farhan Maulana (1009)', 'Lina Anggraini (1010)'],
                laporan: 92,
                presentasi: 88,
                kerjasama: 87
            },
            {
                id: 3,
                nama: 'Kelompok 3',
                anggota: ['Dinda Putri (1011)', 'Eko Prasetyo (1012)', 'Fitri Amalia (1013)', 'Gilang Ramadhan (1014)', 'Hana Safitri (1015)'],
                laporan: 85,
                presentasi: 90,
                kerjasama: 88
            },
            {
                id: 4,
                nama: 'Kelompok 4',
                anggota: ['Irfan Hakim (1016)', 'Julia Permata (1017)', 'Kevin Ananda (1018)', 'Laila Sari (1019)', 'Made Sutrisna (1020)'],
                laporan: 0,
                presentasi: 0,
                kerjasama: 0
            },
            {
                id: 5,
                nama: 'Kelompok 5',
                anggota: ['Nadia Fauzia (1021)', 'Omar Abdullah (1022)', 'Putri Maharani (1023)', 'Qori Azzahra (1024)', 'Raka Pradana (1025)'],
                laporan: 90,
                presentasi: 92,
                kerjasama: 91
            },
            {
                id: 6,
                nama: 'Kelompok 6',
                anggota: ['Salsabila Rahma (1026)', 'Taufik Hidayat (1027)', 'Umi Kulsum (1028)', 'Vino Bastian (1029)', 'Winda Cantika (1030)'],
                laporan: 87,
                presentasi: 86,
                kerjasama: 89
            },
            {
                id: 7,
                nama: 'Kelompok 7',
                anggota: ['Xavier Hakim (1031)', 'Yuni Shara (1032)', 'Zahra Amelia (1033)', 'Akbar Maulana (1034)', 'Bella Safira (1035)'],
                laporan: 0,
                presentasi: 0,
                kerjasama: 0
            },
            {
                id: 8,
                nama: 'Kelompok 8',
                anggota: ['Cahya Purnama (1036)', 'Dian Sastro (1037)', 'Eka Wijaya (1038)', 'Fina Lestari (1039)', 'Galih Pratama (1040)'],
                laporan: 86,
                presentasi: 84,
                kerjasama: 85
            },
            {
                id: 9,
                nama: 'Kelompok 9',
                anggota: ['Hendra Gunawan (1041)', 'Indah Permata (1042)', 'Joko Susilo (1043)', 'Karina Salsabila (1044)', 'Lukman Hakim (1045)'],
                laporan: 0,
                presentasi: 0,
                kerjasama: 0
            }
        ];

        function renderKelompok(data = kelompokData) {
            const container = document.getElementById('kelompok-container');
            container.innerHTML = '';

            data.forEach(kelompok => {
                const total = Math.round((kelompok.laporan + kelompok.presentasi + kelompok.kerjasama) / 3);
                const status = total > 0 ? 'selesai' : 'belum';
                const statusText = total > 0 ? 'Sudah Dinilai' : 'Belum Dinilai';
                const statusClass = total > 0 ? 'status-selesai' : 'status-belum';

                const card = document.createElement('div');
                card.className = 'kelompok-card';
                card.innerHTML = `
                    <div class="kelompok-header">
                        <h3>👥 ${kelompok.nama}</h3>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>

                    <div class="anggota-section">
                        <h4>Anggota Kelompok</h4>
                        <div class="anggota-list">
                            ${kelompok.anggota.map((anggota, idx) => `
                                <div class="anggota-item">
                                    <span>${idx + 1}.</span>
                                    <span>${anggota}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <button class="btn-detail" onclick="viewDetail(${kelompok.id})">
                        <span>📄</span> Lihat Laporan
                    </button>

                    <div class="nilai-section">
                        <h4>Input Nilai</h4>
                        <div class="nilai-input-group">
                            <div class="nilai-input-item">
                                <label>Laporan Tertulis</label>
                                <input type="number" min="0" max="100" value="${kelompok.laporan}" 
                                    onchange="updateNilai(${kelompok.id}, 'laporan', this.value)">
                            </div>
                            <div class="nilai-input-item">
                                <label>Presentasi</label>
                                <input type="number" min="0" max="100" value="${kelompok.presentasi}" 
                                    onchange="updateNilai(${kelompok.id}, 'presentasi', this.value)">
                            </div>
                            <div class="nilai-input-item">
                                <label>Kerjasama Tim</label>
                                <input type="number" min="0" max="100" value="${kelompok.kerjasama}" 
                                    onchange="updateNilai(${kelompok.id}, 'kerjasama', this.value)">
                            </div>
                        </div>
                        <div class="nilai-total">
                            <span>Total Nilai:</span>
                            <span id="total-${kelompok.id}">${total}</span>
                        </div>
                    </div>

                    <button class="btn-save" onclick="saveNilai(${kelompok.id})">
                        <span>💾</span> Simpan Nilai
                    </button>
                `;
                container.appendChild(card);
            });

            updateStats();
        }

        function updateNilai(id, field, value) {
            const kelompok = kelompokData.find(k => k.id === id);
            if (kelompok) {
                kelompok[field] = parseInt(value) || 0;
                const total = Math.round((kelompok.laporan + kelompok.presentasi + kelompok.kerjasama) / 3);
                document.getElementById(`total-${id}`).textContent = total;
            }
        }

        function saveNilai(id) {
            const kelompok = kelompokData.find(k => k.id === id);
            if (kelompok) {
                const total = Math.round((kelompok.laporan + kelompok.presentasi + kelompok.kerjasama) / 3);
                alert(`Nilai ${kelompok.nama} berhasil disimpan!\n\nLaporan: ${kelompok.laporan}\nPresentasi: ${kelompok.presentasi}\nKerjasama: ${kelompok.kerjasama}\n\nTotal: ${total}`);
                renderKelompok();
            }
        }

        function viewDetail(id) {
            const kelompok = kelompokData.find(k => k.id === id);
            if (kelompok) {
                alert(`Detail ${kelompok.nama}\n\n` +
                    `Anggota:\n${kelompok.anggota.join('\n')}\n\n` +
                    `File laporan akan ditampilkan di sini.\n` +
                    `Guru dapat:\n- Download laporan PDF\n- Melihat hasil praktikum\n- Memberikan feedback`);
            }
        }

        function updateStats() {
            const totalKelompok = kelompokData.length;
            const completedKelompok = kelompokData.filter(k => k.laporan > 0 || k.presentasi > 0 || k.kerjasama > 0).length;
            const avgScore = Math.round(kelompokData.reduce((acc, k) => {
                const total = (k.laporan + k.presentasi + k.kerjasama) / 3;
                return acc + total;
            }, 0) / totalKelompok);
            const completionRate = Math.round((completedKelompok / totalKelompok) * 100);

            document.getElementById('total-kelompok').textContent = totalKelompok;
            document.getElementById('completed-kelompok').textContent = completedKelompok;
            document.getElementById('avg-score').textContent = avgScore;
            document.getElementById('completion-rate').textContent = completionRate + '%';
        }

        function filterKelompok() {
            const filter = document.getElementById('filter-status').value;
            let filtered = kelompokData;

            if (filter === 'selesai') {
                filtered = kelompokData.filter(k => k.laporan > 0 || k.presentasi > 0 || k.kerjasama > 0);
            } else if (filter === 'belum') {
                filtered = kelompokData.filter(k => k.laporan === 0 && k.presentasi === 0 && k.kerjasama === 0);
            }

            renderKelompok(filtered);
        }

        function searchKelompok() {
            const query = document.getElementById('search-kelompok').value.toLowerCase();
            const filtered = kelompokData.filter(k => {
                const namaMatch = k.nama.toLowerCase().includes(query);
                const anggotaMatch = k.anggota.some(a => a.toLowerCase().includes(query));
                return namaMatch || anggotaMatch;
            });
            renderKelompok(filtered);
        }

        function exportData() {
            alert('Fitur export ke Excel akan segera tersedia!\n\nData yang akan diekspor:\n- Nama kelompok\n- Daftar anggota\n- Nilai laporan, presentasi, kerjasama\n- Total nilai\n\nFormat: Penilaian_Kelompok_AsamBasa_2025.xlsx');
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

        document.getElementById('topic-title').textContent = `Penilaian Kelompok: ${topicTitles[topicId] || 'Topik'}`;

        // Initialize
        window.onload = function () {
            const loader = document.querySelector('.loader');
            if (loader) {
                loader.style.display = 'none';
            }
            renderKelompok();
        };
    </script>
</body>

</html>