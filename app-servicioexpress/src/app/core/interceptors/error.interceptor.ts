import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Inyectamos el Router para redirigir

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // Si el Backend dice "401 Unauthorized"
      if (error.status === 401) {
        // 1. Borramos el token vencido (limpieza)
        localStorage.removeItem('access_token'); 
        
        // 2. Redirigimos al login
        router.navigate(['/login']);
      }
      
      // Propagamos el error por si algún componente quiere mostrar una alerta específica
      return throwError(() => error);
    })
  );
};