<?php
if($requestType == "auth"){
    include '../Database.php';
     session_start();
     $username = getValue("userName");
     $password = getValue("password");

     $sql = "select * from users where username = '$username' and password = '$password'";
     $result = $connect->query($sql);
    if ($result->num_rows >0) {
        // code...
       
        
        while($row=$result->fetch_assoc()){
            if($password == $row['password']){
                echo "success";
                $_SESSION["user_id"] = $row['user_id'];
                $_SESSION["username"] = $row['username'];
                $_SESSION["user_type"] = $row['user_type'];
            }else{
                echo "failed";
            }
        }
    }
}

if($requestType == "findId"){
    include '../Database.php';
    $studentId = getValue("studentId");

    $sql = "select user_id from users where user_id = '$studentId'";
    $result = $connect->query($sql);
   if ($result->num_rows >0) {
       // code...
       echo "Already Exist";
       
   }else{
       echo "success";
   }
}

if($requestType == "registerAccount"){
    include '../Database.php';
    session_start();
    $email = getValue('email');
    $studentId = getValue('studentId');
    $password = getValue('password');
    if(isIdAvailable($studentId)){
        $query = "INSERT INTO alumni(user_id,email) 
    VALUES ($studentId,'$email')";
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
        
        insertIntoUsers($email,$password,$studentId);
        $_SESSION["user_id"] = $studentId;
        $_SESSION["username"] = $email;
        $_SESSION["user_type"] = 'alumni';
    
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
    }else{
        echo "idTaken";
    }
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