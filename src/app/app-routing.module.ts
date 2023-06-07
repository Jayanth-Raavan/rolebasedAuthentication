import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Gaurd/auth.guard';
import { RoleGuard } from './Gaurd/role.guard';
import { StaffComponent } from './staff/staff.component';
import { UserGuard } from './Gaurd/user.guard';
import { StaffGuard } from './Gaurd/staff.guard';

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"staff",component:StaffComponent, canActivate:[StaffGuard]},
  {path:"user",component:CustomerComponent,canActivate:[UserGuard]},
  {path:"login",component:LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
