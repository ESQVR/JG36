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
      ...Enemy.getTextures(),
    };
    for (const asset in assets) {
      this.load.image(asset, assets[asset]);
    }
    //Load Tilemap
    this.load.image('tiles', 'assets/test_tilemap.png');
  }
  create() {
    this.cameras.main.setBackgroundColor(0x0000ff);
    console.log('ExploreScene created');
    this.spriteManager = new SpriteManager(this);
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tiles', null, 48, 48, 0, 0);
    const layer = map.createStaticLayer("Layer 1", tileset);
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