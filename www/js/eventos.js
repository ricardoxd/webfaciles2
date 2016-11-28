
var activo=false;
    function notificacion(string , web) {
        if (typeof Notification !== 'undefined') {

            if (Notification.permission !== "granted") {

               var res= Notification.requestPermission();
               console.log(res);
            }
            var title = "";
            if(web!=undefined)title = web;else title = "Super Sistema Online";
            var extra = {

                icon: "https://4.bp.blogspot.com/-aSa_7HpF26g/U-raCwS2h8I/AAAAAAAAAMI/9hXhCyt3B-g/s72-c/descarga.jpg",
                body: string

            }
            if(activo)noti.close();
            var noti = new Notification( title, extra);
           // activo=true;
            noti.onclick = {

                // Al hacer click

            }
            noti.onclose = {

               

            }
            setTimeout( function() { noti.close() }, 10000)

        }

        if(window.opener!=null){

              window.opener.$('input').each(function(){    
                     var id = $(this).attr('name');
                    var value = $(this).val();
                   localStorage.setItem(id, value);
                    window.opener.console.log(value);
                  }).promise().done( function(){

                      if (window.opener.location.href.indexOf("xreload-data") == -1){
                         window.opener.location=window.opener.location.href+"/xreloaddata" ;
                       }else{
                          window.opener.location.reload() ;
                       }
                         window.close(); 
                      

                
                  } ); 
                       
        }
        if(isPop){
          localStorage.isPop=true;
        }

    }
localStorage.isPop=false;
var isPop=false;
var popup=null;
var interval=null;
function popupCenter(url, w, h) {
  w=screen.width/2;
  h=screen.height;
var left = (screen.width/2)-(w/2);
var top = (screen.height/2)-(h/2);
if(window.opener==null){
popup = window.open(url, "_blank", 'location=no');
}else{
popup = window.open(url, "Nuevo"+Math.random(), 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

if(window.opener==null){
  popup.addEventListener( "loadstop", function() {

     popup.executeScript({
              code: "isPop=true;"
          }, function() {
              console.log("Image Element Successfully Hijacked");
          });

  });
  interval=setInterval(getStateSecondWindow, 1000);

}

  return popup;
} 
function getStateSecondWindow() {
        popup.executeScript(
            {code: "localStorage.isPop"},
            function(data)
            {
                if (data=='true')
                {
                    //do what I need to do
                    popup.close();
                    clearInterval(interval);
                    window.location.reload() ;
                } 
            }
        );
}

function formStorageLoad() {

console.log("load localstorage");
$('input').each(function(){    
        var id = $(this).attr('name');
        console.log($(this));
        var value = localStorage.getItem(id);
        console.log(value); 
        $(this).val(value);
        
    }).promise().done( function(){
      
    } ); 
  return true;

}
function formStorageSave() {

  $('input').each(function(){    
        var id = $(this).attr('id');
        var value = $(this).val();
       localStorage.setItem(id, value);
        
    });   


}
function load_selects() {

  $("select").each(function( index ) {
  console.log( index + ": " + $( this ).text() );
       $.post("/datos/lista_select_cargar.ajax",
                              {   
                                tabla: $( this ).id() ,
                                id_tabla: $( this ).data("id"),
                                tabla_bd: tablabd    },
                              function(data,status){
                                  console.log(data);
                                        if (status=='success') {

                                          var data = JSON.parse(data);
                                          if(!data['error']){
                                          console.log( $( str.id+'_item'));
                                          document.getElementById(str.id+'_item').remove()
                                           }else{
                                            alert("No se pudo eliminar : "+"Error: "+data['error']);
                                            console.log( "error"+data['error']);

                                           }
                                        } else{


                                        };
                              });

});

}
  function eliminar_dato (str) {
    console.log(str);
      console.log(str);
      var tablabd="";
      if($( str ).data("tablabd"))
      tablabd=$( str ).data("tablabd");
    var disenox="";
      if($( str ).data("diseno"))
      disenox=$( str ).data("diseno");
if(confirm('Seguro que desea eliminar el elemento '+$( str ).data("id"))){
              var url="datos/eliminar.ajax";
              if(server){url=server+url;}
              $.post(url,
                              {   
                                tabla: $( str ).data("tabla") ,
                                id_tabla: $( str ).data("id"),
                                tabla_bd: tablabd   ,
                                diseno: disenox    },
                              function(data,status){
                                  console.log(data);
                                        if (status=='success') {

                                          var data = JSON.parse(data);
                                          if(!data['error']){
                                          console.log( $( str.id+'_item'));
                                          document.getElementById(str.id+'_item').remove()
                                           }else{
                                            alert("No se pudo eliminar : "+"Error: "+data['error']);
                                            console.log( "error"+data['error']);

                                           }
                                        } else{


                                        };
                              });
}

}  


