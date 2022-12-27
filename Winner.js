class Winner extends Phaser.Scene{
    constructor(){
        super("Winner");
    }

    create(){
    this.add.text(config.width/4,config.height/2,"You Win!!!",{font:"100px Arial", fill: "red"});
    }
}