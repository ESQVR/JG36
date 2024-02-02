export class Enemy extends Phaser.Physics.Arcade.Sprite {
	static preload(scene) {
		scene.load.spritesheet('enemy', 'assets/EnemyAnimation_50x50.png', {
			frameWidth: 50,
			frameHeight: 50
		});
	}

	// static getTextures() {
	// 	return {"enemy": "assets/test_blob.png"}
	// }

	constructor(scene, x, y) {
		super(scene, x, y, 'enemy');

    

		this.speed = 100;
		this.slowSpeedEquation = (disToCandle) => {
			// return this.speed
			// return this.speed * ((disToCandle / 200) - 1);
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
      //this.anims = scene.anims;
			this.anims.create({
				key: 'idle-enemy',
				frames: this.anims.generateFrameNumbers('enemy', {
					start: 4,
					end: 4
				}),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: 'walk-enemy',
				frames: this.anims.generateFrameNumbers('enemy', {
					start: 4,
					end: 7
				}),
				frameRate: 10,
				repeat: -1
			});
      this.anims.play('idle');
      //scene.add.existing(this);
			//this.anims.play('idle');
      scene.add.existing(this);
      scene.physics.add.existing(this);

      this.setInteractive();
      this.setCollideWorldBounds(true);
    }
	update(player) {
		const disToCandle = Phaser.Math.Distance.Between(this.x, this.y, player.candle.x, player.candle.y);
		const currSpeed = this.slowSpeedEquation(disToCandle);
		if (currSpeed < 60) {
			this.anims.play('idle-enemy', true);
		} else {
			this.anims.play('walk-enemy', true);
		}
		this.scene.physics.moveToObject(this, player, currSpeed);
	}
}
