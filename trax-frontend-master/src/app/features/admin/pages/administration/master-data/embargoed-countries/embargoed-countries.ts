import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type Tab = 'add' | 'edit' | 'search';
type FormStatus = 'all' | 'active' | 'inactive';

interface EmbargoedCountry {
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
  selector: 'app-embargoed-countries',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './embargoed-countries.html',
  styleUrl: './embargoed-countries.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbargoedCountries extends BasePage {

  protected activeTab: Tab = 'add';
  protected selectedId: number | null = null;

  private readonly storageKey =
    'traxEmbargoedCountries';

  protected readonly countries = [
    'AD - ANDORRA',
    'AE - UNITED ARAB EMIRATES',
    'AF - AFGHANISTAN',
    'AU - AUSTRALIA',
    'BH - BAHRAIN',
    'CA - CANADA',
    'GB - UNITED KINGDOM',
    'IN - INDIA',
    'PK - PAKISTAN',
    'SA - SAUDI ARABIA',
    'US - UNITED STATES',
  ];

  protected readonly riskRatings = [
    'LOW',
    'MEDIUM',
    'MEDIUM HIGH',
    'HIGH',
  ];

  protected records =
    this.load();

  protected results:
    EmbargoedCountry[] = [];

  protected form =
    this.defaults();

  protected readonly message =
    signal<string | null>(null);


  // ==================================================
  // TAB
  // ==================================================

  protected setTab(
    tab: Tab,
  ): void {
    this.activeTab = tab;
    this.reset();
  }


  // ==================================================
  // SAVE / UPDATE
  // ==================================================

  protected save(): void {
    if (!this.form.country) {
      return this.show(
        'Country is required.',
      );
    }

    const now =
      new Date().toLocaleDateString();


    // UPDATE
    if (
      this.activeTab === 'edit' &&
      this.selectedId !== null
    ) {
      this.records =
        this.records.map(item =>
          item.id === this.selectedId
            ? {
                ...item,
                country: this.form.country,
                description:
                  this.form.description.trim(),
                riskRating:
                  this.form.riskRating,
                status:
                  this.form.status === 'inactive'
                    ? 'inactive'
                    : 'active',
                modifiedBy: 'Admin',
                modifiedDate: now,
              }
            : item,
        );

      this.persist();
      this.search();

      return this.show(
        'Embargoed country updated successfully.',
      );
    }


    // ADD
    const countryCode =
      this.form.country
        .split(' - ')[0]
        .trim();

    this.records = [
      ...this.records,
      {
        id: Date.now(),
        code: countryCode,
        country: this.form.country,
        description:
          this.form.description.trim(),
        riskRating:
          this.form.riskRating,
        status: 'active',
        createdBy: 'Admin',
        createdDate: now,
        modifiedBy: '',
        modifiedDate: '',
      },
    ];

    this.persist();
    this.reset();

    this.show(
      'Embargoed country created successfully.',
    );
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search(): void {
    this.selectedId = null;

    this.results =
      this.records.filter(item =>
        (
          !this.form.code.trim() ||
          item.code
            .toLowerCase()
            .includes(
              this.form.code
                .trim()
                .toLowerCase(),
            )
        ) &&

        (
          !this.form.country ||
          this.form.country === 'All' ||
          item.country === this.form.country
        ) &&

        (
          !this.form.riskRating ||
          this.form.riskRating === 'All' ||
          item.riskRating ===
            this.form.riskRating
        ) &&

        (
          this.form.status === 'all' ||
          item.status === this.form.status
        ) &&

        (
          !this.form.createdBy.trim() ||
          item.createdBy
            .toLowerCase()
            .includes(
              this.form.createdBy
                .trim()
                .toLowerCase(),
            )
        ) &&

        (
          !this.form.modifiedBy.trim() ||
          item.modifiedBy
            .toLowerCase()
            .includes(
              this.form.modifiedBy
                .trim()
                .toLowerCase(),
            )
        )
      );
  }


  // ==================================================
  // LOAD RESULT FOR EDIT
  // ==================================================

  protected editRecord(
    item: EmbargoedCountry,
  ): void {
    if (this.activeTab !== 'edit') {
      return;
    }

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
        'Select a record to delete.',
      );
    }

    this.records =
      this.records.filter(
        item =>
          item.id !== this.selectedId,
      );

    this.persist();

    this.results =
      this.results.filter(
        item =>
          item.id !== this.selectedId,
      );

    this.selectedId = null;
    this.form = this.defaults();

    this.show(
      'Embargoed country deleted successfully.',
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


  // ==================================================
  // DEFAULT FORM
  // ==================================================

  private defaults() {
    const add =
      this.activeTab === 'add';

    return {
      code: '',

      country:
        add
          ? ''
          : 'All',

      description: '',

      riskRating:
        add
          ? 'HIGH'
          : 'All',

      status:
        (add
          ? 'active'
          : 'all') as FormStatus,

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
    EmbargoedCountry[] {
    try {
      const stored =
        localStorage.getItem(
          this.storageKey,
        );

      if (stored) {
        return JSON.parse(stored);
      }
    }
    catch {
      // use mock data
    }

    return [
      {
        id: 1,
        code: 'AD',
        country: 'AD - ANDORRA',
        description: '',
        riskRating: 'HIGH',
        status: 'active',
        createdBy: 'Admin',
        createdDate: '25-Aug-2026',
        modifiedBy: '',
        modifiedDate: '',
      },
    ];
  }


  // ==================================================
  // MESSAGE
  // ==================================================

  private show(
    text: string,
  ): void {
    this.message.set(text);

    setTimeout(
      () =>
        this.message.set(null),
      5000,
    );
  }
}