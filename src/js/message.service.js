export default function sendMessage(message, from, language) {
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
            //return "erreur technique, votre message n'as pas été envoyé, veuillez réessayer ultérieurement.";
            return "ERROR";
          }
          //return response.text();
          return "OK"
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    case 'en':
      return fetch("/api/mail_sender_en.php", {
        method: "POST",
        body: formData,
      })
      .then((response) => {
        if (!response.ok) {
          return "ERROR";
        }
        //return response.text();
        return "OK"
      })
      .catch((error) => {
        console.error("Error_EN:", error);
      });
  }
}


