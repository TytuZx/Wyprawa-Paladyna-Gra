class Splash extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){
      super(scene, x, y, "blood");
      scene.add.existing(this);
    }
  }