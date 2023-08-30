import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { PostModel } from '../../../models/postModel';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {
  myPosts: PostModel[] | null = null;
  noPost: boolean = true; 

  constructor (private postService: PostService) { }

   userData: any = JSON.parse(localStorage.getItem('user') || '') 
   userId: any = this.userData._id
   

    ngOnInit(): void {
      this.postService.myPost(this.userId) 
     .subscribe({
       next:(data) => {
        this.myPosts = data;
        //console.log(this.myPosts)
        if (data.length > 0) {
          this.noPost = false
        }
      },
      error: (err) => {
        console.error(err);
        throw new Error(err.message)
      }
    })
  }

}
