import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expense-form-modal',
  templateUrl: './expense-form-modal.component.html',
  styleUrls: ['./expense-form-modal.component.scss']
})
export class ExpenseFormModalComponent implements OnInit {

  fg: FormGroup;
  model: NgbDateStruct;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fg = this.formBuilder.group({
      date: ['', [Validators.required]],
      value: ['', [Validators.required]],
    });
  }

}
