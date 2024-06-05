import { Routes } from '@angular/router';
import { HomeComponent } from './authentication/home/home.component';
import { RoleSelectionComponent } from './authentication/role-selection/role-selection.component';
import { PedestrianTypeComponent } from './violations/pedestrian-type/pedestrian-type.component';
import { DriverTypeComponent } from './violations/driver-type/driver-type.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: RoleSelectionComponent },
    { path: 'pedestrian', component: PedestrianTypeComponent },
    { path: 'driver', component: DriverTypeComponent },
];
