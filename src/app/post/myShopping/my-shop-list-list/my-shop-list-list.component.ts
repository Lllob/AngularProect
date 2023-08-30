import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/postModel';
//import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-shop-list-list',
  templateUrl: './my-shop-list-list.component.html',
  styleUrls: ['./my-shop-list-list.component.css']
})
export class MyShopListListComponent implements OnInit {
  @Input()    //vzimame [post]=   ot html na roditelq
  post: PostModel | null = null  //post = [post] ot htmla

  //constructor(private authService: AuthService) { }
  //  const authService = inject(AuthService)

  ngOnInit(): void {
  }
}

