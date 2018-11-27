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
        html {
            height: 100%;
        }
        .zero{
            padding:0px;
        }
        .img-thumbnail{
            width:100px;
            height:100px;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Tracking System</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <!-- <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li> -->
            </ul>
            <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                   <small> 
                   <?php
                   session_start();
                   if($_SESSION['username']==null){
                       header('location:../login');
                   }
                   else if($_SESSION['user_type']=="admin"){
                    header('location:../admin');
                   }
                   echo $_SESSION["username"];
                   ?>
                   </small>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#"><small>Action</small></a>
                    <a class="dropdown-item" href="#"><small>Action</small></a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"><small>Signout</small></a>
                </div>
            </div>
        </div>
    </nav>
    <div class = "container-fluid zero">
        <div class="row w-100">
            <div class="col-2 m-2">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home"
                        aria-selected="true">
                        <i class="material-icons align-middle mr-2">
                            home
                        </i>
                        <small>Home</small>
                    </a>
                    <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile"
                        aria-selected="false">
                        <i class="material-icons align-middle mr-2">
                            account_circle
                        </i>
                        <small>
                            Manage Account</small></a>
                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages"
                        aria-selected="false"><i class="material-icons align-middle mr-2">
                            event
                        </i><small> Advertisement</small></a>
                    <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings"
                        aria-selected="false"><i class="material-icons align-middle mr-2">
                            info
                        </i><small> About UA-CCS</small></a>
                </div>
            </div>
            <div class="col-9" id="mainContainer">

            </div>
        </div>
    </div>
   
</body>
<script>
let user_id = '<?php echo $_SESSION['user_id'];?>'
</script>
<script type="text/babel" src="../utils/utils.js"></script>
<script type="text/babel" src="components/manageAccount.js"></script>
<script type="text/babel" src="components/events.js"></script>

<!-- always under -->
<script type="text/babel" src="components/main.js"></script>



</html>