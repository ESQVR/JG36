export class Character extends Phaser.Physics.Arcade.Sprite {
    static getTextures() {
        return {
            "character": "assets/char.png",
            "candle": "assets/candle.png"
        }
    }

    constructor(scene, x, y) {
        super(scene, x, y, 'character');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setInteractive();
        this.setCollideWorldBounds(true);

        this.cursors = this.scene.input.keyboard.addKeys('W,A,S,D');

        // Create the candle 'assets/candle.png'
        this.candle = scene.add.sprite(400, 300, 'candle').setOrigin(0.5, 0.5);
        this.candle.setScale(0.3); // Adjust the scale as needed
        this.candleHeld = true;

        this.candle.setInteractive()
        this.candle.on('pointerdown', function(pointer) {
            this.candleHeld = !this.candleHeld;
        }, this);
        scene.input.on('pointermove', (pointer) => {
            if (this.candleHeld == false) return;
            this.candle.x = pointer.x;
            this.candle.y = pointer.y;
        });
    }

    update() {

        // Character movement
        if (this.cursors.A.isDown) {
            this.setVelocityX(-200);
        } else if (this.cursors.D.isDown) {
            this.setVelocityX(200);
        } else {
            this.setVelocityX(0);
        }

        if (this.cursors.W.isDown) {
            this.setVelocityY(-200);
        } else if (this.cursors.S.isDown) {
            this.setVelocityY(200);
        } else {
            this.setVelocityY(0);
        }
        
    }
}