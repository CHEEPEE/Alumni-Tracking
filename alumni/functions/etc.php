<?php
if($requestType == "addCategory"){
    include '../Database.php';
    $jobCategory = getValue("category");
    $query = "insert into job_categories(
        category
        ) values (
            '$jobCategory'
        )";
    
    if(mysqli_query($connect,$query))
    {
        echo 'success';
    }
    else 
    {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}



if($requestType == "fetchJobCategory"){
    include '../Database.php';
    $sql = "select * from job_categories";
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
}
if($requestType == "fetchBusinessCategory"){
    include '../Database.php';
    $sql = "select * from business_categories";
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
}
?>