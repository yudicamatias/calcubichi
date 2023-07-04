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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['apartment_id'])) {
    $apartmentId = $_GET['apartment_id'];

    $stmt = $conn->prepare("DELETE FROM Apartments WHERE ID = ?");
    $stmt->bind_param("i", $apartmentId);

    if ($stmt->execute()) {
        $response = [
            'success' => true
        ];
    } else {
        $response = [
            'success' => false,
            'error' => 'Error al eliminar el departamento'
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
