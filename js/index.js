var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var d = new Date();
var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();

// Wait for device API libraries to load
//

document.addEventListener("deviceready",onDeviceReady,false);

//$( document ).ready(onDeviceReady);


// device APIs are available
function onDeviceReady() {
   
   document.addEventListener("online", onOnline, false);
   document.addEventListener("offline", onOffline, false);

   localStorage.setItem("last_login",strDate);
   loadHomeBanner();  
   
   if (parseFloat(window.device.version) >= 7.0) {
     $('[data-role="header"]').addClass("ios7");
     $('[data-role="panel"]').addClass("ios7");
    }
    
    $('a.out').click(function(){
        window.open('http://www.espaciodeco.com?utm_source=edapp', '_system', 'location=no');exit;
    });


    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;

    openFB.init({appId: '834951006536042'});
    var user_id = localStorage.getItem("user_id");
    if (user_id!==null && user_id!==0){
        $.mobile.changePage("#home");
    }

    $.support.cors = true;

    //alert(fbToken);
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;

    //app.initialize();
    $( "#registro" ).click(function() {
        $.mobile.changePage("#new_user");
    });
    $( "#nav_home" ).click(function() {
        $.mobile.changePage("#inicio");
     });

     $( "#nav_logout" ).click(function() {
        logout();
     });
}



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


function loadHomeBanner(){
    var url  = "http://venezuelaentipscom.ipage.com/test/mobile.php?check=5";
        $.getJSON( url, {check:'5'})
            .done(function(data) {
               //alert(data.mensaje + "\nGenerado en: " + respuestaServer.hora + "\n" +respuestaServer.generador)
                //alert(data.validation);  
           
                $.each( data, function( key, value ) {
                //alert( key + ": " + value.img );
                     $('#slides').append('<img src="'+value.img+'" alt="">');
                });
              
            });
    return false;
}



function getDate(){
   
    return strDate;
}



$("#inicio").on("pageshow",function(){

    $( "#frm_login" ).validate({
            rules: {
                       user: {
                               required: true,email:true
                       },
                       password: {
                               required: true
                       }
                  },
           messages: {
                       user: {
                           required: "Email es obligatorio",
                           email: "El email no es correcto"
                       },
                       password: "La contraseña es obligatoria"
                 },
           focusInvalid: false,
           errorLabelContainer: $("#frm_login div.error"),
           submitHandler: function() {
               basicLogin();         
           }
       });
});


$("#new_user").on("pageshow",function(){

    $( "#frm_register" ).validate({
            rules: {
                       name: {
                               required: true
                       },
                       user: {
                               required: true,email:true
                       },
                       password: {
                               required: true
                       }
                  },
           focusInvalid: false,
           errorLabelContainer: $("#frm_login div.error"),
           submitHandler: function() {
               register();         
           }
       });
});

$("#home").on("pageshow",function(){
              $('#slides').slidesjs({
                                    width: 940,
                                    height: 1280,
                                    navigation: false
                                    });

              });

$("#ver-ideas").on("pageshow",function(){
            $('#listQuestions').html('');
            $.mobile.loading("show", {textVisible: true,text:'Loading'});
            getQuestionList();
          });

$("#question").on("pageshow",function(){
            $('#contentQuestion').html('');
            $.mobile.loading("show", {textVisible: true,text:'Loading'});
            getQuestionInfo(idQuestionActive);

});   



    
    
function onOnline() {
   alert("Ya tienes conexion a internet ");
}
 
function onOffline() {
   alert("No tienes conexion a Internet ");
}
                    

