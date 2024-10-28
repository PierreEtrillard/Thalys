<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     // Valider l'origine de la requête
     $allowed_origin = 'https://thalys-developpement.fr';
     //$allowed_origin =  'http://thalys';
     if ($_SERVER['HTTP_ORIGIN'] !== $allowed_origin) {
         http_response_code(403);
         echo 'ERROR: Access denied.';
         exit;
     }
    // Récupérer les données du FormData
    $from = htmlspecialchars($_POST['from']);
    $message = htmlspecialchars($_POST['message']);

    // Configurer l'email
    $to = 'ngodier@thalys-developpement.fr'; 
    $subject = 'Nouveau message en provenance du site de la part de ' . $from;
    $body = "$from\n\nMessage:\n$message";
    $headers = "From: $from";

    // Envoyer l'email
    if (mail($to, $subject, $body, $headers)) {
        echo 'email_sent_OK_TD';
    } else {
        echo 'ERROR: Échec de l\'envoi de l\'email.';
        //echo 'email_sent_OK_TD';
    }
}
else{
    http_response_code(405); // Méthode non autorisée
    echo 'ERROR: Méthode non autorisée.';
}
?>
