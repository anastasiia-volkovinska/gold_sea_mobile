    /* eslint-disable */
let bonuses = (function () {

    let doors = [];
    let bonusData;
    let clickCounter = 0;

    function initBonusLevel() {
        console.log("i am in bonuses");
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
                    currentLevel = 1;
                    getBonusLevel();
                }
            )
            .wait(200)
            .to({alpha: 0}, 500)
            .call(function () {
                stage.removeChild(darkness);
            });
    }

    function drawBonusLevel() {

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

        doors.forEach((door) => {
            door.stop();
            illuminatorContainer.addChild(door);
        });

        bonusContainer.addChild(bonusBG, illuminatorContainer, bonusFG);
        stage.addChildAt(bonusContainer, 0);

        addClickHandlers(doors, bonusContainer, bonusFG);
    }

    function getCurrentData() {
        return bonusData;
    }

    function addClickHandlers(arr, container, el) {
        let loader = preloader.getLoadResult();
        let bonusWinResult;
            doors.forEach((door) => {
                door.on('click', function () {
                    if (clickCounter < 1) {
                        clickCounter++;
                    let currentData = getCurrentData();
                    if (currentData.CurrentValue === "Exit") { // Fail
                        console.log("i am in fail");
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
                            let newBonusFail = bonusFail.clone(true);
                            if(i === 0){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y - 5})}
                            if(i === 1){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y - 5, rotation: 60})}
                            if(i === 2){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y - 5, rotation: 220, skewY: 180})}
                            if(i === 3){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y - 5, rotation: 140, skewY: 180})}
                            if(i === 4){newBonusFail.set({x: doors[i].x - 5, y: doors[i].y - 5, rotation: 50, skewY: 180})}
                            tentacles.push(newBonusFail);
                        }

                        for(let i = 0; i < 5; i++){
                              container.removeChild(container.getChildByName("bonusWinResult"));
                              createjs.Tween.get(doors[i])
                                .to({alpha: 0}, 300);
                                container.addChild(tentacles[i]);
                        }

                        setTimeout(function () {
                            finishBonusLevel(container);
                        }, 1500);

                    } else { //Win
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
                        createjs.Tween.get(door)
                            .to({alpha: 0}, 300)
                            .call(
                                function () {

                                }
                            )

                        createjs.Tween.get(light)
                        .to({alpha: 0.9}, 300)

                        bonusWin.play();

                        let bonusWinCounter = 0;
                           bonusWin.on('animationend', function () {
                               bonusWinCounter++;
                               if (bonusWinCounter > 3) {
                                   createjs.Tween.get(bonusWin)
                                   .to({alpha: 0}, 300)
                                   .call(
                                       function () {
                                           container.removeChild(bonusWin);
                                           bonusWinResult.gotoAndStop(currentData.CurrentValue+'table');
                                           container.addChild(bonusWinResult);
                                           clickCounter = 0;
                                           readyAfterBonus();
                                           setTimeout(function () {
                                                getBonusLevel();
                                           }, 500);
                                       }
                                   )
                                   createjs.Tween.get(light)
                                   .to({alpha: 0}, 300)
                                   .call(
                                       function () {
                                           container.removeChild(light);
                                       }
                                    )
                                }
                                let counter = 0;
                                doors.forEach((door) => {
                                    if (door.alpha === 0) {
                                        counter++;
                                    }
                                    if (counter === 5){
                                        setTimeout(function () {
                                            finishBonusLevel(container);
                                        }, 1500);
                                    }
                                });
                            })
                        }
                    }
                });
            });
        }
    function readyAfterBonus() {
        let sessionID = login.getSessionID();
        utils.request('_Ready/', `${sessionID}`).then((data) => {
            console.log('ready data:', data);
        });
    }

    function getBonusLevel() {
        let sessionID = login.getSessionID();
        utils.request('_Roll/', `${sessionID}/1/1`)
        .then((data) => {
            bonusData = data;
            if (bonusData.OldValues.length === 0) {
                drawBonusLevel()
            }
            console.log('This is bonus data:', data);
        });
    }

    function finishBonusLevel(container) {
        let loader = preloader.getLoadResult();
        let currentData = getCurrentData();
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

        let finishWinText = new createjs.BitmapText(currentData.CurrentWinCoins+'', loader.getResult('totalWinFS')).set({
                name: 'finishWinText'
        });

        finishWinText.x = (1280 - finishWinText.getBounds().width) / 2;
        finishWinText.y = (720 - finishWinText.getBounds().height) / 2;

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
            });
        });
    }


    events.on('initBonusLevel', initBonusLevel);
    // events.on('drawBonusLevel', drawBonusLevel);
    // events.on('finishBonusLevel', finishBonusLevel);
    //
    // return {
    //     getBonusLevel,
    //     readyAfterBonus
    // };
})();
