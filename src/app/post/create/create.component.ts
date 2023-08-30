import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { PostModel } from 'src/app/models/postModel';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent  {

  ////<form [formGroup]="createForm" (submit)="createPost()">
  createForm: FormGroup = this.formBuilder.group({
    title: ['',[Validators.required, Validators.minLength(2)]],
    //    <input formControlName="title" ... type="text">
    imageUrl: ['',[Validators.required,  Validators.pattern(/^https?:\/\//i)]],
    description: ['', [Validators.required, Validators.minLength(4)]],
    price: ['', [Validators.required, Validators.min(1)]],
    type: ['', Validators.required]
  })
   

  constructor(private formBuilder: FormBuilder, private postService: PostService, private router: Router) { }
  

  //  <form .... (submit)="createPost()"> //pri natiskane na: <button type="submit"...
  createPost(){ 

  
     const { title, imageUrl, description, price, type } = this.createForm.value
      
     const user =  JSON.parse(localStorage.getItem('user') || '')
     const owner = user._id
     //console.log('create userId ' + ownerIdId)
     const dataCreate: PostModel = { title, imageUrl, description, price, type, owner }
     
    this.postService.create(dataCreate)
    .subscribe((data) => {
      this.router.navigate(['/catalog'])
     
    })
  }
  ////////
  

  get inValid(){ //  <button [disabled]="inValid" type="submit">
    return this.createForm.invalid; //ako e = true butona e disable
  }

}

