<?php

// handle the request here

require_once 'db_connection.php';

// Retrieve the list of users
$sql = "SELECT * FROM users";
$stmt = $pdo->prepare($sql);
$stmt->execute();

// Build the response object
$userlist = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$userdata = array(
		"user_id" => $row["user_id"],
		"name" => $row["name"],
		"email" => $row["email"],
		"date" => $row["date"]
	);
	array_push($userlist, $userdata);
}
$response = array(
	"status" => "success",
	"userlist" => array(
		"userdata" => $userlist
	)
);

// Send the response
header("Content-Type: application/json");
echo json_encode($response);
