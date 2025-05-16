import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home/home.component';
import { ConsultaDashboardComponent } from './Components/Dashboard/consulta-dashboard/consulta-dashboard.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent   },
  {path: 'dashboard', component: ConsultaDashboardComponent},
];
