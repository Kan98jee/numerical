<?php
  header("Access-Control-Allow-Origin: http://localhost:3000");
  $hostname = "database";
  $username = "root";
  $password = "1111";
  $dbname = "numer";

  $connect = mysqli_connect($hostname,$username,$password,$dbname);

  if($connect->connect_error)
  {
    die("Connect Failed : " .$connect->connect_error);
  }
 // echo "Connect Successfully !!";
// $con= mysqli_connect("localhost","root","","numer") or die("Error: " . mysqli_error($con));
// mysqli_query($con, "SET NAMES 'utf8' ");
?>