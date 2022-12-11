class Play extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    create(){
        this.Player_faced=1;
        this.Player_HP=gameSettings.player_max_hp;
        this.Scrolls_collected=0;       

        this.cursorKeys=this.input.keyboard.createCursorKeys();
        this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.world.setBoundsCollision();

        this.walls=this.physics.add.staticGroup();
        this.items=this.physics.add.staticGroup();
        this.slashes=this.add.group();
        this.zombies=this.physics.add.group();
        this.MakeRoom();

        this.player=this.physics.add.group();
        this.player=this.physics.add.sprite(config.width/2,config.height/2,"character");
        
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.walls, this.player);
        this.physics.add.collider(this.items, this.player);
        this.physics.add.collider(this.walls, this.zombies);
        this.physics.add.collider(this.items, this.zombies);
        this.physics.add.overlap(this.zombies, this.player, this.zombie_attack, null, this);
        this.physics.add.overlap(this.slashes, this.zombies, this.hitEnemy, null, this);


        this.cameras.main.setSize(config.width,config.height);
        this.cameras.main.startFollow(this.player);

        this.scrolls_display();
        this.hp_level_display();
    }

    update(){
        this.movePlayerManager();

        for (var i = 0; i < this.zombies.getChildren().length; i++) {
            var zombie = this.zombies.getChildren()[i];
            this.enemyFollows(zombie);
        }

        for (var i = 0; i < this.slashes.getChildren().length; i++) {
            var slash = this.slashes.getChildren()[i];
            slash.update();
        }
    }

    enemyFollows (zombie) {
        this.physics.moveToObject(zombie, this.player, gameSettings.zombie_speed);
        var rot=Math.round(Phaser.Math.Angle.Between(zombie.x, zombie.y, this.player.x, this.player.y))
        var nr=zombie.zombie_nr;
        if (rot==3 || rot==-3){
            zombie.anims.play("zombie"+nr+"_move_left",true);
        }else if(rot==-1 || rot==-2){
            zombie.anims.play("zombie"+nr+"_move_up",true);
        } else if(rot==0){
            zombie.anims.play("zombie"+nr+"_move_right",true);
        } else if(rot==2 || rot==1){
            zombie.anims.play("zombie"+nr+"_move_down",true);
        }
    }

    movePlayerManager(){
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.player_speed);
            this.player.anims.play("player_move_left",true);
            this.Player_faced=1;
        } else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.player_speed);
            this.player.anims.play("player_move_right",true);
            this.Player_faced=2;
        } else{
            this.player.setVelocityX(0);
        }

        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.player_speed);
            this.player.anims.play("player_move_up",true);
            this.Player_faced=3;
        } else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.player_speed);
            this.player.anims.play("player_move_down",true);
            this.Player_faced=4;
        }else{
            this.player.setVelocityY(0);
        }

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            if(this.Player_faced==1){
                this.player.anims.play("player_attack_left",true);
                var slash=new Slash(this,this.Player_faced);
            } else if(this.Player_faced==2){
                this.player.anims.play("player_attack_right",true);
                var slash=new Slash(this,this.Player_faced);
            } else if(this.Player_faced==3){
                this.player.anims.play("player_attack_up",true);
                var slash=new Slash(this,this.Player_faced);
            } else if(this.Player_faced==4){
                this.player.anims.play("player_attack_down",true);
                var slash=new Slash(this,this.Player_faced);
            }
        }
    }

    MakeRoom(){
        const sizeX=32;
        const sizeY=32;
        var X=Phaser.Math.Between(15,45);
        var Y=Phaser.Math.Between(15,25);
        var moveX=(config.width/2)-(X*sizeX/2);
        var moveY=(config.height/2)-(Y*sizeY/2);
        for(var i=0; i<=X;i++){
            for(var j=0;j<=Y;j++){
                if(j==0 || j==Y){
                    if(i==0){
                        this.walls.create((i*sizeX)+moveX,(j*sizeY)+moveY,"wall_corner_left").setScale(2);
                    } else if (i==X){
                        this.walls.create((i*sizeX)+moveX,(j*sizeY)+moveY,"wall_corner_right").setScale(2);
                    }else {
                        this.walls.create((i*sizeX)+moveX,(j*sizeY)+moveY,this.random_wall()).setScale(2);
                    }
                } else if(i==0) {
                    var floor=this.add.image((i*sizeX)+moveX,(j*sizeY)+moveY,this.random_floor()).setScale(2);
                    this.walls.create((i*sizeX)+moveX-(sizeX-10),(j*sizeY)+moveY,"wall_side_left").setScale(2);
                } else if(i==X) {
                    var floor=this.add.image((i*sizeX)+moveX,(j*sizeY)+moveY,this.random_floor()).setScale(2);
                    this.walls.create((i*sizeX)+moveX+(sizeX-10),(j*sizeY)+moveY,"wall_side_right").setScale(2);
                } else{
                    var floor=this.add.image((i*sizeX)+moveX,(j*sizeY)+moveY,this.random_floor()).setScale(2);
                    if(Math.random()>0.99){
                        this.items.create((i*sizeX)+moveX,(j*sizeY)+moveY,this.random_item());
                    }
                }

            }
        }
        var zombies_quantity=Phaser.Math.Between(1,gameSettings.zombie_max);
        for(var i=0;i<zombies_quantity; i++){
            var zombieX=0;
            var zombieY=0;
            if(Math.random()>0.5){
                zombieX=Phaser.Math.Between(moveX,moveX+(X*sizeX));
                if(Math.random()>0.5){
                    zombieY=Phaser.Math.Between(moveY,moveY+((Y*sizeY)/4));
                } else {
                    zombieY=Phaser.Math.Between(moveY+((3/4)*(Y*sizeY)),moveY+(Y*sizeY));
                }
            }else{
                if(Math.random()>0.5){
                    zombieX=Phaser.Math.Between(moveX,moveX+((X*sizeX)/4));
                } else {
                    zombieX=Phaser.Math.Between(moveX+((3/4)*(X*sizeX)),moveX+(X*sizeX));
                }
                zombieY=Phaser.Math.Between(moveY,moveY+(Y*sizeY));
            }
            var zombie=new Zombie(this,zombieX,zombieY,this.random_zombie());
        }
    }

    random_wall(){
        var random=Phaser.Math.Between(1,7);
        const wall=new String("wall_front"+random);
        return wall
    }

    random_floor(){
        var random=Phaser.Math.Between(1,8);
        const floor=new String("floor"+random);
        return floor
    }

    random_item(){
        var random=Phaser.Math.Between(1,3);
        const item=new String("item"+random);
        return item
    }

    random_zombie(){
        var random=Phaser.Math.Between(1,3);
        const zombie=new String("zombie"+random);
        return zombie
    }

    zombie_attack(){
        if(this.player.alpha < 1){
            return;
        }

        if(this.Player_HP<=1){
            this.scene.start("gameover")
        } else {
            this.Player_HP=this.Player_HP-1;
            this.player.alpha = 0.5;

            this.time.addEvent({
                delay: 1500,
                callback: this.set_player_vulnerable,
                callbackScope: this,
                loop: false
            });
            this.hp_level_display();
        }
    }

    set_player_vulnerable(){
        var tween=this.tweens.add({
            targets: this.player,
            duration: 1500,
            repeat:0,
        onComplete: function(){
            this.player.alpha = 1;
          },
        callbackScope:this 
        });
    }

    hitEnemy(slash, zombie) {
        var blood = new Splash(this, zombie.x, zombie.y);
        zombie.destroy();
        slash.destroy();
    }

    hp_level_display(){
        for(var i=0; i<gameSettings.player_max_hp; i++){
            if(i<this.Player_HP){
                this.HP_level=this.add.image((i*25)+20,30,"Heartfull").setScrollFactor(0);
            } else {
                this.HP_level=this.add.image((i*25)+20,30,"Heartempty").setScrollFactor(0);
            }
        }
    }

    scrolls_display(){
        this.scrolls_quantity=this.add.image(25,55,"scroll").setScale(0.2).setScrollFactor(0);
        this.add.text(50,50,this.Scrolls_collected+"/"+gameSettings.Scrolls_to_collect).setScrollFactor(0);
    }
}