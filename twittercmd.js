#!/usr/bin/env node

var  shell = require('shelljs')
	,color = require('chalk')
	,program = require('commander')
	,twitter = require('twitter');

program
    .version('0.0.1')
    .usage('command [args]');

program
    .command('track').description('track a key or #').action(trackKey);

program.parse(process.argv);


if(!program.args.length) {
    program.help();
}

function trackKey(key){
		var twit = new twitter({
		    consumer_key: 'WMPaYJPNVipyzUPBMhoZCA',
		    consumer_secret: 'iUOUnoZibqo04gLZsDWNbSQWdUJndSUahLsuNhlhNf8',
		    access_token_key: '237929077-J4MgNyfs0APKGZxwt4iYyS28s2yISin5zcQylnEB',
		    access_token_secret: 'KNZS5Za6ZbVvExbtEDH9jADC6xTowC67CyZQCUVgn0'
		});

		var keywords = program.args;
	    if(keywords[0]){
	    	key = keywords[0];
	    }

      	twit.stream('filter', {track: key}, function(stream) {

        	stream.on('data', function(data) {
	            //console.log(util.inspect(data));
	            var message = data;
	            //var message = data || {user:{}};
	            if(message){
	                console.log("Tweet: ",message.text);
	                if(message.user){

	                    console.log("@"+message.user.name);
	                    console.log(message.user["screen_name"]);
	                }
	            }else{
	                console.log('message empty');
	            }
    	});

	    stream.on('error',function(err){
	        console.log('err ',err);
	    });
	    stream.on('end',function(end){
	        console.log('end ',end);
	    });

    // Disconnect stream after five seconds
    //setTimeout(stream.destroy, 5000);
    });
}