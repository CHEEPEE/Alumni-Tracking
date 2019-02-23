<?php
if($requestType == "addUser"){
    include '../Database.php';
    
    $fName = getValue('fName');
    $mName = getValue('mName');
    $lName = getValue('lName');
    $email = getValue('email');
    $contact = getValue('contact');
    $studentId = getValue('studentId');
    $gender = getValue('gender');
    $address = getValue('address');
    $permaAddress = getValue('permaAddress');
    $course = getValue('course');
    $birthDate = getValue('birthDate');
    $now = DateTime::createFromFormat('U.u', microtime(true));
    $timeStamp = $now->format("YmdHisu");
    if(isIdAvailable($studentId)){
        $query = "INSERT INTO alumni(user_id,first_name,middle_name,last_name,email,number,birthdate,gender,address,permanent_address,course,photo,is_graduate) 
    VALUES ('$studentId','$fName','$mName','$lName','$email','$contact','$birthDate','$gender','$address','$permaAddress','$course','placeholder.png','false')";
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
        insertIntoUsers($email,$timeStamp,$studentId,$fName.' '.$mName.' '.$lName);
     
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
    }else{
        echo "idTaken";
    }
}

if($requestType == "getProfile"){
    include '../Database.php';
    $user_id = getValue('user_id');
    $sql = "select * from alumni where user_id = '$user_id'";
    $result = $connect->query($sql);
    $arrayData;
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
        $arrayData=$subject;
        
        }
    }
    echo json_encode($arrayData);
}

if($requestType == "deleteProfile"){
    include '../Database.php';
    $id = getValue('user_id');
    $sql = "delete from alumni where user_id = '$id'";
    if(mysqli_query($connect,$sql)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }
    $sql2 = "delete from users where user_id = '$id'";
    if(mysqli_query($connect,$sql2))
    {
        echo 'success';
    }else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }
}



if($requestType == "fetchAlumni"){
    include '../Database.php';

    $sql = "select * from alumni ORDER BY last_name";
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
        if($row['user_id']!=1){
            $arrayData[]=$subject;
        }
      
        
        }
    }
    echo json_encode($arrayData);
}

function insertIntoUsers($username,$password,$user_id,$studentName){
    include '../Database.php';
    $query = "INSERT INTO users(user_id,username,password,user_type) 
    VALUES ('$user_id','$username','$password','student')";
    if(mysqli_query($connect,$query)) 
    {
        // echo 'success';
        sendPasswordMail($password,$username,$user_id);
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}


function sendPasswordMail($password,$email,$studentName){
    $to =$email;
   
    $subject = "Account Creation Notice";

    $message = "
    <html>
    <head>
    <title>University of Antique Password Automatic Email Sender</title>
    </head>
    <body>
    <p>Dear $studentName,

    Account Created under $studentName have the following password: $password<br>
    <br>
   
    Please don't share this information to others. Thank you.
    </p>

    <br>
    <p>Details:
    email: $email
    password: $password
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

    if(mail($to,$subject,$message,$headers)){
        echo "sent Success";
    }else{
        echo "failed";
    }
    // echo mail($to,$subject,$message,$headers);
}

?>