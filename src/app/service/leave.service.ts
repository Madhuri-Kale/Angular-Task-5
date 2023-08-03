import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  public leavesList: any = [];
  leaveSub = new BehaviorSubject<any[]>(this.leavesList);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.updateLeavesList();
  }

  leaveUrl = 'http://localhost:3000/leaves';

 
  getLeaveById(Id : string){
    return this.http.get('http://localhost:3000/leaves/' + Id);
  }

  proceedLeave(data : any){
    return this.http.post(this.leaveUrl, data);
  }
  getLeave(){
    return this.http.get(this.leaveUrl);
  }
  updateLeave(code : any, inputaData : any){
    return this.http.put('http://localhost:3000/leaves/' + code, inputaData)
  }
  getUuid(){
    return localStorage.getItem('uuid')
  }
  getName(){
    return localStorage.getItem('name')
  }
  getDept(){
    return localStorage.getItem('dept')
  }

  updateLeavesList(): void {
    this.getLeave().subscribe((leave) => {
      this.leavesList = leave;
      this.leaveSub.next(this.leavesList);
    });
  }

}
