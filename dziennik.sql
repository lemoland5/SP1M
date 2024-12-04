-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2024 at 10:45 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dziennik`
--

-- --------------------------------------------------------

--
-- Table structure for table `klasa`
--

CREATE TABLE `klasa` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(4) DEFAULT NULL,
  `wychowawca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `klasa`
--

INSERT INTO `klasa` (`id`, `nazwa`, `wychowawca`) VALUES
(1, '3P', 5),
(2, '1A', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `obecnosc`
--

CREATE TABLE `obecnosc` (
  `id` int(11) NOT NULL,
  `uczen` int(11) NOT NULL,
  `przedmiot` int(11) NOT NULL,
  `wartosc` tinyint(1) NOT NULL,
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `obecnosc`
--

INSERT INTO `obecnosc` (`id`, `uczen`, `przedmiot`, `wartosc`, `data`) VALUES
(1, 2, 1, 1, '0011-01-01'),
(2, 2, 2, 0, '0001-11-11'),
(3, 2, 2, 1, '2024-12-11');

-- --------------------------------------------------------

--
-- Table structure for table `ocena`
--

CREATE TABLE `ocena` (
  `id` int(11) NOT NULL,
  `uczen` int(11) NOT NULL,
  `przedmiot` int(11) NOT NULL,
  `ocena` int(11) NOT NULL,
  `waga` int(11) NOT NULL,
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ocena`
--

INSERT INTO `ocena` (`id`, `uczen`, `przedmiot`, `ocena`, `waga`, `data`) VALUES
(1, 2, 1, 1, 1, '2022-10-31'),
(2, 2, 1, 3, 3, '2022-10-31'),
(5, 2, 1, 1, 6, '2024-12-03');

-- --------------------------------------------------------

--
-- Table structure for table `praca`
--

CREATE TABLE `praca` (
  `id` int(11) NOT NULL,
  `przedmiot` int(11) NOT NULL,
  `nauczyciel` int(11) NOT NULL,
  `klasa` int(11) NOT NULL,
  `data` date DEFAULT NULL,
  `nazwa` varchar(45) DEFAULT NULL,
  `rodzaj` enum('kart','spr','prk','zad') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `praca`
--

INSERT INTO `praca` (`id`, `przedmiot`, `nauczyciel`, `klasa`, `data`, `nazwa`, `rodzaj`) VALUES
(1, 1, 5, 1, '2024-12-04', 'Trygonometria', ''),
(2, 3, 5, 2, '2024-12-05', 'Wskaźniki C++', ''),
(3, 3, 5, 2, '2024-12-05', 'Wskaźniki C++', ''),
(4, 3, 5, 1, '2022-11-03', 'Trygonometria', 'prk'),
(5, 2, 5, 2, '2010-02-20', 'Kompozycja', 'zad'),
(6, 4, 5, 1, '2024-12-22', 'Prawa pracownika', 'spr'),
(7, 3, 5, 2, '2024-11-05', 'Excel kraina', 'kart');

-- --------------------------------------------------------

--
-- Table structure for table `przedmiot`
--

CREATE TABLE `przedmiot` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `przedmiot`
--

INSERT INTO `przedmiot` (`id`, `nazwa`) VALUES
(1, 'matematyka'),
(2, 'plastyka'),
(3, 'informatyka'),
(4, 'bhp');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `imie` varchar(35) NOT NULL,
  `nazwisko` varchar(35) NOT NULL,
  `klasa` int(11) DEFAULT NULL,
  `data_urodzenia` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `punkty` int(11) DEFAULT NULL,
  `rola` enum('u','r','n','a') DEFAULT NULL,
  `oczekujacy` tinyint(1) DEFAULT NULL,
  `password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `imie`, `nazwisko`, `klasa`, `data_urodzenia`, `email`, `punkty`, `rola`, `oczekujacy`, `password`) VALUES
(2, 'Arkadiusz', 'Milik', 1, '2024-11-11', 'lemo.cam.channel@gmail.com', 5, 'u', 0, 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35'),
(5, 'Arek', 'Milo', 1, '0001-11-11', '2@2', 0, 'a', 0, 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35'),
(6, 'Kaśka', 'Mrągowska', 2, '2000-01-20', 'k.m@sp1m.pl', 0, 'u', 0, NULL),
(7, 'Grzegorz', 'Gadaj', 1, '1971-04-30', '4@4', 0, 'n', 0, '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'),
(8, 'Tomasz', 'Nowotny', NULL, '1970-01-01', '5@5', 0, 'n', 0, 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d');

-- --------------------------------------------------------

--
-- Table structure for table `uwaga`
--

CREATE TABLE `uwaga` (
  `id` int(11) NOT NULL,
  `uczen` int(11) NOT NULL,
  `punkty` int(11) DEFAULT NULL,
  `tresc` text DEFAULT NULL,
  `nauczyciel` int(11) DEFAULT NULL,
  `typ` enum('poz','neg','neu') DEFAULT NULL,
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uwaga`
--

INSERT INTO `uwaga` (`id`, `uczen`, `punkty`, `tresc`, `nauczyciel`, `typ`, `data`) VALUES
(3, 2, 5, 'Pomoc w noszeniu stołów', 5, 'poz', '2024-12-03');

-- --------------------------------------------------------

--
-- Table structure for table `wiadomosc`
--

CREATE TABLE `wiadomosc` (
  `id` int(11) NOT NULL,
  `data_wyslania` date DEFAULT NULL,
  `temat` varchar(75) NOT NULL,
  `tresc` text DEFAULT NULL,
  `nadawca` int(11) DEFAULT NULL,
  `odbiorca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wiadomosc`
--

INSERT INTO `wiadomosc` (`id`, `data_wyslania`, `temat`, `tresc`, `nadawca`, `odbiorca`) VALUES
(1, '2024-12-04', 'as', 'asas', 2, 6),
(2, '2024-12-04', 'Siema podobasz mi sie', 'cho do 120 zrobimy sql\r\n', 2, 6),
(3, '2024-12-04', 'prośba o poprawę', 'nie chciałem ściągać jakoś tak wyszło sorki', 2, 5),
(4, '2024-12-04', 're: prosba o poprawe', 'nah bratku ja wiem ze to bylo celowo masz jedyneczke pozdro 600', 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `zastepstwo`
--

CREATE TABLE `zastepstwo` (
  `id` int(11) NOT NULL,
  `klasa` int(11) NOT NULL,
  `przedmiot` int(11) NOT NULL,
  `przedmiotZastepczy` int(11) DEFAULT NULL,
  `nauczyciel` int(11) NOT NULL,
  `zastepca` int(11) NOT NULL,
  `data` date DEFAULT NULL,
  `typ` enum('nau','prze','tem') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zastepstwo`
--

INSERT INTO `zastepstwo` (`id`, `klasa`, `przedmiot`, `przedmiotZastepczy`, `nauczyciel`, `zastepca`, `data`, `typ`) VALUES
(1, 1, 1, 1, 7, 7, '2025-01-01', 'tem'),
(2, 1, 2, 4, 7, 7, '2025-02-01', 'tem'),
(3, 1, 1, 3, 8, 7, '2025-01-03', 'tem'),
(4, 1, 2, 4, 7, 8, '2022-05-04', 'tem'),
(5, 1, 2, 1, 8, 7, '2022-01-01', 'tem'),
(6, 1, 2, 1, 8, 7, '2022-01-01', 'prze'),
(7, 1, 1, 1, 8, 7, '2025-03-03', 'nau'),
(8, 1, 1, 1, 7, 7, '2025-04-04', 'tem'),
(9, 1, 3, 4, 8, 7, '2027-06-06', 'prze'),
(10, 2, 2, 2, 8, 8, '2030-01-01', 'tem');

-- --------------------------------------------------------

--
-- Table structure for table `zgloszenia`
--

CREATE TABLE `zgloszenia` (
  `id` int(11) NOT NULL,
  `data` date DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `tresc` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zgloszenia`
--

INSERT INTO `zgloszenia` (`id`, `data`, `user`, `tresc`) VALUES
(1, '2024-11-30', 5, 'undefined'),
(2, '2024-11-30', 5, 'kocha m,amasdasd'),
(3, '2024-12-04', 2, 'SMYCZYK\r\n'),
(4, '2024-12-04', 2, ''),
(5, '2024-12-04', 5, 'undefined'),
(6, '2024-12-04', 2, 'cho do 120 zrobimy sql\r\n');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `klasa`
--
ALTER TABLE `klasa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wychowawca` (`wychowawca`);

--
-- Indexes for table `obecnosc`
--
ALTER TABLE `obecnosc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `przedmiot` (`przedmiot`),
  ADD KEY `uczen` (`uczen`);

--
-- Indexes for table `ocena`
--
ALTER TABLE `ocena`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uczen` (`uczen`),
  ADD KEY `przedmiot` (`przedmiot`);

--
-- Indexes for table `praca`
--
ALTER TABLE `praca`
  ADD PRIMARY KEY (`id`),
  ADD KEY `przedmiot` (`przedmiot`),
  ADD KEY `klasa` (`klasa`),
  ADD KEY `nauczyciel` (`nauczyciel`);

--
-- Indexes for table `przedmiot`
--
ALTER TABLE `przedmiot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `klasa` (`klasa`);

--
-- Indexes for table `uwaga`
--
ALTER TABLE `uwaga`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uczen` (`uczen`),
  ADD KEY `nauczyciel` (`nauczyciel`);

--
-- Indexes for table `wiadomosc`
--
ALTER TABLE `wiadomosc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nadawca` (`nadawca`),
  ADD KEY `odbiorca` (`odbiorca`);

--
-- Indexes for table `zastepstwo`
--
ALTER TABLE `zastepstwo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `klasa` (`klasa`),
  ADD KEY `przedmiot` (`przedmiot`),
  ADD KEY `nauczyciel` (`nauczyciel`),
  ADD KEY `zastepca` (`zastepca`),
  ADD KEY `przedmiotZastepczy` (`przedmiotZastepczy`);

--
-- Indexes for table `zgloszenia`
--
ALTER TABLE `zgloszenia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `klasa`
--
ALTER TABLE `klasa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `obecnosc`
--
ALTER TABLE `obecnosc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ocena`
--
ALTER TABLE `ocena`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `praca`
--
ALTER TABLE `praca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `przedmiot`
--
ALTER TABLE `przedmiot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `uwaga`
--
ALTER TABLE `uwaga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wiadomosc`
--
ALTER TABLE `wiadomosc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `zastepstwo`
--
ALTER TABLE `zastepstwo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `zgloszenia`
--
ALTER TABLE `zgloszenia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `klasa`
--
ALTER TABLE `klasa`
  ADD CONSTRAINT `klasa_ibfk_1` FOREIGN KEY (`wychowawca`) REFERENCES `user` (`id`);

--
-- Constraints for table `obecnosc`
--
ALTER TABLE `obecnosc`
  ADD CONSTRAINT `obecnosc_ibfk_1` FOREIGN KEY (`przedmiot`) REFERENCES `przedmiot` (`id`),
  ADD CONSTRAINT `obecnosc_ibfk_2` FOREIGN KEY (`uczen`) REFERENCES `user` (`id`);

--
-- Constraints for table `ocena`
--
ALTER TABLE `ocena`
  ADD CONSTRAINT `ocena_ibfk_2` FOREIGN KEY (`przedmiot`) REFERENCES `przedmiot` (`id`),
  ADD CONSTRAINT `ocena_ibfk_3` FOREIGN KEY (`uczen`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `praca`
--
ALTER TABLE `praca`
  ADD CONSTRAINT `praca_ibfk_1` FOREIGN KEY (`przedmiot`) REFERENCES `przedmiot` (`id`),
  ADD CONSTRAINT `praca_ibfk_2` FOREIGN KEY (`klasa`) REFERENCES `klasa` (`id`),
  ADD CONSTRAINT `praca_ibfk_3` FOREIGN KEY (`nauczyciel`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`klasa`) REFERENCES `klasa` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `uwaga`
--
ALTER TABLE `uwaga`
  ADD CONSTRAINT `uwaga_ibfk_1` FOREIGN KEY (`uczen`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `uwaga_ibfk_2` FOREIGN KEY (`nauczyciel`) REFERENCES `user` (`id`);

--
-- Constraints for table `wiadomosc`
--
ALTER TABLE `wiadomosc`
  ADD CONSTRAINT `wiadomosc_ibfk_1` FOREIGN KEY (`nadawca`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `wiadomosc_ibfk_2` FOREIGN KEY (`odbiorca`) REFERENCES `user` (`id`);

--
-- Constraints for table `zastepstwo`
--
ALTER TABLE `zastepstwo`
  ADD CONSTRAINT `zastepstwo_ibfk_1` FOREIGN KEY (`klasa`) REFERENCES `klasa` (`id`),
  ADD CONSTRAINT `zastepstwo_ibfk_2` FOREIGN KEY (`przedmiot`) REFERENCES `przedmiot` (`id`),
  ADD CONSTRAINT `zastepstwo_ibfk_3` FOREIGN KEY (`nauczyciel`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `zastepstwo_ibfk_4` FOREIGN KEY (`zastepca`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `zastepstwo_ibfk_5` FOREIGN KEY (`przedmiotZastepczy`) REFERENCES `przedmiot` (`id`);

--
-- Constraints for table `zgloszenia`
--
ALTER TABLE `zgloszenia`
  ADD CONSTRAINT `zgloszenia_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
