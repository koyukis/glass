    const canvas = document.querySelector('#cvs1');
    var canvasWidth = 1000;
    var canvasHeight = 750;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext('2d');
    // context.fillRect(0,0,canvas.width,canvas.height);
    var img = new Image();
        img.src = 'images/polar.png';
        img.onload = function() {
        context.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
    }
            // https://github.com/tsuyopon-xyz/drawing_app_part1/blob/master/main.js
            // 上記のコードを元に以下の追加機能を追加します。
            // - 線の色を変更する機能
            // - 消しゴム機能
            //
            // 元々書かれてた説明のコメントは削除しました。理由は次のとおりです。
            // - 今回の変更差分の説明コメントのみにすることで、どの部分で変更があったかわかりやすくするため
            window.addEventListener('load', () => {
                const canvas = document.querySelector('#canvas');
                var canvasWidth = 1000;
                var canvasHeight = 750;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                const context = canvas.getContext('2d');
                // var img = new Image();
                // img.src = 'images/polar.jpg';
                // img.onload = function() {
                // context.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
                // }
                const lastPosition = { x: null, y: null };
                let isDrag = false;
    
                // 現在の線の色を保持する変数(デフォルトは黒(#000000)とする)
                let currentColor = '#000000';
    
                function draw(x, y) {
                    if(!isDrag) {
                    return;
                    }
                    context.lineCap = 'round';
                    context.lineJoin = 'round';
                    context.lineWidth = 5;
                    context.strokeStyle = currentColor;
                    if (lastPosition.x === null || lastPosition.y === null) {
                    context.moveTo(x, y);
                    } else {
                    context.moveTo(lastPosition.x, lastPosition.y);
                    }
                    context.lineTo(x, y);
                    context.stroke();
    
                    lastPosition.x = x;
                    lastPosition.y = y;
                }
    
                function clear() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }
    
                function dragStart(event) {
                    context.beginPath();
    
                    isDrag = true;
                }
    
                function dragEnd(event) {
                    context.closePath();
                    isDrag = false;
                    lastPosition.x = null;
                    lastPosition.y = null;
                }
    
                function initEventHandler() {
                    const clearButton = document.querySelector('#clear-button');
                    clearButton.addEventListener('click', clear);
    
                    // 消しゴムモードを選択したときの挙動
                    // const eraserButton = document.querySelector('#eraser-button');
                    // eraserButton.addEventListener('click', () => {
                    // 消しゴムと同等の機能を実装したい場合は現在選択している線の色を
                    // 白(#FFFFFF)に変更するだけでよい
                    // currentColor = '#FFFFFF';
                    // });
    
                    canvas.addEventListener('mousedown', dragStart);
                    canvas.addEventListener('mouseup', dragEnd);
                    canvas.addEventListener('mouseout', dragEnd);
                    canvas.addEventListener('mousemove', (event) => {
                    draw(event.layerX, event.layerY);
                    });
                }
    
                // カラーパレットの設置を行う
                function initColorPalette() {
                    const joe = colorjoe.rgb('color-palette', currentColor);
    
                    // 'done'イベントは、カラーパレットから色を選択した時に呼ばれるイベント
                    // ドキュメント: https://github.com/bebraw/colorjoe#event-handling
                    joe.on('done', color => {
                    // コールバック関数の引数からcolorオブジェクトを受け取り、
                    // このcolorオブジェクト経由で選択した色情報を取得する
    
                    // color.hex()を実行すると '#FF0000' のような形式で色情報を16進数の形式で受け取れる
                    // draw関数の手前で定義されている、線の色を保持する変数に代入して色情報を変更する
                    currentColor = color.hex();
                    });
                }
    
                initEventHandler();
    
                // カラーパレット情報を初期化する
                initColorPalette();
                });


                var numLayers = $('#demo3').children('canvas').length,
    aryCvs = [];
 
$('[name=mode][value=' + numLayers + ']').prop('checked', true);
 
