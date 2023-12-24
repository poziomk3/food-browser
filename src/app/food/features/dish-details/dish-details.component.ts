import { AsyncPipe, JsonPipe } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
    Observable,
    Subscription,
    combineLatest,
    map,
    switchMap,
    tap,
} from 'rxjs'
import {
    DishesService,
    MealWithDetails,
} from '../../data-access/dishes.service'
import { MaterialModule } from '../../../shared/material/material.service'
import { SeparatePipe } from '../../utils/separate.pipe'
import { YouTubePlayerModule } from '@angular/youtube-player'
import { ExtractYoutubeIdPipe } from '../../utils/extract-youtube-id.pipe'
import { IngredientService } from '../../data-access/ingredient.service'
import { Product } from '../../data-access/ingredient.service'
import { FoodCardComponent } from '../../ui/food-card/food-card.component'

@Component({
    selector: 'app-dish-details',
    standalone: true,
    templateUrl: './dish-details.component.html',
    styleUrl: './dish-details.component.scss',
    imports: [
        AsyncPipe,
        JsonPipe,
        MaterialModule,
        SeparatePipe,
        YouTubePlayerModule,
        ExtractYoutubeIdPipe,
        FoodCardComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishDetailsComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private dishesService: DishesService,
        private ingredientService: IngredientService
    ) {}
    ngOnDestroy(): void {
        this.id?.unsubscribe()
    }
    id?: Subscription | null = null
    dishDetails$: Observable<MealWithDetails> | null = null
    ingredients$: Observable<Array<[Product, string]>> | null = null
    ngOnInit(): void {
        // const tag = document.createElement('script');

        // tag.src = 'https://www.youtube.com/iframe_api';
        // document.body.appendChild(tag);
        this.id = this.route.params
            .pipe(
                map((params) => params['id']),
                tap((id) => {
                    this.dishDetails$ = this.dishesService
                        .getDishDetails(id)
                        .pipe(tap((data) => console.log(data)))

                    this.ingredients$ = this.dishDetails$.pipe(
                        switchMap((data) => {
                            const measures: string[] = []
                            return combineLatest(
                                Object.entries(data)
                                    .filter(
                                        ([key, value]: [string, string]) => {
                                            if (
                                                key.includes(`strMeasure`) &&
                                                value
                                            )
                                                measures.push(value)
                                            return (
                                                key.includes('strIngredient') &&
                                                value
                                            )
                                        }
                                    )
                                    .map(
                                        (
                                            [, value]: [string, string],
                                            index: number
                                        ) =>
                                            this.ingredientService
                                                .getProductDetailsByName(value)
                                                .pipe(
                                                    map(
                                                        (
                                                            product
                                                        ): [
                                                            Product,
                                                            string,
                                                        ] => {
                                                            return [
                                                                product,
                                                                measures[index],
                                                            ]
                                                        }
                                                    )
                                                )
                                    )
                            )
                        })
                    )
                })
            )
            .subscribe()
    }
}
