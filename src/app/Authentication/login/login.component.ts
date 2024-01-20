import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/_Models/LoginDto';
import { AuthService } from 'src/app/_Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showError = false;
  constructor(private authService: AuthService, public router: Router) { }
  form = new FormGroup({
    UserName: new FormControl<string>('', Validators.required),
    Password: new FormControl<string>('', Validators.required),
  });
  get UserName() {
    return this.form.get('UserName');
  }
  get Password() {
    return this.form.get('Password');
  }
  handleSubmit(e: Event) {
    e.preventDefault();
    var credentials = new LoginDto();
    credentials.UserName = this.form.controls.UserName.value ?? '';
    credentials.Password = this.form.controls.Password.value ?? '';

    this.authService.login(credentials).subscribe({
      next: (Token) => {
        console.log(Token);
        localStorage.setItem("Token", Token.token);
        this.authService.isAuth$.next({ isauth: true });
        console.log(Token.role);
        this.router.navigateByUrl("customer/view");
      }, error: () => {
        this.showError = true;
      }
    });
  }
  getToken(e: Event) {
    const t = localStorage.getItem("Token");
    if (t != null) {
      const tokenData = atob(t.split('.')[1]);
      const tokenObject = JSON.parse(tokenData);
      const userId = tokenObject["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      console.log(userId);
    }
  }
}
