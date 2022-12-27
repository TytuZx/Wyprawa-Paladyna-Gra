class Health_Pack extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){

      super(scene, x, y, "Heartfull");

      scene.add.existing(this);

      scene.physics.world.enableBody(this);

      scene.health_packs.add(this);
    }
}