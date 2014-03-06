file-on-write
==================
  
A node.js stream implementation that takes a stream and creates files.
  
## Install
```
npm install file-on-write
```
  
  
  
## Usage

```javascript
var FileOnWrite = require("file-on-write");
var writer = new FileOnWrite({
  path: './images',
  ext: '.jpg',
  filename: function(data) { return data.time; }
});
```
  
  
## Options

### path {String}
* default `'./'`  
The path to write files to.
  
### ext {String}
* default `''`  
The file extension for the written files.
  
### filename {Function(chunk)}
* default `Date.now()`  
A function used to generate files. The data piped into the `file-on-write` stream will be provided as the paramater to the `filename` function.
  
### sync {Boolean}
* default `false`  
Write files synchronously.
  
### context {Object}
* default `undefined`  
The context to call `filename()` and `transform()` with.
  
### transform {Function(chunk)}
* default - return chunk  
Provide a transform method on the data passed into the `file-on-write` stream. Useful when only wanting to save a subset of the provided data.
  
  
  
## Example
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
