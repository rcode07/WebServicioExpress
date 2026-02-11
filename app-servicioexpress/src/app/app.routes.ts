import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientRegisterComponent } from './pages/client-register/client-register.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Servicio Express - Login' },
    { path: 'dashboard', component: DashboardComponent, title: 'Panel de control' },
    { path: 'register', component: ClientRegisterComponent, title: 'Registrar nuevo cliente' },
    { path: 'client-detail/:id', component: ClientDetailComponent, title: 'Detalle del cliente' },
    { path: 'confirmation', component: ConfirmationComponent, title: 'Registro exitoso' },
];