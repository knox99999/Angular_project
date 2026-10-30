import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
export const authGuard: CanActivateFn = () => {
  const http = inject(HttpClient); const router = inject(Router);
  return http.get('http://localhost:3000/api/v1/auth/me', { withCredentials: true }).pipe(map(() => true), catchError(() => of(router.createUrlTree(['/login']))));
};
