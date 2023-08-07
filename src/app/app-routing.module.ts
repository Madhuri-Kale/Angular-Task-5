import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { HodDboardComponent } from './hod-dboard/hod-dboard.component';
import { StaffDboardComponent } from './staff-dboard/staff-dboard.component';
import { ViewLeaveComponent } from './view-leave/view-leave.component';

const routes: Routes = [
  {path : '', component : RegisterComponent},
  {path : 'home', component : HomeComponent, canActivate : [AuthGuard]},
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'hod', component : HodDboardComponent, canActivate : [AuthGuard], data : {userrole : 'hod'}},
  {path : 'staff', component : StaffDboardComponent, canActivate : [AuthGuard],data : {userrole : 'staff'}},
  {path : 'view/:id', component : ViewLeaveComponent, canActivate : [AuthGuard]},
  {path : 'view', component : ViewLeaveComponent, canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
