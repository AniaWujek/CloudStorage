

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
				var uploads = (data.uploads).split(';');
				
				$('#names').text(names); 
				$('#sizes').text(sizes); 
				$('#versions').text(versions); 
				$('#edit_dates').text(edit_dates);  
				$('#uploads').text(uploads);  
				
				var table_body = "<table class=\"table\" data-click-to-select=\"true\"><thead>";				
				
				table_body += "<thead><tr><th>#</th><th>File name</th><th>Size</th><th>Version</th><th>Edit date</th><th>Action</th><th>Status</th></tr></thead>";
				
						
				
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
					table_body += "<a class=\"btn\" onclick=\"fakeaddfile('";
					table_body += names[i];
					table_body += "', '";
					table_body += versions[i];
					table_body += "')\">Download<\a>"
					table_body += "<a class=\"btn\" onclick=\"deletefile('";
					table_body += names[i];
					table_body += "', '";
					table_body += versions[i];
					table_body += "')\">Delete<\a></td><td>";
					table_body += uploads[i];
					table_body += "</td></tr></tbody>";	
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

function getTokenDownload() {
	var nginx_url = "/addtokendownload";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	var file = getFile();
	var datadata = JSON.stringify({"username": login, "filename": file, "size": "1555", "SID": sessionid});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				 document.cookie="tokendownload=" + data.Token;  
				 document.cookie="versionupload=" + data.version;				  
        }   
    })
}

function getTokenUpload(myfilename, mysize) {
	var nginx_url = "/addtokenupload";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	var file = myfilename;
	var datadata = JSON.stringify({"username": login, "filename": file, "size": mysize.toString(), "SID": sessionid});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
        		 document.cookie = "tokenupload=" + data.Token;
				 document.cookie="tokenupload=" + data.Token;
				 document.cookie="versionupload=" + data.Version;	  
				 document.cookie="ID=" + data.ID;	 
				 
				 
				 
				 list(); 				  
        }   
    })
}

function upload() {
	getTokenUpload();
	//alert(getCookie("tokendownload"));
	list();
	
}

function download() {
	getTokenDownload();
}

function addfile(myfilename, mysize) {
	var nginx_url = "/addfile";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	var file = myfilename
	var version = getCookie("versionupload");
	var datadata = JSON.stringify({"username": login, "filename": file, "size": mysize.toString(), "SID": sessionid, "version": version});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				 document.cookie="addtoken=" + data.Token;   
				 window.location.reload();  
				 //list();   
        }   
    })
}

function fakeaddfile(myfilename, version) {
	var nginx_url = "/addfile";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	var file = myfilename;
	var version = version;
	var datadata = JSON.stringify({"username": login, "filename": file, "size": "1555", "SID": sessionid, "version": version});
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				    
				 //window.location.reload();  
				 list();   
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
	else filename = "";
	

	return filename;
}

function deletefile(name, version) {
	var nginx_url = "/deletefile";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	
	var datadata = JSON.stringify({"username": login, "SID": sessionid, "filename": name, "version": version}); 	
	
	$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				// window.location.reload();   
				list();      
        }   
    })

}

function deleteuser(name, version) {
	var nginx_url = "/deleteuser";
	var login = getCookie("username");
	var sessionid = getCookie("sessionid");
	
	var datadata = JSON.stringify({"username": login, "SID": sessionid}); 
	
	var answer = confirm ("Do you really want to delete youself?")
	if (answer) 
		{
				$.post(nginx_url, datadata, function(data,status) {
      		  if (data.Status == "OK") {
					 window.location.replace("../");       
      	  }   
    		})
		}
	
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
	var answer = confirm ("Do you want to be logged out?")
	if (answer) {
		$.post(nginx_url, datadata, function(data,status) {
   	     if (data.Status == "OK") {
					 del_cookie("sessionid");
						del_cookie("login"); 
						window.location.replace("../");       
   	     }   
  	  })
 	}
	 
	
}

function checkSID() {
	var nginx_url = "/check_sid";
	var sessionid = getCookie("sessionid");
	var login = getCookie("username");
	alert(documen.cookie);
	if (sessionid != "" && login != "") {
		var datadata = JSON.stringify({"username": login, "SID": sessionid});
		$.post(nginx_url, datadata, function(data,status) {
        if (data.Status == "OK") {
				    
        }  
        else
        	 window.location.replace("../");  
    })
	}
	else
        	 window.location.replace("../");  
	
}


window.onbeforeunload = function(){	
    logout();
}
//checkSID();
list();

