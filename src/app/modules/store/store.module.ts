import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class StoreModule {
  location = null;
}
