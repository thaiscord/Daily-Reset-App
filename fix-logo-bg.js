const { Jimp } = require('jimp');
const path = require('path');

const INPUT  = path.join(__dirname, 'Identidade Visual', 'LOGO.png');
const OUTPUT = path.join(__dirname, 'DailyResetNovo', 'assets', 'images', 'logo.png');

// Cor exata do background do app
const BG = { r: 0xFE, g: 0xF9, b: 0xEC };

// Tolerância para detectar pixels de fundo
const TOLERANCE = 35;

function dist(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
}

async function main() {
  const img = await Jimp.read(INPUT);
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  const data = img.bitmap.data; // Buffer RGBA

  function idx(x, y) { return (y * w + x) * 4; }
  function getPixel(x, y) {
    const i = idx(x, y);
    return { r: data[i], g: data[i+1], b: data[i+2], a: data[i+3] };
  }
  function setPixel(x, y, r, g, b) {
    const i = idx(x, y);
    data[i]   = r;
    data[i+1] = g;
    data[i+2] = b;
    // mantém alpha intacto
  }

  // Lê cor de referência do canto superior esquerdo
  const ref = getPixel(3, 3);
  console.log(`Fundo original:  rgb(${ref.r}, ${ref.g}, ${ref.b})`);
  console.log(`Novo background: rgb(${BG.r}, ${BG.g}, ${BG.b})`);

  // BFS flood fill a partir dos cantos
  const visited = new Uint8Array(w * h);
  const queue = [];

  const seeds = [
    [0,0], [w-1,0], [0,h-1], [w-1,h-1],
    [Math.floor(w/2), 0], [Math.floor(w/2), h-1],
    [0, Math.floor(h/2)], [w-1, Math.floor(h/2)],
  ];

  for (const [x, y] of seeds) {
    const i = y * w + x;
    if (!visited[i]) { visited[i] = 1; queue.push(x, y); }
  }

  let replaced = 0;
  let qi = 0;

  while (qi < queue.length) {
    const x = queue[qi++];
    const y = queue[qi++];
    const p = getPixel(x, y);

    if (dist(p.r, p.g, p.b, ref.r, ref.g, ref.b) > TOLERANCE) continue;

    setPixel(x, y, BG.r, BG.g, BG.b);
    replaced++;

    for (const [nx, ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const ni = ny * w + nx;
        if (!visited[ni]) { visited[ni] = 1; queue.push(nx, ny); }
      }
    }
  }

  console.log(`Pixels substituídos: ${replaced} / ${w * h}`);
  await img.write(OUTPUT);
  console.log(`Salvo em: ${OUTPUT}`);
}

main().catch(e => console.error('Erro:', e.message));
