

export class DarknessScene extends Phaser.Scene {
    create() {
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
        this.time.delayedCall(1000, () => {
            this.scene.start('ExploreScene');
        });
    }
}