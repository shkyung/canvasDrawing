/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    // import
    var $ = require("jquery"),
      LineChart = require("source/line"),
      ColumnChart = require("source/column"),
      StackedChart = require("source/stacked");

    //private variables
    var constructorMap = {
          line: LineChart,
          column: ColumnChart,
          stacked: StackedChart
      },
      $chartTypeSelection, $emptyOptionSelection, $displayOption, $spanOption, $markerOption, $valueStr, $btn;

    return {
        initialize: function () {
            $chartTypeSelection = $("#chartType");
            $emptyOptionSelection = $("#emptyOption");
            $displayOption = $("#displayOption");
            $spanOption = $emptyOptionSelection.children("[value=span]");
            $markerOption = $displayOption.children("[value=markers]");
            $valueStr = $("#valueStr");
            $btn = $("#generateChart");

            $chartTypeSelection.on("change", this.updateOptions);
            $btn.on("click", this.genearateChart);
        },

        updateOptions: function () {
            var chartType = $chartTypeSelection.val();

            if (chartType === "line") {
                $spanOption.attr("disabled", false);
                $markerOption.removeAttr("disabled");
            } else {
                $spanOption.attr("disabled", true);
                $markerOption.attr("disabled", "disabled");
            }
        },

        genearateChart: function () {
            var chartType = $chartTypeSelection.val(),
              valueStr = $("#valueStr").val(),
              emptyOption = $("#emptyOption").val();

            if (!emptyOption || !valueStr) {
                alert("invalid info to generate chart!");
                return;
            }

            console.error("genearateChart !!");

            new constructorMap[chartType](valueStr,emptyOption);
        }
    };
});
