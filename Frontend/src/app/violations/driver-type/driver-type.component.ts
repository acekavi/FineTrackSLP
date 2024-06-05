import { Component } from '@angular/core';
import { MatUiModule } from '../../modules/matui.module';
import { Router } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';

@Component({
  selector: 'app-driver-type',
  standalone: true,
  imports: [
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './driver-type.component.html',
  styleUrl: './driver-type.component.scss'
})
export class DriverTypeComponent {
  constructor(private router: Router) { }
  onBackClick(): void {
    this.router.navigate(['/']);
  }

}
