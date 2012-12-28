var fs = require("fs");
var path = require("path");

var FileOnWrite = function(options) {
    this.path = options && options.path ? options.path : "./";
    this.filename = options && options.filename ? options.filename : function() { return Date.now(); };
    this.ext = options && options.ext ? options.ext : "";
    if (!fs.existsSync(this.path)) fs.mkdirSync(this.path);
    this.writable = true;
};

require('util').inherits(FileOnWrite, require('stream'));

FileOnWrite.prototype.write = function(data) {
    var filename = path.join(this.path, this.filename() + this.ext);
    fs.writeFile(filename, data, function(err) { if (err) throw new Error(err); });
};

FileOnWrite.prototype.end = function(chunk) {
    this.writable = false;
};

FileOnWrite.prototype.destroy = function() {
    this.writable = false;
};

module.exports = FileOnWrite;