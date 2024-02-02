import { ExploreScene } from "./explore_scene.js";

export class StartScene extends Phaser.Scene {
    preload() {
        this.load.image('myImage', 'assets/sep.png');
    }

    create() {
        const image = this.add.image(400, 300, 'myImage');
        image.setInteractive();
        console.log('Start scene created');
        
        image.on('pointerdown', () => {
            this.scene.start('ExploreScene');
        });
    }
}
export class SecondScene extends Phaser.Scene {
    create() {
        // Add content for the second scene here
        console.log('Second scene created');
        this.add.text(400, 300, 'Second scene!', { fontSize: '32px' });
    }
}