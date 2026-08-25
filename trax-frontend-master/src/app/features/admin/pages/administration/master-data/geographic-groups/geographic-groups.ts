import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import {
  FormsModule,
} from '@angular/forms';

import {
  BasePage,
} from '@app/core/base/base-page';


type Tab =
  | 'add'
  | 'edit';


interface GeoGroup {
  id: number;
  name: string;
  description: string;
  countries: string[];

  createdBy: string;
  createdDate: string;

  modifiedBy: string;
  modifiedDate: string;
}


@Component({
  selector: 'app-geographic-groups',

  standalone: true,

  imports: [
    FormsModule,
  ],

  templateUrl:
    './geographic-groups.html',

  styleUrl:
    './geographic-groups.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class GeographicGroups
  extends BasePage
{
  // ==================================================
  // TAB
  // ==================================================

  protected activeTab:
    Tab = 'add';


  // ==================================================
  // COUNTRIES
  // ==================================================

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


  // ==================================================
  // DATA
  // ==================================================

  protected groups:
    GeoGroup[] =
      this.load();

  protected selectedId:
    number | null =
      null;

  protected selectedCountryToRemove =
    '';

  protected form =
    this.defaults();


  // ==================================================
  // MESSAGE
  // ==================================================

  protected readonly message =
    signal<string | null>(
      null,
    );


  // ==================================================
  // CHANGE TAB
  // ==================================================

  protected setTab(
    tab: Tab,
  ): void {
    this.activeTab = tab;

    this.clear();
  }


  // ==================================================
  // ADD COUNTRY
  // ==================================================

  protected addCountry(): void {
    const country =
      this.form.country;

    if (
      !country ||
      this.form.selectedCountries
        .includes(country)
    ) {
      return;
    }

    this.form.selectedCountries = [
      ...this.form.selectedCountries,
      country,
    ];

    this.form.country = '';
  }


  // ==================================================
  // REMOVE COUNTRY
  // ==================================================

  protected removeCountry(): void {
    if (
      !this.selectedCountryToRemove
    ) {
      return;
    }

    this.form.selectedCountries =
      this.form.selectedCountries
        .filter(
          country =>
            country !==
            this.selectedCountryToRemove,
        );

    this.selectedCountryToRemove =
      '';
  }


  // ==================================================
  // LOAD GROUP FOR EDIT
  // ==================================================

  protected loadGroup(): void {
    const id =
      Number(
        this.form.groupId,
      );

    const group =
      this.groups.find(
        item =>
          item.id === id,
      );

    if (!group) {
      this.selectedId = null;
      return;
    }

    this.selectedId =
      group.id;

    this.selectedCountryToRemove =
      '';

    this.form = {
      groupId:
        String(group.id),

      geoGroup:
        group.name,

      description:
        group.description,

      country: '',

      selectedCountries: [
        ...group.countries,
      ],

      createdBy:
        group.createdBy,

      createdDate:
        group.createdDate,

      modifiedBy:
        group.modifiedBy,

      modifiedDate:
        group.modifiedDate,
    };
  }


  // ==================================================
  // SAVE / UPDATE
  // ==================================================

  protected save(): void {
    if (
      !this.form.geoGroup.trim()
    ) {
      this.show(
        'GeoGroup is required.',
      );

      return;
    }

    if (
      this.form
        .selectedCountries
        .length === 0
    ) {
      this.show(
        'Please select at least one country.',
      );

      return;
    }

    const now =
      new Date()
        .toLocaleDateString();


    // ================================================
    // UPDATE
    // ================================================

    if (
      this.activeTab ===
        'edit' &&
      this.selectedId !==
        null
    ) {
      this.groups =
        this.groups.map(
          group =>
            group.id ===
            this.selectedId
              ? {
                  ...group,

                  name:
                    this.form
                      .geoGroup
                      .trim(),

                  description:
                    this.form
                      .description
                      .trim(),

                  countries: [
                    ...this.form
                      .selectedCountries,
                  ],

                  modifiedBy:
                    'ADMIN',

                  modifiedDate:
                    now,
                }
              : group,
        );

      this.persist();

      this.show(
        'Geographic group updated successfully.',
      );

      return;
    }


    // ================================================
    // CREATE
    // ================================================

    this.groups = [
      ...this.groups,

      {
        id:
          Date.now(),

        name:
          this.form
            .geoGroup
            .trim(),

        description:
          this.form
            .description
            .trim(),

        countries: [
          ...this.form
            .selectedCountries,
        ],

        createdBy:
          'ADMIN',

        createdDate:
          now,

        modifiedBy: '',
        modifiedDate: '',
      },
    ];

    this.persist();

    this.clear();

    this.show(
      'Geographic group created successfully.',
    );
  }


  // ==================================================
  // DELETE
  // ==================================================

  protected remove(): void {
    if (
      this.selectedId ===
      null
    ) {
      this.show(
        'Please select a Geographic Group first.',
      );

      return;
    }

    this.groups =
      this.groups.filter(
        group =>
          group.id !==
          this.selectedId,
      );

    this.persist();

    this.clear();

    this.show(
      'Geographic group deleted successfully.',
    );
  }


  // ==================================================
  // CLEAR
  // ==================================================

  protected clear(): void {
    this.selectedId = null;

    this.selectedCountryToRemove =
      '';

    this.form =
      this.defaults();
  }


  // ==================================================
  // DEFAULT FORM
  // ==================================================

  private defaults() {
    return {
      groupId: '',

      geoGroup: '',

      description: '',

      country: '',

      selectedCountries:
        [] as string[],

      createdBy:
        this.activeTab === 'add'
          ? 'ADMIN'
          : '',

      createdDate:
        this.activeTab === 'add'
          ? new Date()
              .toLocaleDateString()
          : '',

      modifiedBy: '',

      modifiedDate: '',
    };
  }


  // ==================================================
  // STORAGE
  // ==================================================

  private persist(): void {
    localStorage.setItem(
      'traxGeographicGroups',

      JSON.stringify(
        this.groups,
      ),
    );
  }


  private load():
    GeoGroup[] {
    try {
      const stored =
        localStorage.getItem(
          'traxGeographicGroups',
        );

      return stored
        ? JSON.parse(stored)
        : [];
    }
    catch {
      return [];
    }
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
        this.message.set(
          null,
        ),
      5000,
    );
  }
}