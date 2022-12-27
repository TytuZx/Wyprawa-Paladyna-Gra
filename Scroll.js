class Scroll extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){

      super(scene, x, y, "scroll");

      scene.add.existing(this);

      scene.physics.world.enableBody(this);

      scene.scrolls.add(this);
    }
}