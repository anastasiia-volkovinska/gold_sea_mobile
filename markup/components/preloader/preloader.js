const preloaderManifest = [
    {id: 'preloaderBG', src: 'static/img/general/preloader/preload_bg.png'},
    {id: 'preloaderPlay', src: 'static/img/general/preloader/play.png'},
    {id: 'preloaderLogo', src: 'static/img/general/preloader/logo_gs.png'},
    {id: 'preloaderLogoBrands', src: 'static/img/general/preloader/logosbrands.png'},
    {id: 'preloaderSpriteSheet', src: 'static/img/general/preloader/progress.json', type: 'spritesheet'},
];

const mainManifest = [
    // bg
    {id: 'fsBG', src: 'static/img/content/bg/fsBG.png'},
    {id: 'mainBG', src: 'static/img/content/bg/mainBG.png'},
    {id: 'gameBG', src: 'static/img/content/bg/gameBG.png'},
    {id: 'footerBG', src: 'static/img/content/bg/footerBG.png'},
    {id: 'gameMachine', src: 'static/img/content/bg/gameMachine.png'},
    {id: 'gameShadow', src: 'static/img/content/bg/gameShadow.png'},
    // buttons
    {id: 'spinButton', src: 'static/img/content/buttons/spin.json', type: 'spritesheet'},
    {id: 'autoButton', src: 'static/img/content/buttons/auto.json', type: 'spritesheet'},
    {id: 'betButton', src: 'static/img/content/buttons/bet.json', type: 'spritesheet'},
    {id: 'menuButton', src: 'static/img/content/buttons/menu.json', type: 'spritesheet'},
    {id: 'soundButton', src: 'static/img/content/buttons/sound.json', type: 'spritesheet'},
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
    // lines
    {id: 'linesDisc', src: 'static/img/content/lines/linesDisc.json', type: 'spritesheet'},
    {id: 'linesSprite', src: 'static/img/content/lines/linesSprite.json', type: 'spritesheet'},
    {id: 'winLineRect', src: 'static/img/content/lines/winLineRect.png'},
    {id: 'winTotalRect', src: 'static/img/content/lines/winTotalRect.png'},
    // elements
    {id: 'elements', src: 'static/img/content/elements/elements.json', type: 'spritesheet'}
];

let preloader = ( function () {

    let filesLoaded = 0;
    let loadResult;

    let bonusStaticStage;
    let bonusStage;

    function downloadManifest() {
        console.log('i am here');
        /* eslint-disable */
        const queue = new createjs.LoadQueue(true);
        queue.setMaxConnections(4);
        queue.loadManifest(preloaderManifest);
        queue.on('complete', showPreloader);
        /* eslint-enable */
    }

    /* eslint-disable */
    events.on('initPreloader', downloadManifest);
    /* eslint-enable */

})();

events.trigger('initPreloader');
