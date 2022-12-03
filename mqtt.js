client = new Paho.MQTT.Client("5ff471d504b74f45b49c7c48b0ccf558.s2.eu.hivemq.cloud", 8884,"clientId");
//client = new Paho.MQTT.Client("iot.eclipse.org", Number(80), "/ws", "clientId");
var CS6_avail = document.getElementById('CS6_avail');
var CS6_status = document.getElementById('CS6_status');
var GRE_avail = document.getElementById('GRE_avail');
var GRE_status = document.getElementById('GRE_status');
var test_avail = document.getElementById('test_avail');
var test_status = document.getElementById('test_status');
var ATS_name
console.log("hello");

//set callback handlers
client.onConnectionLost = function (responseObject) {
    console.log("Connection Lost: "+responseObject.errorMessage);
}


// Called when the connection is made
function onConnect(){
	console.log("Test");
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
  console.log("Message Arrived: " + message.payloadString);
  var mess = message.destinationName;
  var sub = mess.substring(0,mess.indexOf('/'));
  ATS_name = sub;
  var topic = mess.substring(mess.indexOf('/')+1);
  if (sub==="ATS_CS6"){
    if(topic==="availability"){
        CS6_avail.innerHTML = message.payloadString + " | " + message.destinationName;
        
    }
    else{
      CS6_status.innerHTML = message.payloadString + " | " + message.destinationName;
    }
    
  }
  if (sub==="ATS_GRE"){
    if(topic==="availability"){
        GRE_avail.innerHTML = message.payloadString + " | " + message.destinationName;
    }
    else{
      GRE_status.innerHTML = message.payloadString + " | " + message.destinationName;
    }
    
  }
  if(sub==="TEST"){
    if(topic==="availability"){
      test_avail.innerHTML = message.payloadString + " | " + message.destinationName;
      if(message.payloadString === "Disconnected"){
        sendmail();
      }
    }
    else{
      test_status.innerHTML = message.payloadString + " | " + message.destinationName;
    
    }
  }
  
  
}