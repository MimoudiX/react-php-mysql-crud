<?php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->userids) && !empty(trim($data->userids))) {

	$userids = trim($data->userids);

	$stmt = $pdo->prepare("DELETE FROM users WHERE user_id=:userids");
	$stmt->bindParam(':userids', $userids);

	if ($stmt->execute()) {
		echo json_encode(["success" => true]);
	} else {
		echo json_encode(["success" => false, "msg" => "Server Problem. Please Try Again"]);
	}
} else {
	echo json_encode(["success" => false, "msg" => "Please fill all the required fields!"]);
}
