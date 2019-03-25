/***
 * @author shkyung
 */
define(function (require) {
    "use strict";

    // import
    var $ = require("jquery"),
      SparkLine = require("source/sparkline");


    //private variables
    var $spanOption, $chartTypeSelection, $emptyOptionSelection;

    return {
        initialize: function () {
            $chartTypeSelection = $("#chartType");
            $emptyOptionSelection = $("#emptyOption");
            $spanOption = $emptyOptionSelection.children("[value=span]");

            $("#chartType").on("change", this.updateSpanOption);
        },

        updateSpanOption: function() {
            var chartType = $chartTypeSelection.val();

            if (chartType === "line") {
                $spanOption.attr("disabled", false);
            } else {
                $spanOption.attr("disabled", true);
            }
        }
    };
});
