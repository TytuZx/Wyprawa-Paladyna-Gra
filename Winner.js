class Winner extends Phaser.Scene{
    constructor(){
        super("Winner");
    }

    preload(){
        this.load.image("win_screen", "assets/gui/Win.png");
    }

    create(){
        this.add.image(config.width/2,config.height/4,"win_screen")
        this.add.text(config.width/4,config.height/2,"Pokonales krola demonow, teraz mozesz pozwolic sobie na zasluzony odpoczynek.");
    }
}