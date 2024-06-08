import { Routes } from '@angular/router';
import { HomeComponent } from './authentication/home/home.component';
import { RoleSelectionComponent } from './authentication/role-selection/role-selection.component';
import { checkCitizenAuth, checkOfficerAuth, checkStationAuth, checkUnauth } from './services/router-guard.service';
import { OfficerDashboardComponent } from './officer/dashboard/dashboard.component';
import { OfficerTypeSelectionComponent } from './officer/type-selection/type-selection.component';
import { OfficerLayoutComponent } from './officer/layout/layout.component';
import { PedestrianTypeComponent } from './officer/pedestrian-type/pedestrian-type.component';
import { DriverTypeComponent } from './officer/driver-type/driver-type.component';
import { StationLayoutComponent } from './station/main-layout/main-layout.component';
import { OfficersDashboardComponent } from './station/officers-dashboard/officers-dashboard.component';
import { CasesDashboardComponent } from './station/cases-dashboard/cases-dashboard.component';
import { CitizenDashboardComponent } from './citizen/dashboard/dashboard.component';
import { PaymentDetailsComponent } from './citizen/payment-details/payment-details.component';
import { CardDetailsComponent } from './citizen/card-details/card-details.component';
import { CitizenLayoutComponent } from './citizen/layout/layout.component';
import { CitizenTypeSelectionComponent } from './citizen/type-selection/type-selection.component';


export const routes: Routes = [
    { path: '', canActivate: [checkUnauth], component: HomeComponent },
    { path: 'login', canActivate: [checkUnauth], component: RoleSelectionComponent },
    {
        path: 'citizen',
        component: CitizenLayoutComponent,
        canActivateChild: [checkCitizenAuth],
        children: [
            { path: '', redirectTo: 'type-selection', pathMatch: 'full' },
            { path: 'type-selection', component: CitizenTypeSelectionComponent },
            { path: 'payment', component: PaymentDetailsComponent },
            { path: 'payment/card', component: CardDetailsComponent },
        ]
    },
    { path: 'citizen/dashboard', component: CitizenDashboardComponent, canActivate: [checkCitizenAuth] },
    {
        path: 'station',
        component: StationLayoutComponent,
        canActivateChild: [checkStationAuth],
        children: [
            { path: '', redirectTo: 'officers', pathMatch: 'full' },
            { path: 'officers', component: OfficersDashboardComponent },
            { path: 'cases', component: CasesDashboardComponent },
        ]
    },
    {
        path: 'officer',
        component: OfficerLayoutComponent,
        canActivate: [checkOfficerAuth],
        children: [
            { path: '', redirectTo: 'type-selection', pathMatch: 'full' },
            {
                path: 'type-selection',
                children: [
                    { path: '', component: OfficerTypeSelectionComponent },
                    { path: 'driver', component: DriverTypeComponent },
                    { path: 'pedestrian', component: PedestrianTypeComponent },
                ]
            },
        ]
    },
    { path: 'officer/pedestrian/:id/dashboard', component: OfficerDashboardComponent, canActivate: [checkOfficerAuth] },
    { path: 'officer/driver/:id/dashboard', component: OfficerDashboardComponent, canActivate: [checkOfficerAuth] },
    { path: '**', redirectTo: '' }
];
