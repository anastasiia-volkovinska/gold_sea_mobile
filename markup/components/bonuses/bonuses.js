    /* eslint-disable */
let bonuses = (function () {

    let currentLevel = 1;

    function initBonusLevel() {
        console.log("i am in bonuses");
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bonusStage;
        stage.alpha = 1;
        stage.nextStage = null;
        let initContainer = new createjs.Container().set({
            name: 'initContainer',
            alpha: 0
        });
        let initBG = new createjs.Bitmap(loader.getResult('multiBG')).set({
            name: 'initBG'
        });
        let initText = new createjs.Text('You are starting Bonus Level!!!', '80px bold Arial', '#fff').set({
            name: 'initText',
            x: 1280 / 2,
            y: 720 / 2,
            textAlign: 'center',
            textBaseline: 'middle'
        });

        createjs.Tween.get(initContainer)
            .to({alpha: 1}, 500)
            .call(
                function () {
                    currentLevel = 1;
                    getBonusLevel();
                }
            );
        initBG.on('click', function () {
            createjs.Tween.get(initContainer)
                .to({alpha: 0}, 500)
                .call(function () {
                    stage.removeChild(initContainer);
                });
        });
        initContainer.addChild(initBG, initText);

        stage.addChild(initContainer);
    }

    function drawBonusLevel(level, data) {
        console.log('I am drawing level', level, 'with data:', data);
        let clickCounter = 0;
        let stage = canvas.getStages().bonusStage;
        let loader = preloader.getLoadResult();
        if (stage.getChildByName('bonusContainer')) {
            stage.removeChild(stage.getChildByName('bonusContainer'));
            stage.removeChild(stage.getChildByName('winText'));
        }
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

        let bonusWin = new createjs.Sprite('bonusWin').set({
            name: 'bonusWin',
            x: 900,
            y: 339
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

        illuminator_1.stop();
        illuminator_2.stop();
        illuminator_3.stop();
        illuminator_4.stop();
        illuminator_5.stop();

        // doorSpriteClick(door_1);
        // doorSpriteClick(door_2);
        // doorSpriteClick(door_3);
        // doorSpriteClick(door_4);
        // doorSpriteClick(door_5);
        //
        // function doorSpriteClick(door) {
        //     door.on('click', function () {
        //         if (clickCounter < 1) {
        //             clickCounter++;
        //             door.play();
        //             if (data.CurrentValue !== 'Exit') {
        //                 showBonusWin(data.CurrentValue);
        //             } else {
        //                 setTimeout(function () {
        //                     events.trigger('finishBonusLevel')
        //                 }, 750)
        //             }
        //             door.on('animationend', function functionName() {
        //                 door.stop();
        //             });
        //         }
        //     });
        // }

        illuminatorContainer.removeAllChildren();
        illuminatorContainer.addChild(illuminator_1, illuminator_2, illuminator_3, illuminator_4, illuminator_5);

        bonusContainer.addChild(bonusBG, illuminatorContainer, bonusFG);
        stage.addChildAt(bonusContainer, 0);
    }

    // function showBonusWin(win) {
    //     console.log('I must show win:', win);
    //     let stage = canvas.getStages().bonusStage;
    //     let winText = new createjs.Text(win, '175px bold Arial', '#fff').set({
    //         name: 'winText',
    //         x: 1280 / 2,
    //         y: 760 / 2,
    //         textAlign: 'center',
    //         textBaseline: 'middle',
    //         scaleX: 0.1,
    //         scaleY: 0.1
    //     });
    //     stage.addChild(winText);
    //     createjs.Tween.get(winText)
    //     .to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.bounceOut)
    //     .call(
    //         setTimeout(function () {
    //             callNextBonusLevel();
    //         }, 1000)
    //     );
    // }
    //
    // function finishBonusLevel() {
    //     let stage = canvas.getStages().bonusStage;
    //     stage.removeAllChildren();
    //     stage.nextStage = canvas.getStages().gameStage;
    //     readyAfterBonus();
    // }
    //
    // function callNextBonusLevel() {
    //     console.log('I am calling next Level');
    //     readyAfterBonus();
    //     let stage = canvas.getStages().bonusStage;
    //     let darkness = new createjs.Shape();
    //     darkness.graphics.beginFill('#000').drawRect(0, 0, 1280, 720);
    //     darkness.alpha = 0;
    //     stage.addChild(darkness);
    //     createjs.Tween.get(darkness)
    //     .to({alpha: 1}, 500)
    //     .call(function () {
    //         currentLevel++;
    //         getBonusLevel();
    //     })
    //     .wait(500)
    //     .to({alpha: 0}, 500)
    //     .call(function () {
    //         stage.removeChild(darkness);
    //     });
    // }

    function getBonusLevel() {
        let sessionID = login.getSessionID();
        utils.request('_Roll/', `${sessionID}/1/1`)
        .then((data) => {
            drawBonusLevel(currentLevel, data)
            console.log('This is bonus data:', data);
        });
    }

    // function readyAfterBonus() {
    //     let sessionID = login.getSessionID();
    //     utils.request('_Ready/', `${sessionID}`).then((data) => {
    //         console.log('ready data:', data);
    //     });
    // }
    //
    events.on('initBonusLevel', initBonusLevel);
    // events.on('drawBonusLevel', drawBonusLevel);
    // events.on('finishBonusLevel', finishBonusLevel);
    //
    // return {
    //     getBonusLevel,
    //     readyAfterBonus
    // };
})();
