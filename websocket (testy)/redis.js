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

	//TESTOWE DANE
	client.hset(username, "session_id", 1500100900, redis.print);
	client.hset(username+":"+filename+":"+version, "token", 15001009002, redis.print);
	client.expire(username, maxtime_sid)
	client.expire(username+":"+filename+":"+version, maxtime_token)
	//KONIEC DANYCH TESTOWYCH


	//sprawdzenie id sesji
	client.hget(username,"session_id", function (err, obj){
		console.dir(obj);
	});
	//Sprawdzenie istnnienia tokena dla użytkownika i pliku
	client.hexists(username+":"+filename+":"+version,"token", function (err, obj){
		console.dir(obj);
	});
	//Sprawdzenie tokena dla użytkownika i pliku
	client.hget(username+":"+filename+":"+version,"token", function (err, obj){
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
