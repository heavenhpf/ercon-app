-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2022 at 04:37 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ercon`
--

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id_user`, `username`, `password`, `level`, `created_at`, `deleted_at`) VALUES
(1, 'toyota', '$2b$10$tHXahv5IjqFbVtKTJZanVO.NoRTCwVZ5K6sN79a.gxrpOmYtXyX0m', 0, '2022-10-28 04:30:39', NULL),
(2, 'sugiti', '$2b$10$ZjG9h4L5ipP3fZdXY3UDe.0Fwv/cEBPg5xAZCigvfppw6BW6z8rX2', 1, '2022-10-28 04:31:22', NULL),
(3, 'Swayasa', '$2b$10$5.fhCJrMp9WqZ4PhWGe5a.HhcreGgCTbpnoP0CkSI.OlJlvxf9A0S', 2, '2022-10-28 04:32:26', NULL),
(4, 'galva', '$2b$10$T71.kcPNq4v6Mm71JD28Zuv/1zpSvLxBhMzBBPV1SOgVILkaplKEi', 1, '2022-10-28 04:33:21', NULL),
(5, 'yoseph', '$2b$10$2ykGbCvAtvP3eixCelrZYeRe6xrXwwgCvy6MAA2LP4IkAti4JuH.W', 2, '2022-10-28 04:34:05', NULL);

--
-- Dumping data for table `d_item`
--

INSERT INTO `d_item` (`id_item`, `id_company`, `id_category`, `serial_number`, `name`, `desc`, `quantity`, `created_at`, `deleted_at`, `unit`) VALUES
(1, 2, 1, 'BL-01', 'Bemper Mobil', 'Lips Bumper D2 Spec Winglet Lips Bumper Universal multideflector; Size : 69 x 40 cm; Bahan: Plastic campuran non murni; Warna : Hitam; Harga tertera untuk 1 set 2pc (kanan-kiri); Tipe Universal, bisa digunakan untuk Segala tipe mobil', 18000, '2022-10-28 06:17:51', NULL, 'Lusin'),
(2, 2, 1, 'Ban01', 'Ban Mobil', 'MERK BAN : FORCEUM MT 08 PLUS 165 80 R13; Harga yang terdapat di iklan untuk 1 PCS BAN sudah termasuk harga promo tetapi belum termasuk ongkos kirim. Bagi yg mau langsung pasang atau ambil di toko silahkan bisa hubungi admin terlebih dahulu', 30000, '2022-10-28 06:24:04', NULL, 'Buah'),
(3, 5, 2, 'J001', 'Jok Motor', 'Cover jok motor segala motor sarung jok mbtech predator PCX Nmax aerox Vario Beat dll dijamin awet dan Tambah keren motornya soal warna bebas request', 40000, '2022-10-28 06:26:48', NULL, 'Buah'),
(4, 4, 2, 'S001', 'Spion Motor', 'Spion V-5 Kaca Blue Mirror Big; Spek : Lebar Daun 7,3cm; Panjang Daun 14cm; Panjang Tangkai Total 24Cm; Bahan : Full CNC Aluminium; Tangkai CNC Aluminium; Kaca Blue Mirror Anti Silau; Paket : Lengkap Dudukan Fairing; Karet Penahan Dudukan Fairing; Baut L 14 12 10, BautL 14 Drat; Tinggal Pasang Ke Semua Motor. ', 40000, '2022-10-28 06:30:30', NULL, 'Kg');

--
-- Dumping data for table `ref_category`
--

INSERT INTO `ref_category` (`id_category`, `name`, `created_at`, `deleted_at`) VALUES
(1, 'Kerangka Mobil', '2022-10-28 04:36:03', NULL),
(2, 'Kerangka Motor', '2022-10-28 04:36:14', NULL),
(3, 'Kabel', '2022-10-28 04:38:24', NULL);

--
-- Dumping data for table `s_company`
--

INSERT INTO `s_company` (`id_company`, `id_user`, `name`, `address`, `phone`, `created_at`, `deleted_at`) VALUES
(1, 1, 'PT Toyota Motor Manufacturing Indonesia', 'Indonesia', '0812345678', '2022-10-28 04:30:40', NULL),
(2, 2, 'PT Sugiti Indonesia', 'Indonesia', '0812345678', '2022-10-28 04:31:22', NULL),
(3, 3, 'PT Swayasa Prakarsa', 'Indonesia', '08123456738', '2022-10-28 04:32:26', NULL),
(4, 4, 'PT Galva Kantor Perwakilan Indonesia', 'Indonesia', '08123456738', '2022-10-28 04:33:21', NULL),
(5, 5, 'PT Yoseph Farma', 'Indonesia', '08123456738', '2022-10-28 04:34:05', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
