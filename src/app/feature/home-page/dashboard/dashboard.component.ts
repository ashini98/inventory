import { Component } from '@angular/core';
import {TuiInputCountModule} from "@taiga-ui/kit";
import {FormsModule} from "@angular/forms";
import {
  TUI_ALWAYS_DASHED,
  TUI_ALWAYS_NONE,
  TuiArcChartModule,
  TuiAxesModule,
  TuiBarChartModule
} from "@taiga-ui/addon-charts";
import {TuiMoneyModule} from "@taiga-ui/addon-commerce";
import {tuiCeil, tuiPure} from "@taiga-ui/cdk";
import {TuiHintModule} from "@taiga-ui/core";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TuiInputCountModule,
    FormsModule,
    TuiArcChartModule,
    TuiAxesModule,
    TuiBarChartModule,
    TuiMoneyModule,
    TuiHintModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  readonly value = [40, 30, 20, 10];

  activeItemIndex = NaN;

  private readonly setNames = ['cdk', 'core', 'kit', 'charts'];

  readonly valueBar: ReadonlyArray<[number, number, number, number]> = [
    [10, 20, 3, 7],
    [15, 18, 24, 1],
    [34, 23, 12, 9],
    [30, 14, 18, 14],
  ];

  readonly maxValue = 40;

  readonly axisYSecondaryLabels = [
    '',
    `${this.getMax(this.valueBar) / 2} k`,
    `${this.getMax(this.valueBar)} k`,
  ];

  readonly axisXLabels = ['Q1', 'Q2', 'Q3', 'Q4'];

  readonly horizontalLinesHandler = TUI_ALWAYS_DASHED;

  readonly verticalLinesHandler = TUI_ALWAYS_NONE;
  private BENJI: number;

  getPercent(set: [number, number, number, number]): number {
    return (this.BENJI * Math.max(...set)) / this.getMax(this.valueBar);
  }

  getSetName(index: number): string {
    return this.setNames[index];
  }

  getBackground(index: number): string {
    return `var(--tui-chart-${index})`;
  }

  @tuiPure
  private getMax(value: ReadonlyArray<[number, number, number, number]>): number {
    return tuiCeil(
      value.reduce((max, value) => Math.max(...value, max), 0),
      -1,
    );
  }

}
