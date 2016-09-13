/* eslint-disable */

let freeSpins = (function () {

    let currentFreeSpins;
    let fsWheels;
    let fsStartData;
    let fsTotalWin;
    let fsTotalWinTitle;
    let fsTotalWinText;
    let stage;
    let fsTotalFreeSpins;

    function drawFreeSpinsBG() {
        /* eslint-disable no-undef */
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bgStaticStage;
        let fsBG = new createjs.Bitmap(loader.getResult('fsBG')).set({
            name: 'fsBG'
        });
        stage.removeChild(stage.getChildByName('mainBG'));
        stage.addChildAt(fsBG, 0);
        stage.update();

        // moving elements to center
        let moveX = 60;
        let gameStage = canvas.getStages().gameStage;

        fsTotalFreeSpins = 15;
        let fsFreeSpinContainer = new createjs.Container().set({
            name: 'fsFreeSpinContainer',
            x: 515,
            y: 555
        });

        let fsTotalFreeSpinsText = new createjs.Text(fsTotalFreeSpins, '48px bold Helvetica', '#fff').set({
            name: 'fsTotalFreeSpinsText',
            x: 67,
            y: 65,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#188bb4', 0, 0, 10)
        });

        let fsTotalFreeSpins = new createjs.Bitmap(loader.getResult('freeSpinLevel')).set({
            name: 'fsTotalFreeSpins',
            scaleX: 0.8,
            scaleY: 0.8
        });

        fsFreeSpinContainer.addChild(fsTotalFreeSpins, fsTotalFreeSpinsText);

        let fsTotalContainer = new createjs.Container().set({
            name: 'fsTotalContainer',
            x: 550,
            y: 670
        });
        fsTotalWinTitle = new createjs.Text('Total Win:', '24px bold Helvetica', '#fff').set({
            name: 'fsTotalWinTitle',
            textAlign: 'center',
            textBaseline: 'middle'
        });
        fsTotalWinText = new createjs.Text('0', '32px bold Helvetica', '#1de4c3').set({
            name: 'fsTotalWinText',
            x: 100,
            y: 0,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#1de4c3', 0, 0, 10)
        });

        fsTotalContainer.addChild(fsTotalWinTitle, fsTotalWinText);

        let fsTotalWinTextWidth = fsTotalWinText.getMeasuredWidth();
        let fsTotalWinTitleWidth = fsTotalWinTitle.getMeasuredWidth();

        fsTotalWinTitle.x = fsTotalWinText.x + 30 - fsTotalWinTitleWidth - fsTotalWinTextWidth/2;

        gameStage.addChild(fsFreeSpinContainer, fsTotalContainer);


        let buttonsContainer = gameStage.getChildByName('buttonsContainer');
            buttonsContainer.x = 1280 + 500;

        let winRectsContainer = canvas.getStages().gameStage;
            winRectsContainer.x = winRectsContainer.x + moveX;

        let bgStage = canvas.getStages().bgStage;
        let gameContainer = bgStage.getChildByName('gameContainer');
            gameContainer.x = gameContainer.x + moveX;
            gameContainer.mask.x = gameContainer.mask.x + moveX;

        let bgStaticStage = canvas.getStages().bgStaticStage;
        let gameBG = bgStaticStage.getChildByName('gameBG');
            gameBG.x = gameBG.x + moveX;

        let gameStaticStage = canvas.getStages().gameStaticStage;
        let gameMachine = gameStaticStage.getChildByName('gameMachine');
            gameMachine.x = gameMachine.x + moveX;
        let balanceContainer = gameStaticStage.getChildByName('balanceContainer');
            balanceContainer.x = balanceContainer.x + moveX;
        balanceContainer.getChildByName('coinsSum').visible = false;
        balanceContainer.getChildByName('betSum').visible = false;
        balanceContainer.getChildByName('coinsSumText').visible = false;
        balanceContainer.getChildByName('betSumText').visible = false;

        createjs.Ticker.on('tick', function () {
            if(gameStaticStage.getChildByName('labelLight')) {
                let labelLight = gameStaticStage.getChildByName('labelLight');
                labelLight.x = 507;
            } else {
                return;
            }
        });

        createjs.Ticker.on('tick', function () {
            if(gameStaticStage.getChildByName('eyeLight')) {
                let eyeLight = gameStaticStage.getChildByName('eyeLight');
                eyeLight.x = 502;
            } else {
                return;
            }
        });

        showVodolaz();
        showChests();
        posVodolaz = 1;
        numberofChests = 2;
    }

    function initFreeSpins(data) {
        fsTotalWin = 0;
        drawFreeSpinsBG();
        fsWheels = login.getInitData().freeWheels;
        console.warn('FS WHEELS IS:', fsWheels);
        let wheelsLength = fsWheels.length;
        let i, randomArray = [];
        for (i = 0; i < 5; i++) {
            let randomNumber = Math.round(Math.random() * (wheelsLength - 1));
            randomArray.push(randomNumber);
        }
        let firstScreen = spin._getScreenData(randomArray, fsWheels);
        // spin.drawScreen(firstScreen);
    }

    function transitionFreeSpins(data) {
        fsStartData = data;
        let loader = preloader.getLoadResult();
        stage = canvas.getStages().bonusStage;
        stage.alpha = 1;
        console.warn('I am transitionning FS Mode!');

        createjs.Sound.stop("fon");
        createjs.Sound.play("transitionSound");

        let transitionContainer = new createjs.Container().set({
            name: 'transitionContainer',
            alpha: 0
        });
        let transitionBG = new createjs.Bitmap(loader.getResult('transitionBG')).set({
            name: 'transitionBG'
        });
        let transitionText = new createjs.Bitmap(loader.getResult('freeSpinsText')).set({
            name: 'transitionText',
            x: (1280 - 790) / 2,
            y: 70
        });
        let transitionOsminog = new createjs.Bitmap(loader.getResult('osminog')).set({
            name: 'transitionOsmonig',
            x: 1280 + 492,
            y: 120
            // scaleX: 1.1,
            // scaleY: 1.1
        });
        let transitionVodolaz = new createjs.Bitmap(loader.getResult('vodolaz')).set({
            name: 'transitionvodolaz',
            x: -500,
            y: 80
        });
        let transitionButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'transitionButton',
            x: (1280 - 396) / 2,
            y: 560
        });

        let transitionChest = new createjs.Bitmap(loader.getResult('chestBig')).set({
            name: 'transitionChest',
            x: 460,
            y: -600,
            scaleX: 0.5,
            scaleY: 0.5
        });

        createjs.Tween.get(transitionContainer)
            .to({alpha: 1}, 500)
            .call(function () {
                events.trigger('drawFreeSpins', fsStartData);
            });

        createjs.Tween.get(transitionChest)
        .wait(500)
        .to({y: 150}, 1200, createjs.Ease.getBackOut(3))
        .to({y: 330}, 800, createjs.Ease.backIn)

        createjs.Tween.get(transitionVodolaz)
        .wait(500)
        .to({x: 0}, 1200, createjs.Ease.bounceIn)

        createjs.Tween.get(transitionOsminog)
        .wait(1000)
        .to({x: 1280 - 492}, 1200, createjs.Ease.bounceIn)

        transitionButton.on('mousedown', function () {
            transitionButton.gotoAndStop('over');
        });
        transitionButton.on('click', function () {
            createjs.Sound.stop("transitionSound");
            createjs.Sound.play("buttonClickSound");

            console.warn('menu.getMusicFlag', menu.getMusicFlag());
            if (menu.getMusicFlag()){
                createjs.Sound.play("fon", {loop: -1, delay: 300});
            }
            setTimeout(function () {
                events.trigger('startFreeSpin');
            }, 1000);
            createjs.Tween.get(transitionContainer)
                .to({alpha: 0}, 500);
        });

        transitionContainer.addChild(transitionBG, transitionText, transitionOsminog, transitionVodolaz,  transitionChest, transitionButton);
        stage.addChild(transitionContainer);
    }

    function startFreeSpin() {
        console.warn('I am free spin and I am called!');
        spin.spinStart(false, true);
        fsTotalFreeSpins = fsTotalFreeSpins -1;
        // buttons.update
    }

    function stopFreeSpins() {
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bgStaticStage;
        let mainBG = new createjs.Bitmap(loader.getResult('mainBG')).set({
            name: 'mainBG'
        });
        stage.removeChild(stage.getChildByName('fsBG'));
        stage.addChildAt(mainBG, 0);
        stage.update();
        let bonusStage = canvas.getStages().bonusStage;
        bonusStage.removeChild(bonusStage.getChildByName('fsTotalContainer'));
    }

    function getWheels() {
        return fsWheels;
    }

    function countTotalFreeSpins(data){
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().gameStage;
        if (data.mode === 'fsBonus') {
            if (stage.getChildByName('fsFreeSpinContainer')) {
                fsTotalFreeSpins = data.fsCount;
                console.warn('fsTotalFreeSpins:', fsTotalFreeSpins);
                stage.getChildByName('fsFreeSpinContainer').getChildByName('fsTotalFreeSpinsText').text = fsTotalFreeSpins;
            }
        }
    }

    function countTotalWin(data) {
        let stage = canvas.getStages().gameStage;
        if (data.mode === 'fsBonus') {
            if (stage.getChildByName('fsTotalContainer')) {
                fsTotalWin = fsTotalWin + data.winCoins;
                stage.getChildByName('fsTotalContainer').getChildByName('fsTotalWinText').text = fsTotalWin;
                let fsTotalWinTextWidth = fsTotalWinText.getMeasuredWidth();
                let fsTotalWinTitleWidth = fsTotalWinTitle.getMeasuredWidth();
                fsTotalWinTitle.x = fsTotalWinText.x + 30 - fsTotalWinTitleWidth - fsTotalWinTextWidth/2;
                // console.warn('fsTotalWinTitle.x', fsTotalWinTitle.x);
            } else {
                // fsTotalWin = fsTotalWin + data.winCoins;
            }
        }
    }

    function finishFreeSpins() {
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bonusStage;
        let gameStage = canvas.getStages().gameStage;
        createjs.Sound.stop("fon");
        createjs.Sound.play("transitionSound");

        let finishContainer = new createjs.Container().set({
            name: 'finishContainer',
            alpha: 0
        });
        let finishBG = new createjs.Bitmap(loader.getResult('transitionBG')).set({
            name: 'finishBG'
        });
        let finishText = new createjs.Bitmap(loader.getResult('totalWinText')).set({
            name: 'finishText',
            x: (1280 - 815) / 2,
            y: 70
        });
        let finishOsminog = new createjs.Bitmap(loader.getResult('osminog')).set({
            name: 'finishOsminog',
            x: 1280 - 492,
            y: 120
        });
        let finishVodolaz = new createjs.Bitmap(loader.getResult('vodolaz')).set({
            name: 'finishVodolaz',
            x: 0,
            y: 80
        });

        let chest = new createjs.Sprite(loader.getResult('chestOpen'), 'closed').set({
            name: 'chest',
            x: 400,
            y: -600,
            scaleX: 0.5,
            scaleY: 0.5
        });

        createjs.Tween.get(chest)
		.wait(500)
		.to({y: 150}, 1200, createjs.Ease.getBackOut(3))
        .call(function () {
            chest.gotoAndStop("open");
        })
        .to({y: 280}, 800, createjs.Ease.backIn);

        createjs.Tween.get(finishVodolaz)
        .wait(500)
        .to({x: 0}, 1200, createjs.Ease.bounceIn)

        createjs.Tween.get(finishOsminog)
        .wait(1000)
        .to({x: 1280 - 492}, 1200, createjs.Ease.bounceIn)

        let finishWinText = new createjs.BitmapText(fsTotalWin+'', loader.getResult('totalWinFS')).set({
            name: 'finishWinText',
            scaleX: 0.5,
            scaleY: 0.5,
            alpha: 0
        });
        finishWinText.x = (1280 - finishWinText.getBounds().width) / 2;
        finishWinText.y = (720 - finishWinText.getBounds().height) / 2;
        // finishWinText.regX = finishWinText.getBounds().width / 2;
        // finishWinText.regY = finishWinText.getBounds().height / 2;

        let finishButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'finishButton',
            x: (1280 - 396) / 2,
            y: 560
        });
        finishContainer.addChild(finishBG, finishText, chest, finishOsminog, finishVodolaz);

        setTimeout(function () {
            finishContainer.addChild(finishWinText, finishButton, finishText);
            createjs.Tween.get(finishWinText)
            .to({alpha: 1, scaleX: 1, scaleY: 1}, 700);
        }, 500);


        createjs.Tween.get(finishContainer)
            .to({alpha: 1}, 500)
            .call(function () {
                events.trigger('stopFreeSpins');
                stage.removeChild(stage.getChildByName('chestContainer'), stage.getChildByName('vodolazContainer'));
                console.warn('bonusStage', stage);
            });
        finishButton.on('mousedown', function () {
            finishButton.gotoAndStop('over');
        });
        finishButton.on('click', function () {
            createjs.Sound.play("buttonClickSound");
            createjs.Sound.stop("transitionSound");
            if (menu.getMusicFlag()){
                createjs.Sound.play("fon", {loop: -1, delay: 300});
            }
            createjs.Tween.get(finishContainer)
                .to({alpha: 0}, 500)
                .call(function () {
                    stage.removeAllChildren();
                });
        });

        stage.addChild(finishContainer);

        // moving elements backwards
        let moveX = 60;

        gameStage.removeChild(gameStage.getChildByName('fsTotalContainer'));
        gameStage.removeChild(gameStage.getChildByName('fsFreeSpinContainer'));

        let buttonsContainer = gameStage.getChildByName('buttonsContainer');
            buttonsContainer.x = 0;

        let winRectsContainer = canvas.getStages().gameStage;
            winRectsContainer.x = winRectsContainer.x - moveX;

        let bgStage = canvas.getStages().bgStage;
        let gameContainer = bgStage.getChildByName('gameContainer');
            gameContainer.x = gameContainer.x - moveX;
            gameContainer.mask.x = gameContainer.mask.x - moveX;

        let bgStaticStage = canvas.getStages().bgStaticStage;
        let gameBG = bgStaticStage.getChildByName('gameBG');
            gameBG.x = gameBG.x - moveX;

        let gameStaticStage = canvas.getStages().gameStaticStage;
        let gameMachine = gameStaticStage.getChildByName('gameMachine');
            gameMachine.x = gameMachine.x - moveX;
        let balanceContainer = gameStaticStage.getChildByName('balanceContainer');
            balanceContainer.x = balanceContainer.x - moveX;
            balanceContainer.getChildByName('coinsSum').visible = true;
            balanceContainer.getChildByName('betSum').visible = true;
            balanceContainer.getChildByName('coinsSumText').visible = true;
            balanceContainer.getChildByName('betSumText').visible = true;
            // console.log('balanceContainer:', balanceContainer);

        createjs.Ticker.on('tick', function () {
            if(gameStaticStage.getChildByName('labelLight')) {
                let labelLight = gameStaticStage.getChildByName('labelLight');
                labelLight.x = 447;
            } else {
                return;
            }
        });

        createjs.Ticker.on('tick', function () {
            if(gameStaticStage.getChildByName('eyeLight')) {
                let eyeLight = gameStaticStage.getChildByName('eyeLight');
                eyeLight.x = 442;
            } else {
                return;
            }
        });

    }

    function addMultiBonus(data) {
        let multiStage = canvas.getStages().bonusStage;
        // fsTotalWin = fsTotalWin + data.coins;
        // multiStage.getChildByName('fsTotalContainer').getChildByName('fsTotalWinText').text = fsTotalWin;
        createjs.Sound.stop("fon");
        createjs.Sound.play("transitionSound");

        let loader = preloader.getLoadResult();
        let multiContainer = new createjs.Container().set({
            name: 'multiContainer',
            alpha: 0
        });
        let multiBG = new createjs.Bitmap(loader.getResult('multiBG')).set({
            name: 'multiBG'
        });
        let multiTitle = new createjs.Bitmap(loader.getResult('multiTitle')).set({
            name: 'multiTitle',
            x: (1280 - 868) / 2,
            y: 100
        });
        let multiCoins = new createjs.Bitmap(loader.getResult('multiCoins')).set({
            name: 'multiCoins',
            x: (1280 - 192) / 2,
            y: 440
        });
        let multiWinText = new createjs.Text(data.coins, '150px bold Arial', '#fff').set({
            x: 1280 / 2,
            y: 680 / 2,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#fff', 0, 0, 10)
        });
        let multiButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'multiButton',
            x: (1280 - 396) / 2,
            y: 560
        });

        let multiOsminog = new createjs.Bitmap(loader.getResult('osminog')).set({
            name: 'multiOsminog',
            x: 1280 + 492,
            y: 120
        });
        let multiVodolaz = new createjs.Bitmap(loader.getResult('vodolaz')).set({
            name: 'multiVodolaz',
            x: -500,
            y: 80
        });

        let multiChest = new createjs.Sprite(loader.getResult('chestOpen'), 'closed').set({
            name: 'multiChest',
            x: 400,
            y: -600,
            scaleX: 0.5,
            scaleY: 0.5
        });

        createjs.Tween.get(multiChest)
		.wait(500)
		.to({y: 150}, 1200, createjs.Ease.getBackOut(3))
        .call(function () {
            multiChest.gotoAndStop("open");
        })
        .to({y: 380}, 800, createjs.Ease.backIn);

        createjs.Tween.get(multiOsminog)
        .wait(500)
        .to({x: 1280 - 492}, 1200, createjs.Ease.bounceIn)

        createjs.Tween.get(multiVodolaz)
        .wait(1000)
        .to({x: 0}, 1200, createjs.Ease.bounceIn)


        multiContainer.addChild(multiBG, multiChest, multiTitle, multiCoins, multiWinText, multiVodolaz, multiOsminog, multiButton);
        createjs.Tween.get(multiContainer)
            .to({alpha: 1}, 500);
        multiButton.on('mousedown', function () {
            multiButton.gotoAndStop('over');
        });
        multiButton.on('click', function () {
            createjs.Sound.stop("transitionSound");
            createjs.Sound.play("buttonClickSound");
            createjs.Sound.play("fon", {loop: -1, delay: 300});
            utils.request('_Ready/', login.getSessionID())
                .then((response) => {
                    if (response.ErrorCode === 0) {
                        events.trigger('startFreeSpin');
                    }
                });
            createjs.Tween.get(multiContainer)
                .to({alpha: 0}, 500)
                .call(function () {
                    multiStage.removeChild(multiContainer);
                });
        });
        multiStage.addChild(multiContainer);
    }

    let fon, verevka, diver, onlyVodolaz, button, buttonText, numbers, ramka, temnota, vodolazContainer, posVodolaz = 1;
    function showVodolaz(){
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bonusStage;

    	fon = new createjs.Bitmap(loader.getResult('bgDiver1')).set({x: 15, y: 25, scaleX: 0.6, scaleY: 0.6});
    	verevka = new createjs.Bitmap(loader.getResult('verevkaDiver')).set({x: 8, y: -780});
    	diver = new createjs.Bitmap(loader.getResult('diver')).set({x: 35, y: 10, scaleX: 0.6, scaleY: 0.6});
    	createjs.Tween.get(diver, {loop: true})
    		.to({y: diver.y + 5}, 5000, createjs.Ease.bounceInOut)
    		.to({y: diver.y}, 5000, createjs.Ease.bounceInOut);
    	onlyVodolaz = new createjs.Container();
    	onlyVodolaz.addChild(verevka, diver);
    	button = new createjs.Bitmap(loader.getResult('buttonDiver')).set({x: 5, y: 40, scaleX: 0.6, scaleY: 0.6});

    	buttonText = new createjs.Text("1", "bold 13px Arial", "#FFF");
    	buttonText.textAlign = "center";
    	buttonText.set({x: 15, y: 43});
    	numbers = new createjs.Bitmap(loader.getResult('numbersDiver')).set({x: 5, y: 40, scaleX: 0.6, scaleY: 0.6});
    	ramka = new createjs.Bitmap(loader.getResult('ramkaDiver')).set({scaleX: 0.6, scaleY: 0.6});
    	temnota = new createjs.Bitmap(loader.getResult('temnotaDiver')).set({ x: 17, y: 75, alpha: 0.6, scaleX: 0.6, scaleY: 0.6});
    	let puziry = new createjs.Bitmap(loader.getResult('puziryDiver'));
    	vodolazContainer = new createjs.Container();
    	let mask = new createjs.Shape();
    	mask.graphics.s("#FFF").arc(93, 93, 93, Math.PI, 0).lt(184, 761).arc(93, 761, 93, Math.PI*2, Math.PI).cp();
    	vodolazContainer.set({name: 'vodolazContainer', x: 7, y: 100});
    	mask.set({x: 7, y: 100, scaleX: 0.6, scaleY: 0.6});
    	vodolazContainer.mask = mask;
    	vodolazContainer.addChild(fon, verevka, onlyVodolaz, temnota, ramka, numbers, button, buttonText);
    	stage.addChildAt(vodolazContainer, stage.getChildByName('transitionBG'));
    }
    function vodolazVniz(){
    	let newButton = button.clone();
    	let newText = buttonText.clone();
    	newButton.y += posVodolaz*40;
    	newText.y += posVodolaz*40;
    	posVodolaz++;
    	newText.text = posVodolaz;
    	temnota.y += 40;
    	// verevka.y += 49;
    	// onlyVodolaz.y += 49;
    	createjs.Tween.get(verevka)
    		.to({y: verevka.y + 40}, 1000, createjs.Ease.cubicIn);
    	createjs.Tween.get(onlyVodolaz)
    		.to({y: onlyVodolaz.y + 40}, 1000, createjs.Ease.cubicIn);
    	vodolazContainer.addChild(newButton, newText);
    }

    let chest, glassChest, numberofChests = 2, chestContainer, numberChest, numberChestText;
    function showChests(){
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bonusStage;

    	let bgChest = new createjs.Bitmap(loader.getResult('bgChest')).set({x: 20, y: 28, scaleX: 0.6, scaleY: 0.6});
    	glassChest = new createjs.Bitmap(loader.getResult('glassChest')).set({x: 20, y: 28, scaleX: 0.6, scaleY: 0.6});
    	chest = new createjs.Bitmap(loader.getResult('chest')).set({x: 20, y: 340, scaleX: 0.6, scaleY: 0.6});
    	let numbersChest = new createjs.Bitmap(loader.getResult('numbersChest')).set({x: -6, y: 50, scaleX: 0.6, scaleY: 0.6});

    	numberChest = new createjs.Bitmap(loader.getResult('numberChest')).set({x: -6, y: 357, scaleX: 0.6, scaleY: 0.6});
    	numberChestText = new createjs.Text("x2", "bold 21px Arial", "#fff");
    	numberChestText.textAlign = "center";
    	numberChestText.set({x: numberChest.x + 18, y: numberChest.y + 7});
    	let ramkaChest = new createjs.Bitmap(loader.getResult('ramkaChest')).set({scaleX: 0.6, scaleY: 0.6});
    	chestContainer = new createjs.Container();
    	chestContainer.addChild(bgChest, chest, glassChest, ramkaChest, numberChest, numberChestText);
    	chestContainer.set({name: 'chestContainer', x: 1160, y: 160});
    	stage.addChildAt(chestContainer, stage.getChildByName('transitionBG'));
    }

    function addNewChest(){
        let loader = preloader.getLoadResult();
        let newChest;
    	if(numberofChests !== 6){
    		newChest = chest.clone();
    	} else {
    		newChest = new createjs.Bitmap(loader.getResult('goldChest')).set({x: chest.x, scaleX: 0.6, scaleY: 0.6});
    	}

    	newChest.y = 0;
    	createjs.Tween.get(newChest)
    		.to({y:chest.y - numberofChests*57 + 57}, 500, createjs.Ease.sineIn)
    		.call(bubblesChest);
    	chestContainer.addChildAt(newChest, chestContainer.getChildIndex(glassChest));
    	let newNumberChest = numberChest.clone();
    	newNumberChest.y = numberChest.y - numberofChests*53 + 53;
    	let newNumberChestText = numberChestText.clone();
    	newNumberChestText.text = "x"+(numberofChests + 1);
    	newNumberChestText.y = numberChestText.y - numberofChests*53 + 53;
    	chestContainer.addChild(newNumberChest, newNumberChestText);
    	numberofChests++;
    }

    function bubblesChest(){
        let loader = preloader.getLoadResult();
        let chestBubbles = new createjs.Sprite(loader.getResult('puziryChest'), "open");
    	let newBubbles = chestBubbles.clone();
    	newBubbles.set({x: -70, y: chest.y - numberofChests*90 - 50});
    	let mask = new createjs.Shape();
    	mask.graphics.s("#FFF").drawRect(10, 50, 165, 690);
    	newBubbles.mask = mask;
    	newBubbles.on("animationend", function(){
    		chestContainer.removeChild(this);
    	});
    	chestContainer.addChildAt(newBubbles, chestContainer.getChildIndex(glassChest));
    }

    // trigger in spin.js
    function checkVodolaz(fsLevel){
        console.log('fsLevel:', fsLevel);
        console.log('posVodolaz', posVodolaz);
        if (fsLevel > posVodolaz){
            vodolazVniz();
        }
    }

    function checkMulti(fsMulti){
        console.log('fsMulti:', fsMulti);
        console.log('numberofChests', numberofChests);
        if (fsMulti > numberofChests){
            addNewChest();
        }
    }

    events.on('initFreeSpins', transitionFreeSpins);
    events.on('drawFreeSpins', initFreeSpins);
    // events.on('initFreeSpins', initFreeSpins);
    events.on('stopFreeSpins', stopFreeSpins);
    events.on('finishFreeSpins', finishFreeSpins);
    events.on('startFreeSpin', startFreeSpin);
    events.on('spinEnd', countTotalWin);
    events.on('spinEnd', countTotalFreeSpins);
    events.on('multiplierBonus', addMultiBonus);
    events.on('checkVodolaz', checkVodolaz);
    events.on('checkMulti', checkMulti);

    return {
        initFreeSpins,
        stopFreeSpins,
        startFreeSpin,
        getWheels,
        drawFreeSpinsBG
    };
})();
