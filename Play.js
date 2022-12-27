class Play extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    create(){
        this.Player_faced=1;
        this.Player_HP=gameSettings.player_max_hp;
        this.Scrolls_collected=0; 
        this.Boss_hp=gameSettings.Boss_HP_max;
        this.boss_appeared=false;  
        this.cooldown=false;  

        this.cursorKeys=this.input.keyboard.createCursorKeys();
        this.spacebar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.walls=this.physics.add.staticGroup();
        this.items=this.physics.add.staticGroup();
        this.doors=this.physics.add.staticGroup();
        this.scrolls=this.physics.add.group();
        this.health_packs=this.physics.add.group();
        this.slashes=this.add.group();
        this.missiles=this.add.group();
        this.zombies=this.physics.add.group();
        this.player=this.physics.add.group();
        this.boss=this.physics.add.group();

        this.MakeFirstRoom();

        this.player=this.physics.add.sprite(config.width/2,config.height/2,"character");
        
        this.physics.add.collider(this.walls, this.player);
        this.physics.add.collider(this.items, this.player);
        this.physics.add.collider(this.walls, this.zombies);
        this.physics.add.collider(this.items, this.zombies);
        this.physics.add.collider(this.doors, this.player, this.OpenDoors, null, this);
        this.physics.add.overlap(this.zombies, this.player, this.hit_player, null, this);
        this.physics.add.overlap(this.slashes, this.zombies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.slashes, this.boss, this.hitBoss, null, this);
        this.physics.add.overlap(this.missiles, this.player, this.hit_player, null, this);
        this.physics.add.overlap(this.health_packs, this.player, this.heal, null, this);
        this.physics.add.overlap(this.scrolls, this.player, this.scroll_pickup, null, this);


        this.cameras.main.setSize(config.width,config.height);
        this.cameras.main.startFollow(this.player);

        this.scrolls_display();
        this.hp_level_display();
        this.boss_hp_display(true);
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

        if (this.boss_appeared){
            this.bossFollows();
            this.Fire_missle();
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

    bossFollows () {
        var rot=Math.round(Phaser.Math.Angle.Between(this.boss.x, this.boss.y, this.player.x, this.player.y))
        if (rot==3 || rot==-3){
            this.boss.anims.play("boss_move_left",true);
        }else if(rot==-1 || rot==-2){
            this.boss.anims.play("boss_move_up",true);
        } else if(rot==0){
            this.boss.anims.play("boss_move_right",true);
        } else if(rot==2 || rot==1){
            this.boss.anims.play("boss_move_down",true);
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

    MakeFirstRoom(){
        var sizeX=gameSettings.TileSizeX;
        var sizeY=gameSettings.TileSizeY;
        var X=gameSettings.RoomSizeX;
        var Y=gameSettings.RoomSizeY;
        this.save_room_sizeY=0;
        this.moveX=(config.width/2)-(X*sizeX/2);
        this.moveY=(config.height/2)-(Y*sizeY/2);
        for(var i=0; i<=X;i++){
            for(var j=0;j<=Y;j++){
                if(j==0 || j==Y){
                    if(i==0){
                        this.walls.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,"wall_corner_left").setScale(2);
                    } else if (i==X){
                        this.walls.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,"wall_corner_right").setScale(2);
                    }else if(i==(X/2)-1 && j==Y) {
                        var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    }else if(i==(X/2) && j==Y) {
                        var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    }else if(i==(X/2)+1 && j==Y) {
                        var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                        var door=new Closed_Doors(this,(i*sizeX)+this.moveX,(j*sizeY)+this.moveY).setScale(2.9).setOrigin(0.85,0.8);
                    }else {
                        this.walls.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_wall()).setScale(2);
                    }
                } else if(i==0) {
                    var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    this.walls.create((i*sizeX)+this.moveX-(sizeX-10),(j*sizeY)+this.moveY,"wall_side_left").setScale(2);
                } else if(i==X) {
                    var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    this.walls.create((i*sizeX)+this.moveX+(sizeX-10),(j*sizeY)+this.moveY,"wall_side_right").setScale(2);
                } else{
                    var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    if (i==(X/2) || i==(X/2)-1 || i==(X/2)+1){
                    } else if(Math.random()>0.99){
                        this.items.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_item());
                    }
                }

            }
        }
        var scroll= new Scroll(this,Phaser.Math.Between(this.moveX,this.moveX+(X*sizeX)),Phaser.Math.Between(this.moveY,this.moveY+(Y*sizeY))).setScale(0.25);
    }

    MakeRoom(){
        var sizeX=gameSettings.TileSizeX;
        var sizeY=gameSettings.TileSizeY;
        var X=gameSettings.RoomSizeX;
        var Y=gameSettings.RoomSizeY;
        this.save_room_sizeY=this.save_room_sizeY+(Y*sizeY);
        this.moveX=(config.width/2)-(X*sizeX/2);
        this.moveY=((config.height/2)-(Y*sizeY/2))+this.save_room_sizeY;
        for(var i=0; i<=X;i++){
            for(var j=0;j<=Y;j++){
                if(j==0 || j==Y){
                    if(i==0){
                        this.walls.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,"wall_corner_left").setScale(2);
                    } else if (i==X){
                        this.walls.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,"wall_corner_right").setScale(2);
                    }else if(i==(X/2)-1 && j==0) {
                    }else if(i==(X/2) && j==0){
                    }else if(i==(X/2)+1 && j==0){ 
                    }else if(i==(X/2)-1 && j==Y) {
                        var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    }else if(i==(X/2) && j==Y) {
                        var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    }else if(i==(X/2)+1 && j==Y) {
                        var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                        var door=new Closed_Doors(this,(i*sizeX)+this.moveX,(j*sizeY)+this.moveY).setScale(2.9).setOrigin(0.85,0.8);
                    }else {
                        this.walls.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_wall()).setScale(2);
                    }
                } else if(i==0) {
                    var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    this.walls.create((i*sizeX)+this.moveX-(sizeX-10),(j*sizeY)+this.moveY,"wall_side_left").setScale(2);
                } else if(i==X) {
                    var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    this.walls.create((i*sizeX)+this.moveX+(sizeX-10),(j*sizeY)+this.moveY,"wall_side_right").setScale(2);
                } else{
                    var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    if (i==(X/2) || i==(X/2)-1 || i==(X/2)+1){
                    } else if(Math.random()>0.99){
                        this.items.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_item());
                    }
                }

            }
        }
        var zombies_quantity=Phaser.Math.Between(1,gameSettings.zombie_max);
        for(var i=0;i<zombies_quantity; i++){
            var zombieX=0;
            var zombieY=0;
            zombieX=Phaser.Math.Between(this.moveX,this.moveX+(X*sizeX));
            zombieY=Phaser.Math.Between(this.moveY,this.moveY+(Y*sizeY));
            var zombie=new Zombie(this,zombieX,zombieY,this.random_zombie());
        }
        if(Math.random()>0.5){
            var HP_pack= new Health_Pack(this,Phaser.Math.Between(this.moveX,this.moveX+(X*sizeX)),Phaser.Math.Between(this.moveY,this.moveY+(Y*sizeY)));
        }
        if(Math.random()>0.5){
            var scroll= new Scroll(this,Phaser.Math.Between(this.moveX,this.moveX+(X*sizeX)),Phaser.Math.Between(this.moveY,this.moveY+(Y*sizeY))).setScale(0.25);
        }
    }

    MakeBOSSroom(){
        var sizeX=gameSettings.TileSizeX;
        var sizeY=gameSettings.TileSizeY;
        var X=gameSettings.RoomSizeX;
        var Y=gameSettings.RoomSizeY;
        this.save_room_sizeY=this.save_room_sizeY+(Y*sizeY);
        this.moveX=(config.width/2)-(X*sizeX/2);
        this.moveY=((config.height/2)-(Y*sizeY/2))+this.save_room_sizeY;
        for(var i=0; i<=X;i++){
            for(var j=0;j<=Y;j++){
                if(j==0 || j==Y){
                    if(i==0){
                        this.walls.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,"wall_corner_left").setScale(2);
                    } else if (i==X){
                        this.walls.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,"wall_corner_right").setScale(2);
                    }else if(i==(X/2)-1 && j==0) {
                    }else if(i==(X/2) && j==0){
                    }else if(i==(X/2)+1 && j==0){ 
                    }else {
                        this.walls.create((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_wall()).setScale(2);
                    }
                } else if(i==0) {
                    var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    this.walls.create((i*sizeX)+this.moveX-(sizeX-10),(j*sizeY)+this.moveY,"wall_side_left").setScale(2);
                } else if(i==X) {
                    var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                    this.walls.create((i*sizeX)+this.moveX+(sizeX-10),(j*sizeY)+this.moveY,"wall_side_right").setScale(2);
                } else{
                    var floor=this.add.image((i*sizeX)+this.moveX,(j*sizeY)+this.moveY,this.random_floor()).setScale(2);
                }
            }
        }
        this.boss=new BOSS(this,(this.moveX+this.moveX+(X*sizeX))/2,(this.moveY+this.moveY+(Y*sizeY))/2).setScale(2.5);
        this.boss_appeared=true;
        this.boss_hp_display(false);
        
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

    hit_player(){
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

    hitBoss(slash) {
        var blood = new Splash(this, slash.x, slash.y);
        this.boss.depth=99;
        slash.destroy();
        this.Boss_hp--;
        if(this.Boss_hp<=0){
            this.scene.start("Winner")
        } else{
        this.boss_hp_display(false);
        }
    }

    Fire_missle(){
        if(!this.cooldown){
        var rot=Phaser.Math.Angle.Between(this.boss.x, this.boss.y, this.player.x, this.player.y)
        var missile = new Missile(this, this.boss.x, this.boss.y, rot)
        missile.anims.play("missile",true)
        this.cooldown=true;
        this.time.addEvent({
            delay: gameSettings.Boss_atackspeed,
            callback: this.cooldown_boss_fire,
            callbackScope: this,
            loop: false
        });
        } else {
            return;
        }
    }

    cooldown_boss_fire(){
        var tween=this.tweens.add({
            targets: this.cooldown,
            duration: gameSettings.Boss_atackspeed,
            repeat:0,
        onComplete: function(){
            this.cooldown=false;
          },
        callbackScope:this 
        });
    }

    OpenDoors(player, doors){
        if(this.zombies.getChildren().length<=0){      
            var open_door=new Open_Doors(this, doors.x, doors.y).setScale(2.9).setOrigin(0.85,0.8);
            doors.destroy();
            if(this.Scrolls_collected==gameSettings.Scrolls_to_collect){
                this.MakeBOSSroom();
            }else{
                this.MakeRoom();
            }
            this.hp_level_display()
            this.scrolls_display()
            player.depth=100;
        }
    }

    heal(player,pack){
        if(this.Player_HP!=gameSettings.player_max_hp){
            this.Player_HP+=1;
            pack.destroy();
            this.hp_level_display();
        }
    }

    scroll_pickup(player,scroll){
        if(this.zombies.getChildren().length<=0){
            this.Scrolls_collected+=1;
            scroll.destroy();
            this.scrolls_display()
        }
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
        if(this.scroll_display_created==true){
            this.text_scroll.destroy();
        }
        this.scrolls_quantity=this.add.image(25,55,"scroll").setScale(0.2).setScrollFactor(0);
        this.text_scroll=this.add.text(50,50,this.Scrolls_collected+"/"+gameSettings.Scrolls_to_collect).setScrollFactor(0);
        this.scroll_display_created=true;
    }

    boss_hp_display(check){
        for(var i=0; i<gameSettings.Boss_HP_max; i++){
            if(i<this.Boss_hp){
                this.HP_level_boss=this.add.image((i*30)+(config.width/2),30,"Heartfull").setScrollFactor(0).setScale(2);
                if(check==true){
                    this.HP_level_boss.alpha=0;
                }
            } else {
                this.HP_level_boss=this.add.image((i*30)+(config.width/2),30,"Heartempty").setScrollFactor(0).setScale(2);
                if(check==true){
                    this.HP_level_boss.alpha=0;
                }
            }
        }
    }
}