/*
 *  Copyright (c) 2021 j.Lohr
*/
    
//-------------------------Measurement Audio Video---------

var fontShort ='italic bold 9px sans-serif';
var colorWhite = "rgb(200,200,200)";
var colorWhiteH = "rgb(255,255,255)"; //Vid  
var colorBlack = "rgb(0,0,0)";
var colorRed = "rgb(200,100,50)";    
var colorRed2 =  "rgb(255,0,0)";  
var colorBlue =  "rgb(0,100,200)";
var colorGreen =  "rgb(0,255,0)";
var colorGreen2 =  "rgb(145,200,0)";
var colorBlue2=  "rgb(128,255,255)";
var colorYellow=  "rgb(255,195,0)";
var colorCyan=  "rgb(128,128,0)";
var colorGrid = "rgb(100,100,100)";  
var colorGrid2 = "rgb(100,100,0)";  
var colorOrange =  "rgb(255,69,0)";//Vid
var colorRedH =  "rgb(255,0,0)"; //vid  

//-------------------------Measurement Video---------
//----------------------------------------------------

// ---------------------------Var: local------------------


var data, idata;
var iImageIn, imgArrayIn,iImageOut, imgArrayOut; 
 
var zeile , column, SYposition, SXposition,SYlength, SXlength, zeile_anfang, zeile_ende ;
var array_elemente;
/*
var grid_Pixel=["Pixel","255", "235", "128", " 16", "  0", "255", "240", "128", " 16", "  0", "255", "240", "128", " 16", "  0"];
var grid_Volt=["mVolt","+761", "+700", "+350", "  +0", " -48", "+394", "+350", "  0", "-350", "-397",  "+394", "+350", "  0", "-350", "-397"];
var grid_Percent=["Percent %","100", " 93", " 50", "  7", "  0", "+100", " 95", "50", "  7", "  0", "+100", " 95", "50", "  7", "  0"];
var grid_HeaderRGB=["Red - R","Green - G", "Blue - B", "0", "128", "255"];
var grid_HeaderYUV=["Luminanz- Y"," Chroma - U (CB/B-Y)", "Chroma - V (CR/R-Y)", "0", "128", "255"];

*/
var grid_Pixel=["Pixel (RGB)","255", "240", "190", "128", " 16", "  0"];
var grid_Percent=["Percent (RGB) %","100", " 93", " 75"," 50", "  7", "  0"];
var grid_HeaderRGB=["Red - R","Green - G", "Blue - B"];
var grid_HeaderYUV=["Luminanz- Y"," Chroma - U (CB/B-Y) -(Value +128)", "Chroma - V (CR/R-Y) (value +128)"];
var grid_HeaderYUV_Koodinat=["Luminanz- Y (Grid)"," Chroma - U (CB/B-Y) -(Grid)", "Chroma - V (CR/R-Y) -(Grid)"];
var grid_HeaderYUV_Percent=["Luminanz- Y (%)"," Chroma - U (CB/B-Y) -(%)", "Chroma - V (CR/R-Y) -(%)"];
var grid_Pixel_WL=["Pixel","255", "235", "128", " 16", "  0", "255", "240", "128", " 16", "  0", "255", "240", "128", " 16", "  0"];
var grid_Volt_WL=["mVolt","+761", "+700", "+350", "  +0", " -48", "+394", "+350", "  0", "-350", "-397",  "+394", "+350", "  0", "-350", "-397"];
var grid_Percent_WL=["Percent %","100", " 93", " 50", "  7", "  0", "+100", " 95", "50", "  7", "  0", "+100", " 95", "50", "  7", "  0"];
var grid_HeaderRGB_WL=["Red - R","Green - G", "Blue - B"];
var grid_HeaderYUV_WL=["Luminanz- Y"," Chroma - U (CB/B-Y)", "Chroma - V (CR/R-Y)"];
var grid_Pixel_WF=["Pixel","255", "235", "128", " 16", "  0", "255", "240", "128", " 16", "  0", "255", "240", "128", " 16", "  0"];
var grid_Volt_WF=["mVolt","+761", "+700", "+350", "  +0", " -48", "+394", "+350", "  0", "-350", "-397",  "+394", "+350", "  0", "-350", "-397"];
var grid_Percent_WF=["Percent %","100", " 93", " 50", "  7", "  0", "+100", " 95", "50", "  7", "  0", "+100", " 95", "50", "  7", "  0"];
var grid_HeaderRGB_WF=["Red - R","Green - G", "Blue - B"];
var grid_HeaderYUV_WF=["Luminanz- Y"," Chroma - U (CB/B-Y)", "Chroma - V (CR/R-Y)"];
var grid_Pixel_His=["Pixel","255", "235", "128", " 16", "  0", "255", "240", "128", " 16", "  0", "255", "240", "128", " 16", "  0"];
var grid_Volt_His=["mVolt","+761", "+700", "+350", "  +0", " -48", "+394", "+350", "  0", "-350", "-397",  "+394", "+350", "  0", "-350", "-397"];
var grid_Percent_His=["Percent %","100", " 93", " 50", "  7", "  0", "+100", " 95", "50", "  7", "  0", "+100", " 95", "50", "  7", "  0"];
var grid_HeaderRGB_His=["Red - R","Green - G", "Blue - B", "0", "128", "255"];
var grid_HeaderYUV_His=["Luminanz- Y"," Chroma - U (CB/B-Y)", "Chroma - V (CR/R-Y)", "0", "128", "255"];
var grid_Pixel_FFT=["Pixel","255", "235", "128", " 16", "  0", "255", "240", "128", " 16", "  0", "255", "240", "128", " 16", "  0"];
var grid_Volt_FFT=["mVolt","+761", "+700", "+350", "  +0", " -48", "+394", "+350", "  0", "-350", "-397",  "+394", "+350", "  0", "-350", "-397"];
var grid_Percent_FFT=["Percent %","100", " 93", " 50", "  7", "  0", "+100", " 95", "50", "  7", "  0", "+100", " 95", "50", "  7", "  0"];
var grid_HeaderRGB_FFT=["Red - R","Green - G", "Blue - B", "0", "128", "255"];
var grid_Header1_FFT=["Koeffizient","	Real", "Imag", "-32",  "0",  "+31"];

 
//----------------------------shnapshot----------------

var VideoHeight;
var VideoWidth;

//---------------------- wave-line ----------------------------------------------
var histogram_y2 ;
var histogram_u2 ;
var histogram_v2 ;
var histogram_r ;
var histogram_g ;
var histogram_b ;

var colorimetryValWL =1;
var unitValWL =0;
var canvasWL_hight = 100;
var canvasWL_text = 50;
var canvasWL ;
var IntervalIdWL=0;

var Flag_Wave_Display_Type="Line"; //Punkt
//---------------------- wave-frame ------------
var colorimetryValWF =1;
var unitValWF =0;
var canvasWF_hight = 255;
var canvasWF_text = 50;
var canvasWF ;
var IntervalIdWF=0;
// ---------------------------his------------------
var colorimetryValHisLine =1; 
var unitValHisLine =0;
var canvasHisLine_hight = 100;
var canvasHisLine_text = 50
var canvasHisLine;

var histogram_y ;
var histogram_u ;
var histogram_v;

var histogram_r;
var histogram_g;
var histogram_b;

var histogram_r4;
var histogram_g4;
var histogram_b4;

var histogram_y4 ;
var histogram_u4 ;
var histogram_v4;

var max_histogram_y;
var max_histogram_u;
var max_histogram_v ;
var max_histogram_r ;
var max_histogram_g ;
var max_histogram_b ;
var aktR, aktG,aktB,aktY,aktU,aktV;
var IntervalIdHisLine=0;
// ---------------------------vector------------------
var canvasVec_hight = 255;
var canvasVec_scale=1.1;
var canvasVec_text = 140;
var canvasVec;
var c2_ctx ;
var colorimetryValVec =1;
var unitValVec =0;
var IntervalIdVec=0;
// ---------------------------fft------------------
var canvasFFT_hight = 100;
var canvasFFT_text = 50
var canvasFFT;

var unitValHisFFT2D   =0;

var w=256/4;
var aLength = w*w;
	var FFT1, FFT2, FFT3;
	var spectrum;  
    var     real1 = [],
			real2 = [],
			real3 = [],
            imag = [];
	var CheckM;
	 FFT1 =new Object();
	FFT1.real = [];
	FFT1.imag = [];
	FFT1.spec = [];	
	 FFT2 =new Object();
	FFT2.real = new Float32Array(aLength);
	FFT2.imag =new Float32Array(aLength);
	FFT2.spec = new Uint16Array(aLength);
 
	var FFT_range = "1"; // logarithmisch	
var freqByteData ;
 freqByteData 	  = new Uint8Array(aLength);  
var zeileFFT     ;
var columnFFT    ;
  var colorimetryValFFT2D =1;
  var IntervalIdFFT2D=0;
// ---------------------------fft------------------

var altMeasurementColour=[32,32,0,0,0];   
  
// ------------------------ measurement- func-----------------------
function cleargrid(iCan) {

		iCan.getContext('2d').fillStyle = colorBlack;
		iCan.getContext('2d').fillRect(0, 0, iCan.width, iCan.height);
}	
		  
	
   // Pegel berechnung dbFS
function  pegel(wert) {	 
	 return  Math.pow(10, wert /20  ); // 0.5 
}	
/*
function  db(wert) {	 
	 return 20 * Math.log(wert+0.000001) / Math.log(10); // -6dbFS
}	
*/	

function  db(wert) {	 
	 return 20 * Math.log(Math.abs(wert)+0.000000001) / Math.log(10); // -6dbFS
}	

function runde(x, n) {  
  if (n < 0 || n > 14) return false;
  var e = Math.pow(10, n);
  var k = (Math.round(x * e) / e).toString();
  if (n == 0 ) return k;
  if (k.indexOf('.') == -1) k += '.';
  k += e.toString().substring(1);
  return k.substring(0, k.indexOf('.') + n+1);
}
//---------------------------------------funkt Video  
  
function writeCanvas(iInput) { 
	c1_ctx.putImageData(iInput,0, 0); // Draw the ImageData object.
}

function readCanvas(iCan,iVideoPlayer, ih) {  // Player; n. Line to read
 	iCan.getContext('2d').drawImage(iVideoPlayer, SXposition, SYposition, SXlength, SYlength);	
    iImageIn = iCan.getContext('2d').getImageData(0, 0,iCan.width-0-0,iCan.height-0-0);
    imgArrayIn = iImageIn.data;
	return imgArrayIn;
}
function readMinVideo(iCan,iVideoPlayer, ih) {  // Player; n. Line to read
//console.log(VideoWidth);console.log(VideoHeight);
 	iCan.getContext('2d').drawImage(iVideoPlayer, 0, 0,iCan.width-0-0,iCan.height-0-0);	
    iImageIn = iCan.getContext('2d').getImageData(0, 0,iCan.width-0-0,iCan.height-0-0);
    imgArrayIn = iImageIn.data;
	return imgArrayIn;
}
function GRAYtoRGB(iOutput, iInput) {  
	let r,g,b;
	for(var i = 0; i < iInput.length; i+=1) {
	    r = iInput[i];
	    g = iInput[i];
	    b = iInput[i];
		iOutput[i*4+0] = r;
		iOutput[i*4+1] = g;
		iOutput[i*4+2] = b;
		iOutput[i*4+3] = 255;
	}
}
function RGBtoGRAY(iOutput, iInput) { 
	let r,g,b ;
	for(var i = 0; i < iOutput.length; i+=1) {
		r = iInput[i*4+0];
		g = iInput[i*4+1];
		b = iInput[i*4+2];
	let	y = Math.sqrt(0.241*(r*r)+0.691*(g*g)+0.068*(b*b));         //Helligkeitsberechnung --> sqrt( .241 R2 + .691 G2 + .068 B2 )
		iOutput[i]   = runde(y,0);
	}
}
 

//---------------------------------------------------------------------------
 

function snapshotVid() {
	VideoWidth=video.videoWidth
	VideoHeight=video.videoHeight
	canvasPicStore.width= VideoWidth   ;
	canvasPicStore.height= VideoHeight ;
	canvasPic.width = VideoWidth   / canvasPic_hightFaktor +canvas_distance +canvas_distance;
 	canvasPic.height = VideoHeight / canvasPic_hightFaktor +canvas_distance +canvas_distance;


	cleargrid(canvasPic);
    canvasPicStore.getContext('2d').drawImage(video, 0, 0);
 	canvasPic.getContext('2d').drawImage(canvasPicStore, canvas_distance, canvas_distance, VideoWidth / canvasPic_hightFaktor,VideoHeight / canvasPic_hightFaktor);


	shotPositionVid();
}

function shotPositionVid() {	
	     SYposition = parseFloat (document.getElementById("SYposition").value);
         SXposition = parseFloat (document.getElementById("SXposition").value);
	     SYlength = parseFloat (document.getElementById("SYlength").value);
	     SXlength = parseFloat (document.getElementById("SXlength").value);	
	     zeile = parseFloat (document.getElementById("Mline").value);
	     column = parseFloat (document.getElementById("Mcolumn").value);
		 
    canvasSnap.width = SXlength + canvas_distance +canvas_distance;
 	canvasSnap.height = SYlength +canvas_distance +canvas_distance;
	cleargrid(canvasSnap);
	canvasSnap.getContext('2d').drawImage(canvasPicStore, SXposition, SYposition, SXlength, SYlength, canvas_distance, canvas_distance,SXlength,SYlength);	

	
	
	
    idata = canvasSnap.getContext('2d').getImageData(canvas_distance, canvas_distance,canvasSnap.width-canvas_distance-canvas_distance,canvasSnap.height-canvas_distance-canvas_distance);
    data = idata.data;
   
    array_elemente=data.length/4;
    histogram_y = new Float32Array(array_elemente);
	histogram_u = new Float32Array(array_elemente);
    histogram_v = new Float32Array(array_elemente);		
	
	histogram_y3 = new Float32Array(array_elemente);
	
	var array_elemente2=SXlength;
    histogram_y2 = new Float32Array(array_elemente2);
	histogram_u2 = new Float32Array(array_elemente2);
    histogram_v2 = new Float32Array(array_elemente2);	
	histogram_r = new Float32Array(array_elemente2);
	histogram_g = new Float32Array(array_elemente2);
	histogram_b = new Float32Array(array_elemente2);
	 
	array_elemente=256;
	histogram_y4 = new Float32Array(array_elemente);
	histogram_u4 = new Float32Array(array_elemente);
	histogram_v4 = new Float32Array(array_elemente);

	histogram_r4 = new Float32Array(array_elemente);
	histogram_g4 = new Float32Array(array_elemente);
	histogram_b4 = new Float32Array(array_elemente);
	
	// draw Line	- Canvas
	canvasSnap.getContext('2d').lineWidth="2";
	canvasSnap.getContext('2d').strokeStyle=colorRed2; 
	canvasSnap.getContext('2d').beginPath();
	canvasSnap.getContext('2d').moveTo(0,zeile+canvas_distance);  // Zeile
	canvasSnap.getContext('2d').lineTo(canvasSnap.width, zeile+canvas_distance);
	canvasSnap.getContext('2d').stroke(); // Draw it
	canvasSnap.getContext('2d').strokeStyle=colorRed2; 
	canvasSnap.getContext('2d').beginPath();
	canvasSnap.getContext('2d').arc(column+canvas_distance, zeile+canvas_distance,2,0,Math.PI*2,true); //Spalte
	canvasSnap.getContext('2d').stroke(); // Draw it
/*
	// draw Line	
	canvasSnap.getContext('2d').lineWidth="2";
	canvasSnap.getContext('2d').strokeStyle=colorOrange; 
	canvasSnap.getContext('2d').beginPath();
	canvasSnap.getContext('2d').moveTo(0,zeile+canvas_distance);  // Zeile
	canvasSnap.getContext('2d').lineTo(canvasSnap.width, zeile+canvas_distance);
	canvasSnap.getContext('2d').stroke(); // Draw it
	canvasSnap.getContext('2d').strokeStyle=colorRed2; 
	canvasSnap.getContext('2d').beginPath();
	canvasSnap.getContext('2d').arc(column+canvas_distance, zeile+canvas_distance,2,0,Math.PI*2,true); //Spalte
	canvasSnap.getContext('2d').stroke(); // Draw it
*/
}

function SnapScale(value) {
canvasPic_hightFaktor=value;   
	snapshotVid();
}
// ----------------------- function measurement Waveformline-----------------------------
/*
function loopVideoWL(iFlagSnapShot) {

loopVideo(loopWaveLine,IntervalIdWF,measurementWL_SnapShot  ,XFrameRate, iFlagSnapShot)
}
function loopVideo(iFlag,iIntervalId,iFunction,iFrameRate) {
 console.log(iFlag );
 // snapshot();
	
	if (iFlag==false) {
		log('visual loop: ON');
		iFlag=true;
		clearInterval(iIntervalId);
        iIntervalId = setInterval(iFunction,iFrameRate);
		}
	else {
		log('visual loop: OFF');
		iFlag=false;
		clearInterval(iIntervalId);
		}
}
*/

// ----------------------- function measurement Waveformline-----------------------------

function loopVideoWL(FlagSnapShot) {  
// console.log(loopWaveLine);
// snapshot();
var	myButton = document.getElementById('loopWaveLine');
	if (myButton.value=="off") { 
		log('wave loop');
	//	loopWaveLine=true;
		clearInterval(IntervalIdWL);
        IntervalIdWL = setInterval(take_measurement_WafeformLine, XFrameRate,FlagSnapShot);

		all_Button(" on", 1.0, myButton, button_normal);
		}
	else {
		log('wave visual');
	//	loopWaveLine=false;
		clearInterval(IntervalIdWL);
		all_Button("off", 0.7, myButton, button_on);
		}
}
function take_measurement_WafeformLine(FlagSnapShot) {
	//console.log(FlagSnapShot);
	if (FlagSnapShot=="yesSnapShot") snapshotVid();
    measurementWL ();
} 

