

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true, // Set to false in production
    },
  },
};

const game = new Phaser.Game(config);

// Define maxDistance as a constant
const maxDistance = 200;

function preload() {
  this.load.image('character', 'assets/char.png');
  this.load.image('object', 'assets/box.png');
  this.load.image('candle', 'assets/candle.png');
}

function create() {

  this.character = this.physics.add.sprite(400, 300, 'character');
  this.physics.world.setBounds(0, 0, 800, 600);

  // Initialize cursors here
  this.cursors = this.input.keyboard.createCursorKeys();

  this.objects = this.physics.add.group({
    key: 'object',
    repeat: 5,
    setXY: { x: 50, y: 50, stepX: 100 },
  });

  this.physics.add.collider(this.character, this.objects);
  // this.physics.add.collider(this.objects, this.objects);

  // Create a custom cursor sprite using 'assets/candle.png'
  this.candle = this.add.sprite(400, 300, 'candle').setOrigin(0.5, 0.5);
  this.candle.setScale(0.3); // Adjust the scale as needed
  this.candleHeld = true;

  this.input.on('pointermove', (pointer) => {
    // Update the position of the custom cursor (candle) to follow the pointer
    //console.log("pointermove")
    //console.log(this.candleHeld)
    if (this.candleHeld == false) return;
    this.candle.x = pointer.x;
    this.candle.y = pointer.y;
    //console.log("actually moved");

  });

  this.candle.setInteractive().on('pointerdown', function(pointer) {
    // console.log("clicked");
    // Toggle the dragging state
    this.candleHeld = !this.candleHeld;
  }, this);

  //creates an enemy
  // this.enemy = new Enemy(this, 100, 100);
}

function update() {
  // Iterate through all objects in the scene
  this.objects.children.iterate((object) => {
    // Calculate the distance between the object and the candle
    const distanceToObject = Phaser.Math.Distance.Between(object.x, object.y, this.candle.x, this.candle.y);

    // Set the alpha/transparency based on the distance
    const alphaObject = Phaser.Math.Clamp(1 - (distanceToObject / maxDistance), 0, 1);
    object.setAlpha(alphaObject);
  });

  // Calculate the distance between the character and the candle
  const distanceToCharacter = Phaser.Math.Distance.Between(
    this.character.x,
    this.character.y,
    this.candle.x,
    this.candle.y
  );

  // Set the alpha/transparency of the character based on the distance
  const alphaCharacter = Phaser.Math.Clamp(1 - (distanceToCharacter / maxDistance), 0, 1);
  this.character.setAlpha(alphaCharacter);

  // Character movement
  if (this.cursors.left.isDown) {
    this.character.setVelocityX(-200);
  } else if (this.cursors.right.isDown) {
    this.character.setVelocityX(200);
  } else {
    this.character.setVelocityX(0);
  }

  if (this.cursors.up.isDown) {
    this.character.setVelocityY(-200);
  } else if (this.cursors.down.isDown) {
    this.character.setVelocityY(200);
  } else {
    this.character.setVelocityY(0);
  }

  //enemy movement
  // this.enemy.update(this.player);
}
