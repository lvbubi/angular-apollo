import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from "../../models/chart-options";
import * as shape from "d3-shape";

@Component({
  selector: 'app-char-options',
  templateUrl: './chart-options.component.html',
  styleUrls: ['./chart-options.component.css']
})
export class ChartOptionsComponent implements OnInit {

  @Input() options: ChartOptions;

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

  @Input() chart: any;

  @Input() chartType: string;

  constructor() { }

  ngOnInit(): void {
  }

  getInterpolationType(curveType) {
    return this.curves[curveType] || this.curves['default'];
  }
}
