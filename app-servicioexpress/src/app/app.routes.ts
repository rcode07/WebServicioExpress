import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientRegisterComponent } from './pages/client-register/client-register.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { authGuard } from './core/guards/auth.guard';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { ClientEditComponent } from './pages/client-edit/client-edit.component';
import { ConfirmationSaveCustomerComponent } from './pages/confirmation-save-customer/confirmation-save-customer.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Servicio Express - Login' },
    { path: 'dashboard', component: DashboardComponent, title: 'Panel de control', canActivate : [authGuard] },
    { path: 'register', component: ClientRegisterComponent, title: 'Registrar nuevo cliente', canActivate : [authGuard] },
    { path: 'client-detail/:id', component: ClientDetailComponent, title: 'Detalle del cliente', canActivate : [authGuard] },
    { path: 'client-edit/:id', component: ClientEditComponent, title: 'Editar cliente', canActivate : [authGuard] },
    { path: 'confirmation', component: ConfirmationComponent, title: 'Registro exitoso', canActivate : [authGuard] },
    { path: 'confirmation-client', component: ConfirmationSaveCustomerComponent, title: 'Registro exitoso', canActivate : [authGuard] },
    { path: 'dashboard-admin', component : DashboardAdminComponent, title: 'Panel de control - Admin', canActivate : [authGuard] },
    { path: 'consultant-create', component: CreateUserComponent, title: 'Crear consultor', canActivate : [authGuard] }
];