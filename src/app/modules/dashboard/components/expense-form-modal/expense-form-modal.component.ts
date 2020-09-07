import { Expense } from './../../../core/models';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-form-modal',
  templateUrl: './expense-form-modal.component.html',
  styleUrls: ['./expense-form-modal.component.scss']
})
export class ExpenseFormModalComponent implements OnInit {

  fg: FormGroup;
  submitted = false;
  expense: Expense;

  public submit: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fg = this.formBuilder.group({
      date: [this.expense ? new Date(this.expense.date) : new Date(), [Validators.required]],
      value: [this.expense ? this.expense.value : '', [Validators.required]],
    });

  }

  save(): void {
    this.submitted = true;
    if (this.fg.valid) {
      this.submit.emit(this.fg.value);
    }
  }
}
