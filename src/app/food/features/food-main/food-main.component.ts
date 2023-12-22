import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.service';

@Component({
  selector: 'app-food-main',
  standalone: true,
  imports: [RouterModule,MaterialModule],
  templateUrl: './food-main.component.html',
  styleUrl: './food-main.component.scss'
})
export class FoodMainComponent {

}
