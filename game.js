import { ExploreScene } from './src/explore_scene.js';
import { StartScene } from './src/start_scene.js';
import { SecondScene } from './src/start_scene.js'; 

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: StartScene,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true,
      },
    },
  };
  
  const game = new Phaser.Game(config);
  game.scene.add('ExploreScene', new ExploreScene());
  game.scene.add('StartScene', new StartScene());
  game.scene.add('SecondScene', new SecondScene());

  const maxDistance = 200;