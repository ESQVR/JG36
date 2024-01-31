import { Enemy } from './enemy.js';

class ExploreScene extends Phaser.Scene {
  constructor() {
    super('ExploreScene')
  }
  function preload() {
    this.load.image('character', 'assets/char.png');
    this.load.image('object', 'assets/box.png');
    this.load.image('candle', 'assets/candle.png');
  }
}