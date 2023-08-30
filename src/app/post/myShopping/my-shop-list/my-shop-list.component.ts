import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { PostModel } from '../../../models/postModel';

@Component({
  selector: 'app-my-shop-list',
  templateUrl: './my-shop-list.component.html',
  styleUrls: ['./my-shop-list.component.css']
})
export class MyShopListComponent implements OnInit {
  myShopping: PostModel[] | null = null;
  noPost: boolean = true; 

  constructor (private postService: PostService) { }

   userData: any = JSON.parse(localStorage.getItem('user') || '') 
   userId: any = this.userData._id
   

    ngOnInit(): void {
      //console.log(this.userId)
      this.postService.myShopping(this.userId) 
     .subscribe({
       next:(data) => {
        this.myShopping = data;
         //console.log(this.myShopping)
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

