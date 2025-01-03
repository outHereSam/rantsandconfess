import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.sass',
})
export class HomepageComponent {}
