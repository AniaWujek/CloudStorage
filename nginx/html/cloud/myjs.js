

function about() {
    var nginx_url = "http://192.168.1.19:8000/haslo";
    $.get(nginx_url, function(data,status) {
        $('#res').html(data);    
    })
    

}


function about2() {
    var nginx_url = "http://192.168.1.19:8000";
    $.get(nginx_url, function(data,status) {
        $('#res2').html(data);    
    })
    

}

function functionAbout() {
    var nginx_url = "http://192.168.1.19:8000/data";
    $.get(nginx_url, function(data,status) {
        $('#res3').html(data);    
    })
}



about();
about2();