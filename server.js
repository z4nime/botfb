var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === <YOUR_VERIFY_TOKEN>) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});


app.set('port',(process.env.PORT || 3000))
app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});