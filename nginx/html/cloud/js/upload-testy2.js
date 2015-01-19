"use strict";

// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

function ChunkedUploader(file, options) {
    //if (!this instanceof ChunkedUploader) {
    //    return new ChunkedUploader(file, options);
    //}
    var self = this;
    this.file = file;
 
    //this.options = $.extend({
    //    url: '/upload'
    //}, options);
 
    this.file_size = this.file.size;
    this.chunk_size = (1024 * 1); // 1KB
    this.range_start = 0;
    this.range_end = this.chunk_size;
 
    this.slice_method = 'slice';
    
    // open connection
    this.connection = new WebSocket('ws://192.168.18.108:1337');
   
    this.connection.onopen = function () {
    	console.log('polaczono z websocketem');
    };

    this.connection.onmessage = function(message) {
    	console.log('Cos przyszlo od serwera!');
    	try
    	{
    		var json = JSON.parse(message.data);
    	}
    	catch (e)
    	{
    		console.log('This doesn\'t look like a valid JSON: ', message.data);
    	    return;
    	}
    	if (json.type === 'chunkok')
    	{
    		self._onChunkComplete(); // JAK TO ZROBIC???
    	}     
    };    
}
 
ChunkedUploader.prototype = {
 
// Internal Methods __________________________________________________
 
    _upload: function() {
        var self = this;
        var chunk;

            // Prevent range overflow
            if (self.range_end > self.file_size) {
                self.range_end = self.file_size;
            }

            chunk = self.file[self.slice_method](self.range_start, self.range_end);
            //self.connection.send(chunk);
           
            // SEND CHUNK TO WS
            
            var reader = new FileReader();
        
        	reader.onloadend = function(){
        		
        		self.connection.send(reader.result);
           		console.log('Chunked!');
        	};
        
       	    var toWrite = reader.readAsBinaryString(chunk);
            
	    
            
	         
    },
 
// Event Handlers ____________________________________________________
 
    _onChunkComplete: function() {
        // If the end range is already the same size as our file, we
        // can assume that our last chunk has been processed and exit
        // out of the function.
        if (this.range_end === this.file_size) {
            this._onUploadComplete();
            return;
        }
 
        // Update our ranges
        this.range_start = this.range_end;
        this.range_end = this.range_start + this.chunk_size;
 
        // Continue as long as we aren't paused
        if (!this.is_paused) {
            this._upload();
        }
    },
 
 
    _onUploadComplete: function(){
    	//alert(this.file.name);
    	addfile(this.file.name, this.file.size);
    	
    	
 	
    },
 
 	
    _hello: function(){
    	self = this;
    	var info = {
    		type: 'info',
    		user: 'user1',
    		filename: self.file.name,
    	}
    	//self.connection.sendUTF(JSON.stringify({ type:'chunkok', numer: 1 }));
    	self.connection.send(JSON.stringify(info));
        console.log('Info sent!');
        
    },
// Public Methods ____________________________________________________
 
    start: function() {
    	this._hello();
        this._upload();
    },
 
    pause: function() {
        this.is_paused = true;
    },
 
    resume: function() {
        this.is_paused = false;
        this._upload();
    }
};





$(document).ready(function() {
    var upload_form = $('#upload_form'),
        file_input = $('#file_input'),
        file_list = $('#file_list'),
        submit_btn = $('#submit_btn'),
        uploaders = [];
    file_input.on('change', onFilesSelected);
    
    upload_form.on('submit', onFormSubmit);
 
    /**
     * Loops through the selected files, displays their file name and size
     * in the file list, and enables the submit button for uploading.
     */
    function onFilesSelected(e) {
        var files = e.target.files,
            file;
 
        for (var i = 0; i < files.length; i++) {
            file = files[i];
            
            uploaders.push(new ChunkedUploader(file));
            file_list.append('<li>' + file.name + '(' + file.size + ' B)</li>');
        }
 
        file_list.show();
        submit_btn.attr('disabled', false);
    }
 
    /**
     * Loops through all known uploads and starts each upload
     * process, preventing default form submission.
     */
    function onFormSubmit(e) {
    	
        $.each(uploaders, function(i, uploader) {
        		getTokenUpload(uploader.file.name, uploader.file.size);
            uploader.start();
        });
 
        // Prevent default form submission
        e.preventDefault();
    }
});
