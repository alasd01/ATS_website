
var clientId = Math.floor(Math.random() * 10000).toString();
client = new Paho.MQTT.Client("ef8afabb20af4f97ad38bdc9ca5b710d.s2.eu.hivemq.cloud", 8884, clientId);
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
  userName: 'ATS_username',
  password: "AT$Monitoring",
  useSSL:true
});



client.onMessageArrived = function (message) {
  // time
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = time +' &bull; '+ date;

  
 //topic/message+
    var mess = message.destinationName;
    var index = message.payloadString.indexOf('/');
   // var loc = mess.substring(3,mess.indexOf('/'));
    var loc = mess.substring(4,7);
    var time = message.payloadString.substring(index+1);
    var topic = mess.substring(mess.indexOf('/')+1);
    ATS_name = loc;
    if(ATS_list.includes(loc))
    {
      var ATS_avail = document.getElementById(loc+"_avail");
      var ATS_status = document.getElementById(loc+"_status");
      //window.localStorage.getItem(ATS_name+'_time')

      var ATS_time = document.getElementById(loc+"_time");
      ATS_time.innerHTML = time;
      //ATS_time.style.backgroundColor="#90EE90";
      
      

      if(topic==="availability"){
          ATS_avail.innerHTML = message.payloadString.substring(0,index);
          ATS_avail.style.backgroundColor="#90EE90";

          if(message.payloadString.substring(0,index) === "Not Available"){
              email_message = "Emergency Backup is Not Available at";
              //sendmail();
              ATS_avail.style.backgroundColor="#ff0000";
          }
    }
      if(topic==="pi_status"){
          ATS_status.innerHTML = message.payloadString.substring(0,index);//+ " | " + message.destinationName;
          ATS_status.style.backgroundColor="#90EE90";
          
          if(message.payloadString.substring(0,index) === "Disconnected"){
              email_message = "The Raspberry Pi is Disconnected at";
              //sendmail();
              ATS_status.style.backgroundColor="#ff0000";
          }
      }
  }
}





  