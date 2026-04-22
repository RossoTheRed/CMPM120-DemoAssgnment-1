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
		// this.load.spritesheet("sheet", "ToiletTalk-SpriteSheet.png", { frameWidth: 1080, frameHeight: 754.37});
		// this.load.audio("ToiletSound", "ToyDuck.mp3");

		// this.load.image("LoadIcon", "LoadIcon.png");
		this.load.image("LoadIconA", "LoadIcon2_A.png");
		this.load.image("LoadIconB", "LoadIcon2_B.png");
		this.load.video("ToiletTalkVid", "ToiletTalkLogoVid.mp4")
		this.load.image("PhaserLogo","phaser4-logo.png")
	}

	create() {
		this.anims.create({
			key: "animation",
			frames: this.anims.generateFrameNumbers("sheet",{frames:[1,3,4,6,7,8,9]}),
			frameRate: 3,
			repeat: 0
		});

		this.ToiletTalk = this.add.video(400,300,"ToiletTalkVid");
		this.ToiletTalk.setScale(0.9);
		this.ToiletTalk.alpha = 0;

		this.textObject = this.add.text(
			0,
			500,
			"Placeholder",
			{ font: "40px Arial", color: "#000000" }
		);

		this.loadIconA = this.add.image(0, 550, "LoadIconA");
		this.loadIconA.x = 800 - this.loadIconA.width/8;
		this.loadIconA.setScale(0.5);
		this.SpinIconA = this.tweens.add({
			targets: this.loadIconA, 
			persist: true,
			duration: 500,
			angle: 360,
			repeat: -1
		});

		this.loadIconB = this.add.image(0, 550, "LoadIconB");
		this.loadIconB.x = 800 - this.loadIconB.width / 8;
		this.loadIconB.setScale(0.5);
		this.SpinIconB = this.tweens.add({
			targets: this.loadIconB,
			persist: true,
			duration: 500,
			angle: 180,
			repeat: -1
		});

		this.loadText = this.add.text(0, 550, "Loading...", { font: "40px Arial", color: "#000000" });
		this.loadText.x = this.loadIconA.x - this.loadText.width * 1.35;
		this.loadText.y = 550 - this.loadText.height / 2;

		this.playing = false;

		this.ToiletTweenIn = this.tweens.add({
			targets: this.ToiletTalk,
			persist: true,
			alpha: {from: 0, to: 1},
			duration: 1000,
			ease: "Sine.In",
			repeat: 0
		});
		this.ToiletTweenOut = this.tweens.add({
			targets: this.ToiletTalk,
			persist: true,
			delay: 5000,
			alpha: { from: 1, to: 0 },
			duration: 2000,
			ease: "Sine.Out",
			repeat: 0
		});


		this.ToiletTweenIn.play();
		this.ToiletTalk.play();
		this.ToiletTweenOut.play();

		this.PhaserLogo = this.add.image(400,300,"PhaserLogo");
		this.PhaserLogo.setScale(0.5);
		this.PhaserLogo.alpha = 0;

		this.PhaserTweenIn = this.tweens.add({
			targets: this.PhaserLogo,
			persist: true,
			alpha: { from: 0, to: 1 },
			delay: 10000,
			duration: 1000,
			ease: "Sine.In",
			repeat: 0
		});
		this.PhaserTweenOut = this.tweens.add({
			targets: this.PhaserLogo,
			persist: true,
			delay: 15000,
			alpha: { from: 1, to: 0 },
			duration: 2000,
			ease: "Sine.Out",
			repeat: 0
		});

	}

	update() {	
		let mouse = this.input.activePointer;
		this.textObject.text = `Mouse: ${mouse.x},${mouse.y}`;
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