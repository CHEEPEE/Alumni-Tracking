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
    $password = getValue('password');
    if(isIdAvailable($studentId)){
        $query = "INSERT INTO alumni(user_id,first_name,middle_name,last_name,email,number,birthdate,gender,address,permanent_address,course,photo,is_graduate) 
    VALUES ('$studentId','$fName','$mName','$lName','$email','$contact','$birthDate','$gender','$address','$permaAddress','$course','placeholder.png','false')";
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
        insertIntoUsers($email,$password,$studentId,$fName.' '.$mName.' '.$lName);
     
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
    }else{
        echo "idTaken";
    }
}

if($requestType == "updateUserEmailAndUserId"){
    include '../Database.php';
    $user_id = getValue("user_id");
    $new_userId = getValue("new_userId");
    $email = getValue("email");
    if(isIdAvailable($new_userId)){
       
        $anotherQuery = "Update alumni set user_id = '$new_userId', email = '$email' where user_id = '$user_id'";
        if(mysqli_query($connect,$anotherQuery)) 
        {
            echo 'success';
        }else {
            echo "Error: " . $anotherQuery . "<br>" . $connect->error;
        }
      
        
        updateUserEmailAndID($user_id,$new_userId,$email);
    }else{  
        echo "Student ID Taken";
    }
}

function updateUserEmailAndID($user_id,$new_userId,$email){
    include '../Database.php';
    $updateSQL = "Update users set user_id = '$new_userId', username = '$email' where user_id = '$user_id'";
    if(mysqli_query($connect,$updateSQL)) 
    {
        echo 'success';
     
    }else {
        echo "Error: " . $updateSQL . "<br>" . $connect->error;
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


function sendPasswordMail($password,$emailAddress,$studentName){
    // require './mailer/PHPMailer.php';
    // require './mailer/SMTP.php';
    // require './mailer/Exception.php';
    // require './SendGrid/loader.php';
    
    // $email = new \SendGrid\Mail\Mail(); 
    // $email->setFrom("kennethjiepadasas@gmail.com", "Example User");
    // $email->setSubject("Sending with SendGrid is Fun");
    // $email->addTo($emailAddress, "Example User");
    // $email->addContent("text/plain", "and easy to do anywhere, even with PHP");
    // $email->addContent(
    //     "text/html", "<strong>and easy to do anywhere, even with PHP</strong>"
    // );
    // $sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
    // try {
    //     $response = $sendgrid->send($email);
    //     print $response->statusCode() . "\n";
    //     print_r($response->headers());
    //     print $response->body() . "\n";
    // } catch (Exception $e) {
    //     echo 'Caught exception: '. $e->getMessage() ."\n";
    // }
    
    
    
    
    $to =$emailAddress;
   
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

//     $mail = new PHPMailer(true);
// // Set PHPMailer to use the sendmail transport
// $mail->isSendmail(true);
// //Set who the message is to be sent from
// $mail->setFrom('ellemich030@gmail.com', '');
// //Set an alternative reply-to address
// $mail->addReplyTo('kellemich030@gmail.com', '');
// //Set who the message is to be sent to
// $mail->addAddress($email, '');
// //Set the subject line
// $mail->Subject = 'PHPMailer sendmail';
// //Read an HTML message body from an external file, convert referenced images to embedded,
// //convert HTML into a basic plain-text alternative body
// $mail->msgHTML($message);
// //Replace the plain text body with one created manually
// $mail->AltBody = 'This is a plain-text message body';
// //Attach an image file
// // $mail->addAttachment('images/phpmailer_mini.png');
// //send the message, check for errors
// if (!$mail->send()) {
//     echo "Mailer Error: " . $mail->ErrorInfo;
// } else {
//     echo "Message sent!";
// }
}

if($requestType == "fetchCurrentJob"){
    include '../Database.php';
    $user_id = getValue("user_id");
    $sql = "select * from job_profiles where user_id = '$user_id' and current_work = 'true' ORDER BY job_id DESC LIMIT 1";
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
        notCurrentJob($row['user_id'],$row['job_id']);
        }
    }
    echo json_encode($arrayData);
}

if($requestType == "fetchJobHistory"){
    include '../Database.php';
   
    $user_id = getValue("user_id");
    $sql = "select * from job_profiles where user_id = '$user_id' and current_work = 'false' order by job_id DESC";
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

function getJobName($jobId){

}

function notCurrentJob($user_id,$job_id){
    include '../Database.php';
    $sql = "update job_profiles set current_work = 'false' where job_id != '$job_id' and user_id = '$user_id'";
    if(mysqli_query($connect,$sql))
    {
        // echo 'success';
    }else {
        // echo "Error: " . $sql . "<br>" . $connect->error;
    }
}

if($requestType == "getBusinesses"){
    include '../Database.php';
    
    $user_id = getValue("user_id");

    $sql = "select * from business_profiles where user_id = '$user_id'";
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
        $subject -> business_name = $row['business_name'];
        $subject -> business_start = $row['business_start'];
        $subject -> categoryName = getBusinessCategoryName($row['business_category_id']);
        $arrayData[]=$subject;
        }
    }
    echo json_encode($arrayData);

}

function getBusinessCategoryName($categoryId){
    include '../Database.php';
    

    $sql = "select * from business_categories where business_category_id = '$categoryId'";
    $result = $connect->query($sql);
    
    if ($result->num_rows >0) {
        // code...
        while ($row = $result->fetch_assoc()) {
        // code...
        return $row['business_category_name'];
        }
     
    }
}

?>