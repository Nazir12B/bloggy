import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../../services/post-service/post.service';
import { UsersService } from '../../../services//author-service/users.service';

@Component({
  selector: 'app-creat-post',
  templateUrl: './creat-post.component.html',
  styleUrls: ['./creat-post.component.css']
})
export class CreatPostComponent {
  users: any;

  constructor(
    private userservice: UsersService,
    private postservice: PostService,
    private router : Router) { }
  ngOnInit(){
    this.userservice.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      }
    );
  }

  createPost(createPostrForm:any){

    this.postservice.addPost({
      "title":createPostrForm.value.title,
      "author_id":parseInt(createPostrForm.value.autor, 10),
      "image_url":createPostrForm.value.image,
      "content":createPostrForm.value.content,
      "resume":createPostrForm.value.resume
    }).subscribe(
      ()=>{
           this.router.navigate(['admin']);
      }
    );

  }

}
