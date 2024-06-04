/*
 *  Copyright (c) 2021 j.Lohr
*/

 

"use strict";
// ---------------------------Var: global------------------
 // var canvasSnap ;
// var canvas2 ;
var c1_ctx ;//= canvas.getContext("2d");
var c2_ctx ;//= canvas2.getContext("2d");

const video = document.querySelector('video');
const audioInputSelect = document.querySelector('select#audioSource');
const audioOutputSelect = document.querySelector('select#audioOutput');
var videoSelect = document.querySelector('select#videoSource');
const selectors = [audioInputSelect, audioOutputSelect, videoSelect];

 audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);


var videoStream = null;
var preLogOut ;
var XResolution = 1280; 
var XResolutionXY = 16/9;     
var XFrameRate = 25; 
//var visual_loop=false;
var intervalId=0;

var inputVal =1;
var  frameRate =25;
//---------------------------var: audio ---------------------
 var button_on = "#cc0000";
var button_normal = "#66CC33";  
var phone="✆";
const videoElement = document.querySelector('video');


var AnalyseBufferlength =1024/2;
var channelIn = 2;
var channelOut = 2;
  
var audio ;  

var audioContext ;

var realAudioInput = null;  
var mediaDestination;
var masterGain;
var jsNode;

// ---------------------------Funk: global   GetUserStream /webcam------------------
 
  
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
//  videoSelect.onchange = startVideo;
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


function noStream() {
	log('Access to camera was denied!');
} 

function handleError(error) {
  log('navigator.MediaDevices.getUserMedia error: '+ error.message +"  -   "+ error.name);
  console.log(error)
}


// ---------------------------Funk: Video   GetUserStream /webcam------------------
function Input(val) {
//	log('Webcam: one Display!');
	inputVal = val;
	var mySelctor = document.getElementById('videoSource'); 
	if (val ==1) 	mySelctor.disabled = false;
	else            mySelctor.disabled = true;
}


function stopVideo() {
	clearInterval(intervalId); 
	var myButton = document.getElementById('buttonStop');
	if (myButton) myButton.disabled = true;
	myButton = document.getElementById('buttonStart');
	if (myButton) myButton.disabled = false;
	
		myButton = document.getElementById('buttonSnap');  
	if (myButton) myButton.disabled = true;
	
	myButton = document.getElementById('buttonSnapPosition');
	if (myButton) myButton.disabled = true;
	

	videoStream = null; 
	window.stream = null;  	
      video.srcObject =  null; //video.src =
	clearVideoMeasurement() ;
}
  function initVideoPlayer(){
	SYposition = parseFloat (document.getElementById("SYposition").value);
    SXposition = parseFloat (document.getElementById("SXposition").value);  
	SYlength = parseFloat (document.getElementById("SYlength").value);
    SXlength = parseFloat (document.getElementById("SXlength").value);  


	c1_ctx = canvasSnap.getContext("2d");
 //   c2_ctx = canvas2.getContext("2d");
    canvasSnap.width = SXlength ;
 	canvasSnap.height = SYlength  ;
 
//	canvas2.width = 720  ;  
//	canvas2.height = canvas2_hight;  
	VideoWidth=video.videoWidth;
	VideoHeight=video.videoHeight;
	canvasVideo.width= XResolution/4 ; 
	canvasVideo.height=XResolution/XResolutionXY/4; 

  }
function gotStreamVideo(stream){
	log ("Access to Video");
	//Mouse Position for Line and Point
	initVideoPlayer();
  //-----------------------  
  
	
	videoStream = stream;
	window.stream = stream;  
	log('Got stream.');

	stream.onended = noStream;

	video.srcObject=stream;

	var myButton = document.getElementById('buttonStart');
	if (myButton) myButton.disabled = true;
	myButton = document.getElementById('buttonSnap');
	if (myButton) myButton.disabled = false;
	myButton = document.getElementById('buttonSnapPosition');
	if (myButton) myButton.disabled = false;
	
	myButton = document.getElementById('buttonMeasurement');
	if (myButton) myButton.disabled = false;
	myButton = document.getElementById('buttonStop');
	if (myButton) myButton.disabled = false;
//	myButton = document.getElementById('visual');
//	if (myButton) myButton.disabled = false;
	

		//Mouse Position for Line and Point
//	video.addEventListener('mousedown', function(evt) {getMousePosScreenDownVid(video, evt);}, false);	
//	video.addEventListener('mouseup', function(evt) {getMousePosScreenUpVid(video, evt);}, false);
	canvasPic.addEventListener('mousedown', function(evt) {getMousePosScreenDownVid(canvasPic, evt);}, false);	
	canvasPic.addEventListener('mouseup', function(evt) {getMousePosScreenUpVid(canvasPic, evt);}, false);
	canvasSnap.addEventListener('click', function(evt) {getMousePosVid(canvasSnap, evt);}, false);

  //   canvasFFT.addEventListener('click', function(evt) {getMousePosVid (canvasFFT, evt);}, false);	
	canvasSnap.addEventListener('click', function(evt) {getMousePosVid(canvasSnap, evt);}, false);

//	canvas2.width = array_elemente + canvas2_distance + canvas2_text  ;
//	canvas2.height = (canvas2_hight+canvas2_distance)*3 +canvas2_distance;
	zeile	= parseInt(document.getElementById("Mline").value ) ;
	column  =  parseInt(document.getElementById("Mcolumn").value)   ;
 /*
array_elemente=256;  
		histogram_y = new Float32Array(array_elemente);
	histogram_u = new Float32Array(array_elemente);
	histogram_v = new Float32Array(array_elemente);

	histogram_r = new Float32Array(array_elemente);
	histogram_g = new Float32Array(array_elemente);
	histogram_b = new Float32Array(array_elemente);
	*/
		initVideoMeasurement() ;
 intervalId = setInterval(processingVideoMeasurement, 1000/frameRate);  


	  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}



