// This was a surprisingly small project
// Now I could have blown it up with lots of features
// levels goodies to collect princesses to be freed
// but I never liked arcade games so I tried to keep
// the code as small as possible
//

// Helper function to choose on arbitrary object out of a given array
function randomChoice(arr) {
    "use strict";
    return arr[Math.floor(arr.length * Math.random())];
}

// create an empty array of players
var allEnemies = [];

// Enemies our player must avoid
var Enemy = function(x, y, sprite, speed) {
    "use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class is derived from enemy class
var Player = function(x, y, sprite) {
    "use strict";
    Enemy.call(this, x, y, sprite);
};

// Make player an object
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

// The player update function
// This function is frequently called updateEntities of engine.js
// We use it as the Superhero function
// Superheros solve problems that wouldn't be there without them
// So this functions looks for enemies and creates them if there
// aren't enought of them or removes them if they are off screen
// The function tests for collision or drops in the river as well
// New enemies are created inside the update function of the player
Player.prototype.update = function() {
    "use strict";
    // check if enemies did leave the screen on the right side
    // remove them if off screen
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x > 500) {
            allEnemies.splice(i, 1);
        }
    }
    // smaller 50 is in the river
    if (this.y < 50 || this.collision()){
        // reset the player if dropped in river or hit a bug
        // if counting lives this function should make a difference
        // between player reset and game reset
        // a game reset would also affect enemies
        this.reset();
    // maximum of 5 bugs on the screen allowed
    // we create a new bug in 2.5% of the update function calls
    } else if (allEnemies.length < 5 && Math.random() < 0.025) {
        // bugs start left off screen at -100 and can be in one of three rows
        // at positions 63, 145 or 230
        // bugs have a random speed between 50 and 200
        allEnemies.push(new Enemy(-100, randomChoice([63, 145, 230]),
                                  "images/enemy-bug.png",
                                  Math.random() * 150 + 50));
    }
};

// does nothing else putting the player back to the starting position
// the game runs continiously and resets only the player
Player.prototype.reset = function() {
    "use strict";
    this.x = 200;
    this.y = 390;
};

// moves the player tile by tile and ignores
// movements out of the screen
// for only for cases switch case is still ok
// for more cases object lookup should be considered
// as switch case has O(n) while lookup has O(1)
Player.prototype.handleInput = function(direction) {
    "use strict";
    switch (direction) {
        case "left":
            if (this.x > 0){
                this.x -= 101;
            }
            break;
        case "right":
            if (this.x < 400){
                this.x += 101;
            }
            break;
        case "up":
            if (this.y > 0){
                this.y -= 83;
            }
            break;
        case "down":
            if (this.y < 390){
                this.y += 83;
            }
            break;
        default:
            break;
    }
};

// tests for collision between enemies and the player
// as the game is small this is a simple version
// just checking all enemies against the player
// if each object should be checked against collision
// we better take advantage of the grid only checking
// objects in the tiles adjacent to the object in question
Player.prototype.collision = function() {
    "use strict";
    for (var i = 0; i < allEnemies.length; i++) {
        if (Math.abs( allEnemies[i].y - this.y) < 42 &&
            Math.abs( allEnemies[i].x - this.x) < 80) {
                return true;
            }
    }
    return false;
};

// create the player
var player = new Player(200, 390, "images/char-boy.png");

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    "use strict";
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
