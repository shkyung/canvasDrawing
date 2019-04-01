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
      $chartTypeSelection, $emptyOptionSelection, $displayOption, $spanOption, $markerOption, $valueStr, $btn,
      $markerColor;

    return {
        initialize: function () {
            $chartTypeSelection = $("#chartType");
            $emptyOptionSelection = $("#emptyOption");
            $displayOption = $("#displayOption");
            $spanOption = $emptyOptionSelection.children("[value=span]");
            $markerOption = $displayOption.children("[value=markers]");
            $valueStr = $("#valueStr");
            $btn = $("#generateChart");
            $markerColor = $(".colorMarkers");

            $chartTypeSelection.on("change", this.updateOptions);
            $btn.on("click", this.genearateChart.bind(this));
        },

        updateOptions: function () {
            var chartType = $chartTypeSelection.val();

            if (chartType === "line") {
                $spanOption.attr("disabled", false);
                $markerOption.removeAttr("disabled");
                $markerColor.attr("disabled", false);
            } else {
                $spanOption.attr("disabled", true);
                $markerOption.attr("disabled", "disabled");
                $markerColor.attr("disabled", true);
            }
        },

        generateChartInfo: function () {
            var chartType = $chartTypeSelection.val(),
              valueStr = $("#valueStr").val(),
              emptyOption = $("#emptyOption").val(),
              data = [],
              displayOptionObj = {},
              colorInfoObj = {},
              attr = {};

            if (!emptyOption || !valueStr) {
                alert("invalid info to generate chart!");
                return;
            }

            valueStr.split(",").forEach(function(value) {
                data.push({value: +value});
            });

            $("#displayOption input[type=checkbox]:checked").each(function() {
                var option = $(this).val();

                displayOptionObj[option] = 1;
            });

            colorInfoObj["colorseries"] = $(".colorSeries").val();
            colorInfoObj["colorfirst"] = $(".colorFirst").val();
            colorInfoObj["colorlast"] = $(".colorLast").val();
            colorInfoObj["colorhigh"] = $(".colorHigh").val();
            colorInfoObj["colorlow"] = $(".colorLow").val();
            colorInfoObj["colornegative"] = $(".colorNegative").val();
            colorInfoObj["colormarkers"] = $(".colorMarkers").val();

            attr["type"] = chartType;
            attr["displayEmptyCellAs"] = emptyOption;
            attr["displayOption"] = displayOptionObj;
            attr["displayOption"]["color"] = colorInfoObj;
            attr["data"] = data;

            return attr;
        },

        genearateChart: function () {
           var chartInfo = this.generateChartInfo();

            if (chartInfo) {
                new constructorMap[chartInfo.type](chartInfo);
            }
        }
    };
});
