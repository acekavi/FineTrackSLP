import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { CitizenService } from 'src/app/services/citizen.service';
import { PopupLoginComponent } from 'src/app/shared/popup-login/popup-login.component';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [
    MatUiModule,
    IconsModule,
  ],
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.scss'
})
export class RoleSelectionComponent {
  constructor(public dialog: MatDialog, private router: Router, private citizenService: CitizenService) { }

  openLoginDialog(loginRole: 'Citizen' | 'Officer' | 'Station'): void {
    const dialogRef = this.dialog.open(PopupLoginComponent, {
      data: { role: loginRole },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        return;
      }
      console.log(result);
    });
  }
  onBackClick(): void {
    this.router.navigate(['/']);
  }
}
