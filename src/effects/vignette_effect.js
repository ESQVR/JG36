const ZERO_SCALE = 0.2;
const ONE_SCALE = 1.0;

export class VignetteEffect {
    static preload(scene) {
        scene.load.image('vignetteTexture', 'assets/visibility_mask_noColor.png');
    }

    static getTextures() {
        return {
            "vignetteTexture": "assets/visibility_mask_noColor.png",
        }
    }

    constructor(scene, targetSprite) {
        this.scene = scene;
        this.targetSprite = targetSprite;
        this.createVignette();
        this.current_scale = ONE_SCALE;
    }

    /*
    preload() {
        // Load your shader file
        this.load.glsl('vignetteShader', 'path/to/vignetteShader.glsl');
    }

    create() {
        // Create the shader
        const shader = this.add.shader('vignetteShader', 0, 0, this.scale.width, this.scale.height);

        // Set the vignette texture bounds
        shader.setUniform('vignetteSize.value', [vignetteWidth, vignetteHeight]);
        shader.setUniform('vignettePosition.value', [vignetteX, vignetteY]);

        // Add the shader to the scene
        this.add.existing(shader);
    }
    */
    createVignette() {
        // Create vignette graphic
        // let vignette = this.scene.add.graphics();
        // vignette.fillStyle(0x000000, 0.5);
        // vignette.fillCircle(0, 0, 100);
        // vignette.generateTexture('vignetteTexture', 200, 200);
        // vignette.destroy();

        // Create vignette sprite
        this.vignetteSprite = this.scene.add.sprite(0, 0, 'vignetteTexture');
        this.vignetteSprite.setOrigin(.5);
        this.vignetteSprite.setDepth(2);
        this.vignetteSprite.setScrollFactor(0);
        
        
    }

    update(light_value) {
        //console.log(random_flicker, this.current_scale);
        this.vignetteSprite.setScale(ZERO_SCALE * (1 - light_value) + ONE_SCALE * light_value);

        //follow target
        this.vignetteSprite.x = this.targetSprite.screen_x;
        this.vignetteSprite.y = this.targetSprite.screen_y;
    }
}