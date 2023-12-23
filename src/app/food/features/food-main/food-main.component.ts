import { Component, DoCheck,  OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.service';

@Component({
  selector: 'app-food-main',
  standalone: true,
  imports: [RouterModule, MaterialModule],
  templateUrl: './food-main.component.html',
  styleUrl: './food-main.component.scss',
})
export class FoodMainComponent implements DoCheck, OnInit {
  activePage?: string | null;
  constructor(private router: Router) {}

  activateRoute() {
    this.activePage = this.router.url.split('/')[2];
  }
  ngOnInit(): void {
    this.activateRoute();
  }
  ngDoCheck(): void {
    this.activateRoute();
  }
}
