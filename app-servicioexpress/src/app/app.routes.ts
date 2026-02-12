import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientRegisterComponent } from './pages/client-register/client-register.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Servicio Express - Login' },
    { path: 'dashboard', component: DashboardComponent, title: 'Panel de control', canActivate : [authGuard] },
    { path: 'register', component: ClientRegisterComponent, title: 'Registrar nuevo cliente', canActivate : [authGuard] },
    { path: 'client-detail/:id', component: ClientDetailComponent, title: 'Detalle del cliente', canActivate : [authGuard] },
    { path: 'confirmation', component: ConfirmationComponent, title: 'Registro exitoso', canActivate : [authGuard] },
];