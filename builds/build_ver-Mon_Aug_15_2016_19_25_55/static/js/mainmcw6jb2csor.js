/*!
* @license EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Container_constructor(),this.spriteSheet=a}var b=createjs.extend(a,createjs.Container);b.addChild=function(a){return null==a?a:arguments.length>1?this.addChildAt.apply(this,Array.prototype.slice.call(arguments).concat([this.children.length])):this.addChildAt(a,this.children.length)},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}if(!(a._spritestage_compatibility>=1))return console&&console.log("Error: You can only add children of type SpriteContainer, Sprite, BitmapText, or DOMElement ["+a.toString()+"]"),a;if(a._spritestage_compatibility<=4){var f=a.spriteSheet;if(!f||!f._images||f._images.length>1||this.spriteSheet&&this.spriteSheet!==f)return console&&console.log("Error: A child's spriteSheet must be equal to its parent spriteSheet and only use one image. ["+a.toString()+"]"),a;this.spriteSheet=f}return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),a},b.toString=function(){return"[SpriteContainer (name="+this.name+")]"},createjs.SpriteContainer=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.Stage_constructor(a),this._preserveDrawingBuffer=b||!1,this._antialias=c||!1,this._viewportWidth=0,this._viewportHeight=0,this._projectionMatrix=null,this._webGLContext=null,this._webGLErrorDetected=!1,this._clearColor=null,this._maxTexturesPerDraw=1,this._maxBoxesPointsPerDraw=null,this._maxBoxesPerDraw=null,this._maxIndicesPerDraw=null,this._shaderProgram=null,this._vertices=null,this._verticesBuffer=null,this._indices=null,this._indicesBuffer=null,this._currentBoxIndex=-1,this._drawTexture=null,this._initializeWebGL()}[createjs.SpriteContainer,createjs.Sprite,createjs.BitmapText,createjs.Bitmap,createjs.DOMElement].forEach(function(a,b){a.prototype._spritestage_compatibility=b+1});var b=createjs.extend(a,createjs.Stage);a.NUM_VERTEX_PROPERTIES=5,a.POINTS_PER_BOX=4,a.NUM_VERTEX_PROPERTIES_PER_BOX=a.POINTS_PER_BOX*a.NUM_VERTEX_PROPERTIES,a.INDICES_PER_BOX=6,a.MAX_INDEX_SIZE=Math.pow(2,16),a.MAX_BOXES_POINTS_INCREMENT=a.MAX_INDEX_SIZE/4,b._get_isWebGL=function(){return!!this._webGLContext};try{Object.defineProperties(b,{isWebGL:{get:b._get_isWebGL}})}catch(c){}b.addChild=function(a){return null==a?a:arguments.length>1?this.addChildAt.apply(this,Array.prototype.slice.call(arguments).concat([this.children.length])):this.addChildAt(a,this.children.length)},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}return a._spritestage_compatibility>=1?!a.image&&!a.spriteSheet&&a._spritestage_compatibility<=4?(console&&console.log("Error: You can only add children that have an image or spriteSheet defined on them. ["+a.toString()+"]"),a):(a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),a):(console&&console.log("Error: You can only add children of type SpriteContainer, Sprite, Bitmap, BitmapText, or DOMElement. ["+a.toString()+"]"),a)},b.update=function(a){if(this.canvas){this.tickOnUpdate&&this.tick(a),this.dispatchEvent("drawstart"),this.autoClear&&this.clear();var b=this._setWebGLContext();b?this.draw(b,!1):(b=this.canvas.getContext("2d"),b.save(),this.updateContext(b),this.draw(b,!1),b.restore()),this.dispatchEvent("drawend")}},b.clear=function(){if(this.canvas){var a=this._setWebGLContext();a?a.clear(a.COLOR_BUFFER_BIT):(a=this.canvas.getContext("2d"),a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,this.canvas.width+1,this.canvas.height+1))}},b.draw=function(a,b){return"undefined"!=typeof WebGLRenderingContext&&(a===this._webGLContext||a instanceof WebGLRenderingContext)?(this._drawWebGLKids(this.children,a),!0):this.Stage_draw(a,b)},b.updateViewport=function(a,b){this._viewportWidth=a,this._viewportHeight=b,this._webGLContext&&(this._webGLContext.viewport(0,0,this._viewportWidth,this._viewportHeight),this._projectionMatrix||(this._projectionMatrix=new Float32Array([0,0,0,0,0,1,-1,1,1])),this._projectionMatrix[0]=2/a,this._projectionMatrix[4]=-2/b)},b.clearImageTexture=function(a){a.__easeljs_texture=null},b.toString=function(){return"[SpriteStage (name="+this.name+")]"},b._initializeWebGL=function(){this._clearColor={r:0,g:0,b:0,a:0},this._setWebGLContext()},b._setWebGLContext=function(){return this.canvas?this._webGLContext&&this._webGLContext.canvas===this.canvas||this._initializeWebGLContext():this._webGLContext=null,this._webGLContext},b._initializeWebGLContext=function(){var a={depth:!1,alpha:!0,preserveDrawingBuffer:this._preserveDrawingBuffer,antialias:this._antialias,premultipliedAlpha:!0},b=this._webGLContext=this.canvas.getContext("webgl",a)||this.canvas.getContext("experimental-webgl",a);if(b){if(this._maxTexturesPerDraw=1,this._setClearColor(this._clearColor.r,this._clearColor.g,this._clearColor.b,this._clearColor.a),b.enable(b.BLEND),b.blendFuncSeparate(b.SRC_ALPHA,b.ONE_MINUS_SRC_ALPHA,b.ONE,b.ONE_MINUS_SRC_ALPHA),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),this._createShaderProgram(b),this._webGLErrorDetected)return void(this._webGLContext=null);this._createBuffers(b),this.updateViewport(this._viewportWidth||this.canvas.width||0,this._viewportHeight||this.canvas.height||0)}},b._setClearColor=function(a,b,c,d){this._clearColor.r=a,this._clearColor.g=b,this._clearColor.b=c,this._clearColor.a=d,this._webGLContext&&this._webGLContext.clearColor(a,b,c,d)},b._createShaderProgram=function(a){var b=this._createShader(a,a.FRAGMENT_SHADER,"precision mediump float;uniform sampler2D uSampler0;varying vec3 vTextureCoord;void main(void) {vec4 color = texture2D(uSampler0, vTextureCoord.st);gl_FragColor = vec4(color.rgb, color.a * vTextureCoord.z);}"),c=this._createShader(a,a.VERTEX_SHADER,"attribute vec2 aVertexPosition;attribute vec3 aTextureCoord;uniform mat3 uPMatrix;varying vec3 vTextureCoord;void main(void) {vTextureCoord = aTextureCoord;gl_Position = vec4((uPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);}");if(!this._webGLErrorDetected&&b&&c){var d=a.createProgram();if(a.attachShader(d,b),a.attachShader(d,c),a.linkProgram(d),!a.getProgramParameter(d,a.LINK_STATUS))return void(this._webGLErrorDetected=!0);d.vertexPositionAttribute=a.getAttribLocation(d,"aVertexPosition"),d.textureCoordAttribute=a.getAttribLocation(d,"aTextureCoord"),d.sampler0uniform=a.getUniformLocation(d,"uSampler0"),a.enableVertexAttribArray(d.vertexPositionAttribute),a.enableVertexAttribArray(d.textureCoordAttribute),d.pMatrixUniform=a.getUniformLocation(d,"uPMatrix"),a.useProgram(d),this._shaderProgram=d}},b._createShader=function(a,b,c){var d=a.createShader(b);return a.shaderSource(d,c),a.compileShader(d),a.getShaderParameter(d,a.COMPILE_STATUS)?d:(this._webGLErrorDetected=!0,null)},b._createBuffers=function(b){this._verticesBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,this._verticesBuffer);var c=4*a.NUM_VERTEX_PROPERTIES;b.vertexAttribPointer(this._shaderProgram.vertexPositionAttribute,2,b.FLOAT,b.FALSE,c,0),b.vertexAttribPointer(this._shaderProgram.textureCoordAttribute,3,b.FLOAT,b.FALSE,c,8),this._indicesBuffer=b.createBuffer(),this._setMaxBoxesPoints(b,a.MAX_BOXES_POINTS_INCREMENT)},b._setMaxBoxesPoints=function(b,c){this._maxBoxesPointsPerDraw=c,this._maxBoxesPerDraw=this._maxBoxesPointsPerDraw/a.POINTS_PER_BOX|0,this._maxIndicesPerDraw=this._maxBoxesPerDraw*a.INDICES_PER_BOX,b.bindBuffer(b.ARRAY_BUFFER,this._verticesBuffer),this._vertices=new Float32Array(this._maxBoxesPerDraw*a.NUM_VERTEX_PROPERTIES_PER_BOX),b.bufferData(b.ARRAY_BUFFER,this._vertices,b.DYNAMIC_DRAW),this._indices=new Uint16Array(this._maxIndicesPerDraw);for(var d=0,e=this._indices.length;e>d;d+=a.INDICES_PER_BOX){var f=d*a.POINTS_PER_BOX/a.INDICES_PER_BOX;this._indices[d]=f,this._indices[d+1]=f+1,this._indices[d+2]=f+2,this._indices[d+3]=f,this._indices[d+4]=f+2,this._indices[d+5]=f+3}b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this._indicesBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,this._indices,b.STATIC_DRAW)},b._setupImageTexture=function(a,b){if(b&&(b.naturalWidth||b.getContext||b.readyState>=2)){var c=b.__easeljs_texture;return c||(c=b.__easeljs_texture=a.createTexture(),a.bindTexture(a.TEXTURE_2D,c),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE)),c}},b._drawWebGLKids=function(b,c,d){for(var e,f,g=this.snapToPixelEnabled,h=null,i=0,j=0,k=0,l=0,m=this._vertices,n=a.NUM_VERTEX_PROPERTIES_PER_BOX,o=a.MAX_INDEX_SIZE,p=this._maxBoxesPerDraw-1,q=0,r=b.length;r>q;q++)if(e=b[q],e.isVisible()){var h=e.image||e.spriteSheet&&e.spriteSheet._images[0],s=h.__easeljs_texture;if(s||(s=this._setupImageTexture(c,h))){f=e._props.matrix,f=(d?f.copy(d):f.identity()).appendTransform(e.x,e.y,e.scaleX,e.scaleY,e.rotation,e.skewX,e.skewY,e.regX,e.regY);var t=0,u=1,v=0,w=1;if(4===e._spritestage_compatibility)i=0,j=0,k=h.width,l=h.height;else if(2===e._spritestage_compatibility){var x=e.spriteSheet.getFrame(e.currentFrame),y=x.rect;i=-x.regX,j=-x.regY,k=i+y.width,l=j+y.height,t=y.x/h.width,v=y.y/h.height,u=t+y.width/h.width,w=v+y.height/h.height}else h=null,3===e._spritestage_compatibility&&e._updateText();if(!d&&e._spritestage_compatibility<=4&&s!==this._drawTexture&&(this._drawToGPU(c),this._drawTexture=s),null!==h){var z=++this._currentBoxIndex*n,A=f.a,B=f.b,C=f.c,D=f.d,E=f.tx,F=f.ty;g&&e.snapToPixel&&(E=E+(0>E?-.5:.5)|0,F=F+(0>F?-.5:.5)|0),m[z]=i*A+j*C+E,m[z+1]=i*B+j*D+F,m[z+5]=i*A+l*C+E,m[z+6]=i*B+l*D+F,m[z+10]=k*A+l*C+E,m[z+11]=k*B+l*D+F,m[z+15]=k*A+j*C+E,m[z+16]=k*B+j*D+F,m[z+2]=m[z+7]=t,m[z+12]=m[z+17]=u,m[z+3]=m[z+18]=v,m[z+8]=m[z+13]=w,m[z+4]=m[z+9]=m[z+14]=m[z+19]=e.alpha,this._currentBoxIndex===p&&(this._drawToGPU(c),this._drawTexture=s,this._maxBoxesPointsPerDraw<o&&(this._setMaxBoxesPoints(c,this._maxBoxesPointsPerDraw+a.MAX_BOXES_POINTS_INCREMENT),p=this._maxBoxesPerDraw-1))}e.children&&(this._drawWebGLKids(e.children,c,f),p=this._maxBoxesPerDraw-1)}}d||this._drawToGPU(c)},b._drawToGPU=function(b){if(this._drawTexture){var c=this._currentBoxIndex+1;b.activeTexture(b.TEXTURE0),b.bindTexture(b.TEXTURE_2D,this._drawTexture),b.uniform1i(this._shaderProgram.sampler0uniform,0),b.bindBuffer(b.ARRAY_BUFFER,this._verticesBuffer),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this._indicesBuffer),b.uniformMatrix3fv(this._shaderProgram.pMatrixUniform,!1,this._projectionMatrix),b.bufferSubData(b.ARRAY_BUFFER,0,this._vertices),b.drawElements(b.TRIANGLES,c*a.INDICES_PER_BOX,b.UNSIGNED_SHORT,0),this._currentBoxIndex=-1,this._drawTexture=null}},createjs.SpriteStage=createjs.promote(a,"Stage")}();
'use strict';

var utils = function () {

    var serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';

    function request(name, path) {
        console.log('Full path of request is: ' + serviceUrl + name + path);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '' + serviceUrl + name + path,
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function getData(data) {
        if (typeof data !== 'undefined') {
            return data;
        } else {
            throw new Error('Data is undefined!');
        }
    }

    return {
        request: request,
        getData: getData
    };
}();
"use strict";

var events = {
    events: {},
    on: function on(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function off(eventName, fn) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    trigger: function trigger(eventName, data) {
        for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            rest[_key - 2] = arguments[_key];
        }

        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(data, rest);
            });
        }
    }
};
'use strict';

var autoplay = function () {

    var autoTimer = void 0;
    var autoCount = void 0;
    var autoEnd = void 0;

    /* eslint-disable no-undef */
    function initAutoplay(count) {
        autoCount = count;
        autoEnd = false;
    }

    function startAutoplay() {
        console.log('I am starting autoplay!');
        autoCount--;
        if (!autoEnd) {
            spin.spinStart(true);
        }
        if (autoCount > 0) {
            buttons.changeAutoText(autoCount);
        } else {
            events.trigger('stopAutoplay');
        }
    }

    function stopAutoplay() {
        console.log('I am stoping autoplay!');
        autoEnd = true;
        lines.clearAutoTimer();
    }

    events.on('initAutoplay', initAutoplay);
    events.on('startAutoplay', startAutoplay);
    events.on('stopAutoplay', stopAutoplay);

    return {
        initAutoplay: initAutoplay,
        startAutoplay: startAutoplay,
        stopAutoplay: stopAutoplay
    };
}();
'use strict';

