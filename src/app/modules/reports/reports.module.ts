import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@NgModule({
  declarations: [
   

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NzButtonModule,
    NzTableModule,
    ReactiveFormsModule,
    NzInputModule,
    NzDividerModule,
    NzModalModule,
    NzIconModule,
    NzToolTipModule,
    NzFormModule,
    NzSelectModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzAvatarModule,
    NzUploadModule,
    NzDatePickerModule,
    NzSkeletonModule,
    
  ]
})
export class ReportsModule { }
