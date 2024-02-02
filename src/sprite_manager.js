import { Character } from './sprites/character.js';
import { Enemy } from './sprites/enemy.js';
import { Candle } from './sprites/candle.js';

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
        this.scene.game.sound.stopAll();
        enemy.destroy();
        //go to darkness scene
        this.scene.scene.start('DarknessScene');

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
        camera.update();
        
        const candle_x = this.scene.game.input.mousePointer.x;
        const candle_y = this.scene.game.input.mousePointer.y;
        console.log('Creating my candle at', candle_x, candle_y, 'in character.js');
        this.player.candle = new Candle(this.scene, candle_x, candle_y);
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

