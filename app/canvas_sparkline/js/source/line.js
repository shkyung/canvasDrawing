/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    var SparkLine = require("source/sparkline");

    /***
     * @constructor
     */
    function Line(attr) {
        SparkLine.call(this, info);
    }

    Line.prototype = Object.create(SparkLine.prototype);
    Line.prototype.constructor = Line;

    return Line;
});