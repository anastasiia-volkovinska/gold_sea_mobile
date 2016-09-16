/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */

const preloaderManifest = [
    {id: 'preloaderBG', src: 'static/img/content/preloader/preloaderBG.png'},
    {id: 'preloaderPlay', src: 'static/img/content/preloader/preloaderPlay.png'},
    {id: 'preloaderLogo', src: 'static/img/content/preloader/preloaderLogo.png'},
    {id: 'preloaderLogoBrands', src: 'static/img/content/preloader/preloaderLogoBrands.png'},
    {id: 'preloaderSprite', src: 'static/img/content/preloader/preloaderSprite.json', type: 'spritesheet'}
];

const mainManifest = [
    // bg
    {id: 'fsBG', src: 'static/img/content/bg/fsBG.png'},
    {id: 'mainBG', src: 'static/img/content/bg/mainBG.png'},
    {id: 'gameBG', src: 'static/img/content/bg/gameBG.png'},
    {id: 'footerBG', src: 'static/img/content/bg/footerBG.png'},
    {id: 'gameMachine', src: 'static/img/content/bg/gameMachine.png'},
    {id: 'gameShadow', src: 'static/img/content/bg/gameShadow.png'},
    {id: 'transitionBG', src: 'static/img/content/bg/transitionBG.png'},
    {id: 'multiBG', src: 'static/img/content/bg/multiBG.png'},
    {id: 'homeBG', src: 'static/img/content/bg/homeBG.png'},
    {id: 'bubbleBG', src: 'static/img/content/bg/bubbleBG.png'},
    {id: 'fishBG', src: 'static/img/content/bg/fishBG.json', type: 'spritesheet'},
    {id: 'sharkBG', src: 'static/img/content/bg/sharkBG.json', type: 'spritesheet'},
    {id: 'logoLight', src: 'static/img/content/bg/logoLight.json', type: 'spritesheet'},
    {id: 'eyeLight', src: 'static/img/content/bg/eyeLight.png'},
    {id: 'popup', src: 'static/img/content/bg/popup.png'},
    {id: 'rules', src: 'static/img/content/bg/rules.png'},
    // freespin
    {id: 'vodolaz', src: 'static/img/content/freespin/vodolaz.png'},
    {id: 'sunduk', src: 'static/img/content/freespin/sunduk.png'},
    {id: 'osminog', src: 'static/img/content/freespin/osminog.png'},
    {id: 'freeSpinsText', src: 'static/img/content/freespin/freeSpinsText.png'},
    {id: 'bigWinText', src: 'static/img/content/freespin/bigWinText.png'},
    {id: 'totalWinText', src: 'static/img/content/freespin/totalWinText.png'},
    {id: 'totalWinFS', src: 'static/img/content/freespin/totalWinFS.json', type: 'spritesheet'},
    {id: 'multiTitle', src: 'static/img/content/freespin/multiTitle.png'},
    {id: 'multiCoins', src: 'static/img/content/freespin/multiCoins.png'},
    {id: 'bgChest', src: 'static/img/content/freespin/bgChest.png'},
    {id: 'bgDiver1', src: 'static/img/content/freespin/bgDiver1.png'},
    {id: 'bgDiver2', src: 'static/img/content/freespin/bgDiver2.png'},
    {id: 'buttonDiver', src: 'static/img/content/freespin/buttonDiver.png'},
    {id: 'chest', src: 'static/img/content/freespin/chest.png'},
    {id: 'diver', src: 'static/img/content/freespin/diver.png'},
    {id: 'glassChest', src: 'static/img/content/freespin/glassChest.png'},
    {id: 'goldChest', src: 'static/img/content/freespin/goldChest.png'},
    {id: 'numberChest', src: 'static/img/content/freespin/numberChest.png'},
    {id: 'numberDiver', src: 'static/img/content/freespin/numberDiver.png'},
    {id: 'numbersChest', src: 'static/img/content/freespin/numbersChest.png'},
    {id: 'numbersDiver', src: 'static/img/content/freespin/numbersDiver.png'},
    {id: 'puziryChest', src: 'static/img/content/freespin/puziryChest.json', type: 'spritesheet'},
    {id: 'puziryDiver', src: 'static/img/content/freespin/puziryDiver.png'},
    {id: 'ramkaChest', src: 'static/img/content/freespin/ramkaChest.png'},
    {id: 'ramkaDiver', src: 'static/img/content/freespin/ramkaDiver.png'},
    {id: 'temnotaDiver', src: 'static/img/content/freespin/temnotaDiver.png'},
    {id: 'verevkaDiver', src: 'static/img/content/freespin/verevkaDiver.png'},
    {id: 'chestBig', src: 'static/img/content/freespin/chestBig.png'},
    {id: 'chestOpen', src: 'static/img/content/freespin/chestOpen.json', type: 'spritesheet'},
    {id: 'freeSpinLevel', src: 'static/img/content/freespin/freeSpinLevel.png'},
    // bonuses
    {id: 'bonusBG', src: 'static/img/content/bonuses/bonusBG.png'},
    {id: 'bonusFG', src: 'static/img/content/bonuses/bonusFG.png'},
    {id: 'bonusWin', src: 'static/img/content/bonuses/bonusWin.json', type: 'spritesheet'},
    {id: 'bonusWinResult', src: 'static/img/content/bonuses/bonusWinResult.json', type: 'spritesheet'},
    {id: 'bonusFail', src: 'static/img/content/bonuses/bonusFail.json', type: 'spritesheet'},
    {id: 'illuminators', src: 'static/img/content/bonuses/illuminators.json', type: 'spritesheet'},
    {id: 'octopus', src: 'static/img/content/bonuses/octopus.png'},
    {id: 'light', src: 'static/img/content/bonuses/light.png'},
    {id: 'upperLight', src: 'static/img/content/bonuses/upperLight.png'},
    {id: 'bigFish', src: 'static/img/content/bonuses/bigFish.json', type: 'spritesheet'},
    {id: 'bonusWinText', src: 'static/img/content/bonuses/bonusWinText.png'},
    // buttons
    {id: 'spinButton', src: 'static/img/content/buttons/spin.json', type: 'spritesheet'},
    {id: 'autoButton', src: 'static/img/content/buttons/auto.json', type: 'spritesheet'},
    {id: 'betButton', src: 'static/img/content/buttons/bet.json', type: 'spritesheet'},
    {id: 'menuButton', src: 'static/img/content/buttons/menu.json', type: 'spritesheet'},
    {id: 'soundButton', src: 'static/img/content/buttons/sound.json', type: 'spritesheet'},
    {id: 'continueButton', src: 'static/img/content/buttons/continue.json', type: 'spritesheet'},
    // menu
    {id: 'menuBG', src: 'static/img/content/menu/menuBG.png'},
    {id: 'menuBetTitle', src: 'static/img/content/menu/menuBetTitle.png'},
    {id: 'menuAutoTitle', src: 'static/img/content/menu/menuAutoTitle.png'},
    {id: 'menuSettingsTitle', src: 'static/img/content/menu/menuSettingsTitle.png'},
    {id: 'menuBetLevel', src: 'static/img/content/menu/menuBetLevel.png'},
    {id: 'menuCoinValue', src: 'static/img/content/menu/menuCoinValue.png'},
    {id: 'menuDisc', src: 'static/img/content/menu/menuDisc.png'},
    {id: 'menuDivider', src: 'static/img/content/menu/menuDivider.png'},
    {id: 'menuMaxBet', src: 'static/img/content/menu/menuMaxBet.json', type: 'spritesheet'},
    {id: 'menuMinusPlus', src: 'static/img/content/menu/menuMinusPlus.json', type: 'spritesheet'},
    {id: 'menuBack', src: 'static/img/content/menu/menuBack.json', type: 'spritesheet'},
    {id: 'settings', src: 'static/img/content/menu/settings.json', type: 'spritesheet'},
    // lines
    {id: 'linesDisc', src: 'static/img/content/lines/linesDisc.json', type: 'spritesheet'},
    {id: 'linesSprite', src: 'static/img/content/lines/linesSprite.json', type: 'spritesheet'},
    {id: 'winLineRect', src: 'static/img/content/lines/winLineRect.png'},
    {id: 'winTotalRect', src: 'static/img/content/lines/winTotalRect.png'},
    {id: 'winTotal', src: 'static/img/content/lines/winTotal.json', type: 'spritesheet'},
    {id: 'bubblesForWinLines', src: 'static/img/content/lines/bubblesForWinLines.json', type: 'spritesheet'},
    // elements
    {id: 'elements', src: 'static/img/content/elements/elements.json', type: 'spritesheet'}
];

