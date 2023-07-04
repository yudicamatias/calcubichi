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

if (isset($_GET['building_id'])) {
    $building_id = $_GET['building_id'];
    $result = $conn->query("SELECT * FROM Apartments WHERE Building_ID = $building_id");

    if ($result->num_rows > 0) {
        $departments = array();

        while ($row = $result->fetch_assoc()) {
            $department = array(
                "ID" => $row["ID"],
                "Name" => $row["Name"],
                "Cost" => $row["Cost"]
            );

            $departments[] = $department;
        }

        echo json_encode($departments);
    } else {
        echo json_encode(array());
    }
} else {
    echo json_encode(array());
}

$conn->close();
?>
