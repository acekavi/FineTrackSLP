import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatUiModule } from './shared/material-ui/matui.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatUiModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
}
