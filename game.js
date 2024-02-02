import { ExploreScene } from './src/explore_scene.js';

const SIZE_WIDTH_SCREEN = innerWidth
const SIZE_HEIGHT_SCREEN = window.innerHeight

const config = {
    type: Phaser.AUTO,
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
    scene: [ExploreScene]
  };
  
  const game = new Phaser.Game(config);
  const maxDistance = 200;// value never read

  game.screenBaseSize = {
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
}

game.orientation = "portrait"
