-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2023 at 03:11 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectk2017731`
--

-- --------------------------------------------------------

--
-- Table structure for table `groupmembers`
--

CREATE TABLE `groupmembers` (
  `GroupmemberID` int(5) NOT NULL,
  `UserID` int(5) NOT NULL,
  `GroupID` int(5) NOT NULL,
  `GroupStatus` varchar(8) NOT NULL CHECK (`GroupStatus` in ('Active','Inactive'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groupmembers`
--

INSERT INTO `groupmembers` (`GroupmemberID`, `UserID`, `GroupID`, `GroupStatus`) VALUES
(2, 42, 2, 'Active'),
(3, 42, 3, 'Active'),
(4, 42, 4, 'Active'),
(10, 44, 1, 'Active'),
(12, 43, 1, 'Active'),
(15, 42, 1, 'Active'),
(16, 42, 18, 'Active'),
(17, 43, 18, 'Active'),
(20, 42, 5, 'Active'),
(21, 42, 6, 'Active'),
(25, 45, 7, 'Active'),
(26, 46, 7, 'Active'),
(27, 47, 7, 'Active'),
(30, 44, 24, 'Active'),
(32, 42, 25, 'Active'),
(33, 43, 25, 'Active'),
(34, 44, 25, 'Active'),
(35, 46, 25, 'Active'),
(36, 42, 26, 'Active'),
(37, 43, 26, 'Active'),
(38, 44, 26, 'Active'),
(39, 45, 26, 'Active'),
(40, 42, 27, 'Active'),
(41, 43, 27, 'Active'),
(42, 43, 28, 'Active'),
(43, 44, 28, 'Active'),
(48, 42, 29, 'Active'),
(49, 43, 29, 'Active'),
(50, 44, 29, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `groupID` int(5) NOT NULL,
  `groupName` varchar(20) NOT NULL,
  `projectID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`groupID`, `groupName`, `projectID`) VALUES
(1, 'Pegasystems Inc.', 1),
(2, 'Regency Centers Corp', 2),
(3, 'Accuray Incorporated', 3),
(4, 'Tesla, Inc. ', 4),
(5, 'IBERIABANK Corporati', 1),
(6, 'LaSalle Hotel Proper', 1),
(7, 'Xenetic Biosciences,', 1),
(8, 'Preformed Line Produ', 2),
(9, 'Zions Bancorporation', 2),
(10, 'Bassett Furniture In', 1),
(11, 'Emerald Expositions ', 2),
(12, 'NRG Yield, Inc.', 1),
(13, 'Telephone and Data S', 2),
(14, 'Insteel Industries, ', 2),
(15, 'Legg Mason Global In', 2),
(16, 'Public Storage', 1),
(17, 'DTE Energy Company', 2),
(18, 'Century Bancorp, Inc', 1),
(19, 'Avid Technology, Inc', 2),
(20, 'STORE Capital Corpor', 1),
(21, 'Yo', 1),
(22, 'hi', 1),
(23, 'Pega Inc.', 1),
(24, 'Test Group', 1),
(25, 'Test Group', 7),
(26, 'Test Group', 8),
(27, 'Project True', 10),
(28, 'Project True', 11),
(29, 'Project True', 13);

-- --------------------------------------------------------

--
-- Table structure for table `modulemembers`
--

CREATE TABLE `modulemembers` (
  `UserModuleID` int(5) NOT NULL,
  `UserID` int(5) NOT NULL,
  `ModuleID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `modulemembers`
--

INSERT INTO `modulemembers` (`UserModuleID`, `UserID`, `ModuleID`) VALUES
(1, 42, 1),
(5, 45, 1),
(6, 46, 1),
(7, 47, 1),
(8, 48, 1),
(9, 49, 1),
(11, 51, 1),
(16, 42, 3),
(17, 43, 3),
(18, 44, 3),
(19, 50, 1),
(20, 46, 3),
(21, 47, 3),
(22, 48, 3),
(25, 42, 17),
(26, 43, 17),
(27, 44, 17),
(28, 45, 17),
(29, 46, 17),
(30, 42, 15),
(31, 43, 15),
(32, 44, 15),
(33, 45, 15),
(34, 46, 15),
(35, 47, 15),
(36, 48, 15),
(37, 49, 15),
(38, 50, 15),
(39, 43, 4),
(40, 44, 4),
(41, 42, 18),
(42, 43, 18),
(43, 44, 18),
(44, 45, 18),
(45, 46, 18),
(46, 47, 18),
(47, 43, 1),
(48, 44, 1),
(49, 42, 2),
(50, 43, 2),
(51, 44, 2);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `ModuleID` int(5) NOT NULL,
  `ModuleName` varchar(22) NOT NULL,
  `ModuleDescription` varchar(100) NOT NULL,
  `ModuleLevel` int(1) NOT NULL,
  `ModuleCode` varchar(10) NOT NULL,
  `ModuleStartDate` date NOT NULL,
  `ModuleEndDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`ModuleID`, `ModuleName`, `ModuleDescription`, `ModuleLevel`, `ModuleCode`, `ModuleStartDate`, `ModuleEndDate`) VALUES
(1, 'Programming III', 'Studying the programming course', 5, 'CI6504', '2023-04-14', '2023-04-20'),
(2, 'Requirements Analysis', 'Studying Requirements during the development lifecycle', 2, 'CI6505', '2023-04-01', '2023-04-01'),
(3, 'Programming I', 'Studying the programming course', 4, 'CI4504', '2023-02-14', '2024-02-14'),
(4, 'Programming IIII', 'Studying the programming course', 6, 'CI6504', '2023-02-14', '2024-02-14'),
(15, 'Programming', 'nj', 2, 'CI2530', '2023-04-17', '2023-04-17'),
(17, 'More', 'bye', 3, 'CI2530', '2023-04-28', '2023-04-28'),
(18, 'Programming', 'Module Desc', 2, 'CI2530', '2023-04-28', '2023-04-28');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `PostID` int(5) NOT NULL,
  `UserID` int(5) NOT NULL,
  `TaskID` int(5) NOT NULL,
  `PostDescription` varchar(500) NOT NULL,
  `PostDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`PostID`, `UserID`, `TaskID`, `PostDescription`, `PostDate`) VALUES
