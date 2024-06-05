import { Component } from '@angular/core';
import { IconsModule } from '../../modules/icons.module';
import { MatUiModule } from '../../modules/matui.module';
import { MatDialog } from '@angular/material/dialog';
import { PopupLanguageSelectionComponent } from '../../shared/popup-language-selection/popup-language-selection.component';
import { Router } from '@angular/router';
import { PopupRegistrationComponent } from 'src/app/shared/popup-registration/popup-registration.component';

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
  constructor(public dialog: MatDialog, private router: Router) { }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(PopupLanguageSelectionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'english') {
        this.router.navigate(['/login']);
      }
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(PopupRegistrationComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        return;
      }
    });
  }
}
