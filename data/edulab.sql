-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2025 at 09:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edulab`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id_user` int(11) NOT NULL,
  `nis` int(11) DEFAULT NULL,
  `nisn` int(11) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `kelas` varchar(50) DEFAULT NULL,
  `sekolah` varchar(50) DEFAULT NULL,
  `jenisKelamin` enum('l','p') DEFAULT NULL,
  `tempatLahir` varchar(100) DEFAULT NULL,
  `tanggalLahir` date DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `nomorTelepon` varchar(25) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `prelab` int(11) DEFAULT NULL,
  `praktikum` int(11) DEFAULT NULL,
  `postlab` int(11) DEFAULT NULL,
  `kelompok` varchar(10) DEFAULT NULL,
  `totalNilai` int(11) DEFAULT NULL,
  `feedback` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id_user`, `nis`, `nisn`, `nama`, `kelas`, `sekolah`, `jenisKelamin`, `tempatLahir`, `tanggalLahir`, `alamat`, `nomorTelepon`, `email`, `password`, `prelab`, `praktikum`, `postlab`, `kelompok`, `totalNilai`, `feedback`) VALUES
(1, 1, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 2, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 3, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 4, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 5, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 6, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '6', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 7, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '7', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 8, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '8', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 9, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '9', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 10, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 11, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '11', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 12, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 13, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '13', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 14, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 15, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '15', NULL, NULL, NULL, NULL, NULL, NULL),
(16, 16, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '16', NULL, NULL, NULL, NULL, NULL, NULL),
(17, 17, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '17', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 18, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '18', NULL, NULL, NULL, NULL, NULL, NULL),
(19, 19, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '19', NULL, NULL, NULL, NULL, NULL, NULL),
(20, 20, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '20', NULL, NULL, NULL, NULL, NULL, NULL),
(21, 21, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '21', NULL, NULL, NULL, NULL, NULL, NULL),
(22, 22, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '22', NULL, NULL, NULL, NULL, NULL, NULL),
(23, 23, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '23', NULL, NULL, NULL, NULL, NULL, NULL),
(24, 24, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '24', NULL, NULL, NULL, NULL, NULL, NULL),
(25, 25, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '25', NULL, NULL, NULL, NULL, NULL, NULL),
(26, 26, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '26', NULL, NULL, NULL, NULL, NULL, NULL),
(27, 27, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '27', NULL, NULL, NULL, NULL, NULL, NULL),
(28, 28, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '28', NULL, NULL, NULL, NULL, NULL, NULL),
(29, 29, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '29', NULL, NULL, NULL, NULL, NULL, NULL),
(30, 30, 999999, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '30', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id_topic` int(11) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `tingkat` varchar(50) DEFAULT NULL,
  `mataPelajaran` varchar(50) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `modul` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id_topic`, `judul`, `tingkat`, `mataPelajaran`, `deskripsi`, `modul`, `video`) VALUES
(1, 'Asam Basa', '10', 'Kimia', 'Belajar tentang pH dan reaksi kimia! Ini adalah topik dasar dalam kimia yang mencakup konsep asam, basa, indikator, dan reaksi netralisasi. Siswa akan mempelajari skala pH, sifat larutan, dan aplikasi dalam kehidupan sehari-hari seperti pengaturan pH tanah atau obat-obatan.', 'MODUL ASAM BASA_merged.pdf', 'VideoModul.mp4'),
(2, 'Redoks', '10', 'Kimia', 'Pelajari reaksi reduksi-oksidasi! Topik ini menjelaskan transfer elektron, bilangan oksidasi, dan reaksi redoks dalam sel volta, korosi, dan proses biologis seperti respirasi.', NULL, NULL),
(3, 'Gerak Lurus', '10', 'Fisika', 'Pelajari hukum Newton! Topik ini mencakup gerak lurus beraturan, berubah beraturan, gaya, massa, dan aplikasi seperti perhitungan kecepatan kendaraan atau gerak proyektil.', NULL, NULL),
(4, 'Stoikiometri', '11', 'Kimia', 'Kalkulasi jumlah zat! Ini melibatkan mol, persamaan reaksi, yield, dan perhitungan stoikiometri dalam reaksi kimia industri atau laboratorium.', NULL, NULL),
(5, 'Energi', '11', 'Fisika', 'Pelajari energi kinetik! Topik ini membahas energi potensial, konservasi energi, kerja, daya, dan aplikasi dalam mesin atau sistem fisika seperti pendulum.', NULL, NULL),
(6, 'Polimer', '12', 'Kimia', 'Pelajari bahan polimer! Ini termasuk polimerisasi, jenis polimer seperti plastik, karet, dan aplikasi dalam industri, lingkungan, dan teknologi biomedis.', NULL, NULL),
(7, 'Listrik', '12', 'Fisika', 'Pelajari rangkaian listrik! Topik ini mencakup arus, tegangan, hambatan, hukum Ohm, Kirchhoff, dan aplikasi seperti sirkuit elektronik atau distribusi listrik.', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id_topic`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id_topic` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
