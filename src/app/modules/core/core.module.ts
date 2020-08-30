import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableHeaderDirective } from './directives/sortable-header.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    SortableHeaderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    SortableHeaderDirective
  ]
})
export class CoreModule { }
