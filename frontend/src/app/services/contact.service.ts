import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpParams  } from '@angular/common/http'
import { Global } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url:string
  constructor(private _http:HttpClient) {
    this.url = Global.apiUrl
   }


   SubmitContact(data:any){
    return this._http.post<any>(this.url+'/contact/save',data)
   }

   getCV() {
    return this._http.get(this.url + '/contact/CV', { responseType: 'blob' });
  }
  
}
