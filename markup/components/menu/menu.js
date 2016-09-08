let menu = (function () {
    /* eslint-disable no-undef */
    /* eslint-disable no-use-before-define */
    function showMenu(name) {
        let loader = preloader.getLoadResult();
        let bonusStage = canvas.getStages().bonusStage;
        let bonusStaticStage = canvas.getStages().bonusStaticStage;
        bonusStage.alpha = 1;

        let menuContainer = new createjs.Container().set({
            x: 1280,
            y: 0,
            name: 'menuContainer'
        });

        menuContainer.on('click', function (event) {
            event.stopPropagation();
            createjs.Sound.play("buttonClickSound");
        });

        let overlay = new createjs.Shape();
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

        let menuBG = new createjs.Bitmap(loader.getResult('menuBG')).set({
            name: 'menuBG'
        });
        let menuBack = new createjs.Sprite(loader.getResult('menuBack')).set({
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
                x: 82,
                y: 190 - 30
            });
            // if (!storage.readState('sound')) {
            //     soundButton.gotoAndStop('sound_off');
            // }
            // soundButton.on('click', handleSoundClick);
            // utils.getCenterPoint(soundButton);
            // const soundText = new c.Sprite(setSS, 'sound').set({
            //     name: 'soundText',
            //     x: 82 - 16,
            //     y: 190 + 70 - 30
            // });
            // utils.getCenterPoint(soundText);
            // const musicButton = new c.Sprite(setSS, 'music_on').set({
            //     name: 'musicButton',
            //     x: 217,
            //     y: 190 - 30
            // });
            // if (!storage.readState('music')) {
            //     musicButton.gotoAndStop('music_off');
            // }
            // musicButton.on('click', handleMusicClick);
            // utils.getCenterPoint(musicButton);
            // const musicText = new c.Sprite(setSS, 'music').set({
            //     name: 'musicText',
            //     x: 217 - 23,
            //     y: 190 + 70 - 30
            // });
            // utils.getCenterPoint(musicText);
            // const fastSpinButton = new c.Sprite(setSS, 'fastSpin_off').set({
            //     name: 'fastSpinButton',
            //     x: 82,
            //     y: 335 - 20
            // });
            // if (storage.readState('fastSpinSetting')) {
            //     fastSpinButton.gotoAndStop('fastSpin_on');
            // }
            // fastSpinButton.on('click', handleFastSpinClick);
            // utils.getCenterPoint(fastSpinButton);
            // const fastSpinText = new c.Sprite(setSS, 'fastSpin').set({
            //     name: 'fastSpinText',
            //     x: 82 - 3,
            //     y: 335 + 70 - 20
            // });
            // utils.getCenterPoint(fastSpinText);
            // const handModeButton = new c.Sprite(setSS, 'handMode_on').set({
            //     name: 'handModeButton',
            //     x: 217,
            //     y: 335 - 20
            // });
            // if (storage.readState('side') === 'left') {
            //     handModeButton.gotoAndStop('handMode_off');
            // }
            // handModeButton.on('click', handleHandModeClick);
            // utils.getCenterPoint(handModeButton);
            // const handModeText = new c.Sprite(setSS, 'handMode').set({
            //     name: 'handModeText',
            //     x: 217,
            //     y: 335 + 70 - 20
            // });
            // utils.getCenterPoint(handModeText);
            // const infoButton = new c.Sprite(setSS, 'info_off').set({
            //     name: 'infoButton',
            //     x: 82,
            //     y: 480
            // });
            // infoButton.on('click', handleInfoClick);
            // utils.getCenterPoint(infoButton);
            // const infoText = new c.Sprite(setSS, 'info').set({
            //     name: 'infoText',
            //     x: 82 - 24,
            //     y: 480 + 70
            // });
            // utils.getCenterPoint(infoText);
            // const historyButton = new c.Sprite(setSS, 'history_off').set({
            //     name: 'historyButton',
            //     x: 217,
            //     y: 480
            // });
            // historyButton.on('click', handleHistoryClick);
            // utils.getCenterPoint(historyButton);
            // const historyText = new c.Sprite(setSS, 'history').set({
            //     name: 'historyText',
            //     x: 217 - 13,
            //     y: 480 + 70
            // });
            // utils.getCenterPoint(historyText);

            menuContainer.addChild(menuSettingsTitle);
        }
        createjs.Tween.get(menuContainer)
            .to({x: 1280 - 302}, 300);
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

    return {
        showMenu,
        hideMenu
    };
})();
