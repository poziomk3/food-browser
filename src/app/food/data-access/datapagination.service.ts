import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, combineLatest, of, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DatapaginationService {
  itemsPerPages$: BehaviorSubject<number> = new BehaviorSubject<number>(20)
  constructor() {}

  getPage<Type>(
    page$: Observable<number>,
    persistedData$: BehaviorSubject<Array<Type>>
  ): Observable<Array<Type>> {
    return combineLatest([persistedData$, page$]).pipe(
      switchMap(([ingredients, page]) => {
        const startIndex = page * this.itemsPerPages$.value
        const endIndex = startIndex + this.itemsPerPages$.value
        return of(ingredients.slice(startIndex, endIndex))
      })
    )
  }

  setNumberOnPage(arg: number): void {
    this.itemsPerPages$.next(arg)
  }
  getNumberOnPage(): BehaviorSubject<number> {
    return this.itemsPerPages$
  }
}
