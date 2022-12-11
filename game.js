    var config = {
        width: 1600,
        height: 900,
        background: 0x000000,
        scene: [Preload, Load_player, Load_enemy, Play, GameOver],
        physics: {
            default: "arcade",
            arcade:{
                debug:false
            }
        }
    }

    var gameSettings={
        player_speed:200,
        zombie_speed:100,
        Boss_speed:150,
        player_max_hp:10,
        Scrolls_to_collect:5,
        zombie_max:5,
    }

    var game = new Phaser.Game(config);