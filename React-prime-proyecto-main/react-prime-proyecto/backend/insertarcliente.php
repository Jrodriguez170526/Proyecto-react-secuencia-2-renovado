<?php

// Verificar si la solicitud es de tipo OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    exit();
}

// Headers CORS para respuestas normales
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Verificar si el método de solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'conexion.php'; 

    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['nombre']) || empty($data['telefono']) || empty($data['direccion']) || empty($data['correo'])) {
        http_response_code(400); // Bad Request
        echo json_encode(array('message' => 'Faltan datos requeridos para insertar el cliente'));
        exit();
    }

    $cliente = [
        'nombre' => $data['nombre'],
        'telefono' => $data['telefono'],
        'direccion' => $data['direccion'],
        'correo' => $data['correo']
    ];

    try {
        
        $query = 'INSERT INTO clientes (nombre, telefono, direccion, correo) VALUES (:nombre, :telefono, :direccion, :correo)';
        $statement = $conex->prepare($query);

        $result = $statement->execute($cliente);

        if ($result) {
            $id = $conex->lastInsertId(); 
            http_response_code(201); 
            echo json_encode(array('message' => 'cliente insertado correctamente', 'id' => $id));
        } else {
            http_response_code(400); // Código 400: Bad Request
            echo json_encode(array('message' => 'Error al intentar insertar el cliente'));
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