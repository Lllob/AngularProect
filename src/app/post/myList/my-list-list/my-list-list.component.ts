import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/postModel';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-list-list',
  templateUrl: './my-list-list.component.html',
  styleUrls: ['./my-list-list.component.css']
})

export class MyListListComponent implements OnInit {

   @Input()
   post: PostModel | null = null 
   bool: boolean = false;

   constructor(private authService: AuthService) { }
   //  const authService = inject(AuthService)

   ngOnInit(): void {
       this.bool = this.authService.isAuthenticated() //
   }
}
