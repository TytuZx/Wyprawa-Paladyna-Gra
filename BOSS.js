class BOSS extends Phaser.GameObjects.Sprite{
    constructor(scene,X,Y){

        super(scene,X,Y,"BOSS");

        scene.add.existing(this);

        scene.physics.world.enableBody(this);

        scene.boss.add(this);
    }
}