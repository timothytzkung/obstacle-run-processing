// ===============================
// Obstacle Run Game (Part 4)
// Adds:
// + gameOver state
// + collision detection (AABB)
// + disables updates + jumping after collision
// For:
// E5: Pause & Play
// ===============================

// Player Variables
let playerX;
let playerY;            
let playerSize;         

let playerVelocityY;
let playerJumpPower;
let gravity;
let groundY;
let isOnGround;

// Obstacle Variables
let obstacleX;
let obstacleY;
let obstacleW;
let obstacleH;
let obstacleSpeed;
let obstacleSpeedIncrement;

// NEW: --- Game state ---
let gameOver;  // When true, game stops updating and player can’t jump

function setup() {
  createCanvas(600, 300);

  // Ground setup:
  groundY = 250;

  // Player setup
  playerX = 80;
  playerY = groundY;
  playerSize = 30;
  playerVelocityY = 0;
  playerJumpPower = 13;
  gravity = 0.8;
  isOnGround = true;

  // Obstacle setup
  obstacleX = width + 50;
  obstacleY = groundY;
  obstacleW = 20;
  obstacleH = 40;
  obstacleSpeed = 6;
  obstacleSpeedIncrement = 0.4;

  // NEW: --- Game starts running ---
  gameOver = false;
}

function updatePlayer() {
  playerVelocityY += gravity;
  playerY += playerVelocityY;

  if (playerY > groundY) {
    playerY = groundY;
    playerVelocityY = 0;
    isOnGround = true; 
  }
}

function updateObstacle() {
  obstacleX -= obstacleSpeed;
  if (obstacleX + obstacleW < 0) {
    obstacleX = width + random(50, 150);
    obstacleSpeed = obstacleSpeed + obstacleSpeedIncrement;
  }
}

// NEW: --- Collision Logic ---
function checkCollision() {
  // --- "Simple" AABB collision ---
  // AABB = Axis-Aligned Bounding Box.
  // Basically: treat player and obstacle as rectangles and check overlap on both axes.

  // Player bounds (because player uses rectMode(CENTER))
  // left   = playerX - playerSize/2
  // right  = playerX + playerSize/2
  // top    = playerY - playerSize/2
  // bottom = playerY + playerSize/2

  // Obstacle bounds (because obstacle uses rectMode(CORNER) with top-left)
  // left   = obstacleX
  // right  = obstacleX + obstacleW
  // top    = obstacleY - obstacleH
  // bottom = obstacleY

  // Overlap test:
  // - X overlap: playerRight > obstacleLeft AND playerLeft < obstacleRight
  // - Y overlap: playerTop < obstacleBottom AND playerBottom > obstacleTop
  if (
    (playerX + playerSize / 2) > (obstacleX) &&                 // playerRight > obstacleLeft
    (playerX - playerSize / 2) < (obstacleX + obstacleW) &&     // playerLeft < obstacleRight
    (playerY - playerSize / 2) < (obstacleY) &&                 // playerTop < obstacleBottom
    (playerY + playerSize / 2) > (obstacleY - obstacleH)        // playerBottom > obstacleTop
  ) {
    // If both axes overlap, we collided → freeze the game
    gameOver = true;
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

function keyPressed() {
  // --- Jump only when: ---
  // - space pressed
  // - player is on ground
  // NEW: - game is not over
  if (key === " " && isOnGround && !gameOver) { // Add gameover check!
    playerVelocityY = -playerJumpPower;
    isOnGround = false;
  }
}

function draw() {
  background(30);

  // Draw ground line
  stroke(200);
  line(0, groundY + playerSize / 2, width, groundY + playerSize / 2);

  // NEW: --- Game logic gate ---
  // When gameOver is true, we stop updating positions and stop checking collision.
  // This “freezes” the scene at the moment of collision.
  if (!gameOver) {
    updatePlayer();
    updateObstacle();
    checkCollision();
  }

  // Render game objects every frame (even if gameover!)
  drawPlayer();
  drawObstacle();
}
