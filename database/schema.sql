-- HONTECH AUTO CENTER INC. — Database Schema
-- Compatible with MySQL / MariaDB (XAMPP phpMyAdmin)

CREATE DATABASE IF NOT EXISTS `hontech_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `hontech_db`;

-- --------------------------------------------------------
-- Table structure for table `appointments`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` VARCHAR(32) NOT NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `car_model` VARCHAR(100) NOT NULL,
  `car_type` VARCHAR(50) NOT NULL DEFAULT 'sedan',
  `booking_date` DATE NOT NULL,
  `booking_time` VARCHAR(20) NOT NULL,
  `services` TEXT NOT NULL,
  `total_estimate` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Pending Calibration',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `contact_messages`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Sample initial seed data for demo
-- --------------------------------------------------------
INSERT INTO `appointments` (`id`, `customer_name`, `phone`, `email`, `car_model`, `car_type`, `booking_date`, `booking_time`, `services`, `total_estimate`, `status`, `notes`) 
VALUES 
('HACI-884129', 'Mark Bautista', '0917-555-0192', 'mark.bautista@example.com', 'Toyota Vios 2021', 'sedan', CURDATE(), '09:00 AM', '["Clean/Check Brake Systems","Change Engine Oil","Change Oil Filter"]', 3700.00, 'Confirmed', 'Customer requests synthetic 5W-30 oil'),
('HACI-719302', 'Elena Santos', '0922-834-1188', 'elena.s@example.com', 'Mitsubishi Montero Sport', 'suv', DATE_ADD(CURDATE(), INTERVAL 1 DAY), '01:30 PM', '["Clean/Check Brake Systems","Check A/C System & Filter","Car Detailing & Wax"]', 5688.00, 'Pending Calibration', 'Please inspect rear AC blower');