for (var i = 1; i <= numLayers; i++) {
  //各レイヤーの初期化とid付加
  aryCvs[i - 1] = new fabric.Canvas('cvs' + i);
  $('#cvs' + i).parent('div.canvas-container').attr('id', 'layer' + i);
 
  //各レイヤーに要素生成
  aryCvs[i - 1].add(new fabric.Text(
    i + '', {
    fontFamily: 'Meyrio',
    fontSize: 72,
    fill: 'blue',
    textBackgroundColor: 'lightblue',
    left: 80 * i - 20,
    top: 50 * i - 20
  }));
}
 
//----- レイヤー切替 -----
$('[name=mode]').click(function(){
  //現在＝最後のレイヤー番号取得
  var n = $('#demo3').children('div.canvas-container').last().attr('id').slice(-1);
 
  //現在のレイヤーの選択枠解除
  aryCvs[n - 1].discardActiveObject().renderAll();
 
  //選択レイヤーを最後に移動
  $('#demo3').append($('#layer' + $('[name=mode]:checked').val()));
});


// import interact from 'interactjs'

// class InteractCanvas {
//   constructor(){
//     this.file        = document.getElementById('file');

//     //リサイズフラグ
//     this.resizeFlag  = true;
//     this.resizeTimer = null;

//     this.createCanvasContext();
//     this.bind();
//   }

//   //イベントはここにまとめる
//   bind(){
//     //ファイルアップロードを検知
//     this.file.addEventListener('change', (e) => {
//       this.loadImage(e);
//     }, false);

//     //描画した画像のマウスオン処理
//     this.canvas.addEventListener('mousemove', (e) => {
//       this.addDraggableCursor(e);
//     }, false);

//     //画面リサイズ
//     window.addEventListener( 'resize', () => {
//       if(this.resizeFlag){
//         this.resizeFlag = false;
//         if(this.resizeTimer){
//           window.cancelAnimationFrame(this.resizeTimer);
//         }
//         this.resizeTimer = window.requestAnimationFrame(() => {
//           //ここにリサイズ時の処理を書く
//           this.drawResizeImage();
//           this.resizeFlag = true;
//         });
//       }
//     }, false );

//   }

//   //canvasの描画機能を有効化
//   createCanvasContext() {
//     this.canvas = document.getElementById('draw-area');
//     this.canvas.width  = this.canvas.clientWidth * window.devicePixelRatio;
//     this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio;
//     this.ctx           = this.canvas.getContext('2d');
//     this.isDrawed      = false;
//   }

//   //画像を読み込む
//   loadImage(e) {
//     if(!e.target.files[0]){
//       return;
//     }
//     const file = e.target.files[0];
//     //画像以外のファイルは無効
//     if(!file.type.match("image.*")){
//       alert('画像をアップロードしてください');
//       return;
//     }
//     //FileオブジェクトからURLを生成
//     const urlObj = window.URL || window.webkitURL;
//     const url     = urlObj.createObjectURL(file);
//     //canvasに描画
//     this.drawCanvas(url);
//   }

//   /*
//   * canvasに描画する
//   * @param {String} 画像url
//   */
//   drawCanvas(url) {
//     if(!url){
//       return;
//     }
//     this.img        = new Image();
//     this.img.src    = url;
//     this.img.onload = () => {
//       //画像をcanvasの中心に描画
//       this.drawImageCenter();
//       //interact.jsを適用
//       this.applyInteractJs();
//     }
//   }

//   //canvasの中心に描画する
//   drawImageCenter(){
//     //幅・高さの上限
//     const limit = 0.8;
//     const maxW  = this.canvas.width * limit;
//     const maxH  = this.canvas.height * limit;

//     //描画する画像の幅もしくは高さが上限を超える場合
//     if(
//       this.img.width >= maxW ||
//       this.img.height >= maxW
//       )
//     {
//       //高さの上限に合わせる
//       this.drawHeight = maxH;
//       this.drawWidth  = this.drawHeight * (this.img.width / this.img.height);
//       //はみ出す場合は幅の上限に合わせる
//       if(this.drawWidth >= maxW){
//         this.drawWidth  = maxW;
//         this.drawHeight = this.drawWidth * (this.img.height / this.img.width);
//       }
//     }
//     //それ以外はそのままのサイズで表示
//     else {
//       this.drawWidth  = this.img.width;
//       this.drawHeight = this.img.height;
//     }

