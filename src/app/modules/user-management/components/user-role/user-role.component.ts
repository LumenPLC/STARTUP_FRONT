import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, of } from 'rxjs';
import { UserRole } from '../../models/userrole';
import { RoleService } from '../../services/role.service';
import { ResponseMessage } from 'src/app/modules/models/response-message';

@Component({
  selector: 'app-user-role',
 
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss'
})
export class UserRoleComponent implements OnInit{
  dataLength = 0;
  count = 5;
  userRoleList : any[];
  data: any[] = [];
  title:string;
  list: Array<{ loading: boolean; ROLE_DESCR: any ;ROLE_ID:any}> = [];
  isVisible = false;
  isOkLoading = false;
  modalbtnText : string;
  submitted =false;
  userRole: UserRole = new UserRole();
  UserRoleForm: FormGroup;

  constructor(public roleService: RoleService,
    private cdr : ChangeDetectorRef,
    private modal: NzModalService,
    private fb: FormBuilder,
    ){
      this.UserRoleForm = this.fb.group({
                 
        ROLE_DESCR: [null, Validators.required],
     
      });
      this.getUserRole();
  }
  ngOnInit(): void {
  }

  getUserRole(){
    this.getData((res: any) => {
      this.dataLength = res.ResponseObj.length;

      this.data = res.ResponseObj;
      console.log(' this.data', this.data);
      
      this.list = res.ResponseObj;
      console.log(' this.list', this.list);
      this.cdr.detectChanges();
    });
  }
  get commonFormControl() {
    return this.UserRoleForm.controls;
  }
  getData(callback: (res: any) => void): void {
    this.roleService
    .GetRoleList()
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => callback(res));

  }

  addNew(){
    this.isVisible = true;
    this.submitted = false;
    this.UserRoleForm.reset();
    this.title = "Add User Role"
    this.modalbtnText = "Add"
    this.userRole.RowStatus = 1;
    this.UserRoleForm.controls["ROLE_DESCR"].setValue(null);
    this.userRole.ROLE_ID = 1;
    this.cdr.detectChanges();
  }
  edit(item:any){
    this.isVisible = true;
    this.title = "Edit User Role"
    this.modalbtnText = "Update"
    this.userRole.RowStatus = 2;
    this.UserRoleForm.controls["ROLE_DESCR"].setValue(item.ROLE_DESCR);
    this.userRole.ROLE_ID = item.ROLE_ID;
    this.cdr.detectChanges();

  }
  delete(item:any){
    this.userRole.RowStatus = 3;
    this.userRole.ROLE_DESCR = item.ROLE_DESCR;
    this.userRole.ROLE_ID = item.ROLE_ID;
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: `<b style="color: red;">${item.ROLE_DESCR}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.roleService.SaveUserRole(this.userRole)
      .subscribe((response:any= ResponseMessage) => { 
         if (response.StatusCode === 1 ) {
          this.modal.success({
            nzTitle: `${this.userRole.ROLE_DESCR}`,
            nzContent: `${response.Message} successfully deleted.`
          });
          this.getUserRole();
          this.cdr.detectChanges();
           }
         else{
          this.modal.error({
            nzTitle: `${this.userRole.ROLE_DESCR}`,
            nzContent: `${response.Message}`
          });
         }
       }),
      nzCancelText: 'No'
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.submitted=true;
    if(this.UserRoleForm.valid){
      this.userRole.ROLE_DESCR = this.UserRoleForm.controls["ROLE_DESCR"].value;
      this.roleService.SaveUserRole(this.userRole)
      .subscribe((response:any= ResponseMessage) => {        
        if (response.StatusCode === 1 && this.userRole.RowStatus === 1) {
          this.isVisible = false;
          this.isOkLoading = false;
          this.submitted=false;
          this.modal.success({
            nzTitle: `${this.userRole.ROLE_DESCR}`,
            nzContent: `${response.Message} successfully added.`
          });
          this.getUserRole();
          this.cdr.detectChanges();
          }
          else if (response.StatusCode === 1 && this.userRole.RowStatus === 2) {
            this.isVisible = false;
            this.isOkLoading = false;
            this.submitted=false;
            this.modal.success({
              nzTitle: `${this.userRole.ROLE_DESCR}`,
              nzContent: `${response.Message} successfully updated.`
            });
            this.getUserRole();
            this.cdr.detectChanges();
          }
       
          else {
            this.isVisible = false;
            this.isOkLoading = false;
            this.submitted=false;
            this.modal.error({
              nzTitle: `${this.userRole.ROLE_DESCR}`,
              nzContent: `${response.Message}`
            });
          }
      });
    } 
  }

  handleCancel(): void {
    this.submitted=false;
    this.isVisible = false;
  }

}

