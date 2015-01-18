

function list () {
	var nginx_url = "/list_files";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	var datadata = JSON.stringify({"username": login, "SID": sessionid});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
        		//$('#list').text(data.names); 
        		var names = (data.names).split(';');
        		var sizes = (data.sizes).split(';');
        		var versions = (data.versions).split(';');
				var edit_dates = (data.edit_dates).split(';');
				
				$('#names').text(names); 
				$('#sizes').text(sizes); 
				$('#versions').text(versions); 
				$('#edit_dates').text(edit_dates);  
				
				var table_body = "<table class=\"table\" data-click-to-select=\"true\"><thead>";				
				
				table_body += "<thead><tr><th>#</th><th>File name</th><th>Size</th><th>Version</th><th>Edit date</th><th>Action</th></tr></thead>";
				
						
				
				 for(i = 0; i < names.length; i++) {
					
					table_body += "<tbody><tr><td>";
					table_body += i+1;			
					table_body += "</td><td>";
					table_body += names[i];			
					table_body += "</td><td>";
					table_body += sizes[i];			
					table_body += "</td><td>";
					table_body += versions[i];			
					table_body += "</td><td>";
					table_body += edit_dates[i];			
					table_body += "</td><td>";
					table_body += "<a class=\"btn\" style=\"font-color: red;\">Download<\a><a class=\"btn\" onclick=\"deletefile('";
					table_body += names[i];
					table_body += "', '";
					table_body += versions[i];
					table_body += "')\">Delete<\a></td></tr></tbody>";	
				}
				
				$('#table_body').html(table_body); 
				
				
				
				
				 
				        
        }   
    })
    .fail(function () {
			
					var table_body = "<table class=\"table\" data-click-to-select=\"true\"><thead>";					
				table_body += "<thead><tr><th>#</th><th>File name</th><th>Size</th><th>Version</th><th>Edit date</th><th>Action</th></tr></thead>";
					table_body += "<tbody><tr><td>";						
					table_body += "</td><td>";							
					table_body += "</td><td>";						
					table_body += "</td><td>";							
					table_body += "</td><td>";						
					table_body += "</td><td></td></tr></tbody>";	
					$('#table_body').html(table_body); 		
						
				    
    })
	
	        
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
	var sessionid = getCookie("sessionid");
	var file = getFile();
	var datadata = JSON.stringify({"username": login, "filename": file, "size": "1555", "SID": sessionid});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				 document.cookie="addtoken=" + data.Token;   
				 window.location.reload();     
        }   
    })
}

function getFile() {
	//var fullPath = (document.getElementById('myFile').value).toString();
	var fullPath = document.getElementById('myFile').value;
	if (fullPath) {
		var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		var filename = fullPath.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}
	
}
	

	return filename;
}

function deletefile(name, version) {
	var nginx_url = "/deletefile";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	
	var datadata = JSON.stringify({"username": login, "SID": sessionid, "filename": name, "version": version}); 	
	
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				 window.location.reload();       
        }   
    })

}

function deleteuser(name, version) {
	var nginx_url = "/deleteuser";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	
	var datadata = JSON.stringify({"username": login, "SID": sessionid}); 	
	
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				 window.location.replace("../");       
        }   
    })

}

function del_cookie(name) {
    document.cookie = name +
    '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }
    
function logout() {
	var nginx_url = "/logout";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	
	var datadata = JSON.stringify({"username": login, "SID": sessionid}); 	
	
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				 del_cookie("sessionid");
					del_cookie("login"); 
					window.location.replace("../");       
        }   
    })
	 
	
}



list();