function measurementWL()
{
//	canvasVec.width = array_elemente  ;
//	SXlength = parseFloat (document.getElementById("SXlength").value);	
 	canvasWL.width = SXlength+ canvas_distance + canvasWL_text  ;
	canvasWL.height = (canvasWL_hight+canvas_distance)*3 +canvas_distance;
 //aufruf des Screenscot für Canvas füllen
//	snapshot();
		    shotPositionVid();

		clear_arrayWL (histogram_r);
	    clear_arrayWL (histogram_g);
		clear_arrayWL (histogram_b);
		clear_arrayWL (histogram_y2);
		clear_arrayWL (histogram_u2);
		clear_arrayWL (histogram_v2);
		
//  Canvas	bearbeiten
 //zeile =  (document.getElementById("zeile"));

	   zeile_anfang= (zeile* SXlength * 4) ;
       zeile_ende= ((zeile+1)*(SXlength*4));  

// for(var i = 0; i < data.length; i+=4) {
 
        for(var i = zeile_anfang; i < zeile_ende; i+=4) {
           var r = data[i];
           var g = data[i+1];
           var b = data[i+2];
         //Helligkeitsberechnung 
           var y = Math.sqrt(0.299*(r*r)+0.587*(g*g)+0.114*(b*b));
          // y = (y/255*219) +16;


          //Farbberechnung
/* Amalog Konvertierung
	var   ry =  (1-0.299)*r - 0.587*g - 0.114*b;
 	var   by = -0.299*r - 0.587*g + (1-0.114)*b;
	  var u = by * 0.493;  //X
	  u = u +128;
	  var v = ry *0.877;  // Y  
	  v = v + 128;
 */ // Digital SD Konvertierung
 	var ry =  (1-0.299)*r - 0.587*g - 0.114*b;
 	var by = -0.299*r - 0.587*g + (1-0.114)*b;
	var u = by * 0.564;  //X
	    u += 128;        // u = (u/255*224) +128;
	var v = ry *0.713;   // Y
	    v+= 128;         //v = (v/255*224) + 128;

		// histogramm
		histogram_y2[(i-zeile_anfang)/4]=Math.round(y);
		histogram_u2[(i-zeile_anfang)/4]=Math.round(u);
		histogram_v2[(i-zeile_anfang)/4]=Math.round(v);
		histogram_r[(i-zeile_anfang)/4]=r;
		histogram_g[(i-zeile_anfang)/4]=g;
		histogram_b[(i-zeile_anfang)/4]=b;
        }
 colorimetryWL(colorimetryValWL); 
}
  
function colorimetryWL(vals) {
var val1, val2, val3;
	colorimetryValWL =vals;
	cleargridWL(canvasWL);
	gridWL(canvasWL);
	if (colorimetryValWL ==0) {
		colorbarsWL(255, histogram_r, "rgb(188,0,0)",  (canvasWL_hight+canvas_distance));
		colorbarsWL(255, histogram_g, "rgb(0,188,0)",  (canvasWL_hight+canvas_distance)*2);
		colorbarsWL(255, histogram_b, "rgb(0,0,188)",  (canvasWL_hight+canvas_distance)*3);
	 val1=histogram_r[column];
	 val2=histogram_g[column];
	 val3=histogram_b[column];
		}
	if (colorimetryValWL ==1) {
		colorbarsWL(255, histogram_y2, "rgb(127,127,127)",  (canvasWL_hight+canvas_distance));
		colorbarsWL(255, histogram_u2, "rgb(188,188,0)",  (canvasWL_hight+canvas_distance)*2);
		colorbarsWL(255, histogram_v2, "rgb(0,188,188)",  (canvasWL_hight+canvas_distance)*3);
	 val1=histogram_y2[column];
	 val2=histogram_u2[column];
	 val3=histogram_v2[column];
	}
 
	canvasWL.getContext('2d').fillStyle =colorRed2;
	canvasWL.getContext('2d').font = fontShort;
	canvasWL.getContext('2d').textBaseline = 'top';

	if (unitValWL==0) { val1 = val1; }
	if (unitValWL==1)	{ val1 = Math.round((val1/255*(761+48))-48 );
					  val2 = Math.round((val2/255*(394+397))-397 );
					  val3 = Math.round((val3/255*(394+397))-397 );  }
	if (unitValWL==2)	{ val1 = Math.round(val1/255*100);
					  val2 = Math.round(val2/255*100);
					  val3 = Math.round(val3/255*100);}
	
	var wPix= column;
	wPix= wPix.toFixed(0);
	
	canvasWL.getContext('2d').fillText(val1, canvas_distance,(canvasWL_hight*0)+(canvas_distance*5)); 
	canvasWL.getContext('2d').fillText(val2, canvas_distance,(canvasWL_hight*1)+(canvas_distance*6)); 
	canvasWL.getContext('2d').fillText(val3, canvas_distance,(canvasWL_hight*2)+(canvas_distance*7)); 

	canvasWL.getContext('2d').fillText(wPix, canvasWL_text*1.5,(canvasWL_hight*3)+(canvas_distance*3)); 
	canvasWL.getContext('2d').fillText("Column", canvasWL_text*2,(canvasWL_hight*3)+(canvas_distance*3)); 
	
	draw_MeasLineWL(canvasWL, canvasWL_hight*1 + canvas_distance*1,canvasWL_hight,column+canvasWL_text);
	draw_MeasLineWL(canvasWL, canvasWL_hight*2 + canvas_distance*2,canvasWL_hight,column+canvasWL_text);
	draw_MeasLineWL(canvasWL, canvasWL_hight*3 + canvas_distance*3,canvasWL_hight,column+canvasWL_text);

}

function ColorUnitWL(vals) {
	unitValWL =vals;
	colorimetryWL(colorimetryValWL);
}
function colorbarsWL(max, vals, color, y) {
	for(var i = 0; i < vals.length; i++) {
		canvasWL.getContext('2d').fillStyle = color;
		var pct = (vals[i] / max) * canvasWL_hight;
		canvasWL.getContext('2d').fillRect(i+canvasWL_text, y, 1, -Math.round(pct));
	}
}

function clear_arrayWL(vals) {
  for(var i = 0; i < vals.length; i+=1) {
  vals[i]=0;
  }
}

function cleargridWL(iCan) {
		iCan.getContext('2d').fillStyle = colorBlack;
		iCan.getContext('2d').fillRect(0, 0, iCan.width, iCan.height);
		
}  
function gridWL(iCan) {   
	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="1";
	iCan.getContext('2d').strokeStyle=colorGrid2; // white path
	iCan.getContext('2d').fillStyle = colorGrid2;
	iCan.getContext('2d').font = fontShort;
	iCan.getContext('2d').textBaseline = 'top';
	draw_gridHeaderWL(iCan, canvasWL_hight*0 + canvas_distance*0,0);
	draw_gridLineWL(iCan, canvasWL_hight*0 + canvas_distance*0,0);
	draw_gridLineWL(iCan, canvasWL_hight*0 + canvas_distance*1,1);
	draw_gridLineWL(iCan, canvasWL_hight*0 + canvas_distance*1 +((255-236)/(255/canvasWL_hight)),2);
	draw_gridLineWL(iCan, canvasWL_hight*0 + canvas_distance*1 +((255-128)/(255/canvasWL_hight)),3);
	draw_gridLineWL(iCan, canvasWL_hight*0 + canvas_distance*1 +((255-16)/(255/canvasWL_hight)),4);
	draw_gridLineWL(iCan, canvasWL_hight*1 + canvas_distance*1,5);
	draw_gridHeaderWL(iCan, canvasWL_hight*1 + canvas_distance*1,1);
	draw_gridLineWL(iCan, canvasWL_hight*1 + canvas_distance*2,6);
	draw_gridLineWL(iCan, canvasWL_hight*1 + canvas_distance*2 +((255-240)/(255/canvasWL_hight)),7);
	draw_gridLineWL(iCan, canvasWL_hight*1 + canvas_distance*2 +((255-128)/(255/canvasWL_hight)),8);
	draw_gridLineWL(iCan, canvasWL_hight*1 + canvas_distance*2 +((255-16)/(255/canvasWL_hight)),9);
	draw_gridLineWL(iCan, canvasWL_hight*2 + canvas_distance*2,10);
	draw_gridHeaderWL(iCan, canvasWL_hight*2 + canvas_distance*2,2);
	draw_gridLineWL(iCan, canvasWL_hight*2 + canvas_distance*3,11);
	draw_gridLineWL(iCan, canvasWL_hight*2 + canvas_distance*3 +((255-240)/(255/canvasWL_hight)),12);
	draw_gridLineWL(iCan, canvasWL_hight*2 + canvas_distance*3 +((255-128)/(255/canvasWL_hight)),13);
	draw_gridLineWL(iCan, canvasWL_hight*2 + canvas_distance*3 +((255-16)/(255/canvasWL_hight)),14);
	draw_gridLineWL(iCan, canvasWL_hight*3 + canvas_distance*3,15);
	iCan.getContext('2d').stroke(); // Draw it
}
function draw_gridHeaderWL(iCan, Line, indexNR) {
	if (colorimetryValWL==0)	iCan.getContext('2d').fillText(grid_HeaderRGB_WL[indexNR], iCan.width/2, Line);
	if (colorimetryValWL==1)	iCan.getContext('2d').fillText(grid_HeaderYUV_WL[indexNR], iCan.width/2, Line);
}
function draw_gridLineWL(iCan, Line, indexNR) {
	iCan.getContext('2d').moveTo(0,Line);
	iCan.getContext('2d').lineTo(iCan.width, Line);
	var distance=canvasWL_text-(canvas_distance*2);
	var iValue;
	
	if (Line==0){	distance=canvas_distance;}

	if (unitValWL==0)	iValue = grid_Pixel_WL[indexNR];
	if (unitValWL==1)	iValue = grid_Volt_WL[indexNR];
	if (unitValWL==2)	iValue = grid_Percent_WL[indexNR];
	iCan.getContext('2d').fillText(iValue, distance, Line);
}

function draw_MeasLineWL(iCan, Line,iMhight, Val) {

	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="2";
	iCan.getContext('2d').strokeStyle=colorRed2; // red path

	iCan.getContext('2d').moveTo(Val,Line);
	iCan.getContext('2d').lineTo(Val, Line-iMhight);
	iCan.getContext('2d').stroke(); // Draw it

}

// ----------------------- function measurement Waveform Frame -----------------------------

  
function loopVideoWF(FlagSnapShot) {  
var	myButton = document.getElementById('loopWaveFrame');
	if (myButton.value=="off") { 
		log('wave loop');
		clearInterval(IntervalIdWF);
        IntervalIdWF = setInterval(take_measurement_WafeformFrame, XFrameRate,FlagSnapShot);

		all_Button(" on", 1.0, myButton, button_normal);
		}
	else {
		log('wave visual');
		clearInterval(IntervalIdWF);
		all_Button("off", 0.7, myButton, button_on);
		}
}
function take_measurement_WafeformFrame(FlagSnapShot) {
	//console.log(FlagSnapShot);
	if (FlagSnapShot=="yesSnapShot") snapshotVid();
    measurementWF ();
} 

function measurementWF() {
	SXlength = parseFloat (document.getElementById("SXlength").value);	
	canvasWF.width = SXlength+ canvas_distance + canvasWF_text  ;
	canvasWF.height = (canvasWF_hight+canvas_distance) +canvas_distance;


 //aufruf des Screenscot für Canvas füllen
	//    snapshot();

//  Canvas	bearbeiten

        for(var i = 0; i < data.length; i+=4) {
           var r = data[i];
           var g = data[i+1];
           var b = data[i+2];
         //Helligkeitsberechnung 
          var y = Math.sqrt(0.299*(r*r)+0.587*(g*g)+0.114*(b*b));
  
		// waveform
		histogram_y3[i/4]=Math.round(y);
			}
 colorimetryWF(colorimetryValWF); 		
}

function colorimetryWF(vals) {
	colorimetryValWF =vals;
	cleargridWF(canvasWF);
	gridWF(canvasWF);
	colorbarsWF(canvasWF, 255, histogram_y3, colorWhite,  (canvasWF.hight+canvas_distance));

	canvasWF.getContext('2d').fillStyle = colorRed2;
	canvasWF.getContext('2d').font =fontShort;
	canvasWF.getContext('2d').textBaseline = 'top';
    var valY=histogram_y3[(column)+(zeile* SXlength )];
	if (unitValWF==0)	valY = valY;
	if (unitValWF==1)	valY = Math.round((valY/255*(761+48))-48 );
	if (unitValWF==2)	valY = Math.round(valY/255*100);
	
	var wPix= column;
	wPix= wPix.toFixed(0);
	
	canvasWF.getContext('2d').fillText(valY, canvas_distance,(canvasWF_hight*0)+(canvas_distance*5)); 
	
	canvasWF.getContext('2d').fillText(wPix, canvasWF_text*1.5,(canvasWF_hight*1)+(canvas_distance*1)); 
	canvasWF.getContext('2d').fillText("Column", canvasWF_text*2,(canvasWF_hight*1)+(canvas_distance*1)); 
	
	draw_MeasLineWF(canvasWF, canvasWF_hight*1 + canvas_distance*1,canvasWF_hight,column+canvasWF_text);

}

function ColorUnitWF(vals) {
	unitValWF =vals;
	colorimetryWF(colorimetryValWF);
}
function colorbarsWF(iCan,max, vals, color, y) {
var pct;
	iCan.getContext('2d').fillStyle = color;
	for(var i = 0; i < vals.length; i++) {
		pct = vals[i] ;
		iCan.getContext('2d').fillRect( ((i) % (iCan.width-canvas_distance-canvasWF_text))+canvasWF_text,(iCan.height-canvas_distance-canvas_distance-Math.round(pct))+canvas_distance, 1, 1);			
	}
	
	zeile_anfang= zeile* SXlength ;
    zeile_ende= (zeile+1)* SXlength;  
	iCan.getContext('2d').fillStyle = colorRed;
	for(var i = zeile_anfang; i < zeile_ende; i++) {
		pct = vals[i] ;
		iCan.getContext('2d').fillRect( ((i) % (iCan.width-canvas_distance-canvasWF_text))+canvasWF_text,(iCan.height-canvas_distance-canvas_distance-Math.round(pct))+canvas_distance, 1, 2);			
	}
}

function clear_arrayWF(vals) {
  for(var i = 0; i < vals.length; i+=1) {
	vals[i]=0;
  }
}

function cleargridWF(iCan) {
		iCan.getContext('2d').fillStyle = colorBlack;
		iCan.getContext('2d').fillRect(0, 0, iCan.width, iCan.height);
}
function gridWF(iCan) {   

	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="1";
	iCan.getContext('2d').strokeStyle=colorGrid2; // white path
	iCan.getContext('2d').fillStyle = colorGrid2;
	iCan.getContext('2d').font = fontShort;
	iCan.getContext('2d').textBaseline = 'top';
	draw_gridHeaderWF(iCan,canvasWF_hight*0 + canvas_distance*0,0);
	draw_gridLineWF(iCan,canvasWF_hight*0 + canvas_distance*0,0);
	draw_gridLineWF(iCan,canvasWF_hight*0 + canvas_distance*1,1);
	draw_gridLineWF(iCan,canvasWF_hight*0 + canvas_distance*1 +((255-236)/(255/canvasWF_hight)),2);
	draw_gridLineWF(iCan,canvasWF_hight*0 + canvas_distance*1 +((255-128)/(255/canvasWF_hight)),3);
	draw_gridLineWF(iCan,canvasWF_hight*0 + canvas_distance*1 +((255-16)/(255/canvasWF_hight)),4);
	draw_gridLineWF(iCan,canvasWF_hight*1 + canvas_distance*1,5);

	iCan.getContext('2d').stroke(); // Draw it
}
function draw_gridHeaderWF(iCan,Line, indexNR) {

iCan.getContext('2d').fillText(grid_HeaderYUV_WF[indexNR], iCan.width/2, Line);
}
function draw_gridLineWF(iCan,Line, indexNR) {
	iCan.getContext('2d').moveTo(0,Line);
	iCan.getContext('2d').lineTo(iCan.width, Line);
	var distance=canvasWL_text-(canvas_distance*2);
	var iValue;
	
	if (Line==0){	distance=canvas_distance;}

	if (unitValWL==0)	iValue = grid_Pixel_WF[indexNR];
	if (unitValWL==1)	iValue = grid_Volt_WF[indexNR];
	if (unitValWL==2)	iValue = grid_Percent_WF[indexNR];
	iCan.getContext('2d').fillText(iValue, distance, Line);}

function draw_MeasLineWF(iCan,Line,iMhight, Val) {

	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="2";
	iCan.getContext('2d').strokeStyle=colorRed2; // red path

	iCan.getContext('2d').moveTo(Val,Line);
	iCan.getContext('2d').lineTo(Val, Line-iMhight);
	iCan.getContext('2d').stroke(); // Draw it

}

// ----------------------- function measurementV -----------------------------


function loopVideoVec(FlagSnapShot) {  
var	myButton = document.getElementById('loopVec');
	if (myButton.value=="off") { 
		log('wave loop');
		clearInterval(IntervalIdVec);
        IntervalIdVec = setInterval(take_measurement_Vec, XFrameRate,FlagSnapShot);

		all_Button(" on", 1.0, myButton, button_normal);
		}
	else {
		log('wave visual');
		clearInterval(IntervalIdVec);
		all_Button("off", 0.7, myButton, button_on);
		}
}
function take_measurement_Vec(FlagSnapShot) {
	//console.log(FlagSnapShot);
	if (FlagSnapShot=="yesSnapShot") snapshotVid();
    measurementV ();
} 


function measurementV()
{
//	SXlength = parseFloat (document.getElementById("SXlength").value);	
	
	canvasVec.width = (canvasVec_hight  * canvasVec_scale) + canvasVec_text;
	canvasVec.height = canvasVec_hight * canvasVec_scale;


 //aufruf des Screenscot für Canvas füllen
	    shotPositionVid();
		
		
		//Grid zeichnen
	

//  Canvas	bearbeiten

  for(var i = 0; i < data.length; i+=4) {
           var r = data[i];
           var g = data[i+1];
           var b = data[i+2];
         //Helligkeitsberechnung 
       var y = Math.sqrt(0.299*(r*r)+0.587*(g*g)+0.114*(b*b));
		  
		var ry =  (1-0.299)*r - 0.587*g - 0.114*b;
		var by = -0.299*r - 0.587*g + (1-0.114)*b;
		var u = by * 0.564;  //X
	//    u += 128;        // u = (u/255*224) +128;
		var v = ry *0.713;   // Y
//	    v+= 128;         //v = (v/255*224) + 128;



		// vector speichern
		histogram_y[i/4]=Math.round(y);
		histogram_u[i/4]=Math.round(u);
		histogram_v[i/4]=Math.round(v);
	 }
  colorimetryVecFunction(colorimetryValVec); 		
}


