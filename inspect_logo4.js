const { Jimp } = require('jimp');
const input = 'c:/Projetos APP/Daily Reser App 2/Identidade Visual/LOGO 4.png';

Jimp.read(input).then(img => {
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  const d = img.bitmap.data;

  function sample(x, y) {
    const idx = (y * w + x) * 4;
    return [d[idx], d[idx+1], d[idx+2]];
  }

  const points = [
    [Math.floor(w/2), Math.floor(h/2)],
    [Math.floor(w/2), Math.floor(h*0.3)],
    [Math.floor(w/2), Math.floor(h*0.7)],
    [Math.floor(w*0.3), Math.floor(h/2)],
    [Math.floor(w*0.7), Math.floor(h/2)],
    [Math.floor(w*0.25), Math.floor(h*0.25)],
    [Math.floor(w*0.75), Math.floor(h*0.25)],
    [Math.floor(w*0.25), Math.floor(h*0.75)],
    [Math.floor(w*0.75), Math.floor(h*0.75)],
    [Math.floor(w/2), Math.floor(h*0.1)],
    [Math.floor(w/2), Math.floor(h*0.9)],
    [Math.floor(w*0.4), Math.floor(h*0.4)],
    [Math.floor(w*0.6), Math.floor(h*0.4)],
    [Math.floor(w*0.4), Math.floor(h*0.6)],
    [Math.floor(w*0.6), Math.floor(h*0.6)],
  ];

  console.log('Dimensions:', w, 'x', h);
  points.forEach(function(pt) {
    var x = pt[0], y = pt[1];
    var px = sample(x, y);
    console.log('(' + x + ', ' + y + '):', px);
  });
}).catch(function(e) { console.error(e); });
