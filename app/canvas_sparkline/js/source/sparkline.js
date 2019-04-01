/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    /**
    * private function, variable
    */
    var canvas = document.getElementById("myCanvas"),
      ctx = canvas.getContext('2d'),
      // canvas의 margin 값
      marginY = 5;

    function _getMinMaxY(data, emptyOption) {
        var minY = data[ 0 ].value,
          maxY = data[ 0 ].value,
          hasEmptyValue = false;

        function __cb(obj) {
            var value = obj.value;

            if (value) {
                if (value > maxY) {
                    maxY = value;
                }
                if (value < minY) {
                    minY = value;
                }
            } else {
                hasEmptyValue = true;
            }
        }

        data.forEach(__cb);

        if (hasEmptyValue && !emptyOption && minY > 0) {
            // 빈값이 있고 빈셀옵션값이 "0으로 처리이며"(undefined) 현재 최소값이 0보다 크다면 y축 최소값 0 설정
            minY = 0;
        }

        return {
            minY: minY,
            maxY: maxY
        };
    }

    function _getWidthInfo(canvasWidth, dataNum) {
        // TODO: 임의의 비율을 지정해 사용하기로 함 1 : 5 = margin : bar width
        return canvasWidth / dataNum / 7;
    }

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
    function SparkLine(attr) {
        this.setAttribute(attr);
    }

    SparkLine.prototype = {
        setAttribute: function (attr) {
            var ret;

            this.chartInfo = attr;
            // 1. 빈셀 옵션값 확인
            this.emptyOption = this.chartInfo.displayEmptyCellAs;

            // 2. x축(가로축) 최소값, 최대값 셋팅
            this.minX = 0;
            this.maxX = this.chartInfo.data.length;

            // 3. y축(세로축) 최소값, 최대값 셋팅
            ret = _getMinMaxY(this.chartInfo.data, this.emptyOption);
            this.minY = ret.minY;
            this.maxY = ret.maxY;

            // 4. 2,3을 토대로 단위(unit)를 구함.
            this.marginX = _getWidthInfo(canvas.width, this.maxX);
            this.marginY = marginY;
            this.barWidth = 5 * this.marginX;

            this.unitX = this.barWidth + this.marginX;
            this.unitY = (canvas.height - 2 * marginY) / (this.maxY - this.minY);

            this.renderInfoMap = {
                infoList: []
            };

            this.displayOption = this.chartInfo.displayOption;
            this.colorMap = this.displayOption.color;

            // 각각의 차트에 따라 renderInfo 생성
            this.generateRenderInfo();
        }
    };

    return SparkLine;
});
