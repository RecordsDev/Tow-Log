<?php
require_once 'config.php';
require_once 'db_connect.php';

header('Content-Type: application/json');

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    $conn = getConnection();
    
    // Fetch police tows
    $policeTowQuery = "SELECT pt.*, tc.name as tow_company_name, tr.reason as tow_reason
                       FROM police_tows pt
                       LEFT JOIN tow_companies tc ON pt.tow_company_id = tc.id
                       LEFT JOIN tow_reasons tr ON pt.reason_id = tr.id
                       ORDER BY pt.date DESC
                       LIMIT 20";
    
    $policeTowStmt = $conn->prepare($policeTowQuery);
    $policeTowStmt->execute();
    $policeTows = $policeTowStmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch PPI/Repo tows
    $ppiRepoQuery = "SELECT pr.*, tc.name as tow_company_name
                     FROM ppiRepo_tows pr
                     LEFT JOIN tow_companies tc ON pr.tow_company_id = tc.id
                     ORDER BY pr.date DESC, pr.time_of_tow DESC
                     LIMIT 20";
    
    $ppiRepoStmt = $conn->prepare($ppiRepoQuery);
    $ppiRepoStmt->execute();
    $ppiRepoTows = $ppiRepoStmt->fetchAll(PDO::FETCH_ASSOC);

    // Combine results
    $result = [
        'policeTows' => $policeTows,
        'ppiRepoTows' => $ppiRepoTows
    ];

    echo json_encode($result);

} catch(PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}