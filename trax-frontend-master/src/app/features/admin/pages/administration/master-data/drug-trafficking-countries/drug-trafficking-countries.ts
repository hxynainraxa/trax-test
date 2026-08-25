import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type Tab = 'add' | 'edit' | 'search';
type Status = 'all' | 'active' | 'inactive';

interface DrugCountry {
  id: number;
  code: string;
  country: string;
  description: string;
  riskRating: string;
  status: 'active' | 'inactive';
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

@Component({
  selector: 'app-drug-trafficking-countries',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './drug-trafficking-countries.html',
  styleUrl: './drug-trafficking-countries.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrugTraffickingCountries extends BasePage {

  protected activeTab: Tab = 'add';
  protected selectedId: number | null = null;

  private readonly storageKey =
    'traxDrugTraffickingCountries';

  protected readonly countries = [
    'AE - United Arab Emirates',
    'AF - Afghanistan',
    'AU - Australia',
    'BH - Bahrain',
    'CA - Canada',
    'GB - United Kingdom',
    'IN - India',
    'PK - Pakistan',
    'SA - Saudi Arabia',
    'US - United States',
  ];

  protected readonly riskRatings = [
    'Low',
    'Medium',
    'Medium High',
    'High',
  ];

  protected records = this.load();
  protected results: DrugCountry[] = [];

  protected form = this.defaults();

  protected readonly message =
    signal<string | null>(null);


  // ==================================================
  // TAB
  // ==================================================

  protected setTab(tab: Tab): void {
    this.activeTab = tab;
    this.reset();
  }


  // ==================================================
  // ADD
  // ==================================================

  protected save(): void {
    if (!this.form.country) {
      return this.show(
        'Country is required.',
      );
    }

    if (this.selectedId !== null) {
      this.records =
        this.records.map(item =>
          item.id === this.selectedId
            ? {
                ...item,
                country: this.form.country,
                description: this.form.description,
                riskRating: this.form.riskRating,
                status:
                  this.form.status === 'inactive'
                    ? 'inactive'
                    : 'active',
                modifiedBy: 'ADMIN',
                modifiedDate:
                  new Date().toLocaleDateString(),
              }
            : item,
        );

      this.persist();

      this.show(
        'Drug trafficking country updated successfully.',
      );

      return;
    }

    this.records = [
      ...this.records,
      {
        id: Date.now(),
        code:
          `DTC-${String(
            this.records.length + 1,
          ).padStart(3, '0')}`,
        country: this.form.country,
        description: this.form.description,
        riskRating: this.form.riskRating,
        status: 'active',
        createdBy: 'ADMIN',
        createdDate:
          new Date().toLocaleDateString(),
        modifiedBy: '',
        modifiedDate: '',
      },
    ];

    this.persist();
    this.reset();

    this.show(
      'Drug trafficking country created successfully.',
    );
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search(): void {
    this.results =
      this.records.filter(item =>
        (!this.form.code ||
          item.code
            .toLowerCase()
            .includes(
              this.form.code.toLowerCase(),
            )) &&

        (!this.form.country ||
          this.form.country === 'All' ||
          item.country === this.form.country) &&

        (!this.form.riskRating ||
          this.form.riskRating === 'All' ||
          item.riskRating ===
            this.form.riskRating) &&

        (this.form.status === 'all' ||
          item.status === this.form.status),
      );

    if (
      this.activeTab === 'edit' &&
      this.results.length === 1
    ) {
      this.loadForEdit(
        this.results[0],
      );
    }

    this.show(
      `${this.results.length} record(s) found.`,
    );
  }


  // ==================================================
  // LOAD EDIT
  // ==================================================

  protected loadForEdit(
    item: DrugCountry,
  ): void {
    this.selectedId = item.id;

    this.form = {
      code: item.code,
      country: item.country,
      description: item.description,
      riskRating: item.riskRating,
      status: item.status,

      createdBy: item.createdBy,
      createdDate: item.createdDate,

      modifiedBy: item.modifiedBy,
      modifiedDate: item.modifiedDate,
    };
  }


  // ==================================================
  // DELETE
  // ==================================================

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
      'Drug trafficking country deleted successfully.',
    );
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
      code: '',

      country:
        searching
          ? 'All'
          : '',

      description: '',

      riskRating:
        searching
          ? 'All'
          : 'High',

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
    DrugCountry[] {
    try {
      return JSON.parse(
        localStorage.getItem(
          this.storageKey,
        ) ?? '[]',
      );
    } catch {
      return [];
    }
  }


  private show(text: string): void {
    this.message.set(text);

    setTimeout(
      () => this.message.set(null),
      5000,
    );
  }
}