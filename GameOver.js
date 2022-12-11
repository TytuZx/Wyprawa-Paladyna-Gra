class GameOver extends Phaser.Scene{
    constructor(){
        super("gameover");
    }

    create(){
    this.add.text(config.width/4,config.height/2,"GAME OVER !!!",{font:"100px Arial", fill: "red"});
    }
}