<?php
/**
 * HONTECH AUTO CENTER INC. — Fetch Bookings API
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$bookings = get_all_appointments();
echo json_encode(['success' => true, 'data' => $bookings]);
