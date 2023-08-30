import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component'
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { PageNotFaundComponent } from './page-not-faund/page-not-faund.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'logout', component: LogoutComponent },
  {path: '**', component: PageNotFaundComponent },
  //{ path: 'create', component:CreateComponent }, 
  { path: 'post', loadChildren: () => import('./post/postModul/post.module').then(m => m.PostModule)}
];


@NgModule({             
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule{ };
