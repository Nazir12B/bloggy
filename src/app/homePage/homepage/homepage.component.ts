import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post-service/post.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  posts: any;
  constructor(private postservice: PostService, private router : Router) { }
  ngOnInit(): void {

    this.postservice.getAllPosts().subscribe(
      data => {
        this.posts = data;
      }
    );
  }


  gotoPost(id:any){
    this.router.navigate(['post/'+id]);
  }

}
