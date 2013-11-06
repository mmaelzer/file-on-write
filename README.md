file-on-write
==================
  
A node.js stream implementation that takes a stream and creates files.
  
###Install###

  npm install file-on-write
  
----------------------  

###Usage###

```javascript
var FileOnWrite = require("file-on-write");
var writer = new FileOnWrite({
  path: './images',
  ext: '.jpg',
  filename: function() { return Date.now(); }
});
```
  
**path**  
The path to write files to.
  
**ext**  
The file extension for the written files.
  
**filename**  
A function used to generate files.


----------------------  
###Example###
Using `file-on-write` to write jpegs coming in from an [mjpeg-consumer](https://github.com/mmaelzer/mjpeg-consumer) stream:

```javascript
var request = require("request");
var MjpegConsumer = require("mjpeg-consumer");
var FileOnWrite = require("file-on-write");

var writer = new FileOnWrite({ 
  path: './video',
  ext: '.jpg'
});
var consumer = new MjpegConsumer();

request("http://192.168.1.2/videostream.cgi").pipe(consumer).pipe(writer);
```