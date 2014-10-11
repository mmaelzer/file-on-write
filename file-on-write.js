var fs = require('fs');
var path = require('path');
var util = require('util');
var Stream = require('stream');

/**
 *  @param {Object} options
 *    @param {String=} options.path
 *    @param {Function=} options.filename
 *    @param {Function=} options.transform
 *    @param {String=} options.ext
 *    @param {Boolean=} options.sync
 *    @param {Object=} options.context
 */
function FileOnWrite(options) {
  options = options || {};
  this.path = options.path || "./";
  this.filename = options.filename || Date.now;
  this.transform = options.transform || function(data) { return data; };
  this.ext = options.ext || "";
  this.sync = options.sync;
  this.writable = true;
  this.context = options.context;
  
  if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);
}
util.inherits(FileOnWrite, Stream);

/**
 *  @param {*} data
 */
FileOnWrite.prototype.write = function(data) {
  var file = path.join(this.path, this.filename.call(this.context, data) + this.ext);
  var write = this.transform.call(this.context, data);
    fs.writeFileSync(file, write);
  } else {
    fs.writeFile(file, write, function(err) { 
      if (err) this.emit('error', err); 
    }); 
  }
};

/**
 *  @param {*} data
 */
FileOnWrite.prototype.end = function(data) {
  this.write(data);
  this.writable = false;
};

FileOnWrite.prototype.destroy = function() {
  this.writable = false;
};

module.exports = FileOnWrite;