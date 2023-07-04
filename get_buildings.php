<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "u120968953_PersonasBD";
$password = "Hola1234";
$dbname = "u120968953_PersonasBD";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM Buildings");

if ($result->num_rows > 0) {
    $buildings = array();

    while ($row = $result->fetch_assoc()) {
        $building = array(
            "ID" => $row["ID"],
            "Name" => $row["Name"]
        );

        $buildings[] = $building;
    }

    echo json_encode($buildings);
} else {
    echo json_encode(array());
}

$conn->close();
?>
