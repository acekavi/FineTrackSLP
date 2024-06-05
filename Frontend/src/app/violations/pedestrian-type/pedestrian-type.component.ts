import { Component } from '@angular/core';
import { MatUiModule } from '../../modules/matui.module';
import { IconsModule } from 'src/app/modules/icons.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedestrian-type',
  standalone: true,
  imports: [
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './pedestrian-type.component.html',
  styleUrl: './pedestrian-type.component.scss'
})
export class PedestrianTypeComponent {
  constructor(
    private router: Router
  ) { }
  onBackClick(): void {
    this.router.navigate(['/officer/dashboard']);
  }
}
