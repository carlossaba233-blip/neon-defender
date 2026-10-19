var fs = require('fs');
var html = fs.readFileSync('index.html', 'utf8');
if (!fs.existsSync('icons')) fs.mkdirSync('icons');

function extract(label, re, file) {
  var m = html.match(re);
  if (!m) throw new Error('No match for ' + label);
  fs.writeFileSync(file, Buffer.from(m[1], 'base64'));
  console.log(label, fs.statSync(file).size, 'bytes');
}

extract('icon-64', /rel="icon" type="image\/png" sizes="64x64" href="data:image\/png;base64,([^"]+)"/, 'icons/icon-64.png');
extract('icon-192', /rel="icon" type="image\/png" sizes="192x192" href="data:image\/png;base64,([^"]+)"/, 'icons/icon-192.png');
extract('icon-512', /src: 'data:image\/png;base64,([A-Za-z0-9+/=]+)', sizes: '512x512'/, 'icons/icon-512.png');
