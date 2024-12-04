// part of december adventure on : https://budgies.netlify.app/

let angle = 0;
let saturation = 100;
let lightness = 100;
let draggingAngle = false;
let draggingSaturation = false;
let dragginglightness = false;
let ringWidth;
let radius;
let dx, dy;
let touchR = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL);
  angleMode(DEGREES);
  radius = min(width, height) / 5;
  ringWidth = min(width, height) / 8;
  dx = width / 5;
  dy = height / 5;
  angle = random(0, 360);
  saturation = random(0, 100);
  lightness = random(0, 100);
  textSize(16);
  textAlign(CENTER);
}

function draw() {
  background(angle, saturation, lightness);
  translate(width / 2, height / 2);
  noFill();
  drawRing();
  drawBBar();
  drawSBar();
  angleSelector();
  saturationSelector();
  lightnessSelector();
  borderAndText();
}

function borderAndText() {
  noFill();
  stroke((angle + 180) % 360, 100 - saturation, 100 - lightness);
  rect(
    -width / 2 + dx / 4,
    -height / 2 + dy / 4,
    width - dx / 2,
    height - dy / 2
  );
  rect(
    -width / 2 + dx / 4,
    -height / 2 + dy / 4,
    width - dx / 2,
    height - dy / 2
  );
  if (lightness >= 70) {
    b = 100;
  } else {
    b = 0;
  }
  fill((360 - angle) % 360, 0, 100 - b);
  noStroke();
  text(
    "hsl(" +
      round(angle) +
      "deg, " +
      round(saturation) +
      "%, " +
      round(lightness) +
      "%)",
    0,
    height / 2 - dy / 2
  );
  rgb1 = hslToRgb(angle, saturation, lightness);
  text(
    "rgb(" + round(rgb1.r) + ", " + round(rgb1.g) + ", " + round(rgb1.b) + ")",
    0,
    -height / 2 + dy / 2
  );
  hexStr = rgbToHex(rgb1.r, rgb1.g, rgb1.b);
  text(hexStr, 0, -height / 2 + dy / 2 + 20);
}

function mousePressed() {
  let selX = cos(angle) * radius;
  let selY = sin(angle) * radius;
  let d = dist(mouseX - width / 2, mouseY - height / 2, selX, selY);
  if (d < 20) {
    draggingAngle = true;
    return;
  }

  let satX = -width / 2 + dx;
  let satY = map(saturation, 0, 100, height / 2 - dy, -height / 2 + dy);
  let satD = dist(mouseX - width / 2, mouseY - height / 2, satX, satY);
  if (satD < 20) {
    draggingSaturation = true;
    return;
  }

  let brightX = width / 2 - dx;
  let brightY = map(lightness, 0, 100, height / 2 - dy, -height / 2 + dy);
  let brightD = dist(mouseX - width / 2, mouseY - height / 2, brightX, brightY);
  if (brightD < 20) {
    dragginglightness = true;
  }
}

function touchStarted() {
  let touchX = touches[0].x - width / 2;
  let touchY = touches[0].y - height / 2;

  let selX = cos(angle) * radius;
  let selY = sin(angle) * radius;
  let d = dist(touchX, touchY, selX, selY);
  if (d < 20) {
    draggingAngle = true;
    return false;
  }

  let satX = -width / 2 + dx;
  let satY = map(saturation, 0, 100, height / 2 - dy, -height / 2 + dy);
  let satD = dist(touchX, touchY, satX, satY);
  if (satD < 20) {
    draggingSaturation = true;
    return false;
  }

  let brightX = width / 2 - dx;
  let brightY = map(lightness, 0, 100, height / 2 - dy, -height / 2 + dy);
  let brightD = dist(touchX, touchY, brightX, brightY);
  if (brightD < 20) {
    dragginglightness = true;
    return false;
  }
  return false;
}

