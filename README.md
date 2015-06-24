file-on-write
==================
  
A node.js stream implementation that takes a stream and creates files.
  
## Install
```
npm install file-on-write
```
  
  
  
Usage
-------------

```javascript
var FileOnWrite = require("file-on-write");
var writer = new FileOnWrite({
  path: './images',
  ext: '.jpg',
  filename: function(data) { return data.time; },
  filter: function(data) { return data && Buffer.isBuffer(data.buffer); },
  transform: function(data) { return data.buffer; }
});
```
  
  
Options
------------

### path {String}
* default `'./'`  
The path to write files to.
  
### ext {String}
* default `''`  
The file extension for the written files.
  
### filename {Function(data)}
* default `Date.now()`  
A function used to generate filenames. The data piped into the `file-on-write` stream will be provided as the paramater to the `filename` function.
  
### sync {Boolean}
* default `false`  
Write files synchronously.
  
### context {Object}
* default `undefined`  
The context to call `filename()` and `transform()` with.
  
### transform {Function(data)}
* default - return `data`  
Provide a transform method on the data passed into the `file-on-write` stream. Useful when only wanting to save a subset of the provided data.
  
### filter {Function(data) Boolean}
* default - return `true`  
Provide a filter method on the data passed into the `file-on-write` stream. Useful when you want to reject certain types of data. `filter` is called before `transform`. If you wish to keep the data return `true` from `filter` and `false` to discard the data.
  
Example
--------------
Here's an example of using `file-on-write` to write jpegs coming from an [mjpeg-consumer](https://github.com/mmaelzer/mjpeg-consumer) stream:

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

The MIT License
===============

Copyright (c) 2014 Michael Maelzer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
