import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../../services/post-service/post.service';
import { UsersService } from '../../../services//author-service/users.service';
import { DialogInitializer,DialogLayoutDisplay, ButtonLayoutDisplay,ButtonMaker} from '@costlydeveloper/ngx-awesome-popup';
import {PopPupComponent } from'../pop-pup/pop-pup.component'


@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent {
  posts:any;
  users:any;
  constructor(
    private router : Router,
    private postservice: PostService,
    private userservice: UsersService
    ) { }
  ngOnInit(): void {
    this.postservice.getAllPosts().subscribe(
      data => {
        this.posts = data;
        this.getUserName()
      }
    );  }

 
  creatPost(){
    this.router.navigate(['creatPost/']);
  }

  getUserName(){
    this.userservice.getAllUsers().subscribe(
      data => {
        this.users = data;
         for(let post of this.posts){
           for(let user of this.users){
             if(post.author_id==user.id){
               post.full_name=user.full_name
             }
           }
         }
      }
    );
  }


  confirmBox(post:any) {
     // Instance of DialogInitializer includes any valid angular component as argument.
     const confirmBox = new DialogInitializer(PopPupComponent);

     // Any data can be sent to AnyAngularComponent.
     confirmBox.setCustomData({post:post, id: post.id, title: post.title}); // optional

     // Set some configuration.
     confirmBox.setConfig({
         width     : '700px',
         layoutType: DialogLayoutDisplay.NONE // SUCCESS | INFO | NONE | DANGER | WARNING
     });

     // Set some custom buttons as list.
     // SUCCESS | INFO | NONE | DANGER | WARNING | PRIMARY | SECONDARY | LINK | DARK | LIGHT
     confirmBox.setButtons([
         new ButtonMaker('OK', 'submit', ButtonLayoutDisplay.SUCCESS),
         new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
     ]);

     // Simply open the popup and observe which button is clicked and,
     // receive optional payload from AnyAngularComponent.
     confirmBox.openDialog$().subscribe(resp => {
        //  console.log('dialog response: ', resp);
     });
  }

  gotoUpdatePost(id:any){
    this.router.navigate(['updatePost/'+id]);
  }

}
