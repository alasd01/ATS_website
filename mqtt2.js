var clientId = Math.floor(Math.random() * 10000).toString();
client = new Paho.MQTT.Client("5ff471d504b74f45b49c7c48b0ccf558.s2.eu.hivemq.cloud", 8884, clientId);
var ATS_name
var email_message


//set callback handlers
client.onConnectionLost = function (responseObject) {
    console.log("Connection Lost: "+responseObject.errorMessage);
}


// Called when the connection is made
function onConnect(){
	console.log("Connected");
  client.subscribe("#");
}

// Connect the client, providing an onConnect callback
client.connect({
  
	onSuccess: onConnect,
  userName: 'alasdavid01',
  password: "Saladmaster99",
  useSSL:true
});


client.onMessageArrived = function (message) {
  // time
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = time +' &bull; '+ date;

    
    var mess = message.destinationName;
   // var loc = mess.substring(3,mess.indexOf('/'));
    var loc = mess.substring(4,7);
    var topic = mess.substring(mess.indexOf('/')+1);
    ATS_name = loc;

    //local time
    // var old_mess = localStorage.getItem(loc+"mess");
    // if(topic===old_mess){
    //   dateTime = localStorage.getItem(loc+"time");
    // }
    // if(topic != old_mess){
    //   localStorage.setItem(loc+"mess",topic);
    //   localStorage.setItem(loc+"time",dateTime)
    // }


    if(ATS_list.includes(loc))
    {
      var ATS_avail = document.getElementById(loc+"_avail");
      var ATS_status = document.getElementById(loc+"_status");
      var ATS_time = document.getElementById(loc+"_time");
      ATS_time.innerHTML = dateTime;
      //ATS_time.style.backgroundColor="#90EE90";
      
      if(topic==="availability"){
          ATS_avail.innerHTML = message.payloadString;// + " | " + message.destinationName; //+ " | Updated on "  +  dateTime;
          ATS_avail.style.backgroundColor="#90EE90";

          if(message.payloadString === "Not Available"){
              email_message = "Emergency Backup is Not Available at";
              //sendmail();
              ATS_avail.style.backgroundColor="#ff0000";
          }
    }
      if(topic==="pi_status"){
          ATS_status.innerHTML = message.payloadString ;//+ " | " + message.destinationName;
          ATS_status.style.backgroundColor="#90EE90";
          if(message.payloadString === "Disconnected"){
              email_message = "The Raspberry Pi is Disconnected at";
              //sendmail();
              ATS_status.style.backgroundColor="#ff0000";
          }
      }
  }
}