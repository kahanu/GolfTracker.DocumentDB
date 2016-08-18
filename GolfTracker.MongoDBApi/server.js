var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    golfers = require('./routes/golfer-routes'),
    golfclubs = require('./routes/golfclub-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

golfers.init(app);
golfclubs.init(app);

var server = app.listen(process.env.PORT || 80800, function(){
    var port = server.address().port;
    console.log('Server running at http://localhost:',port);
});