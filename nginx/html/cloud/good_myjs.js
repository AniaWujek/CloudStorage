function login() {
    var nginx_url = "/login";
    var login = document.getElementById("login").value;
	 var password = $('#password').val();
	 datadata = JSON.stringify({"username": login, "password": password});
    $.post(nginx_url, datadata, function(data,status) {
        $('#result').html(data);    
    })
}