var balance = function () {

    var balanceStage = void 0;

    /* eslint-disable */
    var balanceContainer = new createjs.Container().set({
        name: 'balanceContainer'
    });
    /* eslint-enable */

    var balanceText = {};

    var balanceData = {};

    var parameters = {
        font: 'bold 20px Titania',
        color: '#ddd',
        coinsValue: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'coinsValue'
        },
        coinsSum: {
            x: 285,
            y: 613,
            textAlign: 'center',
            font: 'bold 28px Titania',
            name: 'coinsSum',
            shadow: new createjs.Shadow('#858482', 0, 0, 15)
        },
        coinsCash: {
            x: 430,
            y: 690,
            textAlign: 'center',
            name: 'coinsCash'
        },
        betValue: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'betValue'
        },
        betSum: {
            x: 935,
            y: 613,
            textAlign: 'center',
            font: 'bold 28px Titania',
            name: 'betSum',
            shadow: new createjs.Shadow('#858482', 0, 0, 15)
        },
        betCash: {
            x: 590,
            y: 690,
            textAlign: 'center',
            name: 'betCash'
        },
        winCash: {
            x: 760,
            y: 690,
            textAlign: 'center',
            name: 'winCash'
        },
        currency: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'currency'
        }
    };

    function initBalance(allData) {
        /* eslint-disable */
        balanceStage = canvas.getStages().gameStaticStage;
        /* eslint-enable */
        balanceData.linesLength = allData.lines.length;
        var data = allData.balance;

        balanceData.coinsSteps = data.CoinValue.map(function (element) {
            return +(element / 100).toFixed(2);
        });
        balanceData.betSteps = data.BetLevel;

        balanceData.coinsValue = balanceData.coinsSteps[0];
        balanceData.coinsSum = data.ScoreCoins;
        balanceData.coinsCash = +(data.ScoreCents / 100).toFixed(2);

        balanceData.betValue = balanceData.betSteps[0];
        balanceData.betSum = +(balanceData.betValue * balanceData.linesLength).toFixed(0);
        balanceData.betCash = +(balanceData.betSum * balanceData.coinsValue).toFixed(2);

        balanceData.winCash = 0..toFixed(2);
        balanceData.currency = data.Currency;

        /* eslint-disable */
        writeBalance();
        /* eslint-enable */
    }

    function writeBalance() {
        /* eslint-disable */
        balanceText.coinsSum = new createjs.Text(balanceData.coinsSum, parameters.font, parameters.color).set(parameters.coinsSum);
        balanceText.coinsCash = new createjs.Text(balanceData.coinsCash, parameters.font, parameters.color).set(parameters.coinsCash);
        balanceText.betSum = new createjs.Text(balanceData.betSum, parameters.font, parameters.color).set(parameters.betSum);
        balanceText.betCash = new createjs.Text(balanceData.betCash, parameters.font, parameters.color).set(parameters.betCash);
        balanceText.winCash = new createjs.Text(balanceData.winCash, parameters.font, parameters.color).set(parameters.winCash);

        balanceContainer.addChild(balanceText.coinsSum, balanceText.coinsCash, balanceText.betSum, balanceText.betCash, balanceText.winCash);

        balanceStage.addChild(balanceContainer);
        balanceStage.update();
        /* eslint-enable */
    }

    function updateBalance() {
        /* eslint-disable */
        if (balanceText.coinsSum.text !== balanceData.coinsSum) balanceText.coinsSum.text = balanceData.coinsSum;
        if (balanceText.coinsCash.text !== balanceData.coinsCash) balanceText.coinsCash.text = balanceData.coinsCash;
        if (balanceText.betSum.text !== balanceData.betSum) balanceText.betSum.text = balanceData.betSum;
        if (balanceText.betCash.text !== balanceData.betCash) balanceText.betCash.text = balanceData.betCash;
        if (balanceText.winCash.text !== balanceData.winCash) balanceText.winCash.text = balanceData.winCash;
        /* eslint-enable */
        balanceStage.update();
    }

    function changeBet(moreOrLess, maxBet) {
        if (maxBet) {
            balanceData.betValue = balanceData.betSteps[balanceData.betSteps.length - 1];
        } else if (moreOrLess === true && balanceData.betValue !== balanceData.betSteps[balanceData.betSteps.length - 1]) {
            var i = balanceData.betSteps.length;
            while (i >= 0) {
                if (balanceData.betSteps[i] === balanceData.betValue) {
                    balanceData.betValue = balanceData.betSteps[i + 1];
                    i = -1;
                }
                i--;
            }
        } else if (moreOrLess === false && balanceData.betValue !== balanceData.betSteps[0]) {
            var _i = balanceData.betSteps.length;
            while (_i >= 0) {
                if (balanceData.betSteps[_i] === balanceData.betValue) {
                    balanceData.betValue = balanceData.betSteps[_i - 1];
                    _i = -1;
                }
                _i--;
            }
        } else {
            console.error('Bet change is failed!');
        }
        balanceData.betSum = +(balanceData.betValue * balanceData.linesLength).toFixed(0);
        balanceData.betCash = +(balanceData.betSum * balanceData.coinsValue).toFixed(2);
        updateBalance();
        console.log('Bet is changed:', balanceData.betValue);
        if (balanceData.betValue === balanceData.betSteps[balanceData.betSteps.length - 1]) {
            console.error('This bet value is maximum!');
        } else if (balanceData.betValue === balanceData.betSteps[0]) {
            console.error('This bet value is minimum!');
        }
    }

    function changeCoins(moreOrLess, maxBet) {
        if (maxBet) {
            balanceData.coinsValue = balanceData.coinsSteps[balanceData.coinsSteps.length - 1];
        } else if (moreOrLess === true && balanceData.coinsValue !== balanceData.coinsSteps[balanceData.coinsSteps.length - 1]) {
            var i = balanceData.coinsSteps.length;
            while (i >= 0) {
                if (balanceData.coinsSteps[i] === balanceData.coinsValue) {
                    balanceData.coinsValue = balanceData.coinsSteps[i + 1];
                    i = -1;
                }
                i--;
            }
        } else if (moreOrLess === false && balanceData.coinsValue !== balanceData.coinsSteps[0]) {
            var _i2 = balanceData.coinsSteps.length;
            while (_i2 >= 0) {
                if (balanceData.coinsSteps[_i2] === balanceData.coinsValue) {
                    balanceData.coinsValue = balanceData.coinsSteps[_i2 - 1];
                    _i2 = -1;
                }
                _i2--;
            }
        } else {
            console.error('Coins change is failed!');
        }
        balanceData.coinsSum = +Math.floor(balanceData.coinsCash / balanceData.coinsValue).toFixed(0);
        balanceData.betCash = +(balanceData.coinsValue * balanceData.betSum).toFixed(2);
        updateBalance();
        console.log('Coins value is changed:', balanceData.coinsValue);
        if (balanceData.coinsValue === balanceData.coinsSteps[balanceData.coinsSteps.length - 1]) {
            console.error('This coins value is maximum!');
        } else if (balanceData.coinsValue === balanceData.coinsSteps[0]) {
            console.error('This coins value is minimum!');
        }
    }

    function spinStart(data) {
        if (data.Mode !== 'fsBonus') {
            if (balanceData.coinsSum >= balanceData.betSum) {
                balanceData.coinsSum = (balanceData.coinsSum - balanceData.betSum).toFixed(0);
                balanceData.coinsCash = ((balanceData.coinsCash * 100 - balanceData.betCash * 100) / 100).toFixed(2);
                balanceData.winCash = 0..toFixed(2);
                updateBalance();
            } else {
                console.error('Too low cash for spin!');
            }
        }
    }

    function spinEnd(spinEndObject) {
        if (typeof spinEndObject.winCash !== 'undefined') {
            if (spinEndObject.mode === 'fsBonus') {
                balanceData.totalWin = (+balanceData.totalWin * 100 + +(+spinEndObject.winCash).toFixed(2) * 100 / 100).toFixed(2);
            }
            balanceData.winCash = (+spinEndObject.winCash).toFixed(2);
            balanceData.coinsCash = (+spinEndObject.scoreCents / 100).toFixed(2);
            balanceData.coinsSum = (+spinEndObject.scoreCoins).toFixed(0);
            updateBalance();
        } else {
            console.error('WinCash is undefined!');
        }
    }

    /* eslint-disable */
    function getBalanceData() {
        return utils.getData(balanceData);
    }
    /* eslint-enable */

    /* eslint-disable */
    events.on('dataDownloaded', initBalance);
    events.on('changeBet', changeBet);
    events.on('changeCoins', changeCoins);
    events.on('spinStart', spinStart);
    events.on('spinEnd', spinEnd);
    /* eslint-enable */

    return {
        getBalanceData: getBalanceData,
        changeBet: changeBet,
        changeCoins: changeCoins
    };
}();
'use strict';

