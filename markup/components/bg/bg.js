/* eslint-disable no-unused-vars */
let bg = (function () {

    function drawBG(queue) {
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        let bgStaticStage = canvas.getStages().bgStaticStage;
        let gameStaticStage = canvas.getStages().gameStaticStage;
        let bgStage = canvas.getStages().bgStage;
        let mainBG = new createjs.Bitmap(queue.getResult('mainBG')).set({
            name: 'mainBG'
        });
        let gameBG = new createjs.Bitmap(queue.getResult('gameBG')).set({
            x: 96,
            y: 66,
            name: 'gameBG'
        });
        let gameMachine = new createjs.Bitmap(queue.getResult('gameMachine')).set({
            x: 6,
            y: 5,
            name: 'gameMachine'
        });
        // let footerBG = new createjs.Bitmap(queue.getResult('footerBG')).set({
        //     y: 720 - 40,
        //     name: 'footerBG'
        // });

        let footerDownBG = new createjs.Shape();
        footerDownBG.graphics.beginFill('rgba(0, 0, 0, 1)').drawRect(0, 720 - 30, 1280, 30);

        let footerUpBG = new createjs.Shape();
        footerUpBG.graphics.beginFill('rgba(0, 0, 0, 0.6)').drawRect(0, 720 - 70, 1280, 40);

        let homeBG = new createjs.Bitmap(queue.getResult('homeBG')).set({
            x: 15,
            y: 660,
            name: 'homeBG'
        });

        bgStaticStage.addChildAt(mainBG, gameBG, 0);
        gameStaticStage.addChildAt(gameMachine, footerDownBG, footerUpBG, homeBG, 0);
        // gameStaticStage.update();
        createjs.Ticker.on('tick', bgStaticStage);
        createjs.Ticker.on('tick', gameStaticStage);

        //BG animations

        let bubbleBG = new createjs.Bitmap(queue.getResult('bubbleBG'));
        let bubblesArr = [];
        function giveSomeBubbles(){
            let numberOfBubbles = Math.random()*20 + 5;
            for (let i = 1; i <= numberOfBubbles; i++){
                let bubbleScale = Math.random()*0.3+0.05;
                let newBubbleBG = bubbleBG.clone();
                newBubbleBG.scaleX = newBubbleBG.scaleY = bubbleScale;
                newBubbleBG.alpha = 0.5;
                newBubbleBG.x = Math.random()*1280;
                newBubbleBG.y = Math.random()*500 + 720;
                createjs.Tween.get(newBubbleBG)
                  .to({y: -200}, 500 + 5000/bubbleScale + Math.random()*500)
                bgStaticStage.addChildAt(newBubbleBG, bgStaticStage.getChildIndex(gameBG));
                bubblesArr.push(newBubbleBG);
            }
          setInterval(removeBubbles.bind(null), 2000);
          setTimeout(giveSomeBubbles.bind(null), Math.random()*4000+2000);
        }
        function removeBubbles(){
          for(var i = 0; i < bubblesArr.length; i++){
            if(bubblesArr[i].y < -150){
              bgStaticStage.removeChild(bubblesArr[i]);
              bubblesArr.splice(i, 1);
            }
          }
        }
        setTimeout(giveSomeBubbles.bind(null), 3000);

        let fishBG = new createjs.Sprite(loader.getResult('fishBG'), 'move');
        fishBG.scaleX = fishBG.scaleY = 0.7;
        fishBG.alpha = 0.6;

        let fishContainer = new createjs.Container();
        function giveSomeFish(){
            // console.log("giveSomeFishstart");
            let fishNumber = Math.ceil(Math.random()*10+10);
            let delta;
            fishContainer.y = 0.3*720 + Math.random()*400;
            let side = Math.round(Math.random()) ? 'left' : 'right';
            if (side === 'left'){
                fishContainer.x = -300;
                delta = 1280 + 600;
                fishBG.skewY = 180;
            } else {
                fishContainer.x = 1280 + 300;
                delta = -300;
                fishBG.skewY = 0;
            }

            for(let i = 0; i < fishNumber; i++){
                let newFish = fishBG.clone(true);
                newFish.x = Math.random()*300;
                newFish.y = Math.random()*100;
                createjs.Tween.get(newFish)
                  .to({x: newFish.x - 500}, Math.random()*5000+700);
                fishContainer.addChild(newFish)
            }
            createjs.Tween.get(fishContainer)
                .to({x: delta}, 4000)
                .call(fishRemove);
            bgStaticStage.addChildAt(fishContainer, bgStaticStage.getChildIndex(gameBG));
            function fishRemove(){
                bgStaticStage.removeChild(fishContainer);
                fishContainer.removeAllChildren();
            }
        setTimeout(giveSomeFish.bind(null), 10000*Math.random()+10000);
    }
        setTimeout(giveSomeFish.bind(null), 3000);

        let shark = new createjs.Sprite(loader.getResult('sharkBG'), "move");
        shark.scaleX = shark.scaleY = 0.7;
        function sharkMove() {

            let sharkTime = 10000*Math.random()+20000;
            let side = Math.round(Math.random()) ? 'left' : 'right';
            let delta;
            // console.log(side);
            if (side === 'left'){
                shark.x = -500;
                delta = 1280 + 500;
                shark.skewY = 0;
            } else {
                shark.x = 1280 + 500;
                delta = -500;
                shark.skewY = 180;
            }
            // console.log("sharkmoveStart", delta, side);
            createjs.Tween.get(shark)
            .to({y: Math.random()*0.1*720+100}, 50)
            .to({x: delta}, 16000)
            .call(sharkRemove);

            setTimeout(sharkMove.bind(null), sharkTime);
            // sharkTime = Math.random()*20000 + 16000;
            bgStaticStage.addChildAt(shark, bgStaticStage.getChildIndex(gameBG));
            function sharkRemove() {
                bgStaticStage.removeChild(shark);
            }

        }
        setTimeout(sharkMove.bind(null), 3000);

        function showLabelLight(){

          let labelLight = new createjs.Sprite(loader.getResult('logoLight'), "go").set({
              name: 'labelLight',
              x: 447,
              y: 10
          });
          labelLight.scaleX = labelLight.scaleX = 0.8;
          gameStaticStage.addChild(labelLight);
          labelLight.on("animationend", function(){
            gameStaticStage.removeChild(labelLight);
          });
          setTimeout(showLabelLight.bind(null), 10000*Math.random()+10000);
        }
        setTimeout(showLabelLight.bind(null), 7000);

        function showEyeLight(){
            let eyeLight = new createjs.Bitmap(loader.getResult('eyeLight')).set({
                name: 'eyeLight',
                x: 442,
                y: 41,
                regX: 18,
                regY: 22,
                alpha: 0

            });
            createjs.Tween.get(eyeLight)
                .to({alpha: 1, rotation: 20}, 200, createjs.Ease.sineIn)
                .to({rotation: 40}, 100)
                .to({alpha: 0, rotation: 60}, 200, createjs.Ease.sineIn)
                .call(eyeLightClose);
            gameStaticStage.addChild(eyeLight);
            setTimeout(showEyeLight.bind(null), 20000*Math.random()+2000);
            function eyeLightClose(){
                gameStaticStage.removeChild(eyeLight);
            }
        }
        setTimeout(showEyeLight.bind(null), 5000);

    }

    events.on('preloadComplete', drawBG);
    /* eslint-enable */

    return {

    };
})();
