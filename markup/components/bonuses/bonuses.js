/* eslint-disable */
let bonuses = (function () {

    let doors = [];
    let blicks = [];
    let bonusData;
    let clickCounter = 0;
    let levelNumber = 0;
    let bonusContainer;
    let currentWinText;
    let currentWinTitle;
    let gameWidth;
    let stage;
    let loader;

    function initBonusLevel() {
        console.warn("i init bonus level");
        stage = canvas.getStages().bonusStage;
        loader = preloader.getLoadResult();
        gameWidth = stage.canvas.width;
        stage.alpha = 1;
        stage.nextStage = null;

        createjs.Sound.stop("fon");
        createjs.Sound.play("transitionSound");

        // Создаем элементы для экрана перехода
        let initContainer = new createjs.Container().set({
            name: 'initContainer',
            alpha: 0
        });
        let initBG = new createjs.Bitmap(loader.getResult('multiBG')).set({
            name: 'initBG'
        });
        let transitionText = new createjs.Bitmap(loader.getResult('bonusWinText'));
        transitionText.set({
            name: 'transitionText',
            x: (gameWidth - transitionText.getBounds().width) / 2,
            y: 70
        });
        let transitionOsminog = new createjs.Bitmap(loader.getResult('osminog'));
        transitionOsminog.set({
            name: 'transitionOsmonig',
            x: gameWidth + transitionOsminog.getBounds().width,
            y: 120
        });
        let transitionVodolaz = new createjs.Bitmap(loader.getResult('vodolaz'));
        transitionVodolaz.set({
            name: 'transitionvodolaz',
            x: -500, // magic number
            y: 80
        });
        let transitionChest = new createjs.Bitmap(loader.getResult('chestBig'));
        transitionChest.set({
            name: 'transitionChest',
            x: 460, // magic number
            y: -600,
            scaleX: 0.5,
            scaleY: 0.5
        });
        let transitionButton = new createjs.Sprite(loader.getResult('continueButton'), 'out');
        transitionButton.set({
            name: 'transitionButton',
            x: (gameWidth - transitionButton.getBounds().width) / 2,
            y: 560
        });

        createjs.Tween.get(initContainer)
            .to({alpha: 1}, 500)
            .call(
                function () {
                    getBonusLevel();
                }
            );
        // Двигаем элементы для экрана перехода
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
            createjs.Sound.stop('transitionSound');
            createjs.Sound.play('buttonClickSound');

            if (menu.getMusicFlag()){
                createjs.Sound.play("fon", {loop: -1, delay: 300});
            }
            createjs.Tween.get(initContainer)
                .to({alpha: 0}, 500)
                .call(function () {
                    stage.removeChild(initContainer);
                });
        });

        initContainer.addChild(initBG, transitionText, transitionChest, transitionOsminog, transitionVodolaz, transitionButton);
        stage.addChild(initContainer);
    }

    function getBonusLevel() {
        // Запрос на ролл
        console.warn('i am entering new bonus level');
        let sessionID = login.getSessionID();
        utils.request('_Roll/', `${sessionID}/1/1`)
        .then((data) => {
            bonusData = data;
            levelNumber++;
            clickCounter = 0;
            console.log('This is bonus data:', data);
            console.warn("levelNumber", levelNumber);
            if (bonusData.OldValues.length === 0) {
                drawBonusLevel()
                console.warn(" i am drawing bonus level");
            }
        });
    }

    function readyAfterBonus() {
        let sessionID = login.getSessionID();
        utils.request('_Ready/', `${sessionID}`).then((data) => {
            console.log('ready data:', data);
        });
    }

    function drawBonusLevel() {
        doors = [];

        bonusContainer = new createjs.Container().set({
            name: 'bonusContainer'
        });
        let bonusBG = new createjs.Bitmap(loader.getResult('bonusBG')).set({
            name: 'bonusBG'
        });
        let bonusFG = new createjs.Bitmap(loader.getResult('bonusFG')).set({
            name: 'bonusFG'
        });
        let illuminatorContainer = new createjs.Container().set({
            name: 'illuminatorContainer'
        });

        let bigFish = new createjs.Sprite(loader.getResult('bigFish'), 'move').set({
            name: 'bigFish',
            x: 50, // magic number
            y: 350
        });

        let fishMove = new TimelineMax({repeat: -1, yoyo: true});
        fishMove.to(bigFish, 5, {y: 250})
            .to(bigFish, 5, {y: 350});

        let upperLight = new createjs.Bitmap(loader.getResult('upperLight'));
        upperLight.alpha = 0.5;
        let upperLight2 = upperLight.clone();
        let upperLight3 = upperLight.clone();
        upperLight2.x = -50; upperLight2.y = -60;
        upperLight3.x = -20; upperLight3.y = -30;
        createjs.Tween.get(upperLight, {loop: true})
          .to({alpha: 0.2}, 1900)
          .to({alpha: 0.5}, 1200);
        createjs.Tween.get(upperLight2, {loop: true})
          .to({alpha: 0.2}, 2900)
          .to({alpha: 0.5}, 1700);
        createjs.Tween.get(upperLight3, {loop: true})
          .to({alpha: 0.2}, 1100)
          .to({alpha: 0.5}, 1400);

        // Draw  footer and balance
        let footerDownBG = new createjs.Shape();
        footerDownBG.graphics.beginFill('rgba(0, 0, 0, 1)').drawRect(0, 720 - 30, 1280, 30);

        let footerUpBG = new createjs.Shape();
        footerUpBG.graphics.beginFill('rgba(0, 0, 0, 0.6)').drawRect(0, 720 - 70, 1280, 40);

        let bonusbalanceContainer = new createjs.Container().set({
            name: 'bonusbalanceContainer',
            x: 50 // magic number
        });
        let currentWinContainer = new createjs.Container().set({
            name: 'currentWinContainer',
            x: 550, // magic number
            y: 670
        });
        currentWinTitle = new createjs.Text('Total Win:', '24px bold Helvetica', '#fff').set({
            name: 'currentWinTitle',
            textAlign: 'center',
            textBaseline: 'middle'
        });

        currentWinText = new createjs.Text('0', '32px bold Helvetica', '#1de4c3').set({
            name: 'currentWinText',
            x: 100, // magic number
            y: 0,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#1de4c3', 0, 0, 10)
        });

        currentWinContainer.addChild(currentWinTitle, currentWinText);

        let currentWinTextWidth = currentWinText.getMeasuredWidth();
        let currentWinTitleWidth = currentWinTitle.getMeasuredWidth();
        currentWinTitle.x = currentWinText.x + 30 - currentWinTitleWidth - currentWinTextWidth/2;

        bonusContainer.addChild(bonusBG, illuminatorContainer, bigFish, upperLight, upperLight2, upperLight3, bonusFG, footerUpBG, footerDownBG,  bonusbalanceContainer, currentWinContainer);
        stage.addChildAt(bonusContainer, 0);

        console.log('i am trying writing balance');
        balance.writeBalance(stage, bonusbalanceContainer);
        bonusbalanceContainer.getChildByName('coinsSum').visible = false;
        bonusbalanceContainer.getChildByName('betSum').visible = false;
        bonusbalanceContainer.getChildByName('coinsSumText').visible = false;
        bonusbalanceContainer.getChildByName('betSumText').visible = false;

        // draw illuminators
        let ss = loader.getResult('illuminators');
        let illuminator_1 = new createjs.Sprite(ss, 0).set({
            x: 358,
            y: 255,
            regX: 47,
            regY: 47
        });
        let illuminator_2 = new createjs.Sprite(ss, 1).set({
            x: 506,
            y: 288,
            regX: 47,
            regY: 47
        });
        let illuminator_3 = new createjs.Sprite(ss, 2).set({
            x: 652,
            y: 321,
            regX: 47,
            regY: 47
        });
        let illuminator_4 = new createjs.Sprite(ss, 3).set({
            x: 801,
            y: 354,
            regX: 47,
            regY: 47
        });
        let illuminator_5 = new createjs.Sprite(ss, 4).set({
            x: 947,
            y: 386,
            regX: 47,
            regY: 47
        });

        doors.push(illuminator_1, illuminator_2, illuminator_3, illuminator_4, illuminator_5);
        doors.forEach((door, index) => {
            door.stop();
            illuminatorContainer.addChild(door);
            let blick = new createjs.Bitmap(loader.getResult('light')).set({
                name: 'blick' + index,
                x: door.x,
                y: door.y,
                regX: 80,
                regY: 83,
                alpha: 0
            });
            bonusContainer.addChildAt(blick, bonusContainer.getChildIndex(illuminatorContainer));
            blicks.push(blick);

        });
        setTimeout(function () {
           DoorLight(blicks);
       }, 300);

        addClickHandlers(doors, bonusContainer, bonusFG);
        console.warn("we are entering addClickHandlers");
    }

    function DoorLight(array){
        let blickTl = new TimelineLite();
        blickTl.staggerTo(blicks, 0.3, {alpha: 0.7}, 0.1);
        blickTl.staggerTo(blicks, 1, {alpha: 0}, "+=1");

        setTimeout(function () {
           DoorLight(blicks);
        }, Math.random()*3000+500);
    }


    function addClickHandlers(arr, container, el) {
        let bonusWinResult;

        doors.forEach((door) => {
            door.on('click', function () {
                console.log("i am in clickHandlers", clickCounter);
                if (clickCounter < 1) {
                    clickCounter++;

                    if (bonusData.CurrentValue !== "Exit") { // Win
                        console.warn("i am in win:", bonusData);

                        //Win animations
                        let bonusWin = new createjs.Sprite(loader.getResult('bonusWin')).set({
                            name: 'bonuswin',
                            x: door.x,
                            y: door.y,
                            regX: 186,
                            regY: 76,
                            alpha: 1
                        });
                        bonusWinResult = new createjs.Sprite(loader.getResult('bonusWinResult')).set({
                            name: 'bonusWinResult',
                            x: door.x,
                            y: door.y,
                            regX: 100,
                            regY: 100
                        });
                        let light = new createjs.Bitmap(loader.getResult('light')).set({
                            name: 'light',
                            x: door.x,
                            y: door.y,
                            regX: 80,
                            regY: 83,
                            alpha: 0
                        });

                        container.addChildAt(bonusWin, container.getChildIndex(el));
                        container.addChild(light);

                        let tl = new TimelineLite();
                        tl.add("scene1", 0)
                            tl.to(door, 0, {alpha:0}, "scene1");
                            tl.to(light, 0, {alpha:0.9}, "scene1");

                        if (door.alpha === 0){
                            let index = doors.indexOf(door);
                            container.removeChild(container.getChildByName('blick' + index));
                        }
                        bonusWin.play();

                        // win sounds
                        let randSound = Math.random();
                        if(randSound<0.4){
                        	createjs.Sound.play("illuminatorBreak1", {volume: 0.5});
                        } else if (randSound<0.7) {
                        	createjs.Sound.play("illuminatorBreak1", {volume: 0.5});
                        } else {
                        	createjs.Sound.play("illuminatorBreak3", {volume: 0.5});
                        }
                        createjs.Sound.play("illumWin", {duration: 1500});

                        let bonusWinCounter = 0;
                        bonusWin.on('animationend', function () {
                            bonusWinCounter++;
                            if (bonusWinCounter > 3) {
                               tl.add("scene2", 0)
                               tl.to(light, 0, {alpha:0}, "scene2");
                               tl.to(bonusWin, 0, {alpha:0, onComplete: showBonusWinResult}, "scene2");
                            }
                        });
                        function showBonusWinResult() {

                            container.removeChild(bonusWin);
                            container.removeChild(light);
                            bonusWinResult.gotoAndStop(bonusData.CurrentValue+'table');
                            container.addChild(bonusWinResult);

                            if (container.getChildByName('currentWinContainer')) {
                                container.getChildByName('currentWinContainer').getChildByName('currentWinText').text = bonusData.CurrentWinCoins;
                                let currentWinTextWidth = currentWinText.getMeasuredWidth();
                                let currentWinTitleWidth = currentWinTitle.getMeasuredWidth();
                                currentWinTitle.x = currentWinText.x + 30 - currentWinTitleWidth - currentWinTextWidth/2;
                                // console.warn('currentWinTitle.x', currentWinTitle.x);
                            }

                            if (bonusData.BonusEnd !== true){
                                readyAfterBonus();
                                setTimeout(function () {
                                    console.log("i am asking for new roll");
                                    getBonusLevel();
                                }, 300);
                            } else {
                                if (bonusData.BonusEnd === true && bonusData.CurrentValue !== "Exit"){
                                    console.log("i won totalWin");
                                    finishBonusLevel(container);
                                    container.removeChild(container.getChildByName('currentWinContainer'));
                                    console.warn("i call finish bonus level for win");
                                    readyAfterBonus();
                                }
                            }
                        }
                    } else {
                        // Fail
                        console.warn("i am in fail", bonusData);
                        container.removeChild(bonusWinResult);
                        let octopus = new createjs.Bitmap(loader.getResult('octopus')).set({
                            name: 'octopus',
                            x: 870, // magic number
                            y: 500,
                            regX: 145,
                            regY: 100,
                            alpha: 0
                        });
                        container.addChild(octopus);
                        createjs.Tween.get(octopus)
                        .to({alpha: 1}, 300)

                        let tentacles = [];

                        let bonusFail = new createjs.Sprite(loader.getResult('bonusFail'), 'show').set({
                            name: 'bonusFail',
                            x: door.x,
                            y: door.y,
                            regX: 75,
                            regY: 39
                        });

                        for(let i = 0; i < 5; i++){
                            container.removeChild(container.getChildByName('blick' + i));
                        }

                        for(let i = 0; i < 5; i++){
                            let newBonusFail = bonusFail.clone(true);
                            if(i === 0){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y - 10})}
                            if(i === 1){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y - 10, rotation: 70})}
                            if(i === 2){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y, rotation: 220, skewY: 180})}
                            if(i === 3){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y - 10, rotation: 135, skewY: 180})}
                            if(i === 4){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y - 10, rotation: 65, skewY: 180})}
                            tentacles.push(newBonusFail);
                        }

                        for(let i = 0; i < 5; i++){
                            container.removeChild(container.getChildByName("bonusWinResult"));
                            createjs.Tween.get(doors[i])
                            .to({alpha: 0}, 300);
                            container.addChildAt(tentacles[i], container.getChildIndex(el));

                            createjs.Sound.stop("fon");
                            let illumfail = createjs.Sound.play("illumFail");

                        }

                        finishBonusLevel(container);
                        container.removeChild(container.getChildByName('currentWinContainer'));
                        console.warn("i call finish bonus level");
                        setTimeout(function () {
                            readyAfterBonus();
                        }, 300);
                    }
                }
            });
        });
    }

    function finishBonusLevel(container) {
        bonusContainer.removeChild(bonusContainer.getChildByName('bonusbalanceContainer'));
        console.log('bonusContainer', bonusContainer);

        createjs.Sound.play("transitionSound", {delay:1200});

        let finishText = new createjs.Bitmap(loader.getResult('totalWinText'));
        finishText.set({
            name: 'finishText',
            x: (gameWidth - finishText.getBounds().width) / 2,
            y: 70
        });

        let finishButton = new createjs.Sprite(loader.getResult('continueButton'), 'out');
        finishButton.set({
            name: 'finishButton',
            x: (gameWidth - finishButton.getBounds().width) / 2,
            y: 560
        });

        let finishWinText = new createjs.BitmapText(bonusData.CurrentWinCoins+'', loader.getResult('totalWinFS')).set({
            name: 'finishWinText',
            scaleX: 0.5,
            scaleY: 0.5,
            alpha: 0
        });

        let l = (bonusData.CurrentWinCoins+'').length;
        finishWinText.x = (gameWidth - l*finishButton.getBounds().width) / 2;
        finishWinText.y = (720 - finishButton.getBounds().width) / 2;

        let finishOsminog = new createjs.Bitmap(loader.getResult('osminog'));
        finishOsminog.set({
            name: 'finishOsminog',
            x: gameWidth + finishOsminog.getBounds().width,
            y: 120
        });
        let finishVodolaz = new createjs.Bitmap(loader.getResult('vodolaz')).set({
            name: 'finishVodolaz',
            x: -500, // magic number
            y: 80
        });

        let chest = new createjs.Sprite(loader.getResult('chestOpen'), 'closed').set({
            name: 'chest',
            x: 400, // magic number
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

        createjs.Tween.get(finishWinText)
        .to({alpha: 1, scaleX: 1, scaleY: 1}, 700);

        let darkness = new createjs.Shape();
        darkness.graphics.beginFill('#000').drawRect(0, 0, 1280, 720);
        darkness.alpha = 0;
        stage.addChild(darkness);

        container.addChild(finishText, chest, finishWinText, finishButton, finishVodolaz, finishOsminog);

        finishButton.on('mousedown', function () {
            finishButton.gotoAndStop('over');
        });
        finishButton.on('click', function () {

            createjs.Sound.stop("transitionSound");
            createjs.Sound.play("buttonClickSound");
            if (menu.getMusicFlag()){
                createjs.Sound.play("fon", {loop: -1, delay: 300});
            }
            createjs.Tween.get(darkness)
            .to({alpha: 1}, 500)
            .wait(200)
            .call(function () {
                stage.removeAllChildren();
                stage.nextStage = canvas.getStages().gameStage;
                spin.stopBonusLevel();
                clickCounter = 0;
                levelNumber = 0;
            });
        });
    }


    events.on('initBonusLevel', initBonusLevel);
    events.on('drawBonusLevel', drawBonusLevel);
    events.on('finishBonusLevel', finishBonusLevel);

    return {
        getBonusLevel,
        readyAfterBonus,
        initBonusLevel,
        finishBonusLevel
    };

})();
