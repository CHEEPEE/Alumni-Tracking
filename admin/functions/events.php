<?php

if($requestType == "addEvent"){
    include '../Database.php';
    $whatEvent = getValue('whatEvent');
    $whenEvent = getValue('whenEvent');
    $whereEvent = getValue('whereEvent');
    $eventType =  getValue('eventType');


    $query = "insert into event(
        whatEvent,whenEvent,whereEvent,eventStatus,user_id,eventType
        ) values (
            '$whatEvent','$whenEvent','$whereEvent','approved','1','$eventType'
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

if($requestType == "updateEvent"){
    include '../Database.php';
    $whereEvent = getValue("whereEvent");
    $whatEvent = getValue("whatEvent");
    $whenEvent = getValue("whenEvent");
    $eventType = getValue("eventType");
    $eventID = getValue("eventID");

    $query = "update event set whatEvent = '$whatEvent',whenEvent = '$whenEvent',whereEvent = '$whereEvent',eventType = '$eventType' where eventID = '$eventID'";
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}

if($requestType == "fetchEventsRequest"){
    include '../Database.php';
    $sql = "select * from event where eventStatus = 'request'";
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

if($requestType == "approveEvent"){
    include '../Database.php';
    $status = getValue('status');
    $eventID = getValue('eventId');
    $sql = "update event set eventStatus = '$status' where eventID = '$eventID'";
    if(mysqli_query($connect,$sql))
    {
        echo 'success';
    
    }else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }
}


if($requestType == "deleteEvent"){
    include '../Database.php';
    $id = intval(getValue('id'));
    $sql = "delete from event where eventID = $id";
    if(mysqli_query($connect,$sql)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }
}
?>

