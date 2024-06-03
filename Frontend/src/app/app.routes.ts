import { Routes } from '@angular/router';
import { HomeComponent } from './authentication/home/home.component';
import { RoleSelectionComponent } from './authentication/role-selection/role-selection.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: RoleSelectionComponent }
];
