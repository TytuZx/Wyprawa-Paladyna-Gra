class Zombie extends Phaser.GameObjects.Sprite{
    constructor(scene,X,Y,zombie_sprite){

        super(scene,X,Y,zombie_sprite);

        this.zombie_nr=Phaser.Math.Between(1,3);

        scene.add.existing(this);

        scene.physics.world.enableBody(this);

        scene.zombies.add(this);


    }

    
    
}