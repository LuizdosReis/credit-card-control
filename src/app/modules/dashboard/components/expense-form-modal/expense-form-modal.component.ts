import { Expense } from './../../../core/models';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-form-modal',
  templateUrl: './expense-form-modal.component.html',
  styleUrls: ['./expense-form-modal.component.scss']
})
export class ExpenseFormModalComponent implements OnInit {

  fg: FormGroup;
  submitted = false;
  expense: Expense;

  public submit: EventEmitter<Expense> = new EventEmitter();
  public remove: EventEmitter<number> = new EventEmitter();


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fg = this.formBuilder.group({
      date: [this.expense ? new Date(this.expense.date) : new Date(), [Validators.required]],
      value: [this.expense ? this.expense.value : '', [Validators.required]],
      installmentSize: [this.expense ? this.expense.installments.length : '', Validators.min(2)],
      installments: this.formBuilder.array([])
    });
  }

  save(): void {
    this.submitted = true;
    if (this.fg.valid) {
      console.log(this.fg.value);
      this.submit.emit(this.fg.value);
    }
  }

  calculateInstallments(): void {
    const installmentsSize = this.fg.controls.installmentSize.value;
    const value = this.fg.controls.value.value;
    const date =  this.fg.controls.date.value;

    if (installmentsSize < 2) {
      return;
    }

    this.installments.controls = [];

    const installmentValue = Math.round((value / installmentsSize * 100)) / 100;
    let installmentValueAccumulator = 0;
    let currentDate = date;

    for (let installment = 0; installment < installmentsSize; installment++) {
      const installmentFormGroup = this.formBuilder.group({
        value: [installmentValue, [Validators.required]],
        date: [currentDate, [Validators.required]]
      });

      currentDate = new Date(currentDate);
      currentDate.setMonth(currentDate.getMonth() + 1);
      currentDate.setDate(3);

      installmentValueAccumulator += installmentValue;

      this.installments.push(installmentFormGroup);
    }

    if ( value !== installmentValueAccumulator ) {
      const difference = value - installmentValueAccumulator;

      this.installments.controls[0].value.setValue(installmentValue + difference);
    }

  }

  get installments(): FormArray { return this.fg.get('installments') as FormArray; }

}