function startVideo() {
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
  navigator.mediaDevices.getUserMedia(constraints1).then(gotStreamVideo).then(gotDevices).catch(handleError);
   } else {
    navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(gotStreamVideo).catch(handleError);
}
}
 

 

// ------------------------mouse -----------------------

function getMousePosVid(ic_img, event) { 
  var rect = ic_img.getBoundingClientRect();
   if (ic_img==canvasSnap){
		 zeile  = Math.round(event.clientY - rect.top-canvas_distance);
         column = Math.round(event.clientX - rect.left-canvas_distance);  

		  if (column<0)column=0;
		  if (zeile<0)zeile=0;
		  if (column>(SXlength )-1) column=(SXlength)-1;
		  if (zeile>(SYlength )-1) zeile=(SYlength)-1;
		 document.getElementById("Mline").value = zeile;
	     document.getElementById("Mcolumn").value  = column;
		 shotPositionVid();
	//  alert("x:" + mouseX + " y:" + mouseY);  
	} else if (ic_img==canvasWL){
         column = Math.round(event.clientX - rect.left-canvasWL_text);  
		 if (column<0)column=0;
		 if (column>(SXlength )-1) column=(SXlength)-1;
	     document.getElementById("Mcolumn").value  = column;
		 measurementWL ();
	
	} else if (ic_img==canvasWF){
         column = Math.round(event.clientX - rect.left-canvasWL_text);  
		 if (column<0)column=0;
		 if (column>(SXlength )-1) column=(SXlength)-1;
	     document.getElementById("Mcolumn").value  = column;
		 measurementWF ();
	} else if (ic_img==canvasFFT){
		 zeile  = Math.round(event.clientY - rect.top-canvas_distance-w/2);
         column = Math.round(event.clientX - rect.left-canvasFFT_text-w/2);  

		  if (column<-128)column=-128;
		  if (zeile<-128)zeile=-128;
		  if (column>127)column=127;
		  if (zeile>127)zeile=127;
		  if (column>(SXlength )-1) column=(SXlength)-1;
		  if (zeile>(SYlength )-1) zeile=(SYlength)-1;
 		 document.getElementById("MlineFFT").value = zeile;
	     document.getElementById("McolumnFFT").value  = column;
	//  alert("x:" + mouseX + " y:" + mouseY);
		 StoreMeasurmentWeb_GLTake2D(zeile,column);
  
	
/*	} else if (ic_img==canvasVec){
         MWColumn = Math.round(event.clientX - rect.left);  
		 MWColumn = MWColumn -canvasVec_text;;
		 if (MWColumn<0)MWColumn=0;
		 if (MWColumn>(iSYL )-1) MWColumn=(iSYL)-1;
	     document.getElementById("MWcolumn").value  = MWColumn ;
		  //measurementWave();
	//  alert("x:" + mouseX + " y:" + mouseY);
	} else if (ic_img==canvas3) {
	     MFColumn = Math.round(event.clientX - rect.left);  
		 MFColumn = MFColumn -canvasVec_text; 
		 if (MFColumn<0)MFColumn=0;
		 if (MFColumn>(AnalyseBufferlength/2 )-1) MFColumn=(AnalyseBufferlength/2 )-1;
	     document.getElementById("MFcolumn").value  = MFColumn ;
		 //drawMeasurFFT();
	} else {
	     MHColumn = Math.round(event.clientX - rect.left);  
		 MHColumn = MHColumn -canvasVec_text;
		 if (MHColumn<0)MHColumn=0;
		 if (MHColumn>(canvasVec_hight*2 )-1) MHColumn=(canvasVec_hight*2 )-1;
	     document.getElementById("MHcolumn").value  = MHColumn;
		 //measurementHis();
*/
		 }
}

