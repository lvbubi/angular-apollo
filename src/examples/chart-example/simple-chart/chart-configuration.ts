import {Configuration, InputFormat} from "chart-adapter";
import {LegendPosition, ScaleType} from "@swimlane/ngx-charts";

export const configuration: Configuration = {
  chartType: "bar-vertical",
  chartOptions: {
    "animations": true,
    "schemeType": ScaleType.Ordinal,
    "showXAxis": true,
    "showYAxis": true,
    "gradient": false,
    "barPadding": 8,
    "noBarWhenZero": true,
    "showLegend": true,
    "legendTitle": "Legend",
    "legendPosition": LegendPosition.Right,
    "showXAxisLabel": true,
    "xAxisLabel": "Country",
    "showYAxisLabel": true,
    "yAxisLabel": "GDP Per Capita",
    "showGridLines": true,
    "roundDomains": false,
    "tooltipDisabled": false,
    "roundEdges": true,
    "showDataLabel": false,
    "trimXAxisTicks": true,
    "trimYAxisTicks": true,
    "rotateXAxisTicks": true,
    "maxXAxisTickLength": 16,
    "maxYAxisTickLength": 16
  },
  view: [
    700,
    300
  ],
  dataMapper: {
    "[].name": "[].name",
    "[].value": "[].value",
    "[].extra": "[].extra"
  },
  inputFormat: InputFormat.singleSeries
}
