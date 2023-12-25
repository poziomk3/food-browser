import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-in-url',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-in-url.component.html',
  styleUrl: './page-in-url.component.scss',
})
export class PageInUrlComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  router = inject(Router);
  paramsMap: Map<string, FormControl> = new Map<string, FormControl>();
  subscriptions: Subscription[] = [];
  ngOnInit(): void {
    if (this.paramsMap.size == 0)
      this.paramsMap.set('page', new FormControl(0));

    this.paramsMap.forEach((value, key, map) => {
      // You can mutate the value here
      map.set(key, this.route.snapshot.queryParams[key]);
      this.subscriptions.push(
        value.valueChanges.subscribe(newValue => {
          if (newValue != null) this.setRouteParams(newValue);
        })
      );
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  sub: Subscription | null = null;

  setRouteParams(arg: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.route.snapshot.queryParams, page: arg },
      queryParamsHandling: 'merge', // Keep existing query parameters
      replaceUrl: true, // Replace the current URL without adding a new entry to the browser history
    });
  }
}
