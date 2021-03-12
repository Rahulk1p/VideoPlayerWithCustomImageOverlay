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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    screen.orientation.lock('landscape');  
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    $('html')[0].style.setProperty('--f7-statusbar-height', '20px');
    var media = document.getElementById('myVideoDiv');
    var img = document.getElementById("imgoverlay");
    window.plugins.screensize.get(successCallback, errorCallback);
    function successCallback(result){
        console.log(result);
        img.width=result.width/8;
        img.height=result.height/8;

        var v = "<video controls='controls' width='100%' height='100%'>";
	        v += "<source src='file:///android_asset/www/sample-mp4-file.mp4' type='video/mp4'>";
	        v += "</video>";
	    document.querySelector("#myVideoDiv").innerHTML = v;
        
    }
    function errorCallback(result){
        console.log(result);
    }

   // VideoPlayer.play("file:///android_asset/www/sample-mp4-file.mp4");
/*VideoPlayer.play(
    "file:///android_asset/www/sample-mp4-file.mp4",
    {
        volume: 0.5,
        scalingMode: VideoPlayer.SCALING_MODE.SCALE_TO_FIT_WITH_CROPPING
    },
    function () {
        console.log("video completed");
    },
    function (err) {
        console.log(err);
    }
);*/


        /*
                // Playing event
                media.addEventListener("playing", function() {
                    $("#output").html("Playing event triggered");
                });
           
                // Pause event
                media.addEventListener("pause", function() { 
                    $("#output").html("Pause event triggered"); 
                });
        
                // Seeking event
                media.addEventListener("seeking", function() { 
                    $("#output").html("Seeking event triggered"); 
                });
        
                // Volume changed event
                media.addEventListener("volumechange", function(e) { 
                    $("#output").html("Volumechange event triggered"); 
                });
               // dragElement(document.getElementById("mydiv"));
*/
                
}
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


