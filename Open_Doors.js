class Open_Doors extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){
      super(scene, x, y, "doors_open");
      scene.add.existing(this);
    }
}