/* eslint-disable no-unused-vars */
var bg = function () {

    function drawBG(queue) {
        /* eslint-disable */
        var bgStaticStage = canvas.getStages().bgStaticStage;
        var gameStaticStage = canvas.getStages().gameStaticStage;
        var mainBG = new createjs.Bitmap(queue.getResult('mainBG')).set({
            name: 'mainBG'
        });
        var gameBG = new createjs.Bitmap(queue.getResult('gameBG')).set({
            x: 98,
            y: 50,
            name: 'gameBG'
        });
        var gameMachine = new createjs.Bitmap(queue.getResult('gameMachine')).set({
            x: 6,
            y: 5,
            name: 'gameMachine'
        });
        var footerBG = new createjs.Bitmap(queue.getResult('footerBG')).set({
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

    return {};
}();
"use strict";

/* eslint-disable */
var bonuses = function () {

    var doors = [];
    var bonusData = void 0;
    var clickCounter = 0;
    var counter = 0;

    function initBonusLevel() {
        console.warn("i am init bonus level");
        var loader = preloader.getLoadResult();
        var stage = canvas.getStages().bonusStage;
        stage.alpha = 1;
        stage.nextStage = null;

        var darkness = new createjs.Shape();
        darkness.graphics.beginFill('#000').drawRect(0, 0, 1280, 720);
        darkness.alpha = 0;
        stage.addChild(darkness);

        createjs.Tween.get(darkness).to({ alpha: 1 }, 500).call(function () {
            console.warn("i  call getbonus level");
            getBonusLevel();
        }).wait(200).to({ alpha: 0 }, 500).call(function () {
            stage.removeChild(darkness);
        });
    }

    function drawBonusLevel() {
        doors = [];

        var stage = canvas.getStages().bonusStage;
        var loader = preloader.getLoadResult();
        var bonusContainer = new createjs.Container().set({
            name: 'bonusContainer'
        });
        var bonusBG = new createjs.Bitmap(loader.getResult('bonusBG')).set({
            name: 'bonusBG'
        });
        var bonusFG = new createjs.Bitmap(loader.getResult('bonusFG')).set({
            name: 'bonusFG'
        });
        var illuminatorContainer = new createjs.Container().set({
            name: 'illuminatorContainer'
        });

        var ss = loader.getResult('illuminators');
        var illuminator_1 = new createjs.Sprite(ss, 0).set({
            x: 358,
            y: 255,
            regX: 47,
            regY: 47
        });
        var illuminator_2 = new createjs.Sprite(ss, 1).set({
            x: 506,
            y: 288,
            regX: 47,
            regY: 47
        });
        var illuminator_3 = new createjs.Sprite(ss, 2).set({
            x: 652,
            y: 321,
            regX: 47,
            regY: 47
        });
        var illuminator_4 = new createjs.Sprite(ss, 3).set({
            x: 801,
            y: 354,
            regX: 47,
            regY: 47
        });
        var illuminator_5 = new createjs.Sprite(ss, 4).set({
            x: 947,
            y: 386,
            regX: 47,
            regY: 47
        });

        doors.push(illuminator_1, illuminator_2, illuminator_3, illuminator_4, illuminator_5);

        doors.forEach(function (door) {
            door.stop();
            illuminatorContainer.addChild(door);
        });

        bonusContainer.addChild(bonusBG, illuminatorContainer, bonusFG);
        stage.addChildAt(bonusContainer, 0);

        addClickHandlers(doors, bonusContainer, bonusFG);
        console.warn("we are entering addClickHandlers");
    }

    function getCurrentData() {
        return bonusData;
    }

    function addClickHandlers(arr, container, el) {
        var loader = preloader.getLoadResult();
        var bonusWinResult = void 0;
        doors.forEach(function (door) {
            door.on('click', function () {
                // console.log("i am here", clickCounter);
                if (clickCounter < 1) {
                    var tl;

                    (function () {
                        clickCounter++;
                        var currentData = getCurrentData();
                        console.warn("currentData:", currentData);
                        if (currentData.CurrentValue !== "Exit") {
                            (function () {
                                // Win

                                var bonusWin = new createjs.Sprite(loader.getResult('bonusWin')).set({
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
                                var light = new createjs.Bitmap(loader.getResult('light')).set({
                                    name: 'light',
                                    x: door.x,
                                    y: door.y,
                                    regX: 80,
                                    regY: 83,
                                    alpha: 0
                                });

                                container.addChildAt(bonusWin, container.getChildIndex(el));
                                container.addChild(light);

                                tl = new TimelineLite();

                                tl.add("scene1", 0);
                                tl.to(door, 0, { alpha: 0 }, "scene1");
                                tl.to(light, 0, { alpha: 0.9 }, "scene1");

                                // createjs.Tween.get(door)
                                //     .to({alpha: 0}, 300)
                                //
                                // createjs.Tween.get(light)
                                // .to({alpha: 0.9}, 300)

                                bonusWin.play();

                                var bonusWinCounter = 0;
                                bonusWin.on('animationend', function () {
                                    bonusWinCounter++;
                                    if (bonusWinCounter > 3) {

                                        //    createjs.Tween.get(bonusWin)
                                        //    .to({alpha: 0}, 300)
                                        //    .call(

                                        var showBonusWinResult = function showBonusWinResult() {
                                            container.removeChild(bonusWin);
                                            container.removeChild(light);
                                            bonusWinResult.gotoAndStop(currentData.CurrentValue + 'table');
                                            container.addChild(bonusWinResult);

                                            if (currentData.BonusEnd !== true) {

                                                clickCounter = 0;
                                                readyAfterBonus();
                                                setTimeout(function () {
                                                    console.log("i am starting new roll");
                                                    getBonusLevel();
                                                }, 500);
                                            }
                                        };

                                        tl.add("scene2", 0);
                                        tl.to(light, 0, { alpha: 0 }, "scene2");
                                        tl.to(bonusWin, 0, { alpha: 0, onComplete: showBonusWinResult }, "scene2");

                                        doors.forEach(function (door) {
                                            if (door.alpha === 0) {
                                                counter++;
                                                console.log(counter);
                                            }

                                            if (counter === 5) {
                                                console.log("i won totalWin");
                                                setTimeout(function () {
                                                    clickCounter = 0;
                                                    counter = 0;
                                                    finishBonusLevel(container);
                                                    readyAfterBonus();
                                                }, 1500);
                                            }
                                        });
                                    }
                                });
                            })();
                        } else {
                            //Fail
                            console.warn("i am in fail");
                            container.removeChild(bonusWinResult);
                            var octopus = new createjs.Bitmap(loader.getResult('octopus')).set({
                                name: 'octopus',
                                x: 870,

                                y: 500,
                                regX: 145,
                                regY: 100,
                                alpha: 0
                            });
                            container.addChild(octopus);
                            createjs.Tween.get(octopus).to({ alpha: 1 }, 300);

                            var tentacles = [];

                            var bonusFail = new createjs.Sprite(loader.getResult('bonusFail'), 'show').set({
                                name: 'bonusFail',
                                x: door.x,
                                y: door.y,
                                regX: 75,
                                regY: 39
                            });

                            for (var i = 0; i < 5; i++) {
                                var newBonusFail = bonusFail.clone(true);
                                if (i === 0) {
                                    newBonusFail.set({ x: doors[i].x - 5, y: doors[i].y - 5 });
                                }
                                if (i === 1) {
                                    newBonusFail.set({ x: doors[i].x - 5, y: doors[i].y - 5, rotation: 60 });
                                }
                                if (i === 2) {
                                    newBonusFail.set({ x: doors[i].x - 5, y: doors[i].y - 5, rotation: 220, skewY: 180 });
                                }
                                if (i === 3) {
                                    newBonusFail.set({ x: doors[i].x - 5, y: doors[i].y - 5, rotation: 140, skewY: 180 });
                                }
                                if (i === 4) {
                                    newBonusFail.set({ x: doors[i].x - 5, y: doors[i].y - 5, rotation: 50, skewY: 180 });
                                }
                                tentacles.push(newBonusFail);
                            }

                            for (var _i = 0; _i < 5; _i++) {
                                container.removeChild(container.getChildByName("bonusWinResult"));
                                createjs.Tween.get(doors[_i]).to({ alpha: 0 }, 300);
                                container.addChild(tentacles[_i]);
                            }

                            setTimeout(function () {
                                clickCounter = 0;
                                counter = 0;
                                finishBonusLevel(container);
                                console.warn("i call finish bonus level");
                                readyAfterBonus();
                            }, 1500);
                        }
                    })();
                }
            });
        });
    }
    function readyAfterBonus() {
        var sessionID = login.getSessionID();
        utils.request('_Ready/', "" + sessionID).then(function (data) {
            console.log('ready data:', data);
        });
    }

    function getBonusLevel() {
        var sessionID = login.getSessionID();
        utils.request('_Roll/', sessionID + "/1/1").then(function (data) {
            bonusData = data;
            console.log('This is bonus data:', data);
            if (bonusData.OldValues.length === 0) {
                drawBonusLevel();
                console.warn(" i am drawing bonus level");
            }
        });
    }

    function finishBonusLevel(container) {
        var loader = preloader.getLoadResult();
        var currentData = getCurrentData();
        var stage = canvas.getStages().bonusStage;

        var finishText = new createjs.Bitmap(loader.getResult('totalWinText')).set({
            name: 'finishText',
            x: (1280 - 815) / 2,
            y: 70
        });

        var finishButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'finishButton',
            x: (1280 - 396) / 2,
            y: 560
        });

        var finishWinText = new createjs.BitmapText(currentData.CurrentWinCoins + '', loader.getResult('totalWinFS')).set({
            name: 'finishWinText'
        });

        var l = (currentData.CurrentWinCoins + '').length;
        console.log("length:", l);

        finishWinText.x = (1280 - l * 168) / 2;
        finishWinText.y = (720 - 182) / 2;

        var darkness = new createjs.Shape();
        darkness.graphics.beginFill('#000').drawRect(0, 0, 1280, 720);
        darkness.alpha = 0;
        stage.addChild(darkness);
        container.addChild(finishText, finishWinText, finishButton);

        finishButton.on('mousedown', function () {
            finishButton.gotoAndStop('over');
        });
        finishButton.on('click', function () {

            createjs.Tween.get(darkness).to({ alpha: 1 }, 500).wait(200).call(function () {
                stage.removeAllChildren();
                stage.nextStage = canvas.getStages().gameStage;
            });
        });
    }

    events.on('initBonusLevel', initBonusLevel);
    events.on('drawBonusLevel', drawBonusLevel);
    events.on('finishBonusLevel', finishBonusLevel);

    return {
        getBonusLevel: getBonusLevel,
        readyAfterBonus: readyAfterBonus
    };
}();
'use strict';

/* eslint-disable no-unused-vars */
var buttons = function () {

    var buttonsContainer = void 0;
    var menuSprite = void 0;
    var autoSprite = void 0;
    var spinSprite = void 0;
    var betSprite = void 0;
    var soundSprite = void 0;
    var soundMuted = true;
    var autoMode = void 0;
    var autoText = void 0;
    var fsMode = void 0;

    function handleSpin() {
        /* eslint-disable */
        var spinClicked = 0;
        spinSprite.on('mousedown', function (event) {
            spinClicked++;
            if (spinClicked === 1) {
                event.remove();
                if (spinSprite.currentAnimation !== 'down' && spinSprite.currentAnimation !== 'auto') {
                    spinSprite.gotoAndStop('down');
                    var spinState = spin.getSpinState();
                    if (!spinState.locked) {
                        createjs.Tween.get(spinSprite).to({ scaleX: 0.95, scaleY: 0.95 }, 75).to({ scaleX: 1, scaleY: 1 }, 75);
                        if (spinState.inProgress && spinState.fastSpinFlag && !spinState.locked) {
                            spin.fastSpin();
                        } else if (!spinState.inProgress && !spinState.locked) {
                            spin.spinStart();
                        }
                    }
                }
            }
        }, null, true);
    }

    function drawButtons(loader) {
        buttonsContainer = new createjs.Container();
        spinSprite = new createjs.Sprite(loader.getResult('spinButton')).set({
            x: 1180,
            y: 360,
            regX: 87,
            regY: 87,
            name: 'spinSprite'
        });
        spinSprite.gotoAndStop('out');
        // let spinHelper = new createjs.ButtonHelper(spinSprite);
        handleSpin();

        autoSprite = new createjs.Sprite(loader.getResult('autoButton')).set({
            x: 1128 + 50,
            y: 160 + 50,
            regX: 50,
            regY: 50,
            name: 'autoSprite'
        });
        autoSprite.gotoAndStop('out');
        autoSprite.on('click', function () {
            if (autoSprite.currentAnimation === 'out') {
                menu.showMenu('auto');
            } else if (autoSprite.currentAnimation === 'auto') {
                stopAutoButtons();
                autoplay.stopAutoplay();
            }
        });
        // let autoHelper = new createjs.ButtonHelper(autoSprite);
        betSprite = new createjs.Sprite(loader.getResult('betButton')).set({
            x: 1128 + 50,
            y: 460 + 50,
            regX: 50,
            regY: 50,
            name: 'betSprite'
        });
        betSprite.gotoAndStop('out');
        betSprite.on('click', function () {
            if (betSprite.currentAnimation === 'out') {
                menu.showMenu('bet');
            }
        });
        // let betHelper = new createjs.ButtonHelper(betSprite);
        menuSprite = new createjs.Sprite(loader.getResult('menuButton')).set({
            x: 1140,
            y: 70,
            name: 'menuSprite'
        });
        menuSprite.gotoAndStop('out');
        menuSprite.on('click', function () {
            if (menuSprite.currentAnimation === 'out') {
                menu.showMenu('settings');
            }
        });
        // let menuHelper = new createjs.ButtonHelper(menuSprite);
        soundSprite = new createjs.Sprite(loader.getResult('soundButton')).set({
            x: 1140,
            y: 570,
            name: 'soundSprite'
        });
        if (soundMuted) {
            soundSprite.gotoAndStop('down');
        }
        soundSprite.on('click', function () {
            soundMuted = !soundMuted;
            if (soundMuted) {
                soundSprite.gotoAndStop('down');
            } else {
                soundSprite.gotoAndStop('out');
            }
        });
        // let soundHelper = new createjs.ButtonHelper(soundSprite);
        buttonsContainer.addChild(spinSprite, autoSprite, betSprite, menuSprite, soundSprite);
        var stage = canvas.getStages().gameStage;
        stage.enableMouseOver(10);
        stage.addChild(buttonsContainer);
    }

    function checkButtonsState() {
        if (buttonsContainer) {
            var spinState = spin.getSpinState();
            if (autoMode) {
                autoSprite.gotoAndStop('auto');
                spinSprite.gotoAndStop('auto');
                menuSprite.gotoAndStop('down');
                betSprite.gotoAndStop('down');
            } else if (fsMode) {
                autoSprite.gotoAndStop('fs');
                betSprite.gotoAndStop('fs');
                spinSprite.gotoAndStop('auto');
                menuSprite.gotoAndStop('down');
            } else if (spinState.locked) {
                spinSprite.gotoAndStop('down');
            } else if (spinState.inProgress && spinState.fastSpinFlag) {
                handleSpin();
                spinSprite.gotoAndStop('over');
            } else if (spinState.inProgress) {
                menuSprite.gotoAndStop('down');
                autoSprite.gotoAndStop('down');
                spinSprite.gotoAndStop('down');
                betSprite.gotoAndStop('down');
                soundSprite.gotoAndStop('down');
            } else {
                handleSpin();
                autoSprite.gotoAndStop('out');
                menuSprite.gotoAndStop('out');
                spinSprite.gotoAndStop('out');
                betSprite.gotoAndStop('out');
                if (!soundMuted) {
                    soundSprite.gotoAndStop('out');
                } else {
                    soundSprite.gotoAndStop('down');
                }
            }
        }
    }

    function startAutoButtons(count) {
        autoMode = true;
        autoText = new createjs.Text(count, "bold 75px Titania", "#ddd").set({
            x: 1180,
            y: 360,
            name: 'autoText',
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#ddd', 0, 0, 8)
        });
        buttonsContainer.addChild(autoText);
        setTimeout(function () {
            events.trigger('startAutoplay');
        }, 500);
    }

    function stopAutoButtons() {
        autoSprite.gotoAndStop('down');
        autoMode = false;
        buttonsContainer.removeChild(autoText);
    }

    function changeAutoText(newText) {
        autoText.text = newText;
    }

    function startFSButtons(data) {
        fsMode = true;
        var count = data.fsCount;
        var level = data.fsLevel;
        var multi = data.fsMulti;
        var fsLevel = new createjs.Text(level, "50px bold Titania", "#ddd").set({
            name: 'fsLevel',
            x: autoSprite.x,
            y: autoSprite.y + 5,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#ddd', 0, 0, 8)
        });
        var fsMulti = new createjs.Text(multi, "50px bold Titania", "#ddd").set({
            name: 'fsMulti',
            x: betSprite.x,
            y: betSprite.y + 5,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#ddd', 0, 0, 8)
        });
        var fsCount = new createjs.Text(count, "85px bold Titania", "#ddd").set({
            name: 'fsCount',
            x: spinSprite.x,
            y: spinSprite.y,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#ddd', 0, 0, 8)
        });
        buttonsContainer.addChild(fsLevel, fsMulti, fsCount);
    }

    function updateFSButtons(newData) {
        if (buttonsContainer.getChildByName('fsCount')) {
            if (typeof newData.fsCount !== 'undefined') {
                var newCount = newData.fsCount;
                var fsCountText = buttonsContainer.getChildByName('fsCount').text;
                if (+fsCountText !== newCount) {
                    buttonsContainer.getChildByName('fsCount').text = newCount;
                }
            } else {
                buttonsContainer.getChildByName('fsCount').text = +buttonsContainer.getChildByName('fsCount').text - 1;
            }
            if (typeof newData.fsLevel !== 'undefined') {
                var newLevel = newData.fsLevel;
                var fsLevelText = buttonsContainer.getChildByName('fsLevel').text;
                if (+fsLevelText !== newLevel) {
                    console.warn('Level is Changed!');
                    buttonsContainer.getChildByName('fsLevel').text = newLevel;
                }
            }
            if (typeof newData.fsMulti !== 'undefined') {
                var newMulti = newData.fsMulti;
                var fsMultiText = buttonsContainer.getChildByName('fsMulti').text;
                if (+fsMultiText !== newMulti) {
                    console.warn('Multi is Changed!');
                    buttonsContainer.getChildByName('fsMulti').text = newMulti;
                }
            }
        }
    }

    function stopFSButtons() {
        fsMode = false;
        var fsLevel = buttonsContainer.getChildByName('fsLevel');
        var fsMulti = buttonsContainer.getChildByName('fsMulti');
        var fsCount = buttonsContainer.getChildByName('fsCount');
        buttonsContainer.removeChild(fsLevel, fsMulti, fsCount);
    }

    events.on('preloadComplete', drawButtons);
    events.on('initAutoplay', startAutoButtons);
    events.on('stopAutoplay', stopAutoButtons);
    events.on('drawFreeSpins', startFSButtons);
    events.on('stopFreeSpins', stopFSButtons);
    // events.on('newFreeSpin', updateFSButtons);
    events.on('spinEnd', updateFSButtons);
    events.on('spinStart', updateFSButtons);
    createjs.Ticker.on('tick', checkButtonsState);
    /* eslint-enable */
    return {
        changeAutoText: changeAutoText,
        stopAutoButtons: stopAutoButtons
    };
}();
'use strict';

var canvas = function () {

    var stages = void 0;

    function initStages() {
        /* eslint-disable */
        var bgStaticStage = new createjs.Stage('bgStaticCanvas').set({ name: 'bgStaticStage' });
        var gameStaticStage = new createjs.Stage('gameStaticCanvas').set({ name: 'gameStaticStage' });
        var bonusStaticStage = new createjs.Stage('bonusStaticCanvas').set({ name: 'bonusStaticStage' });
        var bgStage = new createjs.Stage('bgCanvas').set({ name: 'bgStage' });
        var gameStage = new createjs.Stage('gameCanvas').set({ name: 'gameStage' });
        var bonusStage = new createjs.Stage('bonusCanvas').set({ name: 'bonusStage' });
        gameStage.snapToPixelEnabled = true;
        bonusStage.nextStage = gameStage;
        bonusStage.enableMouseOver(10);

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on('tick', bgStage);
        createjs.Ticker.on('tick', gameStage);
        createjs.Ticker.on('tick', bonusStage);

        stages = {
            bgStage: bgStage,
            bgStaticStage: bgStaticStage,
            gameStage: gameStage,
            gameStaticStage: gameStaticStage,
            bonusStage: bonusStage,
            bonusStaticStage: bonusStaticStage
        };

        events.trigger('stagesCreated', stages);
        /* eslint-enable */
    }

    function launchFullScreen(e) {
        /* eslint-disable */
        e.requestFullScreen ? e.requestFullScreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen && e.webkitRequestFullScreen();
        /* eslint-enable */
    }

    function getStages() {
        if (typeof stages !== 'undefined') {
            return stages;
        } else {
            throw new Error('Stages are not created.');
        }
    }

    /* eslint-disable */
    events.on('initStages', initStages);
    /* eslint-enable */

    return {
        initStages: initStages, // КОСТЫЛЬ
        getStages: getStages,
        launchFullScreen: launchFullScreen
    };
}();

// events.trigger('initStages', canvas.initStages); //КОСТЫЛЬ, вызывается в модуле инициализации
'use strict';

var freeSpins = function () {

    var currentFreeSpins = void 0;
    var fsWheels = void 0;
    var fsStartData = void 0;
    var fsTotalWin = void 0;
    var stage = void 0;

    function drawFreeSpinsBG() {
        /* eslint-disable no-undef */
        var loader = preloader.getLoadResult();
        var stage = canvas.getStages().bgStaticStage;
        var fsBG = new createjs.Bitmap(loader.getResult('fsBG')).set({
            name: 'fsBG'
        });
        stage.removeChild(stage.getChildByName('mainBG'));
        stage.addChildAt(fsBG, 0);
        stage.update();
    }

    function initFreeSpins(data) {
        fsTotalWin = 0;
        drawFreeSpinsBG();
        fsWheels = login.getInitData().freeWheels;
        console.warn('FS WHEELS IS:', fsWheels);
        var wheelsLength = fsWheels.length;
        var i = void 0,
            randomArray = [];
        for (i = 0; i < 5; i++) {
            var randomNumber = Math.round(Math.random() * (wheelsLength - 1));
            randomArray.push(randomNumber);
        }
        var firstScreen = spin._getScreenData(randomArray, fsWheels);
        // spin.drawScreen(firstScreen);
    }

    function transitionFreeSpins(data) {
        fsStartData = data;
        var loader = preloader.getLoadResult();
        stage = canvas.getStages().bonusStage;
        stage.alpha = 1;
        console.warn('I am transitionning FS Mode!');

        var transitionContainer = new createjs.Container().set({
            name: 'transitionContainer',
            alpha: 0
        });
        var transitionBG = new createjs.Bitmap(loader.getResult('transitionBG')).set({
            name: 'transitionBG'
        });
        var transitionText = new createjs.Bitmap(loader.getResult('freeSpinsText')).set({
            name: 'transitionText',
            x: (1280 - 790) / 2,
            y: 70
        });
        var transitionOsminog = new createjs.Bitmap(loader.getResult('osminog')).set({
            name: 'transitionOsmonig',
            x: 1280 - 492,
            y: 120
            // scaleX: 1.1,
            // scaleY: 1.1
        });
        var transitionVodolaz = new createjs.Bitmap(loader.getResult('vodolaz')).set({
            name: 'transitionvodolaz',
            x: 0,
            y: 80
        });
        var transitionButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'transitionButton',
            x: (1280 - 396) / 2,
            y: 560
        });

        createjs.Tween.get(transitionContainer).to({ alpha: 1 }, 500).call(function () {
            events.trigger('drawFreeSpins', fsStartData);
        });
        transitionButton.on('mousedown', function () {
            transitionButton.gotoAndStop('over');
        });
        transitionButton.on('click', function () {
            setTimeout(function () {
                events.trigger('startFreeSpin');
            }, 1000);
            createjs.Tween.get(transitionContainer).to({ alpha: 0 }, 500);
        });

        transitionContainer.addChild(transitionBG, transitionText, transitionOsminog, transitionVodolaz, transitionButton);
        stage.addChild(transitionContainer);
    }

    function startFreeSpin() {
        console.warn('I am free spin and I am called!');
        spin.spinStart(false, true);
        // buttons.update
    }

    function stopFreeSpins() {
        var loader = preloader.getLoadResult();
        var stage = canvas.getStages().bgStaticStage;
        var mainBG = new createjs.Bitmap(loader.getResult('mainBG')).set({
            name: 'mainBG'
        });
        stage.removeChild(stage.getChildByName('fsBG'));
        stage.addChildAt(mainBG, 0);
        stage.update();
        var bonusStage = canvas.getStages().bonusStage;
        bonusStage.removeChild(bonusStage.getChildByName('fsTotalContainer'));
    }

    function getWheels() {
        return fsWheels;
    }

    function countTotalWin(data) {
        if (data.mode === 'fsBonus') {
            if (stage.getChildByName('fsTotalContainer')) {
                fsTotalWin = fsTotalWin + data.winCoins;
                stage.getChildByName('fsTotalContainer').getChildByName('fsTotalWinText').text = fsTotalWin;
            } else {
                fsTotalWin = fsTotalWin + data.winCoins;
                var fsTotalContainer = new createjs.Container().set({
                    name: 'fsTotalContainer',
                    x: 550,
                    y: 20
                });
                var fsTotalWinTitle = new createjs.Text('Total Free Win:', '24px bold Arial', '#fff').set({
                    name: 'fsTotalWinTitle',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    shadow: new createjs.Shadow('#C19433', 0, 0, 10)
                });
                var fsTotalWinText = new createjs.Text(fsTotalWin, '36px bold Arial', '#fff').set({
                    name: 'fsTotalWinText',
                    x: 110,
                    y: 0,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    shadow: new createjs.Shadow('#C19433', 0, 0, 10)
                });
                fsTotalContainer.addChild(fsTotalWinTitle, fsTotalWinText);
                stage.addChild(fsTotalContainer);
            }
        }
    }

    function finishFreeSpins() {
        var loader = preloader.getLoadResult();
        var finishContainer = new createjs.Container().set({
            name: 'finishContainer',
            alpha: 0
        });
        var finishBG = new createjs.Bitmap(loader.getResult('transitionBG')).set({
            name: 'finishBG'
        });
        var finishText = new createjs.Bitmap(loader.getResult('totalWinText')).set({
            name: 'finishText',
            x: (1280 - 815) / 2,
            y: 70
        });
        var finishOsminog = new createjs.Bitmap(loader.getResult('osminog')).set({
            name: 'finishOsminog',
            x: 1280 - 492,
            y: 120
        });
        var finishVodolaz = new createjs.Bitmap(loader.getResult('vodolaz')).set({
            name: 'finishVodolaz',
            x: 0,
            y: 80
        });
        var finishSunduk = new createjs.Bitmap(loader.getResult('sunduk')).set({
            name: 'finishSunduk',
            x: (1280 - 589) / 2,
            y: 220
        });
        var finishWinText = new createjs.BitmapText(fsTotalWin + '', loader.getResult('totalWinFS')).set({
            name: 'finishWinText'
        });
        finishWinText.x = (1280 - finishWinText.getBounds().width) / 2;
        finishWinText.y = (720 - finishWinText.getBounds().height) / 2;

        var finishButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'finishButton',
            x: (1280 - 396) / 2,
            y: 560
        });
        finishContainer.addChild(finishBG, finishText, finishSunduk, finishOsminog, finishVodolaz, finishWinText, finishButton);
        createjs.Tween.get(finishContainer).to({ alpha: 1 }, 500).call(function () {
            events.trigger('stopFreeSpins');
        });
        finishButton.on('mousedown', function () {
            finishButton.gotoAndStop('over');
        });
        finishButton.on('click', function () {
            createjs.Tween.get(finishContainer).to({ alpha: 0 }, 500).call(function () {
                stage.removeAllChildren();
            });
        });
        var stage = canvas.getStages().bonusStage;
        stage.addChild(finishContainer);
    }

    function addMultiBonus(data) {
        var multiStage = canvas.getStages().bonusStage;
        // fsTotalWin = fsTotalWin + data.coins;
        // multiStage.getChildByName('fsTotalContainer').getChildByName('fsTotalWinText').text = fsTotalWin;

        var loader = preloader.getLoadResult();
        var multiContainer = new createjs.Container().set({
            name: 'multiContainer',
            alpha: 0
        });
        var multiBG = new createjs.Bitmap(loader.getResult('multiBG')).set({
            name: 'multiBG'
        });
        var multiTitle = new createjs.Bitmap(loader.getResult('multiTitle')).set({
            name: 'multiTitle',
            x: (1280 - 868) / 2,
            y: 100
        });
        var multiCoins = new createjs.Bitmap(loader.getResult('multiCoins')).set({
            name: 'multiCoins',
            x: (1280 - 192) / 2,
            y: 440
        });
        var multiWinText = new createjs.Text(data.coins, '150px bold Arial', '#fff').set({
            x: 1280 / 2,
            y: 680 / 2,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#fff', 0, 0, 10)
        });
        var multiButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'multiButton',
            x: (1280 - 396) / 2,
            y: 560
        });
        multiContainer.addChild(multiBG, multiTitle, multiCoins, multiWinText, multiButton);
        createjs.Tween.get(multiContainer).to({ alpha: 1 }, 500);
        multiButton.on('mousedown', function () {
            multiButton.gotoAndStop('over');
        });
        multiButton.on('click', function () {
            utils.request('_Ready/', login.getSessionID()).then(function (response) {
                if (response.ErrorCode === 0) {
                    events.trigger('startFreeSpin');
                }
            });
            createjs.Tween.get(multiContainer).to({ alpha: 0 }, 500).call(function () {
                multiStage.removeChild(multiContainer);
            });
        });
        multiStage.addChild(multiContainer);
    }

    events.on('initFreeSpins', transitionFreeSpins);
    events.on('drawFreeSpins', initFreeSpins);
    // events.on('initFreeSpins', initFreeSpins);
    events.on('stopFreeSpins', stopFreeSpins);
    events.on('finishFreeSpins', finishFreeSpins);
    events.on('startFreeSpin', startFreeSpin);
    events.on('spinEnd', countTotalWin);
    events.on('multiplierBonus', addMultiBonus);
    return {
        initFreeSpins: initFreeSpins,
        stopFreeSpins: stopFreeSpins,
        startFreeSpin: startFreeSpin,
        getWheels: getWheels,
        drawFreeSpinsBG: drawFreeSpinsBG
    };
}();
'use strict';

