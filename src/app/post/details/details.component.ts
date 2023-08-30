import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/models/postModel';
import { PostService } from '../post.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  post: PostModel | null = null;
  ownerBoolen: boolean = false;
  postId: string = '';
  userId: any;

  totalBuy: number = 0;
  buyBoolen: boolean = false;

  constructor (private route: ActivatedRoute, private router: Router, private postService: PostService) { }
 
  ngOnInit() {
   
    this.route.params.subscribe(data => {
      this.postId = data['id']
       //console.log('postId details' + postId)
    })
    
    
    this.postService.details(this.postId).subscribe({ 
      next:(data) => { //pri ok
        this.post = data;
        //console.log(data)//dannite za konkretniqt post
        let postOwner = data.owner //id na ownera na posta
        let user = JSON.parse(localStorage.getItem('user') || '')
        this.userId = user._id
        //dali usera e sobstvenik na posta
        if (this.userId == postOwner) {
           this.ownerBoolen = true;    
        }
        
        //dali usera veche e kupil posta
        if (this.post?.boughtBy.includes(this.userId)) {
          this.buyBoolen = true;
        }
        
        //vzimame broq na kupilite posta
        this.totalBuy = this.post.boughtBy.length
      },
      error: (err) => {
        console.error(err);
        this.ownerBoolen = false;    
        throw new Error(err.message)
      }
    })
  
  }
////////////////////////////////////////////////////////////

 delitePost(e: any) { //event.target //

 
    this.postService.delete(e.target.id).subscribe(() => {
     //console.log('delete')
      this.router.navigate(['/catalog'])
    })
 }

  buyPost(e: any) {   // <button id="{{post._id}}" (click)="buyPost($event)" class="btn">Buy</button>
    let postId = e.target.id
   
    this.postService.buy(postId).subscribe((data) => {
        this.totalBuy = Number(data);
        //console.log('buyPost ' + data) 
        this.buyBoolen = true; 
         alert('You have bay it!')
    })  
  };

};
