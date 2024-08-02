export function sendMessage(message, from){
  fetch('mail_sender.php',{
    method:'Post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:new URLSearchParams({
      'message': message,
      'email': from
    })
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