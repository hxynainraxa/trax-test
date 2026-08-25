import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';

import {
  CommonModule,
} from '@angular/common';

import {
  FormsModule,
} from '@angular/forms';

import {
  LucideCheckCircle2,
  LucideChevronDown,
  LucideChevronRight,
  LucideDynamicIcon,
  LucideRotateCcw,
  LucideSave,
  LucideTriangleAlert,
  LucideX,
} from '@lucide/angular';

import {
  BasePage,
} from '@app/core/base/base-page';

import {
  CorporateRiskRatingConfiguration,
  CorporateRiskSection,
  createDefaultCorporateRiskConfiguration,
} from './corporate-risk-rating-data';


// ==================================================
// TOAST
// ==================================================

interface ToastState {
  type:
    | 'success'
    | 'error';

  message:
    string;
}


@Component({
  selector:
    'app-corporate-risk-rating',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
  ],

  templateUrl:
    './corporate-risk-rating.html',

  styleUrl:
    './corporate-risk-rating.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class CorporateRiskRating
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // STORAGE
  // ==================================================

  private readonly storageKey =
    'traxCorporateRiskRating';


  // ==================================================
  // ICONS
  // ==================================================

  protected readonly saveIcon =
    LucideSave;

  protected readonly clearIcon =
    LucideRotateCcw;

  protected readonly chevronDownIcon =
    LucideChevronDown;

  protected readonly chevronRightIcon =
    LucideChevronRight;

  protected readonly successIcon =
    LucideCheckCircle2;

  protected readonly errorIcon =
    LucideTriangleAlert;

  protected readonly closeIcon =
    LucideX;


  // ==================================================
  // ACTIVE SECTION
  //
  // First section initially open.
  //
  // null = all sections closed.
  // ==================================================

  protected readonly activeSection =
    signal<
      CorporateRiskSection | null
    >(
      'total',
    );


  // ==================================================
  // CONFIGURATION
  // ==================================================

  protected configuration:
    CorporateRiskRatingConfiguration =
      this.loadConfiguration();


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<
      ToastState | null
    >(
      null,
    );


  private toastTimer:
    ReturnType<
      typeof setTimeout
    > | null = null;


  constructor() {
    super();
  }


  // ==================================================
  // DESTROY
  // ==================================================

  ngOnDestroy():
    void {

    if (
      this.toastTimer
    ) {

      clearTimeout(
        this.toastTimer,
      );
    }
  }


  // ==================================================
  // TOGGLE SECTION
  //
  // If clicked section is already open:
  // close it.
  //
  // Otherwise:
  // close current one and open clicked one.
  // ==================================================

  protected toggleSection(
    section:
      CorporateRiskSection,
  ): void {

    this.activeSection.update(
      current =>
        current === section
          ? null
          : section,
    );
  }


  // ==================================================
  // IS OPEN
  // ==================================================

  protected isOpen(
    section:
      CorporateRiskSection,
  ): boolean {

    return (
      this.activeSection() ===
      section
    );
  }


  // ==================================================
  // TOTAL AML WEIGHT
  // ==================================================

  protected getTotalRiskWeight():
    number {

    return this.configuration
      .total
      .reduce(
        (
          total,
          item,
        ) =>
          total +
          Number(
            item.weightage ||
            0,
          ),
        0,
      );
  }


  // ==================================================
  // ONBOARDING TOTAL
  // ==================================================

  protected getOnboardingWeight():
    number {

    return this.configuration
      .onboarding
      .reduce(
        (
          total,
          item,
        ) =>
          total +
          Number(
            item.weightage ||
            0,
          ),
        0,
      );
  }


  // ==================================================
  // TRANSACTION TOTAL
  // ==================================================

  protected getTransactionWeight():
    number {

    return this.configuration
      .transaction
      .reduce(
        (
          total,
          item,
        ) =>
          total +
          Number(
            item.weightage ||
            0,
          ),
        0,
      );
  }


  // ==================================================
  // PROFILE TOTAL
  // ==================================================

  protected getProfileWeight():
    number {

    return this.configuration
      .profile
      .reduce(
        (
          total,
          item,
        ) =>
          total +
          Number(
            item.weightage ||
            0,
          ),
        0,
      );
  }


  // ==================================================
  // NORMALIZE INPUT
  // ==================================================

  protected normalizeWeight(
    value:
      number,
  ): number {

    const numericValue =
      Number(
        value,
      );


    if (
      Number.isNaN(
        numericValue,
      )
    ) {

      return 0;
    }


    if (
      numericValue < 0
    ) {

      return 0;
    }


    if (
      numericValue > 100
    ) {

      return 100;
    }


    return numericValue;
  }


  // ==================================================
  // SAVE
  // ==================================================

  protected save():
    void {

    if (
      !this.validateWeightages()
    ) {

      return;
    }


    if (
      typeof localStorage !==
      'undefined'
    ) {

      localStorage.setItem(
        this.storageKey,

        JSON.stringify(
          this.configuration,
        ),
      );
    }


    this.showToast(
      'success',

      'Corporate risk rating settings have been saved successfully.',
    );
  }


  // ==================================================
  // CLEAR UNSAVED CHANGES
  // ==================================================

  protected clearChanges():
    void {

    this.configuration =
      this.loadConfiguration();


    this.showToast(
      'success',

      'Unsaved changes have been cleared.',
    );
  }


  // ==================================================
  // VALIDATION
  // ==================================================

  private validateWeightages():
    boolean {

    const sections = [

      {
        label:
          'Total AML Risk Rating',

        total:
          this.getTotalRiskWeight(),
      },

      {
        label:
          'Onboarding Risk',

        total:
          this.getOnboardingWeight(),
      },

      {
        label:
          'Transaction Risk',

        total:
          this.getTransactionWeight(),
      },

      {
        label:
          'Profile Risk',

        total:
          this.getProfileWeight(),
      },

    ];


    const invalidSection =
      sections.find(
        section =>
          section.total !==
          100,
      );


    if (
      invalidSection
    ) {

      this.showToast(
        'error',

        `${invalidSection.label} weightage must total exactly 100. Current total is ${invalidSection.total}.`,
      );


      return false;
    }


    return true;
  }


  // ==================================================
  // LOAD
  // ==================================================

  private loadConfiguration():
    CorporateRiskRatingConfiguration {

    if (
      typeof localStorage ===
      'undefined'
    ) {

      return (
        createDefaultCorporateRiskConfiguration()
      );
    }


    try {

      const stored =
        localStorage.getItem(
          this.storageKey,
        );


      if (!stored) {

        return (
          createDefaultCorporateRiskConfiguration()
        );
      }


      const parsed =
        JSON.parse(
          stored,
        );


      if (
        !parsed?.total ||
        !parsed?.onboarding ||
        !parsed?.transaction ||
        !parsed?.profile
      ) {

        return (
          createDefaultCorporateRiskConfiguration()
        );
      }


      return parsed;

    } catch {

      return (
        createDefaultCorporateRiskConfiguration()
      );
    }
  }


  // ==================================================
  // TOAST
  // ==================================================

  private showToast(
    type:
      'success'
      | 'error',

    message:
      string,
  ): void {

    if (
      this.toastTimer
    ) {

      clearTimeout(
        this.toastTimer,
      );
    }


    this.toast.set({
      type,
      message,
    });


    this.toastTimer =
      setTimeout(
        () => {

          this.toast.set(
            null,
          );


          this.toastTimer =
            null;

        },
        5000,
      );
  }


  // ==================================================
  // CLOSE TOAST
  // ==================================================

  protected closeToast():
    void {

    if (
      this.toastTimer
    ) {

      clearTimeout(
        this.toastTimer,
      );


      this.toastTimer =
        null;
    }


    this.toast.set(
      null,
    );
  }
}