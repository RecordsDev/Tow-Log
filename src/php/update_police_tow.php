<?php
header('Access-Control-Allow-Origin: *');  // This will allow all origins. Adjust as needed for security.
require_once 'config.php';
require_once 'db_connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $conn = getConnection();
        
        // Prepare the UPDATE statement
        $stmt = $conn->prepare("UPDATE police_tows SET 
            lic_plate = ?, lic_state = ?, vin = ?, make = ?, model = ?, 
            year = ?, color = ?, dr = ?, date = ?, reason_id = ?, 
            tow_company_id = ?, notes = ?, employee_id = ?, 
            evidence_hold = ?, thirty_day_hold = ?, released = ?
            WHERE id = ?");
        
        // Bind parameters
        $stmt->bind_param("ssssssssssssssssi", 
            $_POST['lic_plate'], $_POST['lic_state'], $_POST['vin'], 
            $_POST['make'], $_POST['model'], $_POST['year'], $_POST['color'], 
            $_POST['dr'], $_POST['date'], $_POST['reason_id'], 
            $_POST['tow_company_id'], $_POST['notes'], $_POST['employee_id'], 
            $_POST['evidence_hold'], $_POST['thirty_day_hold'], $_POST['released'],
            $_POST['id']);
        
        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Police tow updated successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error updating police tow"]);
        }
        
        $stmt->close();
    } catch(Exception $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}