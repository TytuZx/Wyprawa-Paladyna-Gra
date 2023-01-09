class Loadenemy extends Phaser.Scene{
    constructor(){
        super("loadenemy");
    }

    create(){
        this.add.text(20,20,"Loading game...");

        this.anims.create({
            key: "zombie1_move_down",
            frames: this.anims.generateFrameNumbers("zombie1",{
                start:0,
                end:2
            }),
            frameRate:20,
            repeat:0
        });
        this.anims.create({
            key: "zombie1_move_left",
            frames: this.anims.generateFrameNumbers("zombie1",{
                start:3,
                end:5
            }),
            frameRate:20,
            repeat:0
        });
        this.anims.create({
            key: "zombie1_move_right",
            frames: this.anims.generateFrameNumbers("zombie1",{
                start:6,
                end:8
            }),
            frameRate:20,
            repeat:0
        });
        this.anims.create({
            key: "zombie1_move_up",
            frames: this.anims.generateFrameNumbers("zombie2",{
                start:9,
                end:11
            }),
            frameRate:20,
            repeat:0
        });

        this.anims.create({
            key: "zombie2_move_down",
            frames: this.anims.generateFrameNumbers("zombie2",{
                start:0,
                end:2
            }),
            frameRate:20,
            repeat:0
        });
        this.anims.create({
            key: "zombie2_move_left",
            frames: this.anims.generateFrameNumbers("zombie2",{
                start:3,
                end:5
            }),
            frameRate:20,
            repeat:0
        });
        this.anims.create({
            key: "zombie2_move_right",
            frames: this.anims.generateFrameNumbers("zombie2",{
                start:6,
                end:8
            }),
            frameRate:20,
            repeat:0
        });
        this.anims.create({
            key: "zombie2_move_up",
            frames: this.anims.generateFrameNumbers("zombie2",{
                start:9,
                end:11
            }),
            frameRate:20,
            repeat:0
        });

        this.anims.create({
            key: "zombie3_move_down",
            frames: this.anims.generateFrameNumbers("zombie3",{
                start:0,
                end:2
            }),
            frameRate:20,
            repeat:0
        });
        this.anims.create({
            key: "zombie3_move_left",
            frames: this.anims.generateFrameNumbers("zombie3",{
                start:3,
                end:5
            }),
            frameRate:20,
            repeat:0
        });
        this.anims.create({
            key: "zombie3_move_right",
            frames: this.anims.generateFrameNumbers("zombie3",{
                start:6,
                end:8
            }),
            frameRate:20,
            repeat:0
        });
        this.anims.create({
            key: "zombie3_move_up",
            frames: this.anims.generateFrameNumbers("zombie3",{
                start:9,
                end:11
            }),
            frameRate:20,
            repeat:0
        });

        this.anims.create({
            key: "boss_move_down",
            frames: this.anims.generateFrameNumbers("BOSS",{
                start:0,
                end:2
            }),
            frameRate:6,
            repeat:0
        });
        this.anims.create({
            key: "boss_move_left",
            frames: this.anims.generateFrameNumbers("BOSS",{
                start:3,
                end:5
            }),
            frameRate:6,
            repeat:0
        });
        this.anims.create({
            key: "boss_move_right",
            frames: this.anims.generateFrameNumbers("BOSS",{
                start:6,
                end:8
            }),
            frameRate:6,
            repeat:0
        });
        this.anims.create({
            key: "boss_move_up",
            frames: this.anims.generateFrameNumbers("BOSS",{
                start:9,
                end:11
            }),
            frameRate:6,
            repeat:0
        });

        this.anims.create({
            key: "missile",
            frames: this.anims.generateFrameNumbers("missle",{
                start:0,
                end:8
            }),
            frameRate:32,
            repeat:-1
        });


        this.scene.start("playGame");
    }
}