/* eslint-disable no-unused-vars */
var init = function () {

    var initData = {};

    function parseWheels(string) {
        var wheelsMas = string.split('|').map(function (column) {
            return column.split('@');
        });
        wheelsMas.map(function (column, columnIndex) {
            return column.map(function (element, rowIndex) {
                switch (element) {
                    case 'j':
                        element = 1;
                        break;
                    case 'iJ':
                        element = 2;
                        break;
                    case 'q':
                        element = 3;
                        break;
                    case 'iQ':
                        element = 4;
                        break;
                    case 'k':
                        element = 5;
                        break;
                    case 'iK':
                        // КОСТЫЛЬ! Попросить бек чтобы называли одинаково
                        element = 6;
                        break;
                    case 'a':
                        element = 7;
                        break;
                    case 'iA':
                        element = 8;
                        break;
                    case 'wild':
                        element = 9;
                        break;
                    case 'scatter':
                        element = 10;
                        break;
                    case 'sw1':
                        element = 11;
                        break;
                    case 'sw2':
                        element = 12;
                        break;
                    case 'sw3':
                        element = 13;
                        break;
                    case 'card':
                        element = 14;
                        break;
                    default:
                        console.error('Unknown symbol!');
                }
                column[rowIndex] = element;
            });
        });
        return wheelsMas;
    }
    function parseLines(string) {
        var linesMas = string.split('|').map(function (line, lineNumber) {
            return line.split('@').map(function (coords, index) {
                return coords.split(',');
            });
        });
        return linesMas;
    }

    function initGame(sessionID) {
        /* eslint-disable */
        var gameID = 6; // КОСТЫЛЬ! Должен получать от сервера инициализации.

        var playPromise = utils.request('_Play', '/' + sessionID + '/' + gameID);
        playPromise.then(function (balanceData) {
            initData.balance = balanceData;
        }).catch(function (error) {
            return console.dir(error);
        });

        Promise.all([playPromise]).then(function () {

            var wheelsPromise = utils.request('_GetAllWheels', '/' + sessionID).then(function (wheelsString) {
                initData.wheels = parseWheels(wheelsString);
            }).catch(function (error) {
                return console.dir(error);
            });

            var freeWheelsPromise = utils.request('_GetAllWheelsByMode', '/' + sessionID + '/fsBonus').then(function (freeWheelsString) {
                initData.freeWheels = parseWheels(freeWheelsString);
            }).catch(function (error) {
                return console.dir(error);
            });

            var linesPromise = utils.request('_GetLines', '/' + sessionID).then(function (linesString) {
                initData.lines = parseLines(linesString);
            }).catch(function (error) {
                return console.dir(error);
            });

            Promise.all([wheelsPromise, freeWheelsPromise, linesPromise]).then(function () {
                events.trigger('dataDownloaded', initData);
            });
        });
        /* eslint-enable */
    }

    /* eslint-disable */
    function getInitData() {
        return utils.getData(initData);
    }
    /* eslint-enable */

    /* eslint-disable */
    events.on('initGame', initGame);
    /* eslint-enable */

    return {
        getInitData: getInitData
    };
}();
'use strict';