function getMousePosScreenDownVid(ic_img, event) {   
  var rect = ic_img.getBoundingClientRect();
         SYposition  = Math.round(event.clientY - rect.top-canvas_distance);
         SXposition  = Math.round(event.clientX - rect.left-canvas_distance);  

  var fxScale_id = document.getElementById("fxScale_id").value; 
		 document.getElementById("SYposition").value  = SYposition * fxScale_id;
	     document.getElementById("SXposition").value  = SXposition * fxScale_id;
		 ic_img.style.cursor="crosshair";
//		   mainVideo.setAttribute('style', "display: ");

	//  alert("x:" + mouseX + " y:" + mouseY);
}
function getMousePosScreenUpVid(ic_img, event) { 
  var rect = ic_img.getBoundingClientRect();
         SYlength  =  Math.round(event.clientY - rect.top-canvas_distance)  - SYposition ;
         SXlength  =  Math.round(event.clientX - rect.left-canvas_distance) - SXposition ; 
  var fxScale_id = document.getElementById("fxScale_id").value; 		 
		 document.getElementById("SYlength").value  = SYlength * fxScale_id;
	     document.getElementById("SXlength").value  = SXlength * fxScale_id;
		 ic_img.style.cursor="pointer";
		 shotPositionVid();
	//  alert("x:" + mouseX + " y:" + mouseY);
}

function getMousePos2(ic_img, event) { 
  var rect = ic_img.getBoundingClientRect();
         zeile  = Math.round(event.clientY - rect.top);
         column = Math.round(event.clientX - rect.left);  
		 document.getElementById("Mline").value = zeile;
	     document.getElementById("Mcolumn").value  = column;

}
function getMousePosScreenDown2(ic_img, event) {   
  var rect = ic_img.getBoundingClientRect();
         SYposition  = Math.round(event.clientY - rect.top);
         SXposition  = Math.round(event.clientX - rect.left);  

		 document.getElementById("SYposition").value  = SYposition;
	     document.getElementById("SXposition").value  = SXposition;
		 ic_img.style.cursor="crosshair";
} 
function getMousePosScreenUp2(ic_img, event) { 
  var rect = ic_img.getBoundingClientRect(); 
         let iSYlength  =  Math.round(event.clientY - rect.top)  - SYposition ;
         let iSXlength  =  Math.round(event.clientX - rect.left) - SXposition ;  
		 if (iSYlength >  0) { 
		   SYlength = iSYlength ;
		   SXlength = iSXlength ;
		   document.getElementById("SYlength").value  = SYlength;
	       document.getElementById("SXlength").value  = SXlength;
		    canvasSnap.width = SXlength + 0 +0;
			canvasSnap.height = SYlength +0 +0  ;
           }	

  			ic_img.style.cursor="pointer";

		clearCanvas(canvas2);  
		clearMeasur();

}
//--------------------------mouse audio


function getMousePosAudio(ic_img,iCanvas ,event) { 
  var rect = iCanvas.getBoundingClientRect();
  if (ic_img=="canvas2"){
         MWColumn = Math.round(event.clientX - rect.left);  
		 MWColumn = MWColumn -canvas2_text;;
		 if (MWColumn<0)MWColumn=0;
		 if (MWColumn>(iSYL )-1) MWColumn=(iSYL)-1;
	     document.getElementById("MWcolumn").value  = MWColumn ;
		 measurementWave();
	//  alert("x:" + mouseX + " y:" + mouseY);
	} else if (ic_img=="canvas3") {
	     MFColumn = Math.round(event.clientX - rect.left);  
		 MFColumn = MFColumn -canvas2_text; 
		 if (MFColumn<0)MFColumn=0;
		 if (MFColumn>(AnalyseBufferlength/2 )-1) MFColumn=(AnalyseBufferlength/2 )-1;
	     document.getElementById("MFcolumn").value  = MFColumn ;
		 StoreMeasurmentWeb_GL(); 
		 //drawMeasurFFT(freqByteData2);
	} else if (ic_img=="canvas4"  ) {
	     MHColumn = Math.round(event.clientX - rect.left);  
		 MHColumn = MHColumn -canvas2_text;
		 if (MHColumn<0)MHColumn=0;
		 if (MHColumn>(canvas2_hight*2 )-1) MHColumn=(canvas2_hight*2 )-1;
	     document.getElementById("MHcolumn").value  = MHColumn;
		 measurementHis();
	} else {
	     MLColumn = Math.round(event.clientX - rect.left);  
		 MLColumn = MLColumn -canvas2_text;
		 if (MLColumn<0)MLColumn=0;
		 if (MLColumn>(canvas2_hight*2 )-1) MLColumn=(canvas2_hight*2 )-1;
	     document.getElementById("MLcolumn").value  = MLColumn;
		 measurementLou();
	} 
}
function getMousePosScreenDownAudio(ic_img, event) {   
  var rect = ic_img.getBoundingClientRect();
         SYposition  = Math.round(event.clientX - rect.left);  
		 SYposition= SYposition-canvas2_distance;
		 document.getElementById("SYposition").value  = (SYposition/scalShot).toFixed(0);
		 ic_img.style.cursor="crosshair";
	//  alert("x:" + mouseX + " y:" + mouseY);
}
function getMousePosScreenUpAudio(ic_img, event) { 
  var rect = ic_img.getBoundingClientRect();
         SYlength  =  Math.round(event.clientX - rect.left) - SYposition -canvas2_distance; 
         if(SYlength <= scalShot)SYlength=scalShot;		 
		 document.getElementById("SYlength").value  = (SYlength/scalShot).toFixed(0);
		 ic_img.style.cursor="pointer";
		 shotPosition();
	//  alert("x:" + mouseX + " y:" + mouseY);
}
	//---------------------Log
