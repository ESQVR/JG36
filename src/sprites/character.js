import { Candle } from './candle.js'; // Import the Candle class


export class Character extends Phaser.Physics.Arcade.Sprite {
    static preload(scene) {
        scene.load.image('character', 'assets/char.png');
        scene.load.spritesheet('player', 'assets/PlayerChar_50x50.png', { frameWidth: 50, frameHeight: 50,  });
        Candle.preload(scene);
    }
    static getTextures() {
        let my_needs ={
            "character": "assets/char.png",
        }
        return {
            ...my_needs,
            ...Candle.getTextures()
        }
    }

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // Create the candle
        console.log('Creating candle at', x, y, 'in character.js');
        this.candle = new Candle(scene, x, y);

        const anims = scene.anims;
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setInteractive();
        //this.setCollideWorldBounds(true);

        this.cursors = this.scene.input.keyboard.addKeys('W,A,S,D');
        this.scene.physics.add.collider(this, this.scene.dungeonManager.groundLayer);
        this.setScale(.75);

        
        
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
        // update animation
        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
            this.anims.play('walk', true);
        } else {
            this.anims.play('idle', true);
        }
        
        // Update the candle
        this.candle.update();
    }
}