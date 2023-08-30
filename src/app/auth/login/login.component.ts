import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({
    'email': ['',[Validators.required, Validators.pattern(/^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z-]+)$/)]],
    'password': ['',[Validators.required, Validators.minLength(2)]]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }                                    

   //<form .... (ngSubmit)="handleLogin()">
   handleLogin(): void { 
     
    const { email, password } = this.loginForm.value;
    const userData: { email: string, password: string } = {
      email: email,
      password: password,
    }
    
   // console.log(this.loginForm.controls) 
   //console.log(this.loginForm.controls['email'].errors?.['pattern'])
  
  
  this.authService
    .login$(userData) 
    .subscribe((data) => { 
        localStorage.setItem('user', JSON.stringify(data)); 
        
           let user = JSON.parse(localStorage.getItem('user') || '')
           const accessToken = user.accessToken
           localStorage.setItem('accessToken', accessToken)
         
            this.router.navigate([ '/home' ])
    });
    
  }
};
