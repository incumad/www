function basicLogin(){
   var email = $("#user").val();
   var password = calcMD5($("#password").val());
   var url  = "http://www.espaciodeco.com/mobile/users/login";
   $.mobile.loading( 'show', {textVisible: true,text:'Loading'});
   $.post(url, { email:email ,password:password},succesLogin,'json');
   return false;
}


function register(){
   var email = $("#email_user").val();
   var password = calcMD5($("#new_password").val());
   var name = $("#new_name").val();
   var url  = "http://www.espaciodeco.com/mobile/users/register";
   $.post(url,{ email:email ,password:password, name:name},succesRegister,'json');
   return false;
}


function succesRegister(response){
    var data = response.data
    $.mobile.loading( 'hide');
     if(response.status.code === 1){
         localStorage.setItem("user_id",data.id);
         $.mobile.changePage("#home");
         ga('send', 'event', 'altas', 'add', 'user');
     }else{
        $( '#register_message' ).html(response.status.message);
        $( '#register_message' ).popup( 'open' );
        setTimeout( function(){ $( '#register_message' ).popup( 'close' ) }, 4000 );
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
         ga('send', 'event', 'producto', 'login', 'app');
     }else{
          $( '#login_message' ).html(data.status.message);
          $( '#login_message' ).popup( 'open' );
          setTimeout( function(){ $( '#login_message' ).popup( 'close' ) }, 4000 );
     }
}
