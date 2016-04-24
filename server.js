var express = require('express');
var app = express();
var bodyParser = require('body-parser')

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
    }
  }
  res.sendStatus(200);
});

app.set('port',(process.env.PORT || 3000))
app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});