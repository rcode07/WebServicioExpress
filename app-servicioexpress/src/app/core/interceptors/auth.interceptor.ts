import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Obtener el token (asumimos que lo guardaste al hacer login)
  const token = localStorage.getItem('access_token');

  // 2. Si hay token, clonamos la petición para inyectarlo
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Pasamos la petición clonada
    return next(clonedRequest);
  }

  // 3. Si no hay token, pasamos la original (ej: para el login)
  return next(req);
};