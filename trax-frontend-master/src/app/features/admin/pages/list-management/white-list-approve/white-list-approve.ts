import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { LucideDynamicIcon, LucideRotateCcw, LucideSearch } from '@lucide/angular';

import { BasePage } from '@app/core/base/base-page';

import { SharedTableComponent } from '@shared/components/shared-table/shared-table';

import { SharedTableColumn } from '@shared/interfaces/shared-table.types';

import { nationalityOptions } from '../entry-to-list/entry-to-list-data';

import { WhiteListNameType, WhiteListRecord } from '../white-list/white-list-data';

import { WhiteListStoreService } from '../white-list/white-list-store.service';

// ==================================================
// SEARCH FILTERS
// ==================================================

interface WhiteListApproveFilters {
  name: string;

  membershipNo: string;

  createdFrom: string;

  createdTo: string;

  nameType: WhiteListNameType;
}

// ==================================================
// TABLE ROW
// ==================================================

interface WhiteListApproveTableRow extends WhiteListRecord {
  slNo: number;

  nameTypeLabel: string;

  nationalityLabel: string;

  statusLabel: string;

  createdBy: string;

  createdOn: string;

  modifiedBy: string;

  modifiedOn: string;
}

@Component({
  selector: 'app-white-list-approve',

  standalone: true,

  imports: [CommonModule, FormsModule, LucideDynamicIcon, SharedTableComponent],

  templateUrl: './white-list-approve.html',

  styleUrl: './white-list-approve.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhiteListApprove extends BasePage {
  // ==================================================
  // ICONS
  // ==================================================

  protected readonly searchIcon = LucideSearch;

  protected readonly resetIcon = LucideRotateCcw;

  // ==================================================
  // NATIONALITIES
  // ==================================================

  protected readonly nationalities = nationalityOptions;

  // ==================================================
  // FILTERS
  // ==================================================

  protected filters: WhiteListApproveFilters = this.createDefaultFilters();

  // ==================================================
  // RESULTS
  // ==================================================

  protected results: WhiteListApproveTableRow[] = [];

  protected hasSearched = false;

  // ==================================================
  // TABLE COLUMNS
  // ==================================================

  protected readonly columns: SharedTableColumn<WhiteListApproveTableRow>[] = [
    {
      key: 'slNo',

      header: 'Sl.No',

      width: '6%',
    },

    {
      key: 'membershipNo',

      header: 'Membership No.',

      width: '14%',

      sortable: true,
    },

    {
      key: 'name',

      header: 'Name',

      width: '18%',

      sortable: true,
    },

    {
      key: 'nameTypeLabel',

      header: 'Name Type',

      width: '11%',

      sortable: true,
    },

    {
      key: 'nationalityLabel',

      header: 'Nationality',

      width: '14%',

      sortable: true,
    },

    {
      key: 'includeFrom',

      header: 'Include From',

      width: '11%',

      sortable: true,
    },

    {
      key: 'includeTo',

      header: 'Include To',

      width: '11%',

      sortable: true,
    },

    {
      key: 'statusLabel',

      header: 'Status',

      width: '8%',
    },

    {
      key: 'createdOn',

      header: 'Created On',

      width: '13%',

      sortable: true,
    },
  ];

  // ==================================================
  // CONSTRUCTOR
  // ==================================================

  constructor(private readonly whiteListStore: WhiteListStoreService) {
    super();
  }

  // ==================================================
  // SEARCH
  // ==================================================

  protected onSearch(): void {
    const records = this.whiteListStore.search(record => this.matchesFilters(record));

    this.results = this.toTableRows(records);

    this.hasSearched = true;
  }

  // ==================================================
  // RESET
  // ==================================================

  protected onReset(): void {
    this.filters = this.createDefaultFilters();

    this.results = [];

    this.hasSearched = false;
  }

  // ==================================================
  // MATCH FILTERS
  // ==================================================

  private matchesFilters(record: WhiteListRecord): boolean {
    const contains = (source: string, value: string): boolean => {
      const query = value.trim().toLowerCase();

      if (!query) {
        return true;
      }

      return (source ?? '').toLowerCase().includes(query);
    };

    // ================================================
    // NAME
    // ================================================

    if (!contains(record.name, this.filters.name)) {
      return false;
    }

    // ================================================
    // MEMBERSHIP NUMBER
    // ================================================

    if (!contains(record.membershipNo, this.filters.membershipNo)) {
      return false;
    }

    // ================================================
    // NAME TYPE
    // ================================================

    if (this.filters.nameType !== 'all' && record.nameType !== this.filters.nameType) {
      return false;
    }

    // ================================================
    // CREATED FROM
    // ================================================

    if (this.filters.createdFrom && record.createdAt.slice(0, 10) < this.filters.createdFrom) {
      return false;
    }

    // ================================================
    // CREATED TO
    // ================================================

    if (this.filters.createdTo && record.createdAt.slice(0, 10) > this.filters.createdTo) {
      return false;
    }

    return true;
  }

  // ==================================================
  // TABLE ROWS
  // ==================================================

  private toTableRows(records: WhiteListRecord[]): WhiteListApproveTableRow[] {
    return records.map((record, index) => {
      const nationality = this.nationalities.find(item => item.code === record.nationality);

      return {
        ...record,

        slNo: index + 1,

        nameTypeLabel: record.nameType === 'corporate' ? 'Corporate' : 'Individual',

        nationalityLabel: nationality?.name ?? record.nationality,

        statusLabel: record.active ? 'Active' : 'Inactive',

        /*
         * Temporary UI value.
         *
         * Replace later with actual
         * logged-in user/API response.
         */
        createdBy: 'Admin',

        createdOn: this.formatDateTime(record.createdAt),

        modifiedBy: record.updatedAt !== record.createdAt ? 'Admin' : '—',

        modifiedOn: record.updatedAt !== record.createdAt ? this.formatDateTime(record.updatedAt) : '—',
      };
    });
  }

  // ==================================================
  // DEFAULT FILTERS
  // ==================================================

  private createDefaultFilters(): WhiteListApproveFilters {
    return {
      name: '',

      membershipNo: '',

      createdFrom: '',

      createdTo: '',

      nameType: 'all',
    };
  }

  // ==================================================
  // FORMAT DATE
  // ==================================================

  private formatDateTime(value: string): string {
    if (!value) {
      return '—';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  }
}
