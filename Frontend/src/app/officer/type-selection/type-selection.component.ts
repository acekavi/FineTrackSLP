import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
export class TypeSelectionComponent {

}
