import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { UserInfo } from '../model/user-info';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }
  logIn(userInfo:UserInfo){
    return this.httpClient.post(UrlConstants.login, userInfo);
  }
}
