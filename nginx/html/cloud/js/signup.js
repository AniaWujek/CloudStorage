



function getCookie(cname) {
	var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
	
}



function send_signup () {
	var nginx_url = "/adduser";
	var login = $('#slogin').val();
	var password = $('#spassword').val();
	
	var datadata = JSON.stringify({"username": login, "password": password});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
        	
        		
        		window.location.replace("../");

				    
        }   
    })
}




