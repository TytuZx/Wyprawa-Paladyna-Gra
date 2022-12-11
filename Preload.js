class Preload extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
        this.load.spritesheet("character", "assets/character/player.png",{frameWidth:75, frameHeight:75});
        this.load.spritesheet("zombie1", "assets/enemy/zombie1.png",{frameWidth:32, frameHeight:32});
        this.load.spritesheet("zombie2", "assets/enemy/zombie2.png",{frameWidth:32, frameHeight:32});
        this.load.spritesheet("zombie3", "assets/enemy/zombie3.png",{frameWidth:32, frameHeight:32});
        this.load.spritesheet("BOSS", "assets/enemy/boss.png",{frameWidth:96, frameHeight:48});
        this.load.image("Heartfull","assets/gui/heart_full.png");
        this.load.image("Heartempty","assets/gui/heart_empty.png");
        this.load.image("Slash","assets/gui/slash.png");
        this.load.image("blood","assets/gui/blood.png");
        this.load.image("scroll", "assets/items/scroll.png");
        this.load.image("item1", "assets/items/item1.png");
        this.load.image("item2", "assets/items/item2.png");
        this.load.image("item3", "assets/items/item3.png");
        this.load.image("doors_open","assets/castle/doors_leaf_open.png");
        this.load.image("doors_closed","assets/castle/doors_leaf_closed.png");
        this.load.image("floor1","assets/castle/floor_1.png");
        this.load.image("floor2","assets/castle/floor_2.png");
        this.load.image("floor3","assets/castle/floor_3.png");
        this.load.image("floor4","assets/castle/floor_4.png");
        this.load.image("floor5","assets/castle/floor_5.png");
        this.load.image("floor6","assets/castle/floor_6.png");
        this.load.image("floor7","assets/castle/floor_7.png");
        this.load.image("floor8","assets/castle/floor_8.png");
        this.load.image("wall_front1","assets/castle/wall_front1.png");
        this.load.image("wall_front2","assets/castle/wall_front2.png");
        this.load.image("wall_front3","assets/castle/wall_front3.png");
        this.load.image("wall_front4","assets/castle/wall_front4.png");
        this.load.image("wall_front5","assets/castle/wall_front5.png");
        this.load.image("wall_front6","assets/castle/wall_front6.png");
        this.load.image("wall_front7","assets/castle/wall_front7.png");
        this.load.image("wall_corner_left","assets/castle/wall_corner_left.png");
        this.load.image("wall_corner_right","assets/castle/wall_corner_right.png");
        this.load.image("wall_side_left","assets/castle/wall_side_left.png");
        this.load.image("wall_side_right","assets/castle/wall_side_right.png");
    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("load_player");
    }
}