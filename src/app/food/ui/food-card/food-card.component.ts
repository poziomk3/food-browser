import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MaterialModule } from '../../../shared/material/material.service'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-food-card',
    standalone: true,
    imports: [MaterialModule, AsyncPipe],
    templateUrl: './food-card.component.html',
    styleUrl: './food-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodCardComponent {
    @Input()
    title?: string
    @Input()
    imgSrc?: string
    @Input()
    subtitle?: string
}
