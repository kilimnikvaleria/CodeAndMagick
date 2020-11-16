'use srtict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var renderCloud = function(ctx, x, y, width, heigth, color) {
    ctx.fillStyle = color;
    var offset = 10;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + offset, y + heigth / 2);
    ctx.lineTo(x, y + heigth);
    ctx.lineTo(x + width / 2, y + heigth - offset);
    ctx.lineTo(x + width, y + heigth);
    ctx.lineTo(x + width - offset, y + heigth / 2);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width / 2, y + offset);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
};

window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT,'#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText ('Ура вы победили!', 150, 50);
    ctx.fillText ('Список результатов:', 150, 70);
};