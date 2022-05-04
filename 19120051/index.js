document.addEventListener('DOMContentLoaded', function () {
    var v = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas')
    var backcontext = back.getContext('2d');

    var cw, ch;

    v.addEventListener('play', function () {
        cw = v.clientWidth;
        ch = v.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;
        draw(v, context, backcontext, cw, ch);
    }, false);

}, false);

function draw(v, c, bc, cw, ch) {
    if (v.paused || v.ended) return false;
    // bước 1, vẽ vào canvas
    bc.drawImage(v, 0, 0, cw, ch);
    // lấy dữ liệu pixel trong canvas
    var idata = bc.getImageData(0, 0, cw, ch);
    var data = idata.data;
    var w = idata.width;
    var limit = data.length
    var temp = 200;
    //tạo ảnh grayscale 
    for (var i = 0; i < limit; i+=4) {
        temp = data[i]+data[i+1] + data[i+2];
        temp/=3;
        data[i]=temp;
        data[i+1]=temp;
        data[i+2]=temp;
    }
    // Lặp qua từng pixel và lấy gradient
    for (var i = 0; i < limit; i++) {
        if (i % 4 == 3) continue;
        temp = 127 + 2 * data[i] - data[i + w * 4] - data[i + 4];
        // lấy ngưỡng 140
        if (temp<140)
            data[i] = 0;
        else data[i]=255 ;
    }
    // Vẽ lên lại
    c.putImageData(idata, 0, 0);
    // Start over!
    setTimeout(draw, 20, v, c, bc, cw, ch);
}
