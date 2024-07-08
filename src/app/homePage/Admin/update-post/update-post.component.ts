import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../../services/post-service/post.service';
import { UsersService } from '../../../services//author-service/users.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent {
  users: any;
  id:any;
  post:any;
  public ppostToUpdate: any;
  public title:any;
  public author:any;
  public image:any;
  public resume:any;
  public content:any;


  constructor(
    private userservice: UsersService,
    private postservice: PostService,
    private router : Router,
    private activeRoute: ActivatedRoute) { }
  ngOnInit(){
    this.activeRoute.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      });
    this.ppostToUpdate= this.postservice.getPost(this.id).subscribe(
      data => {
       this.post=data

      this.title=this.post.title
      this.author=this.post.author_id
      this.image=this.post.image_url
      this.resume=this.post.resume
      this.content=this.post.content


      }
    );
    this.userservice.getAllUsers().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  updatePost(){
    this.ppostToUpdate = {
      'id':this.id,
      'title': this.title,
      'author_id':this.author,
      'image_url':this.image,
      'resume':this.resume,
     'content':this.content,

    }
    this.postservice.updatePost(this.ppostToUpdate).subscribe(
      response => {
        this.router.navigate(['admin']);
      }
    );


  }

}
