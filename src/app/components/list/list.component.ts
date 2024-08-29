import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  registerForm: FormGroup;
  username: string = "";
  password: string = "";

  constructor(private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.valid) {
      const user = {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
      };

      localStorage.setItem("user", JSON.stringify(user));
      alert("Usuario registrado exitosamente");
      this.router.navigate(["/dashboard"]);
    } else {
      alert("Por favor, complete todos los campos");
    }
  }
}
