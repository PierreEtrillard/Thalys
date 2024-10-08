export default function sendMessage(message, from,language) {
  const formData = new FormData();
  formData.set("from", from);
  formData.set("message", message);
  const lang=language;

switch (lang) {
  case 'fr':
    return fetch("/api/mail_sender.php", {
      method: "POST",
      body: formData,
    })
    .then((response) => {
      if (!response.ok) {
            return "erreur technique: votre message n'as pas été envoyé, veuillez réessayer ultérieurement.";
      }
      return response.text();
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });

  case 'en':
    return fetch("/api/mail_sender_en.php", {
      method: "POST",
      body: formData,
    })
    .then((response) => {
      if (!response.ok) {
        return "technical issue: your message has not been sent. Please try again later.";
      }
      return response.text();
    })
    .catch((error) => {
      console.error("Error:", error);
    });  
}

}
