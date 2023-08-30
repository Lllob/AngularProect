import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PostModule } from './post/postModul/post.module';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFaundComponent } from './page-not-faund/page-not-faund.component';

import { AuthService } from './auth/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptorService } from './jwt-interseptor.service';
import { ResponsInterseptorService } from './respons-interseptor.service';

@NgModule({
  declarations: [ 
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    FooterComponent,
    PageNotFaundComponent,
    //CatalogComponent, //vika me gi vav postModul
    //CreateComponent,
  ],
  imports: [ 
    BrowserModule,
    PostModule,//
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
   
  ],
  providers: [ 
    AuthService,                           
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}, 
    {provide: HTTP_INTERCEPTORS, useClass: ResponsInterseptorService, multi: true} 
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
