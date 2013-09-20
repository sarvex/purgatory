var chem = require("chem");
var v = chem.vec2d;
var ani = chem.resources.animations;
var canvas = document.getElementById("game");
var engine = new chem.Engine(canvas);
engine.showLoadProgressBar();
engine.start();
canvas.focus();

chem.resources.on('ready', function () {
  var batch = new chem.Batch();
  var fpsLabel = engine.createFpsLabel();

  var playerSprite = new chem.Sprite(ani.player, {
    batch: batch,
    pos: engine.size.scaled(0.5),
  });
  var speed = 2;
  engine.on('update', function (dt, dx) {
    var left = engine.buttonState(chem.button.KeyLeft) || engine.buttonState(chem.button.KeyA);
    var right = engine.buttonState(chem.button.KeyRight) || engine.buttonState(chem.button.KeyD);
    var up = engine.buttonState(chem.button.KeyUp) || engine.buttonState(chem.button.KeyW);
    var down = engine.buttonState(chem.button.KeyDown) || engine.buttonState(chem.button.KeyS);

    if (left) playerSprite.pos.x -= speed * dx;
    if (right) playerSprite.pos.x += speed * dx;
    if (up) playerSprite.pos.y -= speed * dx;
    if (down) playerSprite.pos.y += speed * dx;
  });
  engine.on('draw', function (context) {
    // clear canvas to black
    context.fillStyle = '#ff00ea'
    context.fillRect(0, 0, engine.size.x, engine.size.y);

    // draw all sprites in batch
    batch.draw(context);

    // draw a little fps counter in the corner
    fpsLabel.draw(context);
  });
});
