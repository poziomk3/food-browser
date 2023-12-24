import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { DatapaginationService } from './datapagination.service'
export interface Product {
    idIngredient: number
    strIngredient: string
    strDescription: string | null
    strType: string | null
}
export interface IngredientsDTO {
    meals: Array<Product>
}

@Injectable({
    providedIn: 'root',
})
export class IngredientService {
    private paginator: DatapaginationService
    constructor(private http: HttpClient) {
        this.paginator = new DatapaginationService()
    }

    persistedData$: BehaviorSubject<Array<Product>> = new BehaviorSubject<
        Array<Product>
    >([])

    fetchAPI(): void {
        const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
        this.http
            .get<IngredientsDTO>(url)
            .pipe(
                map((data) => data.meals),
                tap((ingredients) => {
                    this.persistedData$.next(ingredients)
                })
            )
            .subscribe()
    }

    getProductDetailsByName(strName: string): Observable<Product> {
        if (this.persistedData$.value.length === 0) this.fetchAPI()
        return this.persistedData$.pipe(
            map(
                (ingredients) =>
                    ingredients.find(
                        (ingredient) => ingredient.strIngredient === strName
                    ) ?? {
                        idIngredient: 0,
                        strIngredient: '',
                        strDescription: '',
                        strType: '',
                    }
            )
        )
    }
    getProductDetailsById(id: number): Observable<Product> {
        if (this.persistedData$.value.length === 0) this.fetchAPI()
        return this.persistedData$.pipe(
            map(
                (ingredients) =>
                    ingredients.find(
                        (ingredient) => ingredient.idIngredient === id
                    ) ?? {
                        idIngredient: 0,
                        strIngredient: '',
                        strDescription: '',
                        strType: '',
                    }
            )
        )
    }
    getPage(page$: Observable<number>): Observable<Array<Product>> {
        if (this.persistedData$.value.length === 0) this.fetchAPI()
        return this.paginator.getPage(page$, this.persistedData$)
    }

    getFullLength(): Observable<number> {
        if (this.persistedData$.value.length === 0) this.fetchAPI()
        return this.persistedData$.pipe(
            map((ingredients) => ingredients.length)
        )
    }

    setNumberOnPage(arg: number): void {
        this.paginator.setNumberOnPage(arg)
    }
    getNumberOnPage(): BehaviorSubject<number> {
        return this.paginator.getNumberOnPage()
    }
}
