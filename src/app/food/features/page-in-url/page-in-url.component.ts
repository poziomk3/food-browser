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
    this.addQueryParam('page');
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  setRouteParams(params: { [key: string]: unknown }) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        ...params,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  // Function to add a new query parameter with an optional default value
  addQueryParam(param: string, defaultValue: string | null = null) {
    if (!this.paramsMap.has(param)) {
      const control = new FormControl(defaultValue);
      this.paramsMap.set(param, control);
      this.subscriptions.push(
        control.valueChanges.subscribe(value => {
          const obj: { [key: string]: string } = {};
          this.paramsMap.forEach((value, key) => {
            obj[key] = value.value;
          });
          if (value != null) obj[param] = value;
          this.setRouteParams(obj);
        })
      );
      // Update the value when a new control is added
      const snapshotValue = this.route.snapshot.queryParams[param];
      if (control && snapshotValue !== undefined) {
        control.setValue(snapshotValue);
      }
    }
  }
}
