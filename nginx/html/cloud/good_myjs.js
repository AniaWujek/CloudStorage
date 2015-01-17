var session_id;
var login;

function login() {
    var nginx_url = "/login";
    var login = $('#login').val();
	 var password = $('#password').val();
	 var datadata = JSON.stringify({"username": login, "password": password});
    $.post(nginx_url, datadata, function(data,status) {
        
        if (data.Status == "OK") {
        		session_id = data.Info;
        		document.cookie="username=" + login;
				window.location.href = "./main";        
        }
        else {
				 if (data.Info == "-3")
					$('#error-info').text("Nie ma takiego użytkownika!"); 
				if (data.Info == "-2")
					$('#error-info').text("Błąd przy tworzeniu sesji!");
				if (data.Info == "-2")
					$('#error-info').text("Błędne hasło!");    
			} 
        
        
    })
    .fail(function () {
			    $('#error-info').text("Baza nie chodzi!"); 
    });
    
    
}

function signup() {
	window.location.href = "./signup";

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

function list () {
	var nginx_url = "/list";
	var login = "ania";
	var datadata = JSON.stringify({"username": login});
	//$.post(nginx_url, datadata, function(data,status) {
  //      var tbl_body = "<table data-toggle=\"table\" data-height'\"299\" class=\"table\"><thead>";
  //      $.each(data, function (idx, obj) {
	//			tbl_body += "<tr class=\"success\"><th>"+obj+"</th></tr>"      
  ////      })
  //      tbl_body += "<thead></table>";
	//		$("#table_body").html(tbl_body);
	//		})		        
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



function addfile() {
	var nginx_url = "/addfile";
	var login = getCookie("username");
	var file = getFile();
	var datadata = JSON.stringify({"username": login, "filename": file, "size": "1555"});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				        
        }   
    })
}

function getFile() {
	var fullPath = document.getElementById('myFile').value;

	

	return fullPath;
}
    

list();