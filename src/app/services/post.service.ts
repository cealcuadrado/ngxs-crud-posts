import { Post } from './../interfaces/post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  fetchPosts(): Observable<Post> {
    return this.http.get<Post>(`/posts`);
  }

  addPost(postData: any): Observable<Post> {
    return this.http.post<Post>(`/posts`, postData)
  }
}
