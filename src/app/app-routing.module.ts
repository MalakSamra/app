import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { ViewComponent } from './Customer/view/view.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"customer/view",component:ViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
