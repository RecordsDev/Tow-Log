<?php
require_once 'config.php';
require_once 'db_connect.php';

header('Content-Type: application/json');

try {
    $conn = getConnection();
    
    $query = "SELECT pt.*, tc.name as tow_company_name, tr.reason as tow_reason
              FROM police_tows pt
              LEFT JOIN tow_companies tc ON pt.tow_company_id = tc.id
              LEFT JOIN tow_reasons tr ON pt.reason_id = tr.id
              ORDER BY pt.date DESC
              LIMIT 20"; // Limiting to 20 records for now
    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($results);
} catch(PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}