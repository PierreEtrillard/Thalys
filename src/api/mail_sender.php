<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     // Valider l'origine de la requête
     $allowed_origin = 'https://thalys-developpement.fr';
     if ($_SERVER['HTTP_ORIGIN'] !== $allowed_origin) {
         http_response_code(403);
         echo 'Accès refusé.';
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
        echo 'Email envoyé avec succès.';
    } else {
        echo 'Échec de l\'envoi de l\'email.';
    }
}
else{
    http_response_code(405); // Méthode non autorisée
    echo 'Méthode non autorisée.';
}
?>
