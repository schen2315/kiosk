var accountSid = 'AC3efe7f7f2d8a6b47bd90cc70f05e215a'; // Your Account SID from www.twilio.com/console
var authToken = '55273fd58ddce133b7a348bbbb78d397';   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
/* GET home page. */

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/index.html'));
});
router.get('/welcome.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/welcome.html'));
});
router.get('/verification.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/verification.html'));
});
router.post('/verification.html', function(req, res, next) {
	//use txt file 
	//generate random 4 (or 5?) digit code along with phone #
	//save this to phonenums.txt
	var num = "" + req.body.num;
	
	var code = "";
	for (var i=0; i < 4; i++) {
		code += Math.floor((Math.random() * 10) + 1);
	}
	var file = "";
	fs.readFile(__dirname + '/phonenums.txt', 'utf8', function(err, file) {
		if(err) throw err;
		file += code + "\n";
		fs.writeFile(__dirname + '/phonenums.txt', file, function() {
			//send verification code
			client.messages.create({
			    body: 'Your Verification Code: ' + code,
			    to: '+1' + num,  // Text this number
			    from: '+19177891561' // From a valid Twilio number
			}, function(err, message) {
			    if(err) throw err;
			    res.send("code sent successfully");
			});
		});
	});
});
router.get('/code.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/code.html'));
});
router.post('/code.html', function(req, res, next) {
	var code = "" + req.body.code;
	var file = "";
	fs.readFile(__dirname + '/phonenums.txt', 'utf8', function(err, file) {
		//check the code
		if(err) throw err;
		var lines = file.split("\n");
		var success = false;
		for(var i=0; i < lines.length; i++) {
			if(code == lines[i]) {
				success = true;
				break;
			}
		}
		
		if(success) res.send("success");
		else res.send("failure");
	});
});
router.get('/vote.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/vote.html'));
});
router.get('/finish.html', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../views/finish.html'));
});

module.exports = router;
