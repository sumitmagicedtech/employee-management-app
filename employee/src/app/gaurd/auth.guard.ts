// src/app/gaurd/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const AuthGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isLoggedIn().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        // Redirect logic could go here, e.g., using Router to navigate to login
        // const router = inject(Router);
        // router.navigate(['/login']);
      }
      return isLoggedIn;
    })
  );
};
