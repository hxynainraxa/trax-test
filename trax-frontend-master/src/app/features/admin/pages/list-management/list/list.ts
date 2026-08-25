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
  LucideDynamicIcon,
  LucideRotateCcw,
  LucideSave,
  LucideSearch,
  LucideTriangleAlert,
  LucideX,
} from '@lucide/angular';

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
  ListStoreService,
} from '../list-store.service';

import {
  ListFormData,
  ManagedList,
} from '../list-data';


// ==================================================
// TAB
// ==================================================

type ListTab =
  | 'add'
  | 'edit'
  | 'search';


// ==================================================
// TOAST
// ==================================================

type ToastType =
  | 'success'
  | 'error';


interface ToastState {
  type: ToastType;

  message: string;
}


// ==================================================
// TABLE ROW
// ==================================================

interface ListTableRow
  extends ManagedList {

  slNo: number;
}


@Component({
  selector:
    'app-list-management-list',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './list.html',

  styleUrl:
    './list.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ListManagementList
  extends BasePage
  implements OnDestroy
{

  // ==================================================
  // ICONS
  // ==================================================

  protected readonly saveIcon =
    LucideSave;

  protected readonly searchIcon =
    LucideSearch;

  protected readonly resetIcon =
    LucideRotateCcw;

  protected readonly successIcon =
    LucideCheckCircle2;

  protected readonly errorIcon =
    LucideTriangleAlert;

  protected readonly closeIcon =
    LucideX;


  // ==================================================
  // TAB
  // ==================================================

  protected readonly activeTab =
    signal<ListTab>(
      'add',
    );


  // ==================================================
  // TOAST
  // ==================================================

  protected readonly toast =
    signal<ToastState | null>(
      null,
    );


  private toastTimer:
    ReturnType<
      typeof setTimeout
    > | null = null;


  // ==================================================
  // ADD FORM
  // ==================================================

  protected addForm:
    ListFormData = {

      code: '',

      name: '',
    };


  // ==================================================
  // SEARCH FORM
  // ==================================================

  protected searchCode =
    '';


  // ==================================================
  // EDIT SEARCH
  // ==================================================

  protected editSearchCode =
    '';


  // ==================================================
  // EDIT FORM
  // ==================================================

  protected editingId:
    number | null = null;


  protected editForm:
    ListFormData = {

      code: '',

      name: '',
    };


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    ListTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      ListTableRow
    >[] = [

      {
        key: 'slNo',

        header: 'Sl.No',

        width: '12%',

        sortable: false,
      },


      {
        key: 'code',

        header: 'List Code',

        width: '28%',

        sortable: true,
      },


      {
        key: 'name',

        header: 'List Name',

        width: '60%',

        sortable: true,
      },

    ];


  // ==================================================
  // CONSTRUCTOR
  // ==================================================

  constructor(
    protected readonly listStore:
      ListStoreService,
  ) {
    super();
  }


  // ==================================================
  // DESTROY
  // ==================================================

  ngOnDestroy(): void {

    if (
      this.toastTimer
    ) {
      clearTimeout(
        this.toastTimer,
      );
    }
  }


  // ==================================================
  // CHANGE TAB
  // ==================================================

  protected setTab(
    tab: ListTab,
  ): void {

    this.activeTab.set(
      tab,
    );


    this.clearResultState();


    if (
      tab !== 'edit'
    ) {
      this.resetEdit();
    }
  }


  // ==================================================
  // ADD
  // ==================================================

  protected saveList():
    void {

    const result =
      this.listStore
        .addList(
          this.addForm,
        );


    if (
      !result.success
    ) {

      this.showToast(
        'error',

        result.message,
      );

      return;
    }


    this.showToast(
      'success',

      result.message,
    );


    this.clearAddForm();
  }


  // ==================================================
  // CLEAR ADD
  // ==================================================

  protected clearAddForm():
    void {

    this.addForm = {
      code: '',
      name: '',
    };
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected searchLists():
    void {

    const lists =
      this.listStore.search(
        this.searchCode,
      );


    this.results =
      this.toTableRows(
        lists,
      );


    this.hasSearched =
      true;
  }


  // ==================================================
  // RESET SEARCH
  // ==================================================

  protected resetSearch():
    void {

    this.searchCode =
      '';

    this.clearResultState();
  }


  // ==================================================
  // FIND FOR EDIT
  // ==================================================

  protected findForEdit():
    void {

    const code =
      this.editSearchCode
        .trim();


    if (!code) {

      this.showToast(
        'error',

        'List Code is required.',
      );

      return;
    }


    const list =
      this.listStore
        .findByCode(
          code,
        );


    if (!list) {

      this.editingId =
        null;


      this.editForm = {
        code: '',
        name: '',
      };


      this.showToast(
        'error',

        'No list found with this List Code.',
      );


      return;
    }


    this.editingId =
      list.id;


    this.editForm = {
      code: list.code,

      name: list.name,
    };
  }


  // ==================================================
  // UPDATE
  // ==================================================

  protected updateList():
    void {

    if (
      this.editingId ===
      null
    ) {

      this.showToast(
        'error',

        'Search for a list before updating.',
      );

      return;
    }


    const result =
      this.listStore
        .updateList(
          this.editingId,

          this.editForm,
        );


    if (
      !result.success
    ) {

      this.showToast(
        'error',

        result.message,
      );

      return;
    }


    this.showToast(
      'success',

      result.message,
    );


    this.resetEdit();
  }


  // ==================================================
  // RESET EDIT
  // ==================================================

  protected resetEdit():
    void {

    this.editSearchCode =
      '';


    this.editingId =
      null;


    this.editForm = {
      code: '',
      name: '',
    };
  }


  // ==================================================
  // TABLE ROWS
  // ==================================================

  private toTableRows(
    lists: ManagedList[],
  ): ListTableRow[] {

    return lists.map(
      (
        item,
        index,
      ) => ({
        ...item,

        slNo:
          index + 1,
      }),
    );
  }


  // ==================================================
  // CLEAR RESULT
  // ==================================================

  private clearResultState():
    void {

    this.results =
      [];


    this.hasSearched =
      false;
  }


  // ==================================================
  // TOAST
  //
  // Exactly 5 seconds.
  // ==================================================

  private showToast(
    type: ToastType,

    message: string,
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