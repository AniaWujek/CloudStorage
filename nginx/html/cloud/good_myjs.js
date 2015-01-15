function login() {
    var nginx_url = "http://192.168.18.119:5000/adduser";
    var login = $('#login').val();
	 var password = $('#password').val();
	 datadata = JSON.stringify({"username": login, "password": password});
    $.post(nginx_url, datadata, function(data,status) {
        $('#result').html(data);    
    })
}