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


if($requestType == "sendAnnouncementEmail"){
    include '../Database.php';
    $whatEvent = getValue('whatEvent');
    $whenEvent = getValue('whenEvent');
    $whereEvent = getValue('whereEvent');
    $eventType =  getValue('eventType');
    $email = getValue('email');
    sendAnnouncement($whatEvent,$whenEvent,$whereEvent,$eventType,$email);
}
function sendAnnouncement($whatEvent,$whenEvent,$whereEvent,$eventType,$email){
        $to = $email;
        $subject = "Announcement Notice";
        $message = "
        <html>
        <head>
        <title>$whatEvent</title>
        </head>
        <body>
        <h1>$whatEvent</h1>
    
        @$whenEvent<br>
        <br>
       
        Location: $whereEvent
        </p>
        </body>
        </html>
        ";
    
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    
        // More headers
        $headers .= 'From: <UA-Alumni-tracking-System>' . "\r\n";
        $headers .= "Cc: $to" . "\r\n";
        // echo mail($to,$subject,$message,$headers);
        if(mail($to,$subject,$message,$headers)){
            echo "sent Success";
        }else{
            echo "failed";
        }
    
}

function getUsersToSendEmail($subject,$message,$headers){
    include '../Database.php';
    $sql = "select * from alumni";
    $result = $connect->query($sql);
    if ($result->num_rows >0) {
        // code...
        while ($row = $result->fetch_assoc()) {
        // code...
        $to = $row['email'];
        $head = $headers. "Cc: $to" . "\r\n";
       
        }
    }
}

if($requestType == "fetchEvents"){
    include '../Database.php';
    $sql = "select * from event where eventStatus = 'approved' order by eventID desc";
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

if($requestType == "updateMyRequest"){
    include '../Database.php';
    // session_start();
    // $user_id = $_SESSION['user_id'];
    $eventID = getValue("eventID");
    $whatEvent = getValue('whatEvent');
    $whenEvent = getValue('whenEvent');
    $whereEvent = getValue('whereEvent');
    $eventType =  getValue('eventType');


    $query = "update event set
        whatEvent = '$whatEvent',whenEvent = '$whenEvent',whereEvent = '$whereEvent',eventType = '$eventType' where eventID = '$eventID'";
    
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
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
    $sql = "select * from event where eventStatus = 'request' order by eventID desc";
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

if($requestType == "getEvent"){
    include '../Database.php';
    $eventID = getValue('eventId');
    $sql = "select * from event where eventID = $eventID ";
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

