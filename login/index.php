<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin</title>
    <?php
    include 'head.php';
   
    ?>
    <style>
        html,body {
            height: 100%;
            background-image: url("../upload/ccs.jpg");
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: center; 
            background-size: cover;
        }
        .zero{
            padding:0px;
        }
        .img-thumbnail{
            width:100px;
            height:100px;
        }
        #mainContainer{
            padding-top:10%
        }
    </style>
</head>

<body class = "bg-light">

<div class = "container-fluid zero d-flex justify-content-center"  height="100%" id ="mainContainer">
    
</div>
   
</body>
<script>
let user_id = '<?php echo $_SESSION['user_id'];?>'
let upload_dir =  "../upload/";
</script>
<!-- 
<script type="text/babel" src="components/manageAccount.js"></script>
<script type="text/babel" src="components/events.js"></script> -->
<script type="text/babel" src="../utils/utils.js"></script>

<!-- always under -->
<script type="text/babel" src="components/main.js"></script>



</html>