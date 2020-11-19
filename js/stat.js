'use srtict';
window.renderStatistics = function (ctx, names, times) {
    var statisticsCloud = {
        _cloudWidth: 420,
        _cloudHeight: 270,
        startX: 100,
        startY: 10,
        _lengthShadow: 10,
        _cloudPaddingTop: 35,
        _cloudPadding: 57,

        cloudColor: ['rgba(0, 0, 0, 0.7)', 'rgb(256, 256, 256)'],
        cloudText: ['Ура вы победили!', 'Список результатов: '],

        renderCloud: function (shadow) {
            width = this._cloudWidth;
            heigth = this._cloudHeight;
            x = this.startX;
            y = this.startY;
            color = this.cloudColor[1];
            if (shadow) {
                x = this.startX + this._lengthShadow;
                y = this.startY + this._lengthShadow;
                color = this.cloudColor[0];
            }
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
        },
        writeCloudText: function () {
            ctx.fillStyle = '#000';
            ctx.font = '16px PT Mono';

            for (var i = 0; i < this.cloudText.length; i++) {
                ctx.fillText(this.cloudText[i], this.startX + this._cloudPadding, this.startY  + this._cloudPaddingTop + i * this._cloudPaddingTop/2);
            }
        }
    };
    statisticsCloud.renderCloud(true);
    statisticsCloud.renderCloud(false);
    statisticsCloud.writeCloudText();

    var statisticsHistogram = {
        _barWidth: 40,
        _barMaxHeight: 150,
        _barMargin: 50,
        _histogramPaddingTop: 60,
        _histogramTextHeight: 16,
        _histogramTextPadding: 5,
        tartX: 0,
        startY: 260,

        getMaxTime: function(arrayTimes) {
            var maxElement = arrayTimes[0];
            for (var i = 0; i < arrayTimes.length; i++) {
                if (arrayTimes[i] > maxElement) {
                    maxElement = arrayTimes[i];
                }
            }
            return maxElement;
        },

        fillBarColor: function (namePlayer) {
            var randomOpacity = Math.random().toFixed(2);
            if (namePlayer === 'Вы') {
                ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            } else {
                ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';
            }
        },

        drawHistogram: function (arrayTimes, arrayNames) {
            var maxTime = this.getMaxTime(times);
            console.log(this.startCoord);
            for (var i = 0; i < arrayNames.length; i++) {
                ctx.fillStyle = this.fillBarColor(arrayNames[i]);
                ctx.fillRect(this.startX +(this._barWidth + this._barMargin)*i, this.startY - this._histogramTextHeight - this._barMaxHeight * arrayTimes[i]/maxTime, this._barWidth, this._barMaxHeight * arrayTimes[i]/maxTime);
                ctx.fillStyle = '#000';
                ctx.fillText(arrayNames[i], this.startX +(this._barWidth + this._barMargin)*i, this.startY);
                ctx.fillText(Math.round(arrayTimes[i]), this.startX +(this._barWidth + this._barMargin)*i, this.startY - this._histogramTextHeight - this._histogramTextPadding - this._barMaxHeight * arrayTimes[i]/maxTime);
            }
        }

    };
    statisticsHistogram.startX = statisticsCloud.startX + statisticsCloud._cloudPadding;
    statisticsHistogram.startY = statisticsCloud.startY + statisticsHistogram._barMaxHeight + statisticsHistogram._histogramPaddingTop + statisticsHistogram._histogramTextHeight*2;
    statisticsHistogram.drawHistogram(times, names);
};
