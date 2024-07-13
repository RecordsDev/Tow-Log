<?php
header('Content-Type: application/json');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'config.php';
require_once 'db_connect.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    $conn = getConnection();
    
    $query = "SELECT id, name FROM tow_companies ORDER BY name";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $towCompanies = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($towCompanies);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}