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
            y: 294,
            textBaseline: 'middle'
        },
        2: {
            x: 1072,
            y: 148,
            textBaseline: 'middle'
        },
        3: {
            x: 1072,
            y: 473,
            textBaseline: 'middle'
        },
        4: {
            x: 87,
            y: 80,
            textBaseline: 'middle'
        },
        5: {
            x: 87,
            y: 508,
            textBaseline: 'middle'
        },
        6: {
            x: 87,
            y: 114,
            textBaseline: 'middle'
        },
        7: {
            x: 87,
            y: 473,
            textBaseline: 'middle'
        },
        8: {
            x: 1072,
            y: 363,
            textBaseline: 'middle'
        },
        9: {
            x: 87,
            y: 260,
            textBaseline: 'middle'
        },
        10: {
            x: 87,
            y: 440,
            textBaseline: 'middle'
        },
        11: {
            x: 87,
            y: 181,
            textBaseline: 'middle'
        },
        12: {
            x: 1072,
            y: 541,
            textBaseline: 'middle'
        },
        13: {
            x: 1072,
            y: 80,
            textBaseline: 'middle'
        },
        14: {
            x: 1072,
            y: 508,
            textBaseline: 'middle'
        },
        15: {
            x: 1072,
            y: 114,
            textBaseline: 'middle'
        },
        16: {
            x: 1072,
            y: 440,
            textBaseline: 'middle'
        },
        17: {
            x: 1072,
            y: 181,
            textBaseline: 'middle'
        },
        18: {
            x: 87,
            y: 148,
            textBaseline: 'middle'
        },
        19: {
            x: 87,
            y: 541,
            textBaseline: 'middle'
        },
        20: {
            x: 87,
            y: 328,
            textBaseline: 'middle'
        },
        21: {
            x: 1072,
            y: 329,
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

                drawLinesNumbers();

            });
        /* eslint-enable */
    }

    function drawLinesNumbers() {
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        /* eslint-enable */
        let linesDiscSpriteSheet = loader.getResult('linesDisc');
        for (let i = 0, len = linesData.linesCoords.length; i < len + 1; i++) {
            /* eslint-disable */
            let linesNumber = new createjs.Text(i + 1, parameters.font, parameters.color).set({
                /* eslint-enable */
                x: parameters[i + 1].x,
                y: parameters[i + 1].y,
                name: 'linesNumber_' + (i + 1),
                textAlign: 'center',
                /* eslint-disable */
                shadow: new createjs.Shadow('#0f334c', 0, 0, 5)
                /* eslint-enable */
            });
            if (i === len) {
                linesNumber.text = 1;
            }
            /* eslint-disable */
            let linesDisc = new createjs.Sprite(linesDiscSpriteSheet, 'on').set({
                /* eslint-enable */
                x: parameters[i + 1].x,
                y: parameters[i + 1].y,
                name: 'linesDisc_' + (i + 1),
                regX: 15,
                regY: 5
            });
            linesEls.linesDiscs.push(linesDisc);
            linesEls.linesNumbers.push(linesNumber);
            winNumbersContainer.addChild(linesNumber, linesDisc);
        }
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
                name: 'totalWin'
                // x: (960 - 176) / 2 + 3,
                // y: (540 - 150) / 2
            });
            /* eslint-disable */
            let totalWinText = new createjs.BitmapText(win+'', loader.getResult('winTotal')).set({
                name: 'totalWinText',
            });
            totalWinText.x = (1280 - totalWinText.getBounds().width) / 2;
            totalWinText.y = (720 - totalWinText.getBounds().height) / 2;
            totalWinText.regX = totalWinText.getBounds().width / 2;
            totalWinText.regY = totalWinText.getBounds().height / 2;
            // let totalWinText = new createjs.Text(win, 'bold 75px Arial', '#f0e194').set({
            //     /* eslint-enable */
            //     x: 88,
            //     y: 75,
            //     name: 'totalWinText',
            //     textAlign: 'center',
            //     textBaseline: 'middle',
            //     /* eslint-disable */
            //     shadow: new createjs.Shadow('#C19433', 0, 0, 8)
            //     /* eslint-enable */
            // });
            // /* eslint-disable */
            // let totalWinRect = new createjs.Bitmap(loader.getResult('winTotalRect')).set({
            //     /* eslint-enable */
            //     name: 'totalWinRect'
            // });
            totalWin.addChild(totalWinText);
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
        linesEls.linesDiscs.forEach((disc) => {
            disc.gotoAndStop('on');
        });
    }

    function drawWinLines(spinEndObject) {

        flags.autoMode = spinEndObject.autoSpinFlag;
        flags.freeMode = spinEndObject.freeSpinFlag;
        flags.mode = spinEndObject.mode;
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
            } else if (flags.freeMode && flags.mode === 'fsBonus') {
                startEventTimer('freeTimer', 'startFreeSpin', 1500);
            } else {
                drawLineByLine();
            }
        // Если мы ничего не выиграли - то фриспины и автоспины начнутся раньше - через 200 мс.
        } else if (flags.autoMode) {
            startEventTimer('autoTimer', 'startAutoplay', 200);
        } else if (flags.freeMode && flags.mode === 'fsBonus') {
            console.warn('I AM DISPATCH startFreeSpin EVENT!');
            startEventTimer('freeTimer', 'startFreeSpin', 200);
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
        let winLineText = new createjs.Text(win, 'bold 32px Arial', '#ddd').set({
            /* eslint-enable */
            x: 25,
            y: 25,
            textAlign: 'center',
            textBaseline: 'middle',
            name: 'winLineText',
            /* eslint-disable */
            shadow: new createjs.Shadow('#C19433', 0, 0, 8)
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
        linesEls.winRects.push(winText);
        winRectsContainer.addChild(winText);
    }

    function drawLinesShape(number) {
        let winDisc = linesEls.linesDiscs[number - 1];
        winDisc.gotoAndStop('off');
        /* eslint-disable */
        let winLine = new createjs.Shape();
        /* eslint-enable */
        for (let j = 0; j < 5; j++) {
            let currentCoords = linesData.linesCoords[number - 1][j];
            if (j === 0) {
                winLine.graphics.s('rgba(193, 148, 51, 0.8)').setStrokeStyle(2).lt(currentCoords.x, currentCoords.y);
            } else {
                winLine.graphics.lt(currentCoords.x, currentCoords.y);
            }
        }
        winLine.graphics.es();
        linesEls.winLines.push(winLine);
        winLinesContainer.addChild(winLine);
    }

    function drawWinLine(data, options) {
        console.log('I called with data:', data);

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
            if (number !== -1 && number !== -2) {
                let line = linesData.linesArray[number - 1];
                if (options.winText) {
                    drawLinesText(data);
                }
                if (options.winLight) {
                    drawLinesLight(linesData.linesPaths[number - 1]);
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
                console.warn('I am here! Lines number = -1');
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
                            if (+elementIndex === 11 || +elementIndex === 12 || +elementIndex === 13) {
                                element.gotoAndStop(`win-${elementIndex}`);
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
            linesEls.linesDiscs.forEach((disc) => {
                disc.gotoAndStop('on');
            });
            winLinesContainer.removeAllChildren();
            winRectsContainer.removeAllChildren();
            linesEls.winLines = [];
            linesEls.winRects = [];
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
        drawLinesNumbers,
        drawWinLine,
        clearAutoTimer
    };
})();
