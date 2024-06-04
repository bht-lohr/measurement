
"use strict";
// ---------------------------Var: global------------------
  
const video = document.querySelector('video');
const audioInputSelect = document.querySelector('select#audioSource');
const audioOutputSelect = document.querySelector('select#audioOutput');
var videoSelect = document.querySelector('select#videoSource');
const selectors = [audioInputSelect, audioOutputSelect, videoSelect];

 //audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);


var videoStream = null;
var preLog = document.getElementById('preLog');
var XResolution = 1280; 
var XResolutionXY = 16/9;   
var XFrameRate = 25; 
var visual_loop=false;
var intervalId=0;

var inputVal =1;
var  frameRate =25;



// ---------------------------Funk: global   GetUserStream /webcam------------------
 

function Input(val) {
//	log('Webcam: one Display!');
	inputVal = val;
	var mySelctor = document.getElementById('videoSource'); 
	if (val ==1) 	mySelctor.disabled = false;
	else            mySelctor.disabled = true;
}

function noStream() {
	log('Access to camera was denied!');
} 

function stop() {
	clearInterval(intervalId); 
	var myButton = document.getElementById('buttonStop');
	if (myButton) myButton.disabled = true;
	myButton = document.getElementById('buttonStart');
	if (myButton) myButton.disabled = false;
	videoStream = null; 
	window.stream = null;  	
    video.src = video.srcObject = null; 
	
}
  
function gotStream(stream){
	//Mouse Position for Line and Point
	video.addEventListener('mousedown', function(evt) {getMousePosScreenDown(video, evt);}, false);	
	video.addEventListener('mouseup', function(evt) {getMousePosScreenUp(video, evt);}, false);
	

    SYposition = parseFloat (document.getElementById("SYposition").value);
    SXposition = parseFloat (document.getElementById("SXposition").value);  
	SYlength = parseFloat (document.getElementById("SYlength").value);
    SXlength = parseFloat (document.getElementById("SXlength").value);  


	c1_ctx = canvas.getContext("2d");
    c2_ctx = canvas2.getContext("2d");
    canvas.width = SXlength ;
 	canvas.height = SYlength  ;
 
	canvas2.width = 720  ;  
	canvas2.height = canvas2_hight;  
  //-----------------------
	var myButton = document.getElementById('buttonStart');
	if (myButton) myButton.disabled = true;
	videoStream = stream;
	window.stream = stream;  
	log('Got stream.');
/*	video.onerror = function ()
	{
		log('video.onerror');
		 stop();
	
	};
	*/
	stream.onended = noStream;

	video.srcObject=stream;

	myButton = document.getElementById('buttonSnap');
	if (myButton) myButton.disabled = false;
	myButton = document.getElementById('buttonMeasurement');
	if (myButton) myButton.disabled = false;
	myButton = document.getElementById('buttonStop');
	if (myButton) myButton.disabled = false;
	myButton = document.getElementById('visual');
	if (myButton) myButton.disabled = false;
	
	measurment();  
	  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}


  
function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map(select => select.value);
  selectors.forEach(select => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      audioInputSelect.appendChild(option);
    } else if (deviceInfo.kind === 'audiooutput') {
      option.text = deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
      audioOutputSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
      select.value = values[selectorIndex];
    }
  });
  videoSelect.onchange = start;
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError); 

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
  if (typeof element.sinkId !== 'undefined') {
    element.setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch(error => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          audioOutputSelect.selectedIndex = 0;
        });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

function changeAudioDestination() {
  const audioDestination = audioOutputSelect.value;
  attachSinkId(video, audioDestination);
}

 
function handleError(error) {
  log('navigator.MediaDevices.getUserMedia error: '+ error.message +"  -   "+ error.name);
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  
  const audioSource = audioInputSelect.value;
  const videoSource = videoSelect.value;
  const constraints1 = {  
  //  audio: {  sampleSize: 16,
 //    			channelCount: 2,
//				deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {    width: { min: 640, ideal: XResolution },
				height: { min: 400, ideal: Math.abs(XResolution/XResolutionXY) },  
				aspectRatio: { ideal: XResolutionXY },
				frameRate: { min: 25, ideal: XFrameRate },
				deviceId: videoSource ? {exact: videoSource} : undefined
			  
	}
  };


  // Options for getDisplayMedia()

var displayMediaOptions = {
  video: {  	width:  XResolution ,
				height: Math.abs(XResolution/XResolutionXY) ,  
				aspectRatio: XResolutionXY ,
				 displaySurface: 'monitor', // monitor or window or application or browser
				logicalSurface: true,
				frameRate: XFrameRate, 
				cursor: "always"
  },
  audio: false
};
     if ( inputVal!=0) {
  navigator.mediaDevices.getUserMedia(constraints1).then(gotStream).then(gotDevices).catch(handleError);
   } else {
    navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(gotStream).catch(handleError);
}
}




// ------------------------mouse -----------------------
function getMousePos(ic_img, event) { 
  var rect = ic_img.getBoundingClientRect();
         zeile  = Math.round(event.clientY - rect.top);
         column = Math.round(event.clientX - rect.left);  
		 document.getElementById("Mline").value = zeile;
	     document.getElementById("Mcolumn").value  = column;

}
function getMousePosScreenDown(ic_img, event) {   
  var rect = ic_img.getBoundingClientRect();
         SYposition  = Math.round(event.clientY - rect.top);
         SXposition  = Math.round(event.clientX - rect.left);  

		 document.getElementById("SYposition").value  = SYposition;
	     document.getElementById("SXposition").value  = SXposition;
		 ic_img.style.cursor="crosshair";
} 
function getMousePosScreenUp(ic_img, event) { 
  var rect = ic_img.getBoundingClientRect(); 
         let iSYlength  =  Math.round(event.clientY - rect.top)  - SYposition ;
         let iSXlength  =  Math.round(event.clientX - rect.left) - SXposition ;  
		 if (iSYlength >  0) { 
		   SYlength = iSYlength ;
		   SXlength = iSXlength ;
		   document.getElementById("SYlength").value  = SYlength;
	       document.getElementById("SXlength").value  = SXlength;
		    canvas.width = SXlength + 0 +0;
			canvas.height = SYlength +0 +0  ;
           }	

  			ic_img.style.cursor="pointer";

		clearCanvas(canvas2);  
		clearMeasur();

}

	
function log(text)
{
	if (preLog) preLog.textContent += ('\n' + text);
	else console.log(text);
} 



   



 