import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private api: ApiService, private route: Router) { }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]]
  })
  loginUser() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      const userLogin = {
        email: email,
        password: password
      }
     this.api.userLogin(userLogin).subscribe({
      next: (res: any) => {
        console.log(res);
        sessionStorage.setItem("username",res.existingUser.username)
        sessionStorage.setItem("token",res.token)
        Swal.fire({
          title: "Good job!",
          text: "user Login successfull",
          icon: "success"
        });  
        this.api.updateCartCount()
        this.api.updateWishlistCount()
            this.route.navigateByUrl('')
      },
      error:(res:any)=>{        
        Swal.fire({
          title: "Error!",
          text: "loin failed",
          icon: "error"
        });
    }
     })
    }
  }
}
