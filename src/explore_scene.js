import { Enemy } from './sprites/enemy.js';
import { Character } from './sprites/character.js';
import { SpriteManager } from './sprite_manager.js';
let counter = 0;
export class ExploreScene extends Phaser.Scene {
  constructor() {
    super('ExploreScene')
  }
  preload() {
    //Load textures
    const assets = {
      ...Character.getTextures(),
      ...Enemy.getTextures()
    };
    for (const asset in assets) {
      this.load.image(asset, assets[asset]);
    }
  }
  create() {
    console.log('ExploreScene created');
    this.spriteManager = new SpriteManager(this);
    this.spriteManager.createCharacter(100, 100);
    this.spriteManager.createEnemy(200, 200);
  }

 
  update() {
    if (counter < 10)
    {
      counter++;
      console.log('ExploreScene update');
    }
    this.spriteManager.update();
  }
}