(1, 42, 9, 'Please elaborate more on the task', '2023-01-29'),
(2, 43, 9, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi odio turpis, auctor in mauris vel, iaculis consequat metus. Integer at facilisis tortor, eget scelerisque lacus. Donec rutrum elit nec purus lobortis, a convallis odio lobortis. Vestibulum id sem pellentesque, varius nunc fringilla, aliquet ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lorem ex massa nunc.', '2023-01-12'),
(3, 42, 9, 'Please just a little more', '2023-01-12'),
(9, 42, 9, 'hi', '2023-03-31'),
(11, 42, 9, 'Good Post!', '2023-04-17'),
(12, 42, 58, 'Hello', '2023-04-27'),
(13, 42, 69, 'hi', '2023-04-28'),
(14, 42, 68, 'hi', '2023-04-28'),
(15, 42, 70, 'hi', '2023-04-28'),
(16, 42, 73, 'NJNJN', '2023-04-28');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `projectID` int(5) NOT NULL,
  `projectName` varchar(50) NOT NULL,
  `projectDescription` varchar(1000) NOT NULL,
  `projectStartDate` date NOT NULL,
  `projectEndDate` date NOT NULL,
  `ModuleID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`projectID`, `projectName`, `projectDescription`, `projectStartDate`, `projectEndDate`, `ModuleID`) VALUES
(1, 'Create a Swing Application', 'Create an java application to support managing events', '2023-04-15', '2023-04-26', 1),
(2, 'Create a Java Application', 'Create an java application to support managing events', '2023-04-15', '2023-04-26', 1),
(3, 'Create UX Design application', '“You are a design director for a large national bank. Your bank wants to be ready to launch an app that will allow your customers to access their account information via a chatbot. How do you approach the challenge of providing information via a series of requests?”', '2023-04-04', '2023-04-04', 1),
(4, 'Create React Native App', 'Create a recipe blogging application.', '2023-04-19', '2024-04-10', 1),
(5, 'Create a JAVA Application', 'Create an java application to support managing events', '2023-04-14', '2023-04-25', 1),
(6, 'Hello', 'Test', '2023-04-06', '2023-04-04', 1),
(7, 'True', 'true', '2023-04-26', '2023-04-26', 3),
(8, 'Tru', 'Hello', '2023-04-28', '2023-04-28', 17),
(9, 'False', 'hiu', '2023-04-28', '2023-04-28', 17),
(10, 'True', 'true', '2023-04-28', '2023-04-28', 15),
(11, 'True', 'jn', '2023-04-28', '2023-04-28', 4),
(12, 'Mobile Apps', 'bye', '2023-04-28', '2023-04-28', 18),
(13, 'DHWQIDWQ', 'DOADKWQO', '2023-04-28', '2023-04-28', 2);

-- --------------------------------------------------------

--
-- Table structure for table `taskassignment`
--

CREATE TABLE `taskassignment` (
  `TaskUserID` int(5) NOT NULL,
  `UserID` int(5) NOT NULL,
  `TaskID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `taskassignment`
--

INSERT INTO `taskassignment` (`TaskUserID`, `UserID`, `TaskID`) VALUES
(2, 42, 10),
(3, 42, 11),
(4, 42, 12),
(5, 42, 13),
(6, 42, 14),
(7, 42, 15),
(8, 42, 16),
(11, 43, 52),
(120, 43, 72),
(121, 44, 72),
(122, 42, 71),
(123, 43, 71),
(124, 42, 73),
(125, 43, 73);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `TaskID` int(5) NOT NULL,
  `TaskTitle` varchar(50) DEFAULT NULL,
  `TaskDescription` varchar(1000) DEFAULT NULL,
  `TaskStatus` varchar(11) DEFAULT NULL CHECK (`TaskStatus` in ('Outstanding','Complete')),
  `TaskSetDate` datetime NOT NULL,
  `TaskDeadline` datetime NOT NULL,
  `GroupID` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`TaskID`, `TaskTitle`, `TaskDescription`, `TaskStatus`, `TaskSetDate`, `TaskDeadline`, `GroupID`) VALUES
