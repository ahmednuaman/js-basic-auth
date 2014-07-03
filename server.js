var auth = require('http-auth'),
    express = require('express'),
    app,
    basic;

basic = auth.basic({
  realm: 'Secret Zone',
  file: __dirname + '/users.htpasswd'
});

app = express();

app.use('/', express.static(__dirname + '/'));

app.use('/secret', auth.connect(basic));
app.get('/secret', function(req, res) {
  res.send('Hello from express - ' + req.user + '!');
});

app.listen(8000, function () {
  console.log('Listening to port 8000');
});
