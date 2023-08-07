import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Task-5';
constructor(private service : AuthService){}
logout(){
  this.service.logout();
}

//   isLoggedIn(){
//     this.service.isLoggedIn();
//   }
}
