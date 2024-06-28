import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have required error when email is empty', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.errors?.['required']).toBeTruthy();
  });

  it('should have minLength and pattern error when email is invalid', () => {
    let email = component.loginForm.controls['email'];
    email.setValue('a@b');
    expect(email.errors?.['minlength']).toBeTruthy();
    email.setValue('a');
    expect(email.errors?.['email']).toBeTruthy();
  });

  it('should have required error when password is empty', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.errors?.['required']).toBeTruthy();
  });

  it('should have minLength error when password is less than 8 characters', () => {
    let password = component.loginForm.controls['password'];
    password.setValue('12345');
    expect(password.errors?.['minlength']).toBeTruthy();
  });

  it('should submit the form when valid', () => {
    let email = component.loginForm.controls['email'];
    let password = component.loginForm.controls['password'];

    email.setValue('test@example.com');
    password.setValue('12345678');

    expect(component.loginForm.valid).toBeTruthy();

    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    fixture.detectChanges();

    expect(component.loginForm.valid).toBeTruthy();
    expect(component.loginForm.value).toEqual({ email: 'test@example.com', password: '12345678' });
  });
});
