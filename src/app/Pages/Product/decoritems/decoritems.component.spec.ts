import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoritemsComponent } from './decoritems.component';

describe('DecoritemsComponent', () => {
  let component: DecoritemsComponent;
  let fixture: ComponentFixture<DecoritemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoritemsComponent]
    });
    fixture = TestBed.createComponent(DecoritemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
