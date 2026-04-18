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
		this.load.spritesheet("sheet", "ToiletTalk-SpriteSheet.png", { frameWidth: 1080, frameHeight: 754.37});

		this.load.audio("ToiletSound", "ToyDuck.mp3");
	}

	create() {
		this.anims.create({
			key: "animation",
			frames: this.anims.generateFrameNumbers("sheet",{frames:[1,3,4,6,7,8,9]}),
			frameRate: 2,
			repeat: 0
		});

		this.ToiletLogo = this.add.sprite(400, 300, "sheet");
		this.ToiletLogo.setScale(0.5);
		this.ToiletSound = this.sound.add("ToiletSound");

		this.playing = false;
	}

	update() {
		const pointer = this.input.activePointer;
		
		if (pointer.isDown == true && this.playing == false)
		{
			this.playing = true;
			this.ToiletLogo.play("animation");
			this.sound.play("ToiletSound", {delay: 0.5});
		} else if (pointer.isDown == false && this.playing == true) {
			this.playing = false;
		}
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