/**
 * Adds hiss into each channel.
 *
 * @class audioScriptProcessor
 * @extends AudioWorkletProcessor
 **/
var channel =2;
var AnalyseBufferlength_Worker=128;  
 var frameRate = 48000;
 var bufferCount=200*2;
var bufferlength=AnalyseBufferlength_Worker*bufferCount;

var W_SnapBuffer =new Object();
	W_SnapBuffer.l = new Float32Array(bufferlength);
	W_SnapBuffer.r = new Float32Array(bufferlength); 
var iBufferCount=0;

 class audioScriptProcessor extends AudioWorkletProcessor {
  _volumeM
  _input
  _output
  _updateIntervalInMS
  _nextUpdateFrame

	constructor() {
      super();
	  this._input =new Object();
	this._input.l = [];
	this._input.r = [];
	  this._output =new Object();
	this._output.l = [];
	this._output.r = [];
	
	this._volumeM = [0,0] ;
    this._updateIntervalInMS =AnalyseBufferlength_Worker/frameRate //2.66;//25
    this._nextUpdateFrame = this._updateIntervalInMS;
    this.port.onmessage = event => {
      if (event.data.updateIntervalInMS)
        this._updateIntervalInMS = event.data.updateIntervalInMS;
     }
    }
    
    static get parameterDescriptors() {
      return [
	   {
          name: "BufferSwitch",
          defaultValue: 0.0,
          minValue: 0, // off
          maxValue: 1    //On
        }
  /*      {
          name: "gain",
          defaultValue: 0.2,
          minValue: 0,
          maxValue: 1
        }
		*/
      ];
    }
  get intervalInFrames () {
    return this._updateIntervalInMS / 1000 * sampleRate;
  }   
    /**
     * Called by the browser's audio subsystem with
     * packets of audio data to be processed.
     *
     * @param[in] inputList    Array of inputs
     * @param[in] outputList   Array of outputs
     * @param[in] parameters   Parameters object
     *
     * `inputList` and `outputList` are each arrays of inputs
     * or outputs, each of which is in turn an array of `Float32Array`s,
     * each of which contains the audio data for one channel (left/right/etc)
     * for the current sample packet.
     *
     * `parameters` is an object containing the `AudioParam` values
     * for the current block of audio data.
     **/
         
    process(inputs, outputs, parameters) {
      const BufferSwitcherFlag = parameters.BufferSwitch[0];
 //console.log(BufferSwitcherFlag);
 
	    // The input list and output list are each arrays of
        // Float32Array objects, each of which contains the samples for one channel.

 
	this._input.l = inputs[0][channel-2]; ;
    this._input.r = inputs[0][channel-1]; ;
	this._output.l = outputs[0][channel-2]; ;
    this._output.r = outputs[0][channel-1]; ;
      // loop through every sample and add sample values to out buffer
/*  for(let i = 0; i < this._input.l.length; i++) {

	    
	     this._output.l[i] =0.5* 	this._input.l[i];
         this._output.r[i]= 0.05*	this._input.r[i];
  }				 
*/
if (BufferSwitcherFlag==0){ 
   W_processingAudioMeasurement(this._output, this._input);
    } else { 
    W_processingSnapShot(this._output, W_SnapBuffer);
    }
      // Update and sync the volume property with the main thread.
      this._nextUpdateFrame -= 	this._input.l.length;
      if (this._nextUpdateFrame < 0) {  
        this._nextUpdateFrame += this.intervalInFrames
        this.port.postMessage({output: this._output, input: this._input}); 
      }  

      // Return; let the system know we're still active
      // and ready to process audio.
      	   				
      return true;
    } 
  }
  
  registerProcessor("audioProcess", audioScriptProcessor);
  

   function W_processingAudioMeasurement(event_Out, event_In) {  
 // console.log(event_In); 
    W_readWebAudioObjekt(audArrayIn,event_In);
// console.log(event_In); 	
  //    setAmplitudeObjekt(audArray2, audArrayIn, 0.90)
  // measurementPegel(audArrayIn);    

    W_writeWebAudioObjekt(event_Out,audArrayIn);
   W_writeSnapBuffer(W_SnapBuffer,event_In);	
	// console.log(event_Out); 	
}
 function W_processingSnapShot(event_Out, event_In) {  
//  console.log(event_In); 
 //   W_readWebAudioObjekt(audArrayIn,event_In);
 	
    W_readSnapBuffer(audArrayIn,W_SnapBuffer);
    W_writeWebAudioObjekt(event_Out,audArrayIn);
   //W_writeSnapBuffer(W_SnapBuffer,event_In);	
	// console.log(event_Out); 	
}

//----------------------------
 var audArrayIn =new Object();
	audArrayIn.l = [];
	audArrayIn.r = [];
var audArray2 =new Object();
	audArray2.l = [];
	audArray2.r = [];
//--------
function W_readWebAudioObjekt(iOutput, iInput) { 
/*	 iOutput.l  = iInput.l; // Stereo: 0 = left channel, 1 = right channel 
	 iOutput.r  = iInput.r;
*/
	 for(let i = 0; i < iInput.l.length; i++) {   
	     iOutput.l[i] = iInput.l[i];
         iOutput.r[i] = iInput.r[i];
  }
  
}
 function W_writeWebAudioObjekt(iOutput,iInput) { 

      for(let i = 0; i < iInput.l.length; i++) {
        iOutput.l[i] =  iInput.l[i]
		iOutput.r[i] =  iInput.r[i]
      } 
}
function W_writeSnapBuffer(iSnapBuffer,iInput) { 
 let bufferOffset = iInput.l.length*(iBufferCount- 1);
      for(let i = 0; i < iInput.l.length; i++) {
        iSnapBuffer.l[i+bufferOffset] = iInput.l[i]
		iSnapBuffer.r[i+bufferOffset] = iInput.r[i]
      } 
	if(iBufferCount < bufferCount) iBufferCount+=1;
	else {
		iBufferCount = 0;
	//	 console.log(iSnapBuffer.r); 
		  }

}
function W_readSnapBuffer(iOutput,iSnapBuffer,) { 
 let bufferOffset = iOutput.l.length*(iBufferCount- 1);
      for(let i = 0; i < iOutput.l.length; i++) {
       iOutput.l[i]  = iSnapBuffer.l[i+bufferOffset] ;
	   iOutput.r[i]  = iSnapBuffer.r[i+bufferOffset];
      } 
	if(iBufferCount < bufferCount) iBufferCount+=1;
	else {
		iBufferCount = 1;
	//	 console.log(iSnapBuffer.r); 
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
   
	