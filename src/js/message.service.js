export default function sendMessage(message, from,language) {
  const formData = new FormData();
  formData.set("from", from);
  formData.set("message", message);
  const lang=language;
  //return [1,"Test pour voir scénario si sendMessage OK"];
switch (lang) {
  case 'fr':
  const user_msg_ok="Email envoyé avec succès." ; 
  const user_msg_error="Echec de l'envoi de l'email" ;
  return fetch("/api/mail_sender.php", {
      method: "POST",
      body: formData,
    })
    .then((response) => {
      //console.log(response);
      //Voir avec Pierre E. Que contient response?
      //est-ce possible de l'utiliser comme une variable? plusieurs fois?
      //Pourquoi est-ce que return response.text(); marchait?
      if (!response.ok) {
        return [0,"erreur technique: votre message n'as pas été envoyé, veuillez réessayer ultérieurement."];
      }
      else
      {
        const resultat=response.text();
        if (resultat=='email_sent_OK_TD'){
          return [1,user_msg_ok];
        }
        else {
          console.log (resultat);
          return [0,user_msg_error];
        }    
      }
      
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
