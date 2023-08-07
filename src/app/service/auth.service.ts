import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl = 'http://localhost:3000/user';
  leaveUrl = 'http://localhost:3000/leaves';

  // public loggedUserSub: BehaviorSubject<any>;
  // public loggedUser: Observable<any>;
  constructor(private http: HttpClient) {
  }

  getAll(){
    return this.http.get(this.apiUrl);
  }
  getUsers(): Observable<any[]> {
    return this.http.get(this.apiUrl).pipe(
      map((data: any) => {
        return Object.keys(data).map((userId) => ({ ...data[userId], id: userId }));
      }),
      catchError((error: any) => {
        return throwError(error.message || 'Something went wrong');
      })
    );
  }
 

  getByCode(code:any){
    return this.http.get(this.apiUrl + '/' + code)
  }

  proceedregister(inputaData : any){
    return this.http.post(this.apiUrl, inputaData)
  }

  updateUser(code : any, inputaData : any){
    return this.http.put(this.apiUrl + '/' + code, inputaData)
  }

  isLoggedIn(){
    return localStorage.getItem('username')!=null;
  }

  logout(){
    localStorage.removeItem('username')
  }

  getUserRole(){
    return localStorage.getItem('userrole')!=null?localStorage.getItem('userrole'):'';
  }
  getId(){
    return localStorage.getItem('id')!=null?localStorage.getItem('id'):'';
  }

  fetchData(id : any){
    return this.http.get(this.leaveUrl + '/' + id);
  }
  
 }
