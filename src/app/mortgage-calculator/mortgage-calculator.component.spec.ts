import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageCalculatorComponent } from './mortgage-calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentPlan } from '../interface/PaymentPlan';
describe('MortgageCalculatorComponent', () => {
  let component: MortgageCalculatorComponent;
  let fixture: ComponentFixture<MortgageCalculatorComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortgageCalculatorComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initValues', () => {
    expect(component.title).toEqual("Mortgage Calculator");
    expect(component.amortizationPeriod_years.length).toEqual(25);
    expect(component.amortizationPeriod_months.length).toEqual(12);
    expect(component.terms.length).toEqual(10);
  });
  
  it('should createFormGroup', () => {
    expect(component.mortgageForm).toBeTruthy();
  });
  it('should calculateMortgage', () => {
    const paymentPlanObject: PaymentPlan = {
      mortgageAmount : 100000,
      intrestRate: 5,
      amortizationYears:25,
      amortizationMonths: 1,
      paymentFrequency: 1,
      term: 5,
      prepaymentAmount: 0.00,
      paymenrFrequencyPreplan: 1,
      startwithPayment: 1
    };
    component.mortgageForm.patchValue(paymentPlanObject);
    component.calculateMortgage();
    expect(component.mortgageResults.length).toEqual(9);
    expect(component.mortgageResults[0].term).toEqual(60);
    expect(component.mortgageResults[0].ammortizationPeriod).toEqual(301);
    expect(component.mortgageResults[1].term).toEqual(756.24);
    expect(component.mortgageResults[1].ammortizationPeriod).toEqual(756.24);
  });
  it('should calculateMortgage Weekely', () => {
    const paymentPlanObject: PaymentPlan = {
      mortgageAmount : 100000,
      intrestRate: 5,
      amortizationYears:25,
      amortizationMonths: 1,
      paymentFrequency: 7,
      term: 5,
      prepaymentAmount: 0.00,
      paymenrFrequencyPreplan: 1,
      startwithPayment: 1
    };
    component.mortgageForm.patchValue(paymentPlanObject);
    component.calculateMortgage();
    expect(component.mortgageResults.length).toEqual(9);
    expect(component.mortgageResults[0].term).toEqual(420);
    expect(component.mortgageResults[0].ammortizationPeriod).toEqual(2107);
    expect(component.mortgageResults[1].term).toEqual(108.03);
    expect(component.mortgageResults[1].ammortizationPeriod).toEqual(108.03);
  });

  it('should calculateMortgage Semi-monthly', () => {
    const paymentPlanObject: PaymentPlan = {
      mortgageAmount : 100000,
      intrestRate: 5,
      amortizationYears:25,
      amortizationMonths: 1,
      paymentFrequency: 15,
      term: 5,
      prepaymentAmount: 0.00,
      paymenrFrequencyPreplan: 1,
      startwithPayment: 1
    };
    component.mortgageForm.patchValue(paymentPlanObject);
    component.calculateMortgage();
    expect(component.mortgageResults.length).toEqual(9);
    expect(component.mortgageResults[0].term).toEqual(900);
    expect(component.mortgageResults[0].ammortizationPeriod).toEqual(4515);
    expect(component.mortgageResults[1].term).toEqual(50.42);
    expect(component.mortgageResults[1].ammortizationPeriod).toEqual(50.42);
  });
 
  


  
  

});