function gridVec()  {

	var iArrayGrid;
	var GridX,GridY;

		// Kreis
		c2_ctx.strokeStyle  = colorGrid2;
		GridX=((canvasVec_hight  * canvasVec_scale)/2)+canvasVec_text;
		GridY=canvasVec.height/2;
		c2_ctx.beginPath();
		c2_ctx.arc(GridX,GridY,(canvasVec_hight/2) * (255/canvasVec_hight), 0,Math.PI*2,true); //min YUV 15	
		c2_ctx.stroke();
		c2_ctx.beginPath();
		c2_ctx.arc(GridX,GridY,(canvasVec_hight/2) * (240/canvasVec_hight), 0,Math.PI*2,true); //min YUV 15	
		c2_ctx.stroke();
		c2_ctx.beginPath();
		c2_ctx.arc(GridX,GridY,(canvasVec_hight/2) * (190/canvasVec_hight), 0,Math.PI*2,true); //min YUV 15	
		c2_ctx.stroke();
		c2_ctx.beginPath();
		c2_ctx.arc(GridX,GridY,(canvasVec_hight/2) * (128/canvasVec_hight), 0,Math.PI*2,true); //min YUV 15	
		c2_ctx.stroke();	
		c2_ctx.beginPath();
		c2_ctx.arc(GridX,GridY,(canvasVec_hight/2) * (16/canvasVec_hight), 0,Math.PI*2,true); //min YUV 15	
		c2_ctx.stroke();
		  
		// Texte
			if (unitValVec==0) iArrayGrid=grid_Pixel;
			if (unitValVec==1) iArrayGrid=grid_Pixel;
			if (unitValVec==2) iArrayGrid=grid_Percent;
		canvasVec.getContext('2d').fillStyle = colorGrid2;
		canvasVec.getContext('2d').font = fontShort; //'italic bold 7px sans-serif';
		canvasVec.getContext('2d').textBaseline = 'top';
		var GridX2=GridX+canvas_distance; //
		c2_ctx.fillText(iArrayGrid[0], GridX, 0);
		c2_ctx.fillText(iArrayGrid[1], GridX2, canvas_distance+ ((canvasVec_hight-255)/2));
		c2_ctx.fillText(iArrayGrid[2], GridX2, canvas_distance+ ((canvasVec_hight-240)/2));
		c2_ctx.fillText(iArrayGrid[3], GridX2, canvas_distance+ ((canvasVec_hight-192)/2));
		c2_ctx.fillText(iArrayGrid[4], GridX2, canvas_distance+ ((canvasVec_hight-128)/2));
		c2_ctx.fillText(iArrayGrid[5], GridX2, canvas_distance+ ((canvasVec_hight-16)/2));		
		c2_ctx.fillText(iArrayGrid[6], GridX2, canvas_distance+ ((canvasVec_hight-0)/2));

//Grid_farbbalken Helligkeit ,0.3
		grid_farbbalkenVec(canvasVec_hight,0,0,0.3,75) ;  // rot
		grid_farbbalkenVec(0,canvasVec_hight,0,0.3,75) ;  // gelb
		grid_farbbalkenVec(0,0,canvasVec_hight,0.3,75);  // blau
		grid_farbbalkenVec(canvasVec_hight,canvasVec_hight,0,0.3,75); // gelb
		grid_farbbalkenVec(canvasVec_hight,0,canvasVec_hight,0.3,75); // magenta
		grid_farbbalkenVec(0,canvasVec_hight,canvasVec_hight,0.3,75); // cyan
//Grid_farbbalken Helligkeit ,0.3 ,Max ist 100
		grid_farbbalkenVec(canvasVec_hight,0,0,0.5,100) ;  // rot
		grid_farbbalkenVec(0,canvasVec_hight,0,0.5,100) ;  // gelb
		grid_farbbalkenVec(0,0,canvasVec_hight,0.5,100);  // blau
		grid_farbbalkenVec(canvasVec_hight,canvasVec_hight,0,0.5,100); // gelb
		grid_farbbalkenVec(canvasVec_hight,0,canvasVec_hight,0.5,100) // magenta
		grid_farbbalkenVec(0,canvasVec_hight,canvasVec_hight,0.5,100); // cyan

// Messwerte
		canvasVec.getContext('2d').fillStyle = colorGrid2;
		canvasVec.getContext('2d').font = fontShort //'italic bold 7px sans-serif';
		canvasVec.getContext('2d').textBaseline = 'top';
		draw_gridHeaderVec(canvasVec_hight*0 + canvas_distance*0,0);
		draw_gridHeaderVec(canvasVec_hight*0 + canvas_distance*6,1);
		draw_gridHeaderVec(canvasVec_hight*0 + canvas_distance*12,2);

}
function draw_gridHeaderVec(Line, indexNR) {
var iArrayGrid;
//	if (colorimetryValVec==0)	aktArray=grid_HeaderRGB;
//	if (colorimetryValVec==1)	aktArray=grid_HeaderYUV;
	if (unitValVec==0) iArrayGrid=grid_HeaderYUV_Koodinat;
	if (unitValVec==1) iArrayGrid=grid_HeaderYUV;
	if (unitValVec==2) iArrayGrid=grid_HeaderYUV_Percent;
canvasVec.getContext('2d').fillText(iArrayGrid[indexNR], canvas_distance, Line); (canvasVec_hight  * canvasVec_scale)

	}
function grid_farbbalkenVec(R,G,B,Helligkeit,skalierung ) {
		var skalierung ;
		var GridX=((canvasVec_hight  * canvasVec_scale)/2);
		var r = skalierung/100 *R;
		var g = skalierung/100 *G;
		var b = skalierung/100 *B;

	var ry =  (1-0.299)*r - 0.587*g - 0.114*b;
	var by = -0.299*r - 0.587*g + (1-0.114)*b;
	var u = by * 0.564;  //X
	//    u += 128;        // u = (u/255*224) +128;
	var v = ry *0.713;   // Y
//	    v+= 128;         //v = (v/255*224) + 128;

	var grid_panel_x=canvasVec_hight*0.05;
	var grid_panel_y=canvasVec_hight*0.03;
	var  iR = Math.round(R* Helligkeit);
	var  iG = Math.round(G* Helligkeit);
	var  iB = Math.round(B* Helligkeit);
		c2_ctx.fillStyle = "rgb("+ iR + ", " + iG + ", " + iB + ")";
		c2_ctx.fillRect( u +(canvasVec.height/2) - (grid_panel_x/2)+canvasVec_text ,-v + GridX - (grid_panel_y/2), grid_panel_x, grid_panel_y);
		
}
function colorimetryVecFunction(vals) {
	colorimetryValVec =vals;
	cleargrid(canvasVec);
	gridVec() ;

	colorbarsVec(255, histogram_u, colorWhite,  histogram_v);

	canvasVec.getContext('2d').fillStyle = colorRed2;
	canvasVec.getContext('2d').font = fontShort;
	canvasVec.getContext('2d').textBaseline = 'top';
    var valY=histogram_y[ column + (zeile* SXlength)];
	var valU=histogram_u[ column + (zeile* SXlength)];
	var valV=histogram_v[ column + (zeile* SXlength)];
	if (unitValVec==0)	valY = valY;
	if (unitValVec==1)	{valY = valY;
					 valU = valU +128;
					 valV = valV +128;												
	}
	if (unitValVec==2)	{valY = Math.round(valY/255*100);
					 valU = Math.round((valU+128)/255*100);
					 valV = Math.round((valV+128)/255*100);												
	}
	var GridX=canvas_distance; //(canvasVec_hight  * canvasVec_scale)
	canvasVec.getContext('2d').fillText(valY,GridX ,(canvasVec_hight*0)+(canvas_distance*2)); 
	canvasVec.getContext('2d').fillText(valU,GridX,(canvasVec_hight*0)+(canvas_distance*8)); 
	canvasVec.getContext('2d').fillText(valV, GridX,(canvasVec_hight*0)+(canvas_distance*14)); 
}

function ColorUnitV(vals) {
	unitValVec =vals;
	colorimetryVecFunction(colorimetryValVec);
}
function colorbarsVec(max, vals, color, y) {
	var GridX=((canvasVec_hight  * canvasVec_scale)/2);
     // Frame
	c2_ctx.fillStyle = color;
	var PointFont=2;  
	for(var i = 0; i < vals.length; i++) {
		 c2_ctx.fillRect(  vals[i] +(canvasVec.height/2) - Math.round(PointFont/2) +canvasVec_text,-y[i] + GridX - Math.round(PointFont/2), PointFont, PointFont);	
	}   
	// Line
	zeile_anfang= zeile* SXlength ; 
    zeile_ende= (zeile+1)* SXlength;  
	var PointFont=3;
	c2_ctx.fillStyle = colorRed;
	for(var i = zeile_anfang; i < zeile_ende; i++) {
		 c2_ctx.fillRect(  vals[i] +(canvasVec.height/2) - Math.round(PointFont/2)+canvasVec_text ,-y[i] + GridX - Math.round(PointFont/2), PointFont, PointFont);
	}
		
     // Point
	 var i = column + (zeile* SXlength);
	 var PointFont=7;
	 c2_ctx.fillStyle = colorRed2;
	 c2_ctx.fillRect(  vals[i] +(canvasVec.height/2) - Math.round(PointFont/2)+canvasVec_text ,-y[i] + GridX - Math.round(PointFont/2), PointFont, PointFont);
}
// ----------------------- function measurement -----------------------------

    
function loopVideoHis(FlagSnapShot) {  
var	myButton = document.getElementById('loopHisLine');
	if (myButton.value=="off") { 
		log('wave loop');
		clearInterval(IntervalIdHisLine);
        IntervalIdHisLine = setInterval(take_measurement_HisLine, XFrameRate,FlagSnapShot);

		all_Button(" on", 1.0, myButton, button_normal);
		}
	else {
		log('wave visual');
		clearInterval(IntervalIdHisLine);
		all_Button("off", 0.7, myButton, button_on);
		}
}
function take_measurement_HisLine(FlagSnapShot) {
	//console.log(FlagSnapShot);
	if (FlagSnapShot=="yesSnapShot") snapshotVid();
    measurementHisLine ();
} 

function measurementHisLine()
{
//	canvasHisLine.width = array_elemente  ;
	SXlength = parseFloat (document.getElementById("SXlength").value);	
 	canvasHisLine.width = array_elemente + canvas_distance + canvasHisLine_text  ;
	canvasHisLine.height = (canvasHisLine_hight+canvas_distance)*3 +canvas_distance;
 //aufruf des Screenscot für Canvas füllen
//	snapshot();
	  
//  Canvas	auslesen

		
		clear_arrayHis (histogram_r4);
	    clear_arrayHis (histogram_g4);
		clear_arrayHis (histogram_b4);
		clear_arrayHis (histogram_y4);
		clear_arrayHis (histogram_u4);
		clear_arrayHis (histogram_v4);
		
//  Canvas	bearbeiten
 //zeile =  (document.getElementById("zeile"));

	   zeile_anfang= (zeile* SXlength * 4) ;
       zeile_ende= ((zeile+1)*(SXlength*4));  


        for(var i = zeile_anfang; i < zeile_ende; i+=4) {
           var r = data[i];
           var g = data[i+1];
           var b = data[i+2];
         //Helligkeitsberechnung 
           var y  = Math.round(  Math.sqrt(0.299*(r*r)+0.587*(g*g)+0.114*(b*b)));
          // y = (y/255*219) +16;


          //Farbberechnung

  // Digital SD Konvertierung
 	var ry =  (1-0.299)*r - 0.587*g - 0.114*b;
 	var by = -0.299*r - 0.587*g + (1-0.114)*b;
	var u = by * 0.564;  //X
	    u  = Math.round(  u+ 128);        // u = (u/255*224) +128;
	var v = ry *0.713;   // Y
	    v= Math.round( v+128);         //v = (v/255*224) + 128;


		// histogramm

		histogram_y4[y]++;
		histogram_u4[u]++;
		histogram_v4[v]++;
		histogram_r4[r]++;
		histogram_g4[g]++;
		histogram_b4[b]++;
		
			if (i == (zeile_anfang + (column*4))) {
			aktR =r; aktG=g; aktB =b; aktY= y; aktU=u; aktV=v;
			}
        }

		
colorimetryHisLineFunction(colorimetryValHisLine); 
}


  

function colorimetryHisLineFunction(vals) {
var val1U, val2U, val3U;
	colorimetryValHisLine =vals;
	cleargridHis(canvasHisLine);
	var UnitP="Pixel";

		max_histogram_y = Math.max.apply(null, histogram_y4);
		 max_histogram_u = Math.max.apply(null, histogram_u4);
		 max_histogram_v = Math.max.apply(null, histogram_v4);
		 max_histogram_r = Math.max.apply(null, histogram_r4);
		 max_histogram_g = Math.max.apply(null, histogram_g4);
		 max_histogram_b = Math.max.apply(null, histogram_b4);
	if (colorimetryValHisLine ==0) {
		colorbarsHisLine(canvasHisLine,max_histogram_r, histogram_r4, "rgb(128,0,0)",  (canvasHisLine_hight+canvas_distance));
		colorbarsHisLine(canvasHisLine,max_histogram_g, histogram_g4, "rgb(0,188,0)",  (canvasHisLine_hight+canvas_distance)*2);
		colorbarsHisLine(canvasHisLine,max_histogram_b, histogram_b4, "rgb(0,0,188)",  (canvasHisLine_hight+canvas_distance)*3);
    	var max_histogram_1 = max_histogram_r;
    	var max_histogram_2 = max_histogram_g;
    	var max_histogram_3 = max_histogram_b;
	}
	if (colorimetryValHisLine ==1) {
		colorbarsHisLine(canvasHisLine,max_histogram_y, histogram_y4, "rgb(127,127,127)",  (canvasHisLine_hight+canvas_distance));
		colorbarsHisLine(canvasHisLine,max_histogram_u, histogram_u4, "rgb(188,188,0)",  (canvasHisLine_hight+canvas_distance)*2);
		colorbarsHisLine(canvasHisLine,max_histogram_v, histogram_v4, "rgb(0,188,188)",  (canvasHisLine_hight+canvas_distance)*3);
    	var max_histogram_1 = max_histogram_y;
    	var max_histogram_2 = max_histogram_u;
    	var max_histogram_3 = max_histogram_v;
		}
 	canvasHisLine.getContext('2d').fillStyle = 'red';
	canvasHisLine.getContext('2d').font = fontShort; //'italic bold 7px sans-serif';
	canvasHisLine.getContext('2d').textBaseline = 'top';
	if (colorimetryValHisLine ==0) {
	var val1=aktR;
	var val2=aktG;
	var val3=aktB;
	var valHis1=histogram_r4[aktR];
	var valHis2=histogram_g4[aktG];
	var valHis3=histogram_b4[aktB];
	}	if (colorimetryValHisLine ==1) {
	var val1=aktY;
	var val2=aktU;
	var val3=aktV;
	var valHis1=histogram_y4[aktY];
	var valHis2=histogram_u4[aktU];
	var valHis3=histogram_v4[aktV];

	}
	if (unitValHisLine==0) { 
		valHis1 = Math.round(valHis1);
		valHis2 = Math.round(valHis2);
		valHis3 = Math.round(valHis3);
	
			}

	if (unitValHisLine==2)	{ 
		valHis1 = Math.round(valHis1/max_histogram_1*100);
		valHis2 = Math.round(valHis2/max_histogram_2*100);
		valHis3 = Math.round(valHis3/max_histogram_3*100);	
					 
					  }

		canvasHisLine.getContext('2d').fillText(valHis1, canvas_distance,(canvasHisLine_hight*0)+(canvas_distance*5));					  
		canvasHisLine.getContext('2d').fillText(val1,            canvasHisLine_text*1.5,(canvasHisLine_hight*1)+(canvas_distance*1)); 
		canvasHisLine.getContext('2d').fillText(UnitP,           canvasHisLine_text*2,(canvasHisLine_hight*1)+(canvas_distance*1)); 

		canvasHisLine.getContext('2d').fillText(valHis2, canvas_distance,(canvasHisLine_hight*1)+(canvas_distance*6));					  
		canvasHisLine.getContext('2d').fillText(val2,              canvasHisLine_text*1.5,(canvasHisLine_hight*2)+(canvas_distance*2)); 
		canvasHisLine.getContext('2d').fillText(UnitP,           canvasHisLine_text*2,(canvasHisLine_hight*2)+(canvas_distance*2)); 
		
		canvasHisLine.getContext('2d').fillText(valHis3, canvas_distance,(canvasHisLine_hight*2)+(canvas_distance*6));					  
		canvasHisLine.getContext('2d').fillText(val3,             canvasHisLine_text*1.5,(canvasHisLine_hight*3)+(canvas_distance*3)); 
		canvasHisLine.getContext('2d').fillText(UnitP,           canvasHisLine_text*2,(canvasHisLine_hight*3)+(canvas_distance*3)); 

	draw_MeasLineHisLine(canvasHisLine,canvasHisLine_hight*1 + canvas_distance*1,val1+canvasHisLine_text);
	draw_MeasLineHisLine(canvasHisLine,canvasHisLine_hight*2 + canvas_distance*2,val2+canvasHisLine_text);
	draw_MeasLineHisLine(canvasHisLine,canvasHisLine_hight*3 + canvas_distance*3,val3+canvasHisLine_text);
	gridHisLine(canvasHisLine);
}

function ColorUnitHisLine(vals) {
	unitValHisLine =vals;
	colorimetryHisLineFunction(colorimetryValHisLine);
}
function colorbarsHisLine(iCan,max, vals, color, y) {
	for(var i = 0; i < vals.length; i++) {
		iCan.getContext('2d').fillStyle = color;
		var pct = (vals[i] / max) * canvasHisLine_hight;
		iCan.getContext('2d').fillRect(i+canvasHisLine_text, y, 1, -Math.round(pct));
	}
}

