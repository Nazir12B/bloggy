import { Component } from '@angular/core';
import { PostService } from '../../services/post-service/post.service';
import { UsersService } from '../../services//author-service/users.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  post:any;
  users:any;
  id:any;
  name:any;
  constructor(private postservice: PostService,
    private userservice: UsersService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      params => {
        this.id = params.get('id');
      });

      this.postservice.getPost(this.id).subscribe(
        data => {
          this.post = data;
          this.getUserName();
        }
      );
  }

  getUserName(){
    this.userservice.getAllUsers().subscribe(
      data => {
        this.users = data;
        for(let user of this.users){
          if(this.post.author_id==user.id){
            this.name=user.full_name;

          }
        }
      }
    );
  }

}
