import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{

  constructor(private service : AuthService, private route : Router){}
  ngOnInit(): void {
   this.service.updateMenu.subscribe(res=>{
    this.MenuDisplay();
   })
   this.MenuDisplay();
  }

  ngDoCheck(): void {
      if(this.route.url=='/login'){
        this.displayMenu = false;
      }
      else 
      this.displayMenu = true;

  }
  title = 'roleBasedAuthentication';

  LogOut(){
    localStorage.clear();
  }

  displayMenu = false;
  displayUser = false;
  displayStaff = false;
  currentUser : any;

  MenuDisplay(){
    if(this.service.GetToken() != '')
    this.currentUser = this.service.GetRoleByToken(this.service.GetToken())
    this.displayUser = this.currentUser == 'adminUser';
    this.displayStaff = (this.currentUser == 'adminUser' || this.currentUser == 'staffUser')
  }
}