function clear_arrayHis(vals) {
  for(var i = 0; i < vals.length; i+=1) {
  vals[i]=0;
  }
}

function cleargridHis(iCan) {
 var color = "rgb(0,0,0)"
		iCan.getContext('2d').fillStyle = color;
		iCan.getContext('2d').fillRect(0, 0, iCan.width, iCan.height);
		
//		canvas.getContext('2d').fillStyle = color;
//		canvas.getContext('2d').fillRect(canvas.width-canvasHisLine_text, 10, canvas.width, 100);

}
function gridHisLine(iCan) {  
var v1,v2,v3; 
var colorGrid="rgb(100,100,0)";
	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="1";
	iCan.getContext('2d').strokeStyle=colorGrid; // white path
	iCan.getContext('2d').fillStyle = colorGrid;
	iCan.getContext('2d').font = fontShort ;//'italic bold 7px sans-serif';
	iCan.getContext('2d').textBaseline = 'top';
	if (colorimetryValHisLine==0)	{v1=max_histogram_r; v2=max_histogram_g; v3=max_histogram_b;}
	if (colorimetryValHisLine==1)	{v1=max_histogram_y; v2=max_histogram_u; v3=max_histogram_v;}	
	if (unitValHisLine==0) { v1 = Math.round(v1); }

	if (unitValHisLine==2)	{ v1 = Math.round(v1/v1*100);
					  v2 = Math.round(v2/v2*100);
					  v3 = Math.round(v3/v3*100);}
	draw_gridHeaderHisLine(iCan,canvasHisLine_hight*0 + canvas_distance*0,0,iCan.width/2);
	draw_gridLineHisLine(iCan,canvasHisLine_hight*0 + canvas_distance*1,v1);
	draw_gridLineHisLine(iCan,canvasHisLine_hight*0 + canvas_distance*1 +((255-128)/(255/canvasHisLine_hight)),Math.round(v1/2));
	draw_gridLineHisLine(iCan,canvasHisLine_hight*1 + canvas_distance*1,0);

	draw_gridHeaderHisLine(iCan,canvasHisLine_hight*1 + canvas_distance*1,1,iCan.width/2);
	draw_gridLineHisLine(iCan,canvasHisLine_hight*1 + canvas_distance*2,v2);
	draw_gridLineHisLine(iCan,canvasHisLine_hight*1 + canvas_distance*2 +((255-128)/(255/canvasHisLine_hight)),Math.round(v2/2));
	draw_gridLineHisLine(iCan,canvasHisLine_hight*2 + canvas_distance*2,0);

	draw_gridHeaderHisLine(iCan,canvasHisLine_hight*2 + canvas_distance*2,2, iCan.width/2);
	draw_gridLineHisLine(iCan,canvasHisLine_hight*2 + canvas_distance*3,v3);
	draw_gridLineHisLine(iCan,canvasHisLine_hight*2 + canvas_distance*3 +((255-128)/(255/canvasHisLine_hight)),Math.round(v3/2));
	draw_gridLineHisLine(iCan,canvasHisLine_hight*3 + canvas_distance*3,0);

	draw_gridHeaderHisLine(iCan,canvasHisLine_hight*3 + canvas_distance*3,3, canvasHisLine_text);
	draw_gridHeaderHisLine(iCan,canvasHisLine_hight*3 + canvas_distance*3,4, ((iCan.width-canvas_distance*2-canvasHisLine_text)/2)+canvasHisLine_text);
	draw_gridHeaderHisLine(iCan,canvasHisLine_hight*3 + canvas_distance*3,5, iCan.width-canvas_distance*2);
	iCan.getContext('2d').stroke(); // Draw it
}
function draw_gridHeaderHisLine(iCan,Line, indexNR,colmn) {
	if (colorimetryValHisLine==0)	iCan.getContext('2d').fillText(grid_HeaderRGB_His[indexNR], colmn, Line);
	if (colorimetryValHisLine==1)	iCan.getContext('2d').fillText(grid_HeaderYUV_His[indexNR], colmn, Line);
}
function draw_gridLineHisLine(iCan,Line, Val) {
	iCan.getContext('2d').moveTo(0,Line);
	iCan.getContext('2d').lineTo(canvasHisLine.width, Line);
	var distance=canvasHisLine_text-(canvas_distance*2);
	if (unitValHisLine==0)	iCan.getContext('2d').fillText(Val, distance, Line);
	if (unitValHisLine==1)	iCan.getContext('2d').fillText(Val, distance, Line);
	if (unitValHisLine==2)	iCan.getContext('2d').fillText(Val , distance, Line);
}
function draw_MeasLineHisLine(iCan,Line, Val) {  

	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="2";
	iCan.getContext('2d').strokeStyle="red"; // red path

	iCan.getContext('2d').moveTo(Val,Line);
	iCan.getContext('2d').lineTo(Val, Line-canvas_distance);
	iCan.getContext('2d').stroke(); // Draw it

}
  
  
  
  
// ----------------------------FFT-------------------------
function initFFT() 	{

	cxtFFT.width  = w + canvasFFT_text + canvas_distance;
	cxtFFT.height = w + canvas_distance + canvas_distance;
//	cxtFFT.fillStyle = '#ffffff';
//	cxtFFT.fillRect(0, 0, w, w);
				canvasFFT.width = cxtFFT.width ;
				canvasFFT.height = cxtFFT.height ;	
	 FFT.init(w);
	 SpectrumViewer.init(cxtFFT,canvas_distance,canvasFFT_text);
	 FrequencyFilter.init(w); // wird gebraucht Filter.Swap
}
function gray(FFT_data,idata){
	var i = 0,
        val = 0,
        p = 0;
			
	for(var y=0; y<w; y++) {
        i = y*w;
        for(var x=0; x<w; x++) {
            FFT_data.real[i + x] = idata[(i << 2) + (x << 2)];
            FFT_data.imag[i + x] = 0.0;
        }
    }
}

function do_fft(iFFT_data,jdata)	{


	gray(iFFT_data,jdata);

    FFT.fft2d(iFFT_data.real, iFFT_data.imag);


//console.log(freqByteData);	  
 
		FrequencyFilter.swap(iFFT_data.real, iFFT_data.imag);
		SpectrumViewer.render(FFT1.real, FFT1.imag, freqByteData,FFT_range);	  //--- fEHLER
	

}
 // ----------------------- function measurement -----------------------------

    
function loopVideoFFT2D(FlagSnapShot) {  
var	myButton = document.getElementById('loopFFT2D');
	if (myButton.value=="off") { 
		log('wave loop');
		clearInterval(IntervalIdFFT2D);
        IntervalIdFFT2D = setInterval(take_measurement_FFT2D, XFrameRate,FlagSnapShot);

		all_Button(" on", 1.0, myButton, button_normal);
		}
	else {
		log('wave visual');
		clearInterval(IntervalIdFFT2D);
		all_Button("off", 0.7, myButton, button_on);
		}
}
function take_measurement_FFT2D(FlagSnapShot) {
	//console.log(FlagSnapShot);
	if (FlagSnapShot=="yesSnapShot") snapshotVid();
    measurementFFT2D ();
} 
function measurementFFT2D()
{

//	     SYlength = parseFloat (document.getElementById("SYlength").value);
//	     SXlength = parseFloat (document.getElementById("SXlength").value);	

if (SYlength!=w ||  SXlength !=w){
			SYlength = w;
			SXlength = w ;
    	 document.getElementById("SYlength").value = SYlength ;
	     document.getElementById("SXlength").value = SXlength;
		 snapshotVid();
}
	// SXlength = parseFloat (document.getElementById("SXlength").value);	
	
//	canvas2.width = (canvas2_hight  * canvas2_scale) + canvas2_text;
//	canvas2.height = canvas2_hight * canvas2_scale;

	//canvas2.width = w;
//	canvas2.height = w;
 //aufruf des Screenscot für Canvas füllen
	   // snapshotVid();
		

		//Grid zeichnen
	/*

//  Canvas	bearbeiten

  for(var i = 0; i < data.length; i+=4) {
           var r = data[i];
           var g = data[i+1];
           var b = data[i+2];
         //Helligkeitsberechnung 
       var y = Math.sqrt(0.299*(r*r)+0.587*(g*g)+0.114*(b*b));
		  
		var ry =  (1-0.299)*r - 0.587*g - 0.114*b;
		var by = -0.299*r - 0.587*g + (1-0.114)*b;
		var u = by * 0.564;  //X
	//    u += 128;        // u = (u/255*224) +128;
		var v = ry *0.713;   // Y
//	    v+= 128;         //v = (v/255*224) + 128;



		// vector speichern
		FFT1.real[i/4]=Math.round(y);
		histogram_y[i/4]=Math.round(y);
		histogram_u[i/4]=Math.round(u);
		histogram_v[i/4]=Math.round(v);
	 }
	 */
	cleargridFFT(canvasFFT);
		do_fft(FFT1,data);
var colorimetryValFFT =0;
	 colorimetryFFTFunktion(colorimetryValFFT); 

}
function colorimetryFFTFunktion(vals) {
var val1U, val2U, val3U;

zeileFFT   = parseFloat(document.getElementById("MlineFFT").value)  ;
columnFFT  =  parseFloat(document.getElementById("McolumnFFT").value)   ;
zeileFFT   = zeileFFT+w/2;
columnFFT =columnFFT+w/2;
//console.log(zeileFFT+" " +columnFFT);

 	canvasFFT.getContext('2d').fillStyle = 'red';
	canvasFFT.getContext('2d').font = fontShort; //'italic bold 7px sans-serif';
	canvasFFT.getContext('2d').textBaseline = 'top';
	var valFFT1=runde(FFT1.real[zeileFFT*w+columnFFT],2);
	var valFFT2=runde(FFT1.imag[zeileFFT*w+columnFFT],2);
//console.log(valFFT1+" " +valFFT2);
		canvasFFT.getContext('2d').fillText(valFFT1, canvasFFT_text*0.1,(canvas_distance*2));					  
		canvasFFT.getContext('2d').fillText(valFFT2, canvasFFT_text*0.1,(canvas_distance*5)); 
		canvasFFT.getContext('2d').fillText(grid_Header1_FFT[1], canvasFFT_text*0.1,(canvas_distance*1));					  
		canvasFFT.getContext('2d').fillText(grid_Header1_FFT[2], canvasFFT_text*0.1,(canvas_distance*4)); 

		//canvasFFT.getContext('2d').fillText(UnitP,           canvasFFT_text*2,(canvasFFT_hight*1)+(canvas_distance*1)); 


	gridFFT2D(canvasFFT);
	draw_MeasLineFFT(canvasFFT,zeileFFT + canvas_distance*1,columnFFT+canvasFFT_text);
}

function ColorUnitFFT(vals) {
	unitValHisFFT2D =vals;
	colorimetryFFTFunktion(colorimetryValFFT2D);
}  
function colorbarsFFT(iCan,max, vals, color, y) {
	for(var i = 0; i < vals.length; i++) {
		iCan.getContext('2d').fillStyle = color;
		var pct = (vals[i] / max) * canvasHis_hight;
		iCan.getContext('2d').fillRect(i+canvasHis_text, y, 1, -Math.round(pct));
	}
}

function clear_arrayFFT(vals) {
  for(var i = 0; i < vals.length; i+=1) {
  vals[i]=0;
  }
}

function cleargridFFT(iCan) {
 var color = "rgb(0,0,0)"
		iCan.getContext('2d').fillStyle = color;
		iCan.getContext('2d').fillRect(0, 0, iCan.width, iCan.height);
		
//		canvas.getContext('2d').fillStyle = color;
//		canvas.getContext('2d').fillRect(canvas.width-canvasHis_text, 10, canvas.width, 100);

}

function gridFFT2D(iCan) {  
var v1,v2,v3; 
var colorGrid="rgb(100,100,0)";
	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="1";
	iCan.getContext('2d').strokeStyle=colorGrid; // white path
	iCan.getContext('2d').fillStyle = colorGrid;
	iCan.getContext('2d').font = fontShort ;//'italic bold 7px sans-serif';
	iCan.getContext('2d').textBaseline = 'top';
	if (colorimetryValFFT2D==0)	{v1=max_histogram_r; v2=max_histogram_g; v3=max_histogram_b;}
	if (colorimetryValFFT2D==1)	{v1=max_histogram_y; v2=max_histogram_u; v3=max_histogram_v;}	
	if (unitValHisFFT2D==0) { v1 = Math.round(v1); }

	if (unitValHisFFT2D==2)	{ v1 = Math.round(v1/v1*100);
					  v2 = Math.round(v2/v2*100);
					  v3 = Math.round(v3/v3*100);}
	draw_gridHeaderFFT2D(iCan,canvasFFT_hight*0 + canvas_distance*0,0,iCan.width/2);
	draw_gridLineFFT2D(iCan,canvasFFT_hight*0 + canvas_distance*1,grid_Header1_FFT[3]);

	
	draw_gridLineFFT2D(iCan,canvasFFT_hight*0 + (canvas_distance*1) + 32,grid_Header1_FFT[4]);
  

	draw_gridLineFFT2D(iCan,canvasFFT_hight*0 + (canvas_distance*1) +(64-0),grid_Header1_FFT[5]);

	iCan.getContext('2d').stroke(); // Draw it
}
function draw_gridHeaderFFT2D(iCan,Line, indexNR,colmn) {
	if (colorimetryValFFT2D==0)	iCan.getContext('2d').fillText(grid_HeaderRGB_FFT[indexNR], colmn, Line);
	if (colorimetryValFFT2D==1)	iCan.getContext('2d').fillText(grid_Header1_FFT[indexNR], colmn, Line);
}
function draw_gridLineFFT2D(iCan,Line, Val) {
	iCan.getContext('2d').moveTo(0,Line);
	iCan.getContext('2d').lineTo(canvasFFT.width, Line);
	var distance=canvasFFT_text-(canvas_distance*2);
	if (unitValHisFFT2D==0)	iCan.getContext('2d').fillText(Val, distance, Line);
	if (unitValHisFFT2D==1)	iCan.getContext('2d').fillText(Val, distance, Line);
	if (unitValHisFFT2D==2)	iCan.getContext('2d').fillText(Val , distance, Line);
}
function draw_MeasLineFFT(iCan,Line, Val) {

	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="2";
	iCan.getContext('2d').strokeStyle="red"; // red path

	iCan.getContext('2d').moveTo(Val,Line);
	iCan.getContext('2d').lineTo(Val, Line-canvas_distance);
	iCan.getContext('2d').stroke(); // Draw it

}

//------------------web-gl ----------------

var initWebGL_Flag2D=false;
 
function initWebGL2D(){
var	myButton = document.getElementById('FFT_WebGL');
	if (myButton.value=="Web-GL-3D: off") {
		if (initWebGL_Flag2D==false) {
		       	initVisualizer(w,-20,2,0,-30,30,70); // block, y-offset, Grid-offset,x,y,z, Zoom
					initWebGL_Flag2D=true;
		} 
		all_Button("Web-GL-3D: on", 0.7, myButton, button_normal);
		}
	else {
	//	log('visual LouLoopButton');
  
		all_Button("Web-GL-3D: off", 1.0, myButton, button_on);
		}



  zeileFFT   = parseFloat(document.getElementById("MlineFFT").value)  ;
 columnFFT  =  parseFloat(document.getElementById("McolumnFFT").value)   ;
zeileFFT   = zeileFFT+w/2;
columnFFT =columnFFT+w/2;
var FarbeMeasurID=scene.children[zeileFFT*w+columnFFT];
		  FarbeMeasurID.material.color.r=200;
		  FarbeMeasurID.material.color.g=0;
		  FarbeMeasurID.material.color.b=0;
	  
 }
function StoreMeasurmentWeb_GL2D() {
		var izeile=parseInt(document.getElementById("MlineFFT").value)  ;
	    var icolumn=parseInt(document.getElementById("McolumnFFT").value)  ;

			StoreMeasurmentWeb_GLTake2D(izeile,icolumn);

}   
function StoreMeasurmentWeb_GLTake2D(izeile,icolumn) {
	
		  if (icolumn<-32)icolumn=-32;
		  if (izeile<-32)izeile=-32;
		  if (icolumn>31)icolumn=31;
		  if (izeile>31)izeile=31;
		  if (icolumn>(SXlength )-1) icolumn=(SXlength)-1;
		  if (izeile>(SYlength )-1) izeile=(SYlength)-1;
		 document.getElementById("MlineFFT").value = izeile;
	     document.getElementById("McolumnFFT").value  = icolumn;
	
			 izeile=izeile+w/2;
		 icolumn=icolumn+w/2;
	 
	
var	myButton = document.getElementById('FFT_WebGL');
if (myButton.value=="Web-GL-3D: on") {
		 var a_zeile=altMeasurementColour[0];
		 var a_column=altMeasurementColour[1];
		 
	var FarbeMeasurID=scene.children[a_zeile*w+a_column];
		  FarbeMeasurID.material.color.r=altMeasurementColour[2];
		  FarbeMeasurID.material.color.g=altMeasurementColour[3];
		  FarbeMeasurID.material.color.b=altMeasurementColour[4];
		  
 


//		  console.log(izeile); console.log(icolumn);	 
		 
		 
		  FarbeMeasurID=scene.children[izeile*w+icolumn]; //


		  altMeasurementColour[2]=FarbeMeasurID.material.color.r;
		  altMeasurementColour[3]=FarbeMeasurID.material.color.g;
		  altMeasurementColour[4]=FarbeMeasurID.material.color.b;

		  FarbeMeasurID.material.color.r =200;
		  FarbeMeasurID.material.color.g =0;
		  FarbeMeasurID.material.color.b =0;
}

		  altMeasurementColour[0]=izeile;
 		  altMeasurementColour[1]=icolumn; 
		  	 measurementFFT2D(); 
  //    console.log(altMeasurementColour); 
}


//----------------------measurment audio ----------------------------------------------
 var zeile=0;
 var frameRate = 48000;
//----------------------measurment audio var main----------------------------------------------

