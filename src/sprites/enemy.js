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
  }
  update(player) {
    this.scene.physics.moveToObject(this, player, 100);
  }
}