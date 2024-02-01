import { Candle } from './candle.js'; // Import the Candle class


export class Character extends Phaser.Physics.Arcade.Sprite {
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
        super(scene, x, y, 'character');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setInteractive();
        this.setCollideWorldBounds(true);

        export class Character extends Phaser.Physics.Arcade.Sprite {
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
        super(scene, x, y, 'character');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setInteractive();
        this.setCollideWorldBounds(true);

        this.cursors = this.scene.input.keyboard.addKeys('W,A,S,D');

        // Create the candle
        this.candle = new Candle(scene, 400, 300);
    }

    update() {
        // Character movement
        if (this.cursors.A.isDown || this.cursors.LEFT.isDown) {
            this.setVelocityX(-200);
        } else if (this.cursors.D.isDown || this.cursors.RIGHT.isDown) {
            this.setVelocityX(200);
        } else {
            this.setVelocityX(0);
        }

        if (this.cursors.W.isDown || this.cursors.UP.isDown) {
            this.setVelocityY(-200);
        } else if (this.cursors.S.isDown || this.cursors.DOWN.isDown) {
            this.setVelocityY(200);
        } else {
            this.setVelocityY(0);
        }
        
        // Update the candle
        this.candle.update();
    }
}

        // Create the candle
        this.candle = new Candle(scene, 400, 300);
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
        
        // Update the candle
        this.candle.update();
    }
}