var grid1_dBFS =["dBFs",                      "0",    "-9",   "-23",   "-50",    "-70",     "-96",  "-120",      "-96",    "-70",   "-50",  "-23",      "-9",   " 0"];
var arr_Pixel=[         0,                    1.0,    0.35,    0.07,   0.003,   0.0003,   0.00003,       0,   -0.00003,  -0.0003,  -0.003,  -0.07,     -0.35,   -1.0];
var grid1_Pixel=["Sample",                 "+1,0", "+0,35", "+0,07","+0,003","+0,0003","+0,00003",     "0", "-0,00003","-0,0003","-0,003","-0,07",   "-0,35",   "-1"];
var grid1_Volt=["Volt",                    "+4,4",  "+1,5",  "+0,3", "+0,01", "+0,001","+0,0001",     " 0",  "-0,0001", "-0,001", "-0,01", "-0,3",    "+1,5", "-4,4"];
var grid1_Percent=["Percent %"             ,"100",   " 67",   " 53", " 50,1",  " 50,1",   " 50,1", " 50,0",     "49,9", " 49,9",  " 49,9"," 49,7",    "  33",  "  0" ];
var grid1_Pixel_Integer=["SampleInt.", "65536"," 44236", "35061", "32866",  "32777", " 32769",  "32768",    "32767", "32758",  "32696"," 30474", " 21299",  "  0"];
var grid1_dBu=["dBu",                     "+15",      "+6",   "-8",   "-35",    "-55",    "-81",    "-105",      "-81",   "-55",    "-35",    "-8",     "+6",  "+15"];

//var grid_HeaderRGB=["Red - R","Green - G", "Blue - B"];
var grid_HeaderAudio=["left - L: Green"," Right - R: Blue", "Mono - M (L+R/2): White"];


var channelOutL ;
var channelOutR ;

 var audArrayIn =new Object();
	audArrayIn.l = [];
	audArrayIn.r = [];
var audArray2 =new Object();
	audArray2.l = [];
	audArray2.r = [];

//----------------------measurment  var pegel----------------------------------------------
				var meterL ;
				var meterR ;
				var max_amplitudeL = 0.00;
				var max_amplitudeR = 0.00;
				var l_amplitude = 0.00001;
				var r_amplitude = 0.00001;
				var max_overL = -96.00;
				var max_overR = -96.00;
				 max_overL = max_overL.toFixed(2);
				 max_overR = max_overR.toFixed(2);				

//----------------------measurment  snapshot----------------------------------------------
var iBufferCount=0;
var outBufferStatus=0;
 var SYposition,SYlength;
 var iSYL =0;
var  iSYP=0;

var canvas1_hight = 300;  
var canvas2_hight = 100; 
var canvas2_distance =10;
var canvas2_text = 70;
var colorimetryVal =0;

var intervalId;
var intervalId2;
var intervalId3;
var intervalId4;
var intervalId5;

var AnalyseBufferlength=1024*4;  
var bufferCount=200*2;
var AnalyseBufferlength_Worker=128;  
var bufferlength=AnalyseBufferlength_Worker*bufferCount;
var Wave_Count=4;
var Wave_bufferlength=AnalyseBufferlength_Worker*Wave_Count;

var bufferR = new Float32Array(bufferlength);
var bufferL = new Float32Array(bufferlength);
var snapShot_bufferR = new Float32Array(bufferlength);
var snapShot_bufferL = new Float32Array(bufferlength);
var snapShot_bufferM = new Float32Array(bufferlength);
var SnapBuffer =new Object();
	SnapBuffer.l = new Float32Array(bufferlength);
	SnapBuffer.r = new Float32Array(bufferlength); 
	SnapBuffer.m = new Float32Array(bufferlength); 
var	 Wave_buffer =new Object();
	Wave_buffer.l = new Float32Array(Wave_bufferlength);
	Wave_buffer.r = new Float32Array(Wave_bufferlength);

var canvas = document.getElementById('canvas');
var c_ctx ;
 	//Mouse Position for Line and Point
var buffeLou ;
//----------------------measurment  var pegel----------------------------------------------

  
//----------------------measurment  main----------------------------------------------

function readWebAudio(iOutput, iInput) { 
	 iOutput.l  = iInput.l; // Stereo: 0 = left channel, 1 = right channel 
	 iOutput.r  = iInput.r;
}
		 
function readWebAudio2(iOutput, iInput) { 
	 iOutput.l  = iInput.inputBuffer.getChannelData(channelIn-2); // Stereo: 0 = left channel, 1 = right channel 
	 iOutput.r  = iInput.inputBuffer.getChannelData(channelIn-1);
}

 function writeWebAudioObjekt(iOutput,iInput) { 
      sampleOutL = iOutput.getChannelData(0); 
	  sampleOutR = iOutput.getChannelData(1); 
	  for(i = 0; i < sampleOutL.length; i++) {
        sampleOutL[i] = iInput.l[i]
		sampleOutR[i] = iInput.r[i]
      } 
}
function setAmplitudeObjekt(iOutput, iInput, iAplitude) {  
	for(var i = 0; i < iInput.l.length; i+=1) {
     iOutput.l[i] = iAplitude* iInput.l[i] ;
	 iOutput.r[i] = iAplitude* iInput.r[i] ;
				if( isNaN(iAplitude)  ) {
				   iOutput.l[i] = 1* iInput.l[i] ;
				   iOutput.r[i] = 1* iInput.r[i] ;
				   }
	}
}
   
	//------------------------------------

	  
//----------------------measurment   pegel----------------------------------------------
function initAudioMeter() {  
				 meterL = document.getElementById("meterL"); 
				 meterR = document.getElementById("meterR"); 


		  meterL.min=-96;
		  meterL.max=0;
		  meterL.low=-23;
		  meterL.high=-9;
		  meterL.optimum=-90;
		   
		  meterR.min = meterL.min;
		  meterR.max = meterL.max; 
		  meterR.low = meterL.low;
		  meterR.high = meterL.high;
		  meterR.optimum = meterL.optimum;
}
		  
function measurementPegel( channelIn) {  
    max_amplitudeL =  0;
    max_amplitudeR =  0;
      // loop through every sample and add sample values to out buffer
      for(var i = 0; i < channelIn.l.length; i++) {
	    var sample_l = channelIn.l[i]   ;
		var sample_r = channelIn.r[i]  ;

		// Berechnung Pegel
			l_amplitude = Math.abs(sample_l);
			r_amplitude = Math.abs(sample_r);
            max_amplitudeL =  Math.max(max_amplitudeL, Math.abs(l_amplitude));
            max_amplitudeR =  Math.max(max_amplitudeR, Math.abs(r_amplitude));
      } 
	  
	//   Visualisation

		meterL.value = db(max_amplitudeL).toFixed(2);
		meterR.value = db(max_amplitudeR).toFixed(2);
		
	
	max_overL =  Math.max(max_overL, meterL.value);
    max_overR =  Math.max(max_overR, meterR.value);
	OverL.innerHTML = max_overL;
	OverR.innerHTML = max_overR;

}
//-------------------------Measurement SnapShot ---------------------------------  
function snapshot(iSnapBuffer) {
	// log('snappshot done');
  
	//	log(iBufferCount);

     var bufferOffset = AnalyseBufferlength_Worker *(iBufferCount-1);
	// 	log(bufferOffset);
    for(var i = 0; i < bufferlength; i++) {
		if (i+bufferOffset >= bufferlength) bufferOffset = (bufferlength-bufferOffset)*-1;
			snapShot_bufferL[i]=iSnapBuffer.l[i+bufferOffset];
			snapShot_bufferR[i]=iSnapBuffer.r[i+bufferOffset];
			snapShot_bufferM[i]=iSnapBuffer.m[i+bufferOffset];       //Monoberechnung --> r+l	 
    }
	shotPosition();
}

function shotPosition() {
    //  Canvas	bearbeiten
	let scalShot_2=   parseFloat(document.getElementById("scalShot").value);
	scalShot=   Math.pow( 2 , scalShot_2 );
	if (scalShot>=AnalyseBufferlength_Worker){
		  scalShot=AnalyseBufferlength_Worker;
	document.getElementById("scalShot").value =	Math.log(scalShot) / Math.log(2);  
	}
	SYposition = parseFloat (document.getElementById("SYposition").value);
    SYlength = parseFloat (document.getElementById("SYlength").value);
	iSYP = SYposition  * (AnalyseBufferlength_Worker );
	iSYL = 1 *  (AnalyseBufferlength_Worker  ); //scalShot
	iSYL4 = 1 *  (AnalyseBufferlength_Worker  ); //scalShot
     // 1024/20=51
	canvas.width = ((bufferCount*scalShot)) + canvas2_distance +canvas2_distance;
 	canvas.height = canvas2_hight +canvas2_distance +canvas2_distance;
	zeile= (canvas2_hight/2) ;	
		cleargrid(canvas);  
		
		// draw  dbfs
	max_overM = (-96);
	var ii=0;
	var y = (canvas2_hight) + (canvas2_distance);
	for(var i = 0; i < bufferlength; i++) {
		            //Monoberechnung --> r+l 
		var mono =db( snapShot_bufferM[i] );
		// waveform
            max_overM =  Math.max(mono, max_overM);
			if (i%(AnalyseBufferlength_Worker/scalShot)==0) {
				if (max_overM >= (-9))       	c_ctx.fillStyle = colorRed2;
				else if (max_overM >= (-23))	c_ctx.fillStyle = colorYellow;
				else 	c_ctx.fillStyle =  colorGreen;
			pct = 100-((max_overM*-1)* (100/100)) ;
			c_ctx.fillRect(ii+canvas2_distance, y, 1, Math.round(-pct));
			max_overM = (-96); 
			ii++;
			}
	}
		// draw red Line	
	c_ctx.beginPath();
	c_ctx.lineWidth="2";
	c_ctx.strokeStyle=colorCyan; // Green path
	var iSYP_Can = (SYposition * scalShot) +canvas2_distance;
	var iSYL_Can = ((SYposition+1) * scalShot) +canvas2_distance;
	var iSYL_Can2 = ((SYposition+1*4) * scalShot) +canvas2_distance;
	c_ctx.moveTo(iSYP_Can,zeile+canvas2_distance);  // Zeile
	c_ctx.lineTo(iSYL_Can, zeile+canvas2_distance);
	c_ctx.stroke(); // Draw it
	c_ctx.beginPath();
	c_ctx.strokeStyle=colorCyan; // Green path
	c_ctx.moveTo(iSYP_Can,zeile+canvas2_distance+10);  // Zeile
	c_ctx.lineTo(iSYL_Can2, zeile+canvas2_distance+10);
	c_ctx.stroke(); // Draw it
}

function measurementPegelSnapShot( channelIn) {  
    max_amplitudeL =  0;
    max_amplitudeR =  0;
      // loop through every sample and add sample values to out buffer
      for(var i = 0; i < channelIn.l.length; i++) {
	    var sample_l = channelIn.l[i]   ;
		var sample_r = channelIn.r[i]  ;
	     snapShot_bufferR[i] = channelIn.l[i]   ;
		 snapShot_bufferL[i] = channelIn.r[i]  ;
		 snapShot_bufferM[i] = (sample_l+ sample_r ) /2  ;
		// Berechnung Pegel
			l_amplitude = Math.abs(sample_l);
			r_amplitude = Math.abs(sample_r);
            max_amplitudeL =  Math.max(max_amplitudeL, Math.abs(l_amplitude));
            max_amplitudeR =  Math.max(max_amplitudeR, Math.abs(r_amplitude));
      } 
	  
	//   Visualisation

		meterL.value = db(max_amplitudeL).toFixed(2);
		meterR.value = db(max_amplitudeR).toFixed(2);
		
	
	max_overL =  Math.max(max_overL, meterL.value);
    max_overR =  Math.max(max_overR, meterR.value);
	OverL.innerHTML = max_overL;
	OverR.innerHTML = max_overR;

}


 function copySnapshotBuffer( SnapBuffer,  iInput) {  
	var j=0;  
  //  channelOutL = iInput.l; 
   // channelOutR = iInput.r;


      // loop through every sample and add sample values to out buffer

      var bufferOffset = iInput.l.length*(iBufferCount- 1);

      for(i = 0; i < iInput.l.length; i++) {
	    var sample_l = iInput.l[i]   ;
		var sample_r = iInput.r[i]  ;
 
	//	Select output to Play
	// output from input
/*	if(outBufferStatus==0) {
        channelOutL[i] = sample_l;
        channelOutR[i] = sample_r;
	}
    else {
	// output from snapshot buffer
       channelOutL[i] = snapShot_bufferL[iSYP+i];
       channelOutR[i] = snapShot_bufferR[iSYP+i];
	   //Hum Window
	   var humwindow=512;

		 if (i<humwindow) {
				channelOutL[i] = channelOutL[i]*(j/100);
				channelOutR[i] = channelOutR[i]*(j/100);
				j++;
				}


		if (i>(AnalyseBufferlength-humwindow)) {
				channelOutL[i] = channelOutL[i]*(j/humwindow);
				channelOutR[i] = channelOutR[i]*(j/humwindow);
				j--;
				}
    }
*/	
	bufferL[i+bufferOffset] = sample_l;
	bufferR[i+bufferOffset] = sample_r;
	SnapBuffer.l[i+bufferOffset] = sample_l;
	SnapBuffer.r[i+bufferOffset] = sample_r;
	SnapBuffer.m[i+bufferOffset] = sample_r+sample_l;
   }
	  
	if(iBufferCount < bufferCount) iBufferCount+=1;
	else iBufferCount = 1;
	
}

 function writeSnapshot2(   iInput) {  
	var j=0;  
  //  channelOutL = iInput.l; 
  //  channelOutR = iInput.r;


      // loop through every sample and add sample values to out buffer

      var bufferOffset = iInput.l.length*(iBufferCount- 1);

      for(i = 0; i < iInput.l.length; i++) {
	    var sample_l = iInput.l[i]   ;
		var sample_r = iInput.r[i]  ;
 
	//	Select output to Play
	// output from input
/*	if(outBufferStatus==0) {
        channelOutL[i] = sample_l;
        channelOutR[i] = sample_r;
	}
    else {
	// output from snapshot buffer
       channelOutL[i] = snapShot_bufferL[iSYP+i];
       channelOutR[i] = snapShot_bufferR[iSYP+i];
	   //Hum Window
	   var humwindow=512;

		 if (i<humwindow) {
				channelOutL[i] = channelOutL[i]*(j/100);
				channelOutR[i] = channelOutR[i]*(j/100);
				j++;
				}


		if (i>(AnalyseBufferlength-humwindow)) {
				channelOutL[i] = channelOutL[i]*(j/humwindow);
				channelOutR[i] = channelOutR[i]*(j/humwindow);
				j--;
				}
    }
*/
		bufferL[i+bufferOffset] = sample_l;
		bufferR[i+bufferOffset] = sample_r;
   }
	  
	if(iBufferCount < bufferCount) iBufferCount+=1;
	else iBufferCount = 1;
}
function copySnapshotBuffer2(iWave_buffer){
 var bufferOffset = AnalyseBufferlength_Worker *(iBufferCount-1);
    for(i = 0; i < iWave_buffer.l.length; i++) {
	iWave_buffer.l[i]=snapShot_bufferL[iSYP+i];
	iWave_buffer.r[i]=snapShot_bufferR[iSYP+i];
	}
//	console.log (iWave_buffer)
//	console.log (snapShot_bufferL)
}


function outBuffer(iValue) {
	let outBufferStatus=   parseFloat(document.getElementById("outputType").value);
	BufferSwitcher.setValueAtTime(outBufferStatus, audioContext.currentTime);
}

//-----------------------------------------------------
function  overClear() {	 
	max_overL = -96.00;
	max_overR = -96.00;
	OverL.innerHTML = max_overL.toFixed(2);
	OverR.innerHTML = max_overR.toFixed(2);
}
function  meterClear() {	 
	max_amplitudeL = -96.00;
	max_amplitudeR = -96.00;
		meterL.value = (max_amplitudeL).toFixed(2);
		meterR.value = (max_amplitudeR).toFixed(2);
}
  //convertUnit
function  convertUnitVolt(wert) {	 
	 return (wert*(4.4)).toFixed(2);
}	

function  convertUnitPercent(wert) {	 
	 return ((wert/2*100)+50).toFixed(0);
}

function  convertUnitdbFS(wert) {	 
	 return db(wert).toFixed(2);
}
function  convertUnitdbu(wert) {	 
	 return (db(wert)+15.08).toFixed(2);
}
function  convertUnitSample_Integer(wert,iMax) {	 
	 return ((wert/2*iMax)+iMax/2).toFixed(0); 
}
 
 
 function all_Button(ivalue, iopacity, iButton, iBackground) {

	iButton.value = ivalue;
	iButton.style.opacity = iopacity;
	iButton.style.backgroundColor = iBackground;

}

function clear_array(vals) {
  for(var i = 0; i < vals.length; i+=1) {
	vals[i]=0;
  }
} 
  
//-------------------------Measurement Waveform ---------------------------------  

function WaveLoop(FlagSnapShot) {
 log('visual done');
// snapshot();
var	myButton = document.getElementById('IDWaveLoop');
	if (visual_loopWave==false) { 
		log('wave loop');
		visual_loopWave=true;
		clearInterval(intervalId2);
        intervalId2 = setInterval(take_measurement_Wafeform, parseInt(AnalyseBufferlength*1000/frameRate),FlagSnapShot);

		all_Button(" on", 1.0, myButton, button_normal);
		}
	else {
		log('wave visual');
		visual_loopWave=false;
		clearInterval(intervalId2);
		all_Button("off", 0.7, myButton, button_on);
		}
}

function take_measurement_Wafeform(FlagSnapShot) {
	//console.log(FlagSnapShot);
	if (FlagSnapShot=="yesSnapShot") snapshot(SnapBuffer);
    if (Flag_Wave_Display_Type=="Punkt") measurementWave2 ();
	else measurementWave ();
	
} 

