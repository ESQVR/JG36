import { VignetteEffect } from '../effects/vignette_effect.js'; // Import the VignetteEffect class
import { GlowEffect } from '../effects/glow_effect.js'; // Import the GlowEffect class

export class Candle extends Phaser.Physics.Arcade.Sprite {
    static preload(scene) {
      scene.load.image('candle', 'assets/Infernus_Candles_5.png');
      VignetteEffect.preload(scene);
      GlowEffect.preload(scene);
    }
    static getTextures() {
      const my_needs = {
        "candle": "assets/candle.png",
      }
      return {
        ...my_needs,
        ...VignetteEffect.getTextures(),
        ...GlowEffect.getTextures()
      }
    }
    getBounds() {
      return new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
    }

    constructor(scene, x, y) {
      console.log('candle constructor')
      super(scene, x, y, 'candle');
      //console.log(this.player.x, this.player.y);
      console.log(this.x, this.y);
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      this.scene = scene;
      this.setScale(1); // Adjust the scale as needed
      this.candleHeld = true;
      this.maxVitality = 500;
      this.vitality = this.maxVitality;
      this.setDepth(1);
      this.setInteractive();
      //this.setScrollFactor(0);
      
      this.screen_x = x;
      this.screen_y = y;

      this.lightLevel = 1.0;
      this.vignetteEffect = new VignetteEffect(scene, this);
  

      this.on('pointerdown', function(pointer) {
        this.candleHeld = !this.candleHeld;
      }, this);
  
      scene.input.on('pointermove', (pointer) => {
        if (this.candleHeld == false) return;
        // Calculate distance moved
        const distance = Phaser.Math.Distance.Between(this.screen_x, this.screen_y, pointer.x, pointer.y);
        this.vitality -= distance;

        this.screen_x = pointer.x;
        this.screen_y = pointer.y;

      });

      //this.glowEffect = new GlowEffect(scene, this);
    }

    updateLightLevel() {
        const lightMax = 1.0;
        const lightMin = 0.0;
        const flickerRange = .1; // how much the flicker can change light level up or down
        const flickerDelta = 0.05; // how much the flicker can change per update
        const coreMin = lightMin + flickerRange;
        const coreMax = lightMax - flickerRange;

        const coreLight =  coreMin + (coreMax - coreMin) * (this.vitality / this.maxVitality);
        const randomDelta = Phaser.Math.FloatBetween(-flickerDelta, flickerDelta);
        
        this.lightLevel += randomDelta;
        if (this.lightLevel > coreLight + flickerRange) {
            this.lightLevel = coreLight + flickerRange;
        }
        if (this.lightLevel < coreLight - flickerRange) {
            this.lightLevel = coreLight - flickerRange;
        }
        //console.log(this.vitality, this.maxVitality);
        //console.log(this.lightLevel, coreLight, randomDelta);
    }

  
    update() {
        if (this.vitality <= 0) {
            //reload the scene
            console.log('candle is out\n\n\n\n\n\n\n');
            this.scene.game.sound.stopAll();
            // this.destroy();
            // console.log(this.scene);
            this.scene.scene.start('DarknessScene');
            return;
        }

        this.vitality += 10;
        this.vitality = Math.min(this.vitality, this.maxVitality);
        this.setAlpha(this.vitality / this.maxVitality);

        this.x = this.screen_x + this.scene.cameras.main.scrollX;
        this.y = this.screen_y + this.scene.cameras.main.scrollY;

        this.updateLightLevel();
        this.vignetteEffect.update(this.lightLevel);

        //disable vignette effect
        //this.vignetteEffect.update(1000);
    }
  }