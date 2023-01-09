class Loadplayer extends Phaser.Scene{
    constructor(){
        super("loadplayer");
    }

    create(){
        this.add.text(20,20,"Loading game...");
        
        this.anims.create({
            key: "player_move_left",
            frames: this.anims.generateFrameNumbers("character",{
                start:0,
                end:7
            }),
            frameRate:16,
            repeat:0
        });
        this.anims.create({
            key: "player_move_right",
            frames: this.anims.generateFrameNumbers("character",{
                start:8,
                end:15
            }),
            frameRate:16,
            repeat:0
        });
        this.anims.create({
            key: "player_move_down",
            frames: this.anims.generateFrameNumbers("character",{
                start:16,
                end:23
            }),
            frameRate:16,
            repeat:0
        });
        this.anims.create({
            key: "player_move_up",
            frames: this.anims.generateFrameNumbers("character",{
                start:24,
                end:31
            }),
            frameRate:16,
            repeat:0
        });
        this.anims.create({
            key: "player_attack_right",
            frames: this.anims.generateFrameNumbers("character",{
                start:32,
                end:39
            }),
            frameRate:64,
            repeat:0
        });
        this.anims.create({
            key: "player_attack_left",
            frames: this.anims.generateFrameNumbers("character",{
                start:40,
                end:47
            }),
            frameRate:64,
            repeat:0
        });
        this.anims.create({
            key: "player_attack_up",
            frames: this.anims.generateFrameNumbers("character",{
                start:48,
                end:55
            }),
            frameRate:64,
            repeat:0
        });
        this.anims.create({
            key: "player_attack_down",
            frames: this.anims.generateFrameNumbers("character",{
                start:56,
                end:63
            }),
            frameRate:64,
            repeat:0
        });

        this.scene.start("loadenemy");
    }
}
