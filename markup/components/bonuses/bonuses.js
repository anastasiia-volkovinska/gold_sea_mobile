/* eslint-disable */
let bonuses = (function () {

    let doors = [];
    let blicks = [];
    let bonusData;
    let clickCounter = 0;
    let levelNumber = 0;

    function initBonusLevel() {
        console.warn("i am init bonus level");
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bonusStage;
        stage.alpha = 1;
        stage.nextStage = null;

        let darkness = new createjs.Shape();
        darkness.graphics.beginFill('#000').drawRect(0, 0, 1280, 720);
        darkness.alpha = 0;
        stage.addChild(darkness);

        createjs.Tween.get(darkness)
            .to({alpha: 1}, 500)
            .call(
                function () {
                    console.warn("i  call getbonus level");
                    getBonusLevel();
                }
            )
            .wait(200)
            .to({alpha: 0}, 500)
            .call(function () {
                stage.removeChild(darkness);
            });
    }

    function getBonusLevel() {
        let sessionID = login.getSessionID();
        utils.request('_Roll/', `${sessionID}/1/1`)
        .then((data) => {
            bonusData = data;
            levelNumber++;
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

        let stage = canvas.getStages().bonusStage;
        let loader = preloader.getLoadResult();
        let bonusContainer = new createjs.Container().set({
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
        bonusContainer.addChild(bonusBG, illuminatorContainer, bonusFG);
        stage.addChildAt(bonusContainer, 0);

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
        }, 500);

        addClickHandlers(doors, bonusContainer, bonusFG);
        console.warn("we are entering addClickHandlers");
    }

    function DoorLight(array){
        let blickTl = new TimelineLite();
        blickTl.staggerTo(blicks, 1, {alpha:"0.3"}, 0.5);
        blickTl.staggerTo(blicks, 1, {alpha:"0"}, "+=1");

        setTimeout(function () {
           DoorLight(blicks);
        }, Math.random()*3000+500);
    }

    function addClickHandlers(arr, container, el) {
        let loader = preloader.getLoadResult();
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
                            } else {
                                let currentWinContainer = new createjs.Container().set({
                                    name: 'currentWinContainer',
                                    x: 550,
                                    y: 690
                                });
                                let currentWinTitle = new createjs.Text('Your Bonus Win:', '24px bold Arial', '#fff').set({
                                    name: 'currentWinTitle',
                                    textAlign: 'center',
                                    textBaseline: 'middle',
                                    shadow: new createjs.Shadow('#C19433', 0, 0, 10)
                                });
                                let currentWinText = new createjs.Text(bonusData.CurrentWinCoins, '36px bold Arial', '#fff').set({
                                    name: 'currentWinText',
                                    x: 110,
                                    y: 0,
                                    textAlign: 'center',
                                    textBaseline: 'middle',
                                    shadow: new createjs.Shadow('#C19433', 0, 0, 10)
                                });
                                currentWinContainer.addChild(currentWinTitle, currentWinText);
                                container.addChild(currentWinContainer);
                            }

                            if (bonusData.BonusEnd !== true){
                                readyAfterBonus();
                                setTimeout(function () {
                                    console.log("i am asking for new roll");
                                    clickCounter = 0;
                                    // levelNumber++;
                                    getBonusLevel();
                                }, 500);
                            } else {
                                if (bonusData.BonusEnd === true && bonusData.CurrentValue !== "Exit"){
                                    console.log("i won totalWin");
                                    setTimeout(function () {
                                        clickCounter = 0;
                                        levelNumber = 0;
                                        finishBonusLevel(container);
                                        container.removeChild(container.getChildByName('currentWinContainer'));
                                        console.warn("i call finish bonus level");
                                        readyAfterBonus();
                                    }, 200);
                                }
                            }
                        }
                    } else {
                        // Fail
                        console.warn("i am in fail");
                        container.removeChild(bonusWinResult);
                        let octopus = new createjs.Bitmap(loader.getResult('octopus')).set({
                            name: 'octopus',
                            x: 870,

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
                        }

                        setTimeout(function () {
                            clickCounter = 0;
                            levelNumber = 0;
                            finishBonusLevel(container);
                            container.removeChild(container.getChildByName('currentWinContainer'));
                            console.warn("i call finish bonus level");
                            readyAfterBonus();
                        }, 1000);
                    }
                }
            });
        });
    }

    function finishBonusLevel(container) {
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bonusStage;

        let finishText = new createjs.Bitmap(loader.getResult('totalWinText')).set({
            name: 'finishText',
            x: (1280 - 815) / 2,
            y: 70
        });

        let finishButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'finishButton',
            x: (1280 - 396) / 2,
            y: 560
        });

        let finishWinText = new createjs.BitmapText(bonusData.CurrentWinCoins+'', loader.getResult('totalWinFS')).set({
                name: 'finishWinText'
        });

        let l = (bonusData.CurrentWinCoins+'').length;
        console.log("length:", l);

        finishWinText.x = (1280 - l*168) / 2;
        finishWinText.y = (720 - 182) / 2;

        let darkness = new createjs.Shape();
        darkness.graphics.beginFill('#000').drawRect(0, 0, 1280, 720);
        darkness.alpha = 0;
        stage.addChild(darkness);
        container.addChild(finishText, finishWinText, finishButton);

        finishButton.on('mousedown', function () {
            finishButton.gotoAndStop('over');
        });
        finishButton.on('click', function () {

            createjs.Tween.get(darkness)
            .to({alpha: 1}, 500)
            .wait(200)
            .call(function () {
                stage.removeAllChildren();
                stage.nextStage = canvas.getStages().gameStage;
                spin.stopBonusLevel();
            });
        });
    }


    events.on('initBonusLevel', initBonusLevel);
    events.on('drawBonusLevel', drawBonusLevel);
    events.on('finishBonusLevel', finishBonusLevel);

    return {
        getBonusLevel,
        readyAfterBonus
    };

})();
