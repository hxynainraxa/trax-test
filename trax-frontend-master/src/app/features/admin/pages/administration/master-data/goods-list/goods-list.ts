import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type Tab = 'add' | 'edit' | 'search';
type Status = 'all' | 'active' | 'inactive';

interface GoodsRecord {
  id: number;
  goodsType: string;
  goodsName: string;
  casNumber: string;
  productName: string;
  referenceNumber: string;
  hsCode: string;
  controlledGoods: string;
  needDeclaration: string;
  underListOf: string;
  status: 'active' | 'inactive';
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

@Component({
  selector: 'app-goods-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './goods-list.html',
  styleUrl: './goods-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsList extends BasePage {

  protected activeTab: Tab = 'add';
  protected selectedId: number | null = null;

  protected readonly goodsTypes = [
    'Chemical',
  ];

  protected readonly yesNo = [
    'No',
    'Yes',
  ];

  protected records = this.load();
  protected results: GoodsRecord[] = [];
  protected form = this.defaults();

  protected readonly message =
    signal<string | null>(null);


  protected setTab(tab: Tab): void {
    this.activeTab = tab;
    this.reset();
  }


  // ==================================================
  // SAVE / UPDATE
  // ==================================================

  protected save(): void {
    if (!this.form.goodsName.trim()) {
      return this.show(
        'Goods Name is required.',
      );
    }

    const now =
      new Date().toLocaleDateString();

    if (
      this.activeTab === 'edit' &&
      this.selectedId !== null
    ) {
      this.records =
        this.records.map(item =>
          item.id === this.selectedId
            ? {
                ...item,
                ...this.form,
                status:
                  this.form.status === 'inactive'
                    ? 'inactive'
                    : 'active',
                modifiedBy: 'ADMIN',
                modifiedDate: now,
              }
            : item,
        );

      this.persist();
      this.search();

      return this.show(
        'Goods record updated successfully.',
      );
    }

    this.records = [
      ...this.records,
      {
        id: Date.now(),
        ...this.form,
        status: 'active',
        createdBy: 'ADMIN',
        createdDate: now,
        modifiedBy: '',
        modifiedDate: '',
      },
    ];

    this.persist();
    this.reset();

    this.show(
      'Goods record created successfully.',
    );
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search(): void {
    const text = (value: string) =>
      value.trim().toLowerCase();

    this.selectedId = null;

    this.results =
      this.records.filter(item =>
        (
          !this.form.goodsName ||
          text(item.goodsName).includes(
            text(this.form.goodsName),
          )
        ) &&
        (
          !this.form.casNumber ||
          text(item.casNumber).includes(
            text(this.form.casNumber),
          )
        ) &&
        (
          !this.form.productName ||
          text(item.productName).includes(
            text(this.form.productName),
          )
        ) &&
        (
          !this.form.referenceNumber ||
          text(item.referenceNumber).includes(
            text(this.form.referenceNumber),
          )
        ) &&
        (
          !this.form.hsCode ||
          text(item.hsCode).includes(
            text(this.form.hsCode),
          )
        ) &&
        (
          this.form.status === 'all' ||
          item.status === this.form.status
        )
      );

    this.show(
      `${this.results.length} record(s) found.`,
    );
  }


  // ==================================================
  // EDIT
  // ==================================================

  protected editRecord(
    item: GoodsRecord,
  ): void {
    if (this.activeTab !== 'edit') return;

    this.selectedId = item.id;

    this.form = {
      goodsType: item.goodsType,
      goodsName: item.goodsName,
      casNumber: item.casNumber,
      productName: item.productName,
      referenceNumber: item.referenceNumber,
      hsCode: item.hsCode,
      controlledGoods: item.controlledGoods,
      needDeclaration: item.needDeclaration,
      underListOf: item.underListOf,
      status: item.status,
      createdBy: item.createdBy,
      createdDate: item.createdDate,
      modifiedBy: item.modifiedBy,
      modifiedDate: item.modifiedDate,
    };
  }


  protected remove(): void {
    if (this.selectedId === null) {
      return this.show(
        'Select a record first.',
      );
    }

    this.records =
      this.records.filter(
        item =>
          item.id !== this.selectedId,
      );

    this.persist();
    this.reset();

    this.show(
      'Goods record deleted successfully.',
    );
  }


  // ==================================================
  // FILE UPLOAD
  // ==================================================

  protected async uploadFile(
    event: Event,
  ): Promise<void> {
    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) return;

    const rows =
      (await file.text())
        .split(/\r?\n/)
        .map(row => row.trim())
        .filter(Boolean);

    const now =
      new Date().toLocaleDateString();

    const added =
      rows
        .filter((row, index) =>
          !(
            index === 0 &&
            row
              .toLowerCase()
              .includes('goods')
          ),
        )
        .map(row => {
          const [
            goodsName,
            casNumber = '',
            productName = '',
            hsCode = '',
          ] = row.split(',');

          return {
            id:
              Date.now() +
              Math.random(),
            goodsType: 'Chemical',
            goodsName:
              goodsName.trim(),
            casNumber:
              casNumber.trim(),
            productName:
              productName.trim(),
            referenceNumber: '',
            hsCode:
              hsCode.trim(),
            controlledGoods: 'No',
            needDeclaration: 'No',
            underListOf: '',
            status:
              'active' as const,
            createdBy: 'ADMIN',
            createdDate: now,
            modifiedBy: '',
            modifiedDate: '',
          };
        })
        .filter(
          item =>
            item.goodsName,
        );

    this.records = [
      ...this.records,
      ...added,
    ];

    this.persist();
    input.value = '';

    this.show(
      `${added.length} goods record(s) uploaded successfully.`,
    );
  }


  // ==================================================
  // DOWNLOAD
  // ==================================================

  protected download(): void {
    const csv = [
      [
        'Goods Type',
        'Goods Name',
        'CAS Number',
        'Product Name',
        'Reference Number',
        'HS Code',
        'Controlled Goods',
        'Need Declaration',
        'Under List Of',
        'Status',
      ].join(','),

      ...this.records.map(item =>
        [
          item.goodsType,
          item.goodsName,
          item.casNumber,
          item.productName,
          item.referenceNumber,
          item.hsCode,
          item.controlledGoods,
          item.needDeclaration,
          item.underListOf,
          item.status,
        ]
          .map(value =>
            `"${String(value)
              .replace(/"/g, '""')}"`
          )
          .join(','),
      ),
    ].join('\n');

    const url =
      URL.createObjectURL(
        new Blob(
          [csv],
          {
            type:
              'text/csv;charset=utf-8',
          },
        ),
      );

    const link =
      document.createElement('a');

    link.href = url;
    link.download =
      'goods-list.csv';

    link.click();

    URL.revokeObjectURL(url);
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset(): void {
    this.selectedId = null;
    this.results = [];
    this.form = this.defaults();
  }


  private defaults() {
    const searching =
      this.activeTab !== 'add';

    return {
      goodsType: 'Chemical',
      goodsName: '',
      casNumber: '',
      productName: '',
      referenceNumber: '',
      hsCode: '',

      controlledGoods: 'No',
      needDeclaration: 'No',
      underListOf: '',

      status:
        (searching
          ? 'all'
          : 'active') as Status,

      createdBy: '',
      createdDate: '',
      modifiedBy: '',
      modifiedDate: '',
    };
  }


  private persist(): void {
    localStorage.setItem(
      'traxGoodsList',
      JSON.stringify(this.records),
    );
  }


  private load():
    GoodsRecord[] {
    try {
      return JSON.parse(
        localStorage.getItem(
          'traxGoodsList',
        ) ?? '[]',
      );
    } catch {
      return [];
    }
  }


  private show(text: string): void {
    this.message.set(text);

    setTimeout(
      () =>
        this.message.set(null),
      5000,
    );
  }
}