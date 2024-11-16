import { SidebarMenuService } from 'src/app/_metronic/layout/components/sidebar/sidebar-menu/Service/sidebar-menu.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { UserInfo } from './model/user-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'ADMIN',
    password: 'ADMIN',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  userInfo: UserInfo = new UserInfo();

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private sideBarMenuService: SidebarMenuService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
      ],
      password: [
        this.defaultAuth.password,
      ],
    });
  }







  Asubmit() {
    this.hasError = false;
    // const loginSubscr = this.authService
    //   .login(this.f.email.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe((user: UserModel | undefined) => {
    //     if (user) {
    //        this.router.navigate([this.returnUrl]);
    //     } else {
    //       this.hasError = true;
    //     }
    //   });
    this.userInfo.UserName = this.f.email.value;
    this.userInfo.Password = this.f.password.value;
    const loginSubscr = this.loginService
      .logIn(this.userInfo)
      .subscribe((res: any) => {
        let obj = res;
        if (obj.StatusCode === 1) {
          localStorage.setItem('userCode', 'Admin');
          localStorage.setItem('roleId', '1');
          localStorage.setItem('token', 'xjlfajoacjklfjalflaf');
          // this.authService.setOrganization(obj.ResponseObj.ORG_CODE,obj.ResponseObj.ORG_NAME);
          //this.authService.getCurSession(obj.ResponseObj.USER_CODE);
          //this.authService.getOrgImageUrlGrid(obj.ResponseObj.USER_CODE);
          //this.globalService.getComboSerialist(obj.ResponseObj.ORG_CODE, obj.ResponseObj.CAMPUS_CODE);
         // this.sideBarMenuService.getMenuListFromDB('Admin',1).subscribe((res: any) => {
            if (1 > 0) {
             // localStorage.setItem('menuList', JSON.stringify(res.ResponseObj));
              this.router.navigate([this.returnUrl]);
            }
         // });
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }


  submit() {
    this.hasError = false;
    // const loginSubscr = this.authService
    //   .login(this.f.email.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe((user: UserModel | undefined) => {
    //     if (user) {
    //        this.router.navigate([this.returnUrl]);
    //     } else {
    //       this.hasError = true;
    //     }
    //   });
    this.userInfo.UserName = this.f.email.value;
    this.userInfo.Password = this.f.password.value;
    const loginSubscr = this.loginService
      .logIn(this.userInfo)
      .subscribe((res: any) => {
        let obj = res;
        console.log('obj',obj);
        
        if (obj.StatusCode === 1) {
          localStorage.setItem('userCode', obj.ResponseObj.USER_CODE);
          localStorage.setItem('userName', obj.ResponseObj.USER_NAME);
          localStorage.setItem('roleId', obj.ResponseObj.ROLE_ID);
          localStorage.setItem('orgId', obj.ResponseObj.ORG_ID);
          localStorage.setItem('branchId', obj.ResponseObj.BRANCH_ID);         
          localStorage.setItem('branchName', obj.ResponseObj.BRANCH_NAME);
          localStorage.setItem('orgImageByte', obj.ResponseObj.ORG_IMAGE_BYTE);                  
          localStorage.setItem('token', 'ffafxascfasfafafa');
          localStorage.setItem('userType', obj.ResponseObj.USER_TYPE_DESC);
          this.authService.setOrganization(obj.ResponseObj.ORG_ID,obj.ResponseObj.ORG_NAME);
          this.sideBarMenuService.getMenuListFromDB(obj.ResponseObj.USER_CODE,obj.ResponseObj.ROLE_ID).subscribe((res: any) => {
            if (res.ResponseObj.length > 0) {
              localStorage.setItem('menuList', JSON.stringify(res.ResponseObj));
              this.router.navigate([this.returnUrl]);
            }
          });
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}