function measurementWave2() {

	canvas2.width = (iSYL *Wave_Count) + canvas2_distance + canvas2_text  ;
 	canvas2.height = (canvas2_hight+canvas2_distance)*3 +canvas2_distance;
	// draw Point
	MWColumn = parseFloat (document.getElementById("MWcolumn").value);
	
		colorimetry3(colorimetryVal,iSYP,iSYL*Wave_Count); 
}
 function colorimetry3(vals,iSYP,iiSYL) {
var val1, val2, val3;
	colorimetryVal =vals;

	cleargrid(canvas2);
	gridWaveform3(canvas2);

	if (colorimetryVal ==0) {
	  	colorbars3(c2_ctx, 200/100, snapShot_bufferL, iSYP, iiSYL, colorGreen2,  (canvas1_hight/2-canvas2_distance*2)*1);
		colorbars3(c2_ctx, 200/100, snapShot_bufferR, iSYP, iiSYL, colorBlue,  (canvas1_hight/2-canvas2_distance*2)*1);
		colorbars3(c2_ctx, 200/100, snapShot_bufferM, iSYP, iiSYL, colorWhite,  (canvas1_hight/2-canvas2_distance*2)*1);

	 val1=snapShot_bufferL[iSYP+MWColumn].toFixed(2);
	 val2=snapShot_bufferR[iSYP+MWColumn].toFixed(2);
	 val3=snapShot_bufferM[iSYP+MWColumn].toFixed(2);
	
		}

	if (colorimetryVal ==1) {
		colorbars3(c2_ctx, 200/100, snapShot_bufferL, iSYP, iiSYL, colorGreen2,  (canvas1_hight/2-canvas2_distance*2)*1);
		colorbars3(c2_ctx, 200/100, snapShot_bufferR, iSYP, iiSYL, colorBlue,  (canvas1_hight/2-canvas2_distance*2)*1);
		colorbars3(c2_ctx, 200/100, snapShot_bufferM, iSYP, iiSYL, colorWhite,  (canvas1_hight/2-canvas2_distance*2)*1);
  
	 val1=snapShot_bufferL[iSYP+MWColumn].toFixed(2);
	 val2=snapShot_bufferR[iSYP+MWColumn].toFixed(2);
	 val3=snapShot_bufferM[iSYP+MWColumn].toFixed(2);
	
	}
  
	canvas2.getContext('2d').fillStyle = colorRed2;
	canvas2.getContext('2d').font = fontShort;
	canvas2.getContext('2d').textBaseline = 'top';
	
     // Sample Real
	if (unitVal==0) { val1 = val1; }
	// Volt
	if (unitVal==1)	{ val1 = convertUnitVolt(val1);
					  val2 = convertUnitVolt(val2);
					  val3 = convertUnitVolt(val3)}
    //  Prozent
	if (unitVal==2)	{ val1 = convertUnitPercent(val1);
					  val2 = convertUnitPercent(val2);
					  val3 = convertUnitPercent(val3);}

     //dbFS
	if (unitVal==3) { 
					  val1 = convertUnitdbFS(val1);
					  val2 = convertUnitdbFS(val2);
					  val3 = convertUnitdbFS(val3); }
	
	
	// dbu
	if (unitVal==4) {  
					  val1 = convertUnitdbu(val1);
					  val2 = convertUnitdbu(val2);
					  val3 = convertUnitdbu(val3);}
		// Sample_Integer
	if (unitVal==5) { iMax=Math.pow(2,16);
						val1 =  convertUnitSample_Integer(val1,iMax);
					  val2 =  convertUnitSample_Integer(val2,iMax);
					  val3 =  convertUnitSample_Integer(val3,iMax);}	
   // 1000 ms / 48000 Hz)
 	var wtime= (1000/frameRate)*MWColumn;
	wtime= wtime.toFixed(2);
					  
	canvas2.getContext('2d').fillText(val1, canvas2_text*3.0,(canvas2_hight*0)+(canvas2_distance*0)); 
	canvas2.getContext('2d').fillText(val2, canvas2_text*5.0,(canvas2_hight*0)+(canvas2_distance*0)); 
	canvas2.getContext('2d').fillText(val3, canvas2_text*7.7,(canvas2_hight*0)+(canvas2_distance*0)); 

	canvas2.getContext('2d').fillText(wtime, canvas2_text*1.5,(canvas2_hight*3)+(canvas2_distance*3)); 
	canvas2.getContext('2d').fillText("ms", canvas2_text*2,(canvas2_hight*3)+(canvas2_distance*3)); 

	draw_MeasLine(canvas2,canvas1_hight*1 + canvas2_distance*1,canvas1_hight, MWColumn+canvas2_text);

}  
  

function gridWaveform3(iCan) {   

	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="1";
	iCan.getContext('2d').strokeStyle=colorGrid2; // white path
	iCan.getContext('2d').fillStyle = colorGrid2;
	iCan.getContext('2d').font = fontShort;
	iCan.getContext('2d').textBaseline = 'top';
	
	draw_gridHeader3(iCan,canvas1_hight*0 + canvas2_distance*0,0,unitVal);
	draw_gridLine3(iCan,canvas1_hight*0 + canvas2_distance*1,1,unitVal);
  	draw_gridLine3(iCan,canvas1_hight*0 + canvas2_distance*1 +((canvas1_hight-195)/(canvas2_hight/canvas2_hight)),2,unitVal);
	draw_gridLine3(iCan,canvas1_hight*0 + canvas2_distance*1 +((canvas1_hight-150)/(canvas2_hight/canvas2_hight)),7,unitVal);
	draw_gridLine3(iCan,canvas1_hight*0 + canvas2_distance*1 +((canvas1_hight-105)/(canvas2_hight/canvas2_hight)),12,unitVal);
	draw_gridLine3(iCan,canvas1_hight*1 + canvas2_distance*1,13,unitVal);

	iCan.getContext('2d').stroke(); // Draw it
}
function draw_gridHeader3(iCan, Line, indexNR,iUnitValFFT) {
	iCan.getContext('2d').fillStyle = colorGreen2;  
iCan.getContext('2d').fillText(grid_HeaderAudio[indexNR], canvas2_text*2, Line);
	iCan.getContext('2d').fillStyle = colorBlue;
iCan.getContext('2d').fillText(grid_HeaderAudio[indexNR+1], canvas2_text*4, Line);
	iCan.getContext('2d').fillStyle = colorWhite;
iCan.getContext('2d').fillText(grid_HeaderAudio[indexNR+2], canvas2_text*6, Line);
	iCan.getContext('2d').fillStyle = colorGrid;
if (Line==0){
	if (iUnitValFFT==0)	iCan.getContext('2d').fillText(grid1_Pixel[0], canvas2_distance, Line);
	if (iUnitValFFT==1)	iCan.getContext('2d').fillText(grid1_Volt[0], canvas2_distance, Line);
	if (iUnitValFFT==2)	iCan.getContext('2d').fillText(grid1_Percent[0], canvas2_distance, Line);
	if (iUnitValFFT==3)	iCan.getContext('2d').fillText(grid1_dBFS[0], canvas2_distance, Line);
	if (iUnitValFFT==4)	iCan.getContext('2d').fillText(grid1_dBu[0], canvas2_distance, Line);
	if (iUnitValFFT==5)	iCan.getContext('2d').fillText(grid1_Pixel_Integer[0], canvas2_distance, Line);
  }
}
function draw_gridLine3(iCan,Line, indexNR,iUnitValFFT) {
	iCan.getContext('2d').moveTo(0,Line);
	iCan.getContext('2d').lineTo(iCan.width, Line);
	var distance=canvas2_text-(canvas2_distance*2);
	var iValue;
	if (iUnitValFFT==0)	iValue = arr_Pixel[indexNR];
	if (iUnitValFFT==1)	iValue = convertUnitVolt(arr_Pixel[indexNR]);
	if (iUnitValFFT==2)	iValue = convertUnitPercent(arr_Pixel[indexNR]);
	if (iUnitValFFT==3)	iValue = convertUnitdbFS(arr_Pixel[indexNR]);
	if (iUnitValFFT==4)	iValue = convertUnitdbu(arr_Pixel[indexNR]);
	if (iUnitValFFT==5)	iValue = convertUnitSample_Integer(arr_Pixel[indexNR], Math.pow(2,16));
	//  MWXScale, MWYScale;
	iValue = iValue/Math.pow(10,MWXScale);
	var ii= 1+  parseFloat(MWXScale);
	iValue = iValue.toFixed(ii);
 iCan.getContext('2d').fillText(iValue, distance, Line);
	}

function colorbars3(iC_ctx, max, vals, iPos, iLength, color, y) {
var pct, value, ii;
	iC_ctx.fillStyle = color;
	var offset= iPos  ; //MWColumn

	if (colorimetryVal ==0) {
		for(var i = iPos; i < iPos+iLength; i++) {
			// pct = (vals[i] / max*Math.pow(10,MWXScale)) * canvas2_hight * -1;
			pct = (vals[i]  / max*Math.pow(10,MWXScale)) * canvas1_hight * -1;
            pct +=canvas1_hight/2+canvas2_distance;
//			iC_ctx.fillRect(i-offset+canvas2_text, y, 1, Math.round(pct));
			iC_ctx.fillRect(i-offset+canvas2_text, Math.round(pct), 1, 1);
		}
	}
		if (colorimetryVal ==1) { //fehler
		for(var i = iPos; i < iPos+iLength; i++) {
			var	pct = vals[i];

			var ipct = Math.log(Math.abs(pct)+0.000000001);

			if (pct>=0)	{	
				ipct = (ipct / 96) * (canvas2_hight /2);
							//			pct = Math.pow(10, pct  );
				iC_ctx.fillRect(i-offset+canvas2_distance, y, 1, (ipct));
				}
			else {
				}
		}
	}
}



function ColorUnit(vals) {
	unitVal =vals;
    if (Flag_Wave_Display_Type=="Punkt") colorimetry3(colorimetryVal,iSYP,iSYL); 
	else colorimetry2(colorimetryVal,iSYP,iSYL*Wave_Count); 
}
function XScale(value) {
MWXScale=value;  
    if (Flag_Wave_Display_Type=="Punkt") colorimetry3(colorimetryVal,iSYP,iSYL); 
	else colorimetry2(colorimetryVal,iSYP,iSYL*Wave_Count); 

}
function Wave_Display_Typ() {
	    if (Flag_Wave_Display_Type=="Punkt") colorimetry3(colorimetryVal,iSYP,iSYL*Wave_Count); 
	else colorimetry2(colorimetryVal,iSYP,iSYL*Wave_Count); 
}


// wave 2----------------------------------------------------------
function measurementWave() {

	canvas2.width = (iSYL*Wave_Count ) + canvas2_distance + canvas2_text  ;
 	canvas2.height = (canvas2_hight+canvas2_distance)*3 +canvas2_distance;
	// draw Point
	MWColumn = parseFloat (document.getElementById("MWcolumn").value);

		colorimetry2(colorimetryVal,iSYP,iSYL*Wave_Count); 
}
 function colorimetry2(vals,iSYP,iiSYL) {
var val1, val2, val3;
	colorimetryVal =vals;

	cleargrid(canvas2);
	gridWaveform(canvas2);

	if (colorimetryVal ==0) {
		colorbars2(c2_ctx, 200/100, snapShot_bufferL, iSYP, iiSYL, colorBlue2,  (canvas2_hight/2+canvas2_distance)*1);
		colorbars2(c2_ctx, 200/100, snapShot_bufferR, iSYP, iiSYL, colorBlue,  (((canvas2_hight/4)*1)+canvas2_hight/2+canvas2_distance) *2);
		colorbars2(c2_ctx, 200/100, snapShot_bufferM, iSYP, iiSYL, colorWhite,  (((canvas2_hight*3/9)*1)+canvas2_hight/2+canvas2_distance) *3);

	 val1=snapShot_bufferL[iSYP+MWColumn].toFixed(2);
	 val2=snapShot_bufferR[iSYP+MWColumn].toFixed(2);
	 val3=snapShot_bufferM[iSYP+MWColumn].toFixed(2);
	
		}

	if (colorimetryVal ==1) {
		colorbars2(c2_ctx, 200/100, snapShot_bufferL, iSYP, iSYL, colorBlue2,  (canvas2_hight/2+canvas2_distance)*1);
		colorbars2(c2_ctx, 200/100, snapShot_bufferR, iSYP, iSYL, colorBlue,  (((canvas2_hight/4)*1)+canvas2_hight/2+canvas2_distance) *2);
		colorbars2(c2_ctx, 200/100, snapShot_bufferM, iSYP, iSYL, colorWhite,  (((canvas2_hight*3/9)*1)+canvas2_hight/2+canvas2_distance) *3);

	 val1=snapShot_bufferL[iSYP+MWColumn].toFixed(2);
	 val2=snapShot_bufferR[iSYP+MWColumn].toFixed(2);
	 val3=snapShot_bufferM[iSYP+MWColumn].toFixed(2);
	
	}

	canvas2.getContext('2d').fillStyle = 'red';
	canvas2.getContext('2d').font = fontShort;
	canvas2.getContext('2d').textBaseline = 'top';
	
     // Sample Real
	if (unitVal==0) { val1 = val1; }
	// Volt
	if (unitVal==1)	{ val1 = convertUnitVolt(val1);
					  val2 = convertUnitVolt(val2);
					  val3 = convertUnitVolt(val3)}
    //  Prozent
	if (unitVal==2)	{ val1 = convertUnitPercent(val1);
					  val2 = convertUnitPercent(val2);
					  val3 = convertUnitPercent(val3);}

     //dbFS
	if (unitVal==3) { 
					  val1 = convertUnitdbFS(val1);
					  val2 = convertUnitdbFS(val2);
					  val3 = convertUnitdbFS(val3); }
	
	
	// dbu
	if (unitVal==4) {  
					  val1 = convertUnitdbu(val1);
					  val2 = convertUnitdbu(val2);
					  val3 = convertUnitdbu(val3);}
		// Sample_Integer
	if (unitVal==5) { iMax=Math.pow(2,16);
						val1 =  convertUnitSample_Integer(val1,iMax);
					  val2 =  convertUnitSample_Integer(val2,iMax);
					  val3 =  convertUnitSample_Integer(val3,iMax);}	
   // 1000 ms / 48000 Hz)
 	var wtime= (1000/frameRate)*MWColumn;
	wtime= wtime.toFixed(2);
					  
	canvas2.getContext('2d').fillText(val1, canvas2_distance,(canvas2_hight*0)+(canvas2_distance*5)); 
	canvas2.getContext('2d').fillText(val2, canvas2_distance,(canvas2_hight*1)+(canvas2_distance*6)); 
	canvas2.getContext('2d').fillText(val3, canvas2_distance,(canvas2_hight*2)+(canvas2_distance*7)); 

	canvas2.getContext('2d').fillText(wtime, canvas2_text*1.5,(canvas2_hight*3)+(canvas2_distance*3)); 
	canvas2.getContext('2d').fillText("ms", canvas2_text*2,(canvas2_hight*3)+(canvas2_distance*3)); 

	draw_MeasLine(canvas2,canvas2_hight*1 + canvas2_distance*1,canvas2_hight, MWColumn+canvas2_text);
	draw_MeasLine(canvas2,canvas2_hight*2 + canvas2_distance*2,canvas2_hight, MWColumn+canvas2_text);
	draw_MeasLine(canvas2,canvas2_hight*3 + canvas2_distance*3,canvas2_hight, MWColumn+canvas2_text);

}  
  

function gridWaveform(iCan) {   
	var colorGrid="rgb(100,100,0)";
	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="1";
	iCan.getContext('2d').strokeStyle=colorGrid; // white path
	iCan.getContext('2d').fillStyle = colorGrid;
	iCan.getContext('2d').font = fontShort;
	iCan.getContext('2d').textBaseline = 'top';
	
	draw_gridHeader(iCan,canvas2_hight*0 + canvas2_distance*0,0,unitVal);
	draw_gridLine(iCan,canvas2_hight*0 + canvas2_distance*1,1,unitVal);
	draw_gridLine(iCan,canvas2_hight*0 + canvas2_distance*1 +((canvas2_hight-65)/(canvas2_hight/canvas2_hight)),2,unitVal);
	draw_gridLine(iCan,canvas2_hight*0 + canvas2_distance*1 +((canvas2_hight-50)/(canvas2_hight/canvas2_hight)),7,unitVal);
	draw_gridLine(iCan,canvas2_hight*0 + canvas2_distance*1 +((canvas2_hight-35)/(canvas2_hight/canvas2_hight)),12,unitVal);
	draw_gridLine(iCan,canvas2_hight*1 + canvas2_distance*1,13,unitVal);

	draw_gridHeader(iCan,canvas2_hight*1 + canvas2_distance*1,1,unitVal);
	draw_gridLine(iCan,canvas2_hight*1 + canvas2_distance*2,1,unitVal);
	draw_gridLine(iCan,canvas2_hight*1 + canvas2_distance*2 +((canvas2_hight-65)/(canvas2_hight/canvas2_hight)),2,unitVal);
	draw_gridLine(iCan,canvas2_hight*1 + canvas2_distance*2 +((canvas2_hight-50)/(canvas2_hight/canvas2_hight)),7,unitVal);
	draw_gridLine(iCan,canvas2_hight*1 + canvas2_distance*2 +((canvas2_hight-35)/(canvas2_hight/canvas2_hight)),12,unitVal);
	draw_gridLine(iCan,canvas2_hight*2 + canvas2_distance*2,13,unitVal);
	
	draw_gridHeader(iCan,canvas2_hight*2 + canvas2_distance*2,2,unitVal);
	draw_gridLine(iCan,canvas2_hight*2 + canvas2_distance*3,1,unitVal);
	draw_gridLine(iCan,canvas2_hight*2 + canvas2_distance*3 +((canvas2_hight-65)/(canvas2_hight/canvas2_hight)),2,unitVal);
	draw_gridLine(iCan,canvas2_hight*2 + canvas2_distance*3 +((canvas2_hight-50)/(canvas2_hight/canvas2_hight)),7,unitVal);
	draw_gridLine(iCan,canvas2_hight*2 + canvas2_distance*3 +((canvas2_hight-35)/(canvas2_hight/canvas2_hight)),12,unitVal);
	draw_gridLine(iCan,canvas2_hight*3 + canvas2_distance*3,13,unitVal);
	
	iCan.getContext('2d').stroke(); // Draw it
}
function draw_gridHeader(iCan, Line, indexNR,iUnitValFFT) {
iCan.getContext('2d').fillText(grid_HeaderAudio[indexNR], iCan.width/2, Line);
if (Line==0){
	if (iUnitValFFT==0)	iCan.getContext('2d').fillText(grid1_Pixel[0], canvas2_distance, Line);
	if (iUnitValFFT==1)	iCan.getContext('2d').fillText(grid1_Volt[0], canvas2_distance, Line);
	if (iUnitValFFT==2)	iCan.getContext('2d').fillText(grid1_Percent[0], canvas2_distance, Line);
	if (iUnitValFFT==3)	iCan.getContext('2d').fillText(grid1_dBFS[0], canvas2_distance, Line);
	if (iUnitValFFT==4)	iCan.getContext('2d').fillText(grid1_dBu[0], canvas2_distance, Line);
	if (iUnitValFFT==5)	iCan.getContext('2d').fillText(grid1_Pixel_Integer[0], canvas2_distance, Line);
  }
}
function draw_gridLine(iCan,Line, indexNR,iUnitValFFT) {
	iCan.getContext('2d').moveTo(0,Line);
	iCan.getContext('2d').lineTo(iCan.width, Line);
	var distance=canvas2_text-(canvas2_distance*2);
	var iValue;
	if (iUnitValFFT==0)	iValue = arr_Pixel[indexNR];
	if (iUnitValFFT==1)	iValue = convertUnitVolt(arr_Pixel[indexNR]);
	if (iUnitValFFT==2)	iValue = convertUnitPercent(arr_Pixel[indexNR]);
	if (iUnitValFFT==3)	iValue = convertUnitdbFS(arr_Pixel[indexNR]);
	if (iUnitValFFT==4)	iValue = convertUnitdbu(arr_Pixel[indexNR]);
	if (iUnitValFFT==5)	iValue = convertUnitSample_Integer(arr_Pixel[indexNR], Math.pow(2,16));
	//  MWXScale, MWYScale;
	iValue = iValue/Math.pow(10,MWXScale);
	var ii= 1+  parseFloat(MWXScale);
	iValue = iValue.toFixed(ii);
 iCan.getContext('2d').fillText(iValue, distance, Line);
	}

