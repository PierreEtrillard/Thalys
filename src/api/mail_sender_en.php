<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     // Valider l'origine de la requête
     $allowed_origin = 'https://www.thalys-developpement.com';
     if ($_SERVER['HTTP_ORIGIN'] !== $allowed_origin) {
         http_response_code(403);
         echo 'Access denied.';
         exit;
     }
    // Récupérer les données du FormData
    $from = htmlspecialchars($_POST['from']);
    $message = htmlspecialchars($_POST['message']);

    // Configurer l'email
    $to = 'ngodier@thalys-developpement.fr'; 
    $subject = 'EN_Nouveau message en provenance du site de la part de ' . $from;
    $body = "$from\n\nMessage:\n$message";
    $headers = "From: $from";

    // Envoyer l'email
    if (mail($to, $subject, $body, $headers)) {
        echo 'Your email has been sent successfully!';
    } else {
        echo 'Email could not be sent.';
    }
}
else{
    http_response_code(405); // Méthode non autorisée
    echo 'Non authorised method.';
}
?>
