<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once 'config.php';
require_once 'db_connect.php';

try {
    $conn = getConnection();
    
    // Prepare SQL statement
    $sql = "SELECT * FROM police_tows ORDER BY date DESC LIMIT 10";
    $stmt = $conn->prepare($sql);
    
    // Execute the statement
    $stmt->execute();
    
    // Fetch all rows
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Output results as JSON
    echo json_encode($results);
    
} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}