// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.vertical = 83;
    this.horizontal = 101;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.horizontal * 5) {
      this.x += this.speed * dt;
    } else {
      this.x = -this.horizontal;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  this.vertical = 83;
  this.horizontal = 101;
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
  this.win = false;
}

Player.prototype.update = function() {
  if (this.y == -30) {
    this.win = true;
  } else {
    for (var enemy of allEnemies) {
      if ((this.y == enemy.y) && ((enemy.x + enemy.horizontal/2) > this.x) && (enemy.x < (this.x + this.horizontal/2))) {
        this.reset();
      }
    }
  }
};

Player.prototype.reset = function() {
  this.win = false;
  this.x = 202;
  this.y = 385;
  allEnemies = [];
  var newEnemy1 = new Enemy(-101, 53, 200);
  var newEnemy2 = new Enemy(-101, 136, 150);
  var newEnemy3 = new Enemy(-101, 219, 100);
  allEnemies.push(newEnemy1, newEnemy2, newEnemy3);
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
  if ((direction == 'left') && (this.x > 0)) {
    this.x -= this.horizontal;
  } else if ((direction == 'right') && (this.x < (this.horizontal * 4))) {
    this.x += this.horizontal;
  } else if ((direction == 'up') && (this.y > 0)) {
    this.y -= this.vertical;
  } else if ((direction == 'down') && (this.y < (this.vertical *4))) {
    this.y += this.vertical;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202, 385);

var enemy1 = new Enemy(-101, 53, 200);
var enemy2 = new Enemy(-101, 136, 150);
var enemy3 = new Enemy(-101, 219, 100);
var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
