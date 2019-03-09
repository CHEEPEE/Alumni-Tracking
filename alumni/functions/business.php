<?php 
if($requestType == "saveBusiness"){
    include '../Database.php';
    session_start();
    $user_id = $_SESSION['user_id'];
    $businessName = getValue('businessName');
    $businessCat = getValue("businessCat");
    $businessStart = getValue("businessStart");
    // $businessEnd = getValue("businessEnd");
    $query = "insert into business_profiles(
        user_id,business_category_id,business_name,business_start
        ) values (
            '$user_id','$businessCat','$businessName','$businessStart'
        )";
    
    if(mysqli_query($connect,$query)) 
    {
        echo "success";
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}

if($requestType == "updateBusiness"){
    include '../Database.php';
    session_start();
    $user_id = $_SESSION['user_id'];
    $businessName = getValue('businessName');
    $businessCat = getValue("businessCat");
    $businessStart = getValue("businessStart");
    $id = getValue("id");
    // $businessEnd = getValue("businessEnd");
    $query = "update business_profiles set
        business_category_id = '$businessCat',business_name = '$businessName',business_start = '$businessStart' where business_id = $id";
    if(mysqli_query($connect,$query)) 
    {
        echo "success";
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}

if($requestType == "getBusinesses"){
    include '../Database.php';
    session_start();
    $user_id = $_SESSION['user_id'];

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
        $subject -> business_category = $row['business_category_id'];
        $subject -> business_start = $row['business_start'];
        $subject -> id = $row['business_id'];
        $subject -> categoryName = getBusinessCategoryName($row['business_category_id']);
        $arrayData[]=$subject;
        }
    }
    echo json_encode($arrayData);

}



function getBusinessCategoryName($categoryId){
    include '../Database.php';
    
    $user_id = $_SESSION['user_id'];

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