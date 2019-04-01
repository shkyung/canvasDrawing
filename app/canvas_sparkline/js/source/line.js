/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    var SparkLine = require("source/sparkline");

    var canvas = document.getElementById("myCanvas"),
      ctx = canvas.getContext('2d');

    function _setDisplayOptColor(obj) {
    // low - high - first - last - negative - markers 순으로 우선순위
        var option = this.displayOption,
          x = obj.x,
          y = obj.y;

        function __drawMarkers(color) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.fillRect(x - 5, y - 5, 10, 10);
            ctx.restore();
        };

        if (x && y) {
            if (option.low && obj.low) {
                __drawMarkers(this.colorMap[ "colorlow" ]);
            } else if (option.high && obj.high) {
                __drawMarkers(this.colorMap[ "colorhigh" ]);
            } else if (option.first && obj.first) {
                __drawMarkers(this.colorMap[ "colorfirst" ]);
            } else if (option.last && obj.last) {
                __drawMarkers(this.colorMap[ "colorlast" ]);
            } else if (option.negative && obj.negative) {
                __drawMarkers(this.colorMap[ "colornegative" ]);
            } else if (option.markers) {
                __drawMarkers(this.colorMap[ "colormarkers" ]);
            }
        }
    }

    /***
     * @constructor
     */
    function Line(info) {
        this.generateRenderInfo = function () {
            var chartInfo = this.chartInfo,
              data = chartInfo.data;

            function _cb(obj, index) {
                // (2n+1)*marginX + n*barWidth
                var value = obj.value,
                  info = { value: value },
                  x, y;

                if (value != null) {
                    x = (2 * index + 1) * this.marginX + index * this.barWidth + this.barWidth / 2;
                    y = (this.maxY - value) * this.unitY + this.marginY;
                } else if (!this.emptyOption) {
                    // null이고 "0으로처리" 옵션
                    x = (2 * index + 1) * this.marginX + index * this.barWidth + this.barWidth / 2;
                    y = this.maxY * this.unitY + this.marginY;
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
            };
            // 1. 좌표구하기
            data.forEach(_cb.bind(this));

            console.error("this.renderInfoMap.infoList : ", this.renderInfoMap.infoList);

            // renderInfoMap을 바탕으로 chart를 그림
            this.drawChart();
        };

        this.drawLines = function (index) {
            var startIndex = index,
              infoList = this.renderInfoMap.infoList,
              curLocation, x, y;

            if (index > infoList.length - 1) {
                return;
            }

            curLocation = infoList[ startIndex ];
            x = curLocation.x;
            y = curLocation.y;

            if (y != null) {
                ctx.moveTo(x, y);

                for (++startIndex; startIndex < infoList.length; startIndex++) {
                    var nextData = infoList[ startIndex ];

                    if (nextData.y != null) {
                        ctx.lineTo(nextData.x, nextData.y);
                    } else {
                        this.drawLines(startIndex);
                        break;
                    }
                }
            } else {
                this.drawLines(++startIndex);
            }
        };

        this.drawMarkers = function () {
            this.renderInfoMap.infoList.forEach(_setDisplayOptColor.bind(this));
        };

        this.drawChart = function () {
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.strokeStyle = this.colorMap[ "colorseries" ];
            this.drawLines(0);
            ctx.stroke();

            this.drawMarkers();
        };

        SparkLine.call(this, info);
    }

    Line.prototype = Object.create(SparkLine.prototype);
    Line.prototype.constructor = Line;

    return Line;
});