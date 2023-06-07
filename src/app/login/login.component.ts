import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private service: AuthService, private route: Router) {}

  ngOnInit(): void {}

  Login = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  //checking login credentials
  credData: any;
  LogIn() {
    if (this.Login.valid) {
      this.service.ProceedLogin(this.Login.value).subscribe(result => {
        // console.log(this.Login.value);
        this.credData = result;
        console.log("credentials==>"+ this.credData.status + " " + this.credData.password)
        if(result != null){
        this.credData = result;
          localStorage.setItem('token',this.credData.token)
          console.log(this.credData.token)
          localStorage.setItem('refreshToken',this.credData.refreshToken)
          console.log(this.credData.refreshToken)
          this.service.updateMenu.next();
          this.route.navigate([''])
        }
        else
          alert("Login Failed!!")
      });
    }
  }

  //refresh token
}
