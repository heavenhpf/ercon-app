-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2022 at 09:03 AM
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
(5, 'yoseph', '$2b$10$2ykGbCvAtvP3eixCelrZYeRe6xrXwwgCvy6MAA2LP4IkAti4JuH.W', 2, '2022-10-28 04:34:05', NULL),
(6, 'tier3', '$2b$10$S/C6Smb5m3jpum9YA9vYh.HWnhvQFOZiMboC2CEatqJj107GD8eXK', 3, '2022-11-09 07:24:07', NULL);

--
-- Dumping data for table `d_dn`
--

INSERT INTO `d_dn` (`id_dn`, `id_po`, `id_doc`, `created_at`, `deleted_at`) VALUES
(1, 2, 1, '2022-11-02 07:56:04', NULL),
(2, 3, 1, '2022-11-03 04:25:52', NULL),
(3, 5, 1, '2022-11-09 07:42:34', NULL);

--
-- Dumping data for table `d_dn_detail`
--

INSERT INTO `d_dn_detail` (`id_dn_detail`, `id_dn`, `id_order`, `created_at`, `deleted_at`) VALUES
(1, 1, 2, '2022-11-02 07:56:04', NULL),
(2, 2, 3, '2022-11-03 04:25:52', NULL),
(3, 3, 6, '2022-11-09 07:42:34', NULL);

--
-- Dumping data for table `d_doc`
--

INSERT INTO `d_doc` (`id_doc`, `name`, `original_name`, `mime`, `path`, `created_at`, `deleted_at`) VALUES
(1, 'PO_1667372386447.pdf', '2002.07551.pdf', 'application/pdf', 'D:\\Project Stechoq\\Ercon\\public\\PO\\PO_1667372386447.pdf', '2022-11-02 06:59:46', NULL);

--
-- Dumping data for table `d_item`
--

INSERT INTO `d_item` (`id_item`, `id_company`, `id_category`, `serial_number`, `name`, `desc`, `quantity`, `created_at`, `deleted_at`, `unit`) VALUES
(1, 2, 1, 'BL-01', 'Bemper Mobil', 'Lips Bumper D2 Spec Winglet Lips Bumper Universal multideflector; Size : 69 x 40 cm; Bahan: Plastic campuran non murni; Warna : Hitam; Harga tertera untuk 1 set 2pc (kanan-kiri); Tipe Universal, bisa digunakan untuk Segala tipe mobil', 17000, '2022-10-28 06:17:51', NULL, 'Lusin'),
(2, 2, 1, 'Ban01', 'Ban Mobil', 'MERK BAN : FORCEUM MT 08 PLUS 165 80 R13; Harga yang terdapat di iklan untuk 1 PCS BAN sudah termasuk harga promo tetapi belum termasuk ongkos kirim. Bagi yg mau langsung pasang atau ambil di toko silahkan bisa hubungi admin terlebih dahulu', 30000, '2022-10-28 06:24:04', NULL, 'Buah'),
(3, 5, 2, 'J001', 'Jok Motor', 'Cover jok motor segala motor sarung jok mbtech predator PCX Nmax aerox Vario Beat dll dijamin awet dan Tambah keren motornya soal warna bebas request', 40000, '2022-10-28 06:26:48', NULL, 'Buah'),
(4, 4, 2, 'S001', 'Spion Motor', 'Spion V-5 Kaca Blue Mirror Big; Spek : Lebar Daun 7,3cm; Panjang Daun 14cm; Panjang Tangkai Total 24Cm; Bahan : Full CNC Aluminium; Tangkai CNC Aluminium; Kaca Blue Mirror Anti Silau; Paket : Lengkap Dudukan Fairing; Karet Penahan Dudukan Fairing; Baut L 14 12 10, BautL 14 Drat; Tinggal Pasang Ke Semua Motor. ', 39000, '2022-10-28 06:30:30', NULL, 'Kg'),
(5, 6, 4, '0101', 'Mentahan besi Grade S', 'Bijih besi dari tambang pilihan, tidak cepat basi dan busuk', 200, '2022-11-09 07:30:26', NULL, 'Ton'),
(6, 6, 4, '0102', 'Mentahan besi Grade A', 'Versi lebih murah dari Grade S dengan kualitas tidak jauh berbeda', 400, '2022-11-09 07:32:07', NULL, 'Ton'),
(7, 5, 3, 'TBG-01', 'Lempeng tembaga', 'Tembaga untuk membuat kawat super kuat, diuji oleh para ahli', 80, '2022-11-09 07:53:26', NULL, 'Roll');

--
-- Dumping data for table `d_item_detail`
--

INSERT INTO `d_item_detail` (`id_item_detail`, `id_item`, `id_po_detail`) VALUES
(3, 5, 3),
(4, 6, 4),
(6, 7, 6),
(7, 7, 7);

--
-- Dumping data for table `d_notification`
--

INSERT INTO `d_notification` (`id_notification`, `id_notification_object`, `id_company`, `status`) VALUES
(1, 1, 4, 1),
(2, 2, 1, 1),
(3, 3, 6, 1),
(4, 4, 6, 1),
(5, 5, 3, 1),
(6, 6, 5, 1),
(7, 7, 5, 1);

--
-- Dumping data for table `d_notification_change`
--

INSERT INTO `d_notification_change` (`id_notification_change`, `id_notification_object`, `id_company`, `status`) VALUES
(1, 1, 1, 1),
(2, 2, 4, 1),
(3, 3, 5, 1),
(4, 4, 3, 1),
(5, 5, 6, 1),
(6, 6, 2, 1),
(7, 7, 2, 1);

