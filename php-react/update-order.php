<?php
// add-user.php is for inserting new users into the database.
// Method: POST - http://localhost/php-react/add-user.php
// Required Fields – user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->orderID)
    && isset($data->prodID)
    && !empty(trim($data->orderID))
    && !empty(trim($data->prodID))
    && isset($data->QTY) 
    && is_numeric($data->QTY)
    && isset($data->discount) 
    && is_numeric($data->discount)
    && isset($data->Seq) 
    && is_numeric($data->Seq)
) {
    $orderID = mysqli_real_escape_string($db_connection, trim($data->orderID));
    $prodID = mysqli_real_escape_string($db_connection, trim($data->prodID));
    $QTY = $data->QTY;
    $discount = $data->discount;
    $Seq = $data->Seq;
    $updateUser = mysqli_query($db_connection, "UPDATE `orderdetail` SET `OrderId`='$orderID', `Qty`='$QTY', `ProdId`='$prodID', `Discount`='$discount' WHERE `seq`='$Seq'");
    if ($updateUser) {
        echo json_encode(["success" => 1, "msg" => "User Inserted."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>