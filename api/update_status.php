<?php
/**
 * HONTECH AUTO CENTER INC. — Update Booking Status API
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true) ?: $_POST;

$id = trim($data['id'] ?? '');
$status = trim($data['status'] ?? '');

$allowed_statuses = ['Pending Calibration', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'];

if (empty($id) || !in_array($status, $allowed_statuses)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid ID or status value.']);
    exit;
}

$db = get_db_connection();
if ($db) {
    try {
        $stmt = $db->prepare("UPDATE appointments SET status = :status WHERE id = :id");
        $stmt->execute([':status' => $status, ':id' => $id]);
        echo json_encode(['success' => true, 'message' => 'Status updated in MySQL database.']);
        exit;
    } catch (PDOException $e) {
        error_log("Failed to update status in MySQL: " . $e->getMessage());
    }
}

// JSON fallback update
if (file_exists(BOOKINGS_JSON)) {
    $raw_bookings = file_get_contents(BOOKINGS_JSON);
    $bookings = json_decode($raw_bookings, true) ?: [];
    $found = false;
    foreach ($bookings as &$b) {
        if ($b['id'] === $id) {
            $b['status'] = $status;
            $found = true;
            break;
        }
    }
    if ($found) {
        file_put_contents(BOOKINGS_JSON, json_encode($bookings, JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'message' => 'Status updated in JSON store.']);
        exit;
    }
}

echo json_encode(['success' => false, 'message' => 'Booking not found.']);
