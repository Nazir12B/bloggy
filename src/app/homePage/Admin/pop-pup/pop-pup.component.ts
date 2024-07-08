import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {Subscription} from 'rxjs';
import { PostService } from '../../../services/post-service/post.service';
import {DialogBelonging} from '@costlydeveloper/ngx-awesome-popup';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pop-pup',
  templateUrl: './pop-pup.component.html',
  styleUrls: ['./pop-pup.component.css']
})
export class PopPupComponent {
  private subscriptions: Subscription = new Subscription();
  title:any;
  hasError: boolean = false;
  message: string= "";
  constructor(@Inject('dialogBelonging')
   public dialogBelonging: DialogBelonging,
   private postservice: PostService,
   private router : Router,
   private location: Location) {}

    ngOnInit(): void {

        this.subscriptions.add(

          this.dialogBelonging.eventsController.onButtonClick$.subscribe((_Button) => {
                 if (_Button.ID === 'submit') {

                   if(this.title==this.dialogBelonging.customData.title){
                       this.postservice.deletePost(this.dialogBelonging.customData.post).subscribe(
                        ()=>{
                          this.hasError = false;
                          this.message = "Suppression effectuée avec succès";
                          setTimeout(() => {
                            window.location.reload();
                            this.dialogBelonging.eventsController.close();
                          }, 3500);
                        },
                        ()=>{
                          this.hasError = true;
                          // this.message = "Une erreur s'est produite, vérifiez si l'élément est toujours présent puis réessayer !!!";
                            window.location.reload();
                        },
                       );
                   }else{
                    this.hasError = true;
                    this.message = "Make sure that the name of the item below is correct then press OK. !!!";

                   }
                }
                else if (_Button.ID === 'cancel') {
                    this.dialogBelonging.eventsController.close();
                }
            })
        );
        setTimeout(() => {
            this.dialogBelonging.eventsController.closeLoader();
        }, 1000);
    }


    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
