<?php
include 'vars.php';

$conex = new PDO("sqlite:" . $nombre_fichero); 

$stmt_ventas = $conex->prepare('SELECT * FROM ventas;');
$stmt_ventas->execute();
$ventas = $stmt_ventas->fetchAll(PDO::FETCH_ASSOC);

$stmt_ventas = null;
$conex = null;

$response_data = array(
    'ventas' => $ventas
);

http_response_code(200);
echo json_encode($response_data);
?>