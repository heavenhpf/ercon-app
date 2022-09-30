-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2022 at 06:37 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `level` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_dn`
--

CREATE TABLE `d_dn` (
  `id_dn` int(11) NOT NULL,
  `id_po` int(11) NOT NULL,
  `id_doc` int(11) NOT NULL,
  `order_from` int(11) NOT NULL,
  `order_to` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_dn_detail`
--

CREATE TABLE `d_dn_detail` (
  `id_dn_detail` int(11) NOT NULL,
  `id_dn` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `note` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_item`
--

CREATE TABLE `d_item` (
  `id_item` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_unit` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `serial_number` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` text NOT NULL,
  `quantity` float NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_item_detail`
--

CREATE TABLE `d_item_detail` (
  `id_item_detail` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_po` int(11) DEFAULT NULL,
  `quantity` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_order`
--

CREATE TABLE `d_order` (
  `id_order` int(11) NOT NULL,
  `order_from` int(11) NOT NULL,
  `order_to` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `quantity` float NOT NULL,
  `note` text DEFAULT NULL,
  `processed` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_po`
--

CREATE TABLE `d_po` (
  `id_po` int(11) NOT NULL,
  `id_doc` int(11) NOT NULL,
  `order_from` int(11) NOT NULL,
  `order_to` int(11) NOT NULL,
  `po_number` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `d_po_detail`
--

CREATE TABLE `d_po_detail` (
  `id_po_detail` int(11) NOT NULL,
  `id_po` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `po_detail_number` varchar(50) NOT NULL,
  `note` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ref_doc`
--

CREATE TABLE `ref_doc` (
  `id_doc` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `data` varbinary(65000) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `s_category`
--

CREATE TABLE `s_category` (
  `id_category` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `s_company`
--

CREATE TABLE `s_company` (
  `id_company` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `s_unit`
--

CREATE TABLE `s_unit` (
  `id_unit` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `d_dn`
--
ALTER TABLE `d_dn`
  ADD PRIMARY KEY (`id_dn`),
  ADD KEY `id_po` (`id_po`),
  ADD KEY `order_from` (`order_from`),
  ADD KEY `order_to` (`order_to`),
  ADD KEY `id_doc` (`id_doc`);

--
-- Indexes for table `d_dn_detail`
--
ALTER TABLE `d_dn_detail`
  ADD PRIMARY KEY (`id_dn_detail`),
  ADD KEY `id_dn` (`id_dn`),
  ADD KEY `id_order` (`id_order`);

--
-- Indexes for table `d_item`
--
ALTER TABLE `d_item`
  ADD PRIMARY KEY (`id_item`),
  ADD UNIQUE KEY `serial_number` (`serial_number`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_unit` (`id_unit`),
  ADD KEY `id_category` (`id_category`);

--
-- Indexes for table `d_item_detail`
--
ALTER TABLE `d_item_detail`
  ADD PRIMARY KEY (`id_item_detail`),
  ADD KEY `id_item` (`id_item`),
  ADD KEY `id_po` (`id_po`);

--
-- Indexes for table `d_order`
--
ALTER TABLE `d_order`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_item` (`id_item`),
  ADD KEY `order_from` (`order_from`),
  ADD KEY `order_to` (`order_to`);

--
-- Indexes for table `d_po`
--
ALTER TABLE `d_po`
  ADD PRIMARY KEY (`id_po`),
  ADD UNIQUE KEY `po_number` (`po_number`),
  ADD KEY `id_doc` (`id_doc`),
  ADD KEY `order_from` (`order_from`),
  ADD KEY `order_to` (`order_to`);

--
-- Indexes for table `d_po_detail`
--
ALTER TABLE `d_po_detail`
  ADD PRIMARY KEY (`id_po_detail`),
  ADD UNIQUE KEY `po_detail_number` (`po_detail_number`),
  ADD KEY `id_po` (`id_po`),
  ADD KEY `id_order` (`id_order`);

--
-- Indexes for table `ref_doc`
--
ALTER TABLE `ref_doc`
  ADD PRIMARY KEY (`id_doc`);

--
-- Indexes for table `s_category`
--
ALTER TABLE `s_category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `s_company`
--
ALTER TABLE `s_company`
  ADD PRIMARY KEY (`id_company`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `s_unit`
--
ALTER TABLE `s_unit`
  ADD PRIMARY KEY (`id_unit`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_dn`
--
ALTER TABLE `d_dn`
  MODIFY `id_dn` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_dn_detail`
--
ALTER TABLE `d_dn_detail`
  MODIFY `id_dn_detail` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_item`
--
ALTER TABLE `d_item`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_item_detail`
--
ALTER TABLE `d_item_detail`
  MODIFY `id_item_detail` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_order`
--
ALTER TABLE `d_order`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_po`
--
ALTER TABLE `d_po`
  MODIFY `id_po` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `d_po_detail`
--
ALTER TABLE `d_po_detail`
  MODIFY `id_po_detail` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ref_doc`
--
ALTER TABLE `ref_doc`
  MODIFY `id_doc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `s_category`
--
ALTER TABLE `s_category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `s_company`
--
ALTER TABLE `s_company`
  MODIFY `id_company` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `s_unit`
--
ALTER TABLE `s_unit`
  MODIFY `id_unit` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `d_dn`
--
ALTER TABLE `d_dn`
  ADD CONSTRAINT `d_dn_ibfk_1` FOREIGN KEY (`id_doc`) REFERENCES `ref_doc` (`id_doc`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_dn_ibfk_2` FOREIGN KEY (`id_po`) REFERENCES `d_po` (`id_po`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_dn_ibfk_3` FOREIGN KEY (`order_from`) REFERENCES `s_company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_dn_ibfk_4` FOREIGN KEY (`order_to`) REFERENCES `s_company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_dn_detail`
--
ALTER TABLE `d_dn_detail`
  ADD CONSTRAINT `d_dn_detail_ibfk_2` FOREIGN KEY (`id_dn`) REFERENCES `d_dn` (`id_dn`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_dn_detail_ibfk_3` FOREIGN KEY (`id_order`) REFERENCES `d_order` (`id_order`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_item`
--
ALTER TABLE `d_item`
  ADD CONSTRAINT `d_item_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `auth_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_item_ibfk_2` FOREIGN KEY (`id_unit`) REFERENCES `s_unit` (`id_unit`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_item_ibfk_3` FOREIGN KEY (`id_category`) REFERENCES `s_category` (`id_category`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_item_detail`
--
ALTER TABLE `d_item_detail`
  ADD CONSTRAINT `d_item_detail_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `d_item` (`id_item`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_item_detail_ibfk_2` FOREIGN KEY (`id_po`) REFERENCES `d_po` (`id_po`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_order`
--
ALTER TABLE `d_order`
  ADD CONSTRAINT `d_order_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `d_item` (`id_item`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_order_ibfk_2` FOREIGN KEY (`order_from`) REFERENCES `s_company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_order_ibfk_3` FOREIGN KEY (`order_to`) REFERENCES `s_company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_po`
--
ALTER TABLE `d_po`
  ADD CONSTRAINT `d_po_ibfk_2` FOREIGN KEY (`id_doc`) REFERENCES `ref_doc` (`id_doc`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_po_ibfk_3` FOREIGN KEY (`order_from`) REFERENCES `s_company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_po_ibfk_4` FOREIGN KEY (`order_to`) REFERENCES `s_company` (`id_company`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `d_po_detail`
--
ALTER TABLE `d_po_detail`
  ADD CONSTRAINT `d_po_detail_ibfk_1` FOREIGN KEY (`id_po`) REFERENCES `d_po` (`id_po`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_po_detail_ibfk_3` FOREIGN KEY (`id_order`) REFERENCES `d_order` (`id_order`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `s_company`
--
ALTER TABLE `s_company`
  ADD CONSTRAINT `s_company_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `auth_user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
