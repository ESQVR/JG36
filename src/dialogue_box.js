export class DialogueBox {
    static preload(scene) {
      scene.load.image('dialogueBoxBackground', 'assets/box.png');
    }

    constructor(scene, message, x = 0, y = 0) {
      this.scene = scene;
      this.message = message;
      this.x = x;
      this.y = y;
  
      // Define private variables for dialogue box components
      this._dialogueBoxSprite;
      this._messageText;
  
      this.createDialogueBox();
    }
  
    createDialogueBox() {
      const { scene, x, y, message } = this;
  
      // Binding for consitent context for checkClick
      this.checkClick = this.checkClick.bind(this);

      // Create dialogue box sprites and position them
      this._dialogueBoxSprite = scene.add.sprite(x, y, 'dialogueBoxBackground');
      this._messageText = scene.add.text(x, y + 20, message, { fontSize: 20 });
  
      // Add listener for clicks anywhere on the screen
      scene.input.on('pointerdown', this.checkClick);
    }
  
    checkClick(pointer) {
      // Get dialogue box sprite boundaries
      //const boxBounds = this._dialogueBoxSprite.getBounds();
      console.log(this._dialogueBoxSprite.texture);
    //   const boxBounds = this._dialogueBoxSprite.texture.getBounds();
      const boxBounds = new Phaser.Geom.Rectangle(
        this._dialogueBoxSprite.x,
        this._dialogueBoxSprite.y,
        this._dialogueBoxSprite.texture.width,
        this._dialogueBoxSprite.texture.height
      );
  
      // Check if click was outside the box
      if (!boxBounds.contains(pointer.x, pointer.y)) {
        console.log("click outside box")
        this.hideDialogueBox();
      }
    }
  
    hideDialogueBox() {
      // Remove click listener
      this.scene.input.off('pointerdown', this.checkClick);
  
      // Destroy dialogue box components
      this._dialogueBoxSprite.destroy();
      this._messageText.destroy();
    }
  }