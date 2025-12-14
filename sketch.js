let playerX;
let playerY;
let playerSize;
let playerVelocityY;
let playerJumpPower;
let gravity;
let groundY;
let isOnGround;

let obstacleX;
let obstacleY;
let obstacleW;
let obstacleH;
let obstacleSpeed;
let obstacleSpeedIncrement;

let gameOver;

function setup() {
  createCanvas(600, 300);

  // Player setup
  playerX = 80;
  groundY = 250;
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

  gameOver = false;
}

function updatePlayer() {
  playerVelocityY += gravity; // Apply gravity, moves down
  playerY += playerVelocityY; // Update positionY with velocityY

  // Ground collision
  if (playerY > groundY) {
    playerY = groundY;
    playerVelocityY = 0;
    isOnGround = true;
  }
}


function updateObstacle() {
  obstacleX -= obstacleSpeed;  // Move obstacle left

  // If it goes off-screen, reset to right
  if (obstacleX + obstacleW < 0) {
    obstacleX = width + random(50, 150);  // Resets position
    obstacleSpeed = obstacleSpeed + 0.4;  // Slightly increase speed to make it harder
  }
}


function checkCollision() {
  // "Simple" AABB collision
  // Deconstructed might make it easier to follow?
//   let playerLeft = playerX - playerSize / 2;
//   let playerRight = playerX + playerSize / 2;
//   let playerTop = playerY - playerSize / 2;
//   let playerBottom = playerY + playerSize / 2;

//   let obstacleLeft = obstacleX;
//   let obstacleRight = obstacleX + obstacleW;
//   let obstacleTop = obstacleY - obstacleH;
//   let obstacleBottom = obstacleY;

//   let overlapX =
//     playerRight > obstacleLeft && playerLeft < obstacleRight;
//   let overlapY =
//     playerBottom > obstacleTop && playerTop < obstacleBottom;

//   if (overlapX && overlapY) {
//     gameOver = true;
//   }
  
  // Simplest approach
  if ( (playerX + playerSize / 2) > (obstacleX) && 
       (playerX - playerSize / 2) < (obstacleX + obstacleW) &&
       (playerY - playerSize / 2) < (obstacleY) &&
       (playerY + playerSize / 2) > (obstacleY - obstacleH)
      )
  {
    gameOver = true
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
  // Jump (only if on ground and not game over)
  if (key === " " && isOnGround && !gameOver) {
    playerVelocityY = -playerJumpPower; // Decrease in Y, moves up
    isOnGround = false;
  }
}


function draw() {
  background(30);

  // Draw ground
  stroke(200);
  line(0, groundY + playerSize / 2, width, groundY + playerSize / 2);
  
  // "Game Logic"
  if (!gameOver) {
    updatePlayer();
    updateObstacle();
    checkCollision();
  }
  
  // Render da game
  drawPlayer();
  drawObstacle();
}




