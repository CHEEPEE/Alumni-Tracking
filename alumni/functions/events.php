<?php
if($requestType == "addEvent"){
    include '../Database.php';
    session_start();
    $user_id = $_SESSION['user_id'];
    $whatEvent = getValue('whatEvent');
    $whenEvent = getValue('whenEvent');
    $whereEvent = getValue('whereEvent');


    $query = "insert into event(
        whatEvent,whenEvent,whereEvent,eventStatus,user_id
        ) values (
            '$whatEvent','$whenEvent','$whereEvent','request','$user_id'
        )";
    
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}

if($requestType == "fetchEvents"){
    include '../Database.php';
    $sql = "select * from event where eventStatus = 'approved'";
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