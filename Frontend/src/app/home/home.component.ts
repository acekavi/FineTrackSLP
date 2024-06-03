import { Component } from '@angular/core';
import { IconsModule } from '../modules/icons.module';
import { MatUiModule } from '../modules/matui.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatUiModule,
    IconsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
