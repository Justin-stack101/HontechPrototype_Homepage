<?php
/**
 * HONTECH AUTO CENTER INC. — System Configuration & Database Connector
 * Compatible with XAMPP (Apache + MySQL / MariaDB)
 * 
 * Default XAMPP Credentials:
 * Host: localhost
 * User: root
 * Password: (empty)
 * Database: hontech_db
 */

// Enable error reporting for development (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'hontech_db');
define('DB_PORT', '3306');

// Data storage paths for JSON fallback
define('DATA_DIR', __DIR__ . '/data');
define('BOOKINGS_JSON', DATA_DIR . '/bookings.json');
define('MESSAGES_JSON', DATA_DIR . '/messages.json');

// Ensure data directory exists for JSON fallback
if (!file_exists(DATA_DIR)) {
    @mkdir(DATA_DIR, 0777, true);
}

/**
 * Get PDO Database Connection with automatic database & table creation
 * Returns PDO object on success, or null on MySQL failure (graceful JSON fallback)
 */
function get_db_connection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    try {
        // First attempt connecting to MySQL server directly
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => 2, // 2-second timeout so page won't hang if MySQL is offline
        ];

        $temp_pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        
        // Ensure database exists
        $temp_pdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $temp_pdo->exec("USE `" . DB_NAME . "`");

        // Ensure tables exist
        $temp_pdo->exec("
            CREATE TABLE IF NOT EXISTS `appointments` (
                `id` VARCHAR(32) PRIMARY KEY,
                `customer_name` VARCHAR(150) NOT NULL,
                `phone` VARCHAR(50) NOT NULL,
                `email` VARCHAR(150) NULL,
                `car_model` VARCHAR(100) NOT NULL,
                `car_type` VARCHAR(50) NOT NULL DEFAULT 'sedan',
                `booking_date` DATE NOT NULL,
                `booking_time` VARCHAR(20) NOT NULL,
                `services` TEXT NOT NULL,
                `total_estimate` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
                `status` VARCHAR(50) NOT NULL DEFAULT 'Pending Calibration',
                `notes` TEXT NULL,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $temp_pdo->exec("
            CREATE TABLE IF NOT EXISTS `contact_messages` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `name` VARCHAR(150) NOT NULL,
                `email` VARCHAR(150) NOT NULL,
                `message` TEXT NOT NULL,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $pdo = $temp_pdo;
        return $pdo;
    } catch (Exception $e) {
        // MySQL connection failed or MySQL service not started in XAMPP.
        // We will log the error and use JSON file storage as graceful fallback.
        error_log("Database connection error: " . $e->getMessage());
        return null;
    }
}

/**
 * Save an appointment (MySQL with JSON fallback)
 */
function save_appointment($data) {
    $db = get_db_connection();
    
    // Generate unique reference ID (e.g. HACI-739214)
    if (empty($data['id'])) {
        $data['id'] = 'HACI-' . rand(100000, 999999);
    }
    
    if (is_array($data['services'])) {
        $data['services_json'] = json_encode($data['services']);
    } else {
        $data['services_json'] = $data['services'];
    }
    
    if ($db) {
        try {
            $stmt = $db->prepare("
                INSERT INTO appointments (
                    id, customer_name, phone, email, car_model, car_type,
                    booking_date, booking_time, services, total_estimate, status, notes
                ) VALUES (
                    :id, :customer_name, :phone, :email, :car_model, :car_type,
                    :booking_date, :booking_time, :services, :total_estimate, :status, :notes
                )
            ");
            
            $stmt->execute([
                ':id' => $data['id'],
                ':customer_name' => $data['name'] ?? $data['customer_name'] ?? 'Valued Customer',
                ':phone' => $data['phone'] ?? '',
                ':email' => $data['email'] ?? '',
                ':car_model' => $data['car_model'] ?? 'Vehicle',
                ':car_type' => $data['car_type'] ?? 'sedan',
                ':booking_date' => $data['booking_date'] ?? date('Y-m-d'),
                ':booking_time' => $data['booking_time'] ?? '09:00 AM',
                ':services' => $data['services_json'],
                ':total_estimate' => floatval($data['total_estimate'] ?? 0),
                ':status' => $data['status'] ?? 'Pending Calibration',
                ':notes' => $data['notes'] ?? ''
            ]);
            
            return ['success' => true, 'id' => $data['id'], 'storage' => 'mysql'];
        } catch (PDOException $e) {
            error_log("Failed to insert appointment into MySQL: " . $e->getMessage());
            // Fall back to JSON
        }
    }

    // JSON Fallback
    $bookings = [];
    if (file_exists(BOOKINGS_JSON)) {
        $raw = file_get_contents(BOOKINGS_JSON);
        $bookings = json_decode($raw, true) ?: [];
    }
    
    $entry = [
        'id' => $data['id'],
        'customer_name' => $data['name'] ?? $data['customer_name'] ?? 'Valued Customer',
        'phone' => $data['phone'] ?? '',
        'email' => $data['email'] ?? '',
        'car_model' => $data['car_model'] ?? 'Vehicle',
        'car_type' => $data['car_type'] ?? 'sedan',
        'booking_date' => $data['booking_date'] ?? date('Y-m-d'),
        'booking_time' => $data['booking_time'] ?? '09:00 AM',
        'services' => is_array($data['services']) ? $data['services'] : json_decode($data['services'], true),
        'total_estimate' => floatval($data['total_estimate'] ?? 0),
        'status' => $data['status'] ?? 'Pending Calibration',
        'notes' => $data['notes'] ?? '',
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    array_unshift($bookings, $entry);
    file_put_contents(BOOKINGS_JSON, json_encode($bookings, JSON_PRETTY_PRINT));
    
    return ['success' => true, 'id' => $data['id'], 'storage' => 'json'];
}

/**
 * Save a contact message (MySQL with JSON fallback)
 */
function save_contact_message($name, $email, $message) {
    $db = get_db_connection();
    
    if ($db) {
        try {
            $stmt = $db->prepare("INSERT INTO contact_messages (name, email, message) VALUES (:name, :email, :message)");
            $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':message' => $message
            ]);
            return ['success' => true, 'storage' => 'mysql'];
        } catch (PDOException $e) {
            error_log("Failed to insert contact message into MySQL: " . $e->getMessage());
        }
    }
    
    // JSON Fallback
    $messages = [];
    if (file_exists(MESSAGES_JSON)) {
        $raw = file_get_contents(MESSAGES_JSON);
        $messages = json_decode($raw, true) ?: [];
    }
    
    $entry = [
        'id' => time() . '-' . rand(100, 999),
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    array_unshift($messages, $entry);
    file_put_contents(MESSAGES_JSON, json_encode($messages, JSON_PRETTY_PRINT));
    
    return ['success' => true, 'storage' => 'json'];
}

/**
 * Retrieve all appointments
 */
function get_all_appointments() {
    $db = get_db_connection();
    if ($db) {
        try {
            $stmt = $db->query("SELECT * FROM appointments ORDER BY created_at DESC");
            $rows = $stmt->fetchAll();
            foreach ($rows as &$row) {
                $decoded = json_decode($row['services'], true);
                $row['services'] = is_array($decoded) ? $decoded : [$row['services']];
            }
            return $rows;
        } catch (PDOException $e) {
            error_log("Error fetching appointments: " . $e->getMessage());
        }
    }
    
    if (file_exists(BOOKINGS_JSON)) {
        $raw = file_get_contents(BOOKINGS_JSON);
        return json_decode($raw, true) ?: [];
    }
    return [];
}

/**
 * Retrieve all contact messages
 */
function get_all_messages() {
    $db = get_db_connection();
    if ($db) {
        try {
            $stmt = $db->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("Error fetching messages: " . $e->getMessage());
        }
    }
    
    if (file_exists(MESSAGES_JSON)) {
        $raw = file_get_contents(MESSAGES_JSON);
        return json_decode($raw, true) ?: [];
    }
    return [];
}
