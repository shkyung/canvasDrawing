/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    var SparkLine = require("source/sparkline");

    /***
     * @constructor
     */
    function Line(info) {
        SparkLine.call(this, info);
    }

    Line.prototype = Object.create(SparkLine.prototype);
    Line.prototype.constructor = Line;
    //
    // Line.prototype.generateRenderInfo = function () {
    //     var chartInfo = this.chartInfo,
    //       data = chartInfo.data;
    //
    //     function _cb(obj, index) {
    //         // (2n+1)*marginX + n*barWidth
    //         var value = obj.value,
    //           info = { value: value },
    //           x, y;
    //
    //         if (value != null) {
    //             x = (2 * index + 1) * this.marginX + index * this.barWidth + this.barWidth / 2;
    //             y = (this.maxY - value) * this.unitY + marginY;
    //         } else if (!this.emptyOption) {
    //             // null이고 "0으로처리" 옵션
    //             x = (2 * index + 1) * this.marginX + index * this.barWidth + this.barWidth / 2;
    //             y = this.maxY * this.unitY + marginY;
    //         }
    //
    //         info[ "x" ] = x;
    //         info[ "y" ] = y;
    //
    //         // first, last 찾기
    //         if (index === 0) {
    //             info[ "first" ] = "1";
    //         } else if (index === data.length - 1) {
    //             info[ "last" ] = "1";
    //         }
    //
    //         // high, low 찾기
    //         if (value === this.minY) {
    //             info[ "low" ] = "1";
    //         } else if (value === this.maxY) {
    //             info[ "high" ] = "1";
    //         }
    //
    //         if (value < 0) {
    //             info[ "negative" ] = "1";
    //         }
    //
    //         this.renderInfoMap.infoList.push(info);
    //     };
    //     // 1. 좌표구하기
    //     data.forEach(_cb.bind(this));
    //
    //     console.error("this.renderInfoMap.infoList : ", this.renderInfoMap.infoList);
    //
    //     // renderInfoMap을 바탕으로 chart를 그림
    //     this.drawChart();
    // };
    //
    // Line.prototype.drawLines = function (index) {
    //     var startIndex = index,
    //       infoList = this.renderInfoMap.infoList,
    //       curLocation, x, y;
    //
    //     if (index > infoList.length - 1) {
    //         return;
    //     }
    //
    //     curLocation = infoList[ startIndex ];
    //     x = curLocation.x;
    //     y = curLocation.y;
    //
    //     if (y != null) {
    //         ctx.moveTo(x, y);
    //
    //         for (++startIndex; startIndex < infoList.length; startIndex++) {
    //             var nextData = infoList[ startIndex ];
    //
    //             if (nextData.y != null) {
    //                 ctx.lineTo(nextData.x, nextData.y);
    //             } else {
    //                 this.drawLines(startIndex);
    //                 break;
    //             }
    //         }
    //     } else {
    //         this.drawLines(++startIndex);
    //     }
    // };
    //
    // Line.prototype.drawMarkers = function () {
    //     this.renderInfoMap.infoList.forEach(_setDisplayOptColor.bind(this));
    // };
    //
    // Line.prototype.drawChart = function () {
    //     ctx.lineWidth = 5;
    //     ctx.beginPath();
    //     this.drawLines(0);
    //     ctx.stroke();
    //
    //     this.drawMarkers();
    // };

    return Line;
});