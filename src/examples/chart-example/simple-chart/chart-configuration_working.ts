import { Configuration } from "chart-adapter";

export const configuration: Configuration = {
  view: [700, 500],
  chartType: "bar-vertical",
  dataMapper: {
    "[].name": "[].name",
    "[].value": "[].value",
    "[].extra": "[].extra"
  },
  chartOptions: {
    "animations": false,
    "colorScheme": {
      "name": "cool",
      "selectable": true,
      "group": "ordinal",
      "domain": [
        "#a8385d",
        "#7aa3e5",
        "#a27ea8",
        "#aae3f5",
        "#adcded",
        "#a95963",
        "#8796c0",
        "#7ed3ed",
        "#50abcc",
        "#ad6886"
      ]
    },
    "schemeType": "ordinal",
    "showXAxis": false,
    "showYAxis": false,
    "gradient": false,
    "barPadding": 8,
    "noBarWhenZero": false,
    "showLegend": true,
    "legendTitle": "Legend",
    "legendPosition": "top",
    "showXAxisLabel": true,
    "xAxisLabel": "Country",
    "showYAxisLabel": true,
    "yAxisLabel": "GDP Per Capita",
    "showGridLines": false,
    "roundDomains": false,
    "tooltipDisabled": false,
    "roundEdges": false,
    "showDataLabel": false,
    "trimXAxisTicks": true,
    "trimYAxisTicks": true,
    "rotateXAxisTicks": false,
    "maxXAxisTickLength": 16,
    "maxYAxisTickLength": 16
  }
}
