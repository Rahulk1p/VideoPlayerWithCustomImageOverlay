var video = document.querySelector('.video');
var juice = document.querySelector('.orange-juice');
var btn = document.getElementById('play-pause');
function togglePlayPause() {
    if(video.paused) {
        btn.className = 'pause';
        video.play();
    } else {
        btn.className = 'play';
        video.pause();
    }
}

btn.onclick = function (params) {
    //video.fastSeek(570); // 9:30
    // video.currentTime = 570; //test
    togglePlayPause();
}

video.addEventListener('timeupdate', function() {
    var juicePos = video.currentTime / video.duration;
    juice.style.width = juicePos * 100 + "%";
    if(video.ended) {
        btn.className = "play";
      // At the end of the movie, reset the position to the start and pause the playback.
        video.currentTime = 0;
        togglePlayPause();
    }
});

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    screen.orientation.lock('landscape');
    init();
    $( "#imgoverlay" ).draggable();
    document.getElementById("imgoverlay").addEventListener("click", cameraTakePicture);
}
function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);   
}
function touchHandler(event) {
    var touches = event.changedTouches,
    first = touches[0],
    type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown";
          $("#msg").prepend("touchstart<br/>");
          break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }
    var simulatedEvent = document.createEvent("MouseEvent");
     simulatedEvent.initMouseEvent(type, true, true, window, 1,
                        first.screenX, first.screenY,
                        first.clientX, first.clientY, false,
                        false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent); 
    //event.preventDefault();
}


function cameraTakePicture() { 
    navigator.camera.getPicture(onSuccess, onFail, {  
        quality: 50, 
        destinationType: Camera.DestinationType.DATA_URL 
    });  

    function onSuccess(imageData) {         
        ImageBase64 = 'data:image/jpeg;base64,' + imageData.replace(/\r?\n|\s{1,}/g, '');
        $("#imgoverlay").attr('style', "background-image:url('" + ImageBase64 + "');background-size:cover");
        //$("#imgoverlay").attr('style', "background-size:cover");
    }  

    function onFail(message) { 
        alert('Failed because: ' + message); 
    } 
}
