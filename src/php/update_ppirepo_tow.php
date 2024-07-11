<?php
header('Access-Control-Allow-Origin: *');  // This will allow all origins. Adjust as needed for security.
require_once 'config.php';
require_once 'db_connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $conn = getConnection();
        
        // Prepare the UPDATE statement
        $stmt = $conn->prepare("UPDATE ppiRepo_tows SET 
            lic_plate = ?, lic_state = ?, vin = ?, make = ?, model = ?, 
            year = ?, color = ?, is_ppi = ?, is_voluntary = ?, date = ?, 
            time_of_tow = ?, time_called_in = ?, location = ?, tow_company_id = ?, 
            tow_requested_by = ?, phone_number = ?, repo_caller = ?, employee_id = ?, notes = ?
            WHERE id = ?");
        
        // Bind parameters
        $stmt->bind_param("sssssssssssssssssssi", 
            $_POST['lic_plate'], $_POST['lic_state'], $_POST['vin'], 
            $_POST['make'], $_POST['model'], $_POST['year'], $_POST['color'], 
            $_POST['is_ppi'], $_POST['is_voluntary'], $_POST['date'], 
            $_POST['time_of_tow'], $_POST['time_called_in'], $_POST['location'], 
            $_POST['tow_company_id'], $_POST['tow_requested_by'], $_POST['phone_number'], 
            $_POST['repo_caller'], $_POST['employee_id'], $_POST['notes'],
            $_POST['id']);
        
        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "PPI/Repo tow updated successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error updating PPI/Repo tow"]);
        }
        
        $stmt->close();
    } catch(Exception $e) {
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}