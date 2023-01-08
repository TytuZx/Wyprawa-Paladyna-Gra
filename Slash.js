class Slash extends Phaser.GameObjects.Sprite{
    constructor(scene,faced){
        
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene,x,y,"Slash");

        scene.add.existing(this);

        scene.physics.world.enableBody(this);

        if (faced==1){
            this.setAngle(180)
            this.setScale(2)
            this.body.velocity.x = -1500;
        } else if (faced==2) {
            this.setAngle(0)
            this.setScale(2)
            this.body.velocity.x = +1500;
        } else if (faced==3) {
            this.setAngle(-90)
            this.setScale(2)
            this.body.velocity.y = -1500;
        } else if (faced==4) {
            this.setAngle(90)
            this.setScale(2)
            this.body.velocity.y = +1500;
        }

        scene.slashes.add(this);
    }

    update(){
        if(Phaser.Math.Distance.Between(this.x,this.y,this.scene.player.x,this.scene.player.y)>gameSettings.player_attack_range){
            this.destroy();
        }
    }
}
