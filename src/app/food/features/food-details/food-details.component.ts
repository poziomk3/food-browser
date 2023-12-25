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
  selector: 'app-food-details',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.scss',
})
export class FoodDetailsComponent implements OnInit, OnDestroy {
  selected = new FormControl(0);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    console.log('essa');
    const page = this.route.snapshot.queryParams['page'] || 0;
    this.selected.setValue(page);

    this.sub = this.selected.valueChanges.subscribe(newValue => {
      if (newValue != null) this.setRouteParams(newValue);
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
