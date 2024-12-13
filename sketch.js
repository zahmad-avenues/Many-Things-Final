let triangles;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
  settingUpTheTriangles(int(random(15, 30)), random(1, 8), random(30, 150));
}

function settingUpTheTriangles(n, padding, h) {
  triangles = [];
  let y = height / 2 - h / 2;
  let w = (width - (n + 1) * padding) / n;
  let x = padding;
  for (let i = 0; i < n; i++) {
    let newTriangle = {
      x: x,
      y: y,
      w: w,
      h: h,
      dx: random(-2, 2),
      dy: random(-3, 3),
      c: randomColor(),
      growthRate: random(0.1, 0.5),
    };
    triangles.push(newTriangle);
    x += w + padding;
  }
}

function draw() {
  background(colors.ash);
  for (let t of triangles) {
    fill(t.c);
    let x1 = t.x;
    let y1 = t.y + t.h;
    let x2 = t.x + t.w / 2;
    let y2 = t.y;
    let x3 = t.x + t.w;
    let y3 = t.y + t.h;

    triangle(x1, y1, x2, y2, x3, y3);

    t.x += t.dx;
    t.y += t.dy;

    if (t.x < 0 || t.x + t.w > width) {
      t.dx *= -1;
    }
    if (t.y < 0 || t.y + t.h > height) {
      t.dy *= -1;
    }

    t.w += t.growthRate;
    t.h += t.growthRate;

    if (t.w > 200 || t.w < 20) {
      t.growthRate *= -1;
    }

    if (random(1) < 0.01) {
      t.c = randomColor();
    }
  }
}

function randomColor(avenues = true) {
  if (avenues) {
    return color(randomAvenuesColor());
  } else {
    return color(random(255), random(255), random(255));
  }
}

function keyPressed() {
  if (key === " ") {
    redraw();
  }
  if (key === "s") {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
}

const colors = {
  white: "#ffffff",
  black: "#000000",
  ash: "#B7B09C",
  ochre: "#D3AE6F",
  indigo: "#3D68B2",
  moss: "#267355",
  pristineBlue: "#44C3D4",
  violet: "#9796C9",
  nimbus: "#CAC3BC",
  pistachio: "#C5D982",
  olive: "#8A916A",
  terracotta: "#C17E60",
  gold: "#F5CD64",
  clay: "#C3411E",
  grass: "#0D9A48",
  navy: "#273879"
};

function randomAvenuesColor() {
  return random(Object.values(colors));
}
