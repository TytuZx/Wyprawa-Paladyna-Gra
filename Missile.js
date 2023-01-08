class Missile extends Phaser.GameObjects.Sprite{
    constructor(scene,X,Y,rot){
        
        super(scene,X,Y,"missile");

        scene.add.existing(this);

        scene.physics.world.enableBody(this);

        this.setRotation(rot);

        scene.physics.velocityFromRotation(rot, gameSettings.Boss_missle_speed, this.body.velocity);

        scene.missiles.add(this);
    }

    update(){
        if(Phaser.Math.Distance.Between(this.X,this.Y,this.scene.boss.x,this.scene.boss.y)>1000){
            this.destroy();
        }
    }
}