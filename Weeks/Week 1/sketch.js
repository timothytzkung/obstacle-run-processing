// --- Core player variables ---
// These are global variables so BOTH setup() and draw() can access them.
let playerX;      // Player's horizontal position (stays fixed for now)
let playerY;      // Player's vertical position (will matter once we add jumping/gravity)
let playerSize;   // Width/height of the square player

// --- Level/ground variables ---
let groundY;      // The "resting" Y position for the player (like the floor height)

function setup() {
  // Runs ONCE when the sketch starts.
  createCanvas(600, 300);

  // Player setup:
  // In a Geometry Dash-like game (or the Google Dinosaur Run game), the player often starts near the left side.
  playerX = 80;

  // We'll treat playerY as the *center* of the player square because we use rectMode(CENTER) later at Line 58.
  // So playerY = 250 means the square's center is at y=250.
  // 
  // In Processing (p5.js), the top left Canvas is (0,0); think of a Cartesian coordinate system.
  // Thus, a higher Y value means you're going down the screen while a lower Y value
  // means you're going up the screen.
  playerY = 250;

  // Player is a square, so playerSize will represent both width and height.
  playerSize = 30;

  // Ground line:
  // This represents the player's "floor level" (where they stand when not jumping).
  // For now, we set it to match the player's Y so the player starts "on the ground."
  groundY = 250;
}

function draw() {
  // draw() runs every frame (about 60 times per second by default).

  // Paint the background each frame so old drawings don’t smear when we begin animating.
  background(30);

  // --- Draw ground ---
  // stroke() affects outlines/lines (not filled shapes).
  stroke(200);

  // Because rectMode(CENTER) is used for the player, the player's bottom edge is:
  // playerY + playerSize/2
  //
  // If the ground line was drawn at groundY (same as playerY), then the line
  // would draw THROUGH the player's center. Therefore, we have to draw it below the player.
  //
  // Recall: (0,0) is the top left corner of the canvas screen. So, to move down, we must
  // INCREASE Y to move things DOWN the canvas.
  //
  // So, this ground line is drawn at:
  // groundY + playerSize/2
  //
  // That way, when playerY === groundY, the player looks like it's sitting on the line.
  line(0, groundY + playerSize / 2, width, groundY + playerSize / 2);

  // --- Draw player ---
  // Turn off outlines for the square so it's a clean filled block.
  noStroke();

  // Set fill color for shapes (R, G, B).
  fill(100, 200, 255);

  // Make rectangles draw from their center point (x, y).
  rectMode(CENTER);

  // Draw the player square at (playerX, playerY).
  rect(playerX, playerY, playerSize, playerSize);
}