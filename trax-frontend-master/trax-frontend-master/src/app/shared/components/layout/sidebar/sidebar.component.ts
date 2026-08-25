import {
  NgTemplateOutlet,
} from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import {
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';

import {
  LucideChevronRight,
  LucideDynamicIcon,
  LucideLogOut,
} from '@lucide/angular';

import {
  filter,
  Subscription,
} from 'rxjs';

import {
  SidebarMenuItem,
} from '@app/shared/interfaces/shared.interfaces';


@Component({
  selector: 'app-sidebar',

  standalone: true,

  imports: [
    RouterLink,
    NgTemplateOutlet,
    LucideDynamicIcon,
  ],

  templateUrl:
    './sidebar.component.html',

  styleUrl:
    './sidebar.component.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class Sidebar
  implements OnInit, OnDestroy
{
  @Input()
  menuItems:
    SidebarMenuItem[] = [];


  @Input()
  isSidebarOpen = true;


  // ==================================================
  // CURRENT ROUTE
  // ==================================================

  readonly currentUrl =
    signal('');


  // ==================================================
  // OPEN FLYOUT PATH
  // ==================================================

  readonly openFlyoutPath =
    signal<string[]>([]);


  // ==================================================
  // ICONS
  // ==================================================

  protected readonly logoutIcon =
    LucideLogOut;

  protected readonly chevronRightIcon =
    LucideChevronRight;


  private routerSubscription?:
    Subscription;


  constructor(
    private readonly router: Router,
  ) {}


  // ==================================================
  // INIT
  // ==================================================

  ngOnInit(): void {
    this.currentUrl.set(
      this.cleanUrl(
        this.router.url,
      ),
    );


    this.routerSubscription =
      this.router.events
        .pipe(
          filter(
            (
              event,
            ): event is NavigationEnd =>
              event instanceof
              NavigationEnd,
          ),
        )
        .subscribe(event => {
          this.currentUrl.set(
            this.cleanUrl(
              event.urlAfterRedirects,
            ),
          );


          /*
           * Close flyouts after navigation.
           */
          this.closeFlyouts();
        });
  }


  // ==================================================
  // DESTROY
  // ==================================================

  ngOnDestroy(): void {
    this.routerSubscription
      ?.unsubscribe();
  }


  // ==================================================
  // ACTIVE ITEM
  // ==================================================

  isMenuItemActive(
    item: SidebarMenuItem,
  ): boolean {
    const currentUrl =
      this.currentUrl();


    // ================================================
    // DIRECT ROUTE
    // ================================================

    if (
      item.route &&
      this.isRouteActive(
        item.route,
        currentUrl,
      )
    ) {
      return true;
    }


    // ================================================
    // CHILD ROUTE
    // ================================================

    if (
      item.children &&
      item.children.length > 0
    ) {
      return item.children.some(
        child =>
          this.isMenuItemActive(
            child,
          ),
      );
    }


    return false;
  }


  // ==================================================
  // ROOT HOVER
  // ==================================================

  protected onRootItemEnter(
    item: SidebarMenuItem,
  ): void {
    if (
      item.children &&
      item.children.length > 0
    ) {
      this.openAtDepth(
        item.id,
        0,
      );

      return;
    }


    this.closeFlyouts();
  }


  // ==================================================
  // NESTED HOVER
  // ==================================================

  protected onNestedItemEnter(
    item: SidebarMenuItem,
    depth: number,
  ): void {
    if (
      item.children &&
      item.children.length > 0
    ) {
      this.openAtDepth(
        item.id,
        depth,
      );

      return;
    }


    /*
     * Leaf item:
     * close deeper flyouts while
     * keeping parent flyouts open.
     */
    this.openFlyoutPath.update(
      path =>
        path.slice(
          0,
          depth,
        ),
    );
  }


  // ==================================================
  // CLICK TOGGLE
  // ==================================================

  protected toggleFlyout(
    itemId: string,
    depth: number,
    event?: MouseEvent,
  ): void {
    event?.preventDefault();
    event?.stopPropagation();


    const current =
      this.openFlyoutPath();


    if (
      current[depth] ===
      itemId
    ) {
      this.openFlyoutPath.set(
        current.slice(
          0,
          depth,
        ),
      );

      return;
    }


    this.openAtDepth(
      itemId,
      depth,
    );
  }


  // ==================================================
  // OPEN AT DEPTH
  // ==================================================

  private openAtDepth(
    itemId: string,
    depth: number,
  ): void {
    const current =
      this.openFlyoutPath();


    const next =
      current.slice(
        0,
        depth,
      );


    next[depth] =
      itemId;


    this.openFlyoutPath.set(
      next,
    );
  }


  // ==================================================
  // IS FLYOUT OPEN
  // ==================================================

  protected isFlyoutOpen(
    itemId: string,
    depth: number,
  ): boolean {
    return (
      this.openFlyoutPath()[
        depth
      ] === itemId
    );
  }


  // ==================================================
  // CLOSE FLYOUTS
  // ==================================================

  protected closeFlyouts(): void {
    this.openFlyoutPath.set(
      [],
    );
  }


  // ==================================================
  // LOGOUT
  // ==================================================

  logout(): void {
    sessionStorage.removeItem(
      'traxBlockedRecoveryFlow',
    );

    sessionStorage.removeItem(
      'traxOtpIncorrectAttempts',
    );

    sessionStorage.removeItem(
      'traxOtpLockedUntil',
    );


    this.closeFlyouts();


    this.router.navigateByUrl(
      '/login',
    );
  }


  // ==================================================
  // ROUTE ACTIVE
  // ==================================================

  private isRouteActive(
    route: string,
    currentUrl: string,
  ): boolean {
    const cleanRoute =
      this.cleanUrl(route);


    if (
      currentUrl ===
      cleanRoute
    ) {
      return true;
    }


    return currentUrl.startsWith(
      `${cleanRoute}/`,
    );
  }


  // ==================================================
  // CLEAN URL
  // ==================================================

  private cleanUrl(
    url: string,
  ): string {
    return url
      .split('?')[0]
      .split('#')[0]
      .replace(/\/+$/, '');
  }
}