function login() {
    var nginx_url = "/login";
    var login = document.getElementById("login").value;
	 var password = $('#password').val();
	 var datadata = JSON.stringify({"username": login, "password": password});
    $.post(nginx_url, datadata, function(data,status) {
        $('#result').text(data);
        if (data.status == "OK") {
				window.location.href = "./main";        
        }   
    })
}

function signup() {
	window.location.href = "./signup";

}

function send_signup () {
	var nginx_url = "/signup";
	var login = document.getElementById("slogin").value;
	var password = document.getElementById("spassword").value;
	var email = document.getElementById("semail").value;
	var datadata = JSON.stringify({"username": login, "password": password, "email": email});
	$.post(nginx_url, datadata, function(data,status) {
        $('#result2').text(data);    
    })
}

function list () {
	var nginx_url = "/list";
	var login = "ania";
	var datadata = JSON.stringify({"username": login});
	$.post(nginx_url, datadata, function(data,status) {
        var tbl_body = "<table data-toggle=\"table\" data-height'\"299\" class=\"table\"><thead>";
        $.each(data, function (idx, obj) {
				tbl_body += "<tr class=\"success\"><th>"+obj+"</th></tr>"      
        })
        tbl_body += "<thead></table>";
			$("#table_body").html(tbl_body);
			})		        
        }
    

list();