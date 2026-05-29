const { Jimp } = require('jimp');
const input  = 'c:/Projetos APP/Daily Reser App 2/Identidade Visual/LOGO 4.png';
const output = 'c:/Projetos APP/Daily Reser App 2/DailyResetNovo/assets/images/logo4.png';

Jimp.read(input).then(function(img) {
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
    var r = this.bitmap.data[idx];
    var g = this.bitmap.data[idx + 1];
    var b = this.bitmap.data[idx + 2];
    var maxC = Math.max(r, g, b);
    var minC = Math.min(r, g, b);
    // Background: near-white AND near-gray (low saturation)
    // Logo content: either dark OR strongly colored (high saturation)
    if (minC > 220 && (maxC - minC) < 20) {
      this.bitmap.data[idx + 3] = 0;
    }
  });
  return img.write(output);
}).then(function() {
  console.log('logo4.png criado com fundo transparente v2 OK');
}).catch(function(e) { console.error(e); });
