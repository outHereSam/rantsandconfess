import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const payload = {
        email: formValues.email,
        password: formValues.password,
      };

      this.authService.login(payload).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
    }
  }
}
