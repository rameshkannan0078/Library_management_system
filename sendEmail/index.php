<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// Include config file
require("PHPMailer-master\src\Exception.php");
require("PHPMailer-master\src\PHPMailer.php");
require("PHPMailer-master\src\SMTP.php");

 header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');

header('Content-Type: application/json');
    	$myObj = new stdClass();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // collect value of input field

  $sender_name = "MOUNTZION E-LIBRARY";
    $sender_email = "noreply@mailer.org";
    //
    $username = "canteentransactions@mountzion.ac.in";
    $password = "peqnrebrvkytvykf";
    //
    $receiver_email = $_POST['email'];
    $message = "Hey! Your New Password is => ".$_POST['password'] ;
    $subject = "Password has been Changed";
    $mail = new PHPMailer(true);
    $mail->isSMTP();
  //$mail->SMTPDebug = 2;
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
  
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    
    $mail->setFrom($sender_email, $sender_name);
    $mail->Username = $username;
    $mail->Password = $password;
  
    $mail->Subject = $subject;
    $mail->msgHTML($message);
    $mail->addAddress($receiver_email);
    if (!$mail->send()) {
        $error = "Mailer Error: " . $mail->ErrorInfo;
        echo '<p id="info_msg">'.$error.'</p>';
    }
    else {

    	$myObj->message = "1";
    	$myJSON = json_encode($myObj);
        echo $myJSON;
    }
}


    
?>