import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from '../global/global';
import { Router } from '@angular/router';
import { User } from '../components/models/user';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string
  private userSubject = new BehaviorSubject<User|null>(null);
  
  user$ = this.userSubject.asObservable();

  constructor(private _http : HttpClient,
    private router : Router
  ) {
    this.url = Global.apiUrl
   }

   signup(data:any){
    return this._http.post<any>(this.url+'/user/signup',data)
   }

   signin(data:any){
    return this._http.post<any>(this.url+'/user/signin',data)
   }

   loggedIn() {
    
    return !!localStorage.getItem('token');
}
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  getUser(){
    return this._http.get<any>(this.url+'/user/get');
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  getLogin(){
    return this.userSubject.value;
  }

}
