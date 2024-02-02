import { Character } from './sprites/character.js';
import { Enemy } from './sprites/enemy.js';

export class SpriteManager {
    static preload(scene) {
        console.log(Character);
        console.log(Enemy);
        Character.preload(scene);
        Enemy.preload(scene);
    }

    constructor(scene) {
        this.scene = scene;
        this.player = null;
        this.enemies = this.scene.physics.add.group();
    
    }

    handlePlayerEnemyCollision(player, enemy) {
        console.log('Enemy touched the player\n\n\n\n\n');
        enemy.destroy();
        //restart the game HARD
        this.scene.scene.restart();

      }
    createCharacter(x, y) {
        console.log('Creating character');
        if (this.player) {
            return ;
        }
        this.player = new Character(this.scene, x, y);
        this.scene.physics.add.collider(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
    
        const camera = this.scene.cameras.main;
        camera.startFollow(this.scene.spriteManager.player);
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
            if (!this.player) {
                return;
            }
            enemy.update(this.player);
        });
    }
}

