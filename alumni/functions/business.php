<?php 
if($requestType == "saveBusiness"){
    include '../Database.php';
    $businessName = getValue('businessName');
    $businessCat = getValue("businessCat");
    $businessStart = getValue("businessStart");

}

?>