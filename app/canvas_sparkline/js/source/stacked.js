/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    /*******************************************************************************
     * import
     ******************************************************************************/
    var SparkLine = require("source/sparkline");


    /*******************************************************************************
     * private variables
     ******************************************************************************/
    var canvas = document.getElementById("myCanvas"),
      ctx = canvas.getContext('2d');

    /***
     * @constructor
     */
    function Stacked(info) {
        this.generateRenderInfo = function () {
            var chartInfo = this.chartInfo,
              data = chartInfo.data,
              midY = canvas.height / 2;

            function _cb(obj, index) {
                // (2n+1)*marginX + n*barWidth
                var value = obj.value,
                  info = { value: value },
                  x, y;

                if (value != null) {
                    x = (2 * index + 1) * this.marginX + index * this.barWidth;
                    y = value < 0 ? midY : this.marginY;
                }

                info[ "x" ] = x;
                info[ "y" ] = y;

                // first, last 찾기
                if (index === 0) {
                    info[ "first" ] = "1";
                } else if (index === data.length - 1) {
                    info[ "last" ] = "1";
                }

                // high, low 찾기
                if (value === this.minY) {
                    info[ "low" ] = "1";
                } else if (value === this.maxY) {
                    info[ "high" ] = "1";
                }

                if (value < 0) {
                    info[ "negative" ] = "1";
                }

                this.renderInfoMap.infoList.push(info);
            }

            // 1. 좌표구하기
            data.forEach(_cb.bind(this));

            // renderInfoMap을 바탕으로 chart를 그림
            this.drawChart(midY - this.marginY);
        };

        this.drawChart = function (barHeight) {
            function _drawChart(obj) {
                var option = this.displayOption,
                  x = obj.x,
                  y = obj.y;

                if (x && y) {
                    ctx.save();
                    if (option.low && obj.low) {
                        ctx.fillStyle = this.colorMap[ "colorlow" ];
                    } else if (option.high && obj.high) {
                        ctx.fillStyle = this.colorMap[ "colorhigh" ];
                    } else if (option.first && obj.first) {
                        ctx.fillStyle = this.colorMap[ "colorfirst" ];
                    } else if (option.last && obj.last) {
                        ctx.fillStyle = this.colorMap[ "colorlast" ];
                    } else if (option.negative && obj.negative) {
                        ctx.fillStyle = this.colorMap[ "colornegative" ];
                    } else if (option.markers && obj.markers) {
                        ctx.fillStyle = this.colorMap[ "colormarkers" ];
                    } else {
                        ctx.fillStyle = this.colorMap[ "colorseries" ];
                    }

                    ctx.fillRect(x, y, this.barWidth, barHeight);
                    ctx.restore();
                }
            }

            this.renderInfoMap.infoList.forEach(_drawChart.bind(this));
        };

        SparkLine.call(this, info);
    }

    Stacked.prototype = Object.create(SparkLine.prototype);
    Stacked.prototype.constructor = Stacked;

    return Stacked;
});