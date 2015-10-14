<?php
if($_POST)
{
	$to_email   	= "violetisha@gmail.com"; // Recipient email
	
	// Sanitize input data
	$user_name		= filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
	$user_email		= filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
	$country_code	= filter_var($_POST["country_code"], FILTER_SANITIZE_NUMBER_INT);
	$phone_number	= filter_var($_POST["phone_number"], FILTER_SANITIZE_NUMBER_INT);
	$subject		= filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
	$message		= filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
	
	// Additional php validation
	if(strlen($user_name)<1){
		$output = json_encode(array('type'=>'error', 'text' => 'Por favor, llene todos los campos.'));
		die($output);
	}
	if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
		$output = json_encode(array('type'=>'error', 'text' => 'Por favor, ingrese un email valido'));
		die($output);
	}
	if(strlen($subject)<1){
		$output = json_encode(array('type'=>'error', 'text' => 'Por favor, llene todos los campos.'));
		die($output);
	}
	if(strlen($message)<1){
		$output = json_encode(array('type'=>'error', 'text' => 'Por favor, llene todos los campos.'));
		die($output);
	}
	
	//email body
	$message_body = $message."\r\n\r\n";
	
	//proceed with PHP email.
	$headers = 'From: '.$user_name.'' . "\r\n" .
	'Reply-To: '.$user_email.'' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	
	$send_mail = mail($to_email, $subject, $message_body, $headers);
	
	if(!$send_mail)
	{
		// If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
		$output = json_encode(array('type'=>'error', 'text' => 'Se ha producido un error. Inténtelo más tarde.'));
		die($output);
	}else{
		$output = json_encode(array('type'=>'message', 'text' => '¡Gracias! Su mensaje se ha enviado.'));
		die($output);
	}
}
?>