//     //位置をcanvasの中心にする
//     this.position = {
//       x : this.canvas.width / 2 - this.drawWidth / 2,
//       y : this.canvas.height / 2 - this.drawHeight / 2
//     };

//     //canvasをクリア
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//     this.ctx.drawImage(
//       this.img,
//       this.position.x,
//       this.position.y,
//       this.drawWidth,
//       this.drawHeight
//       );
//     this.isDrawed = true;
//   }

//   //interact.jsを適用
//   applyInteractJs(){
//     this.cursor   = null;
//     this.html     = document.documentElement;
//     this.addDraggingEvent();
//   }

//   //ドラッグイベントを適用
//   addDraggingEvent(){
//     if(this.interact){
//       this.interact.unset();
//       this.interact = null;
//     }
//     this.interact = interact('#draw-area')
//     .draggable({
//       inertia     : true,
//       onstart     : (e) => {
//         this.dragStartListener(e);
//       },
//       onmove      : (e) => {
//         this.dragMoveListener(e);
//       },
//       onend       : (e) => {
//         this.dragEndListener(e);
//       },
//       cursorChecker: (action, interactable, element, interacting) => {
//         if(this.cursor){
//           return interacting ? 'grabbing' : this.cursor;
//         }
//         else {
//           return interacting ? 'grabbing' : null;
//         }
//       }
//     });
//   }

//   /*
//   * dragstartイベントを取得
//   * @param {Object} e
//   */
//   dragStartListener(e) {
//     this.isDrag = false;

//     //画像のフォーカス判定
//     const isFocusImageOnCanvas = this.isFocusImageOnCanvas(e);
//     if(isFocusImageOnCanvas){
//       //ドラッグ中フラグを立てる
//       this.isDrag = true;
//     }
//   }

//   /*
//   * dragmoveイベントを取得
//   * @param {Object} e
//   */
//   dragMoveListener(e){

//     if(!this.isDrag){
//       if(this.html.classList.contains('is-dragging')){
//         this.html.classList.remove('is-dragging');
//       }
//       return;
//     }
//     if(!this.html.classList.contains('is-dragging')){
//       this.html.classList.add('is-dragging');
//     }

//     //位置情報を計算
//     this.position.x = this.position.x + (e.dx * window.devicePixelRatio);
//     this.position.y = this.position.y + (e.dy * window.devicePixelRatio);

//     //canvasをクリア
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     //移動した値で描画
//     this.ctx.drawImage(
//       this.img,
//       this.position.x,
//       this.position.y,
//       this.drawWidth,
//       this.drawHeight
//       );
//   }

//   /*
//   * dragendイベントを取得
//   * @param {Object} e
//   */
//   dragEndListener(e){
//     if(this.html.classList.contains('is-dragging')){
//       this.html.classList.remove('is-dragging');
//     }
//   }

//   /*
//   * ドラッグ時のカーソルを調整
//   * @param {Object} e マウスオンイベント
//   */
//   addDraggableCursor(e){
//     //すでに描画されている場合のみ
//     if(!this.isDrawed){
//       return;
//     }
//     //画像のフォーカス判定
//     const isFocusImageOnCanvas = this.isFocusImageOnCanvas(e);
//     if(isFocusImageOnCanvas){
//       this.cursor = 'grab';
//     }
//     else {
//       this.cursor = null;
//     }
//   }

//   //canvas上で画像をフォーカスしているかどうか
//   isFocusImageOnCanvas(e){
//     const x = e.clientX * window.devicePixelRatio;
//     const y = e.clientY * window.devicePixelRatio;

//     return (
//       x >= this.position.x &&
//       x <= this.position.x + this.drawWidth &&
//       y >= this.position.y &&
//       y <= this.position.y + this.drawHeight
//       );
//   }

//   //リサイズ時に再描画する
//   drawResizeImage(){
//     //すでに描画されている場合のみ
//     if(!this.isDrawed){
//       return;
//     }
//     //canvasを再取得
//     this.createCanvasContext();
//     //描画
//     this.drawImageCenter();
//     //interact.js再設定
//     this.applyInteractJs();
//   }
// }
// new InteractCanvas();
