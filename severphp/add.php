<?php
    require('../severphp/connect.php');
    
    $_name = $_POST["_name"];
    $_type = $_POST["_type"];
    $_diff = $_POST["_diff"];

    $sql = "INSERT INTO equation (_name,_type,_diff) VALUES ('$_name','$_type','$_diff');";
    echo $sql;

  if($connect->query($sql) === TRUE){
        $check = array(1 => "success");
        echo json_encode($check);
  }
  else {
        $check = array(1 => "fail");
        echo json_encode($check);
  }

  $connect->close();

 ?>
