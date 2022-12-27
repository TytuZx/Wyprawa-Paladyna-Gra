    var config = {
        width: 1600,
        height: 900,
        background: 0x000000,
        scene: [Preload, Load_player, Load_enemy, Play, GameOver,Winner],
        physics: {
            default: "arcade",
            arcade:{
                debug:false
            }
        }
    }

    var gameSettings={
        RoomSizeX:30,
        RoomSizeY:20,
        TileSizeX:32,
        TileSizeY:32,

        player_speed:200,
        player_attack_range:50,
        player_max_hp:10,

        Scrolls_to_collect:5,

        zombie_speed:100,
        zombie_max:5,
        Boss_speed:150,
        Boss_HP_max:5,
        Boss_atackspeed:500
    }

    var game = new Phaser.Game(config);