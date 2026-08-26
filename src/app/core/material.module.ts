import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
  CommonModule, 
  MatButtonModule, 
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
  ],
  exports: [
  CommonModule,
   MatButtonModule, 
   MatCardModule, 
   MatFormFieldModule,
   MatInputModule, 
   ],
})
export class CustomMaterialModule { }