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
  this.filter = options.filter || function() { return true; };
  
  if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);
}
util.inherits(FileOnWrite, Stream);

/**
 *  @param {*} data
 */
FileOnWrite.prototype.write = function(data) {
  // Build full filepath
  var file = path.join(this.path, this.filename.call(this.context, data) + this.ext);
  // If the data doesn't pass the filter, return
  if (!this.filter(data)) return;
  // Transform the data before write
  var transformedData = this.transform.call(this.context, data);
  // Write data
  if (this.sync) {
    fs.writeFileSync(file, transformedData);
  } else {
    fs.writeFile(file, transformedData, function(err) { 
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
