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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $buildingId = $_POST['buildingId'];
    $apartmentName = $_POST['apartmentName'];
    $apartmentCost = $_POST['apartmentCost'];

    $stmt = $conn->prepare("INSERT INTO Apartments (Name, Cost, Building_ID) VALUES (?, ?, ?)");
    $stmt->bind_param("sdi", $apartmentName, $apartmentCost, $buildingId);

    if ($stmt->execute()) {
        $response = [
            'success' => true
        ];
    } else {
        $response = [
            'success' => false,
            'error' => 'Error al agregar el departamento'
        ];
    }

    $stmt->close();
} else {
    $response = [
        'success' => false,
        'error' => 'Método no válido'
    ];
}

echo json_encode($response);
?>
