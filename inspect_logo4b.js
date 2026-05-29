const { Jimp } = require('jimp');
const input = 'c:/Projetos APP/Daily Reser App 2/Identidade Visual/LOGO 4.png';

Jimp.read(input).then(img => {
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  const d = img.bitmap.data;

  function sample(x, y) {
    var idx = (y * w + x) * 4;
    return [d[idx], d[idx+1], d[idx+2]];
  }

  // Sample densely in the center region where logo content should be
  console.log('--- Center band y=300-400 ---');
  for (var y = 300; y <= 400; y += 20) {
    for (var x = 400; x <= 850; x += 50) {
      var px = sample(x, y);
      if (px[0] < 240 || px[1] < 240 || px[2] < 200) {
        console.log('(' + x + ', ' + y + '):', px);
      }
    }
  }

  console.log('--- Middle band y=400-700 ---');
  for (var y = 400; y <= 700; y += 20) {
    for (var x = 300; x <= 950; x += 50) {
      var px = sample(x, y);
      if (px[0] < 240 || px[1] < 240 || px[2] < 200) {
        console.log('(' + x + ', ' + y + '):', px);
      }
    }
  }

  console.log('--- Lower band y=700-1000 ---');
  for (var y = 700; y <= 1000; y += 20) {
    for (var x = 300; x <= 950; x += 50) {
      var px = sample(x, y);
      if (px[0] < 240 || px[1] < 240 || px[2] < 200) {
        console.log('(' + x + ', ' + y + '):', px);
      }
    }
  }
}).catch(function(e) { console.error(e); });
