import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/postModel';

//export interface CreateData { title: string, imageUrl: string, description: string, price: number, type: string }

//url adresite
const postUrl = "http://localhost:5000";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  create(data: PostModel) {
    return this.http.post(`${postUrl}/create`, data);
  }

  catalog(): Observable<PostModel[]> { 
    return this.http.get<PostModel[]>(`${postUrl}/catalog`);
  }

  details(postId: string): Observable<PostModel> {
     return this.http.get<PostModel>(`${postUrl}/details/${postId}`)
  }

  delete(postId: string) {
    return this.http.get(`${postUrl}/delete/${postId}`)
  }
    
  edit(postId: string, data: PostModel) {
    return this.http.put<PostModel>(`${postUrl}/edit/${postId}`, data)
  }

  myPost(userId: string): Observable<PostModel[]> { 
  return this.http.get<PostModel[]>(`${postUrl}/mylist/${userId}`);
  }

  buy(postId: string) {
    return this.http.get<any>(`${postUrl}/buy/${postId}`)
 }

 myShopping(userId: string): Observable<PostModel[]> { 
  return this.http.get<PostModel[]>(`${postUrl}/shopping/${userId}`);
  }
  
}
