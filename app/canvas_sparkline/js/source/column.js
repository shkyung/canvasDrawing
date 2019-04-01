/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    /*******************************************************************************
     * Import
     ******************************************************************************/
    var SparkLine = require("source/sparkline");

    var canvas = document.getElementById("myCanvas"),
      ctx = canvas.getContext('2d');

    /***
     * @constructor
     */
    function Column(info) {
        this.generateRenderInfo = function () {
            var chartInfo = this.chartInfo,
              data = chartInfo.data;

            function _cb(obj, index) {
                // (2n+1)*marginX + n*barWidth
                var value = obj.value,
                  info = { value: value },
                  x, y;

                if (value != null) {
                    x = (2 * index + 1) * this.marginX + index * this.barWidth;
                    y = (this.maxY - value) * this.unitY + this.marginY;
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

            // 1. 좌표 및 컬러정보 구하기
            data.forEach(_cb.bind(this));

            // renderInfoMap을 바탕으로 chart를 그림
            this.drawChart();
        };

        this.drawChart = function () {
            var baseLineY;

            function _drawChart(obj) {
                var option = this.displayOption,
                  x = obj.x,
                  y = obj.y,
                  barHeight = (obj.value - baseLineY) * this.unitY || 1;

                ctx.fillRect(x, y, this.barWidth, barHeight);

                if (x && y) {
                    if (option.low && obj.low) {
                        this.colorMap[ "colorlow" ];
                    } else if (option.high && obj.high) {
                        this.colorMap[ "colorhigh" ];
                    } else if (option.first && obj.first) {
                        this.colorMap[ "colorfirst" ];
                    } else if (option.last && obj.last) {
                        this.colorMap[ "colorlast" ];
                    } else if (option.negative && obj.negative) {
                        this.colorMap[ "colornegative" ];
                    } else if (option.markers) {
                        this.colorMap[ "colormarkers" ];
                    }
                }
            }

            ctx.save();
            ctx.fillStyle = this.colorMap[ "colorseries" ];

            if (this.maxY > 0 && this.minY > 0) {
                baseLineY = this.minY;
            } else if (this.maxY > 0 && this.minY < 0) {
                baseLineY = 0;
            } else {
                baseLineY = -this.minY;
            }

            this.renderInfoMap.infoList.forEach(_drawChart.bind(this));

            ctx.restore();
        };

        SparkLine.call(this, info);
    }

    Column.prototype = Object.create(SparkLine.prototype);
    Column.prototype.constructor = Column;

    return Column;
});