(function(){
    emailjs.init("OdKWEeqSTU0FHympX");
 })();

 function sendmail(){
  //emailjs.init("YOdKWEeqSTU0FHympX");
  var contactParams = {
      message: email_message,
      ATS_LOC: ATS_name,

  };

  emailjs.send('service_h2p3oz4','template_souisj9',contactParams).then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
  }, function(error) {
     console.log('FAILED...', error);
  });
 }