/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    /*******************************************************************************
     * Import
     ******************************************************************************/
    var SparkLine = require("source/sparkline");

    /***
     * @constructor
     */
    function Column(attr) {
        this.setAttribute(attr);
    }

    Column.prototype = {
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

    return Column;
});