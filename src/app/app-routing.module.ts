import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/components/login/login.component";
import { MembersComponent } from './core/components/members/members.component';
// import { MemberDetailComponent } from './core/components/member-detail/member-detail.component';
const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "members",
    component: MembersComponent
  },
  {
    path: "nowhere",
    component: MembersComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
