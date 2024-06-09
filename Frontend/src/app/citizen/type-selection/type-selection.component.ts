import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';

@Component({
  selector: 'app-type-selection',
  standalone: true,
  imports: [
    RouterModule,
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './type-selection.component.html',
  styleUrl: './type-selection.component.scss'
})
export class CitizenTypeSelectionComponent {
  constructor(
    private router: Router
  ) { }

  navigateToPayments() {
    this.router.navigate(['/citizen/payment']);
  }

  navigateToDashboard() {
    this.router.navigate(['/citizen/dashboard']);
  }
}
