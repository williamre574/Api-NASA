import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required] 
    });
  }

  ngOnInit(): void {

   }


   login(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (this.authService.login(username, password)) {
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
  }
  navigateToRegister() {
    // Redirige al usuario a la página de registro (en este caso, 'list' que podría ser tu página de registro)
    this.router.navigate(['/list']);
  }

}
