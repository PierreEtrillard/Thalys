export default function sendMessage(message, from) {
  const formData = new FormData();
  formData.set("from", from);
  formData.set("message", message);

  return fetch("/api/mail_sender.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        return "erreur technique, votre message n'as pas été envoyé, veuillez réessayer ultérieurement.";
      }
      return response.text();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
