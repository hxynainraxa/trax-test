import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { BasePage } from '@app/core/base/base-page';

import {
  LucideArrowUp,
  LucideDynamicIcon,
  LucideRefreshCw,
} from '@lucide/angular';

import Chart, {
  ChartConfiguration,
  Plugin,
} from 'chart.js/auto';

import { SharedTableComponent } from '@shared/components/shared-table/shared-table';

import {
  SharedTableColumn,
} from '@shared/interfaces/shared-table.types';

import {
  DASHBOARD_CARDS,
  DashboardCard,
} from './staticData';


interface DashboardTableRow {
  id: number;
  slNo: number;
  module: string;
  count: number;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,

  imports: [
    CommonModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class Dashboard
  extends BasePage
  implements AfterViewInit, OnDestroy
{
  // ==================================================
  // CHART REFERENCES
  // ==================================================

  @ViewChild('todayActionsChart')
  private todayActionsChartCanvas!:
    ElementRef<HTMLCanvasElement>;

  @ViewChild('activatedRulesChart')
  private activatedRulesChartCanvas!:
    ElementRef<HTMLCanvasElement>;

  @ViewChild('sanctionsViolationsChart')
  private sanctionsViolationsChartCanvas!:
    ElementRef<HTMLCanvasElement>;


  // ==================================================
  // CHART INSTANCES
  // ==================================================

  private todayActionsChart?:
    Chart<'doughnut'>;

  private activatedRulesChart?:
    Chart<'doughnut'>;

  private sanctionsViolationsChart?:
    Chart<'bar'>;


  // ==================================================
  // ICONS
  // ==================================================

  protected readonly arrowUpIcon =
    LucideArrowUp;

  protected readonly refreshIcon =
    LucideRefreshCw;


  // ==================================================
  // SESSION
  // ==================================================

  protected readonly sessionId =
    'dsf332435';


  // ==================================================
  // CARDS
  // ==================================================

  protected readonly cards:
    DashboardCard[] =
      DASHBOARD_CARDS;


  // ==================================================
  // TABLE COLUMNS
  // ==================================================

  protected readonly tableColumns:
    SharedTableColumn<DashboardTableRow>[] = [
      {
        key: 'slNo',
        header: 'Sl No.',
        width: '19%',
        searchable: false,
      },
      {
        key: 'module',
        header: 'Module',
        width: '61%',
      },
      {
        key: 'count',
        header: 'Count',
        width: '20%',
        searchable: false,
      },
    ];


  // ==================================================
  // ESCALATIONS
  // ==================================================

  protected readonly escalationRows:
    DashboardTableRow[] = [
      {
        id: 1,
        slNo: 1,
        module: 'Sanction Violation',
        count: 5,
      },
      {
        id: 2,
        slNo: 2,
        module: 'Rule Violation',
        count: 5,
      },
      {
        id: 3,
        slNo: 3,
        module: 'Sanction Violation',
        count: 5,
      },
    ];


  // ==================================================
  // FOLLOW UPS
  // ==================================================

  protected readonly followUpRows:
    DashboardTableRow[] = [
      {
        id: 1,
        slNo: 1,
        module: 'Sanction Violation',
        count: 5,
      },
      {
        id: 2,
        slNo: 2,
        module: 'Rule Violation',
        count: 5,
      },
      {
        id: 3,
        slNo: 3,
        module: 'Sanction Violation',
        count: 5,
      },
    ];


  // ==================================================
  // LIFECYCLE
  // ==================================================

  ngAfterViewInit(): void {
    this.createTodayActionsChart();

    this.createActivatedRulesChart();

    this.createSanctionsViolationsChart();
  }


  ngOnDestroy(): void {
    this.todayActionsChart?.destroy();

    this.activatedRulesChart?.destroy();

    this.sanctionsViolationsChart?.destroy();
  }


  // ==================================================
  // TODAY'S ACTIONS
  // ==================================================

  private createTodayActionsChart(): void {
    const canvas =
      this.todayActionsChartCanvas.nativeElement;

    this.todayActionsChart =
      new Chart(canvas, {
        type: 'doughnut',

        data: {
          labels: [
            'Reject',
            'Release',
            'Clean',
          ],

          datasets: [
            {
              data: [
                105,
                50,
                55,
              ],

              backgroundColor: [
                '#FB4448',
                '#FF990A',
                '#174E96',
              ],

              borderWidth: 0,

              hoverOffset: 0,
            },
          ],
        },

        options: {
          responsive: true,

          maintainAspectRatio: false,

          cutout: '60%',

          animation: {
            duration: 400,
          },

          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              enabled: false,
            },
          },
        },

        plugins: [
          this.createCenterTextPlugin(
            'today-actions-center',
            '210',
            'Total Actions',
          ),
        ],
      });
  }


  // ==================================================
  // MOST ACTIVATED RULES
  // ==================================================

  private createActivatedRulesChart(): void {
    const canvas =
      this.activatedRulesChartCanvas.nativeElement;

    this.activatedRulesChart =
      new Chart(canvas, {
        type: 'doughnut',

        data: {
          labels: [
            'Rule 1',
            'Rule 2',
            'Rule 3',
          ],

          datasets: [
            {
              data: [
                26,
                24,
                50,
              ],

              backgroundColor: [
                '#4B5565',
                '#FFB25A',
                '#43B8B8',
              ],

              borderWidth: 0,

              hoverOffset: 0,
            },
          ],
        },

        options: {
          responsive: true,

          maintainAspectRatio: false,

          cutout: '60%',

          animation: {
            duration: 400,
          },

          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              enabled: false,
            },
          },
        },

        plugins: [
          this.createCenterTextPlugin(
            'activated-rules-center',
            '65',
            'Total Rules',
          ),
        ],
      });
  }


  // ==================================================
  // SANCTIONS VIOLATIONS
  // ==================================================

