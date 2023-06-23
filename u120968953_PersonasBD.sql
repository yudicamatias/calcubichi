-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 23-06-2023 a las 15:15:24
-- Versión del servidor: 10.6.12-MariaDB-cll-lve
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u120968953_PersonasBD`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Apartments`
--

CREATE TABLE `Apartments` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Cost` decimal(10,2) NOT NULL,
  `Building_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Apartments`
--

INSERT INTO `Apartments` (`ID`, `Name`, `Cost`, `Building_ID`) VALUES
(1, 'Departamento 1', 100000.00, 1),
(2, 'Departamento 2', 150000.00, 1),
(3, 'Departamento 1', 50000.00, 2),
(4, 'Departamento 2', 250000.00, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Buildings`
--

CREATE TABLE `Buildings` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Buildings`
--

INSERT INTO `Buildings` (`ID`, `Name`) VALUES
(1, 'Edificio A'),
(2, 'Edificio B');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Apartments`
--
ALTER TABLE `Apartments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Building_ID` (`Building_ID`);

--
-- Indices de la tabla `Buildings`
--
ALTER TABLE `Buildings`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Apartments`
--
ALTER TABLE `Apartments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Buildings`
--
ALTER TABLE `Buildings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Apartments`
--
ALTER TABLE `Apartments`
  ADD CONSTRAINT `Apartments_ibfk_1` FOREIGN KEY (`Building_ID`) REFERENCES `Buildings` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
