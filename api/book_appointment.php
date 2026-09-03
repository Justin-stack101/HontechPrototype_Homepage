<?php
/**
 * HONTECH AUTO CENTER INC. — Book Appointment API Endpoint
 * Accepts JSON or POST form data
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config.php';

// Allow CORS if necessary
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

// Read raw body if application/json
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    $data = $_POST;
}

// Validate mandatory fields
$customer_name = trim($data['name'] ?? $data['customer_name'] ?? '');
$phone = trim($data['phone'] ?? '');
$car_model = trim($data['car_model'] ?? $data['model'] ?? '');
$services = $data['services'] ?? [];

if (empty($customer_name) || empty($phone) || empty($car_model)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in your name, phone number, and car model.'
    ]);
    exit;
}

if (is_string($services)) {
    $services_arr = json_decode($services, true);
    if (!is_array($services_arr)) {
        $services_arr = array_filter(array_map('trim', explode(',', $services)));
    }
    $data['services'] = $services_arr;
}

if (empty($data['services']) || count($data['services']) === 0) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please select at least one maintenance service.'
    ]);
    exit;
}

// Save appointment
$result = save_appointment($data);

if ($result['success']) {
    echo json_encode([
        'success' => true,
        'id' => $result['id'],
        'message' => 'Your appointment has been successfully scheduled!',
        'storage' => $result['storage']
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to save appointment. Please try again or call our hotline.'
    ]);
}
