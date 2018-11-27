<?php 
include '../Database.php';
if($requestType == "getProfile"){
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


if($requestType == "updateProfile"){
    include '../Database.php';
    
    $fName = getValue('first_name');
    $mName = getValue('middle_name');
    $lName = getValue('last_name');
    $email = getValue('email');
    $contact = getValue('number');
    $studentId = getValue('user_id');
    $gender = getValue('gender');
    $address = getValue('address');
    $permaAddress = getValue('permanent_address');
    $course = getValue('course');
    $birthDate = getValue('birthdate');
    $now = DateTime::createFromFormat('U.u', microtime(true));
    $timeStamp = $now->format("YmdHisu");
        $query = "update alumni set first_name = '$fName',middle_name = '$mName',last_name = '$lName',email = '$email',number = '$contact',birthdate = '$birthDate',gender = '$gender',address = '$address',permanent_address = '$permaAddress',course = '$course' 
  where user_id = '$studentId'";
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
        // insertIntoUsers($email,$timeStamp,$studentId);
    
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }

}


function uploadImage(){

}
?>