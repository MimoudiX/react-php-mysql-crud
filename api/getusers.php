<?php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->userids) && !empty(trim($data->userids))) {
    $adduserid = trim($data->userids);

    $query = "SELECT * FROM users WHERE user_id = :adduserid";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':adduserid', $adduserid, PDO::PARAM_INT);
    $stmt->execute();

    $json_array = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $viewjson["user_id"] = $row['user_id'];
        $viewjson["name"] = $row['name'];
        $viewjson["email"] = $row['email'];
        $viewjson["date"] = $row['date'];
        $json_array["userdata"][] = $viewjson;
    }

    if (!empty($json_array["userdata"])) {
        echo json_encode(["success" => true, "userlist" => $json_array]);
        return;
    } else {
        echo json_encode(["success" => false]);
        return;
    }
} else {
    echo json_encode(["success" => false, "msg" => "Please fill all the required fields!"]);
    return;
}
