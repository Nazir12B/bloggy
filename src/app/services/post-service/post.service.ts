import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get("http://103166.bloggy.ecole-it.devigne.space/posts/");
  }
  getPost(id:any) {
    return this.http.get("http://103166.bloggy.ecole-it.devigne.space/posts/"+id);
  }

  addPost(post:any) {
    return this.http.post("http://103166.bloggy.ecole-it.devigne.space/posts/",post);
   }

   deletePost(post:any) {
    return this.http.delete("http://103166.bloggy.ecole-it.devigne.space/posts/"+post['id'], post);
   }
   updatePost(post:any) {
    return this.http.put("http://103166.bloggy.ecole-it.devigne.space/posts/"+ post['id'], post);
  }

}

