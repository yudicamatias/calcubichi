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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['building_id'])) {
    $buildingId = $_GET['building_id'];

    // Eliminar los departamentos asociados al edificio
    $stmtDeleteApartments = $conn->prepare("DELETE FROM Apartments WHERE Building_ID = ?");
    $stmtDeleteApartments->bind_param("i", $buildingId);
    $stmtDeleteApartments->execute();
    $stmtDeleteApartments->close();

    // Eliminar el edificio
    $stmtDeleteBuilding = $conn->prepare("DELETE FROM Buildings WHERE ID = ?");
    $stmtDeleteBuilding->bind_param("i", $buildingId);

    if ($stmtDeleteBuilding->execute()) {
        $response = [
            'success' => true
        ];
    } else {
        $response = [
            'success' => false,
            'error' => 'Error al eliminar el edificio'
        ];
    }

    $stmtDeleteBuilding->close();
} else {
    $response = [
        'success' => false,
        'error' => 'Método no válido'
    ];
}

echo json_encode($response);
?>