function mouseDragged() {
  if (draggingAngle) {
    angle = atan2(mouseY - height / 2, mouseX - width / 2);
    if (angle < 0) angle += 360;
  }
  if (draggingSaturation) {
    let relativeY = mouseY - height / 2;
    saturation = map(relativeY, height / 2 - dy, -height / 2 + dy, 0, 100);
    saturation = constrain(saturation, 0, 100);
  }
  if (dragginglightness) {
    let relativeY = mouseY - height / 2;
    lightness = map(relativeY, height / 2 - dy, -height / 2 + dy, 0, 100);
    lightness = constrain(lightness, 0, 100);
  }
}

function touchMoved() {
  if (draggingAngle) {
    angle = atan2(touches[0].y - height / 2, touches[0].x - width / 2);
    if (angle < 0) angle += 360;
  }
  if (draggingSaturation) {
    let relativeY = touches[0].y - height / 2;
    saturation = map(relativeY, height / 2 - dy, -height / 2 + dy, 0, 100);
    saturation = constrain(saturation, 0, 100);
  }
  if (dragginglightness) {
    let relativeY = touches[0].y - height / 2;
    lightness = map(relativeY, height / 2 - dy, -height / 2 + dy, 0, 100);
    lightness = constrain(lightness, 0, 100);
  }
  return false;
}

function mouseReleased() {
  draggingAngle = false;
  draggingSaturation = false;
  dragginglightness = false;
}

function touchEnded() {
  draggingAngle = false;
  draggingSaturation = false;
  dragginglightness = false;
  return false;
}

function windowResized() {
  radius = min(width, height) / 5;
  ringWidth = min(width, height) / 8;
  dx = width / 5;
  dy = height / 5;
  resizeCanvas(windowWidth, windowHeight);
}

function drawRing() {
  for (let a = 0; a < 360; a += 0.5) {
    stroke(a, 100, 50);
    strokeWeight(5);
    push();
    rotate(a);
    line(radius - ringWidth / 2, 0, radius + ringWidth / 2, 0);
    pop();
  }
}

function drawBBar() {
  stroke(0);
  let x = width / 2 - dx;
  let y = dy;
  for (let i = -height / 2 + y; i < height / 2 - y; i += 3) {
    let b = map(i, -height / 2 + y, height / 2 - y, 100, 0);
    fill(angle, saturation, b);
    noStroke();
    circle(x, i, 10);
  }
}

function drawSBar() {
  stroke(0);
  let x = -width / 2 + dx;
  let y = dy;
  for (let i = -height / 2 + y; i < height / 2 - y; i += 3) {
    let s = map(i, -height / 2 + y, height / 2 - y, 100, 0);
    fill(angle, s, lightness);
    noStroke();
    circle(x, i, 10);
  }
}

function angleSelector() {
  let selX = cos(angle) * radius;
  let selY = sin(angle) * radius;
  stroke(255);
  fill(angle, 100, 50);
  circle(selX, selY, 20);
}

function saturationSelector() {
  let selX = -width / 2 + dx;
  let selY = map(saturation, 0, 100, height / 2 - dy, -height / 2 + dy);

  push();
  stroke(angle, 100 - saturation, 50);
  fill(angle, saturation, 50);
  circle(selX, selY, 20);
  pop();
}

function lightnessSelector() {
  let selX = width / 2 - dx;
  let selY = map(lightness, 0, 100, height / 2 - dy, -height / 2 + dy);

  push();
  stroke(angle, 100, 100 - lightness);
  fill(angle, 100, lightness);
  circle(selX, selY, 20);
  pop();
}

function keyPressed() {
  if (key === "c" || key === "C") {
    let hslText =
      "hsl(" +
      round(angle) +
      "deg, " +
      round(saturation) +
      "%, " +
      round(lightness) +
      "%)";
    navigator.clipboard
      .writeText(hslText)
      .then(() => console.log("HSL value copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  }
}

function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function hslToRgb(h, s, l) {
  // Create a color in
  let c = color(h, s, l);
  // colorMode(RGB);
  t = {
    r: round(red(c)),
    g: round(green(c)),
    b: round(blue(c))
  };
  // Get RGB values

  return t;
}
