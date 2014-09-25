function basicLogin(){
   var email = $("#user").val();
   var password = $("#password").val();
   var url  = "http://venezuelaentipscom.ipage.com/test/mobile.php?check=3";
   //var url  = "http://espaciodeco.com/mobile/login";
   $.mobile.loading( 'show', {textVisible: true,text:'Loading'});
   $.post(url, { email:email ,password:password},succesLogin,'json');
   return false;
}


function register(){
   var email = $("#email").val();
   var password = $("#password").val();
   var name = $("#name").val();
   var url  = "http://venezuelaentipscom.ipage.com/test/mobile.php?check=4";
   //var url  = "http://espaciodeco.com/mobile/register";
   $.post(url, { email:email ,password:password, name:name},succesRegister,'json');
   return false;
}


function succesRegister(data){
     $.mobile.loading( 'hide'); 
     if(data.status.code === 1){
         ///si la validacion es correcta, muestra la pantalla "home"
         //localStorage.setItem("name",data.name);
         //localStorage.setItem("email",data.email);
         localStorage.setItem("user_id",data.id);
         $.mobile.changePage("#home");
     }else{
         $( '#login_message' ).html("Error alta intetelo mas tarde");
         $( '#login_message' ).popup( 'open' );
         setTimeout( function(){ $( '#login_message' ).popup( 'close' ) }, 4000 );
     }
}



function succesLogin(data){
     $.mobile.loading( 'hide');
     if(data.status.code === 1){
         ///si la validacion es correcta, muestra la pantalla "home"
         //localStorage.setItem("name",data.name);
         //localStorage.setItem("email",data.email);
         localStorage.setItem("user_id",data.id);
         $.mobile.changePage("#home");
     }else{
          $( '#login_message' ).html("Error login intentelo mas tarde");
          $( '#login_message' ).popup( 'open' );
          setTimeout( function(){ $( '#login_message' ).popup( 'close' ) }, 4000 );
     }
}