(9, 'Plan for Prototype Demonstration', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lorem massa, rhoncus non posuere ac, pulvinar id lacus. Suspendisse potenti. Sed sit amet turpis sed est porttitor iaculis. Nam bibendum felis in euismod tempor. Duis ligula orci, ultricies eu quam auctor, eleifend lobortis nisl. Etiam neque libero, tempor eget feugiat ut, egestas sed eros. Fusce imperdiet orci urna, eu rhoncus felis ornare pharetra. Cras tincidunt, eros in tempor porttitor, ipsum ligula scelerisque purus, sit amet lacinia augue lorem eget ligula. Pellentesque ut eros condimentum, hendrerit nibh eu, maximus nulla. Duis fringilla magna sed ipsum venenatis, a convallis tellus malesuada. Donec aliquet vitae felis vitae suscipit. Morbi id nulla a nisi porta blandit eu et felis.', 'Outstanding', '2023-01-04 11:29:00', '2023-01-13 11:29:00', 1),
(10, 'Implement Endpoint', 'implement the endpoint', 'Outstanding', '2023-01-12 16:53:00', '2023-01-04 16:53:00', 1),
(11, 'Programming Work', 'program some work', 'Outstanding', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 1),
(12, 'Adv Data Modeling', 'do some data modelling', 'Outstanding', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 2),
(13, 'Requirements', 'do some req', 'Outstanding', '2022-11-08 00:00:00', '2022-11-16 00:00:00', 3),
(14, 'More Endpoint / Post', 'yea endpoints', 'Outstanding', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 4),
(15, 'Create Use Case', 'create the use cases', 'Complete', '2022-11-08 00:00:00', '2022-11-16 00:00:00', 4),
(16, 'Complete Question 3', 'do question 3', 'Outstanding', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 1),
(17, 'A Task', 'the plan', 'Outstanding', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 1),
(21, 'Oracle', 'oracle stuff', 'Outstanding', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 1),
(22, 'Testing', 'Create a test plan', 'Outstanding', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 3),
(23, 'Revise Paul\'s Lecture notes', 'Don\'t actually its quite boring', 'Outstanding', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 1),
(24, 'Literature Review Chapter 5', 'Write 2000 words', 'Outstanding', '2022-11-11 18:29:50', '2022-11-13 23:29:50', 1),
(25, 'Test', 'testing', 'Outstanding', '2022-11-11 18:31:36', '2022-11-11 18:31:36', 6),
(26, 'Test', 'testing', 'Outstanding', '2022-11-11 18:31:36', '2022-11-11 18:31:36', 6),
(38, 'Test', 'Test', 'Outstanding', '2022-11-17 20:38:00', '2022-11-25 21:37:00', 4),
(48, 'Test', 'Test2', 'Outstanding', '2022-12-14 13:47:00', '2022-12-14 13:47:00', 1),
(49, 'Test', 'Test2', 'Outstanding', '0001-12-14 00:48:00', '2022-12-14 13:48:00', 2),
(50, 'Test', 'Test3', 'Outstanding', '2022-12-14 14:07:00', '2022-12-14 14:07:00', 1),
(51, 'Plan for Prototype Demonstration', 'Test 4', 'Outstanding', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 1),
(52, 'Test', 'Test7', 'Outstanding', '2022-12-14 14:27:00', '2022-12-14 14:27:00', 1),
(53, 'Test', 'Test5', 'Outstanding', '2022-12-14 23:46:00', '2022-12-14 23:46:00', 1),
(54, 'Test', 'Test10', 'Outstanding', '2022-12-15 11:24:00', '2022-12-15 11:24:00', 1),
(55, 'Check', 'check', 'Outstanding', '2022-12-15 11:34:00', '2022-12-15 11:34:00', 1),
(56, 'Some More Programming Work', 'program some work', 'Complete', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 2),
(57, 'Some More Programming Work', 'program some work', 'Complete', '2022-11-08 00:00:00', '2022-12-30 00:00:00', 2),
(58, 'Test', 'test', 'Outstanding', '2023-04-07 13:52:00', '2023-04-07 13:52:00', 18),
(59, 'Check', 'chc', 'Outstanding', '2023-04-07 13:52:00', '2023-04-07 13:53:00', 3),
(60, 'Test', 'check', 'Outstanding', '2023-04-16 20:43:00', '2023-04-16 20:47:00', 6),
(62, 'eh wot', 'hello', 'Outstanding', '2023-04-16 22:58:00', '2023-04-16 22:58:00', 6),
(64, 'Test Task', 'Test test', 'Outstanding', '2023-04-12 10:10:00', '2023-04-14 10:10:00', 1),
(67, 'm', 'm', 'Outstanding', '2023-04-27 16:59:00', '2023-04-27 16:59:00', 2),
(68, 'Test', 'test', 'Outstanding', '2023-04-27 19:25:00', '2023-04-27 19:25:00', 25),
(69, 'mk', 'nj', 'Outstanding', '2023-04-28 08:57:00', '2023-04-28 08:57:00', 2),
(70, 'Test', 'Test', 'Outstanding', '2023-04-28 09:03:00', '2023-04-28 09:03:00', 26),
(71, 'Test True', 'hi', 'Outstanding', '2023-04-28 11:42:00', '2023-04-28 11:42:00', 27),
(72, 'Test', 'bhbh', 'Outstanding', '2023-04-28 12:41:00', '2023-04-28 12:41:00', 28),
(73, 'Plan for Prototype', 'JMJ', 'Outstanding', '2023-04-28 14:54:00', '2023-04-28 14:54:00', 29);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(5) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `UserTypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `username`, `password`, `firstName`, `lastName`, `email`, `UserTypeID`) VALUES
(42, 'blucius0', 'OdCTppyOm1H', 'Bonnibelle', 'Lucius', 'blucius0@noaa.gov', 2),
(43, 'cjacobowicz1', 'TdWmHjVX7fro', 'Ceciley', 'Jacobowicz', 'cjacobowicz1@ehow.com', 2),
(44, 'rslader2', 'sF8NOmPv', 'Rosalinda', 'Slader', 'rslader2@paginegialle.it', 2),
(45, 'bdayborne3', 'jnZvPNl', 'Benny', 'Dayborne', 'bdayborne3@bravesites.com', 2),
(46, 'eeccleshare4', 'lH2gs36OXVp', 'Elbert', 'Eccleshare', 'eeccleshare4@virginia.edu', 2),
(47, 'mraithbie5', '7p3iNV', 'Malinda', 'Raithbie', 'mraithbie5@myspace.com', 2),
(48, 'ahanford6', 'XkZeauxlc6q', 'Aggy', 'Hanford', 'ahanford6@wsj.com', 2),
(49, 'tchasmar7', 'htgawugw', 'Town', 'Chasmar', 'tchasmar7@usatoday.com', 2),
(50, 'mkolinsky8', 'kDYHWq', 'May', 'Kolinsky', 'mkolinsky8@epa.gov', 2),
(51, 'agraddon9', 'vulpkMhD', 'Ali', 'Graddon', 'agraddon9@cisco.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE `usertype` (
  `UserTypeID` int(1) NOT NULL,
  `UserTypeName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`UserTypeID`, `UserTypeName`) VALUES
