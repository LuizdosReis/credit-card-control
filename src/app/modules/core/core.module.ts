import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableHeaderDirective } from './directives/sortable-header.directive';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './adapters/custom-date-parser-formatter';
import { RepresentedCustomAdapter } from './adapters/represented-custom-adapter';


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
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: RepresentedCustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class CoreModule { }
