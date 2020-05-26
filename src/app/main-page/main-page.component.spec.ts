import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule } from '@angular/router/testing';
import { SafePipe } from '../safe.pipe';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        MainPageComponent,
        SafePipe
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // * Commented out for CI demo
  // */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // */
});