function colorbars2(iC_ctx, max, vals, iPos, iLength, color, y) {
var pct, value, ii;
	iC_ctx.fillStyle = color;
	var offset= iPos  ; //MWColumn

	if (colorimetryVal ==0) {
		for(var i = iPos; i < iPos+iLength; i++) {
			pct = (vals[i] / max*Math.pow(10,MWXScale)) * canvas2_hight * -1;
			iC_ctx.fillRect(i-offset+canvas2_text, y, 1, Math.round(pct));
		}
	}
		if (colorimetryVal ==1) { //fehler
		for(var i = iPos; i < iPos+iLength; i++) {
			var	pct = vals[i];

			var ipct = Math.log(Math.abs(pct)+0.000000001);

			if (pct>=0)	{	
				ipct = (ipct / 96) * (canvas2_hight /2);
							//			pct = Math.pow(10, pct  );
				iC_ctx.fillRect(i-offset+canvas2_distance, y, 1, (ipct));
				}
			else {
				}
		}
	}
}




//-----------------------------------wave Meas
function draw_MeasLine(iCan,YLine,iMhight,  XVal) {

	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="2";
	iCan.getContext('2d').strokeStyle="red"; // red path

	iCan.getContext('2d').moveTo(XVal, YLine);
	iCan.getContext('2d').lineTo(XVal, YLine-iMhight);
	iCan.getContext('2d').stroke(); // Draw it

}
//------------------------Histogram 
function HisLoop(FlagSnapShot) {
 log('visual done');
   
var	myButton = document.getElementById('IDHisLoop');
	if (visual_loopHis==false) {
		log('His loop ');
		visual_loopHis=true;
		clearInterval(intervalId3);
        intervalId3 = setInterval(take_snapshot_measurement_his, parseInt(AnalyseBufferlength*1000/frameRate),FlagSnapShot );

		all_Button(" on", 1.0, myButton, button_normal);
		}
	else {
		log('visual ');
		visual_loopHis=false;
		clearInterval(intervalId3);
		all_Button("off", 0.7, myButton,button_on );
		}
}
function take_snapshot_measurement_his(FlagSnapShot) {
	if (FlagSnapShot=="yesSnapShot") snapshot(SnapBuffer);
    measurementHis ();
}
function measurementHis() {

	canvas4.width = (canvas2_hight*2 ) + canvas2_distance + canvas2_text  ;
 	canvas4.height = (canvas2_hight+canvas2_distance)*3 +canvas2_distance;

	 MHColumn = parseFloat (document.getElementById("MHcolumn").value);
 // Math
		clear_array (histogram_m);
	    clear_array (histogram_r);
		clear_array (histogram_l);
			//  Canvas	bearbeiten von iSYP, bid iSYL
        for(var i = iSYP; i < iSYP+iSYL; i++) {

           var left = Math.round((snapShot_bufferL[i]*100)+100);
           var right = Math.round((snapShot_bufferR[i]*100)+100);
		   var mono = Math.round((left+right)/2);
 
			// histogramm
			histogram_m[mono]++;
			histogram_r[right]++;
			histogram_l[left]++;
		}

		var max_histogram_m = Math.max.apply(null, histogram_m);
		var max_histogram_r = Math.max.apply(null, histogram_r);
		var max_histogram_l = Math.max.apply(null, histogram_l);
	
		
  //Draw
		colorimetryHis(colorimetryVal,iSYP,iSYL,max_histogram_l,max_histogram_r,max_histogram_m); 			
}

function colorimetryHis(vals,iSYP,iSYL,iMax_histogram_l,iMax_histogram_r,iMax_histogram_m) {
var val1, val2, val3;
	colorimetryVal =vals;

	cleargrid(canvas4);
	gridHisform(canvas4,iMax_histogram_l,iMax_histogram_r,iMax_histogram_m);

	if (colorimetryVal ==0) {
		colorbars2His(c4_ctx, iMax_histogram_l, histogram_l, 0, histogram_l.length, colorGreen2,  (canvas2_hight+canvas2_distance)*1);
		colorbars2His(c4_ctx, iMax_histogram_r, histogram_r, 0, histogram_l.length, colorBlue,  (canvas2_hight+canvas2_distance) *2);
		colorbars2His(c4_ctx, iMax_histogram_m, histogram_m, 0, histogram_l.length, colorWhite,  (canvas2_hight+canvas2_distance) *3);

	 val1=histogram_l[MHColumn].toFixed(2);
	 val2=histogram_r[MHColumn].toFixed(2);
	 val3=histogram_m[MHColumn].toFixed(2);
	
		}

	if (colorimetryVal ==1) {
		colorbars2His(c4_ctx, iMax_histogram_l, histogram_l, iSYP, iSYL, colorGreen2,  (canvas2_hight+canvas2_distance)*1);
		colorbars2His(c4_ctx, iMax_histogram_r, histogram_r, iSYP, iSYL, colorBlue,  (canvas2_hight+canvas2_distance) *2);
		colorbars2His(c4_ctx, iMax_histogram_m, histogram_m, iSYP, iSYL, colorWhite,  (canvas2_hight+canvas2_distance) *3);
	 val1=histogram_l[MHColumn].toFixed(2);
	 val2=histogram_r[MHColumn].toFixed(2);
	 val3=histogram_m[MHColumn].toFixed(2);
	}

	canvas4.getContext('2d').fillStyle = colorRed2;
	canvas4.getContext('2d').font = fontShort;
	canvas4.getContext('2d').textBaseline = 'top';

	var hvalue= (MHColumn-canvas2_hight) /canvas2_hight;	
     // Sample Real
	if (unitValHis==0) { 	hvalue= hvalue.toFixed(2);; }
	// Volt
	if (unitValHis==1)	{ 
					  hvalue = convertUnitVolt(hvalue)}
    //  Prozent
	if (unitValHis==2)	{ 
					  hvalue = convertUnitPercent(hvalue);}

     //dbFS
	if (unitValHis==3) { 

					  hvalue = convertUnitdbFS(hvalue); }
	
	// dbu
	if (unitValHis==4) {  
					  hvalue = convertUnitdbu(hvalue);}
		// Sample_Integer
	if (unitValHis==5) { iMax=Math.pow(2,16);
					  hvalue =  convertUnitSample_Integer(hvalue,iMax);}	

					  // Histogram-Waveamplitude
 	canvas4.getContext('2d').fillText(val1, canvas2_distance,(canvas2_hight*0)+(canvas2_distance*5)); 
	canvas4.getContext('2d').fillText(val2, canvas2_distance,(canvas2_hight*1)+(canvas2_distance*6)); 
	canvas4.getContext('2d').fillText(val3, canvas2_distance,(canvas2_hight*2)+(canvas2_distance*7)); 

	canvas4.getContext('2d').fillText(hvalue,      canvas4.width*0.5-canvas2_text*0.5,(canvas2_hight*3)+(canvas2_distance*3)); 
	if (unitValHis==0)	canvas4.getContext('2d').fillText(grid1_Pixel[0],canvas4.width*0.6-canvas2_text*0.5,(canvas2_hight*3)+(canvas2_distance*3));
	if (unitValHis==1)	canvas4.getContext('2d').fillText(grid1_Volt[0], canvas4.width*0.6-canvas2_text*0.5,(canvas2_hight*3)+(canvas2_distance*3));
	if (unitValHis==2)	canvas4.getContext('2d').fillText(grid1_Percent[0], canvas4.width*0.6-canvas2_text*0.5,(canvas2_hight*3)+(canvas2_distance*3));
	if (unitValHis==3)	canvas4.getContext('2d').fillText(grid1_dBFS[0], canvas4.width*0.6-canvas2_text*0.5,(canvas2_hight*3)+(canvas2_distance*3));
	if (unitValHis==4)	canvas4.getContext('2d').fillText(grid1_dBu[0],canvas4.width*0.6-canvas2_text*0.5,(canvas2_hight*3)+(canvas2_distance*3));
	if (unitValHis==5)	canvas4.getContext('2d').fillText(grid1_Pixel_Integer[0],  canvas4.width*0.6-canvas2_text*0.5,(canvas2_hight*3)+(canvas2_distance*3));
 
	draw_MeasLine(canvas4,canvas2_hight*1 + canvas2_distance*1,canvas2_hight, MHColumn+canvas2_text);
	draw_MeasLine(canvas4,canvas2_hight*2 + canvas2_distance*2,canvas2_hight, MHColumn+canvas2_text);
	draw_MeasLine(canvas4,canvas2_hight*3 + canvas2_distance*3,canvas2_hight, MHColumn+canvas2_text);

}

function gridHisform(iCan,iMax_histogram_l,iMax_histogram_r,iMax_histogram_m) {   
	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="1";
	iCan.getContext('2d').strokeStyle=colorGrid2; // white path
	iCan.getContext('2d').fillStyle = colorGrid2
	iCan.getContext('2d').font = fontShort;
	iCan.getContext('2d').textBaseline = 'top';
	
	draw_gridHeaderHis(iCan,canvas2_hight*0 + canvas2_distance*0,0,unitValHis,iMax_histogram_l);
	draw_gridLineHis(iCan,canvas2_hight*0 + canvas2_distance*1,1,unitValHis,iMax_histogram_l*1);
	draw_gridLineHis(iCan,canvas2_hight*0 + canvas2_distance*1 +((canvas2_hight-75)/(canvas2_hight/canvas2_hight)),2,unitValHis,iMax_histogram_l*0.75);
	draw_gridLineHis(iCan,canvas2_hight*0 + canvas2_distance*1 +((canvas2_hight-50)/(canvas2_hight/canvas2_hight)),7,unitValHis,iMax_histogram_l*0.5);
	draw_gridLineHis(iCan,canvas2_hight*0 + canvas2_distance*1 +((canvas2_hight-25)/(canvas2_hight/canvas2_hight)),12,unitValHis,iMax_histogram_l*0.25);
	draw_gridLineHis(iCan,canvas2_hight*1 + canvas2_distance*1,13,unitValHis,iMax_histogram_l*0);

	draw_gridHeaderHis(iCan,canvas2_hight*1 + canvas2_distance*1,1,unitValHis,iMax_histogram_r);
	draw_gridLineHis(iCan,canvas2_hight*1 + canvas2_distance*2,1,unitValHis,iMax_histogram_r*1);
	draw_gridLineHis(iCan,canvas2_hight*1 + canvas2_distance*2 +((canvas2_hight-75)/(canvas2_hight/canvas2_hight)),2,unitValHis,iMax_histogram_r*0.75);
	draw_gridLineHis(iCan,canvas2_hight*1 + canvas2_distance*2 +((canvas2_hight-50)/(canvas2_hight/canvas2_hight)),7,unitValHis,iMax_histogram_r*0.5);
	draw_gridLineHis(iCan,canvas2_hight*1 + canvas2_distance*2 +((canvas2_hight-25)/(canvas2_hight/canvas2_hight)),12,unitValHis,iMax_histogram_r*0.25);
	draw_gridLineHis(iCan,canvas2_hight*2 + canvas2_distance*2,13,unitValHis,iMax_histogram_r*0);
	
	draw_gridHeaderHis(iCan,canvas2_hight*2 + canvas2_distance*2,2,unitValHis,iMax_histogram_m);
	draw_gridLineHis(iCan,canvas2_hight*2 + canvas2_distance*3,1,unitValHis,iMax_histogram_m*1);
	draw_gridLineHis(iCan,canvas2_hight*2 + canvas2_distance*3 +((canvas2_hight-75)/(canvas2_hight/canvas2_hight)),2,unitValHis,iMax_histogram_m*0.75);
	draw_gridLineHis(iCan,canvas2_hight*2 + canvas2_distance*3 +((canvas2_hight-50)/(canvas2_hight/canvas2_hight)),7,unitValHis,iMax_histogram_m*0.5);
	draw_gridLineHis(iCan,canvas2_hight*2 + canvas2_distance*3 +((canvas2_hight-25)/(canvas2_hight/canvas2_hight)),12,unitValHis,iMax_histogram_m*0.25);
	draw_gridLineHis(iCan,canvas2_hight*3 + canvas2_distance*3,13,unitValHis,iMax_histogram_m*0);
	
	iCan.getContext('2d').stroke(); // Draw it
}

function draw_gridHeaderHis(iCan, Line, indexNR,iUnitValFFT,iMax_histogram) {
	iCan.getContext('2d').fillText(grid_HeaderAudio[indexNR],  iCan.width/2, Line);
	if (Line==0){	
		iCan.getContext('2d').fillText("number of value", canvas2_distance, Line);
	}
}

function draw_gridLineHis(iCan,Line, indexNR,iUnitValFFT,iMax_histogram) {
	iCan.getContext('2d').moveTo(0,Line);
	iCan.getContext('2d').lineTo(iCan.width, Line);
	var distance=canvas2_text-(canvas2_distance*2);
	iCan.getContext('2d').fillText(iMax_histogram, distance, Line);

	}


function ColorUnitHis(vals) {
	unitValHis =vals;
	measurementHis();
}


function colorbars2His(iC_ctx, max, vals, iPos, iLength, color, y) {
var pct, value, ii;
	iC_ctx.fillStyle = color;
	var offset= iPos  ; //MWColumn

	if (colorimetryVal ==0) {
		for(var i = iPos; i < iPos+iLength; i++) {
			pct = (vals[i] / max*Math.pow(10,MHXScale)) * canvas2_hight * -1;
			iC_ctx.fillRect(i-offset+canvas2_text, y, 1, Math.round(pct));
		}
	}
		if (colorimetryVal ==1) { //fehler
		for(var i = iPos; i < iPos+iLength; i++) {
			var	pct = vals[i];

			var ipct = Math.log(Math.abs(pct)+0.000000001);

			if (pct>=0)	{	
				ipct = (ipct / 96) * (canvas2_hight /2);
							//			pct = Math.pow(10, pct  );
				iC_ctx.fillRect(i-offset+canvas2_distance, y, 1, (ipct));
				}
			else {
				}
		}
	}
}
function HXScale(value) {
MHXScale=value;  
measurementHis();
}
//--------------------------fft

//-------------------------Measurement FFT ---------------------------------  
//-------------------------Measurement FFT -----------
 function FFTLoop(FlagSnapShot){
	 
 var	myButton = document.getElementById('fftLoop');
  if (fftLoopStatus != true) {
	 fftLoopStatus = true;
	all_Button("on", 0.7, myButton, button_normal);
	clearInterval(intervalId3);
     intervalId3 = setInterval(take_snapshot_measurement_FFT, parseInt(AnalyseBufferlength*1000/frameRate),FlagSnapShot);

	 	measurementFFT();
	 }
  else  {
	fftLoopStatus = false;
	 all_Button("off", 1.0, myButton, button_on);	
clearInterval(intervalId3);
	}
}

