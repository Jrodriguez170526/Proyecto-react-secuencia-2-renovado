<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    exit();
}

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'conexion.php'; // Asegúrate de que este archivo establece la conexión en $conex

    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['nombre']) || empty($data['categoria']) || empty($data['precio']) || empty($data['cantidad']) || empty($data['total'])) {
        http_response_code(400); // Bad Request
        echo json_encode(array('message' => 'Faltan datos requeridos para insertar la venta'));
        exit();
    }

    $venta = [
        'nombre' => $data['nombre'],
        'categoria' => $data['categoria'],
        'precio' => $data['precio'],
        'cantidad' => $data['cantidad'],
        'total' => $data['total']
    ];

    try {
        // Preparar la consulta SQL para insertar la venta
        $query = 'INSERT INTO ventas (nombre, categoria, precio, cantidad, total) VALUES (:nombre, :categoria, :precio, :cantidad, :total)';
        $statement = $conex->prepare($query);

        $result = $statement->execute($venta);

        if ($result) {
            $id = $conex->lastInsertId(); // Obtener el ID de la venta insertada
            http_response_code(201); // Código 201: Created
            echo json_encode(array('message' => 'Venta insertada correctamente', 'id' => $id));
        } else {
            http_response_code(400); // Código 400: Bad Request
            echo json_encode(array('message' => 'Error al intentar insertar la venta'));
        }
    } catch (PDOException $e) {
        http_response_code(500); // Código 500: Internal Server Error
        echo json_encode(array('message' => 'Error en la base de datos: ' . $e->getMessage()));
    } catch (Exception $e) {
        http_response_code(500); // Código 500: Internal Server Error
        echo json_encode(array('message' => 'Error en el servidor: ' . $e->getMessage()));
    }
} else {
    // Si el método de solicitud no es POST, retornar un error
    http_response_code(405); // Código 405: Method Not Allowed
    echo json_encode(array('message' => 'Método no permitido'));
}
?>