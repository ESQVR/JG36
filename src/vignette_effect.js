export class VignetteEffect {
    static getTextures() {
        return {
            "vignetteTexture": "assets/visibility_mask_noColor.png",
        }
    }

    constructor(scene, targetSprite) {
        this.scene = scene;
        this.targetSprite = targetSprite;
        this.createVignette();
    }

    createVignette() {
        // Create vignette graphic
        // let vignette = this.scene.add.graphics();
        // vignette.fillStyle(0x000000, 0.5);
        // vignette.fillCircle(0, 0, 100);
        // vignette.generateTexture('vignetteTexture', 200, 200);
        // vignette.destroy();

        // Create vignette sprite
        this.vignetteSprite = this.scene.add.sprite(0, 0, 'vignetteTexture');
        //this.vignetteSprite.setOrigin(0.5);
        this.vignetteSprite.setDepth(2);
        this.vignetteSprite.setScrollFactor(0);
        
    }

    update() {
        // Update vignette position to follow the target sprite
        this.vignetteSprite.x = this.targetSprite.x;
        this.vignetteSprite.y = this.targetSprite.y;
    }
}