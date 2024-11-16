import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResponseMessage } from 'src/app/modules/models/response-message';
import { RoleService } from '../../services/role.service';
import { RoleAssignInfo } from '../../models/roleassign';
import { RoleAssignService } from '../../services/roleassign.service';
interface ItemData {
  MENU_ITEM_ID: number;
  PARENT_MENU_ITEM_ID: number;
  MENU_DESCRIPTION: string;
  MENU_URL: string;
}
@Component({
  selector: 'app-user-role-assign',
 
  templateUrl: './user-role-assign.component.html',
  styleUrl: './user-role-assign.component.scss'
})
export class UserRoleAssignComponent implements OnInit {
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.MENU_ITEM_ID, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.MENU_ITEM_ID, index % 2 === 0)
        );
        this.refreshCheckedStatus();
      },
    },
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: ItemData[] = [];
  setOfCheckedId = new Set<number>();
  loading = false;
  allMenu: any[] = [];
  roleList: any;
  assignRoleList: any[] = [];
  checkboxDisable: boolean = true;
  UserRoleAssignForm: FormGroup;
  roleName: any;
  assignRole: RoleAssignInfo = new RoleAssignInfo();
  submitted = false;

  constructor(
    private roleassignService: RoleAssignService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef
  ) {
    this.UserRoleAssignForm = this.fb.group({
      ROLE: [null,Validators.required],
      SEARCH: [null],
    });
    this.allMenuList();
    this.LoadRoleList();
  }
  ngOnInit(): void {}
  get commonFormControl() {
    return this.UserRoleAssignForm.controls;
  }
  public allMenuList() {
    this.roleassignService
      .GetAllMenuArray()
      .subscribe((response: ResponseMessage) => {
        this.allMenu = response.ResponseObj;
        this.listOfData.push(...this.allMenu);
        this.checkboxDisable = false;
        this.cdr.detectChanges();
      });
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.MENU_ITEM_ID, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.MENU_ITEM_ID)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.MENU_ITEM_ID)
      ) && !this.checked;
  }

  saveRequest() {
    this.submitted = true;
    if (this.roleName) {
      this.loading = true;
      this.assignRole.ROLE_ID = this.UserRoleAssignForm.controls['ROLE'].value;
      this.assignRole.USER_CODE = localStorage.getItem('userCode')!;
      this.assignRole.MENU_ITEM_ID = [];
      this.assignRole.MENU_ITEM_ID = this.listOfData
        .filter((data) => this.setOfCheckedId.has(data.MENU_ITEM_ID))
        .map((m: any) => m.MENU_ITEM_ID);
      this.roleassignService
        .SaveRoleAssignData(this.assignRole)
        .subscribe((response: any = ResponseMessage) => {
          if (response.StatusCode === 1) {
            this.modal.success({
              nzTitle: `${this.roleName}`,
              nzContent: `${response.Message}`,
            });
            this.UserRoleAssignForm.reset();
            this.submitted= false;
            this.setOfCheckedId.clear();
            this.refreshCheckedStatus();
            this.loading = false;
            this.cdr.detectChanges();
          } else {
            this.modal.error({
              nzTitle: `${this.roleName}`,
              nzContent: `${response.Message}`,
            });
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
    }
  }

  public LoadRoleList() {
    this.roleList = [];
    this.roleService
      .GetRoleList()
      .subscribe((response: any = ResponseMessage) => {
        this.roleList = response.ResponseObj;
      });
  }
  public LoadAssignRoleList(value: any) {
    this.assignRoleList = [];
    this.setOfCheckedId.clear();
    this.refreshCheckedStatus();
    this.onAllChecked(false);
    this.loading = false;
    this.roleName = this.roleList
      .filter((w: any) => w.ROLE_ID == value)
      .map((m: any) => m.ROLE_DESCR);
    if (value != null) {
      this.roleassignService
        .getUserRoleAssign(value)
        .subscribe((response: any = ResponseMessage) => {
          this.assignRoleList = response.ResponseObj;
          this.assignRoleList.forEach((data, index) =>
            this.updateCheckedSet(data.MENU_ITEM_ID, true)
          );
          this.refreshCheckedStatus();
          this.cdr.detectChanges();
        });
    }
  }

  onSearchInputChange(event: KeyboardEvent) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.filterTableData(searchValue);
  }

  filterTableData(searchValue: string) {
    if (!searchValue) {
      this.checkboxDisable = false;
      this.allMenu = [...this.listOfData];
      this.cdr.detectChanges();
    } else {
      const lowerCaseSearch = searchValue.toLowerCase();

      const filteredMenu = this.listOfData.filter((menuItem) => {
        const lowerCaseName = menuItem.MENU_DESCRIPTION.toLowerCase();
        return lowerCaseName.includes(lowerCaseSearch);
      });
      if (filteredMenu.length === 0) {
        this.checkboxDisable = true;
        this.cdr.detectChanges();
      } else {
        this.checkboxDisable = false;
        this.cdr.detectChanges();
      }
      this.allMenu = filteredMenu;
    }
  }
}
