import { Enemy } from './sprites/enemy.js';
import { Character } from './sprites/character.js';
import { SpriteManager } from './sprite_manager.js';
import { DungeonManager } from './dungeon_manager.js';
import { DialogueBox } from './dialogue_box.js';

let counter = 0;
export class ExploreScene extends Phaser.Scene {
  constructor() {
    super('ExploreScene')
    
    this.dungeonManager = new DungeonManager(this);
  }
  preload() {
    //TESTING BACKGROUND
    this.load.image('background', 'assets/Static_Test_Room_Bkgrd.png');

    //Load textures
    // const assets = {
    //   ...Character.getTextures(),
    //   ...Enemy.getTextures(),
    // };
    // for (const asset in assets) {
    //   this.load.image(asset, assets[asset]);
    // }
    SpriteManager.preload(this);
    DungeonManager.preload(this);
    DialogueBox.preload(this);
  }
  create() {
    this.spriteManager = new SpriteManager(this);
    //TESTING BACKGROUND
    let bg = this.add.image(0, 0, 'background');
    bg.setOrigin(0, 0);

    //this.cameras.main.setBackgroundColor(0x0000ff);
    console.log('ExploreScene created');


    // //spriteManager
    this.spriteManager = new SpriteManager(this);
    this.dungeonManager.create();


    const centerX = this.dungeonManager.map.widthInPixels / 2;
    const centerY = this.dungeonManager.map.heightInPixels / 2;

    console.log(centerX, centerY);
    this.spriteManager.createCharacter(centerX, centerY);
    this.spriteManager.createEnemy(200, 200);

    this.input.on('pointerdown', (pointer) => {
      const tileSize = this.dungeonManager.map.tileWidth;
      const tileX = Math.floor(pointer.worldX / tileSize);
      const tileY = Math.floor(pointer.worldY / tileSize);
  
      const clickedTile = this.dungeonManager.map.getTileAt(tileX, tileY);
  
      if (clickedTile) {
        // Do something with the clicked tile information
        console.log(`Clicked tile: ${tileX}, ${tileY}`);
        console.log(`Tile ID: ${clickedTile.index}`);
        const dialogue = new DialogueBox(this, 'Test ${clickedTile.index}', 500, 500);
      }
    });
  }

 
  update() {
    if (counter < 10)
    {
      counter++;
      console.log('ExploreScene update');
    }
    this.spriteManager.update();
    this.dungeonManager.update();
  }
}