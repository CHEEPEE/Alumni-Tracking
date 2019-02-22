<?php
if($requestType == "getStats"){
    include '../Database.php';
    $course = getValue("course");
    $sql = "select * from job_categories";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
       
        // code...
        while ($row = $result->fetch_assoc()) {
        $job = new myObject();
        // code...
        $jobProfile = $row;
        $job_inline = $jobProfile['id'];
    
        $countData = "SELECT COUNT(job_profiles.job_inline) 
        FROM job_profiles 
        inner join alumni 
        on alumni.user_id = job_profiles.user_id
        WHERE job_inline = $job_inline 
        and current_work = 'true' ".
        ($course == ""?"":"and alumni.course 
        like '$course'");
        
        $countResult = $connect->query($countData);
        
        if ($countResult->num_rows >0) {
           
            // code...
            while ($count_row = $countResult->fetch_assoc()) {
            // code...
            // $job -> course = getCourse($count_row['user_id']);
            $job -> category = $jobProfile['category'];
            $job -> count = $count_row['COUNT(job_profiles.job_inline)'];
            $arrayData[]=$job;
            // echo json_encode($count_row);
            }
        }
        }
       
    }
    //  echo "<br/><br/>-------------------------------------------------------------------------------------------------------------<br/><br/>";
     echo json_encode($arrayData);
}

if($requestType == "getGraduates"){
    include '../Database.php';
    $course = getValue("course");
    $countData = "select count(is_graduate) from alumni where is_graduate = 'true'" .
    ($course == ""?"":"and course 
    like '$course'");
    $countResult = $connect->query($countData);
    class myObject
    {
        
    } 
    $count = new myObject();
    if ($countResult->num_rows >0) {
       
      
        while ($count_row = $countResult->fetch_assoc()) {
        // code...
        // $job -> course = getCourse($count_row['user_id']);
        $count -> count = $count_row['count(is_graduate)'];
       
        echo json_encode($count);
        }
    }
}

function getCourse($user_id){
    include '../Database.php';
    $sql = 'select * from alumni where user_id = $user_id';
    $result = $connect->query($sql);
    if($result -> num_rows > 0){
        while ($row = $result->fetch_assoc()) {
           return $row['course'];
        }
    }
}


?>