var lines = function () {

    /* eslint-disable */
    createjs.MotionGuidePlugin.install(createjs.Tween);
    /* eslint-enable */

    // Stages
    var frontStage = void 0;
    var backStage = void 0;

    // Containers
    var winNumbersContainer = void 0;
    var winLinesContainer = void 0;
    var winRectsContainer = void 0;

    var linesEls = {
        linesDiscs: [],
        linesNumbers: [],
        winLines: [],
        winRects: []
    };

    var linesData = {};

    var winData = [];
    var winFinishData = [];

    var parameters = {
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

    var flags = {};

    function parseLinesResult(arr) {
        var result = [];
        arr.forEach(function (line) {
            var amount = +parseInt(line, 10);
            var number = +parseInt(line.substr(line.indexOf('#') + 1), 10);
            var win = +parseInt(line.substr(line.indexOf(':') + 1), 10);
            var lineObj = {
                amount: amount,
                number: number,
                win: win
            };
            result.push(lineObj);
        });
        return result;
    }

    function parseLinesCoords(arr) {
        var result = [];
        arr.forEach(function (line, number) {
            result[number] = [];
            line.forEach(function (point, index) {
                var x = +point[0];
                var y = +point[1];
                var resultX = 192 * (x + 0.5);
                var resultY = 180 * (y + 0.5);
                var resultCoords = {
                    x: resultX,
                    y: resultY
                };
                result[number][index] = resultCoords;
            });
        });
        return result;
    }

    function parseLinesPaths(arr) {
        var result = [];
        arr.forEach(function (line, number) {
            result[number] = [];
            line.forEach(function (point) {
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
        spin.getGamePosition().then(function (result) {

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
        var loader = preloader.getLoadResult();
        /* eslint-enable */
        var linesDiscSpriteSheet = loader.getResult('linesDisc');
        for (var i = 0, len = linesData.linesCoords.length; i < len + 1; i++) {
            /* eslint-disable */
            var linesNumber = new createjs.Text(i + 1, parameters.font, parameters.color).set({
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
            var linesDisc = new createjs.Sprite(linesDiscSpriteSheet, 'on').set({
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
            var loader = preloader.getLoadResult();
            var totalWin = new createjs.Container().set({
                /* eslint-enable */
                name: 'totalWin'
            });
            /* eslint-disable */
            var totalWinText = new createjs.BitmapText(win + '', loader.getResult('winTotal')).set({
                name: 'totalWinText'
            });
            totalWinText.x = (960 - totalWinText.getBounds().width) / 2;
            totalWinText.y = (540 - totalWinText.getBounds().height) / 2;
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
                winData.forEach(function (data) {
                    winFinishData.push(data);
                });
                var settings = {}; // КОСТЫЛЬ Это нужно получать из настроек
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
        var gameContainer = canvas.getStages().bgStage.getChildByName('gameContainer');
        /* eslint-enable */
        for (var i = 0; i < 5; i++) {
            var column = gameContainer.getChildByName('gameColumn' + i);
            for (var j = 0; j < 5; j++) {
                var element = column.getChildByName('gameElement' + j);
                var animationName = element.currentAnimation;
                var elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                element.gotoAndStop('normal-' + elementIndex);
                element.set({ scaleX: 1, scaleY: 1 });
            }
        }
    }

    function removeWinScreen() {
        winRectsContainer.removeAllChildren();
        winLinesContainer.removeAllChildren();
        removeWinElements();
        linesEls.linesDiscs.forEach(function (disc) {
            disc.gotoAndStop('on');
        });
    }

    function drawWinLines(spinEndObject) {

        flags.autoMode = spinEndObject.autoSpinFlag;
        flags.freeMode = spinEndObject.freeSpinFlag;
        flags.mode = spinEndObject.mode;
        flags.fsCount = spinEndObject.fsCount;
        /* eslint-disable */
        var loader = preloader.getLoadResult();
        /* eslint-enable */
        if (winData[0]) {
            // Нарисовали линии
            winData.forEach(function (winDataObject) {
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
        var amount = Math.round(Math.random() * 50) + 10;
        /* eslint-disable */
        var loader = preloader.getLoadResult();
        /* eslint-enable */
        var lightSpriteSheet = loader.getResult('linesSprite');
        for (var i = 0; i < amount; i++) {
            var timeout = Math.random() * 700;
            /* eslint-disable */
            var light = new createjs.Sprite(lightSpriteSheet, 'go').set({
                /* eslint-enable */
                x: linePath[0],
                y: linePath[1],
                regX: 24,
                regY: 19,
                name: 'winLight'
            });
            /* eslint-disable */
            createjs.Tween.get(light).wait(timeout).to({ guide: { path: linePath, orient: 'cw' } }, 700).call(function (tween) {
                winLinesContainer.removeChild(tween.target);
            });
            /* eslint-enable */
            winLinesContainer.addChild(light);
        }
    }

    function drawLinesText(data) {
        var number = data.number;
        var amount = data.amount;
        var win = data.win;
        /* eslint-disable */
        var loader = preloader.getLoadResult();
        var winText = new createjs.Container().set({
            /* eslint-enable */
            y: linesData.linesCoords[number - 1][amount - 1].y + 30,
            x: linesData.linesCoords[number - 1][amount - 1].x + 32,
            name: 'winText'
        });
        /* eslint-disable */
        var winLineRect = new createjs.Bitmap(loader.getResult('winLineRect')).set({
            /* eslint-enable */
            name: 'winLineRect',
            scaleX: 1,
            scaleY: 1
        });
        /* eslint-disable */
        var winLineText = new createjs.Text(win, 'bold 27px Arial', 'gold').set({
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
        linesEls.winRects.push(winText);
        winRectsContainer.addChild(winText);
    }

    function drawLinesShape(number) {
        var winDisc = linesEls.linesDiscs[number - 1];
        winDisc.gotoAndStop('off');
        /* eslint-disable */
        var winLine = new createjs.Shape();
        /* eslint-enable */
        for (var j = 0; j < 5; j++) {
            var currentCoords = linesData.linesCoords[number - 1][j];
            if (j === 0) {
                winLine.graphics.s('#00fefe').setStrokeStyle(2).lt(currentCoords.x, currentCoords.y);
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

        var defaultOptions = {
            winText: false,
            winLight: true,
            winShape: true
        };
        if (typeof options === 'undefined') {
            options = defaultOptions;
        }
        /* eslint-disable */
        var loader = preloader.getLoadResult();
        var gameContainer = canvas.getStages().bgStage.getChildByName('gameContainer');
        /* eslint-enable */

        if (data) {
            (function () {

                var number = data.number;
                var amount = data.amount;
                var win = data.win;
                // Если выпавшая линия не скаттер и не тройной скаттер.
                if (number !== -1 && number !== -2) {
                    var line = linesData.linesArray[number - 1];
                    if (options.winText) {
                        drawLinesText(data);
                    }
                    if (options.winLight) {
                        drawLinesLight(linesData.linesPaths[number - 1]);
                    }
                    if (options.winShape) {
                        drawLinesShape(number);
                    }
                    line.forEach(function (coords, index) {
                        var x = +coords[0];
                        var y = +coords[1];
                        if (x < amount) {
                            var column = gameContainer.getChildByName('gameColumn' + index);
                            var element = column.getChildByName('gameElement' + (y + 1));
                            var animationName = element.currentAnimation;
                            var elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                            element.gotoAndStop('win-' + elementIndex);
                            /* eslint-disable */
                            createjs.Tween.get(element).to({ scaleX: 0.8, scaleY: 0.8 }, 200).to({ scaleX: 1.05, scaleY: 1.05 }, 700, createjs.Ease.bounceOut);
                            /* eslint-enable */
                        }
                    });
                    // Если выпали скаттеры
                } else if (number === -1) {
                        console.warn('I am here! Lines number = -1');
                        if (win > 0) {
                            for (var i = 0; i < 5; i++) {
                                var column = gameContainer.getChildByName('gameColumn' + i);
                                for (var j = 0; j < 5; j++) {
                                    var element = column.getChildByName('gameElement' + j);
                                    var animationName = element.currentAnimation;
                                    var elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                                    if (+elementIndex === 10) {
                                        element.gotoAndStop('win-' + elementIndex);
                                        /* eslint-disable */
                                        createjs.Tween.get(element).to({ scaleX: 0.8, scaleY: 0.8 }, 200).to({ scaleX: 1.1, scaleY: 1.1 }, 700, createjs.Ease.bounceOut);
                                        /* eslint-enable */
                                    }
                                }
                            }
                        } else {
                                console.warn('And this is scatter Wild!');
                                for (var _i = 0; _i < 5; _i++) {
                                    var _column = gameContainer.getChildByName('gameColumn' + _i);
                                    for (var _j = 0; _j < 5; _j++) {
                                        var _element = _column.getChildByName('gameElement' + _j);
                                        var _animationName = _element.currentAnimation;
                                        var _elementIndex = _animationName.substr(_animationName.indexOf('-') + 1);
                                        if (+_elementIndex === 11 || +_elementIndex === 12 || +_elementIndex === 13 || +_elementIndex === 14) {
                                            _element.gotoAndStop('win-' + _elementIndex);
                                        }
                                        if (+_elementIndex === 14) {
                                            _element.gotoAndStop('win-' + _elementIndex);
                                            createjs.Tween.get(_element).to({ scaleX: 0.8, scaleY: 0.8 }, 200).to({ scaleX: 1.1, scaleY: 1.1 }, 700, createjs.Ease.bounceOut);
                                            winRectsContainer.addChild(drawTotalWin('+3').set({ x: 120, y: 260, scaleX: 0.7, scaleY: 0.7 }));
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
                        flags.lineTimer = createjs.Ticker.on('tick', function (event) {
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
            })();
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
            linesEls.linesDiscs.forEach(function (disc) {
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
        drawLinesNumbers: drawLinesNumbers,
        drawWinLine: drawWinLine,
        clearAutoTimer: clearAutoTimer,
        removeWinLines: removeWinLines,
        removeWinScreen: removeWinScreen
    };
}();
'use strict';

var login = function () {

    var sessionID = void 0;

    function enter(userID, casinoID) {
        userID = userID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        casinoID = casinoID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        /* eslint-disable */
        utils.request('_Login', '/' + userID + '/' + casinoID)
        /* eslint-enable */
        .then(function (ID) {
            sessionID = ID;
            /* eslint-disable */
            events.trigger('initGame', sessionID);
            events.trigger('initStages', sessionID);
            events.trigger('initPreloader', sessionID);
            /* eslint-enable */
        }).catch(function (error) {
            return console.error(error);
        });
    }

    /* eslint-disable */
    function getSessionID() {
        return utils.getData(sessionID);
    }
    /* eslint-enable */

    return {
        enter: enter,
        getSessionID: getSessionID
    };
}();

login.enter();
'use strict';

var menu = function () {
    /* eslint-disable no-undef */
    /* eslint-disable no-use-before-define */
    function showMenu(name) {
        var loader = preloader.getLoadResult();
        var bonusStage = canvas.getStages().bonusStage;
        var bonusStaticStage = canvas.getStages().bonusStaticStage;
        bonusStage.alpha = 1;

        var menuContainer = new createjs.Container().set({
            x: 1280,
            y: 0,
            name: 'menuContainer'
        });

        menuContainer.on('click', function (event) {
            event.stopPropagation();
        });

        var overlay = new createjs.Shape();
        overlay.set({
            name: 'overlay',
            alpha: 0
        });
        overlay.graphics.beginFill('rgba(0, 0, 0, 0.5)').drawRect(0, 0, 1280, 720);
        createjs.Tween.get(overlay).to({ alpha: 1 }, 300);
        overlay.on('click', function (event) {
            createjs.Tween.get(menuContainer).to({ x: 1280 }, 300);
            createjs.Tween.get(overlay).to({ alpha: 0 }, 300).call(hideMenu);
        });
        bonusStage.addChildAt(overlay, 0);
        bonusStage.addChild(menuContainer);

        var menuBG = new createjs.Bitmap(loader.getResult('menuBG')).set({
            name: 'menuBG'
        });
        var menuBack = new createjs.Sprite(loader.getResult('menuBack')).set({
            name: 'menuBack',
            x: (305 - 105) / 2,
            y: 584
        });
        menuBack.on('click', function () {
            menuBack.gotoAndStop('down');
            createjs.Tween.get(menuContainer).to({ x: 1280 }, 300);
            createjs.Tween.get(overlay).to({ alpha: 0 }, 300).call(hideMenu);
        });
        menuContainer.addChild(menuBG, menuBack);
        if (name === 'bet') {
            (function () {
                var menuBetTitle = new createjs.Bitmap(loader.getResult('menuBetTitle')).set({
                    name: 'menuBetTitle',
                    x: (305 - 185) / 2,
                    y: 35
                });
                var menuMaxBet = new createjs.Sprite(loader.getResult('menuMaxBet'), 'out').set({
                    name: 'menuMaxBet',
                    x: (305 - 135) / 2,
                    y: 100
                });
                var menuBetMinus = new createjs.Sprite(loader.getResult('menuMinusPlus'), 'minus_out').set({
                    name: 'menuBetMinus',
                    x: 40,
                    y: 326
                });
                var menuBetPlus = new createjs.Sprite(loader.getResult('menuMinusPlus'), 'plus_out').set({
                    name: 'menuBetPlus',
                    x: 208,
                    y: 326
                });
                var betValue = balance.getBalanceData().betValue;
                var coinsValue = balance.getBalanceData().coinsValue;
                var menuBetText = new createjs.Text(betValue, 'bold 60px Titania', '#ddd').set({
                    name: 'menuBetText',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    x: 152,
                    y: 346,
                    shadow: new createjs.Shadow('#ddd', 0, 0, 8)
                });
                var menuCoinsText = new createjs.Text(coinsValue, 'bold 35px Titania', '#ddd').set({
                    name: 'menuCoinsText',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    x: 152,
                    y: 514,
                    shadow: new createjs.Shadow('#ddd', 0, 0, 8)
                });
                var menuCoinMinus = new createjs.Sprite(loader.getResult('menuMinusPlus'), 'minus_out').set({
                    name: 'menuCoinMinus',
                    x: 40,
                    y: 485
                });
                var menuCoinPlus = new createjs.Sprite(loader.getResult('menuMinusPlus'), 'plus_out').set({
                    name: 'menuCoinPlus',
                    x: 208,
                    y: 485
                });
                menuMaxBet.on('click', function () {
                    balance.changeBet(true, true);
                    balance.changeCoins(true, true);
                    menuBetText.text = balance.getBalanceData().betValue;
                    menuCoinsText.text = balance.getBalanceData().coinsValue;
                });
                menuCoinPlus.on('click', function () {
                    balance.changeCoins(true);
                    menuCoinsText.text = balance.getBalanceData().coinsValue;
                });
                menuCoinMinus.on('click', function () {
                    balance.changeCoins(false);
                    menuCoinsText.text = balance.getBalanceData().coinsValue;
                });
                menuBetPlus.on('click', function () {
                    balance.changeBet(true);
                    menuBetText.text = balance.getBalanceData().betValue;
                });
                menuBetMinus.on('click', function () {
                    balance.changeBet(false);
                    menuBetText.text = balance.getBalanceData().betValue;
                });
                var menuBetLevel = new createjs.Bitmap(loader.getResult('menuBetLevel')).set({
                    name: 'menuBetLevel',
                    x: (305 - 121) / 2,
                    y: 264
                });
                var menuBetBG = new createjs.Bitmap(loader.getResult('menuDisc')).set({
                    name: 'menuBetBG',
                    x: (305 - 105) / 2,
                    y: 295
                });
                var menuCoinValue = new createjs.Bitmap(loader.getResult('menuCoinValue')).set({
                    name: 'menuCoinValue',
                    x: (305 - 139) / 2,
                    y: 432
                });
                var menuCoinBG = menuBetBG.clone().set({
                    name: 'menuCoinBG',
                    y: 460
                });
                var menuDivider1 = new createjs.Bitmap(loader.getResult('menuDivider')).set({
                    name: 'menuDivider1',
                    x: (305 - 47) / 2,
                    y: 90
                });
                var menuDivider2 = menuDivider1.clone().set({
                    name: 'menuDivider2',
                    y: 245
                });
                var menuDivider3 = menuDivider1.clone().set({
                    name: 'menuDivider3',
                    y: 414
                });
                var menuDivider4 = menuDivider1.clone().set({
                    name: 'menuDivider4',
                    y: 575
                });
                menuContainer.addChild(menuBetTitle, menuMaxBet, menuBetLevel, menuBetBG, menuBetPlus, menuBetMinus, menuBetText, menuCoinValue, menuCoinBG, menuCoinPlus, menuCoinMinus, menuCoinsText, menuDivider1, menuDivider2, menuDivider3, menuDivider4);
            })();
        } else if (name === 'auto') {
            var menuAutoTitle = new createjs.Bitmap(loader.getResult('menuAutoTitle')).set({
                name: 'menuAutoTitle',
                x: (305 - 238) / 2,
                y: 35
            });
            var menuAutoCircle = new createjs.Bitmap(loader.getResult('menuDisc')).set({
                regX: 52,
                regY: 52
            });
            var menuAutoText = new createjs.Text('', 'bold 50px Titania', '#ddd').set({
                textAlign: 'center',
                textBaseline: 'middle',
                shadow: new createjs.Shadow('#ddd', 0, 0, 8)
            });
            var menuAutoCircle10 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle10'
            });
            var menuAutoText10 = menuAutoText.clone().set({
                text: 10,
                name: 'menuAutoText10'
            });
            var menuAutoButton10 = new createjs.Container().set({
                amount: 10,
                name: 'menuAutoButton10',
                x: 82,
                y: 190
            });
            menuAutoButton10.addChild(menuAutoCircle10, menuAutoText10);
            var menuAutoCircle25 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle25'
            });
            var menuAutoText25 = menuAutoText.clone().set({
                text: 25,
                name: 'menuAutoText25'
            });
            var menuAutoButton25 = new createjs.Container().set({
                amount: 25,
                name: 'menuAutoButton25',
                x: 217,
                y: 190
            });
            menuAutoButton25.addChild(menuAutoCircle25, menuAutoText25);
            var menuAutoCircle50 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle50'
            });
            var menuAutoText50 = menuAutoText.clone().set({
                text: 50,
                name: 'menuAutoText50'
            });
            var menuAutoButton50 = new createjs.Container().set({
                amount: 50,
                name: 'menuAutoButton50',
                x: 82,
                y: 335
            });
            menuAutoButton50.addChild(menuAutoCircle50, menuAutoText50);
            var menuAutoCircle100 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle100'
            });
            var menuAutoText100 = menuAutoText.clone().set({
                text: 100,
                font: 'bold 36px Titania',
                name: 'menuAutoText100'
            });
            var menuAutoButton100 = new createjs.Container().set({
                amount: 100,
                name: 'menuAutoButton100',
                x: 217,
                y: 335
            });
            menuAutoButton100.addChild(menuAutoCircle100, menuAutoText100);
            var menuAutoCircle250 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle250'
            });
            var menuAutoText250 = menuAutoText.clone().set({
                text: 250,
                font: 'bold 36px Titania',
                name: 'menuAutoText250'
            });
            var menuAutoButton250 = new createjs.Container().set({
                amount: 250,
                name: 'menuAutoButton250',
                x: 82,
                y: 480
            });
            menuAutoButton250.addChild(menuAutoCircle250, menuAutoText250);
            var menuAutoCircle500 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle500'
            });
            var menuAutoText500 = menuAutoText.clone().set({
                text: 500,
                font: 'bold 36px Titania',
                name: 'menuAutoText500'
            });
            var menuAutoButton500 = new createjs.Container().set({
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
            var menuSettingsTitle = new createjs.Bitmap(loader.getResult('menuSettingsTitle')).set({
                name: 'menuSettingsTitle',
                x: (305 - 219) / 2,
                y: 35
            });
            menuContainer.addChild(menuSettingsTitle);
        }
        createjs.Tween.get(menuContainer).to({ x: 1280 - 302 }, 300);
    }

    function _autoPlayClick() {
        /* eslint-disable no-invalid-this */
        console.log('Amount autoPlay is:', this.amount);
        events.trigger('initAutoplay', this.amount);
        var menuContainer = canvas.getStages().bonusStage.getChildByName('menuContainer');
        var overlay = canvas.getStages().bonusStage.getChildByName('overlay');
        createjs.Tween.get(menuContainer).to({ x: 1280 }, 300);
        createjs.Tween.get(overlay).to({ alpha: 0 }, 300).call(hideMenu);
    }

    function hideMenu() {
        var bonusStage = canvas.getStages().bonusStage;
        var bonusStaticStage = canvas.getStages().bonusStaticStage;
        bonusStage.alpha = 0;
        bonusStaticStage.alpha = 0;
        bonusStaticStage.removeAllChildren();
        bonusStage.removeAllChildren();
        bonusStage.nextStage = canvas.getStages().gameStage;
    }

    return {
        showMenu: showMenu,
        hideMenu: hideMenu
    };
}();
'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */

var preloaderManifest = [{ id: 'preloaderBG', src: 'static/img/content/preloader/preloaderBG.png' }, { id: 'preloaderPlay', src: 'static/img/content/preloader/preloaderPlay.png' }, { id: 'preloaderLogo', src: 'static/img/content/preloader/preloaderLogo.png' }, { id: 'preloaderLogoBrands', src: 'static/img/content/preloader/preloaderLogoBrands.png' }, { id: 'preloaderSprite', src: 'static/img/content/preloader/preloaderSprite.json', type: 'spritesheet' }];

var mainManifest = [
// bg
{ id: 'fsBG', src: 'static/img/content/bg/fsBG.png' }, { id: 'mainBG', src: 'static/img/content/bg/mainBG.png' }, { id: 'gameBG', src: 'static/img/content/bg/gameBG.png' }, { id: 'footerBG', src: 'static/img/content/bg/footerBG.png' }, { id: 'gameMachine', src: 'static/img/content/bg/gameMachine.png' }, { id: 'gameShadow', src: 'static/img/content/bg/gameShadow.png' }, { id: 'transitionBG', src: 'static/img/content/bg/transitionBG.png' }, { id: 'multiBG', src: 'static/img/content/bg/multiBG.png' },
// freespin
{ id: 'vodolaz', src: 'static/img/content/freespin/vodolaz.png' }, { id: 'sunduk', src: 'static/img/content/freespin/sunduk.png' }, { id: 'osminog', src: 'static/img/content/freespin/osminog.png' }, { id: 'freeSpinsText', src: 'static/img/content/freespin/freeSpinsText.png' }, { id: 'bigWinText', src: 'static/img/content/freespin/bigWinText.png' }, { id: 'totalWinText', src: 'static/img/content/freespin/totalWinText.png' }, { id: 'totalWinFS', src: 'static/img/content/freespin/totalWinFS.json', type: 'spritesheet' }, { id: 'multiTitle', src: 'static/img/content/freespin/multiTitle.png' }, { id: 'multiCoins', src: 'static/img/content/freespin/multiCoins.png' },
// bonuses
{ id: 'bonusBG', src: 'static/img/content/bonuses/bonusBG.png' }, { id: 'bonusFG', src: 'static/img/content/bonuses/bonusFG.png' }, { id: 'bonusWin', src: 'static/img/content/bonuses/bonusWin.json', type: 'spritesheet' }, { id: 'bonusWinResult', src: 'static/img/content/bonuses/bonusWinResult.json', type: 'spritesheet' }, { id: 'bonusFail', src: 'static/img/content/bonuses/bonusFail.json', type: 'spritesheet' }, { id: 'illuminators', src: 'static/img/content/bonuses/illuminators.json', type: 'spritesheet' }, { id: 'octopus', src: 'static/img/content/bonuses/octopus.png' }, { id: 'light', src: 'static/img/content/bonuses/light.png' },
// buttons
{ id: 'spinButton', src: 'static/img/content/buttons/spin.json', type: 'spritesheet' }, { id: 'autoButton', src: 'static/img/content/buttons/auto.json', type: 'spritesheet' }, { id: 'betButton', src: 'static/img/content/buttons/bet.json', type: 'spritesheet' }, { id: 'menuButton', src: 'static/img/content/buttons/menu.json', type: 'spritesheet' }, { id: 'soundButton', src: 'static/img/content/buttons/sound.json', type: 'spritesheet' }, { id: 'continueButton', src: 'static/img/content/buttons/continue.json', type: 'spritesheet' },
// menu
{ id: 'menuBG', src: 'static/img/content/menu/menuBG.png' }, { id: 'menuBetTitle', src: 'static/img/content/menu/menuBetTitle.png' }, { id: 'menuAutoTitle', src: 'static/img/content/menu/menuAutoTitle.png' }, { id: 'menuSettingsTitle', src: 'static/img/content/menu/menuSettingsTitle.png' }, { id: 'menuBetLevel', src: 'static/img/content/menu/menuBetLevel.png' }, { id: 'menuCoinValue', src: 'static/img/content/menu/menuCoinValue.png' }, { id: 'menuDisc', src: 'static/img/content/menu/menuDisc.png' }, { id: 'menuDivider', src: 'static/img/content/menu/menuDivider.png' }, { id: 'menuMaxBet', src: 'static/img/content/menu/menuMaxBet.json', type: 'spritesheet' }, { id: 'menuMinusPlus', src: 'static/img/content/menu/menuMinusPlus.json', type: 'spritesheet' }, { id: 'menuBack', src: 'static/img/content/menu/menuBack.json', type: 'spritesheet' },
// lines
{ id: 'linesDisc', src: 'static/img/content/lines/linesDisc.json', type: 'spritesheet' }, { id: 'linesSprite', src: 'static/img/content/lines/linesSprite.json', type: 'spritesheet' }, { id: 'winLineRect', src: 'static/img/content/lines/winLineRect.png' }, { id: 'winTotalRect', src: 'static/img/content/lines/winTotalRect.png' }, { id: 'winTotal', src: 'static/img/content/lines/winTotal.json', type: 'spritesheet' },
// elements
{ id: 'elements', src: 'static/img/content/elements/elements.json', type: 'spritesheet' }];

var preloader = function () {

    // Stage
    var stage = void 0;

    // Data
    var loadResult = void 0;

    // Counter
    var filesLoaded = 0;

    function downloadManifest() {
        /* eslint-disable no-undef */
        /* eslint-disable no-use-before-define */
        var loader = new createjs.LoadQueue(true);
        loader.setMaxConnections(4);
        loader.loadManifest(preloaderManifest);
        loader.on('complete', showPreloader);
    }

    function showPreloader(event) {
        stage = canvas.getStages().bonusStage;
        var loader = event.target;

        var preloaderBG = new createjs.Bitmap(loader.getResult('preloaderBG')).set({
            name: 'preloaderBG'
        });
        var preloaderLogo = new createjs.Bitmap(loader.getResult('preloaderLogo')).set({
            name: 'preloaderLogo',
            x: (1280 - 757) / 2,
            y: 65
        });

        var preloaderLogoBrands = new createjs.Bitmap(loader.getResult('preloaderLogoBrands')).set({
            name: 'preloaderLogoBrands',
            x: 1100,
            y: 20,
            alpha: 0.75,
            scaleX: 0.75,
            scaleY: 0.75
        });

        var preloaderPlay = new createjs.Bitmap(loader.getResult('preloaderPlay')).set({
            name: 'preloaderPlay',
            x: (1280 - 265) / 2,
            y: 310,
            shadow: new createjs.Shadow('#C19433', 0, 0, 15),
            alpha: 0
        });

        var preloaderSprite = new createjs.Sprite(loader.getResult('preloaderSprite')).set({
            name: 'preloaderSprite',
            x: (1280 - 630) / 2 - 100,
            y: 450
        });

        var preloaderContainer = new createjs.Container().set({
            name: 'preloaderContainer'
        });

        preloaderContainer.addChild(preloaderBG, preloaderLogo, preloaderPlay, preloaderLogoBrands, preloaderSprite);

        stage.addChild(preloaderContainer);

        mainPreload(preloaderContainer);
    }

    function mainPreload(container) {
        var sprite = container.getChildByName('preloaderSprite');
        var loader = new createjs.LoadQueue(true);

        loader.setMaxConnections(20);
        loader.loadManifest(mainManifest);

        loader.on('fileload', handleFileLoad, loader, false, {
            sprite: sprite
        });
        loader.on('complete', handleLoadComplete, loader, true, {
            container: container
        });
    }

    function handleFileLoad(event, data) {
        // Change counter of downloaded files
        filesLoaded++;

        var sprite = data.sprite;
        var filesNumber = mainManifest.length;
        var framesNumber = sprite.spriteSheet.getNumFrames('run');
        var currentFrame = Math.ceil(filesLoaded / filesNumber * framesNumber) - 1;

        sprite.gotoAndStop(currentFrame);
    }

    function handleLoadComplete(event, data) {
        var container = data.container;
        var sprite = container.getChildByName('preloaderSprite');
        var play = container.getChildByName('preloaderPlay');

        createjs.Tween.get(play).to({ alpha: 1 }, 500);

        sprite.stop();
        createjs.Tween.get(sprite, { loop: true }).to({ alpha: 0.8 }, 400).to({ alpha: 1 }, 400);

        loadResult = event.target;

        events.trigger('preloadComplete', loadResult);

        play.on('click', handlePlayClick, this, true, {
            container: container
        });
    }

    function handlePlayClick(event, data) {
        var container = data.container;
        var game = document.querySelector('#game');
        canvas.launchFullScreen(game);
        createjs.Tween.get(container).to({ alpha: 0 }, 1000, createjs.Ease.circIn).call(function () {
            stage.removeAllChildren();
        });
    }

    function getLoadResult() {
        return utils.getData(loadResult);
    }

    /* eslint-disable */
    events.on('initPreloader', downloadManifest);
    /* eslint-enable */
    return {
        getLoadResult: getLoadResult
    };
}();

// events.trigger('initPreloader'); // КОСТЫЛЬ, вызывается в модуле инициализации
'use strict';

/* eslint-disable no-unused-vars */
var spin = function () {

    // Consts
    var serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';
    var elementWidth = 192; // Может поменяться от игры к игре
    var elementHeight = 180; // Может поменяться от игры к игре
    var columnsNumber = 5; // Может поменяться от игры к игре
    var rowsNumber = 5; // Может поменяться от игры к игре
    var longRowsNumber = 40; // Может поменяться от игры к игре

    // Flag
    var mode = void 0;
    var inProgress = void 0;
    var fastSpinFlag = void 0;
    var locked = void 0;
    var fastSpinTimer = void 0;
    var autoSpinFlag = void 0;
    var freeSpinFlag = void 0;
    var bonusFlag = void 0;
    var fsCount = void 0;
    var fsMulti = void 0;
    var fsLevel = void 0;

    // Container
    var gameContainer = void 0;

    // Data
    var wheels = void 0;
    var columns = void 0;
    var currentScreen = void 0;
    var nextScreen = void 0;

    // Balance
    var winCoins = void 0;
    var winCents = void 0;
    var scoreCoins = void 0;
    var scoreCents = void 0;
    var indexes = void 0;
    var winLines = void 0;

    // Bonuses
    var bonusLevelName = void 0;
    var bonusEnd = void 0;
    var bonusValue = void 0;
    var bonusOldValues = void 0;
    var bonusWinCoins = void 0;
    var bonusWinCents = void 0;

    function initWheels(data) {
        wheels = data.wheels;
        var randomArray = [];
        wheels.forEach(function (column) {
            var randomNumber = Math.round(Math.random() * (wheels.length - 1));
            randomArray.push(randomNumber);
        });
        /* eslint-disable */
        currentScreen = _getScreenData(randomArray);
        events.on('preloadComplete', initScreen);
        /* eslint-enable */
    }

    function initScreen() {
        console.log('i am here', currentScreen);
        /* eslint-disable */
        drawScreen(currentScreen);
        /* eslint-enable */
    }

    function _initGameContainer(x, y) {
        /* eslint-disable */
        gameContainer = new createjs.Container().set({
            x: x, // Смещение gameContainer и маски должны совпадать
            y: y, // Смещение gameContainer и маски должны совпадать
            name: 'gameContainer'
        });
        var stage = canvas.getStages().bgStage;
        var gameMask = new createjs.Shape();
        /* eslint-enable */
        gameMask.graphics.drawRect(x, y, 960, 540); // Смещение gameContainer и маски должны совпадать
        gameContainer.mask = gameMask;
        stage.addChild(gameContainer);
    }

    function _getScreenData(inds, wls) {
        inds = inds || indexes;
        wls = wls || wheels;
        var i = void 0,
            j = void 0,
            screen = [];
        var wheelsLength = +wls[0].length; // Если колеса будут разной длинны поломается
        for (i = 0; i < columnsNumber; i++) {
            screen[i] = [];
            for (j = 0; j < rowsNumber; j++) {
                if (inds[i] === 0 && j === 0) {
                    // Проверка на верхний край
                    screen[i][j] = wls[i][wheelsLength - 1];
                } else if (inds[i] > wheelsLength - 4) {
                    // Проверка на нижний край
                    if (wls[i][inds[i] + j - 1]) {
                        screen[i][j] = wls[i][inds[i] + j - 1];
                    } else {
                        screen[i][j] = wls[i][inds[i] + j - 1 - wheelsLength];
                    }
                } else {
                    screen[i][j] = wls[i][inds[i] + j - 1];
                }
            }
        }
        return screen;
    }

    function _createColumn(startArray, endArray) {
        var i = void 0;
        /* eslint-disable */
        var loader = preloader.getLoadResult();
        var spriteSheet = loader.getResult('elements');
        if (endArray) {
            var column = new createjs.SpriteContainer(spriteSheet);
            for (i = 0; i < longRowsNumber; i++) {
                if (i < rowsNumber) {
                    var elementNumber = endArray[i];
                    var element = new createjs.Sprite(spriteSheet, 'normal-' + elementNumber).set({
                        x: 96,
                        y: elementHeight * i + 90,
                        name: 'gameElement' + i,
                        regX: 96,
                        regY: 90
                    });
                    element.snapToPixel = true;
                    column.addChild(element);
                } else if (i >= longRowsNumber - rowsNumber) {
                    var _elementNumber = startArray[i - longRowsNumber + rowsNumber];
                    var _element = new createjs.Sprite(spriteSheet, 'normal-' + _elementNumber).set({
                        x: 96,
                        y: elementHeight * i + 90,
                        name: 'gameElement' + i,
                        regX: 96,
                        regY: 90
                    });
                    _element.snapToPixel = true;
                    column.addChild(_element);
                } else {
                    var _elementNumber2 = Math.ceil(Math.random() * 10);
                    var _element2 = new createjs.Sprite(spriteSheet, 'blur-' + _elementNumber2).set({
                        x: 96,
                        y: elementHeight * i + 90,
                        name: 'gameElement' + i,
                        regX: 96,
                        regY: 90
                    });
                    _element2.snapToPixel = true;
                    column.addChild(_element2);
                }
                column.set({
                    y: -elementHeight * (longRowsNumber - 4)
                });
            }
            return column;
        } else {
            var _column = new createjs.SpriteContainer(spriteSheet);
            for (i = 0; i < rowsNumber; i++) {
                var _elementNumber3 = startArray[i];
                var _element3 = new createjs.Sprite(spriteSheet, 'normal-' + _elementNumber3).set({
                    y: elementHeight * i
                });
                _column.addChild(_element3);
                _column.set({
                    y: -elementHeight
                });
            }
            return _column;
        }
        /* eslint-enable */
    }

    function _requestSpin() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            var coinsValue = balance.getBalanceData().coinsValue * 100; // КОСТЫЛЬ coinsValue должен быть адекватным (без точки)
            var betValue = balance.getBalanceData().betValue;
            $.ajax({
                url: serviceUrl + '_Roll/' + login.getSessionID() + '/' + betValue + '/' + coinsValue,
                /* eslint-enable */
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function _requestReady() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                /* eslint-disable */
                url: serviceUrl + '_Ready/' + login.getSessionID(),
                /* eslint-enable */
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function drawScreen(nextScreenData) {
        if (!gameContainer) {
            _initGameContainer(100, 52);
        } else {
            gameContainer.removeAllChildren();
        }
        var i = void 0;
        columns = []; // Обнулкние предыдущих колонок
        // nextScreenData = nextScreenData || nextScreen;
        /* eslint-disable */
        var loader = preloader.getLoadResult();

        if (!nextScreenData) {

            for (i = 0; i < columnsNumber; i++) {
                columns[i] = _createColumn(currentScreen[i], nextScreen[i]).set({
                    x: elementWidth * i,
                    name: 'gameColumn' + i
                });
                var shadow = new createjs.Bitmap(loader.getResult('gameShadow')).set({
                    x: (elementWidth + 2) * i,
                    y: 0,
                    alpha: 0,
                    name: 'gameShadow' + i
                });
                gameContainer.addChild(columns[i], shadow);
            }
            animateSpin();
        } else {

            for (i = 0; i < columnsNumber; i++) {
                columns[i] = _createColumn(nextScreenData[i]).set({
                    x: elementWidth * i
                });
                console.log(columns[i]);
                gameContainer.addChild(columns[i]);
            }
        }
        /* eslint-enable */
    }

    function animateSpin() {
        var i = void 0,
            time = 1000;
        /* eslint-disable */
        var gameStage = canvas.getStages().bgStage;
        for (i = 0; i < columns.length; i++) {
            time += 400;
            var shadow = gameStage.getChildByName('gameContainer').getChildByName('gameShadow' + i);
            createjs.Tween.get(columns[i]).to({ y: -elementHeight }, time, createjs.Ease.getBackInOut(0.5)).call(spinEnd.bind(null, i));
            createjs.Tween.get(shadow).to({ alpha: 1 }, time / 5, createjs.Ease.circIn).to({ alpha: 1 }, time * 3 / 5).to({ alpha: 0 }, time / 5);
            /* eslint-enable */
        }
    }

    function fastSpin() {
        console.log('I am Fast Spin! And I am called!');
        var i = void 0,
            time = 500;
        /* eslint-disable */
        if (!locked) {
            var gameStage = canvas.getStages().bgStage;
            for (i = 0; i < columns.length; i++) {
                var shadow = gameStage.getChildByName('gameContainer').getChildByName('gameShadow' + i);
                createjs.Tween.get(columns[i], { override: true }).to({ y: -elementHeight }, time, createjs.Ease.circOut).call(spinEnd.bind(null, i));
                createjs.Tween.get(shadow, { override: true }).to({ alpha: 0 }, time, createjs.Ease.circOut);
            }
        }
        locked = true;
        /* eslint-enable */
    }

    function spinStart() {
        var autoSpin = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        var freeSpin = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        autoSpinFlag = autoSpin;
        _requestSpin().then(function (data) {
            console.log('Spin data:', data);
            if (data.Type === 'Simple') {
                /* eslint-disable */
                events.trigger('spinStart', data); // КОСТЫЛЬ Временно убрать потом
                /* eslint-enable */
                mode = data.Mode;
                scoreCents = data.ScoreCents;
                scoreCoins = data.ScoreCoins;
                winCoins = data.TotalWinCoins;
                winCents = data.TotalWinCents;
                winLines = data.LinesResult;
                if (mode === 'fsBonus') {
                    fsLevel = data.Multiplier.MultiplierStep;
                    fsMulti = data.Multiplier.MultiplierValue;
                    fsCount = data.TotalFreeSpins;
                    console.warn('I am in fsBonus Mode', fsMulti, fsLevel);
                    var newFSObj = {
                        fsLevel: fsLevel,
                        fsMulti: fsMulti,
                        fsCount: fsCount
                    };
                    events.trigger('newFreeSpin', newFSObj);
                }
                if (typeof winLines[0] !== 'undefined') {
                    console.log('You win ' + winCoins + ' coins!');
                    var spinWinObject = {
                        winLines: winLines,
                        winCoins: winCoins,
                        winCents: winCents
                    };
                    /* eslint-disable */
                    events.trigger('spinWin', spinWinObject);
                    /* eslint-enable */
                } else {
                        console.log('You win nothing.');
                    }
                bonusLevelName = data.BonusResults[0];
                if (bonusLevelName === 'StagesSlotBonus') {
                    console.log('You are starting Bonus Level!');
                    /* eslint-disable */
                    bonusFlag = true;
                    /* eslint-enable */
                } else if (bonusLevelName === 'FreeSpinBonus') {
                        console.log('You are starting Free Spins!');
                        fsCount = data.FreeSpins;
                        fsLevel = data.Multiplier.MultiplierStep;
                        fsMulti = data.Multiplier.MultiplierValue;
                        freeSpinFlag = true;
                    }

                indexes = data.Indexes;
                if (freeSpin) {
                    nextScreen = _getScreenData(null, freeSpins.getWheels());
                } else {
                    nextScreen = _getScreenData();
                }
                drawScreen();
                currentScreen = nextScreen;
                inProgress = true;
                fastSpinTimer = setTimeout(function () {
                    fastSpinFlag = true;
                    console.log('You could do Fast Spin!');
                }, 750);
            } else if (data.Type === 'StagesSlotBonus') {
                bonusEnd = data.BonusEnd;
                if (bonusEnd) {
                    console.log('Bonus Level is finished!');
                    /* eslint-disable */
                    events.trigger('BonusEnd');
                    events.trigger('spinStart', data); // КОСТЫЛЬ Временно убрать потом
                    /* eslint-enable */
                }
                bonusValue = data.CurrentValue;
                bonusWinCents = data.CurrentWinCents;
                bonusWinCoins = data.CurrentWinCoins;
                bonusOldValues = data.OldValues;
                scoreCents = data.ScoreCents;
                scoreCoins = data.ScoreCoins;
            } else if (data.Type === 'MultiplierBonus') {
                console.error('It is MultiplierBonus');
                var multiData = {
                    coins: data.ValueCoins,
                    cents: data.ValueCents
                };
                events.trigger('multiplierBonus', multiData);
            } else if (data.ErrorCode !== 0) {
                console.error(data.ErrorMessage);
            }
        });
    }

    function spinEnd(i) {
        if (i === 4) {
            _requestReady().then(function (response) {
                console.log(response);
                if (response.ErrorCode === 0) {
                    inProgress = false;
                    fastSpinFlag = false;
                    if (winLines[0]) {
                        setTimeout(function () {
                            locked = false;
                        }, 300);
                    } else {
                        locked = false;
                    }
                    console.log('Spin is done!');
                    var winCash = (winCents / 100).toFixed(2);
                    var spinEndObject = {
                        autoSpinFlag: autoSpinFlag,
                        freeSpinFlag: freeSpinFlag,
                        winCash: winCash,
                        winCoins: winCoins,
                        scoreCoins: scoreCoins,
                        scoreCents: scoreCents,
                        fsCount: fsCount,
                        fsLevel: fsLevel,
                        fsMulti: fsMulti,
                        mode: mode
                    };
                    /* eslint-disable */
                    events.trigger('spinEnd', spinEndObject);
                    /* eslint-enable */
                    if (freeSpinFlag && mode !== 'fsBonus') {
                        setTimeout(function () {
                            console.log('Я словил Фри Спины!');
                            var fsDataObj = {
                                fsCount: fsCount,
                                fsLevel: fsLevel,
                                fsMulti: fsMulti
                            };
                            /* eslint-disable */
                            events.trigger('stopAutoplay', fsDataObj);
                            events.trigger('initFreeSpins', fsDataObj);
                            /* eslint-enable */
                        }, 500);
                    }
                    if (bonusFlag) {
                        events.trigger('initBonusLevel');
                        lines.removeWinScreen();
                        lines.removeWinLines();
                    }
                } else {
                    console.error(response.ErrorMessage);
                }
            });
        }
    }

    function getCurrentScreen() {
        if (typeof currentScreen !== 'undefined') {
            return currentScreen;
        } else {
            console.error('Current screen is not defined!');
        }
    }

    function getNextScreen() {
        if (typeof nextScreen !== 'undefined') {
            return nextScreen;
        } else {
            console.error('I do not know next screen!');
        }
    }

    function getSpinState() {
        return {
            inProgress: inProgress,
            fastSpinFlag: fastSpinFlag,
            locked: locked
        };
    }

    function getGamePosition() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            createjs.Ticker.on('tick', function (event) {
                /* eslint-enable */
                if (gameContainer) {
                    if (typeof gameContainer.x !== 'undefined') {
                        if (typeof gameContainer.y !== 'undefined') {
                            event.remove();
                            var result = {
                                x: gameContainer.x,
                                y: gameContainer.y
                            };
                            resolve(result);
                        }
                    }
                }
            });
        });
    }

    function logWinLines(lin) {
        console.log('Win Lines is: ' + lin);
    }

    function stopFreeSpins() {
        freeSpinFlag = false;
    }

    /* eslint-disable */
    events.on('dataDownloaded', initWheels);
    events.on('initScreen', drawScreen);
    events.on('stopFreeSpins', stopFreeSpins);
    events.on('spinWin', logWinLines);
    /* eslint-enable */

    return {
        spinStart: spinStart,
        spinEnd: spinEnd,
        fastSpin: fastSpin,
        getCurrentScreen: getCurrentScreen,
        getNextScreen: getNextScreen,
        getSpinState: getSpinState,
        getGamePosition: getGamePosition,
        _getScreenData: _getScreenData,
        drawScreen: drawScreen
    };
}();