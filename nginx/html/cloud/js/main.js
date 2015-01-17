

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
				
				var table_body = "<table class=\"table\"><thead>";				
				
				table_body += "<thead><tr><th>#</th><th>File name</th><th>Size</th><th>Version</th><th>Edit date</th></tr></thead>";
				
				for(i = 0; i < names.length; i++) {
					
					table_body += "<tbody><tr><td>";
					table_body += i;			
					table_body += "</td><td>";
					table_body += names[i];			
					table_body += "</td><td>";
					table_body += sizes[i];			
					table_body += "</td><td>";
					table_body += versions[i];			
					table_body += "</td><td>";
					table_body += edit_dates[i];			
					table_body += "</td></td></tr></tbody>";	
				}
			
				$('#table_body').html(table_body); 
				        
        }   
    })
	
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
	var sessionid = getCookie("sessionid");
	var file = getFile();
	var datadata = JSON.stringify({"username": login, "filename": "plik3.ppp", "size": "1555", "SID": sessionid});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				 document.cookie="addtoken=" + data.Token;       
        }   
    })
}

function getFile() {
	var fullPath = document.getElementById('myFile').value;

	

	return fullPath;
}
    
function logout() {
	var nginx_url = "/login";
	var login = getCookie("username");
}

list();
