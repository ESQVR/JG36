import { Character } from './sprites/character.js';
import { Enemy } from './sprites/enemy.js';

export class SpriteManager {
    constructor(scene) {
        this.scene = scene;
        this.player = null;
        this.enemies = this.scene.physics.add.group();
    
    }

    handlePlayerEnemyCollision(player, enemy) {
        console.log('Enemy touched the player');
        enemy.destroy();
      }
    createCharacter(x, y) {
        console.log('Creating character');
        if (this.player) {
            return ;
        }
        this.player = new Character(this.scene, x, y);
        this.scene.physics.add.collider(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
    }
    createEnemy(x, y) {
        const my_enemy = new Enemy(this.scene, x, y);
        this.enemies.add(my_enemy);
    }
    update() {
        if (this.player) {
            this.player.update();
        }

        this.enemies.getChildren().forEach(enemy => {
            enemy.update(this.player);
        });
    }
}
