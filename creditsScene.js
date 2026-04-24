//http://127.0.0.1:5500/
class IntroScene extends Phaser.Scene {
	constructor() {
		super("introScene");
	}
		
	preload() {
		this.load.path = "assets/";

		this.load.image("LoadIconA", "LoadIcon2_A.png");
		this.load.image("LoadIconB", "LoadIcon2_B.png");
		this.load.video("ToiletTalkVid", "ToiletTalkLogoVid.mp4")
		this.load.image("PhaserLogo","phaser4-logo.png")
	}

	create() {
		this.graphics = this.add.graphics();
		this.graphics.fillStyle(0xFFFFFF, 1);
		this.bg = this.graphics.fillRect(0, 0, 800, 600);
		

		this.ToiletTalk = this.add.video(400,300,"ToiletTalkVid");
		this.ToiletTalk.setScale(0.9);
		this.ToiletTalk.alpha = 0;

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

		//sceneOutro
		this.tweens.add({
			targets: this.bg,
			delay: 16000,
			alpha: { from: 1, to: 0 },
			duration: 2000,
			ease: "Sine.Out",
			repeat: 0
		});
		this.timer = this.time.delayedCall(20000, this.scene.start, ["menuScene"], this.scene);
	}

	update() {	}
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
		this.graphics = this.add.graphics();

		this.menuBGM = this.sound.add("mainBGM", { repeat: -1, config: { volume: 0.25 } });
		this.sound.stopAll();
		this.menuBGM.play();
		this.menuBGM.setVolume(0.25);

		this.title = this.add.text(400, 75, "SerenaGame", { font: "50px Arial", color: "#ffffff"});
		this.title.x = 400 - this.title.width/2;
		this.title.setFontStyle("italic");


		this.graphics.lineStyle(5, "0xffffff", 1);
		this.selectLine = this.graphics.lineBetween(this.title.x, this.title.y + this.title.height, (this.title.x + this.title.width), this.title.y + this.title.height);
		//this.selectLine.setOrigin(this.title.x, this.title.y + this.title.height);

		this.menuSelect = this.sound.add("menuSelect");

		//Play Button
		this.playButton = this.add.text(400, 200, "Play", { font: "50px Arial", color: "#ffffff" });
		this.playButton.x = 400 - this.playButton.width/2;
		this.playButton.setInteractive({useHandCursor: true});
		this.playButton.on("pointerdown", () =>
		{
			this.menuSelect.play();
			this.menuBGM.stop();
			this.time.delayedCall(500,this.scene.start,["storyScene"],this.scene);
		});
		this.playButton.on("pointerover", () => {
			this.playButton.setFontStyle("italic");
			this.playButton.setPadding({right: 2});
			this.playButton.x = 400 - this.playButton.width / 2;

			// this.tweens.add({
			// 	targets: this.selectLine,
			// 	x: this.playButton.x,
			// 	y: this.playButton.y + this.playButton.height/2,
			// 	ease: "ease.InOut",
			// 	displayWidth: this.playButton.width
				
			// });
		});
		this.playButton.on("pointerout", () => {
			this.playButton.setFontStyle("");
			this.playButton.setPadding({right: 0});
			this.playButton.x = 400 - this.playButton.width / 2;

			// this.tweens.add({
			// 	targets: this.selectLine,
			// 	x: 0, //this.title.x,
			// 	y: 0, //this.title.y + this.title.height,
			// 	ease: "ease.InOut",
			// 	displayWidth: this.title.width
			// });
		});

