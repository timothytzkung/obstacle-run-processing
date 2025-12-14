// ===============================
// Obstacle Run Game (Part 2)
// Adds: 
// + a single obstacle that scrolls left and respawns faster over time
// + refactoring drawing/rendering code into separate functions
// For:
// E3: Functioning
// ===============================

// Player Variables
let playerX;
let playerY; 
let playerSize; 

// Ground Variable
let groundY;

// NEW: --- Obstacle Variables ---
let obstacleX;              // Obstacle's horizontal position (moves left each frame)
let obstacleY;              // Obstacle's baseline Y position (anchored to ground)
let obstacleW;              // Obstacle width
let obstacleH;              // Obstacle height (extends upward from the ground)
let obstacleSpeed;          // Current obstacle movement speed (pixels per frame)
let obstacleSpeedIncrement; // How much the speed increases each time the obstacle respawns

function setup() {
  // Create window
  createCanvas(600, 300);

  // Ground Setup
  groundY = 250;

  // Player Setup
  playerX = 80;
  playerY = groundY;
  playerSize = 30;

  // NEW: --- Obstacle setup ---
  // Start obstacle slightly off the right edge so it scrolls in.
  obstacleX = width + 50;

  // obstacleY is treated like the "ground contact" point for the obstacle.
  // In drawObstacle() we draw it upward using (obstacleY - obstacleH).
  obstacleY = groundY;

  // Thin spike/block style obstacle.
  obstacleW = 20;
  obstacleH = 40;

  // Base difficulty: obstacle scroll speed.
  obstacleSpeed = 6;

  // Difficulty ramp: each time the obstacle cycles, it gets faster.
  obstacleSpeedIncrement = 0.4;
}

function updateObstacle() {
  // NEW: --- Core endless-runner motion ---
  // Moving the obstacle left creates the illusion of forward movement.
  obstacleX -= obstacleSpeed;

  // NEW: --- "Respawn" logic ---
  // If the obstacle has fully left the screen (right edge < 0), reset it.
  if (obstacleX + obstacleW < 0) {
    // Respawn off-screen to the right with randomness,
    // so the spacing between obstacles isn't perfectly constant.
    obstacleX = width + random(50, 150);

    // Increase speed gradually to make the game harder over time.
    obstacleSpeed = obstacleSpeed + obstacleSpeedIncrement;
  }
}

// NEW: --- Refactoring Code! ---
// We're now moving our drawing code from the draw() function--such as the
// player and the ground--into their own separate functions. 
// This makes our code more legible and clean!

function drawPlayer() {
  // NEW: --- Player render ---
  noStroke();
  fill(100, 200, 255);
  rectMode(CENTER);
  rect(playerX, playerY, playerSize, playerSize);
}

function drawObstacle() {
  // NEW: --- Obstacle render ---
  noStroke();
  fill(255, 100, 120);

  // IMPORTANT: Corner mode means rect(x,y) uses x,y as the top-left corner.
  // Why CORNER and not CENTER like the player?:
  // We're drawing like this: "start from the ground, and draw upward by obstacleH"
  // This makes it easier to mentally visualize when we're doing AABB collision checks later.
  // The player uses CENTER because we're going to implement vertical movements, which
  // will be easier to calculate and program from the center.
  rectMode(CORNER);

  // We want the obstacle to sit ON the ground and extend upward:
  // top = obstacleY - obstacleH (remember, decrease in Y value means UP)
  // bottom = obstacleY
  rect(obstacleX, obstacleY - obstacleH, obstacleW, obstacleH);
}

function drawGround() {
  // NEW: --- Ground line render ---
  stroke(200);
  line(0, groundY + playerSize / 2, width, groundY + playerSize / 2);
}
å
function draw() {
  // Main game loop (runs every frame)
  background(30);

  // Draw background/level elements first
  drawGround();

  // NEW: --- Game logic updates ---
  updateObstacle();

  // Rendering (rendering them last so they're drawn "on top")
  drawPlayer();
  drawObstacle(); // NEW: calls the function to draw our obstacle!
}
