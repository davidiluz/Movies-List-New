import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, LoginModule, SignUpComponent } from './pages/login';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[AuthGuard] },
  { path: 'sign-up', component: SignUpComponent ,canActivate:[AuthGuard] },
  {
    path: 'movies-list', canActivate: [AuthGuard], 
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  { path: '', redirectTo: 'movies-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
