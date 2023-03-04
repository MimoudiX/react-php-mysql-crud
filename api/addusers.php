<?php
require_once 'db_connection.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
	http_response_code(200);
	exit;
}

if ($method == "POST") {
	// Get the request data
	$data = json_decode(file_get_contents("php://input"));


	// Check if the required fields are present
	if (!isset($data->username) || !isset($data->useremail)) {
		http_response_code(400);
		echo json_encode(array("message" => "Name and email are required."));
		exit;
	}
	// Insert the user data into the database
	$stmt = $pdo->prepare("INSERT INTO users (name, email, date) VALUES (:name, :email, NOW())");
	$stmt->bindParam(":name", $data->username);
	$stmt->bindParam(":email", $data->useremail);

	if ($stmt->execute()) {
		http_response_code(200);
		echo json_encode(array("message" => "User added successfully."));
	} else {
		http_response_code(500);
		echo json_encode(array("message" => "Failed to add user."));
	}

	// Close the database connection
	$pdo = null;
} else {
	http_response_code(405);
	echo json_encode(array("message" => "Method not allowed."));
}
