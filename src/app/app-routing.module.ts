import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homePage/homepage/homepage.component';
import { AdminHomepageComponent } from './homePage/Admin/admin-homepage/admin-homepage.component';
import { CreatPostComponent } from './homePage/Admin/creat-post/creat-post.component';
import { PostComponent } from './homePage/post/post.component';
import { UpdatePostComponent } from './homePage/Admin/update-post/update-post.component';





const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "homepage" },
  { path: "homepage", component: HomepageComponent },
  { path: "admin", component: AdminHomepageComponent },
  { path: "creatPost", component: CreatPostComponent },
  { path: "post/:id", component: PostComponent },
  { path: "updatePost/:id", component: UpdatePostComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
