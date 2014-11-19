var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var idQuestionActive;

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Get image handle
  //
  var largeImage = document.getElementById('largeImage');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI });
}

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}


// Called when a photo is successfully retrieved
//
function onPhotoURISuccessComment(imageURI) {
  // Get image handle
  //
  var largeImage = document.getElementById('largeImageComment');

  // Unhide image elements
  //
  largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  largeImage.src = imageURI;
  
}

// A button will call this function
//
function capturePhotoComment() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoURISuccessComment, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI });
}

// A button will call this function
//
function getPhotoComment(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccessComment, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}



function sendQuestion() {

    //selected photo URI is in the src attribute (we set this on getPhoto)
    var imageURI = document.getElementById('largeImage').getAttribute("src");
    
    if (imageURI.length > 0) {
        //set upload options
        var options = new FileUploadOptions();

        $.mobile.loading("show", {textVisible: true,text:'Enviando tu pregunta'});

        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";
        // this will get value of text field
        options.params = {
            id: localStorage.getItem("user_id"),
            title: document.getElementById("titulo").value,
            content: document.getElementById("pregunta").value
            // mandar id usuario
        };

        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI("http://www.espaciodeco.com/mobile/comentarios/add"), questionCreatioSuccess, fail, options);
    } else {
        var ws = "http://www.espaciodeco.com/mobile/comentarios/add";
        $.post( ws, {            
            id: localStorage.getItem("user_id"),
            title: document.getElementById("titulo").value,
            content: document.getElementById("pregunta").value
        }, questionCreatioSuccess , "json");
    }
    
    ga('send', 'event', 'contenido', 'add', 'pregunta');
}


function sendComment() {

    //selected photo URI is in the src attribute (we set this on getPhoto)
    var imageURI = document.getElementById('largeImageComment').getAttribute("src");
    
    if (imageURI.length > 0) { 
        //set upload options
        var options = new FileUploadOptions();

        $.mobile.loading("show", {textVisible: true,text:'Enviando tu comentario'});

        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";
        // this will get value of text field
        options.params = {
            id: localStorage.getItem("user_id"),
            content: document.getElementById("comentario").value,
            question_id: idQuestionActive        
            // mandar id usuario
        };

        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI("http://www.espaciodeco.com/mobile/comentarios/add"), questionCreatioSuccess, fail, options);
    } else {
        var ws = "http://www.espaciodeco.com/mobile/comentarios/add";
        $.post( ws, {            
            id: localStorage.getItem("user_id"),
            content: document.getElementById("comentario").value,
            question_id: idQuestionActive
        }, questionCreatioSuccess , "json");
    }
    
    ga('send', 'event', 'contenido', 'add', 'comentario');
}


// Called if something bad happens.
//
function onFail(message) {
  alert("Error inesperado: Code = " + message);
}


function fail(error) {
    alert("Error inesperado: Code = " + error.code + error.source + error.target);
}
    
function questionCreatioSuccess(r) {
    $.mobile.loading("show", {textVisible: true,text:'Gracias por colaborar',textonly:true});
    setTimeout(function(){$.mobile.loading("hide");},2000);

}



function getQuestionList() {
    //id y date
    //array(array(title, img, answersCount, newAnswersCount)
    //mobile/comentarios/list
    var 
    ws = 'http://www.espaciodeco.com/mobile/comentarios/list',
    //ws = 'http://ttg1.pronosticodeltiempo.info/test/mobile.php?check=21', // TODO Comentar
    userId = localStorage.getItem("user_id"),
    date = lastLogin;
    
    $.post( ws, { id: userId, date: date }, successQuestionList , "json");
}


// Print in list view all parent questions 
//
function successQuestionList(data) {
    if (data.status.code == 1) {
        if (data.data.length > 0) {
            $.each(data.data, function(position, info){
                $('#listQuestions').append('<li><a onclick="idQuestionActive=\'' + info.id +  '\';$.mobile.changePage(\'#question\');" href="#"><div style="width:80px;height:80px;overflow:hidden; float:left;margin-right:10px;"><img style="max-height: 120px;max-width: 120px;" src="' + info.img +  '" /></div><h2'+ ((info.hasOwnProperty('newAnswersCount'))?' style="color: green;"':'')+'>' + info.title +  '</h2><p>' + info.date + ((info.hasOwnProperty('newAnswersCount'))?' <strong style="color: green;">Comentarios nuevos: ' + info.newAnswersCount + ' </strong>':'')+'</p></a>' + ((info.hasOwnProperty('answersCount'))?'<span class="ui-li-count  ui-body-inherit">' + info.answersCount + '</span>':'')  +  '</li>');
            });
        } else {
            $('#listQuestions').append('<li><a onclick="$.mobile.changePage(\'#nueva-idea\');" href="#">No has hecho ninguna pregunta todavía<br/>Animate y haz click! para preguntar</a></li>');
        }
        $("#listQuestions").listview('refresh');
        $.mobile.loading("hide");
    } else {
        alert("Se ha producido un error al traer la información desde EspacioDeco, codigo(" + data.status.code + ","+ data.status.message +")");
    }
}