private createSanctionsViolationsChart(): void {
  const canvas =
    this.sanctionsViolationsChartCanvas.nativeElement;

  const values = [
    500,
    575,
    420,
    635,
    550,
  ];

  const lowestValue =
    Math.min(...values);

  const lowestIndex =
    values.indexOf(lowestValue);

  const configuration:
    ChartConfiguration<'bar'> = {
      type: 'bar',

      data: {
        labels: [
          'MON',
          'TUE',
          'WED',
          'THU',
          'FRI',
        ],

        datasets: [
          {
            data: values,

            backgroundColor:
              values.map(
                (_value, index) =>
                  index === lowestIndex
                    ? '#EF6417'
                    : '#F8CFA9',
              ),

            borderWidth: 0,

            borderRadius: {
              topLeft: 5,
              topRight: 5,
              bottomLeft: 0,
              bottomRight: 0,
            },

            borderSkipped: false,

            /*
             * Match the narrow Figma bars.
             */
            barThickness: 32,

            maxBarThickness: 32,

            categoryPercentage: 0.65,

            barPercentage: 0.8,
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        animation: {
          duration: 400,
        },

        /*
         * Creates the visible whitespace
         * after Friday like the screenshot.
         */
        layout: {
          padding: {
            top: 12,
            right: 110,
            bottom: 0,
            left: 0,
          },
        },

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            enabled: false,
          },
        },

        scales: {
          // ==========================================
          // X AXIS
          // ==========================================

          x: {
            offset: true,

            grid: {
              display: false,
            },

            border: {
              display: false,
            },

            ticks: {
              color: '#24100D',

              padding: 8,

              font: {
                family: 'Inter',
                size: 11,
                weight: 500,
              },
            },
          },

          // ==========================================
          // Y AXIS
          // ==========================================

          y: {
            beginAtZero: true,

            min: 0,

            max: 699,

            /*
             * Force exactly five visually
             * evenly-spaced labels.
             */
            ticks: {
              count: 5,

              color: '#24100D',

              padding: 12,

              font: {
                family: 'Inter',
                size: 12,
                weight: 500,
              },

              /*
               * We control the visible labels
               * to match the supplied design.
               */
              callback: (
                _value,
                index,
              ) => {
                const labels = [
                  '0.0',
                  '200.0',
                  '400.0',
                  '600.0',
                  '699.0',
                ];

                return labels[index] ?? '';
              },
            },

            grid: {
              display: false,
            },

            border: {
              display: true,

              color: '#EAECF0',

              width: 1,
            },
          },
        },
      },

      plugins: [
        this.createBarLabelPlugin(
          lowestIndex,
        ),
      ],
    };

  this.sanctionsViolationsChart =
    new Chart(
      canvas,
      configuration,
    );
}


  // ==================================================
  // DOUGHNUT CENTER TEXT
  // ==================================================

  private createCenterTextPlugin(
    id: string,
    value: string,
    label: string,
  ): Plugin<'doughnut'> {
    return {
      id,

      afterDraw: chart => {
        const {
          ctx,
          chartArea,
        } = chart;

        if (!chartArea) {
          return;
        }

        const centerX =
          (
            chartArea.left +
            chartArea.right
          ) / 2;

        const centerY =
          (
            chartArea.top +
            chartArea.bottom
          ) / 2;

        ctx.save();

        ctx.textAlign = 'center';

        ctx.textBaseline =
          'middle';


        // Number
        ctx.fillStyle =
          '#2D1411';

        ctx.font =
          '600 30px Inter, sans-serif';

        ctx.fillText(
          value,
          centerX,
          centerY - 3,
        );


        // Small description
        ctx.fillStyle =
          '#98A2B3';

        ctx.font =
          '400 10px Inter, sans-serif';

        ctx.fillText(
          label,
          centerX,
          centerY + 19,
        );

        ctx.restore();
      },
    };
  }


  // ==================================================
  // BAR VALUE LABEL
  // ==================================================

private createBarLabelPlugin(
  lowestIndex: number,
): Plugin<'bar'> {
  return {
    id: 'sanctions-bar-label',

    afterDatasetsDraw: chart => {
      const { ctx } = chart;

      const metadata =
        chart.getDatasetMeta(0);

      metadata.data.forEach(
        (bar, index) => {
          const position =
            bar.tooltipPosition(true);

          if (
            position.x === null ||
            position.y === null
          ) {
            return;
          }

          ctx.save();

          /*
           * Lowest/orange bar -> white text.
           * All other bars -> dark text.
           */
          ctx.fillStyle =
            index === lowestIndex
              ? '#FFFFFF'
              : '#3A3735';

          ctx.font =
            '500 10px Inter, sans-serif';

          ctx.textAlign = 'center';

          ctx.textBaseline = 'top';

          /*
           * Positive offset pushes the text
           * DOWN INSIDE the bar.
           */
          ctx.fillText(
            '3.58',
            position.x,
            position.y + 8,
          );

          ctx.restore();
        },
      );
    },
  };
}

  // ==================================================
  // REFRESH
  // ==================================================

  protected refreshTodayActions(): void {
    this.todayActionsChart?.update();
  }


  protected refreshActivatedRules(): void {
    this.activatedRulesChart?.update();
  }


  protected refreshSanctionsViolations(): void {
    this.sanctionsViolationsChart?.update();
  }
}