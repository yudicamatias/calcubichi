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

    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);
}
?>