<?php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
	isset($data->username)
	&& isset($data->useremail)
	&& isset($data->userids)
	&& !empty(trim($data->username))
	&& !empty(trim($data->useremail))
	&& !empty(trim($data->userids))
) {

	$username = trim($data->username);
	$useremail = trim($data->useremail);
	$userids = trim($data->userids);

	$stmt = $pdo->prepare("UPDATE users SET name=:name, email=:email WHERE user_id=:user_id");
	$stmt->bindParam(':name', $username);
	$stmt->bindParam(':email', $useremail);
	$stmt->bindParam(':user_id', $userids);

	if ($stmt->execute()) {
		echo json_encode(["success" => true]);
		return;
	} else {
		echo json_encode(["success" => false, "msg" => "Server Problem. Please Try Again"]);
		return;
	}
} else {
	echo json_encode(["success" => false, "msg" => "Please fill all the required fields!"]);
	return;
}
