<?php
$connect = mysqli_connect("localhost", "root", "", "ua_tracking");
if ($connect->connect_error) {
    die("Connection failed: " . $connect->connect_error);
}
?>
