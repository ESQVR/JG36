precision mediump float;

// Texture containing the vignette or your scene
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

// Vignette texture bounds
uniform vec2 vignetteSize;
uniform vec2 vignettePosition; // Bottom-left corner

void main() {
    vec2 coord = outTexCoord;

    // Check if the current pixel is inside the vignette
    if (coord.x < vignettePosition.x || coord.x > vignettePosition.x + vignetteSize.x ||
        coord.y < vignettePosition.y || coord.y > vignettePosition.y + vignetteSize.y) {
        // Outside the vignette, render it black
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        // Inside the vignette, render the scene normally
        gl_FragColor = texture2D(uMainSampler, coord);
    }
}