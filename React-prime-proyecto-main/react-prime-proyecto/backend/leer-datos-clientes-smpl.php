<?php
include 'vars.php';

$conex = new PDO("sqlite:" . $nombre_fichero); 

$stmt_clientes = $conex->prepare('SELECT * FROM clientes;');
$stmt_clientes->execute();
$clientes = $stmt_clientes->fetchAll(PDO::FETCH_ASSOC);

$stmt_productos = null;
$stmt_clientes = null;
$stmt_ventas = null;
$conex = null;

$response_data = array(
    'clientes' => $clientes
);

http_response_code(200);
echo json_encode($response_data);
?>