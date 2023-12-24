import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatapaginationService {
  itemsPerPages$: BehaviorSubject<number> = new BehaviorSubject<number>(20);

  getPage<Type>(
    page$: Observable<number>,
    persistedData$: BehaviorSubject<Array<Type>>
  ): Observable<Array<Type>> {
    return page$.pipe(
      switchMap(page => {
        const startIndex = page * this.itemsPerPages$.value;
        const endIndex = startIndex + this.itemsPerPages$.value;
        return persistedData$.pipe(
          map(data => data.slice(startIndex, endIndex))
        );
      })
    );
  }

  setNumberOnPage(arg: number): void {
    this.itemsPerPages$.next(arg);
  }
  getNumberOnPage(): BehaviorSubject<number> {
    return this.itemsPerPages$;
  }
}
