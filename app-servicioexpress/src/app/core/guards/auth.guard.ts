import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 1. Verificamos si existe el token
  const token = localStorage.getItem('access_token');

  if (token) {
    // Aquí podrías agregar lógica extra (ej: decodificar JWT para ver roles)
    return true; // ¡Pase usted!
  } else {
    // 2. Si no hay token, al Login
    router.navigate(['/login']);
    return false; // Acceso denegado
  }
};