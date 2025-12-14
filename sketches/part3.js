// ===============================
// Obstacle Run Game (Part 3)
// Adds:
// + Player jumping mechanic
//   => Gravity (accelerates player downward)
//   => Jump velocity + power (instant upward impulse)
//   => Ground check (so you don't fall forever / can jump again)
//   => updatePlayer() function (physics step)
//   => keyPressed() callback (input handler)
// For:
// E4: Acting on Command
// ===============================

// Player Variables
let playerX;
let playerY;
let playerSize;  

let playerVelocityY;     // NEW: vertical velocity (how fast player moves up/down each frame)
let playerJumpPower;     // NEW: how strong the jump impulse is
let gravity;             // NEW: constant acceleration applied each frame (pulls player downward)
let isOnGround;          // NEW: prevents double-jumps; true only when standing on ground

// Ground Variable(s)
let groundY;

// Obstacle Variables
let obstacleX;
let obstacleY;
let obstacleW;
let obstacleH;
let obstacleSpeed;
let obstacleSpeedIncrement;

function setup() {

  createCanvas(600, 300);

  // Ground setup
  groundY = 250;

  // Player setup
  playerX = 80;
  playerY = groundY;
  playerSize = 30;

  // --- NEW: Jump physics variables ---
  playerVelocityY = 0;       // Start not moving vertically
  playerJumpPower = 13;      // Bigger = higher jump
  gravity = 0.8;             // Bigger = heavier fall (faster acceleration down)
  isOnGround = true;         // Start grounded so player can jump immediately

  // Obstacle setup
  obstacleX = width + 50;
  obstacleY = groundY;
  obstacleW = 20;
  obstacleH = 40;
  obstacleSpeed = 6;
  obstacleSpeedIncrement = 0.4;
}

// NEW: Update the player with gravity physics (and some ground collision logic)
function updatePlayer() {
  // --- Physics step (runs every frame because it's called in draw()) ---

  // 1) Apply gravity to velocity.
  // Gravity is an *acceleration*, meaning it changes VELOCITY over time.
  playerVelocityY += gravity;

  // 2) Apply velocity to position.
  // Velocity is a *speed*, meaning it changes POSITION over time.
  playerY += playerVelocityY;

  // 3) Ground collision / clamp:
  // If player falls below ground, snap them back ONTO the ground.
  if (playerY > groundY) {
    playerY = groundY;         // Put player exactly on the ground line
    playerVelocityY = 0;       // Cancel downward velocity (stop falling)
    isOnGround = true;         // Now they’re allowed to jump again => isOnGround is triggered 
                               // as false in the keyPressed function on line 121
  }
}

function updateObstacle() {
  obstacleX -= obstacleSpeed;
  if (obstacleX + obstacleW < 0) {
    obstacleX = width + random(50, 150);
    obstacleSpeed = obstacleSpeed + obstacleSpeedIncrement;
  }
}

function drawPlayer() {
  noStroke();
  fill(100, 200, 255);
  rectMode(CENTER);
  rect(playerX, playerY, playerSize, playerSize);
}

function drawObstacle() {
  noStroke();
  fill(255, 100, 120);
  rectMode(CORNER);
  rect(obstacleX, obstacleY - obstacleH, obstacleW, obstacleH);
}

function drawGround() {
  stroke(200);
  line(0, groundY + playerSize / 2, width, groundY + playerSize / 2);
}

// NEW: keyPressed function
function keyPressed() {
  // This function is called automatically by p5.js when ANY key is pressed.

  // Jump only if:
  // - space was pressed
  // - player is currently on the ground
  if (key === " " && isOnGround) {
    // Negative velocity moves UP because y increases downward in p5.
    playerVelocityY = -playerJumpPower;

    // Immediately mark not grounded so holding space doesn’t trigger extra jumps.
    isOnGround = false;
  }
}

function draw() {
  // Main game loop (runs every frame)
  background(30);

  // Draw background/level elements first
  drawGround();

  // Game logic updates
  updatePlayer(); // NEW: calls our physics logic!
  updateObstacle();

  // Rendering
  drawPlayer();
  drawObstacle();
}