--
-- Dumping data for table `d_notification_object`
--

INSERT INTO `d_notification_object` (`id_notification_object`, `entity_type`, `entity_id`, `status`, `created_at`) VALUES
(1, 1, 3, 1, '2022-11-03 04:09:02'),
(2, 2, 2, 1, '2022-11-03 04:25:52'),
(3, 1, 4, 1, '2022-11-09 07:34:30'),
(4, 1, 5, 1, '2022-11-09 07:40:54'),
(5, 2, 3, 1, '2022-11-09 07:42:34'),
(6, 1, 6, 1, '2022-11-09 07:56:00'),
(7, 1, 7, 1, '2022-11-09 07:58:46');

--
-- Dumping data for table `d_order`
--

INSERT INTO `d_order` (`id_order`, `order_from`, `order_to`, `id_item`, `order_number`, `quantity`, `processed`, `created_at`, `deleted_at`) VALUES
(2, 1, 2, 1, 'ORDER000', 1000, 1, '2022-11-02 06:40:58', NULL),
(3, 1, 4, 4, 'ORDER001', 1000, 1, '2022-11-02 06:41:08', NULL),
(4, 5, 6, 5, 'ORDER010', 1000, 1, '2022-11-09 07:33:42', NULL),
(5, 5, 6, 6, 'ORDER011', 1000, 1, '2022-11-09 07:33:58', NULL),
(6, 3, 6, 6, 'ORDER020', 100, 1, '2022-11-09 07:40:31', NULL),
(7, 2, 5, 7, 'ORDER030', 1000, 1, '2022-11-09 07:54:25', NULL),
(8, 2, 5, 7, 'ORDER031', 10000, 1, '2022-11-09 07:57:23', NULL);

--
-- Dumping data for table `d_po`
--

INSERT INTO `d_po` (`id_po`, `id_doc`, `order_from`, `order_to`, `po_number`, `status`, `deadline`, `finished_at`, `created_at`, `deleted_at`) VALUES
(2, 1, 1, 2, 'PO0001', 1, '2022-10-11', '2022-11-02 07:56:04', '2022-11-02 06:59:51', NULL),
(3, 1, 1, 4, 'PO0001', 1, '2022-10-11', '2022-11-03 04:25:52', '2022-11-03 04:09:02', NULL),
(4, 1, 5, 6, 'PO0010', 0, '2022-11-15', NULL, '2022-11-09 07:34:30', NULL),
(5, 1, 3, 6, 'PO0020', 1, '2022-10-11', '2022-11-09 07:42:34', '2022-11-09 07:40:54', NULL),
(6, 1, 2, 5, 'PO0001', -1, '2022-10-11', NULL, '2022-11-09 07:56:00', NULL),
(7, 1, 2, 5, 'PO0001', 0, '2022-11-15', NULL, '2022-11-09 07:58:46', NULL);

--
-- Dumping data for table `d_po_detail`
--

INSERT INTO `d_po_detail` (`id_po_detail`, `id_po`, `id_order`, `quantity`, `note`, `note_po`, `created_at`, `deleted_at`) VALUES
(1, 2, 2, 1000, NULL, NULL, '2022-11-02 06:59:51', NULL),
(2, 3, 3, 1000, NULL, NULL, '2022-11-03 04:09:02', NULL),
(3, 4, 4, 1000, NULL, NULL, '2022-11-09 07:34:30', NULL),
(4, 4, 5, 0, NULL, NULL, '2022-11-09 07:34:30', NULL),
(5, 5, 6, 100, NULL, NULL, '2022-11-09 07:40:54', NULL),
(6, 6, 7, 0, NULL, NULL, '2022-11-09 07:56:00', NULL),
(7, 7, 8, 0, NULL, NULL, '2022-11-09 07:58:46', NULL);

--
-- Dumping data for table `ref_category`
--

INSERT INTO `ref_category` (`id_category`, `name`, `created_at`, `deleted_at`) VALUES
(1, 'Kerangka Mobil', '2022-10-28 04:36:03', NULL),
(2, 'Kerangka Motor', '2022-10-28 04:36:14', NULL),
(3, 'Kabel', '2022-10-28 04:38:24', NULL),
(4, 'Bijih besi', '2022-11-09 07:28:39', NULL);

--
-- Dumping data for table `s_company`
--

INSERT INTO `s_company` (`id_company`, `id_user`, `name`, `address`, `phone`, `created_at`, `deleted_at`) VALUES
(1, 1, 'PT Toyota Motor Manufacturing Indonesia', 'Indonesia', '0812345678', '2022-10-28 04:30:40', NULL),
(2, 2, 'PT Sugiti Indonesia', 'Indonesia', '0812345678', '2022-10-28 04:31:22', NULL),
(3, 3, 'PT Swayasa Prakarsa', 'Indonesia', '08123456738', '2022-10-28 04:32:26', NULL),
(4, 4, 'PT Galva Kantor Perwakilan Indonesia', 'Indonesia', '08123456738', '2022-10-28 04:33:21', NULL),
(5, 5, 'PT Yoseph Farma', 'Indonesia', '08123456738', '2022-10-28 04:34:05', NULL),
(6, 6, 'PT Tier 3', 'Jl. Tier 3', '333', '2022-11-09 07:24:07', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
