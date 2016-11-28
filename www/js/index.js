
function cargarUrl(url) {
    $('body').append('<img id="cargando" src="img/spinner_black64.gif">');
	url=url.replace("#/","");
	if(url=='salir'){
                localStorage.ingreso=false;
        $.ajax({
                        beforeSend: function(xhrObj){xhrObj.setRequestHeader("movil","true");},
                        type: "GET",
                        url: server+url,
                        dataType:"html",
                        success: function(html){
                            cargarUrl('');
                        }
                });
        return;
                
        }
var patch=url+"file.html";       
if(localStorage.getItem(patch)){
        $("body").html(localStorage.getItem(patch));
}else{
        $.get("plantillas/"+patch)
            .done(function(data) {       
                localStorage.setItem(patch, data);
                $("body").html(data);
            }).fail(function() { 
                
            });


}
        if(localStorage.online=='true'){
                $.ajax({
                        beforeSend: function(xhrObj){
                                xhrObj.setRequestHeader("movil","true");
                                if(localStorage.ingreso=='true'){
                                	xhrObj.setRequestHeader("authorization","token "+localStorage.token);
                                }        },
                        type: "GET",
                        url: server+url,
                        dataType:"html",
                        success: function(html){
                                if(localStorage.getItem(patch)!=html){
                                        localStorage.setItem(patch, html);
                                        $("body").html(html);        
                                }  
                        	

                        }
                });
        }
}
cargarUrl(window.location.hash);
localStorage.online=true;
$(window).on('hashchange', function(e){
var page=window.location.hash;
cargarUrl(page);
});
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
}
function onOffline() {       
        localStorage.online=false;
}
function onOnline() {
        localStorage.online=true;
}
