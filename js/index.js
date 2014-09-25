/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
                    

