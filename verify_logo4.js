const { Jimp } = require('jimp');
const output = 'c:/Projetos APP/Daily Reser App 2/DailyResetNovo/assets/images/logo4.png';

Jimp.read(output).then(function(img) {
  var w = img.bitmap.width;
  var h = img.bitmap.height;
  var d = img.bitmap.data;

  function sample(x, y) {
    var idx = (y * w + x) * 4;
    return [d[idx], d[idx+1], d[idx+2], d[idx+3]];
  }

  console.log('Dimensions:', w, 'x', h);
  console.log('Corner pixels (should be alpha=0):');
  console.log('  Top-left :', sample(0, 0));
  console.log('  Top-right:', sample(w-1, 0));
  console.log('  Bot-left :', sample(0, h-1));
  console.log('  Bot-right:', sample(w-1, h-1));

  console.log('Logo content pixels (should have alpha=255):');
  console.log('  (450,340):', sample(450, 340));
  console.log('  (550,340):', sample(550, 340));
  console.log('  (550,680):', sample(550, 680));
  console.log('  (700,700):', sample(700, 700));
  console.log('  (350,860):', sample(350, 860));

  // Count transparent vs opaque pixels
  var total = w * h;
  var transparent = 0;
  var opaque = 0;
  for (var i = 3; i < d.length; i += 4) {
    if (d[i] === 0) transparent++; else opaque++;
  }
  console.log('Transparent pixels:', transparent, '(' + Math.round(transparent/total*100) + '%)');
  console.log('Opaque pixels:', opaque, '(' + Math.round(opaque/total*100) + '%)');
}).catch(function(e) { console.error(e); });
