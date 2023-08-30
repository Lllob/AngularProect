import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { PostModel } from 'src/app/models/postModel';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {  
   allPosts: PostModel[] | null = null; 
   noPost: boolean = false

  constructor (private postService: PostService, public authService: AuthService) { }

  ngOnInit() {
   
     this.postService.catalog().subscribe({
       next:(data) => {
        this.allPosts = data;
        //const allP: PostModel[] = data
        //console.log(this.allPosts)
        if (data.length === 0) {
           this.noPost = true
        } else {
          this.noPost = false
        }
      },
      error: (err) => {
        console.error(err);
        this.noPost = true
        throw new Error(err.message)
      }
    });
  }
}