		//Credits Button
		this.creditsButton = this.add.text(400, 300, "Project Credits", { font: "50px Arial", color: "#ffffff" });
		this.creditsButton.x = 400 - this.creditsButton.width / 2;
		this.creditsButton.setInteractive({ useHandCursor: true });
		this.creditsButton.on("pointerdown", () => {
			this.menuSelect.play();
			this.menuBGM.stop();
			this.time.delayedCall(500, this.scene.start, ["creditScene"], this.scene);
		});
		this.creditsButton.on("pointerover", () => {
			this.creditsButton.setFontStyle("italic");
			this.creditsButton.setPadding({ right: 2 });
			this.creditsButton.x = 400 - this.creditsButton.width / 2;

			// this.tweens.add({
			// 	targets: this.selectLine,
			// 	x: this.creditsButton.x,
			// 	y: this.creditsButton.y + this.creditsButton.height/2,
			// 	ease: "ease.InOut",
			// 	displayWidth: this.creditsButton.width

			// });
		});
		this.creditsButton.on("pointerout", () => {
			this.creditsButton.setFontStyle("");
			this.creditsButton.setPadding({ right: 0 });
			this.creditsButton.x = 400 - this.creditsButton.width / 2;

			// this.tweens.add({
			// 	targets: this.selectLine,
			// 	x: 0, //this.title.x,
			// 	y: 0, //this.title.y + this.title.height,
			// 	ease: "ease.InOut",
			// 	displayWidth: this.title.width
			// });
		});

		// Settings Button
		this.settingsButton = this.add.text(400, 400, "Settings", { font: "50px Arial", color: "#ffffff" });
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

		//Quit button
		this.quitButton = this.add.text(400, 500, "Quit", { font: "50px Arial", color: "#ffffff" });
		this.quitButton.x = 400 - this.quitButton.width / 2;
		this.quitButton.setInteractive({ useHandCursor: true });
		this.quitButton.on("pointerdown", () => {
			this.menuSelect.play();
			this.menuBGM.stop();
			this.time.delayedCall(500, this.scene.start, ["introScene"], this.scene);
		});
		this.quitButton.on("pointerover", () => {
			this.quitButton.setFontStyle("italic");
			this.quitButton.setPadding({ right: 2 });
			this.quitButton.x = 400 - this.quitButton.width / 2;
		});
		this.quitButton.on("pointerout", () => {
			this.quitButton.setFontStyle("");
			this.quitButton.setPadding({ right: 0 });
			this.quitButton.x = 400 - this.quitButton.width / 2;
		});

		// this.graphics.lineStyle(5, 0x000000, 0.5);
		// this.graphics.lineBetween(250, 100, 450, 100);
		
	}

	update() {	}
}


class StoryScene extends Phaser.Scene {
	constructor() {
		super("storyScene");
	}

	preload() {
		this.load.path = "assets/";
		this.load.audio("storyBGM", "toby fox - UNDERTALE Soundtrack - 01 Once Upon a Time.mp3");
	}

