/* eslint-disable */

let menu = (function () {
    /* eslint-disable no-undef */
    /* eslint-disable no-use-before-define */
    let musicOff = false;
    let soundOff = false;
    let fastSpinOn = false;
    let handModeOn = false;
    let menuContainer;
    let overlay;
    let menuBack;
    let menuBG;

    function showMenu(name) {
        let loader = preloader.getLoadResult();
        let bonusStage = canvas.getStages().bonusStage;
        let bonusStaticStage = canvas.getStages().bonusStaticStage;
        bonusStage.alpha = 1;

        menuContainer = new createjs.Container().set({
            x: 1280,
            y: 0,
            name: 'menuContainer'
        });

        menuContainer.on('click', function (event) {
            event.stopPropagation();
            createjs.Sound.play("buttonClickSound");
        });

        overlay = new createjs.Shape();
        overlay.set({
            name: 'overlay',
            alpha: 0
        });
        overlay.graphics.beginFill('rgba(0, 0, 0, 0.5)').drawRect(0, 0, 1280, 720);
        createjs.Tween.get(overlay)
            .to({alpha: 1}, 300);
        overlay.on('click', function (event) {
            createjs.Sound.play("buttonClickSound");
            createjs.Tween.get(menuContainer)
                .to({x: 1280}, 300);
            createjs.Tween.get(overlay)
                .to({alpha: 0}, 300)
                .call(hideMenu);
        });
        bonusStage.addChildAt(overlay, 0);
        bonusStage.addChild(menuContainer);

        menuBG = new createjs.Bitmap(loader.getResult('menuBG')).set({
            name: 'menuBG'
        });
        menuBack = new createjs.Sprite(loader.getResult('menuBack')).set({
            name: 'menuBack',
            x: (305 - 105) / 2,
            y: 584
        });
        menuBack.on('click', function () {
            createjs.Sound.play("buttonClickSound");
            menuBack.gotoAndStop('down');
            createjs.Tween.get(menuContainer)
            .to({x: 1280}, 300);
            createjs.Tween.get(overlay)
            .to({alpha: 0}, 300)
            .call(hideMenu);
        });
        menuContainer.addChild(menuBG, menuBack);
        if (name === 'bet') {
            let menuBetTitle = new createjs.Bitmap(loader.getResult('menuBetTitle')).set({
                name: 'menuBetTitle',
                x: (305 - 185) / 2,
                y: 35
            });
            let menuMaxBet = new createjs.Sprite(loader.getResult('menuMaxBet'), 'out').set({
                name: 'menuMaxBet',
                x: (305 - 135) / 2,
                y: 100
            });
            let menuBetMinus = new createjs.Sprite(loader.getResult('menuMinusPlus'), 'minus_out').set({
                name: 'menuBetMinus',
                x: 40,
                y: 326
            });
            let menuBetPlus = new createjs.Sprite(loader.getResult('menuMinusPlus'), 'plus_out').set({
                name: 'menuBetPlus',
                x: 208,
                y: 326
            });
            let betValue = balance.getBalanceData().betValue;
            let coinsValue = balance.getBalanceData().coinsValue;
            let menuBetText = new createjs.Text(betValue, 'bold 60px Titania', '#ddd').set({
                name: 'menuBetText',
                textAlign: 'center',
                textBaseline: 'middle',
                x: 152,
                y: 346,
                shadow: new createjs.Shadow('#ddd', 0, 0, 8)
            });
            let menuCoinsText = new createjs.Text(coinsValue, 'bold 35px Titania', '#ddd').set({
                name: 'menuCoinsText',
                textAlign: 'center',
                textBaseline: 'middle',
                x: 152,
                y: 514,
                shadow: new createjs.Shadow('#ddd', 0, 0, 8)
            });
            let menuCoinMinus = new createjs.Sprite(loader.getResult('menuMinusPlus'), 'minus_out').set({
                name: 'menuCoinMinus',
                x: 40,
                y: 485
            });
            let menuCoinPlus = new createjs.Sprite(loader.getResult('menuMinusPlus'), 'plus_out').set({
                name: 'menuCoinPlus',
                x: 208,
                y: 485
            });
            menuMaxBet.on('click', function () {
                balance.changeBet(true, true);
                balance.changeCoins(true, true);
                menuBetText.text = balance.getBalanceData().betValue;
                menuCoinsText.text = balance.getBalanceData().coinsValue;
                createjs.Sound.play("buttonClickSound");
            });
            menuCoinPlus.on('click', function () {
                balance.changeCoins(true);
                menuCoinsText.text = balance.getBalanceData().coinsValue;
                createjs.Sound.play("buttonClickSound");
            });
            menuCoinMinus.on('click', function () {
                balance.changeCoins(false);
                menuCoinsText.text = balance.getBalanceData().coinsValue;
                createjs.Sound.play("buttonClickSound");
            });
            menuBetPlus.on('click', function () {
                balance.changeBet(true);
                menuBetText.text = balance.getBalanceData().betValue;
                createjs.Sound.play("buttonClickSound");
            });
            menuBetMinus.on('click', function () {
                balance.changeBet(false);
                menuBetText.text = balance.getBalanceData().betValue;
                createjs.Sound.play("buttonClickSound");
            });
            let menuBetLevel = new createjs.Bitmap(loader.getResult('menuBetLevel')).set({
                name: 'menuBetLevel',
                x: (305 - 121) / 2,
                y: 264
            });
            let menuBetBG = new createjs.Bitmap(loader.getResult('menuDisc')).set({
                name: 'menuBetBG',
                x: (305 - 105) / 2,
                y: 295
            });
            let menuCoinValue = new createjs.Bitmap(loader.getResult('menuCoinValue')).set({
                name: 'menuCoinValue',
                x: (305 - 139) / 2,
                y: 432
            });
            let menuCoinBG = menuBetBG.clone().set({
                name: 'menuCoinBG',
                y: 460
            });
            let menuDivider1 = new createjs.Bitmap(loader.getResult('menuDivider')).set({
                name: 'menuDivider1',
                x: (305 - 47) / 2,
                y: 90
            });
            let menuDivider2 = menuDivider1.clone().set({
                name: 'menuDivider2',
                y: 245
            });
            let menuDivider3 = menuDivider1.clone().set({
                name: 'menuDivider3',
                y: 414
            });
            let menuDivider4 = menuDivider1.clone().set({
                name: 'menuDivider4',
                y: 575
            });
            menuContainer.addChild(menuBetTitle, menuMaxBet, menuBetLevel, menuBetBG, menuBetPlus, menuBetMinus, menuBetText, menuCoinValue, menuCoinBG, menuCoinPlus, menuCoinMinus, menuCoinsText, menuDivider1, menuDivider2, menuDivider3, menuDivider4);
        } else if (name === 'auto') {
            let menuAutoTitle = new createjs.Bitmap(loader.getResult('menuAutoTitle')).set({
                name: 'menuAutoTitle',
                x: (305 - 238) / 2,
                y: 35
            });
            let menuAutoCircle = new createjs.Bitmap(loader.getResult('menuDisc')).set({
                regX: 52,
                regY: 52
            });
            let menuAutoText = new createjs.Text('', 'bold 50px Titania', '#ddd').set({
                textAlign: 'center',
                textBaseline: 'middle',
                shadow: new createjs.Shadow('#ddd', 0, 0, 8)
            });
            let menuAutoCircle10 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle10'
            });
            let menuAutoText10 = menuAutoText.clone().set({
                text: 10,
                name: 'menuAutoText10'
            });
            let menuAutoButton10 = new createjs.Container().set({
                amount: 10,
                name: 'menuAutoButton10',
                x: 82,
                y: 190
            });
            menuAutoButton10.addChild(menuAutoCircle10, menuAutoText10);
            let menuAutoCircle25 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle25'
            });
            let menuAutoText25 = menuAutoText.clone().set({
                text: 25,
                name: 'menuAutoText25'
            });
            let menuAutoButton25 = new createjs.Container().set({
                amount: 25,
                name: 'menuAutoButton25',
                x: 217,
                y: 190
            });
            menuAutoButton25.addChild(menuAutoCircle25, menuAutoText25);
            let menuAutoCircle50 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle50'
            });
            let menuAutoText50 = menuAutoText.clone().set({
                text: 50,
                name: 'menuAutoText50'
            });
            let menuAutoButton50 = new createjs.Container().set({
                amount: 50,
                name: 'menuAutoButton50',
                x: 82,
                y: 335
            });
            menuAutoButton50.addChild(menuAutoCircle50, menuAutoText50);
            let menuAutoCircle100 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle100'
            });
            let menuAutoText100 = menuAutoText.clone().set({
                text: 100,
                font: 'bold 36px Titania',
                name: 'menuAutoText100'
            });
            let menuAutoButton100 = new createjs.Container().set({
                amount: 100,
                name: 'menuAutoButton100',
                x: 217,
                y: 335
            });
            menuAutoButton100.addChild(menuAutoCircle100, menuAutoText100);
            let menuAutoCircle250 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle250'
            });
            let menuAutoText250 = menuAutoText.clone().set({
                text: 250,
                font: 'bold 36px Titania',
                name: 'menuAutoText250'
            });
            let menuAutoButton250 = new createjs.Container().set({
                amount: 250,
                name: 'menuAutoButton250',
                x: 82,
                y: 480
            });
            menuAutoButton250.addChild(menuAutoCircle250, menuAutoText250);
            let menuAutoCircle500 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle500'
            });
            let menuAutoText500 = menuAutoText.clone().set({
                text: 500,
                font: 'bold 36px Titania',
                name: 'menuAutoText500'
            });
            let menuAutoButton500 = new createjs.Container().set({
                amount: 500,
                name: 'menuAutoButton500',
                x: 217,
                y: 480
            });
            menuAutoButton500.addChild(menuAutoCircle500, menuAutoText500);
            menuContainer.addChild(menuAutoTitle, menuAutoButton10, menuAutoButton25, menuAutoButton50, menuAutoButton100, menuAutoButton250, menuAutoButton500);
            menuAutoButton10.on('click', _autoPlayClick);
            menuAutoButton25.on('click', _autoPlayClick);
            menuAutoButton50.on('click', _autoPlayClick);
            menuAutoButton100.on('click', _autoPlayClick);
            menuAutoButton250.on('click', _autoPlayClick);
            menuAutoButton500.on('click', _autoPlayClick);
        } else if (name === 'settings') {
            const menuSettingsTitle = new createjs.Bitmap(loader.getResult('menuSettingsTitle')).set({
                name: 'menuSettingsTitle',
                x: (305 - 219) / 2,
                y: 35
            });

            const setSS = loader.getResult('settings');

            const soundButton = new createjs.Sprite(setSS, 'sound_on').set({
                name: 'soundButton',
                x: 92,
                y: 180 - 30,
                regX: 55,
                regY: 55
            });

            const soundText = new createjs.Sprite(setSS, 'sound').set({
                name: 'soundText',
                x: 92 - 50,
                y: 180 + 40
            });

            soundButton.on('click', function () {
                soundOff = !soundOff;

                if (!soundOff) {
                    soundButton.gotoAndStop('sound_off');
                    createjs.Sound.muted = true;
                } else {
                    soundButton.gotoAndStop('sound_on');
                    createjs.Sound.muted = false;
                }
                // Внешний вид кнопок
            });

            const musicButton = new createjs.Sprite(setSS, 'music_on').set({
                name: 'musicButton',
                x: 226,
                y: 180 - 30,
                regX: 55,
                regY: 55
            });

            const musicText = new createjs.Sprite(setSS, 'music').set({
                name: 'musicText',
                x: 226 - 50,
                y: 180 + 40
            });

            musicButton.on('click', function () {
                musicOff = !musicOff;

                if (!musicOff) {
                    musicButton.gotoAndStop('music_off');
                    preloader.getBackgroundSound().volume = 0;
                } else {
                    musicButton.gotoAndStop('music_on');
                    preloader.getBackgroundSound().volume = 1;
                }
                // Внешний вид кнопок
            });

            const fastSpinButton = new createjs.Sprite(setSS, 'fastSpin_off').set({
                name: 'fastSpinButton',
                x: 92,
                y: 335 - 20,
                regX: 55,
                regY: 55
            });

            const fastSpinText = new createjs.Sprite(setSS, 'fastSpin').set({
                name: 'fastSpinText',
                x: 92 - 50,
                y: 335 + 50
            });

            fastSpinButton.on('click', function () {
                fastSpinOn = !fastSpinOn;

                if (!fastSpinOn) {
                    fastSpinButton.gotoAndStop('fastSpin_off');
                } else {
                    fastSpinButton.gotoAndStop('fastSpin_on');
                }
                // Внешний вид кнопок
            });

            const handModeButton = new createjs.Sprite(setSS, 'handMode_on').set({
                name: 'handModeButton',
                x: 226,
                y: 335 - 20,
                regX: 55,
                regY: 55
            });

            const handModeText = new createjs.Sprite(setSS, 'handMode').set({
                name: 'handModeText',
                x: 226 - 50,
                y: 335 + 50
            });

            handModeButton.on('click', function () {
                handModeOn = !handModeOn;

                if (!handModeOn) {
                    handleHandMode('right');
                } else {
                    handleHandMode('left');
                }
            });

            const infoButton = new createjs.Sprite(setSS, 'info_on').set({
                name: 'infoButton',
                x: 92,
                y: 480,
                regX: 55,
                regY: 55
            });

            const infoText = new createjs.Sprite(setSS, 'info').set({
                name: 'infoText',
                x: 92 - 50,
                y: 480 + 70
            });

            const rulesContainer = new createjs.Container().set({
                name: 'rulesContainer',
                alpha: 0
            });

            const rules = new createjs.Bitmap(loader.getResult('rules')).set({
                name: 'rules'
            });

            const playButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
                name: 'playButton',
                x: (1280 - 396) - 100,
                y: 500
            });

            rulesContainer.addChild(rules, playButton);
            bonusStage.addChild(rulesContainer);

            infoButton.on('click', function () {
                createjs.Tween.get(rulesContainer)
                .to({alpha: 1});
            });

            playButton.on('click', function () {
                createjs.Tween.get(rulesContainer)
                .to({alpha: 0});
            });

            const historyButton = new createjs.Sprite(setSS, 'history_on').set({
                name: 'historyButton',
                x: 226,
                y: 480,
                regX: 55,
                regY: 55
            });

            const historyText = new createjs.Sprite(setSS, 'history').set({
                name: 'historyText',
                x: 226 - 50,
                y: 480 + 70
            });

            historyButton.on('click', function () {
                balance.error('Comming soon!');
                createjs.Tween.get(overlay)
                    .to({alpha: 0}, 300)
                createjs.Tween.get(menuContainer)
                    .to({x: 1280}, 300);
            });

            menuContainer.addChild(menuSettingsTitle, soundButton, soundText, musicButton, musicText, fastSpinButton, fastSpinText, handModeButton, handModeText, infoButton, infoText, historyButton, historyText);
        }

        // Выезд меню контейнера
        if (!handModeOn) {
            createjs.Tween.get(menuContainer)
                .to({x: 1280 - 302}, 300);
        } else {
            menuContainer.x = -300;
            createjs.Tween.get(menuContainer)
                .to({x: 0}, 300);

            overlay.on('click', function (event) {
                createjs.Tween.get(menuContainer, {override:true})
                    .to({x: -500}, 300);
            });

            menuBack.on('click', function () {
                createjs.Tween.get(menuContainer, {override:true})
                .to({x: -500}, 300);
            });
        }

    }

    function _autoPlayClick() {
        /* eslint-disable no-invalid-this */
        createjs.Sound.play("buttonClickSound");
        console.log('Amount autoPlay is:', this.amount);
        events.trigger('initAutoplay', this.amount);
        let menuContainer = canvas.getStages().bonusStage.getChildByName('menuContainer');
        let overlay = canvas.getStages().bonusStage.getChildByName('overlay');
        createjs.Tween.get(menuContainer)
        .to({x: 1280}, 300);
        createjs.Tween.get(overlay)
        .to({alpha: 0}, 300)
        .call(hideMenu);
    }

    function hideMenu() {
        let bonusStage = canvas.getStages().bonusStage;
        let bonusStaticStage = canvas.getStages().bonusStaticStage;
        bonusStage.alpha = 0;
        bonusStaticStage.alpha = 0;
        bonusStaticStage.removeAllChildren();
        bonusStage.removeAllChildren();
        bonusStage.nextStage = canvas.getStages().gameStage;
    }

    function getFastSpin() {
        return fastSpinOn;
    }

    function getMusicFlag() {
        return musicOff;
    }

    function getSoundFlag() {
        return soundOff;
    }

    function handleHandMode(side){
        console.log('side', side);
        if (side === 'left') {
            let moveX = 130;

            // createjs.Tween.get(menuBG)
            //     .to({skewX: 180}, 300)

            menuContainer.x = 0;

            overlay.on('click', function (event) {
                createjs.Tween.get(menuContainer, {override:true})
                    .to({x: -500}, 300);
            });

            menuBack.on('click', function () {
                createjs.Tween.get(menuContainer, {override:true})
                .to({x: -500}, 300);
            });

            let gameStage = canvas.getStages().gameStage;

            let buttonsContainer = gameStage.getChildByName('buttonsContainer');
                buttonsContainer.x = -1200;
                console.log('buttonsContainer', buttonsContainer);

            let winRectsContainer = canvas.getStages().gameStage;
                winRectsContainer.x = winRectsContainer.x + moveX;

            let bgStage = canvas.getStages().bgStage;
            let gameContainer = bgStage.getChildByName('gameContainer');
                gameContainer.x = gameContainer.x + moveX;
                gameContainer.mask.x = gameContainer.mask.x + moveX;
            let winLinesContainer = bgStage.getChildByName('winLinesContainer');
                winLinesContainer.x = winLinesContainer.x + moveX;

            let bgStaticStage = canvas.getStages().bgStaticStage;
            let gameBG = bgStaticStage.getChildByName('gameBG');
                gameBG.x = gameBG.x + moveX;

            let gameStaticStage = canvas.getStages().gameStaticStage;
            let gameMachine = gameStaticStage.getChildByName('gameMachine');
                gameMachine.x = gameMachine.x + moveX;
            let balanceContainer = gameStaticStage.getChildByName('balanceContainer');
                balanceContainer.x = balanceContainer.x + moveX;

            createjs.Ticker.on('tick', function () {
                if(gameStaticStage.getChildByName('labelLight')) {
                    let labelLight = gameStaticStage.getChildByName('labelLight');
                    labelLight.x = 577;
                } else {
                    return;
                }
            });

            createjs.Ticker.on('tick', function () {
                if(gameStaticStage.getChildByName('eyeLight')) {
                    let eyeLight = gameStaticStage.getChildByName('eyeLight');
                    eyeLight.x = 572;
                } else {
                    return;
                }
            });
        } else {
            let moveX = -130;

            menuContainer.x = 1000;

            // createjs.Tween.get(menuBG)
            //     .to({skewX: 180}, 300)

            overlay.on('click', function (event) {
                createjs.Tween.get(menuContainer, {override:true})
                    .to({x: 1280}, 300);
            });

            menuBack.on('click', function () {
                createjs.Tween.get(menuContainer, {override:true})
                .to({x: 1280}, 300);
            });

            let gameStage = canvas.getStages().gameStage;

            let buttonsContainer = gameStage.getChildByName('buttonsContainer');
                buttonsContainer.x = buttonsContainer.x + 1200;
                console.log('buttonsContainer', buttonsContainer);

            let winRectsContainer = canvas.getStages().gameStage;
                winRectsContainer.x = winRectsContainer.x + moveX;

            let bgStage = canvas.getStages().bgStage;
            let gameContainer = bgStage.getChildByName('gameContainer');
                gameContainer.x = gameContainer.x + moveX;
                gameContainer.mask.x = gameContainer.mask.x + moveX;
            let winLinesContainer = bgStage.getChildByName('winLinesContainer');
                winLinesContainer.x = winLinesContainer.x + moveX;

            let bgStaticStage = canvas.getStages().bgStaticStage;
            let gameBG = bgStaticStage.getChildByName('gameBG');
                gameBG.x = gameBG.x + moveX;

            let gameStaticStage = canvas.getStages().gameStaticStage;
            let gameMachine = gameStaticStage.getChildByName('gameMachine');
                gameMachine.x = gameMachine.x + moveX;
            let balanceContainer = gameStaticStage.getChildByName('balanceContainer');
                balanceContainer.x = balanceContainer.x + moveX;

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
    }

    return {
        showMenu,
        hideMenu,
        getFastSpin,
        getMusicFlag,
        getSoundFlag
    };
})();