function log(text){
	preLogOut= document.getElementById('preLog');
	if ( preLogOut     ) preLogOut.textContent += ('\n' + text);
	else console.log(text);
}  


//--------------------------------audio : global-----------------


function startAudio() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource = audioInputSelect.value;
  const videoSource = videoSelect.value;
  const constraints = {
     audio: {deviceId: audioSource ? {exact: audioSource} : undefined, echoCancellation: false, googAutoGainControl: false, googNoiseSuppression: false, googHighpassFilter: false,googAutoGainControl2: false},
 //    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).then(gotStreamAudio).then(gotDevices).catch(handleError);

 
	
	var myButton = document.getElementById('buttonStart');
	if (myButton) myButton.disabled = true;
	myButton = document.getElementById('buttonStop');
	if (myButton) myButton.disabled = false;

}
function stopAudio() {
	var myButton = document.getElementById('buttonStop');
	if (myButton) myButton.disabled = true;
	myButton = document.getElementById('buttonSnap');
	if (myButton) myButton.disabled = true;
	myButton = document.getElementById('visual');
	if (myButton) myButton.disabled = true;


     if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });

	jsNode.disconnect(0);
     realAudioInput.disconnect(0);
	 clearAudioMeasurement();

    }


	var	myButton = document.getElementById('buttonStart');
	if (myButton) myButton.disabled = false;
}  
 
 function mute(){
 	var	myButton = document.getElementById('Mute');
   
	    
	if (myButton.value ==   "Speaker: off"){ 
      muteOn(myButton) ;
  	 }
  else  {
      muteOff(myButton);
	}
}  

  function muteOn(myButton) {
     masterGain.gain.value  =1;
 myButton.value = "Speaker: on";  
  myButton.style.backgroundColor = button_normal;
}
  function muteOff(myButton) {  
    masterGain.gain.value =0; 

	 myButton.value  = "Speaker: off";

 myButton.style.backgroundColor = button_on;
}
//audioInputSelect.onchange = startAudio;
audioOutputSelect.onchange = changeAudioDestination;

function changeAudioDestination() {
  const audioDestination = audioOutputSelect.value;
  attachSinkId(videoElement, audioDestination);
}

function initAudioPlayer() {
 

   audioContext = new AudioContext();

  	// create an audio node with 2 input and 2 output channels, and 1024 byte buffer size per audio frame
 jsNode = audioContext.createScriptProcessor(AnalyseBufferlength, channelIn, channelOut);

 masterGain=audioContext.createGain();
muteOff(document.getElementById('Mute'));//masterGain.gain.value =0;
 mediaDestination = audioContext.createMediaStreamDestination();	
 
 initAudioMeter() ;  
 
//	audio = new Audio();  
} 

function onAudioReady() {
    // when the audio element has been loaded,....
      audio.play();  
  }	  
  
  
function gotStreamAudio(stream) {
		log ("Access to Audio");
	//
	initAudioPlayer();
    jsNode.onaudioprocess = processingAudioMeasurement;   
	realAudioInput = audioContext.createMediaStreamSource(stream);

    realAudioInput.connect(jsNode);
    jsNode.connect(masterGain);  
	masterGain.connect(mediaDestination );  

//   console.log(stream); 

  window.stream = stream; // make stream available to console
    videoElement.srcObject = (mediaDestination.stream);
		initAudioMeasurement();
  return navigator.mediaDevices.enumerateDevices();

}