function take_snapshot_measurement_FFT(FlagSnapShot) {
	
	if (FlagSnapShot=="yesSnapShot") snapshot(SnapBuffer);
    measurementFFT ();
}
function measurementFFT()  {
	//console.log("measurementFFT");
    if (!analyserContext) {
        canvas3 = document.getElementById("analyserCanvas");
		canvas3.width = (AnalyseBufferlength/2 ) + canvas2_distance + canvas2_text  ;
		canvas3.height = (canvas3_hight+canvas2_distance) +canvas2_distance;
        canvasWidth = canvas3.width;
        canvasHeight = canvas3.height;
        analyserContext = canvas3.getContext('2d');
    freqByteData2 = new Float32Array(analyserNode.frequencyBinCount); // AnalyseBufferlength/2
     }

    // analyzer draw code here

 	analyserNode.getFloatFrequencyData(freqByteData2); 
	drawMeasurFFT(freqByteData2);
  
	if (fftLoopStatus == true) {    
	//	rafID = window.requestAnimationFrame( measurementFFT );
	}
}
function drawMeasurFFT(iFreqByteData) {
	 //	console.log("ok");
		cleargrid(canvas3);
		gridFFT(canvas3);

        analyserContext.fillStyle = '#F6D565';
        analyserContext.lineCap = 'round';
        analyserContext.fillStyle = colorWhite;
		

		var MaxMagnitude = -fftMagnitudeMax;
			MaxMagnitude = MaxMagnitude + parseFloat(fftMagnitudeMax)+parseFloat(canvas3_hight-canvas3_hight/2);
			MaxMagnitude*=parseFloat(-canvas3_hight/fftMagnitudeMin);

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < iFreqByteData.length; ++i) {
            var magnitude = (iFreqByteData[i]) 
			if (magnitude <= parseFloat(fftMagnitudeMin)) magnitude=parseFloat(fftMagnitudeMin);
			magnitude = magnitude + parseFloat(fftMagnitudeMax)+parseFloat(canvas3_hight-canvas3_hight/2);
 			magnitude*=parseFloat(-canvas3_hight/fftMagnitudeMin);
			magnitude-=MaxMagnitude-canvas3_hight;
			magnitude=magnitude.toFixed(2);
			analyserContext.fillRect(i +canvas2_text, canvas3_hight+canvas2_distance, 1, -magnitude);
          
		} 
	 	MFColumn = parseFloat (document.getElementById("MFcolumn").value);
		var val1=iFreqByteData[MFColumn];
	 	val1 = val1  + parseFloat(fftMagnitudeMax);
		val1=val1.toFixed(2);

	analyserContext.fillStyle = colorRed2;
	analyserContext.font = fontShort;
	analyserContext.textBaseline = 'top';
	
     // Sample Real
	if (unitValFFT==0) { val1 = pegel(val1); }
	// Volt
	if (unitValFFT==1)	{val1 = pegel(val1); 
						 val1 = convertUnitVolt(val1);}
    //  Prozent
	if (unitValFFT==2)	{ val1 = pegel(val1); 
						 val1 = convertUnitPercent(val1);}
     //dbFS
	if (unitValFFT==3) { val1 = val1; }	  	
	// dbu
	if (unitValFFT==4) { val1 = pegel(val1);  
						 val1 = convertUnitdbu(val1);}  
		// Sample_Integer
	if (unitValFFT==5) { var iMax=Math.pow(2,16);
						 val1 = pegel(val1); 
						 val1 =  convertUnitSample_Integer(val1,iMax);}

 	var frequenz= frameRate/analyserNode.fftSize*MFColumn; // frequenz= samplingrate/fftsize*index (44100/2038*2=43 hz)
	frequenz= frequenz.toFixed(2);

	analyserContext.fillText(val1, canvas2_distance,(canvas3_hight*0.45)+(canvas2_distance*0.45)); 
	analyserContext.fillText(frequenz, canvas2_text*1.5,(canvas3_hight*1)+(canvas2_distance*1)); 
	analyserContext.fillText("Hz", canvas2_text*2,(canvas3_hight*1)+(canvas2_distance*1)); 
	draw_MeasLine(canvas3,canvas3_hight*1 + canvas2_distance*1,canvas3_hight,MFColumn+canvas2_text);
	
	}


function gridFFT(iCan) {   
	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="1";
	iCan.getContext('2d').strokeStyle=colorGrid2; // white path
	iCan.getContext('2d').fillStyle = colorGrid2;
	iCan.getContext('2d').font = fontShort;
	iCan.getContext('2d').textBaseline = 'top';

	draw_gridHeaderFFT(iCan,canvas3_hight*0 + canvas2_distance*0,2,unitValFFT);
	draw_gridLineFFT(iCan,canvas3_hight*0 + canvas2_distance*1,1,unitValFFT);
	draw_gridLineFFT(iCan,canvas3_hight*0 + canvas2_distance*1 +((canvas3_hight-233)/(canvas3_hight/canvas3_hight)),2,unitValFFT); //-9dbFS
	draw_gridLineFFT(iCan,canvas3_hight*0 + canvas2_distance*1 +((canvas3_hight-196)/(canvas3_hight/canvas3_hight)),3,unitValFFT);  //-23dbFS
	draw_gridLineFFT(iCan,canvas3_hight*0 + canvas2_distance*1 +((canvas3_hight-124)/(canvas3_hight/canvas3_hight)),4,unitValFFT);  //-50dbFS
	draw_gridLineFFT(iCan,canvas3_hight*0 + canvas2_distance*1 +((canvas3_hight-70)/(canvas3_hight/canvas3_hight)),5,unitValFFT);  //-70dbFS
	draw_gridLineFFT(iCan,canvas3_hight*0 + canvas2_distance*1 +((canvas3_hight-27)/(canvas3_hight/canvas3_hight)),6,unitValFFT);  //-96dbFS
	draw_gridLineFFT(iCan,canvas3_hight*1 + canvas2_distance*1,7,unitValFFT);   //-120dbFS

 
	iCan.getContext('2d').stroke(); // Draw it
}


function draw_gridLineFFT(iCan,Line, indexNR,iUnitValFFT) {
	iCan.getContext('2d').moveTo(0,Line);
	iCan.getContext('2d').lineTo(iCan.width, Line);
	var distance=canvas2_text-(canvas2_distance*2);
	var iValue;
	if (iUnitValFFT==0)	iValue = arr_Pixel[indexNR];
	if (iUnitValFFT==1)	iValue = convertUnitVolt(arr_Pixel[indexNR]);
	if (iUnitValFFT==2)	iValue = convertUnitPercent(arr_Pixel[indexNR]);
	if (iUnitValFFT==3)	iValue = convertUnitdbFS(arr_Pixel[indexNR]);
	if (iUnitValFFT==4)	iValue = convertUnitdbu(arr_Pixel[indexNR]);
	if (iUnitValFFT==5)	iValue = convertUnitSample_Integer(arr_Pixel[indexNR], Math.pow(2,16));
	//  MWXScale, MWYScale;
	iValue = iValue/Math.pow(10,MFXScale);
	var ii= 1+  parseFloat(MFXScale);
	iValue = iValue.toFixed(ii);
 iCan.getContext('2d').fillText(iValue, distance, Line);
	}  
	
	function ColorUnitFFT(vals) {
	unitValFFT =vals;
	measurementFFT();
}

function FXScale(value) {
MFXScale=value;  
measurementFFT();
}  

function draw_gridHeaderFFT(iCan, Line, indexNR,iUnitValFFT) {
/*	iCan.getContext('2d').fillStyle = colorGreen2;
iCan.getContext('2d').fillText(grid_HeaderAudio[indexNR], canvas2_text*2, Line);
	iCan.getContext('2d').fillStyle = colorBlue;
iCan.getContext('2d').fillText(grid_HeaderAudio[indexNR+1], canvas2_text*4, Line);
*/
	iCan.getContext('2d').fillStyle = colorWhite;
iCan.getContext('2d').fillText(grid_HeaderAudio[indexNR], canvas2_text*2  , Line);
	iCan.getContext('2d').fillStyle = colorGrid;
if (Line==0){
	if (iUnitValFFT==0)	iCan.getContext('2d').fillText(grid1_Pixel[0], canvas2_distance, Line);
	if (iUnitValFFT==1)	iCan.getContext('2d').fillText(grid1_Volt[0], canvas2_distance, Line);
	if (iUnitValFFT==2)	iCan.getContext('2d').fillText(grid1_Percent[0], canvas2_distance, Line);
	if (iUnitValFFT==3)	iCan.getContext('2d').fillText(grid1_dBFS[0], canvas2_distance, Line);
	if (iUnitValFFT==4)	iCan.getContext('2d').fillText(grid1_dBu[0], canvas2_distance, Line);
	if (iUnitValFFT==5)	iCan.getContext('2d').fillText(grid1_Pixel_Integer[0], canvas2_distance, Line);
  }
}
// ----------------------------web gl
var initWebGL_Flag=false;
 
function initWebGL(){

	
	var	myButton = document.getElementById('FFT_WebGL');
	if (myButton.value=="Web-GL-3D: off") {
	//	log('visual loop LouLoopButton');

		if (initWebGL_Flag==false) {
			initVisualizer(w,-2,0,0,-30,30,40); // block, y-offset, Grid-offset,x,y,z, Zoom
			initWebGL_Flag=true;
		} 
	all_Button("Web-GL-3D: on", 0.7, myButton, button_normal);
		}
	else {
	//	log('visual LouLoopButton');
      initWebGL_Flag=false;
		all_Button("Web-GL-3D: off", 1.0, myButton, button_on);
		}
 columnFFT  =  parseFloat(document.getElementById("MFcolumn").value)   ;
columnFFT =columnFFT;
var FarbeMeasurID=scene.children[columnFFT];
		  FarbeMeasurID.material.color.r=200;
		  FarbeMeasurID.material.color.g=0;
		  FarbeMeasurID.material.color.b=0;
	//	  copyFFTArrayWebGLDirect(freqByteData ) 	; 

}

function StoreMeasurmentWeb_GL(FlagSpapShot) {
		 //	console.log("ok2");
    var icolumn=parseInt(document.getElementById("MFcolumn").value)  ;

if(FlagSpapShot=="yesSnapShot"){
	clearInterval(intervalId3);
     intervalId3 = setInterval(take_snapshot_measurement_FFT, parseInt(AnalyseBufferlength*1000/frameRate),FlagSpapShot);
}
			StoreMeasurmentWeb_GL2(icolumn);

}  
function StoreMeasurmentWeb_GL2(icolumn) {
var	myButton = document.getElementById('FFT_WebGL');
if (myButton!=undefined){
	if (myButton.value=="Web-GL-3D: on") {
	// 	console.log("ok");
		//	 var a_zeile=altMeasurementColour[0];
				var a_column=altMeasurementColour[1];
			 var FarbeMeasurID=scene.children[a_column];
			  FarbeMeasurID.material.color.r=altMeasurementColour[2];
			  FarbeMeasurID.material.color.g=altMeasurementColour[3];
			  FarbeMeasurID.material.color.b=altMeasurementColour[4];
	 
	 
			 document.getElementById("MFcolumn").value  = icolumn;
		 
			   
			  FarbeMeasurID=scene.children[icolumn]; //
		//	  altMeasurementColour[0]=izeile;

			  altMeasurementColour[2]=FarbeMeasurID.material.color.r;
			  altMeasurementColour[3]=FarbeMeasurID.material.color.g;
			  altMeasurementColour[4]=FarbeMeasurID.material.color.b;

			  FarbeMeasurID.material.color.r =200;
			  FarbeMeasurID.material.color.g =0;
			  FarbeMeasurID.material.color.b =0;
	}  
}
		  altMeasurementColour[1]=icolumn;  
		  	 measurementFFT ();
if (myButton!=undefined){
	
		copyFFTArrayWebGLDirect(freqByteData ) 	; 
   }
}
//-------Loudness---------------------------------------------

function audioProcessLou(event) {  
    var iAmplitude;
	var G= 1;    //Kanal-Gewichtung
    LU_Value =0;
	// console.log("audioProcessLou");
//  console.log(event);
//	var channelIn_r  = event.inputBuffer.getChannelData(1);
//	var channelIn_l  = event.inputBuffer.getChannelData(0);

      // loop through every sample and add sample values to out buffer
     for(i = 0; i < event.length-1; i++) {
   //     Loudness_bufferL[i] = channelIn_l[i];
    //    Loudness_bufferR[i] = channelIn_r[i];
 		   iAmplitude = event[i];
		   	iAmplitude = G * iAmplitude;
           LU_Value +=iAmplitude * iAmplitude;
     }
	 LU_Array[iLU] =LU_Value;
// measurementLou();
}
function LouTake() {
//drawInitLU();  
//visual_loopLou=true;

measurementLou2() 
//console.log(iLU);
iLU++ ;
}
function LouLoop() { 
 log('visual done');

var	myButton = document.getElementById('LouLoopButton');
	if (visual_loopLou==false) {
		log('visual loop LouLoopButton');
		visual_loopLou=true;
		clearInterval(intervalId4);
        intervalId4 = setInterval(take_snapshot_measurement_Lou, parseInt(AnalyseBufferlength*1000/frameRate));

		all_Button(" on", 1.0, myButton,button_normal );
		}
	else {
		log('visual LouLoopButton');
		visual_loopLou=false;
		clearInterval(intervalId4);
		all_Button("off", 0.7, myButton,button_on );
		}
}
function take_snapshot_measurement_Lou() {
// console.log("LOULoop");
    measurementLou ();
		if(iLU-4<canvas5.width - canvas2_text)iLU++;
		else {iLU=4;
		drawInitLU();
		}
}
function measurementLou() {
 
var LouColumn = parseFloat(document.getElementById('MLcolumn').value);
if (LouColumn > iLU) { LouColumn=iLU;
(document.getElementById('MLcolumn').value=iLU)
} 
var	myButtonVal = document.getElementById('LouLoopButton').value;
var iVal;
if (myButtonVal==" on") iVal=iLU;
else iVal=LouColumn;
bufferControl( iVal);
}
function measurementLou2() {
var iVal;
if (iLU==undefined)drawInitLU();  
/*  var LouColumn = parseFloat(document.getElementById('MLcolumn').value);
if (LouColumn > iLU) { LouColumn=iLU;
(document.getElementById('MLcolumn').value=iLU)
} 
var	myButtonVal = document.getElementById('LouLoopButton').value;

if (myButtonVal==" on") iVal=iLU;
else iVal=LouColumn;
*/
bufferControl( iLU+1);
}
function  dbLU(wert) {	 
	 return  (10 * Math.log(wert+0.000001) / Math.log(10)); // - 0.691+    : -6dbFS
}
function  bufferControl(iIndex) {	 


		var zz=LU_Array[iIndex-0]+LU_Array[iIndex-1]	+LU_Array[iIndex-2] +LU_Array[iIndex-3]
	zz /= LU_Array.length*4;
//	log(bufferValueArray);
	LK = dbLU(zz); //
	showLU(LK,iIndex);
}
function  showLU(iWert,iIndex) {	 
		LUDisplay = document.getElementById('scale').value = iWert +23;	 // -23 dB = 0 LU
	//	log(iWert-0);
		drawLU(iIndex,(canvas2_distance-((iWert)*2)-5),iWert +23); //100-(37+23)*4-60=40-240=200: --60 bis 0 = 60

}
function drawInitLU(){
 	canvas5.width = 800 + canvas2_text ;
	canvas5.height = 120+(canvas2_distance*2) ;
	cleargrid(canvas5);
	gridLouform(canvas5,canvas5.width);// iMax_Lou_l,iMax_Lou_r,iMax_Lou_m
 
//	c5_ctx.fillStyle = "rgb(0,0,0)";
//	c5_ctx.fillRect(0, 0, canvas5.width, canvas5.height);
}
function drawLU(ii,iLine, iWert){ // -125 bis -5 bei 130
var canvas5_high = canvas5.height - canvas2_distance
//drawInitLU();
 	var wtime= 1/frameRate*AnalyseBufferlength  *ii;
	wtime= wtime.toFixed(2);
	iWert=iWert.toFixed(2)
	iLine=iLine.toFixed(0)
    c5_ctx.fillStyle = colorWhite;
	c5_ctx.fillRect( ii + canvas2_text , iLine, 1, 1);
clearArea(canvas5,canvas2_distance,canvas2_distance *6 ,canvas2_text-30,canvas2_distance)
clearArea(canvas5,canvas2_distance,canvas2_distance *11 ,canvas2_text-15,canvas2_distance)
clearArea(canvas5,canvas2_text-1,canvas5_high ,canvas5.width-canvas2_text,canvas2_distance)
	c5_ctx.fillStyle = colorRed2;
	c5_ctx.font = fontShort;  
	c5_ctx.textBaseline = 'top';
	
	c5_ctx.fillText(iWert, canvas2_distance,(canvas2_distance*6)); 
  
	c5_ctx.fillText(wtime, canvas2_distance*2,(canvas2_distance *11)); 
	c5_ctx.fillText("sec", canvas2_distance*5,(canvas2_distance *11)); 

	draw_MeasLine(canvas5,canvas5_high + canvas2_distance*1,canvas2_distance , ii +canvas2_text);
/*console.log (ii);
console.log (iLine);
console.log (iWert); 
*/ 
}   

function gridLouform(iCan,iMax_histogram_m) {   
	iCan.getContext('2d').beginPath();
	iCan.getContext('2d').lineWidth="1";
	iCan.getContext('2d').strokeStyle=colorGrid2; // white path
	iCan.getContext('2d').fillStyle = colorGrid2;
	iCan.getContext('2d').font = fontShort;
	iCan.getContext('2d').textBaseline = 'top';
//log("grid lou");
	draw_gridHeaderLou(iCan,0,2);
	draw_gridLineLou(iCan,canvas2_distance,1,"+20");
    draw_gridLineLou(iCan,(10*2)+canvas2_distance,1,"+10");
	draw_gridLineLou(iCan,(18*2)+canvas2_distance,1,"  ");
	draw_gridLineLou(iCan,(20*2)+canvas2_distance,1,"  0");
	draw_gridLineLou(iCan,(22*2)+canvas2_distance,1," ");
	draw_gridLineLou(iCan,120+canvas2_distance,1,"-40");
//	draw_gridLineLou(iCan,canvas2_hight*2 + canvas2_distance*3 +((canvas2_hight-65)/(canvas2_hight/canvas2_hight)),2,unitVal);
//	draw_gridLineLou(iCan,canvas2_hight*2 + canvas2_distance*3 +((canvas2_hight-50)/(canvas2_hight/canvas2_hight)),7,unitVal);
//	draw_gridLineLou(iCan,canvas2_hight*2 + canvas2_distance*3 +((canvas2_hight-35)/(canvas2_hight/canvas2_hight)),12,unitVal);
//	draw_gridLineLou(iCan,canvas2_hight*3 + canvas2_distance*3,13,unitVal);
	iCan.getContext('2d').stroke(); // Draw it
}


function draw_gridHeaderLou(iCan, Line, indexNR) {
	iCan.getContext('2d').fillText(grid_HeaderAudio[indexNR],  iCan.width/2, Line);
	if (Line==0){	
		iCan.getContext('2d').fillText("LU in dB", canvas2_distance, Line);
	}
}


	
function draw_gridLineLou(iCan,Line, indexNR,iText) {
	iCan.getContext('2d').moveTo(0,Line);
	iCan.getContext('2d').lineTo(iCan.width, Line);
	var distance=canvas2_text-(canvas2_distance*2);
//	iCan.getContext('2d').fillText(iMax_histogram, distance, Line);
	iCan.getContext('2d').fillText(iText, 20, Line);
	}

function clearArea(iCan,x,y,w,h) {
		iCan.getContext('2d').fillStyle = colorBlack;
		iCan.getContext('2d').fillRect(x, y, w, h);
}  

 