import { Routes } from '@angular/router';
import { HomeComponent } from './authentication/home/home.component';
import { RoleSelectionComponent } from './authentication/role-selection/role-selection.component';
import { PedestrianTypeComponent } from './violations/pedestrian-type/pedestrian-type.component';
import { DriverTypeComponent } from './violations/driver-type/driver-type.component';
import { checkAuth, checkCitizenAuth, checkOfficerAuth, checkStationAuth, checkUnauth } from './services/router-guard.service';
import { DashboardComponent } from './station/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', canActivate: [checkUnauth], component: HomeComponent },
    { path: 'login', canActivate: [checkUnauth], component: RoleSelectionComponent },
    { path: 'citizen', redirectTo: 'citizen/pedestrian', pathMatch: 'full' },
    {
        path: 'citizen',
        canActivateChild: [checkCitizenAuth],
        children: [
            { path: 'pedestrian', component: PedestrianTypeComponent },
            { path: 'driver', component: DriverTypeComponent },
        ]
    },
    // Add other routes for officers or other roles here
    { path: 'station', redirectTo: 'station/dashboard', pathMatch: 'full', canActivateChild: [checkStationAuth] },
    {
        path: 'station',
        canActivateChild: [checkStationAuth],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'pedestrian', component: PedestrianTypeComponent },
            { path: 'driver', component: DriverTypeComponent },
        ]
    },
    { path: 'officer', redirectTo: 'officer/dashboard', pathMatch: 'full' },
    {
        path: 'officer',
        canActivateChild: [checkOfficerAuth],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'pedestrian', component: PedestrianTypeComponent },
            { path: 'driver', component: DriverTypeComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
