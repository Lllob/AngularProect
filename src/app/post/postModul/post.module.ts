import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CreateComponent } from '../create/create.component'
import { CatalogComponent } from '../catalog/catalog.component';
import {  DetailsComponent } from '../details/details.component'
import { EditComponent } from '../edit/edit.component';
import { MyListComponent } from '../myList/my-list/my-list.component';
import { MyListListComponent } from '../myList/my-list-list/my-list-list.component';
import { MyShopListComponent } from '../myShopping/my-shop-list/my-shop-list.component';
import { MyShopListListComponent } from '../myShopping/my-shop-list-list/my-shop-list-list.component';
import { PostService } from '../post.service';
import { guardGuard } from '../../gurds/guard.guard';



@NgModule({
   imports: [
     CommonModule,
     ReactiveFormsModule,//izpolzvame reactivnata forma:  this.form = this.formBuilder.group({...});
 
   //vmesto .forRoot - .forChaild/  layzy
     RouterModule.forChild([   
   { path: '', pathMatch: 'full', redirectTo: 'home' },
   { path: 'create', canActivate: [guardGuard], component: CreateComponent },
   { path: 'catalog', component: CatalogComponent },
   { path: 'details/:id', canActivate: [guardGuard], component: DetailsComponent },
   { path: 'edit/:id', canActivate: [guardGuard], component: EditComponent },
   { path: 'mylist/:id', canActivate: [guardGuard], component: MyListComponent },
   { path: 'shopping/:id', canActivate: [guardGuard], component: MyShopListComponent },
     ])
   ],
   declarations: [
      CatalogComponent,
      CreateComponent,
      DetailsComponent,
      EditComponent,
      MyListComponent,
      MyListListComponent,
      MyShopListComponent,
      MyShopListListComponent,
   ],
   providers: [
     PostService //sarvisa
   ]
 })

 export class PostModule { }
 //in app.module.ts 
//{ path: 'post', loadChildren: () => import('./post/postModul/post.module').then(m => m.PostModule)}

                              
