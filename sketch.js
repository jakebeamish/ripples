let t, speed;

function setup() {
  createCanvas(500, 400);

  // smooth(10);
  // noLoop();

  createDiv('Speed');
  speedSlider = createSlider(0.0, 0.3, 0.1, 0.0001);

  createDiv('Foreground Colour');
  fgRadio = createRadio('fg');
  fgRadio.option('black', 'Black');
  fgRadio.option('white', 'White');
  fgRadio.option('red', 'Red');
  fgRadio.selected('black');
  createDiv('Foreground Transparency');
  fgAlphaSlider = createSlider(0, 255, 255, 1);


  createDiv('Background Colour');
  bgRadio = createRadio('bg');
  bgRadio.option('black', 'Black');
  bgRadio.option('white', 'White');
  bgRadio.option('red', 'Red');
  bgRadio.selected('white');
  createDiv('Background Transparency');
  bgAlphaSlider = createSlider(0, 255, 255, 1);

  createDiv('paths');
  pathsSlider = createSlider(1, 20, 1, 1);
  createDiv('lines');
  linesSlider = createSlider(1, height * 0.9, 50, 1);
  createDiv('xspace');
  xspaceSlider = createSlider(1, 100, 1, 1);
  createDiv('yspace');
  yspaceSlider = createSlider(0.01, 5, 1, 0.01);
  createDiv('amplitude');
  amplitudeSlider = createSlider(1, height, height/2, 1);
  createDiv('xnoise');
  xnoiseSlider = createSlider(0, 0.03, 0.01, 0.0001);
  createDiv('ynoise');
  ynoiseSlider = createSlider(0, 0.03, 0.02, 0.0001);
  createDiv('xscatter');
  xscatterSlider = createSlider(0, 20, 0, 1);
  createDiv('yscatter');
  yscatterSlider = createSlider(0, 20, 0, 1);
  createDiv('density');
  densitySlider = createSlider(0, 1, 0.5, 0.01);
}

function draw() {

  // clear();
  randomSeed(1);
  noiseSeed(1);
  let fg = color(fgRadio.value());
  fg.setAlpha(fgAlphaSlider.value());
  stroke(fg);

  let bg = color(bgRadio.value());
  bg.setAlpha(bgAlphaSlider.value());
  background(bg);


  let speed = sq(speedSlider.value());
  let paths = pathsSlider.value();
  let lines = linesSlider.value();
  let xspace = sqrt(xspaceSlider.value());
  let yspace = yspaceSlider.value();
  let amplitude = amplitudeSlider.value();
  let xnoise = xnoiseSlider.value();
  let ynoise = ynoiseSlider.value();
  let density = sq(densitySlider.value());
  let xscatter = xscatterSlider.value();
  let yscatter = yscatterSlider.value();

  for (k = 0; k < paths; k++) {
    for (j = 0; j < lines; j++) {
      for (i = 0; i < width / xspace; i++) {
        let n = map(noise(k + i * xnoise * xspace,k + j * ynoise * yspace, 1 + (frameCount * speed)), 0, 1, -1, 1);
        let x = i * xspace;
        let y = j * yspace + (height - (lines * yspace)) / 2 + (amplitude * n);

        if (random() < density) {
          let sx = random(-1, 1) * xscatter;
          let sy = random(-1, 1) * yscatter;
          point(x + sx, y + sy);
        }
      }
    }
  }

  // for (j = 0; j < lines; j++) {
  //   for (i = 0; i < width / xspace; i++) {
  //     let n = map(noise(i * xnoise * xspace, j * ynoise * yspace), 0, 1, -1, 1);
  //     let x = i * xspace;
  //     let y = j * yspace + (height - (lines * yspace))/2 + amplitude * n;
  //     point(x, y);
  //   }
  // }


}
