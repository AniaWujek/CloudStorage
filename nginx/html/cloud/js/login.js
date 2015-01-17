

//ok
function login() {
    var nginx_url = "/login";
    var login = $('#login').val();
	 var password = $('#password').val();
	 var datadata = JSON.stringify({"username": login, "password": password});
    $.post(nginx_url, datadata, function(data,status) {
        
        if (data.Status == "OK") {
        		
        		document.cookie="username=" + login;
        		document.cookie="sessionid=" + (data.ID).toString();
				
				
				var h = $(document).height()/2;   // returns height of browser viewport

				var w = $(document).width()/2;   // returns width of browser viewport
				var top = 100;
				var left = 100;
				
				window.open("./main", "", 'toolbar=1, location=no, directories=no, status=1, menubar=1, scrollbars=1, resizable=1, copyhistory=1, width='+w+', height='+h+', top='+top+', left='+left);				
				
				
        }
        else {
				 if (data.ID == "-3")
					$('#error-info').text("Nie ma takiego użytkownika!"); 
				if (data.ID == "-2")
					$('#error-info').text("Błąd przy tworzeniu sesji!");
				if (data.ID == "-1")
					$('#error-info').text("Błędne hasło!");    
			} 
        
        
    })
    .fail(function () {
			    $('#error-info').text("Baza nie chodzi!"); 
    });
    
    
}




function signup() {
	//window.location.href = "./signup";
	window.open("./signup", "", "width=50%, height=100%");   

}

function send_signup () {
	var nginx_url = "/adduser";
	var login = $('#slogin').val();
	var password = $('#spassword').val();
	
	var datadata = JSON.stringify({"username": login, "password": password});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				        
        }   
    })
}



