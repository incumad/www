var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var idQuestionActive;
    
// // Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64-encoded image data
  // console.log(imageData);

  // Get image handle
  //
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements
  //
  smallImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  //
  smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);

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
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 20, allowEdit: true,
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

function uploadPhoto() {

    //selected photo URI is in the src attribute (we set this on getPhoto)
    var imageURI = document.getElementById('largeImage').getAttribute("src");
    if (!imageURI) {
        alert('Please select an image first.');
        return;
    }
    
    //set upload options
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType = "image/jpeg";
    // this will get value of text field
    options.params = {
        title: document.getElementById("titulo").value,
        content: document.getElementById("pregunta").value
        // mandar id usuario
    };

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://ttg1.pronosticodeltiempo.info/test/mobile.php?check=2"), questionCreatioSuccess, fail, options);
}

// Called if something bad happens.
//
function onFail(message) {
  alert('Failed because: ' + message);
}


function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
    
function questionCreatioSuccess(r) {
    var data;
    
    //code message
    
    var jsonResponse = JSON.parse(r.response);
    data = {
        id: jsonResponse.id,
        parent_id: '',
        order: jsonResponse.order,
        img_src: jsonResponse.img_src,
        title: document.getElementById("titulo").value,
        content: document.getElementById("pregunta").value,
        create_date: jsonResponse.create_date
    };    
    insertQuestion(data,showMessageAQ);
}

// show a success message after create a question
function showMessageAQ(){
    alert('Gracias por mandarnos tu pregunta en breve tendras una respuesta');
}

function getQuestionList() {
    //id y date
    //array(array(title, img, answersCount, newAnswersCount)
    //mobile/comentarios/list
    var 
    //ws = 'http://www.espaciodeco.com/mobile/comentarios/list',
    ws = 'http://ttg1.pronosticodeltiempo.info/test/mobile.php?check=21', // TODO Comentar
    userId = localStorage.getItem("user_id"),
    date = localStorage.getItem("last_login");
    
    $.post( ws, { id: userId, date: date }, successQuestionList , "json");
}

// Print in list view all parent questions 
//
function successQuestionList(data) {
    $('#listQuestions').html('');
    $.each(data, function(position, info){
        $('#listQuestions').append('<li><a onclick="idQuestionActive=\'' + info.id +  '\';$.mobile.changePage(\'#question\');" href="#">' + info.title +  '<img src="' + info.img +  '" /></a> <span style="margin-right:20px;" class="ui-li-aside">' + info.date +  '</span>' + ((info.hasOwnProperty('newAnswersCount'))?'<span class="ui-li-count">' + info.newAnswersCount + '</span>':'') + ((info.hasOwnProperty('answersCount'))?'<span class="ui-li-count  ui-body-inherit">' + info.answersCount + '</span>':'')  +  '</li>');
    });
    $("#listQuestions").listview('refresh');
}

// 
//
function getQuestionInfo(idQuestion) {
    // mobile/comentarios/thread
    // id(usuario), date
    var 
    //ws = 'http://www.espaciodeco.com/mobile/comentarios/thread',
    ws = 'http://ttg1.pronosticodeltiempo.info/test/mobile.php?check=22', // TODO Comentar
    userId = localStorage.getItem("user_id"),
    date = localStorage.getItem("last_login");
    $.post( ws, { id: userId, questionId: idQuestion, date: date }, successQuestionInfo , "json");
}


function successQuestionInfo(data){
    var 
        sQuestion = '<p>Lo preguntaste el '+ data.date +'</p><h1>'+ data.title +'</h1><p>'+ data.content +'</p><img src="'+ data.img +'" alt=""><br/><strong>Comentarios</strong><hr/><div id="comentarios">',
        
        sAnswer = '<div><div style="float: left;width: 15%;"><img src="img/users/default.jpg"/></div><div style="float: left;width: 85%;"><strong>%user%</strong><p>%content%</p></div>';

        sAnswerImg = '<a href="#%id%" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="%img%" style="width:25%"></a>';
        sAnswerImg += '<div data-role="popup" id="%id%" data-overlay-theme="b" data-theme="b" data-corners="false">';
        sAnswerImg += '    <img class="popphoto" src="%img%" style="max-height:512px;">';
        sAnswerImg += '</div>';
        sItemAnswer = '',sItemImg = '';

        $('#contentQuestion').html('');
        
        if (data.hasOwnProperty('answers')) {
            
            $.each(data.answers, function(position, answerInfo){
                
                sItemAnswer = sAnswer.replace("%user%", answerInfo.user);
                sItemAnswer = sItemAnswer.replace("%content%", answerInfo.content);
                if (answerInfo.hasOwnProperty('userImg')) {
                    sItemAnswer = sItemAnswer.replace("img/users/default.jpg", answerInfo.userImg);
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
        
        $('#contentQuestion').trigger("create");
        
}

function uploadComent(){
    // igual que question pero sin title
    // id, questionId, content, img
    // mobile/comentarios/add (el mismo de antes como tiene question id server lo gestiona)
    
}