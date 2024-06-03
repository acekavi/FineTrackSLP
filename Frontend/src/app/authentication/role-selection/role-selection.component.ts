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

  openLoginDialog(loginRole: string): void {
    const dialogRef = this.dialog.open(PopupLoginComponent, {
      data: { LoginInformation: loginRole }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'sinhala') {
        console.log('Sinhala selected');
      }
      if (result === 'english') {
        console.log('English selected');
      }
      if (result === 'tamil') {
        console.log('Tamil selected');
      }
    });
  }
  onBackClick(): void {
    this.router.navigate(['/']);
  }

  fetchUserDetails(): void {
    this.citizenService.getUserDetails().subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}
