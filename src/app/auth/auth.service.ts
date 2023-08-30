import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private readonly registerUrl = 'http://localhost:5000/register';
  private readonly loginUrl = 'http://localhost:5000/login';
  private readonly logoutUrl = 'http://localhost:5000/logout';

  constructor(private http : HttpClient) { }

  //////
  register$(data: Iuser): Observable<Iuser> {
    return this.http.post<Iuser>(this.registerUrl, data); 
  }

  login$(data: { email: string, password: string }): Observable<Iuser> {
     return this.http.post<Iuser>(this.loginUrl, data);
   }

  logout() {
    return this.http.get(this.logoutUrl);
  }
  //////

  isAuthenticated() {
    const accessToken =  localStorage.getItem('accessToken') !== null;
    return accessToken;
  }
  
  getToken(){
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }

}
