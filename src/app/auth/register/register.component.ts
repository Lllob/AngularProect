import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Iuser } from 'src/app/models/userModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  
  // //<form ... [formGroup]="registerForm"...
  registerForm: FormGroup = this.formBuilder.group({ 
    'username':  ['',[Validators.required, Validators.minLength(2)]], 
    'email': ['',[Validators.required, Validators.pattern(/^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z-]+)$/)]],
    'password': ['',[Validators.required, Validators.minLength(2)]],
    'rePass': ['',[Validators.required, Validators.minLength(2)]]                       
  })
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }
    
  
    //<form .... (ngSubmit)="handleRegister()">
    handleRegister(): void { 
     
      const { username, email, password, rePass} = this.registerForm.value;
      const userData: Iuser = {
        username: username,
        email: email,
        password: password
      }
      
     if (password !== rePass) {
      return alert('Password don/t match')
     }
    
    this.authService.register$(userData)
      .subscribe((data) => { 
         
          localStorage.setItem('user', JSON.stringify(data));
          
           let user = JSON.parse(localStorage.getItem('user') || '')
           const accessToken = user.accessToken
           localStorage.setItem('accessToken', accessToken)
        
           this.router.navigate(['/home'])
      })
    }

    get checkbtn () {
      if (this.registerForm.invalid) {
         return true
      } else {
        return false
      }
    }
 
}


