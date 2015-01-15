
var about_visible=0;

function about() {
    var nginx_url = "/haslo";
    $.get(nginx_url, function(data,status) {
        $('#res').html(data);    
    })
    

}


function about2() {
    var nginx_url = "/";
    $.get(nginx_url, function(data,status) {
        $('#res2').html(data);    
    })
    

}

function functionAbout() {
    var nginx_url = "/about";
    $.get(nginx_url, function(data,status) {
    $('#res3').html(data);   
    })
}





about();
about2();