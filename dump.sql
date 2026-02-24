-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: Fairsaydb
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `complaint_evidence`
--

DROP TABLE IF EXISTS `complaint_evidence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint_evidence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `complaint_id` int NOT NULL,
  `file_url` text NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `description` text,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `complaint_id` (`complaint_id`),
  CONSTRAINT `complaint_evidence_ibfk_1` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint_evidence`
--

LOCK TABLES `complaint_evidence` WRITE;
/*!40000 ALTER TABLE `complaint_evidence` DISABLE KEYS */;
INSERT INTO `complaint_evidence` VALUES (1,1,'https://res.cloudinary.com/dim6iplkd/image/upload/v1771824164/fairsay_evidence/xagzwbqib2o5olcryszw.png','image/png','Photos of email logs','2026-02-23 05:22:46'),(3,3,'https://res.cloudinary.com/dim6iplkd/image/upload/v1771865125/fairsay_evidence/cfxm7bccaflrbzh8ghlw.png','image/png','Whistleblower evidence','2026-02-23 16:45:26'),(4,1,'https://res.cloudinary.com/dim6iplkd/image/upload/v1771865524/fairsay_evidence/fz7wp5flhzb43lj8rquy.png','image/png','Photos of email logs','2026-02-23 16:52:05');
/*!40000 ALTER TABLE `complaint_evidence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaint_parties`
--

DROP TABLE IF EXISTS `complaint_parties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint_parties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `complaint_id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `job_title` varchar(150) DEFAULT NULL,
  `department` varchar(150) DEFAULT NULL,
  `contact_info` varchar(150) DEFAULT NULL,
  `is_witness` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `complaint_id` (`complaint_id`),
  CONSTRAINT `complaint_parties_ibfk_1` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint_parties`
--

LOCK TABLES `complaint_parties` WRITE;
/*!40000 ALTER TABLE `complaint_parties` DISABLE KEYS */;
INSERT INTO `complaint_parties` VALUES (1,1,'John Doe','Manager','Logistics',NULL,0,'2026-02-22 14:54:12'),(2,1,'Sarah Smith','HR Lead','HR',NULL,1,'2026-02-22 14:54:12'),(3,1,'John Doe','Manager','Logistics',NULL,0,'2026-02-23 16:51:32'),(4,1,'Sarah Smith','HR Lead','HR',NULL,1,'2026-02-23 16:51:32'),(5,4,'John Doe','Manager','Logistics',NULL,0,'2026-02-23 16:57:24'),(6,4,'Sarah Smith','HR Lead','HR',NULL,1,'2026-02-23 16:57:24');
/*!40000 ALTER TABLE `complaint_parties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaint_status_history`
--

DROP TABLE IF EXISTS `complaint_status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaint_status_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `complaint_id` int NOT NULL,
  `status` enum('draft','submitted','under_review','investigation','resolved','rejected') NOT NULL,
  `changed_by` int DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `complaint_id` (`complaint_id`),
  KEY `changed_by` (`changed_by`),
  CONSTRAINT `complaint_status_history_ibfk_1` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE,
  CONSTRAINT `complaint_status_history_ibfk_2` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint_status_history`
--

LOCK TABLES `complaint_status_history` WRITE;
/*!40000 ALTER TABLE `complaint_status_history` DISABLE KEYS */;
INSERT INTO `complaint_status_history` VALUES (1,1,'submitted',3,NULL,'2026-02-23 11:57:05'),(2,3,'submitted',3,NULL,'2026-02-23 16:45:27'),(3,4,'submitted',3,NULL,'2026-02-23 16:57:37');
/*!40000 ALTER TABLE `complaint_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tracking_id` varchar(30) DEFAULT NULL,
  `user_id` int NOT NULL,
  `violation_category` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date_of_incident` date DEFAULT NULL,
  `time_of_incident` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_ongoing` tinyint(1) DEFAULT '0',
  `keep_confidential` tinyint(1) DEFAULT '0',
  `has_previously_reported` tinyint(1) DEFAULT '0',
  `reported_to` varchar(150) DEFAULT NULL,
  `date_reported` date DEFAULT NULL,
  `action_taken` text,
  `desired_outcome` text,
  `status` enum('draft','submitted','under_review','investigation','resolved','rejected') DEFAULT 'draft',
  `priority` enum('low','medium','high','critical') DEFAULT 'medium',
  `assigned_to` int DEFAULT NULL,
  `current_step` int DEFAULT '1',
  `is_draft` tinyint(1) DEFAULT '1',
  `is_submitted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `submitted_at` timestamp NULL DEFAULT NULL,
  `resolved_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tracking_id` (`tracking_id`),
  KEY `user_id` (`user_id`),
  KEY `assigned_to` (`assigned_to`),
  KEY `idx_complaints_status` (`status`),
  CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `complaints_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (1,'CPL-2026-000001',3,'Discrimination','Unfair treatment','I was denied a promotion based on...','2026-02-21','11:00:00','Head Office',0,0,0,NULL,NULL,NULL,NULL,'submitted','medium',NULL,2,1,1,'2026-02-22 14:46:01','2026-02-23 16:51:09','2026-02-23 11:57:05',NULL),(3,'CPL-2026-000002',3,'safety','Anonymous Report: safety','The emergency exit in Block B is locked. there was an icidence of fire, and two staff were affected.\nThe management promise to compnsate but have not done so till date.','2026-02-23',NULL,'Block B - Warehouse',0,0,0,NULL,NULL,NULL,NULL,'submitted','medium',NULL,5,0,1,'2026-02-23 16:45:26','2026-02-23 16:45:26','2026-02-23 16:45:26',NULL),(4,'CPL-2026-000003',3,'Discrimination','Unfair treatment from my Manager','I was denied a promotion based on gender, and sallary was deducted','2026-02-21','11:00:00','Head Office',0,0,0,NULL,NULL,NULL,NULL,'submitted','medium',NULL,5,1,1,'2026-02-23 16:50:32','2026-02-23 16:57:37','2026-02-23 16:57:37',NULL);
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_verifications`
--

DROP TABLE IF EXISTS `employee_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_verifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `declaration` text,
  `document_path` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `reviewed_by` int DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `reviewed_by` (`reviewed_by`),
  KEY `idx_verification_status` (`status`),
  CONSTRAINT `employee_verifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `employee_verifications_ibfk_2` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_verifications`
--

LOCK TABLES `employee_verifications` WRITE;
/*!40000 ALTER TABLE `employee_verifications` DISABLE KEYS */;
INSERT INTO `employee_verifications` VALUES (1,3,NULL,NULL,'approved',2,'2026-02-21 21:37:22',NULL,'2026-02-21 20:31:46','2026-02-21 20:37:22'),(5,1,NULL,NULL,'approved',2,'2026-02-21 21:52:46',NULL,'2026-02-21 20:52:46','2026-02-21 20:52:46');
/*!40000 ALTER TABLE `employee_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `password_reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `job_title` varchar(150) DEFAULT NULL,
  `department` varchar(150) DEFAULT NULL,
  `company_name` varchar(150) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES (1,3,'Software Engineer','Engineering','FairSay Ltd','08012345678','Lagos','2026-02-21 17:06:33','2026-02-21 17:06:33');
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin','investigator','super_admin') DEFAULT 'user',
  `email_verified` tinyint(1) DEFAULT '0',
  `email_verification_token` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `last_login_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mary','Eric','ogbadamary1@gmail.com','$2b$10$OcTpt3heH7t/wd7rlUa3X.W/yHL/Bg1OOuknVmyWgE5sRnANbYA1G','user',0,'99cb4d457b238b566aacb616cc7cc4575551fb4c',1,NULL,'2026-02-21 14:07:06','2026-02-21 14:07:06'),(2,'Justina','Ene','enenchejustina@gmail.com','$2b$10$695il2v4VPOVD6GcC.AEI.rzsm2P6P9JU1iXApf6js7Z4deJsnYde','super_admin',1,NULL,1,'2026-02-21 20:29:42','2026-02-21 15:15:52','2026-02-21 19:29:42'),(3,'Tina','Enny','tinaenenche234@gmail.com','$2b$10$p5mthD8t0rjiJ24R/ZeFS.jkakEe3b4213kOeOsn0WX36ilqRo7Ry','user',1,NULL,1,'2026-02-23 17:06:06','2026-02-21 15:26:14','2026-02-23 16:06:06'),(4,'Lizzy','Nwa','nwakagoeliza@gmail.com','$2b$10$PTz9ZNSo4q8hwxWk5fIOn.1JcElwQknVfVD4kFPTgF/vZjxdwj4Ea','user',1,NULL,1,NULL,'2026-02-21 15:32:22','2026-02-21 15:37:35');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-24  7:10:48
