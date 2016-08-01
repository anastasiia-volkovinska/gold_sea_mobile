/* eslint-disable no-unused-vars */
let bg = (function () {

    function drawBG(queue) {
        /* eslint-disable */
        let bgStaticStage = canvas.getStages().bgStaticStage;
        let gameStaticStage = canvas.getStages().gameStaticStage;
        let mainBG = new createjs.Bitmap(queue.getResult('mainBG')).set({
            name: 'mainBG'
        });
        let gameBG = new createjs.Bitmap(queue.getResult('gameBG')).set({
            x: 98,
            y: 50,
            name: 'gameBG'
        });
        let gameMachine = new createjs.Bitmap(queue.getResult('gameMachine')).set({
            x: 6,
            y: 5,
            name: 'gameMachine'
        });
        let footerBG = new createjs.Bitmap(queue.getResult('footerBG')).set({
            y: 720 - 40,
            name: 'footerBG'
        });
        bgStaticStage.addChildAt(mainBG, gameBG, 0);
        gameStaticStage.addChildAt(gameMachine, footerBG, 0);
        bgStaticStage.update();
        gameStaticStage.update();
    }

    events.on('preloadComplete', drawBG);
    /* eslint-enable */

    return {

    };
})();
