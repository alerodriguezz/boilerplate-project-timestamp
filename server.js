// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// empty date parameter 
app.get("/api/", function (req, res) {

  req.string = new Date().toString();

  let dateObj= new Date(req.string);
  res.json({ unix: dateObj.valueOf(), utc: dateObj.toUTCString() });
});

// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  let dateStr= req.params.date
try{
  //5 digits or more must be a unix time
  if (/\d{5,}/.test(dateStr)) {
    dateInt = parseInt(dateStr);
    //Date regards numbers as unix timestamps, strings are processed differently
    return res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });

  } 
  else {
  let dateObj= new Date(dateStr);
  if (dateObj.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    
  } else {
    res.json({ unix: dateObj.valueOf(), utc: dateObj.toUTCString() });
    
  }

  }
}
catch(ex){
  res.json({ error: "Invalid Date" })
}
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
