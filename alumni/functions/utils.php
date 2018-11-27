<?php
function getValue($name){
include '../Database.php';
return mysqli_real_escape_string($connect,$_POST[$name]);
}
function isIdAvailable($id){
    include '../Database.php';
    $sql = "SELECT * FROM users where user_id = '$id'";
    $result = $connect->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row
        return false;
    } else {
       return true;
    }
    }
?>