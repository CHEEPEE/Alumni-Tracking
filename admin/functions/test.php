<?php
include '../Database.php';
$sql = "select * from alumni";
$result = $connect->query($sql);
$arrayData = array();
class myObject
{
    public $property1;
}
if ($result->num_rows >0) {
  // code...
  while ($row = $result->fetch_assoc()) {
    // code...

    $subject = new myObject();
    $subject = $row;
    $arrayData[]=$subject;
  }
}
echo json_encode($arrayData);
?>