import { ExploreScene } from './src/explore_scene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: ExploreScene,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true,
      },
    },
  };
  
  const game = new Phaser.Game(config);
  const maxDistance = 200;