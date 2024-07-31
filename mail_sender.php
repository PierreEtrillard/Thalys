<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = $_POST['message'];
    $email = $_POST['email'];

    $mail = new PHPMailer(true);

    try {
        // Paramètres du serveur
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Remplace par ton serveur SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'ton_email@example.com'; // Remplace par ton email SMTP
        $mail->Password = 'ton_mot_de_passe'; // Remplace par ton mot de passe SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataires
        $mail->setFrom('ton_email@example.com', 'Nom de l\'expéditeur'); // Remplace par ton email et nom
        $mail->addAddress('destinataire@example.com', 'Nom du destinataire'); // Remplace par l'email et nom du destinataire

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = 'Nouveau message du site web';
        $mail->Body    = '<p><strong>Email:</strong> ' . $email . '</p><p><strong>Message:</strong><br>' . nl2br($message) . '</p>';
        $mail->AltBody = 'Email: ' . $email . "\n\n" . 'Message: ' . $message;

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo 'Invalid request method';
}
?>
