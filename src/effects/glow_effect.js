const ZERO_SCALE = 0.2;
const ONE_SCALE = 1.0;

export class GlowEffect {
    static preload(scene) {
        scene.load.image('glowTexture', 'assets/light_for_flicker.png');
    }

    static getTextures() {
        return {
            "glowTexture": "assets/light_for_flicker.png",
        }
    }

    constructor(scene, targetSprite) {
        this.scene = scene;
        this.targetSprite = targetSprite;
        this.createGlow();a
        this.current_scale = ONE_SCALE;
    }

    createGlow() {
        this.mySprite = this.scene.add.sprite(0, 0, 'glowTexture');
        this.mySprite.setDepth(3);
        this.mySprite.setScrollFactor(0);
    }

    update(light_value) {
        this.mySprite.setScale(ZERO_SCALE * (1 - light_value) + ONE_SCALE * light_value);
    }
}