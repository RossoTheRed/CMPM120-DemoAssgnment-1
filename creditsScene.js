//http://127.0.0.1:5500/
class CreditScene extends Phaser.Scene {
	constructor() {
		super("creditScene");
	}
		
	preload() {
		this.load.path = "assets/";

		this.load.image("LoadIconA", "LoadIcon2_A.png");
		this.load.image("LoadIconB", "LoadIcon2_B.png");
		this.load.video("ToiletTalkVid", "ToiletTalkLogoVid.mp4")
		this.load.image("PhaserLogo","phaser4-logo.png")
	}

	create() {
		
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
		this.time.delayedCall(this.delayTime, this.ToiletTalk.play, [], this.ToiletTalk);
		this.ToiletTweenOut.play();

		this.PhaserLogo = this.add.image(400,300,"PhaserLogo");
		this.PhaserLogo.setScale(0.5);
		this.PhaserLogo.alpha = 0;

		this.PhaserTweenIn = this.tweens.add({
			targets: this.PhaserLogo,
			persist: true,
			alpha: { from: 0, to: 1 },
			delay: 8000,
			duration: 1000,
			ease: "Sine.In",
			repeat: 0
		});
		this.PhaserTweenOut = this.tweens.add({
			targets: this.PhaserLogo,
			persist: true,
			delay: 12000,
			alpha: { from: 1, to: 0 },
			duration: 2000,
			ease: "Sine.Out",
			repeat: 0
		});

		this.tweens.add({
			targets: [this.loadIconA, this.loadIconB, this.loadText],
			persist: true,
			delay: 14000,
			alpha: { from: 1, to: 0 },
			duration: 2000,
			ease: "Sine.Out",
			repeat: 0
		});

		this.timer = this.time.delayedCall(1/*6000*/, this.scene.start, ["menuScene"], this.scene);
	}

	update() {
		let mouse = this.input.activePointer;
		this.textObject.text = `Mouse: ${mouse.x},${mouse.y}\nTime Elapsed: ${Math.trunc(this.timer.elapsed)}`;
	}
}

class MenuScene extends Phaser.Scene {
	constructor() {
		super("menuScene");
	}

	preload() {
		this.load.path = "assets/";
		this.load.audio("mainBGM","GameMusic.mp3");
		this.load.audio("menuSelect","MenuSelect.mp3");
	}

	create() {
		this.textObject = this.add.text(
			0,
			500,
			"Placeholder",
			{ font: "40px Arial", color: "#ffffff" }
		);

		this.graphics = this.add.graphics();
		this.graphics.fillStyle(0x000000, 1);

		this.bg = this.graphics.fillRect(0, 0, 800, 600);
		this.bg.alpha = 0;
		this.sceneIntro = this.tweens.add({
			targets: this.bg,
			alpha: {from: 0, to: 1},
			duration: 2000,
			ease: "Sine.Out",
			repeat: 0
		});

		this.menuBGM = this.sound.add("mainBGM",{repeat: -1});
		this.sound.stopAll();
		this.menuBGM.play();

		this.title = this.add.text(400, 75, "SerenaGame", { font: "50px Arial", color: "#ffffff"});
		this.title.x = 400 - this.title.width/2;
		this.title.setFontStyle("italic");


		this.graphics.lineStyle(5, "0xffffff", 1);
		this.graphics.lineBetween(this.title.x, this.title.y + this.title.height, (this.title.x + this.title.width), this.title.y + this.title.height);

		this.menuSelect = this.sound.add("menuSelect");

		this.playButton = this.add.text(400, 200, "Play", { font: "50px Arial", color: "#ffffff" });
		this.playButton.x = 400 - this.playButton.width/2;
		this.playButton.setInteractive({useHandCursor: true});
		this.playButton.on("pointerdown", () =>
		{
			this.menuSelect.play();
			this.menuBGM.stop();
			this.time.delayedCall(500,this.scene.start,["creditScene"],this.scene);
		});
		this.playButton.on("pointerover", () => {
			this.playButton.setFontStyle("italic");
			this.playButton.setPadding({right: 2});
			this.playButton.x = 400 - this.playButton.width / 2;
		});
		this.playButton.on("pointerout", () => {
			this.playButton.setFontStyle("");
			this.playButton.setPadding({right: 0});
			this.playButton.x = 400 - this.playButton.width / 2;
		});

		this.settingsButton = this.add.text(400, 300, "Settings", { font: "50px Arial", color: "#ffffff" });
		this.settingsButton.setInteractive({ cursor: "not-allowed" });
		this.settingsButton.x = 400 - this.settingsButton.width / 2;
		this.settingsButton.on("pointerover", () => {
			this.settingsButton.setFontStyle("italic");
			this.settingsButton.setPadding({ right: 2 });
			this.settingsButton.x = 400 - this.settingsButton.width / 2;
		});
		this.settingsButton.on("pointerout", () => {
			this.settingsButton.setFontStyle("");
			this.settingsButton.setPadding({ right: 0 });
			this.settingsButton.x = 400 - this.settingsButton.width / 2;
		});

		this.quitButton = this.add.text(400, 400, "Quit", { font: "50px Arial", color: "#ffffff" });
		this.quitButton.x = 400 - this.quitButton.width / 2;
		this.quitButton.setInteractive({ useHandCursor: true });
		this.quitButton.on("pointerdown", () => {
			this.menuSelect.play();
			this.menuBGM.stop();
			this.time.delayedCall(500, this.scene.start, ["creditScene"], this.scene);
		});
		this.quitButton.on("pointerover", () => {
			this.quitButton.setFontStyle("italic");
			this.quitButton.setPadding({ right: 2 });
			this.quitButton.x = 400 - this.playButton.width / 2;
		});
		this.quitButton.on("pointerout", () => {
			this.quitButton.setFontStyle("");
			this.quitButton.setPadding({ right: 0 });
			this.quitButton.x = 400 - this.quitButton.width / 2;
		});

		// this.graphics.lineStyle(5, 0x000000, 0.5);
		// this.graphics.lineBetween(250, 100, 450, 100);
		
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
	scene: [CreditScene,MenuScene]
}

let game = new Phaser.Game(config);