(1, 'Lecturer'),
(2, 'Student'),
(3, 'GroupLeader');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groupmembers`
--
ALTER TABLE `groupmembers`
  ADD PRIMARY KEY (`GroupmemberID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `GroupID` (`GroupID`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`groupID`),
  ADD KEY `projectID` (`projectID`);

--
-- Indexes for table `modulemembers`
--
ALTER TABLE `modulemembers`
  ADD PRIMARY KEY (`UserModuleID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ModuleID` (`ModuleID`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`ModuleID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`PostID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `TaskID` (`TaskID`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`projectID`),
  ADD KEY `ModuleID` (`ModuleID`);

--
-- Indexes for table `taskassignment`
--
ALTER TABLE `taskassignment`
  ADD PRIMARY KEY (`TaskUserID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `TaskID` (`TaskID`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`TaskID`),
  ADD KEY `GroupID` (`GroupID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `UserTypeID` (`UserTypeID`);

--
-- Indexes for table `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`UserTypeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groupmembers`
--
ALTER TABLE `groupmembers`
  MODIFY `GroupmemberID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `groupID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `modulemembers`
--
ALTER TABLE `modulemembers`
  MODIFY `UserModuleID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `ModuleID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `PostID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `projectID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `taskassignment`
--
ALTER TABLE `taskassignment`
  MODIFY `TaskUserID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `TaskID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `usertype`
--
ALTER TABLE `usertype`
  MODIFY `UserTypeID` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `groupmembers`
--
ALTER TABLE `groupmembers`
  ADD CONSTRAINT `groupmembers_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `groupmembers_ibfk_2` FOREIGN KEY (`GroupID`) REFERENCES `groups` (`groupID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`projectID`) REFERENCES `projects` (`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `modulemembers`
--
ALTER TABLE `modulemembers`
  ADD CONSTRAINT `modulemembers_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `modulemembers_ibfk_2` FOREIGN KEY (`ModuleID`) REFERENCES `modules` (`ModuleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`TaskID`) REFERENCES `tasks` (`TaskID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`ModuleID`) REFERENCES `modules` (`ModuleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `taskassignment`
--
ALTER TABLE `taskassignment`
  ADD CONSTRAINT `taskassignment_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `taskassignment_ibfk_2` FOREIGN KEY (`TaskID`) REFERENCES `tasks` (`TaskID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`GroupID`) REFERENCES `groups` (`groupID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`UserTypeID`) REFERENCES `usertype` (`UserTypeID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
