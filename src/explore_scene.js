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

    this.load.audio('main_music', ['assets/audio/Main_Game_Theme.mp3']);
    
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

    // const main_music = this.sound.add('main_music', { loop: true });
    // main_music.play();


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
        //return if candle is held
        if (this.spriteManager.player.candle.candleHeld == true) return;

        // Do something with the clicked tile information
        console.log(`Clicked tile: ${tileX}, ${tileY}`);
        const formatted_string = `Tile ID: ${clickedTile.index}`
        console.log(formatted_string);

        // return if the tile index is undefined
        if (!clickedTile.index) return;

        const boxX = this.cameras.main.centerX - 50;
        const boxY = this.cameras.main.centerY - 50;

        let data = "farce";
        if (clickedTile.index == 81) {
          data = "Let me enter";
        } else if (clickedTile.index == 205 || clickedTile.index == 186) {
          data = "The path";
        } else if (clickedTile.index == 166)
        {
          data = "of Darkness";
        }
        else {data = formatted_string;}
        const dialogue = new DialogueBox(this, data, boxX, boxY);
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