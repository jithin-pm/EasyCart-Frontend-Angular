import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //inject formBuilder
  constructor(private fb: FormBuilder, private api: ApiService , private route:Router) { }
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-z]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]]
  })
  registerUser() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const user = {
        username: username,
        password: password,
        email: email
      }
      this.api.userRegistration(user).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: "Good job!",
            text: "Registration successfull",
            icon: "success"
          });  
          this.route.navigateByUrl('/login')     
        },
        error:(res:any)=>{        
          Swal.fire({
            title: "Error!",
            text: "Failed to register",
            icon: "error"
          });
      }

      })
    }

  }


}