	create() {
		this.storyBGM = this.sound.add("storyBGM", { repeat: -1 });
		this.sound.stopAll();
		this.storyBGM.setVolume(0.25);
		this.storyBGM.play();

		this.fadeTime = 3000;
		this.fadeDelay = 5000;

		//Text objects
		this.text_lvl1 = this.make.text({
			x: 100,
			y: 100,
			text: "In the land of FantasyWorld you are a royal knight.You have served as the protector of prince Robert for many years.",
			style: { font: "30px Arial", fill: "#FFFFFF", wordWrap: {width: 600}, align: "center"}
		});
		this.text_lvl1.alpha = 0;

		this.text_lvl2 = this.make.text({
			x: 100,
			y: this.text_lvl1.y + this.text_lvl1.height*1.5,
			text: "One day the evil sorceress Serena captures the prince and curses the land to become pixelated and randomly generated.",
			style: { font: "30px Arial", fill: "#FFFFFF", wordWrap: { width: 600 }, align: "center" }
		});
		this.text_lvl2.alpha = 0;

		this.text_lvl3 = this.make.text({
			x: 100,
			y: this.text_lvl2.y + this.text_lvl2.height * 1.5,
			text: "You must rescue the prince before it's too late!",
			style: { font: "30px Arial", fill: "#FFFFFF", wordWrap: { width: 600 }, align: "center" }
		});
		this.text_lvl3.alpha = 0;

		//Tween ins
		this.tweenIn_lvl1 = this.tweens.add({
			targets: this.text_lvl1,
			alpha: { from: 0, to: 1 },
			duration: this.fadeLength,
			persist: true,
			//delay: this.fadeDelay,
			repeat: 0
		});

		this.tweenIn_lvl2 = this.tweens.add({
			targets: this.text_lvl2,
			alpha: { from: 0, to: 1 },
			duration: this.fadeLength,
			persist: true,
			delay: this.fadeDelay,
			repeat: 0
		});

		this.tweenIn_lvl3 = this.tweens.add({
			targets: this.text_lvl3,
			alpha: { from: 0, to: 1 },
			duration: this.fadeLength,
			persist: true,
			delay:2*this.fadeDelay,
			repeat: 0
		});

		//Tween outs
		this.tweenOut_lvl1 = this.tweens.add({
			targets: this.text_lvl1,
			alpha: { from: 1, to: 0 },
			duration: this.fadeTime,
			persist: true,
			delay: 2 * this.fadeDelay,
			//ease: "Sine.Out",
			repeat: 0
		});

		this.tweenOut_lvl2 = this.tweens.add({
			targets: this.text_lvl2,
			alpha: { from: 1, to: 0 },
			duration: this.fadeTime,
			persist: true,
			delay: 3 * this.fadeDelay,
			//ease: "Sine.Out",
			repeat: 0
		});

		this.tweenOut_lvl3 = this.tweens.add({
			targets: this.text_lvl3,
			alpha: { from: 1, to: 0 },
			duration: this.fadeTime,
			persist: true,
			delay: 4 * this.fadeDelay,
			//ease: "Sine.Out",
			repeat: 0
		});

		this.time.delayedCall(4.5*this.fadeDelay + this.fadeTime,this.scene.start,["menuScene"],this.scene);
	}

	update() {	}
}
class CreditScene extends Phaser.Scene {
	constructor() {
		super("creditScene");
	}

	preload() {
		this.load.path = "assets/";
		this.load.audio("mainBGM", "GameMusic.mp3");
		this.load.audio("menuSelect", "MenuSelect.mp3");
		this.load.image("musicIcon","musicNoteIcon.png");
		this.load.image("soundIcon", "soundIcon.png");
		this.load.image("toiletLogo", "ToiletTalk-LogoCropped.png");
		this.load.image("phaserLogo", "phaser4-logo.png");
	}

