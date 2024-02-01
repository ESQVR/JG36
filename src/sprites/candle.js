import { VignetteEffect } from '../vignette_effect.js'; // Import the VignetteEffect class

export class Candle extends Phaser.Physics.Arcade.Sprite {
    static getTextures() {
      const my_needs = {
        "candle": "assets/candle.png",
      }
      return {
        ...my_needs,
        ...VignetteEffect.getTextures(),
      }
    }

    constructor(scene, x, y) {
      super(scene, x, y, 'candle');
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      this.setScale(0.3); // Adjust the scale as needed
      this.candleHeld = true;
      this.maxVitality = 1000;
      this.vitality = this.maxVitality;
      this.setDepth(1);
      this.setInteractive();
      this.vignetteEffect = new VignetteEffect(scene, this);
  
      this.on('pointerdown', function(pointer) {
        this.candleHeld = !this.candleHeld;
      }, this);
  
      scene.input.on('pointermove', (pointer) => {
        if (this.candleHeld == false) return;
        // Calculate distance moved
        const distance = Phaser.Math.Distance.Between(this.x, this.y, pointer.x, pointer.y);
        this.vitality -= distance;
  
        this.x = pointer.x;
        this.y = pointer.y;
      });
    }
  
    update() {
      if (this.vitality <= 0) {
        this.destroy();
      }
      this.vitality += 10;
      this.setAlpha(this.vitality / this.maxVitality);
      this.vignetteEffect.update();
    }
  }