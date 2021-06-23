<?php
// all-users.php is to fetch all users that exist in the database.
// Method: GET - http://localhost/php-react/all-users.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
if (isset($data->id) && is_numeric($data->id)) {
    $findID = $data->id;
    $allUsers = mysqli_query($db_connection, "SELECT EmpId as id, EmpName as user_name, JobTitle as user_email, DeptName as dept_name, Phone as pw FROM `employee`,`dept` WHERE `employee`.DeptId = `dept`.DeptId AND `EmpId`='$findID'");
    if (mysqli_num_rows($allUsers) > 0) {
        $all_users = mysqli_fetch_all($allUsers, MYSQLI_ASSOC);
        // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
        echo json_encode(["success" => 1, "users" => $all_users], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => 0]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "User Not Found!"]);
}



?>
