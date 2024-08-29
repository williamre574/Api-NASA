import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private isAuthenticated = false;

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.username === username && user.password === password) {
        this.isAuthenticated = true;
        localStorage.setItem('isLoggedIn', 'true'); // Guarda el estado de autenticación en localStorage
        this.router.navigate(['/sidenav']); // Redirige al sidenav después de iniciar sesión
        return true;
      }
    }

    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
