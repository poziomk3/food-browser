import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FoodMainComponent } from './food-main.component'

describe('FoodMainComponent', () => {
  let component: FoodMainComponent
  let fixture: ComponentFixture<FoodMainComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodMainComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FoodMainComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
