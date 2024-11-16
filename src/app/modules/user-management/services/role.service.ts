import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { UserRole } from '../models/userrole';
import { BehaviorSubject } from 'rxjs';
import { RequestMessage } from '../../models/response-message';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  request: RequestMessage = new RequestMessage();
  dataChange: BehaviorSubject<UserRole[]> = new BehaviorSubject<UserRole[]>([]);
  dialogData: any;
  userRole: any;
  get data(): UserRole[] {
    return this.userRole;
  }
  constructor(private httpClient: HttpClient) { }


  GetRoleList(){
    return this.httpClient.get(UrlConstants.getRoleList);
  }

  SaveUserRole(roles: UserRole) {
    this.request.requestObject = JSON.stringify(roles);
    return this.httpClient.post(UrlConstants.saveUserRole,this.request);
  }
}
