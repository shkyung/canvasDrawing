/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    // import
    var $ = require("jquery"),
      SparkLine = require("source/sparkline");


    //private variables
    var $spanOption, $chartTypeSelection, $emptyOptionSelection, $valueStr, $btn;

    return {
        initialize: function () {
            $chartTypeSelection = $("#chartType");
            $emptyOptionSelection = $("#emptyOption");
            $spanOption = $emptyOptionSelection.children("[value=span]");
            $valueStr = $("#valueStr");
            $btn = $("#generateChart");


            $("#chartType").on("change", this.updateSpanOption);

            $btn.on("click", this.genearateChart);
        },

        updateSpanOption: function() {
            var chartType = $chartTypeSelection.val();

            if (chartType === "line") {
                $spanOption.attr("disabled", false);
            } else {
                $spanOption.attr("disabled", true);
            }
        },

        genearateChart: function () {
            var valueStr = $("#valueStr").val();

            if(!$("#emptyOption").val() || !valueStr) {
                alert("invalid info to generate chart!");
                return;
            }

            console.error("genearateChart !!");

        }
    };
});
