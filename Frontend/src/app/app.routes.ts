import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PedestrianTypeComponent } from './violations/pedestrian-type/pedestrian-type.component';
import { DriverTypeComponent } from './violations/driver-type/driver-type.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pedestrian', component: PedestrianTypeComponent },
    { path: 'driver', component: DriverTypeComponent },
];