	create() {
		this.graphics = this.add.graphics();

		this.menuBGM = this.sound.add("mainBGM", { repeat: -1, config: { volume: 0.25 } });
		this.sound.stopAll();
		this.menuBGM.play();
		this.menuBGM.setVolume(0.25);

		this.title = this.add.text(400, 25, "Project Credits", { font: "50px Arial", color: "#ffffff" });
		this.title.x = 400 - this.title.width / 2;
		this.title.setFontStyle("italic");


		this.graphics.lineStyle(5, "0xffffff", 1);
		this.selectLine = this.graphics.lineBetween(this.title.x, this.title.y + this.title.height, (this.title.x + this.title.width), this.title.y + this.title.height);
		//this.selectLine.setOrigin(this.title.x, this.title.y + this.title.height);

		this.menuSelect = this.sound.add("menuSelect");

		this.musicIcon1 = this.add.image(100,150,"musicIcon");
		this.musicText1 = this.make.text({
			x: this.musicIcon1.x + this.musicIcon1.width/2,
			y: this.musicIcon1.y - this.musicIcon1.height/2,
			text: "Menu music \"Video Game Menu Music\" by magmadiverrr on FreeSound.org",
			style: { font: "20px Arial", fill: "#FFFFFF", wordWrap: { width: 300 }, align: "center" }
		});

		this.musicIcon2 = this.add.image(450, 150, "musicIcon");
		this.musicText2 = this.make.text({
			x: this.musicIcon2.x + this.musicIcon2.width/2,
			y: this.musicIcon2.y - this.musicIcon2.height / 2,
			text: "Story music \"Once Upon A Time\" by Toby Fox from Undertale",
			style: { font: "20px Arial", fill: "#FFFFFF", wordWrap: { width: 300 }, align: "center" }
		});

		this.soundIcon1 = this.add.image(100, 250, "soundIcon");
		this.soundText1 = this.make.text({
			x: this.soundIcon1.x + this.soundIcon1.width/2,
			y: this.soundIcon1.y - this.soundIcon1.height / 2,
			text: "Menu select sound \"Menu Select\" by Pumodi on FreeSound.org",
			style: { font: "20px Arial", fill: "#FFFFFF", wordWrap: { width: 300 }, align: "center" }
		});

		this.soundIcon2 = this.add.image(450, 250, "soundIcon");
		this.soundText2 = this.make.text({
			x: this.soundIcon2.x + this.soundIcon2.width / 2,
			y: this.soundIcon2.y - this.soundIcon2.height / 2,
			text: "Toilet Quack 1 \"TOONAnml-Blue Snowball Microphone, CU_Duck Whistle, Single Quack 02_Nicholas Judy_TDC\" by designerschoice on FreeSound.org",
			style: { font: "20px Arial", fill: "#FFFFFF", wordWrap: { width: 300 }, align: "center" }
		});
		
		this.soundIcon3 = this.add.image(100, 350, "soundIcon");
		this.soundText3 = this.make.text({
			x: this.soundIcon3.x + this.soundIcon3.width / 2,
			y: this.soundIcon3.y - this.soundIcon3.height / 2,
			text: "Toilet Quack 2 \"Quack_Fart_Noise_44K\" by stereostory on FreeSound.org",
			style: { font: "20px Arial", fill: "#FFFFFF", wordWrap: { width: 300 }, align: "center" }
		});

		this.logoIcon1 = this.add.image(100, 450, "toiletLogo");
		this.logoIcon1.setScale(0.1)
		this.logoText1 = this.make.text({
			x: this.logoIcon1.x + 40,// + this.logoIcon1.width / 2,
			y: this.logoIcon1.y,// - this.logoIcon1.height / 2,
			text: "Toilet Talk Logo by my friend Curren",
			style: { font: "20px Arial", fill: "#FFFFFF", wordWrap: { width: 300 }, align: "center" }
		});

		this.logoIcon2 = this.add.image(600, 450, "phaserLogo");
		this.logoIcon2.setScale(0.2)
		this.logoText2 = this.make.text({
			x: this.logoIcon2.x - 100,// - this.logoIcon2.width / 2,
			y: this.logoIcon2.y + 40,// - this.logoIcon1.height / 2,
			text: "Phaser Logo by Phaser",
			style: { font: "20px Arial", fill: "#FFFFFF", wordWrap: { width: 300 }, align: "center" }
		});

		//Quit button
		this.quitButton = this.add.text(0, 20, "Back", { font: "30px Arial", color: "#ffffff" });
		this.quitButton.x = 0 + this.quitButton.width / 2;
		this.quitButton.setInteractive({ useHandCursor: true });
		this.quitButton.on("pointerdown", () => {
			this.menuSelect.play();
			this.menuBGM.stop();
			this.time.delayedCall(500, this.scene.start, ["menuScene"], this.scene);
		});
		this.quitButton.on("pointerover", () => {
			this.quitButton.setFontStyle("italic");
			this.quitButton.setPadding({ right: 2 });
			this.quitButton.x = 0 + this.quitButton.width / 2;
		});
		this.quitButton.on("pointerout", () => {
			this.quitButton.setFontStyle("");
			this.quitButton.setPadding({ right: 0 });
			this.quitButton.x = 0 + this.quitButton.width / 2;
		});
	}

	update() { }
}

/*class EmptyScene extends Phaser.Scene {
	constructor() {
		super("emptyScene");
	}

	preload() {	}

	create() {	}

	update() {	}
}*/

config = {
	type: Phaser.WEBGL,
	width: 800,
	height: 600,
	backgroundColor: 0x000000,
	scene: [IntroScene,MenuScene,StoryScene,CreditScene]
}

let game = new Phaser.Game(config);