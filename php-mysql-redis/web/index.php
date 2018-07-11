<? echo "Hello, Lovable Stack!" ?>

<?php
$mysqli = new mysqli("mysql", "root", "my_password");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

/* print server version */
printf("Server version: %d\n", $mysqli->server_version);

/* close connection */
$mysqli->close();
?>

<?php
require "predis/autoload.php";
Predis\Autoloader::register();

$redis = new Predis\Client(array(
    "scheme" => "tcp",
    "host" => "redis",
    "port" => port,
    "password" => "password"));

echo "Connected to Redis";
?>