class GameOver extends Phaser.Scene{
    constructor(){
        super("gameover");
    }

    preload(){
        this.load.image("gameover_screen","assets/gui/gameover.png");
    }

    create(){
        this.add.image(config.width/2,config.height/4,"gameover_screen");

        this.add.text(config.width/3,config.height/2,"Nie zyjesz, ten loch stal sie twoim grobowcem\n\nChcesz sprobowac jeszcze raz?");

        
        var button = this.add.image(config.width/2,(config.height/2)+200,"button_normal").setInteractive();

        button.on('pointerover', function (event, gameObject) {
            button.setTexture("button_hover");
        });

        button.on('pointerout', function (event, gameObjects) {
            button.setTexture("button_normal");
        });

        button.on('pointerdown', function (event, gameObjects) {
            button.setTexture("button_pressed");

        });

        button.on('pointerup', function (event, gameObjects) {
            button.setTexture("button_hover");
            this.scene.start("bootGame");
        },this);
    }

    bootgame(){
        this.scene.start("bootGame");
    }
}