let preloader = ( function () {

    // Stage
    let stage;
    let backgroundSound;

    // Data
    let loadResult;

    // Counter
    let filesLoaded = 0;

    function downloadManifest() {
        /* eslint-disable no-undef */
        /* eslint-disable no-use-before-define */
        const loader = new createjs.LoadQueue(true);
        loader.setMaxConnections(4);
        loader.loadManifest(preloaderManifest);
        loader.on('complete', showPreloader);
    }

    function showPreloader(event) {
        stage = canvas.getStages().bonusStage;
        const loader = event.target;

        const preloaderBG = new createjs.Bitmap(loader.getResult('preloaderBG')).set({
            name: 'preloaderBG'
        });
        const preloaderLogo = new createjs.Bitmap(loader.getResult('preloaderLogo')).set({
            name: 'preloaderLogo',
            x: (1280 - 757) / 2,
            y: 65
        });

        const preloaderLogoBrands = new createjs.Bitmap(loader.getResult('preloaderLogoBrands')).set({
            name: 'preloaderLogoBrands',
            x: 1100,
            y: 20,
            alpha: 0.75,
            scaleX: 0.75,
            scaleY: 0.75
        });

        const preloaderPlay = new createjs.Bitmap(loader.getResult('preloaderPlay')).set({
            name: 'preloaderPlay',
            x: (1280 - 265) / 2,
            y: 310,
            shadow: new createjs.Shadow('#C19433', 0, 0, 15),
            alpha: 0
        });

        const preloaderSprite = new createjs.Sprite(loader.getResult('preloaderSprite')).set({
            name: 'preloaderSprite',
            x: (1280 - 630) / 2 - 100,
            y: 450
        });

        const preloaderContainer = new createjs.Container().set({
            name: 'preloaderContainer'
        });

        preloaderContainer.addChild(preloaderBG, preloaderLogo, preloaderPlay, preloaderLogoBrands, preloaderSprite);

        stage.addChild(preloaderContainer);

        mainPreload(preloaderContainer);

    }

    function mainPreload(container) {
        const sprite = container.getChildByName('preloaderSprite');
        const loader = new createjs.LoadQueue(true);

        loader.setMaxConnections(20);
        loader.loadManifest(mainManifest);

        loader.on('fileload', handleFileLoad, loader, false, {
            sprite
        });
        loader.on('complete', handleLoadComplete, loader, true, {
            container
        });

        createjs.Sound.registerSounds([
            {id: 'spinClickSound', src: 'static/img/content/sound/spinClick.wav'},
            {id: 'spinClickSound1', src: 'static/img/content/sound/spinClickv1.wav'},
            {id: 'spinClickSound2', src: 'static/img/content/sound/spinClickv2.wav'},
            {id: 'buttonClickSound', src: 'static/img/content/sound/click1.wav'},
            {id: 'spinProcessSound', src: 'static/img/content/sound/barabaniKrutyatsa.mp3'},
            {id: 'spinEndSound', src: 'static/img/content/sound/barabanStop.wav'},
            {id: 'fon', src: 'static/img/content/sound/Ambient.mp3'},
            {id: 'win1', src: 'static/img/content/sound/win01.mp3'},
            {id: 'win2', src: 'static/img/content/sound/win02.mp3'},
            {id: 'win3', src: 'static/img/content/sound/win03.mp3'},
            {id: 'illumWin', src: 'static/img/content/sound/illumWin2.mp3'},
            {id: 'illumFail', src: 'static/img/content/sound/illumFail.mp3'},
            {id: 'illuminatorBreak1', src: 'static/img/content/sound/illumBreak01.mp3'},
            {id: 'illuminatorBreak2', src: 'static/img/content/sound/illumBreak02.mp3'},
            {id: 'illuminatorBreak3', src: 'static/img/content/sound/illumBreak03.mp3'},
            {id: 'transitionSound', src: 'static/img/content/sound/transitionSound.mp3'}
        ]);
    }

    function handleFileLoad(event, data) {
        // Change counter of downloaded files
        filesLoaded++;

        let sprite = data.sprite;
        let filesNumber = mainManifest.length;
        let framesNumber = sprite.spriteSheet.getNumFrames('run');
        let currentFrame = Math.ceil((filesLoaded / filesNumber) * framesNumber) - 1;

        sprite.gotoAndStop(currentFrame);
    }

    function handleLoadComplete(event, data) {
        const container = data.container;
        const sprite = container.getChildByName('preloaderSprite');
        const play = container.getChildByName('preloaderPlay');

        createjs.Tween.get(play).to({alpha: 1}, 500);

        sprite.stop();
        createjs.Tween.get(sprite, {loop: true})
            .to({alpha: 0.8}, 400)
            .to({alpha: 1}, 400);

        loadResult = event.target;

        events.trigger('preloadComplete', loadResult);

        play.on('click', handlePlayClick, this, true, {
            container
        });
    }

    function handlePlayClick(event, data) {
        createjs.Sound.play('buttonClickSound');
        const container = data.container;
        const game = document.querySelector('#game');
        canvas.launchFullScreen(game);
        createjs.Tween.get(container)
        .to({alpha: 0}, 1000, createjs.Ease.circIn)
        .call(function () {
            stage.removeAllChildren();
            backgroundSound = createjs.Sound.play('fon', {loop: -1});
            events.trigger('preloaderDone');
            // console.log('Back sound', background);
        });
    }

    function getBackgroundSound(data) {
        return utils.getData(backgroundSound);
    }

    function getLoadResult() {
        return utils.getData(loadResult);
    }

    /* eslint-disable */
    events.on('initPreloader', downloadManifest);
    /* eslint-enable */
    return {
        getLoadResult,
        getBackgroundSound
    };
})();

// events.trigger('initPreloader'); // КОСТЫЛЬ, вызывается в модуле инициализации