// 
//
function getQuestionInfo(idQuestion) {
    // mobile/comentarios/thread
    // id(usuario), date
    var 
    ws = 'http://www.espaciodeco.com/mobile/comentarios/thread',
    //ws = 'http://ttg1.pronosticodeltiempo.info/test/mobile.php?check=22', // TODO Comentar
    date = lastLogin;
    $.post( ws, {id: idQuestion, date: date }, successQuestionInfo , "json");
}


function successQuestionInfo(response){
    var data = response.data;
    
    if (response.status.code > 0) {
    
        var 
        sQuestion = '<p>Lo preguntaste el '+ data.date +'</p><h1>'+ data.title +'</h1><p>'+ data.content +'</p><img src="'+ data.img +'" alt=""><br/><strong>Comentarios</strong><hr/><div id="comentarios">',
        
        sAnswer = '<div><div style="float: left;width: 15%;"><a class="out" href="#" rel="external" data-ajax="false" %userUrl%><img style="max-width: 95%;" src="img/users/default.jpg"/></a></div><div style="float: left;width: 85%;"><strong %new%>%user%</strong><p>%content%</p></div>';

        sAnswerImg = '<a href="#%id%" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="%img%" style="width:25%"></a>';
        sAnswerImg += '<div data-role="popup" id="%id%" data-overlay-theme="b" data-theme="b" data-corners="false">';
        sAnswerImg += '    <img class="popphoto" src="%img%" style="max-height:512px;">';
        sAnswerImg += '</div>';
        sItemAnswer = '',sItemImg = '';

        if (data.hasOwnProperty('answers')) {
            
            $.each(data.answers, function(position, answerInfo){
                
                sItemAnswer = sAnswer.replace("%user%", answerInfo.user);
                sItemAnswer = sItemAnswer.replace("%content%", answerInfo.content);
                if (answerInfo.hasOwnProperty('userImg')) {
                    sItemAnswer = sItemAnswer.replace("img/users/default.jpg", answerInfo.userImg);
                }
                
                if (answerInfo.hasOwnProperty('new')) {
                    sItemAnswer = sItemAnswer.replace("%new%", 'style="color:green;"');
                } else {
                    sItemAnswer = sItemAnswer.replace("%new%", '');
                }
                
                if (answerInfo.hasOwnProperty('userUrl')) {
                    sItemAnswer = sItemAnswer.replace("%userUrl%", "onclick=\"window.open('"+answerInfo.userUrl+"?utm_source=edapp', '_system', 'location=no');exit;\"");
                } else {
                    sItemAnswer = sItemAnswer.replace("%userUrl%", '');
                }
                
                sQuestion += sItemAnswer;  
                
                if (answerInfo.hasOwnProperty('img')) {
                    
                    $.each(answerInfo.img, function(position, imgInfo) {
                        //sItemImg = sAnswerImg.replace("%img%", imgInfo);
                        // varias ocurrencias
                        sItemImg = sAnswerImg.replace(/%img%/g,imgInfo);
                        sItemImg = sItemImg.replace(/%id%/g,answerInfo.id+'-'+position);
                        
                        sQuestion += sItemImg;        
                    });
                    
                }
                
                sQuestion += '</div><hr style="clear: both;"/>'
                
            });
        }
        
        $('#contentQuestion').html(sQuestion);
        
        $.mobile.loading("hide");
        
        $('#contentQuestion').trigger("create");
    } else {
        alert("Se ha producido un error al traer la información desde EspacioDeco, codigo(" + response.status.code + ","+ response.status.message +")");
    }
        
}

function uploadComent(){
    // igual que question pero sin title
    // id, questionId, content, img
    // mobile/comentarios/add (el mismo de antes como tiene question id server lo gestiona)
    
}