class Closed_Doors extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){

      super(scene, x, y, "doors_closed");

      scene.add.existing(this);

      scene.doors.add(this);
    }
}