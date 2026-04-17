//http://127.0.0.1:5500/
class CreditScene extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }
    
    preload() {
        this.load.path = "assets/";

        this.load.image("GoogleSlides-Logo","GoogleSlides-Logo.png");

        // this.load.atlas("Yoosung", "gifyoosungooh.gif", "gifyoosungooh.JSON");
        //this.load.image("Yoosung","gifyoosungooh.gif");
        this.load.spritesheet("sheet", "ToiletTalk-SpriteSheet.png", {
        frameWidth: 2388,
        frameHeight: 1668
        });
    }

    create() {
        this.anims.create({
            key: "animation",
            frames: this.anims.generateFrameNumbers("sheet",{frames:[0,1,2,3,4,5,6,7,8,9]}),
            frameRate: 16,
            repeat: 1
        });

        let ToiletLogo = this.add.sprite(400, 300, "sheet");

        ToiletLogo.play("animation");
    }

    update() {

    }
}

config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0xFFFFFF,
    scene: [CreditScene]
}

let game = new Phaser.Game(config);