import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PostModel } from 'src/app/models/postModel';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  post: any;
  postId: string = '';
  dataEdit: PostModel | null = null;


  constructor (private route: ActivatedRoute, private router: Router, private postService: PostService, private formBuilder: FormBuilder,) { }

  ngOnInit() { 

   
    this.route.params.subscribe((data)=> { 
      this.postId = data['id'] 
     
    })
   //vzimame dannite na tekushtiqt post
    this.postService.details(this.postId).subscribe({ 
      next:(data) => { //pri ok
        this.post = data;
      },
      error: (err) => {
        console.error(err);    
        throw new Error(err.message)
      }
    });  

  }

///////////////////////////

  // ///EDIT /////////////////////////////////////////
    //<form [formGroup]="editForm" (submit)="editPost()">
    editForm: FormGroup = this.formBuilder.group({
      title: ['',[Validators.required, Validators.minLength(2)]],
      //    <input formControlName="title" ... type="text">
      imageUrl: ['', [Validators.required,  Validators.pattern(/^https?:\/\//i)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.min(1)]],
      type: ['', Validators.required]
    })

   //  <form .... (submit)="editPost()"> //submit idva ot: <button type="submit"...
    editPost(){ 

    const { title, imageUrl, description, price, type } = this.editForm.value
         this.dataEdit = {  
         title: title || this.post?.title,
         imageUrl: imageUrl || this.post?.imageUrl,
         description: description || this.post?.description,
         price: price || this.post?.price,
         type: type || this.post?.type,
       }
     
    this.postService.edit(this.postId, this.dataEdit)
     .subscribe({ 
      next: (data) => {
      this.router.navigate(['/catalog'])
   
      },
      error: (err) => {
        throw new Error(err.message)
      }
   })
   
  }

}

