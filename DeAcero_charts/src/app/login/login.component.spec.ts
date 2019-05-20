import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LoginComponent
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
