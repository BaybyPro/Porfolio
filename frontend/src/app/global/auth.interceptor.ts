import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(UserService)
  const token = localStorage.getItem('token');

  if (token) {
    let decodedToken = jwtDecode(token);
    const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;
    if (isExpired) {
      localStorage.removeItem('token');
    }
  }
    const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(authReq)

};
