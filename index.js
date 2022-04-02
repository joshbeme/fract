const addPixel = (context, x, y) => {
  context.fillRect(x, y, 1, 1);
};

const canvases = document.querySelectorAll("canvas");
const contextes = Array.from(canvases.values()).map((canvas) =>
  canvas.getContext("2d")
);

const getMidpoint = (p1, p2) => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;

  return [(x1 + x2) / 2, (y1 + y2) / 2];
};

const randomPointBetween = (p1, p2) => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;

  return [Math.random() * (x2 - x1) + x1, Math.random() * (y2 - y1) + y1];
};

const trianglePoints = [
  [7500, 0],
  [0, 15000],
  [15000, 15000],
];

let lastPoint = randomPointBetween(trianglePoints[0], trianglePoints[1]);

const triangle = (context) => {
  for (let i = 0; i < 10000; i++) {
    const randomTrianglePoint = trianglePoints[Math.floor(Math.random() * 3)];
    const midPoint = getMidpoint(lastPoint, randomTrianglePoint);

    addPixel(context, ...midPoint);
    lastPoint = midPoint;
  }
};

const update = () => {
  contextes.forEach((context) => {
    triangle(context);
  });
};

requestAnimationFrame(function loop() {
  update();
  requestAnimationFrame(loop);
});

// document.addEventListener("wheel", (e) => {
//   //Get the mouse wheel event
//   const delta = Math.max(-1, Math.min(1, e.deltaY));

//   // Resize the canvas
//   const newWidth = canvas.getBoundingClientRect().width + delta * 1000;
//   const newHeight = canvas.getBoundingClientRect().height + delta * 1000;
//   canvas.style.width = `${newWidth}px`;
//   canvas.style.height = `${newHeight}px`;

//   console.log(e);
// });
