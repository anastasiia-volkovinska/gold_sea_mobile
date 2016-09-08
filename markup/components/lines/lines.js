let lines = (function () {

    /* eslint-disable */
    createjs.MotionGuidePlugin.install(createjs.Tween);
    /* eslint-enable */

    // Stages
    let frontStage;
    let backStage;

    // Containers
    let winNumbersContainer;
    let winLinesContainer;
    let winRectsContainer;

    let linesEls = {
        linesDiscs: [],
        linesNumbers: [],
        winLines: [],
        winRects: []
    };

    let linesData = {};

    let winData = [];
    let winFinishData = [];

    let parameters = {
        font: 'bold 18px Arial',
        color: '#ddd',
        1: {
            x: 87,
            y: 296,
            textBaseline: 'middle'
        },
        2: {
            x: 1072,
            y: 147,
            textBaseline: 'middle'
        },
        3: {
            x: 1072,
            y: 478,
            textBaseline: 'middle'
        },
        4: {
            x: 87,
            y: 78,
            textBaseline: 'middle'
        },
        5: {
            x: 87,
            y: 546,
            textBaseline: 'middle'
        },
        6: {
            x: 87,
            y: 112,
            textBaseline: 'middle'
        },
        7: {
            x: 87,
            y: 513,
            textBaseline: 'middle'
        },
        8: {
            x: 1072,
            y: 365,
            textBaseline: 'middle'
        },
        9: {
            x: 87,
            y: 261,
            textBaseline: 'middle'
        },
        10: {
            x: 87,
            y: 445,
            textBaseline: 'middle'
        },
        11: {
            x: 87,
            y: 181,
            textBaseline: 'middle'
        },
        12: {
            x: 1072,
            y: 546,
            textBaseline: 'middle'
        },
        13: {
            x: 1072,
            y: 78,
            textBaseline: 'middle'
        },
        14: {
            x: 1072,
            y: 513,
            textBaseline: 'middle'
        },
        15: {
            x: 1072,
            y: 112,
            textBaseline: 'middle'
        },
        16: {
            x: 1072,
            y: 445,
            textBaseline: 'middle'
        },
        17: {
            x: 1072,
            y: 181,
            textBaseline: 'middle'
        },
        18: {
            x: 87,
            y: 147,
            textBaseline: 'middle'
        },
        19: {
            x: 87,
            y: 478,
            textBaseline: 'middle'
        },
        20: {
            x: 87,
            y: 329,
            textBaseline: 'middle'
        },
        21: {
            x: 1072,
            y: 331,
            textBaseline: 'middle'
        },
        22: {
            x: 1072,
            y: 295,
            textBaseline: 'middle'
        }
    };

    let flags = {};

    function parseLinesResult(arr) {
        let result = [];
        arr.forEach((line) => {
            let amount = +parseInt(line, 10);
            let number = +parseInt(line.substr(line.indexOf('#') + 1), 10);
            let win = +parseInt(line.substr(line.indexOf(':') + 1), 10);
            let lineObj = {
                amount,
                number,
                win
            };
            result.push(lineObj);
        });
        return result;
    }

    function parseLinesCoords(arr) {
        let result = [];
        arr.forEach((line, number) => {
            result[number] = [];
            line.forEach((point, index) => {
                let x = +point[0];
                let y = +point[1];
                let resultX = 192 * (x + 0.5);
                let resultY = 180 * (y + 0.5);
                let resultCoords = {
                    x: resultX,
                    y: resultY
                };
                result[number][index] = resultCoords;
            });
        });
        return result;
    }

    function parseLinesPaths(arr) {
        let result = [];
        arr.forEach((line, number) => {
            result[number] = [];
            line.forEach((point) => {
                result[number].push(point.x, point.y);
            });
        });
        return result;
    }

    function initLines(data) {

        linesData.linesArray = data.lines;
        linesData.linesCoords = parseLinesCoords(linesData.linesArray);
        linesData.linesPaths = parseLinesPaths(linesData.linesCoords);
        /* eslint-disable */
        spin.getGamePosition()
            .then((result) => {

                winLinesContainer = new createjs.Container().set({
                    name: 'winLinesContainer',
                    x: result.x,
                    y: result.y
                });
                winRectsContainer = new createjs.Container().set({
                    name: 'winRectsContainer',
                    x: result.x,
                    y: result.y
                });
                winNumbersContainer = new createjs.Container().set({
                    name: 'winNumbersContainer'
                });

                backStage = canvas.getStages().bgStage;
                frontStage = canvas.getStages().gameStage;

                backStage.addChildAt(winLinesContainer, 0);
                frontStage.addChildAt(winNumbersContainer, winRectsContainer, 0);


            });
        /* eslint-enable */
    }

    function drawLineFire(number) {
        let loader = preloader.getLoadResult();
        const ss = loader.getResult('bubblesForWinLines');
        const lineFire = new createjs.Sprite(ss, 'go').set({
            name: 'lineFire',
            x: parameters[number].x - winRectsContainer.x - 42,
            y: parameters[number].y - winRectsContainer.y - 52
        });
        winRectsContainer.addChild(lineFire);
    }

    function saveWinLines(spinWinObject) {
        winData = parseLinesResult(spinWinObject.winLines);
        winData.winCoins = spinWinObject.winCoins;
        winData.winCents = spinWinObject.winCents;
    }

    function startEventTimer(name, event, time) {
        flags[name] = setTimeout(function () {
            /* eslint-disable */
            events.trigger(event);
            /* eslint-enable */
        }, time);
    }

    function drawTotalWin(win) {
        /* eslint-disable */
        if (win) {
            let loader = preloader.getLoadResult();
            let totalWin = new createjs.Container().set({
                /* eslint-enable */
                name: 'totalWin',
                x: (960 - 222) / 2 + 3,
                y: (540 - 140) / 2
            });
            /* eslint-disable */
            let totalWinText = new createjs.Text(win, 'bold 72px Trajan', '#f0e194').set({
                x: 111,
                y: 70,
                name: 'totalWinText',
                textAlign: 'center',
                textBaseline: 'middle',
                /* eslint-disable */
                shadow: new createjs.Shadow('#C19433', 0, 0, 8)
            });
            // totalWinText.x = (totalWin.width - totalWinText.getBounds().width) / 2;
            // totalWinText.y = (totalWin.height - totalWinText.getBounds().height) / 2;

            let l = (totalWinText.text + '').length;
            if (l > 3) {
                totalWinText.font = 'bold 50px Trajan';
            }

            let totalWinRect = new createjs.Bitmap(loader.getResult('winTotalRect')).set({
                /* eslint-enable */
                name: 'totalWinRect'
            });

            totalWin.addChild(totalWinRect, totalWinText);
            return totalWin;
        } else {
            return;
        }
    }

    function drawLineByLine() {
        if (winData.length === 1 && +winData[0].number === -1) {
            console.warn('Only Scatters here!');
            //  В этом случае мы не мигаем между линиями
        } else {
            winData.forEach((data) => {
                winFinishData.push(data);
            });
            let settings = {}; // КОСТЫЛЬ Это нужно получать из настроек
            settings.light = true;
            if (settings.light) {
                /* eslint-disable */
                flags.linesTicker = createjs.Ticker.on('tick', function (event) {
                    /* eslint-enable */
                    // Когда закончится основная анимация
                    if (!winLinesContainer.getChildByName('winLight')) {
                        event.remove();
                        /* eslint-disable */
                        removeWinScreen();
                        drawWinLine(winFinishData[0], { index: 0, winText: true, winLight: true, winShape: true });
                        /* eslint-enable */
                    }
                });
            } else {
                flags.linesTimer = setTimeout(function () {
                    /* eslint-disable */
                    removeWinScreen();
                    drawWinLine(winFinishData[0], { index: 0, winText: true, winLight: false, winShape: true });
                    /* eslint-enable */
                }, 1500);
            }
        }
    }

    function removeWinElements() {
        /* eslint-disable */
        let gameContainer = canvas.getStages().bgStage.getChildByName('gameContainer');
        /* eslint-enable */
        for (let i = 0; i < 5; i++) {
            let column = gameContainer.getChildByName('gameColumn' + i);
            for (let j = 0; j < 5; j++) {
                let element = column.getChildByName('gameElement' + j);
                let animationName = element.currentAnimation;
                let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                element.gotoAndStop(`normal-${elementIndex}`);
                element.set({scaleX: 1, scaleY: 1});
            }
        }
    }

    function removeWinScreen() {
        winRectsContainer.removeAllChildren();
        winLinesContainer.removeAllChildren();
        removeWinElements();
        // linesEls.linesDiscs.forEach((disc) => {
        //     disc.gotoAndStop('on');
        // });
    }

    function drawWinLines(spinEndObject) {

        flags.autoMode = spinEndObject.autoSpinFlag;
        flags.freeMode = spinEndObject.freeSpinFlag;
        flags.mode = spinEndObject.mode;
        flags.fsCount = spinEndObject.fsCount;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        /* eslint-enable */
        if (winData[0]) {
            // Нарисовали линии
            winData.forEach((winDataObject) => {
                /* eslint-disable */
                drawWinLine(winDataObject);
                /* eslint-enable */
            });
            // Написали выигрышный текст
            winRectsContainer.addChild(drawTotalWin(winData.winCoins));
            // Если мы в режиме автоплей или фриспин - через 1.5 секунды запустили следующую крутку
            if (flags.autoMode) {
                startEventTimer('autoTimer', 'startAutoplay', 1500);
            } else if (flags.freeMode && flags.mode === 'fsBonus' && flags.fsCount) {
                startEventTimer('freeTimer', 'startFreeSpin', 1500);
            } else if (flags.freeMode && flags.mode === 'fsBonus' && flags.fsCount === 0) {
                console.error('I stoping Free Spins!');
                events.trigger('finishFreeSpins');
            } else {
                drawLineByLine();
            }
        // Если мы ничего не выиграли - то фриспины и автоспины начнутся раньше - через 200 мс.
        } else if (flags.autoMode) {
            startEventTimer('autoTimer', 'startAutoplay', 200);
        } else if (flags.freeMode && flags.mode === 'fsBonus' && flags.fsCount) {
            console.warn('I AM DISPATCH startFreeSpin EVENT!');
            startEventTimer('freeTimer', 'startFreeSpin', 200);
        } else if (flags.freeMode && flags.mode === 'fsBonus' && flags.fsCount === 0) {
            console.error('I stoping Free Spins!');
            events.trigger('finishFreeSpins');
        }
    }

    function drawLinesLight(linePath) {
        let amount = Math.round(Math.random() * 50) + 10;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        /* eslint-enable */
        let lightSpriteSheet = (loader.getResult('linesSprite'));
        for (let i = 0; i < amount; i++) {
            let timeout = Math.random() * 700;
            /* eslint-disable */
            let light = new createjs.Sprite(lightSpriteSheet, 'go').set({
                /* eslint-enable */
                x: linePath[0],
                y: linePath[1],
                regX: 24,
                regY: 19,
                name: 'winLight'
            });
            /* eslint-disable */
            createjs.Tween.get(light)
            .wait(timeout)
            .to({guide: {path: linePath, orient: 'cw'}}, 700)
            .call((tween) => {
                winLinesContainer.removeChild(tween.target);
            });
            /* eslint-enable */
            winLinesContainer.addChild(light);
        }
    }

    function drawLinesText(data) {
        let number = data.number;
        let amount = data.amount;
        let win = data.win;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        let winText = new createjs.Container().set({
            /* eslint-enable */
            y: linesData.linesCoords[number - 1][amount - 1].y + 30,
            x: linesData.linesCoords[number - 1][amount - 1].x + 32,
            name: 'winText'
        });
        /* eslint-disable */
        let winLineRect = new createjs.Bitmap(loader.getResult('winLineRect')).set({
            /* eslint-enable */
            name: 'winLineRect',
            scaleX: 1,
            scaleY: 1
        });
        /* eslint-disable */
        let winLineText = new createjs.Text(win, 'bold 27px Arial', 'gold').set({
            /* eslint-enable */
            x: 26,
            y: 26,
            textAlign: 'center',
            textBaseline: 'middle',
            name: 'winLineText',
            /* eslint-disable */
            shadow: new createjs.Shadow('#C19433', 0, 0, 15)
            /* eslint-enable */
        });

        if ((winLineText.text + '').length > 3) {
            winLineText.font = 'bold 20px Arial';
        } else if ((winLineText.text + '').length > 2) {
            winLineText.font = 'bold 25px Arial';
        } else if ((winLineText.text + '').length > 1) {
            winLineText.font = 'bold 30px Arial';
        }

        winText.addChild(winLineRect, winLineText);
        // linesEls.winRects.push(winText);
        winRectsContainer.addChild(winText);

    }

    function drawLinesShape(number) {
        // let winDisc = linesEls.linesDiscs[number - 1];
        // winDisc.gotoAndStop('off');
        /* eslint-disable */
        let winLine = new createjs.Shape();
        /* eslint-enable */
        for (let j = 0; j < 5; j++) {
            let currentCoords = linesData.linesCoords[number - 1][j];
            if (j === 0) {
                winLine.graphics.s('#00fefe').setStrokeStyle(2).lt(currentCoords.x, currentCoords.y);
            } else {
                winLine.graphics.lt(currentCoords.x, currentCoords.y);
            }
        }
        winLine.graphics.es();
        // linesEls.winLines.push(winLine);
        winLinesContainer.addChild(winLine);
    }

    function drawWinLine(data, options) {
        console.log('I called with data:', data);
        let winSoundNumber = Math.random();
		if (winSoundNumber< 0.4){
			createjs.Sound.play("win1");
		} else if (winSoundNumber<0.6) {
			createjs.Sound.play("win2");
		} else {
			createjs.Sound.play("win3");
		}

        let defaultOptions = {
            winText: false,
            winLight: true,
            winShape: true
        };
        if (typeof options === 'undefined') {
            options = defaultOptions;
        }
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        let gameContainer = canvas.getStages().bgStage.getChildByName('gameContainer');
        /* eslint-enable */

        if (data) {

            let number = data.number;
            let amount = data.amount;
            let win = data.win;
            // Если выпавшая линия не скаттер и не тройной скаттер.
            if (number !== -1) {
                let line = linesData.linesArray[number - 1];
                if (options.winText) {
                    drawLinesText(data);
                }
                if (options.winLight) {
                    drawLinesLight(linesData.linesPaths[number - 1]);
                    drawLineFire(number);
                }
                if (options.winShape) {
                    drawLinesShape(number);
                }
                line.forEach((coords, index) => {
                    let x = +coords[0];
                    let y = +coords[1];
                    if (x < amount) {
                        let column = gameContainer.getChildByName('gameColumn' + index);
                        let element = column.getChildByName('gameElement' + (y + 1));
                        let animationName = element.currentAnimation;
                        let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                        element.gotoAndStop(`win-${elementIndex}`);
                        /* eslint-disable */
                        createjs.Tween.get(element)
                        .to({scaleX: 0.8, scaleY: 0.8}, 200)
                        .to({scaleX: 1.05, scaleY: 1.05}, 700, createjs.Ease.bounceOut);
                        /* eslint-enable */
                    }
                });
            // Если выпали скаттеры
            } else if (number === -1) {
                console.warn('I am here! Lines number = -1', data.number);
                if (win > 0) {
                    for (let i = 0; i < 5; i++) {
                        let column = gameContainer.getChildByName('gameColumn' + i);
                        for (let j = 0; j < 5; j++) {
                            let element = column.getChildByName('gameElement' + j);
                            let animationName = element.currentAnimation;
                            let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                            if (+elementIndex === 10) {
                                element.gotoAndStop(`win-${elementIndex}`);
                                /* eslint-disable */
                                createjs.Tween.get(element)
                                .to({scaleX: 0.8, scaleY: 0.8}, 200)
                                .to({scaleX: 1.1, scaleY: 1.1}, 700, createjs.Ease.bounceOut);
                                /* eslint-enable */
                            }
                        }
                    }
                } else {
                    console.warn('And this is scatter Wild!');
                    for (let i = 0; i < 5; i++) {
                        let column = gameContainer.getChildByName('gameColumn' + i);
                        for (let j = 0; j < 5; j++) {
                            let element = column.getChildByName('gameElement' + j);
                            let animationName = element.currentAnimation;
                            let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                            if (+elementIndex === 11 || +elementIndex === 12 || +elementIndex === 13 || +elementIndex === 14) {
                                element.gotoAndStop(`win-${elementIndex}`);
                            }
                            if (+elementIndex === 14) {
                                element.gotoAndStop(`win-${elementIndex}`);
                                createjs.Tween.get(element)
                                .to({scaleX: 0.8, scaleY: 0.8}, 200)
                                .to({scaleX: 1.1, scaleY: 1.1}, 700, createjs.Ease.bounceOut);
                                winRectsContainer.addChild(drawTotalWin('+3').set({x: 960/2 - 70, y: 540 - 150, scaleX: 0.7, scaleY: 0.7}));
                            }
                        }
                    }
                }
            }
            // Если в опциях есть индекс, то показываем линию за линией
            if (typeof options !== 'undefined') {
                if (typeof options.index !== 'undefined') {
                    flags.scatterTimer = null;
                    /* eslint-disable */
                    flags.lineTimer = createjs.Ticker.on('tick', (event) => {
                        /* eslint-enable */
                        if (number !== -1) {
                            if (!winLinesContainer.getChildByName('winLight')) {
                                event.remove();
                                removeWinScreen();
                                if (winFinishData[options.index + 1]) {
                                    drawWinLine(winFinishData[options.index + 1], { index: options.index + 1, winText: true, winLight: true, winShape: true });
                                } else {
                                    drawWinLine(winFinishData[0], { index: 0, winText: true, winLight: true, winShape: true });
                                }
                            }
                        } else {
                            if (!flags.scatterTimer) {
                                event.remove();
                                flags.scatterTimer = setTimeout(function () {
                                    removeWinScreen();
                                    if (winFinishData[options.index + 1]) {
                                        drawWinLine(winFinishData[options.index + 1], { index: options.index + 1, winText: true, winLight: true, winShape: true });
                                    } else {
                                        drawWinLine(winFinishData[0], { index: 0, winText: true, winLight: true, winShape: true });
                                    }
                                }, 1000);
                            }
                        }
                    });
                }
            }
        }
    }

    function removeWinLines() {
        /* eslint-disable */
        createjs.Ticker.off('tick', flags.lineTimer);
        createjs.Ticker.off('tick', flags.linesTimer);
        /* eslint-enable */
        if (winData[0]) {
            winData = [];
            winFinishData = [];
            // linesEls.linesDiscs.forEach((disc) => {
            //     disc.gotoAndStop('on');
            // });
            winLinesContainer.removeAllChildren();
            winRectsContainer.removeAllChildren();
            // linesEls.winLines = [];
            // linesEls.winRects = [];
        }
    }

    function clearAutoTimer() {
        flags.autoMode = false;
        clearTimeout(flags.autoTimer);
    }

    /* eslint-disable */
    events.on('dataDownloaded', initLines);
    events.on('spinStart', removeWinLines);
    events.on('spinEnd', drawWinLines);
    events.on('spinWin', saveWinLines);
    /* eslint-enable */

    return {
        drawLineFire,
        drawWinLine,
        clearAutoTimer,
        removeWinLines,
        removeWinScreen
    };
})();
