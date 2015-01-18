

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
				
				//window.open("./main", "", 'toolbar=1, location=no, directories=no, status=1, menubar=1, scrollbars=1, resizable=1, copyhistory=1, width='+w+', height='+h+', top='+top+', left='+left);		
				window.location.replace("./main");		
				
				
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
    			if (data.ID == "-3")
					$('#error-info').text("Nie ma takiego użytkownika!"); 
				else if (data.ID == "-2")
					$('#error-info').text("Błąd przy tworzeniu sesji!");
				else if (data.ID == "-1")
					$('#error-info').text("Błędne hasło!");  
			    else $('#error-info').text("Baza nie chodzi!"); 
    });
    
    
}

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


function signup() {
	//window.location.href = "./signup";
	window.location.replace("./signup", "", "width=50%, height=100%");   

}


function checkSID() {
	var nginx_url = "/check_sid";
	var sessionid = getCookie("sessionid");
	var login = getCookie("username");
	
	if (sessionid != "" && login != "") {
		var datadata = JSON.stringify({"username": login, "SID": sessionid});
		$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				 window.location.replace("./main");     
        }   
    })
	}
}

checkSID();


