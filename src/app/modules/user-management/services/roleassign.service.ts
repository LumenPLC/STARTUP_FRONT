import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestMessage } from '../../models/response-message';
import { RoleAssignInfo, RoleAssignModel } from '../models/roleassign';
import { UrlConstants } from 'src/app/enums/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class RoleAssignService {
  request: RequestMessage = new RequestMessage();
  dataChange: BehaviorSubject<RoleAssignModel[]> = new BehaviorSubject<RoleAssignModel[]>([]);
  dialogData: any;
  userrole: any;
  user_roleassign: any;
  data: any;
  all_menu: any;

  constructor(private http:HttpClient) { }





  GetAllMenuArray(): Observable<any> {
    return this.http.get(UrlConstants.allMenuList);
  }
  getUserRoleAssign(roleId: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('roleId', roleId);
    return this.http.get(UrlConstants.user_role_assignList, { params: params });
  }
  SaveRoleAssignData(roleMenu:RoleAssignInfo){
    return this.http.post(UrlConstants.saveRoleMenu,roleMenu);
  }



  
}
