export default function sendMessage(message, from){
  console.log("form.service envoi: "+ message + " en provenance de: "+ from);
  const formData = new FormData();
  formData.set('from',from);
  formData.set('message',message);
  
  fetch('/api/mail_sender.php',{
    
    method:'POST',
    body:formData
  })
  .then(response => response.text())
  .then(data => {
      alert(data);
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while sending the email.');
  });
  }