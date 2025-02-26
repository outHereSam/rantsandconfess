import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ConfessionsService } from '../../core/services/confessions.service';
import { Confession } from '../../core/models/Confession.model';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-confess',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './confess.component.html',
  styleUrl: './confess.component.sass',
})
export class ConfessComponent {
  fb = inject(FormBuilder);
  confessionsService = inject(ConfessionsService);

  isLoading: boolean = false;

  confessForm: FormGroup = this.fb.group({
    message: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.confessForm.valid) {
      this.isLoading = true;
      const { message } = this.confessForm.value;
      const data: Confession = {
        message: message,
      };
      this.confessionsService.createConfession(data).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
      });
    } else {
      this.confessForm.markAllAsTouched();
    }
  }
}
