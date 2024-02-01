export class Enemy extends Phaser.Physics.Arcade.Sprite {
  static getTextures() {
    return {
        "enemy": "assets/test_blob.png",
    }
  }

  constructor(scene, x, y) {
    super(scene, x, y, 'enemy');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setInteractive();
    this.setCollideWorldBounds(true);

    this.speed = 100;
    this.slowSpeedEquation = (disToCandle) => {
      //return this.speed
      //return this.speed * ((disToCandle / 200) - 1);
      const minDis = 50;
      const maxDis = 250;
      if (disToCandle < minDis) {
        disToCandle = minDis;
      }
      if (disToCandle > maxDis) {
        disToCandle = maxDis;
      }
      return this.speed * ((disToCandle / maxDis));
    }
  }
  update(player) {
    const disToCandle = Phaser.Math.Distance.Between(this.x, this.y, player.candle.x, player.candle.y);
    const currSpeed = this.slowSpeedEquation(disToCandle);
    this.scene.physics.moveToObject(this, player, currSpeed);
  }
}