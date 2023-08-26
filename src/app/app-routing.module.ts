import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mant', loadChildren: () => import('./pages/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
  { path: '', loadChildren: () => import('./pages/seguridad/seguridad.module').then(m => m.SeguridadModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
