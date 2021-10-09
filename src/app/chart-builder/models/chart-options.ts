import { LegendPosition, ScaleType, colorSets } from "@swimlane/ngx-charts";
import * as shape from "d3-shape";
import { Color } from "@swimlane/ngx-charts/lib/utils/color-sets";


export class ChartOptions {
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  legendPosition = LegendPosition.Right;
  showXAxisLabel = true;
  tooltipDisabled = false;
  showText = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'GDP Per Capita';
  showGridLines = true;
  innerPadding = '10%';
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  roundEdges: boolean = true;
  animations: boolean = true;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;
  showDataLabel: boolean = false;
  noBarWhenZero: boolean = true;
  trimXAxisTicks: boolean = true;
  trimYAxisTicks: boolean = true;
  rotateXAxisTicks: boolean = true;
  maxXAxisTickLength: number = 16;
  maxYAxisTickLength: number = 16;
  strokeColor: string = '#FFFFFF';
  strokeWidth: number = 2;

  curves = {
    Basis: shape.curveBasis,
    'Basis Closed': shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    'Cardinal Closed': shape.curveCardinalClosed,
    'Catmull Rom': shape.curveCatmullRom,
    'Catmull Rom Closed': shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    'Linear Closed': shape.curveLinearClosed,
    'Monotone X': shape.curveMonotoneX,
    'Monotone Y': shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    'Step After': shape.curveStepAfter,
    'Step Before': shape.curveStepBefore,
    default: shape.curveLinear
  };

  // line interpolation
  curveType: string = 'Linear';
  curve: any = this.curves[this.curveType];

  closedCurveType: string = 'Linear Closed';
  closedCurve: any = this.curves[this.closedCurveType];
  closedInterpolationTypes = ['Basis Closed', 'Cardinal Closed', 'Catmull Rom Closed', 'Linear Closed'];

  colorSets: Color[] = colorSets;
  colorScheme: any;
  schemeType = ScaleType.Ordinal;
  selectedColorScheme: string;
  rangeFillOpacity: number = 0.15;
  interpolationTypes = [
    'Basis',
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  // Override colors for certain values
  customColors: any[] = [
    {
      name: 'Germany',
      value: '#a8385d'
    }
  ];

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;

  // line, area
  autoScale = true;
  timeline = false;

  // margin
  marginRight: number = 40;
  marginLeft: number = 40;
  // heatmap
  heatmapMin: number = 0;
  heatmapMax: number = 50000;

  showRightYAxisLabel: boolean = true;

  treemapPath: any[] = [];

  showSeriesOnHover = true;
  // Reference lines
  showRefLines: boolean = true;
  showRefLabels: boolean = true;

  // Supports any number of reference lines.
  refLines = [
    { value: 42500, name: 'Maximum' },
    { value: 37750, name: 'Average' },
    { value: 33000, name: 'Minimum' }
  ];
}
