<?php
session_start();
if ($_SESSION['firstname']){
  header('Location: home.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login page</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="static/css/login.css">
</head>

<body>

<div class="container">
<div class='row ml-20'>
<div class='col-12'>
<?php if ($_SESSION['warning']){
   echo '  <div class="text-center alert alert-danger alert-dismissible fade show">
   <button type="button" class="close" data-dismiss="alert">&times;</button>
   <strong>You</strong> have to log in first!
 </div>';
   unset($_SESSION['warning']);}?>
<div id="demo" class="carousel slide" data-ride="carousel">

  <!-- Indicators -->
  <ul class="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" class="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>

  <!-- The slideshow -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img width="100%" height="200" src="static/images/income expense tracker.jpeg" alt="Expense-Reporting-Cheat-Sheet">
    </div>
    <div class="carousel-item">
      <img width="100%" height="200" src="static/images/Expense Management Process.png" alt="Expense Management Process">
    </div>
    <div class="carousel-item">
      <img width="100%" height="200" src="static/images/Expense-Reporting-Cheat-Sheet.png" alt="Tracking Expenses">
    </div>
  </div>

  <!-- Left and right controls -->
  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>
</div>
</div>
</div>
<div class='row'>
<div class='col border border-primary ml-2 rounded mt-3'>
<?php if ($_SESSION['wrong']){
   echo '  <div class="alert alert-danger alert-dismissible fade show">
   <button type="button" class="close" data-dismiss="alert">&times;</button>
   <strong>Wrong</strong> username or password!
 </div>';
   unset($_SESSION['wrong']);}?>
<form id="loginform" method='post' action="index.php" class="needs-validation">
  <div class="form-group mt-3">
    <label class="sr-only" for="email">Email address:</label>
    <input type="email" name='email' class="form-control" placeholder="Enter email" id="email" required/>
  </div>
  <div class="form-group">
    <label class="sr-only" for="pwd">Password:</label>
    <input type="password" name='password' class="form-control" placeholder="Enter password" id="pwd2" required/>
    <input type="text" class="d-none form-control" name='section' value='login' required/>
  </div>
  <button type="submit" class="btn btn-block btn-primary">Login</button>
</form> 
</div>

<div class='col border border-primary p-3 ml-2 rounded mt-3'>

<form id='registerform' action="index.php" method='post' class="needs-validation" >

  <div class="row mb-3">
  <?php if ($_SESSION['didRegister']=='success'){
   echo '  <div class="alert alert-success alert-dismissible">
   <button type="button" class="close" data-dismiss="alert">&times;</button>
   <strong>Success!</strong> Registration successful, now you can login!
 </div>';
   unset($_SESSION['didRegister']);
 }
 elseif($_SESSION['didRegister']=='failed'){
  echo '<div class="alert alert-danger alert-dismissible fade show">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Passwords</strong> Something did not work, try again!
</div>';
  unset($_SESSION['didRegister']);
 } ?>
  <div class="col-6">
    <label class="sr-only" for="firstname">First name:</label>
    <input type="text" class="form-control" name='firstname' placeholder="Enter firstname" id="firstname" required/>
    <input type="text" class="d-none form-control" name='section' value='register' required/>
</div>
<div class="col-6">
    <label class="sr-only"  for="lastname">Last name:</label>
    <input type="text" class="form-control" name='lastname' placeholder="Enter lastname" id="lastname" required/>
</div>
    </div>


  <div class="form-group">
    <label class="sr-only" for="email">Email address:</label>
    <input type="email" name='email' class="form-control" placeholder="Enter email" id="email" required>
  </div>

  <?php if ($_SESSION['didRegister']=='exists'){
  echo '<div class="alert alert-danger alert-dismissible fade show">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Email</strong> exists, choose another one!
</div>';
   unset($_SESSION['didRegister']);
 }?>
  <div class="row">
    <div class="col">
  <div class="form-group">
    <label class="sr-only"  for="pwd">Password:</label>
    <input type="password" class="form-control" name='password' placeholder="Enter password" id="pwd" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
  title="Must contain at least one number or one special character, one uppercase, one lowercase letter and at least 8 or more characters" required>
  </div>

  <div class="form-group">
    <label class="sr-only"  for="pwd">Password:</label>
    <input type="password" class=" mb-3 form-control" name='password1' placeholder="Enter the same password" id="pwd1" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
  title="Must contain at least one number or one special character, one uppercase, one lowercase letter and at least 8 or more characters" required>
  <div id='pwdalert' class="d-none alert alert-danger alert-dismissible fade show">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>Passwords</strong> don't match, try again!
  </div>
  <div id='pwdsuccess' class="d-none alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Success!</strong> Passwords match!
</div>
  </div>

</div>
</div>
  <button id='nons' type="submit" class="btn btn-block btn-primary">Register</button>
</form> 
</div>
</div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script src='static/js/login.js'></script>
</body>
</html>