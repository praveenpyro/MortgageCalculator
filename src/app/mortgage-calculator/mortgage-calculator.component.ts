import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MortgageHelperService } from '../service/mortgage-helper.service';
import { Mortgage } from '../interface/Mortgage';
import { KeyValue } from '../interface/KeyValue';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.css']
})
export class MortgageCalculatorComponent implements OnInit {
  public title: string;
  public amortizationPeriod_years : number[];
  public amortizationPeriod_months :number[];
  public paymentFrequency: KeyValue[];
  public terms: number[];
  public paymentFrequency_prepayment:KeyValue[];
  public mortgageForm: FormGroup;
  public mortgageResults : Mortgage[];
  constructor( public fb: FormBuilder, public mortgageHelper : MortgageHelperService) {

  }
  ngOnInit()  {
    this.initValues();
    this.createFormGroup(this.fb);
    this.calculateMortgage();
  }

  public initValues(): void {
    this.title = 'Mortgage Calculator';
    this.amortizationPeriod_years =  Array(25).fill(25).map((x,i)=>i+1);
    this.amortizationPeriod_months =  Array(12).fill(12).map((x,i)=>i+1);
    this.paymentFrequency = [
    {label : "Accelerated Weekly", value:7},
    {label : "Accelerated Bi-weekly", value:7},
    {label : "Bi-Weekly (every 2 weeks)", value:7},
    {label : "Semi-monthly (24x per year)", value:15},
    {label : "Monthly (12x per year)", value:1}];
    this.terms =  Array(10).fill(10).map((x,i)=>i+1);
    this.paymentFrequency_prepayment = [
      {label : "One Time", value:1},
      {label : "Each Year", value:1},
      {label : "Same as regular payment", value:1}];
  }

  public createFormGroup(fb: FormBuilder) : void {
    this.mortgageForm = fb.group({
      mortgageAmount:[100000,[Validators.required]],
      intrestRate:["5.00",[Validators.required]],
      amortizationYears:[this.amortizationPeriod_years[24],[Validators.required]],
      amortizationMonths:[this.amortizationPeriod_months[0],[Validators.required]],
      paymentFrequency:[this.paymentFrequency[4].value,[Validators.required]],
      term:[this.terms[4],[Validators.required]],
      prepaymentAmount:["0.00"],
      paymenrFrequencyPreplan:[this.paymentFrequency_prepayment[0].value],
      startwithPayment:[1,[Validators.required, Validators.min(1)]]
    });
  }

  public calculateMortgage() : void {
    this.mortgageResults = this.mortgageHelper.calculateMortgage(this.mortgageForm.value);
  }
  
  
}
