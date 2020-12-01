import { Expense } from './../../../core/models';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BigNumber } from 'bignumber.js';

type FunctionType = (formGroup: FormGroup) => void;

function ValidateInstallmentValue(valueName: string, installmentArrayName: string, installmentSizeName: string): FunctionType {
  return (formGroup: FormGroup): void => {
    const valueControl = formGroup.controls[valueName];
    const installmentSizeControl = formGroup.controls[installmentSizeName];
    const installmentFormArray = formGroup.controls[installmentArrayName] as FormArray;

    const isInstallmentValueIncorrect = !installmentFormArray.controls
      .map(installment => installment.value.value)
      .reduce((accumulator: BigNumber, installmentValue: BigNumber) =>
        accumulator.plus(installmentValue), new BigNumber('0'))
      .isEqualTo(valueControl.value);

    if (isInstallmentValueIncorrect && installmentSizeControl.value > 1) {
      installmentFormArray.setErrors({ installmentValueIncorrect: true });
    } else {
      installmentFormArray.setErrors(null);
    }
  };
}

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
    this.fg = this.formBuilder.group(
      {
        date: [this.expense ? new Date(this.expense.date) : new Date(), [Validators.required]],
        value: [this.expense ? this.expense.value : '', [Validators.required]],
        installmentSize: [this.expense ? this.expense.installments.length : '', Validators.min(2)],
        installments: this.formBuilder.array([])
      }, {
        validators: ValidateInstallmentValue('value', 'installments', 'installmentSize')
      }
    );

    if (this.expense) {
      this.expense.installments
      .sort((a, b ) => {
        if (a.date < b.date) { return -1; }
        if (a.date > b.date) { return 1; }
        return 0;
      })
      .forEach(installment => {
        this.installments.push(this.formBuilder.group({
          id: [installment.id],
          value: [installment.value, [Validators.required]],
          date: [new Date(installment.date), [Validators.required]]
        }));
      });
    }
  }

  save(): void {
    this.submitted = true;
    if (this.fg.valid) {
      this.submit.emit(this.fg.value);
    }
  }

  calculateInstallments(): void {
    const installmentsSize = this.fg.controls.installmentSize.value;
    const value = new BigNumber(this.fg.controls.value.value);
    const date =  this.fg.controls.date.value;

    if (installmentsSize < 2) {
      return;
    }

    this.installments.controls = [];

    const installmentValue = value.div(installmentsSize);
    let installmentValueAccumulator = new BigNumber('0');
    let currentDate = date;

    for (let installment = 0; installment < installmentsSize; installment++) {
      const installmentFormGroup = this.formBuilder.group({
        value: [installmentValue, [Validators.required]],
        date: [currentDate, [Validators.required]]
      });

      currentDate = new Date(currentDate);
      currentDate.setDate(3);
      currentDate.setMonth(currentDate.getMonth() + 1);

      installmentValueAccumulator = installmentValueAccumulator.plus(installmentValue);

      this.installments.push(installmentFormGroup);
    }

    if (!value.isEqualTo(installmentValueAccumulator)) {
      const difference = value.minus(installmentValueAccumulator);
      const valueControl = this.installments.controls[0] as FormGroup;
      valueControl.controls.value.setValue(installmentValue.plus(difference));
    }

  }

  get installments(): FormArray { return this.fg.get('installments') as FormArray; }

}
