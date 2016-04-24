var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var request = require('request')

var token = "CAATqXXHDbL8BAG4dU7BBZCRBIngWE92ZB5z4D6lNonQhrUrFTtKQLpCDIYTg13f0TDf40cIpOUn4ZBvvnfLzKCMkHFbRQgu54ry5XA1XZAuplMt8dBzEaht2wlreuZAhZAJFERa0t61mq0fGaJ5pL8Wsf1ZCEivsDXyv2U5gAXo3QqTfsR14ZBGgXm6hXTSDWWADZAuB5GJLYXwZDZD";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === "subinbot") {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
      console.log(text);
      sendTextMessage(sender,text);
    }
  }
  res.sendStatus(200);
});

app.set('port',(process.env.PORT || 3000))
app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});