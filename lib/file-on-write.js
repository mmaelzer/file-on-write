var fs = require("fs");
var path = require("path");

var FileOnWrite = function(options) {
  options = options || {};
  this.path = options.path || "./";
  this.filename = options.filename || Date.now;
  this.transform = options.transform || function(data) { return data; };
  this.ext = options.ext || "";
  this.sync = options.sync;
  this.writable = true;
  this.context = options.context;
  
  if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);
};

require('util').inherits(FileOnWrite, require('stream'));

FileOnWrite.prototype.write = function(data) {
  var file = path.join(this.path, this.filename.call(this.context, data) + this.ext);
  var write = this.transform.call(this.context, data);
  if (this.sync) {
    fs.writeFileSync(file, write);
  } else {
    fs.writeFile(file, write, function(err) { if (err) throw new Error(err); }); 
  }
};

FileOnWrite.prototype.end = function(chunk) {
  this.writable = false;
};

FileOnWrite.prototype.destroy = function() {
  this.writable = false;
};

module.exports = FileOnWrite;