import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  BasePage,
} from '@app/core/base/base-page';

import {
  SharedTableComponent,
} from '@shared/components/shared-table/shared-table';

import {
  SharedTableColumn,
} from '@shared/interfaces/shared-table.types';

import {
  ParamMasterRecord,
  paramMasterData,
} from './param-master-data';


@Component({
  selector: 'app-param-master',
  standalone: true,

  imports: [
    FormsModule,
    SharedTableComponent,
  ],

  templateUrl: './param-master.html',
  styleUrl: './param-master.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ParamMaster
  extends BasePage
{
  private readonly storageKey =
    'traxParamMaster';

  protected records =
    this.load();

  protected results:
    ParamMasterRecord[] = [];

  protected hasSearched = false;

  protected selectedId:
    number | null = null;

  protected form = {
    code: null as number | null,
    description: '',
    value: '',
  };

  protected readonly toast =
    signal<string | null>(null);


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<ParamMasterRecord>[] = [
      {
        key: 'code',
        header: 'Param Code',
        width: '11%',
        sortable: true,
      },
      {
        key: 'description',
        header: 'Param Description',
        width: '30%',
        sortable: true,
      },
      {
        key: 'value',
        header: 'Param Value',
        width: '13%',
      },
      {
        key: 'visible',
        header: 'Visible',
        width: '11%',
        formatter: value =>
          value ? 'True' : 'False',
      },
      {
        key: 'udf',
        header: 'UDF',
        width: '11%',
        formatter: value =>
          value ? 'True' : 'False',
      },
      {
        key: 'modifiedBy',
        header: 'Modified By',
        width: '12%',
      },
      {
        key: 'modifiedDate',
        header: 'Modified Date',
        width: '18%',
      },
    ];


  // ==================================================
  // SEARCH
  // ==================================================

  protected search(): void {
    const description =
      this.form.description
        .trim()
        .toLowerCase();

    const value =
      this.form.value
        .trim()
        .toLowerCase();

    this.results =
      this.records.filter(item =>
        (
          this.form.code === null ||
          item.code === this.form.code
        ) &&
        (
          !description ||
          item.description
            .toLowerCase()
            .includes(description)
        ) &&
        (
          !value ||
          item.value
            .toLowerCase()
            .includes(value)
        ),
      );

    this.hasSearched = true;

    /*
     * If exactly one result is found,
     * load it for Update.
     */
    if (this.results.length === 1) {
      this.selectRecord(
        this.results[0],
      );
    }
  }


  // ==================================================
  // SELECT
  // ==================================================

  protected selectRecord(
    record: ParamMasterRecord,
  ): void {
    this.selectedId =
      record.id;

    this.form = {
      code: record.code,
      description: record.description,
      value: record.value,
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected update(): void {
    if (this.selectedId === null) {
      return this.show(
        'Search and select a parameter first.',
      );
    }

    this.records =
      this.records.map(item =>
        item.id === this.selectedId
          ? {
              ...item,
              code: this.form.code ?? item.code,
              description:
                this.form.description.trim(),
              value:
                this.form.value.trim(),
              modifiedBy: 'Admin',
              modifiedDate:
                new Date().toLocaleString(),
            }
          : item,
      );

    this.persist();

    this.results =
      this.results.map(item =>
        this.records.find(
          record =>
            record.id === item.id,
        ) ?? item,
      );

    this.show(
      'Parameter updated successfully.',
    );
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset(): void {
    this.form = {
      code: null,
      description: '',
      value: '',
    };

    this.results = [];
    this.selectedId = null;
    this.hasSearched = false;
  }


  // ==================================================
  // EXPORT TO EXCEL
  // ==================================================

  protected exportExcel(): void {
    if (!this.results.length) {
      return this.show(
        'No search results available to export.',
      );
    }

    const rows =
      this.results.map(item => `
        <tr>
          <td>${item.code}</td>
          <td>${this.escape(item.description)}</td>
          <td>${this.escape(item.value)}</td>
          <td>${item.visible ? 'True' : 'False'}</td>
          <td>${item.udf ? 'True' : 'False'}</td>
          <td>${this.escape(item.modifiedBy)}</td>
          <td>${this.escape(item.modifiedDate)}</td>
        </tr>
      `).join('');

    const html = `
      <table>
        <thead>
          <tr>
            <th>Param Code</th>
            <th>Param Description</th>
            <th>Param Value</th>
            <th>Visible</th>
            <th>UDF</th>
            <th>Modified By</th>
            <th>Modified Date</th>
          </tr>
        </thead>

        <tbody>
          ${rows}
        </tbody>
      </table>
    `;

    const blob =
      new Blob(
        [html],
        {
          type:
            'application/vnd.ms-excel;charset=utf-8;',
        },
      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;
    link.download =
      'param-master-results.xls';

    link.click();

    URL.revokeObjectURL(url);
  }


  // ==================================================
  // STORAGE
  // ==================================================

  private persist(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.records),
    );
  }

  private load():
    ParamMasterRecord[] {
    try {
      const stored =
        localStorage.getItem(
          this.storageKey,
        );

      return stored
        ? JSON.parse(stored)
        : [...paramMasterData];
    } catch {
      return [...paramMasterData];
    }
  }


  private escape(
    value: string,
  ): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }


  private show(
    message: string,
  ): void {
    this.toast.set(message);

    setTimeout(
      () =>
        this.toast.set(null),
      5000,
    );
  }
}