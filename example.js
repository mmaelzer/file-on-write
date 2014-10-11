var FileOnWrite = require('./file-on-write');

var writer = new FileOnWrite({
  path: 'output/',
  filename: function(data) {
    return data.name;
  },
  transform: function(data) {
    return data.secret;
  },
  ext: '.txt'
});

writer.on('error', function(err) {
  console.error('whoa. problems writing.', err);
  process.exit(1);
});

[
 {name: 'Tom', secret: 'Enjoys Buffy the Vampire Slayer'},
 {name: 'Dick', secret: 'Reads political blogs'},
 {name: 'Harry', secret: 'Sings Whitney Houston songs in the shower'}
]
.forEach(writer.write, writer);
