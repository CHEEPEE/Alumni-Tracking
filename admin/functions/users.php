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
        $query = "INSERT INTO alumni(user_id,first_name,middle_name,last_name,email,number,birthdate,gender,address,permanent_address,course,photo) 
    VALUES ($studentId,'$fName','$mName','$lName','$email','$contact','$birthDate','$gender','$address','$permaAddress','$course','placeholder.png')";
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
        insertIntoUsers($email,$timeStamp,$studentId);
    
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

if($requestType == "fetchAlumni"){
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
        if($row['user_id']!=1){
            $arrayData[]=$subject;
        }
      
        
        }
    }
    echo json_encode($arrayData);
}

function insertIntoUsers($username,$password,$user_id){
    include '../Database.php';
    $query = "INSERT INTO users(user_id,username,password,user_type) 
    VALUES ('$user_id','$username','$password','student')";
    if(mysqli_query($connect,$query)) 
    {
        // echo 'success';
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}

?>