
/*
 * GET home page.
 */

var _ = require('underscore');

var util  = require('util'),
	tty = require('tty'),
	spawn = require('child_process').spawn,
	vlc = spawn('vlc',['-I rc'],{stdio:['ignore']});
        
exports.index = function(req, res) {
  var names = stations.map(function(p) { return p.name; });
  res.render('index', { stations:stations });
  res.send(200);
  res.end('Loaded');
  console.log(req.url);
};

exports.station = function(req, res) {
	// send SIGHUP to process
	vlc.kill('SIGHUP');
//	console.log(req);
	var station = req.params.name;
	var url = _(stations).detect(function (p) { 
    		return p.name == req.params.name;
  	}).url;
	//var url = req.url
	console.log(station)
	console.log(url)
	//console.log(req.params)
	//var thumbnail= req.thumbnail
	//var number = stations.indexOf(name);
	vlc = spawn('vlc', ['--no-overlay', '--no-osd','--no-fullscreen','-I dummy',url],{ stdio: 'inherit' });
	//console.log(url);
	//console.log(req.url);
	res.send(200);
};

exports.shutdown = function(req,res){
	res.send(200);
	var exec = require('child_process').exec,
    			shutdown; 
	shutdown = exec('sudo shutdown now',function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});	
	shutdown.stderr.setEncoding('utf8');
	shutdown.stderr.on('data', function (data) {
  		if (/^execvp\(\)/.test(data)) {
    		console.log('Failed to start child process.');
  		}
	});	
//console.log(shutdown);
};

var stations = [
	{
		name: 'BBC1',
		url:'http://bbc.co.uk/radio/listen/live/r1.asx',
		thumbnail:'/images/BBC-Radio-1.jpg'
	},
        {
                name: 'BBC1x',
                url:'http://bbc.co.uk/radio/listen/live/r1x.asx',
        	thumbnail:'/images/1Xtra.png'
	},
        {
                name: 'BBC2',
                url:'http://bbc.co.uk/radio/listen/live/r2.asx',
        	thumbnail:'/images/BBC-Radio-2.jpg'
	},
        {
                name: 'BBC3',
                url:'http://bbc.co.uk/radio/listen/live/r3.asx',
        	thumbnail:'/images/BBC-3.png'
	},
        {
                name: 'BBC4',
                url:'http://bbc.co.uk/radio/listen/live/r4.asx',
        	thumbnail:'/images/BBC_Radio4.png'
	},
        {
                name: 'BBC4x',
                url:'http://bbc.co.uk/radio/listen/live/r4x.asx',
                thumbnail:'/images/BBC_Radio4X.png'
        },
        {
                name: 'BBC5',
                url:'http://bbc.co.uk/radio/listen/live/r5.asx',
        	thumbnail:'/images/BBC_Radio5.jpg'
	},
        {
                name: 'RNE1',
		url:'http://radio1.rtve.stream.flumotion.com/rtve/radio1.mp3.m3u',
        	thumbnail:'/images/RNE1.jpg'
	},
        {
                name: 'RNE3', 
		url:'http://radio1.rtve.stream.flumotion.com/rtve/radio3.mp3.m3u',
        	thumbnail:'/images/RNE3.jpg'
	},
	{
                name: 'SER_Irun',
                url:'http://emisoras.cadenaser.com:8085/irun',
		thumbnail:'/images/SERirun.png'
        },


];
