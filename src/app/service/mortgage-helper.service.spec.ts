import { TestBed, inject } from '@angular/core/testing';

import { MortgageHelperService } from './mortgage-helper.service';
import { PaymentPlan } from '../interface/PaymentPlan';
import { Mortgage } from '../interface/Mortgage';
describe('MortgageHelperService', () => {
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MortgageHelperService]
    });
   
  });

  it('should be created', inject([MortgageHelperService], (service: MortgageHelperService) => {
    expect(service).toBeTruthy();
  }));

  it('should calculateNumberOfPayments', inject([MortgageHelperService], (service: MortgageHelperService)=> {
    let morgage : Mortgage = service.calculateNumberOfPayments(paymentPlanObject);
    expect(morgage.term).toEqual(60);
  }));

  it('should calculateMortgagePayment', inject([MortgageHelperService], (service: MortgageHelperService)=> {
    let morgage : Mortgage = service.calculateMortgagePayment(paymentPlanObject);
    expect(morgage.term).toEqual(756.24);
  }));

  it('should calculatePrePayment', inject([MortgageHelperService], (service: MortgageHelperService)=> {
    let morgage : Mortgage = service.calculatePrePayment(paymentPlanObject);
    expect(morgage.term).toEqual(0);
  }));
  it('should calculatePrincipalPayments', inject([MortgageHelperService], (service: MortgageHelperService)=> {
    let morgage : Mortgage = service.calculatePrincipalPayments(paymentPlanObject);
    expect(morgage.term).toEqual(100000);
  }));
  it('should calculateInterestPayments', inject([MortgageHelperService], (service: MortgageHelperService)=> {
    let morgage : Mortgage = service.calculateInterestPayments(paymentPlanObject);
    expect(morgage.term).toEqual(25000);
  }));
  it('should caliculateTotalCost', inject([MortgageHelperService], (service: MortgageHelperService)=> {
    let morgage : Mortgage = service.caliculateTotalCost(paymentPlanObject);
    expect(morgage.term).toEqual(125000);
  }));
  it('should calculateIntresetSavingsPrepaymentPlan', inject([MortgageHelperService], (service: MortgageHelperService)=> {
    let morgage : Mortgage = service.calculateIntresetSavingsPrepaymentPlan(paymentPlanObject);
    expect(morgage.term).toEqual(499.88);
  }));

  it('should calculateIntresetSavingsNonPrepaymentPlan', inject([MortgageHelperService], (service: MortgageHelperService)=> {
    let morgage : Mortgage = service.calculateIntresetSavingsNonPrepaymentPlan(paymentPlanObject);
    expect(morgage.term).toEqual(134.88);
  }));

  it('should calculateTotalSavingsInterest', inject([MortgageHelperService], (service: MortgageHelperService)=> {
    let morgage : Mortgage = service.calculateTotalSavingsInterest(paymentPlanObject);
    expect(morgage.term).toEqual(2134.88);
  }));


});
