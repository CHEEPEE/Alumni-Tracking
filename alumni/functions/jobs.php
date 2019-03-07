<?php
function setIsHasJob($isEmployed){
    include '../Database.php';
    $user_id = $_SESSION['user_id'];
    $sql = "update alumni set is_employed = '$isEmployed' where user_id = '$user_id'";
    if(mysqli_query($connect,$sql))
    {
        return "success";
    }else {
        return "Error: " . $sql . "<br>" . $connect->error;
    }
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


if($requestType == "updateCurrentJob"){
    include '../Database.php';
    session_start();
    $user_id = $_SESSION['user_id'];
    $jobTitle = getValue("jobTitle");
    $jobSalary = getValue("jobSalary");
    $jobStart = getValue("jobStart");
    $jobEnd = getValue("jobEnd");
    $jobInline = getValue("jobInline");

    $query = "Update job_profiles set
        job_title ='$jobTitle',job_salary = '$jobSalary',job_start = '$jobStart',job_end = '$jobEnd',job_inline = '$jobInline' where user_id = '$user_id'";
    
    if(mysqli_query($connect,$query)) 
    {
        echo "success";
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}
if($requestType == "addJobDes"){
    include '../Database.php';
    session_start();
    $user_id = $_SESSION['user_id'];
    $jobTitle = getValue("jobTitle");
    $jobSalary = getValue("jobSalary");
    $jobStart = getValue("jobStart");
    $jobEnd = getValue("jobEnd");
    $jobInline = getValue("jobInline");
    $currentWork = getValue("isCurrentWork");

    $query = "insert into job_profiles(
        job_title,job_salary,job_start,job_end,job_inline,current_work,user_id
        ) values (
            '$jobTitle','$jobSalary','$jobStart','$jobEnd','$jobInline','$currentWork','$user_id'
        )";
    
    if(mysqli_query($connect,$query)) 
    {
        echo "success";
        setIsHasJob("true");
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}

if($requestType == "updateJobDes"){
    
}

if($requestType == "fetchCurrentJob"){
    include '../Database.php';
    session_start();
    $user_id = $_SESSION['user_id'];
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
    session_start();
    $user_id = $_SESSION['user_id'];
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





?>