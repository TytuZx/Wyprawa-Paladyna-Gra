class MainMenu extends Phaser.Scene{
    constructor(){
        super("mainmenu");
    }

    preload(){
        this.load.image("button_normal","assets/gui/button/normal.png");
        this.load.image("button_hover","assets/gui/button/hover.png");
        this.load.image("button_pressed","assets/gui/button/pressed.png");
        this.load.image("title","assets/gui/button/title.png");
    }

    create(){
        this.add.image(config.width/2,config.height/4,"title");

        var button = this.add.image(config.width/2,config.height/2,"button_normal").setInteractive();

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