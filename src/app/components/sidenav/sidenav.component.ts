import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  showSidenav: boolean = true;
  opened: boolean = false;


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Mostrar el sidenav solo si no está en las rutas de login o registro
        this.showSidenav = !(event.url === '/login' || event.url === '/list');
      }
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
