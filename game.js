import { ExploreScene } from './src/explore_scene.js';

const SIZE_WIDTH_SCREEN = innerWidth
const SIZE_HEIGHT_SCREEN = window.innerHeight
import { StartScene } from './src/start_scene.js';
import { SecondScene } from './src/start_scene.js'; 

const config = {
    type: Phaser.AUTO,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN,
    scene: StartScene,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true,
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'game',
      width: SIZE_WIDTH_SCREEN,
      height: SIZE_HEIGHT_SCREEN,
    },
    dom: {
      createContainer: true
    },
  };
  
  const game = new Phaser.Game(config);
  game.scene.add('ExploreScene', new ExploreScene());
  game.scene.add('StartScene', new StartScene());
  game.scene.add('SecondScene', new SecondScene());

  const maxDistance = 200;// value never read

  game.screenBaseSize = {
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
}

game.orientation = "portrait"
