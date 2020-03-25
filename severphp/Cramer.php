<?php
  require('./connect.php');
 

  $sql = "SELECT * FROM equation where _type = 'Cramer' ";

  $result = $connect->query($sql);
  $response = array();
  if($result->num_rows>0)
  {

    while($row = $result->fetch_assoc())
    {

      $response[] = $row;
      
    }
    echo json_encode($response);
  }
  else {
    echo "0 results";
  }

  $connect->close();

 ?>