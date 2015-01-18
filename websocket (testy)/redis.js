var redis = require("redis"),
	client = redis.createClient();


	client.on("error", function (err) {
		console.log("Error " + err);
	});
	var maxtime_sid = 30*60;
	var maxtime_token = 30*60;
	var username = "tstuser"
	var filename = "tstfile.mp3"
	var version = "1"
	var size = 500000
	var status = 1500000

	//TESTOWE DANE
	client.hset(username, "session_id", 1500100900, redis.print);
	client.hset(username+":"+filename+":"+version, "token", 15001009002, redis.print);
	client.hset(username+":"+filename+":"+version, "status", "OK", redis.print);
	client.hset(username+":"+filename+":"+version, "progress", size+"/"+status, redis.print);
	client.expire(username, maxtime_sid)
	client.expire(username+":"+filename+":"+version, maxtime_token)
	//KONIEC DANYCH TESTOWYCH


	//sprawdzenie id sesji
	client.hget(username,"session_id", function (err, obj){
		console.dir("Session ID");
		console.dir(obj);
	});
	//Sprawdzenie istnnienia tokena dla użytkownika i pliku
	client.hexists(username+":"+filename+":"+version,"token", function (err, obj){
		console.log("Token exist");
		console.dir(obj);
	});
	//Sprawdzenie tokena dla użytkownika i pliku
	client.hget(username+":"+filename+":"+version,"token", function (err, obj){
		console.log("Token");
		console.dir(obj);
	});
	client.hget(username+":"+filename+":"+version,"status", function (err, obj){
		console.log("Status");
		console.dir(obj);
	});
	client.hget(username+":"+filename+":"+version,"progress", function (err, obj){
		console.log("Progress");
		console.dir(obj);
	});
	//przedłużenie sesji dla użytkownika, nie wiem czemu zwraca false, przedłuża
	console.log(client.expire(username, maxtime_sid))
	//przedłużenie tokena dla użytkownika
	client.expire(username+":"+filename+":"+version, maxtime_sid)
	//usuniecie tokenu po transmisji
	client.del(username+":"+filename+":"+version)
	client.hexists(username+":"+filename+":"+version,"token", function (err, obj){
		console.dir(obj);
	});
	client.del(username)
	client.quit();
//
