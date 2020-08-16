import { Injectable } from '@angular/core';
import { Mortgage } from '../interface/Mortgage';
import { PaymentPlan } from '../interface/PaymentPlan';

@Injectable({
  providedIn: 'root'
})
export class MortgageHelperService {
  mortgageResults : Mortgage[] = [];
  paymentPlanObject: PaymentPlan;
  constructor() { }

  public calculateMortgage(paymentPlanObject: PaymentPlan): Mortgage[]  {
    this.mortgageResults = [];
    this.paymentPlanObject = paymentPlanObject;

    try{
      this.mortgageResults.push(this.calculateNumberOfPayments(paymentPlanObject));
      this.mortgageResults.push(this.calculateMortgagePayment(paymentPlanObject));
      this.mortgageResults.push(this.calculatePrePayment(paymentPlanObject));
      this.mortgageResults.push(this.calculatePrincipalPayments(paymentPlanObject));
      this.mortgageResults.push(this.calculateInterestPayments(paymentPlanObject));
      this.mortgageResults.push(this.caliculateTotalCost(paymentPlanObject));
      this.mortgageResults.push(this.calculateIntresetSavingsPrepaymentPlan(paymentPlanObject));
      this.mortgageResults.push(this.calculateIntresetSavingsNonPrepaymentPlan(paymentPlanObject));
      this.mortgageResults.push(this.calculateTotalSavingsInterest(paymentPlanObject));
    } catch(exception) {
      console.log(exception);
    }
    
    return this.mortgageResults;
  }

  public calculateNumberOfPayments(paymentPlanObject: PaymentPlan) : Mortgage {
   const paymentFrequency = paymentPlanObject.paymentFrequency;
   const  mortgage : Mortgage = {
      catagoty :"Number of Payments",
      term : (paymentPlanObject.term *12 )* paymentFrequency,
      ammortizationPeriod :  (paymentPlanObject.amortizationYears * 12) * paymentFrequency + paymentPlanObject.amortizationMonths *paymentFrequency
   }
   return mortgage;
  }

  public calculateMortgagePayment(paymentPlanObject: PaymentPlan) : Mortgage {
    const interestRate : number = ((paymentPlanObject.intrestRate/100) + 1);
    const mortgageNumberofPayment : Mortgage = this.calculateNumberOfPayments(paymentPlanObject);
    const totalIntrest:number =  parseFloat((paymentPlanObject.mortgageAmount * Math.pow(interestRate, paymentPlanObject.term)).toFixed(2));
    const  mortgage : Mortgage = {
      catagoty : "Mortgage Payment",
      term : Number(((paymentPlanObject.mortgageAmount + totalIntrest)/mortgageNumberofPayment.ammortizationPeriod).toFixed(2)),
      ammortizationPeriod : Number(((paymentPlanObject.mortgageAmount + totalIntrest)/mortgageNumberofPayment.ammortizationPeriod).toFixed(2)),
    }
    return mortgage;
  }

  public calculatePrePayment(paymentPlanObject: PaymentPlan) : Mortgage {
    const  mortgage : Mortgage = {
      catagoty : "Prepayment",
      term :  paymentPlanObject.prepaymentAmount,
      ammortizationPeriod :  paymentPlanObject.prepaymentAmount
    }
    return mortgage;
  }

  public calculatePrincipalPayments(paymentPlanObject: PaymentPlan) : Mortgage {
    const  mortgage : Mortgage = {
      catagoty : "Principal Payments",
      term : paymentPlanObject.mortgageAmount,
      ammortizationPeriod : paymentPlanObject.mortgageAmount
    }
    return mortgage;
  }

  public calculateInterestPayments(paymentPlanObject: PaymentPlan) : Mortgage {
    const Interest = ((paymentPlanObject.mortgageAmount  * ( 1 +((paymentPlanObject.intrestRate/100) * paymentPlanObject.term) )) -paymentPlanObject.mortgageAmount)
    const  mortgage : Mortgage =  {
      catagoty : "Interest Payments",
      term :  Number(Interest.toFixed(2)),
      ammortizationPeriod : Number(Interest.toFixed(2))
    }
    return mortgage;
  }

  public caliculateTotalCost(paymentPlanObject: PaymentPlan) : Mortgage {
    const  mortgage : Mortgage =  {
      catagoty : "Total Cost",
      term : this.calculatePrincipalPayments(paymentPlanObject).term + this.calculateInterestPayments(paymentPlanObject).term,
      ammortizationPeriod : this.calculatePrincipalPayments(paymentPlanObject).ammortizationPeriod + this.calculateInterestPayments(paymentPlanObject).ammortizationPeriod
    }
    return mortgage;
  }

  public calculateIntresetSavingsPrepaymentPlan(paymentPlanObject: PaymentPlan) : Mortgage {
    const  mortgage : Mortgage =  {
      catagoty : "Interest Savings with Prepayment Plan",
      term : 499.88,
      ammortizationPeriod : 500
    }
    return mortgage;
  }

  public calculateIntresetSavingsNonPrepaymentPlan(paymentPlanObject: PaymentPlan) : Mortgage {
    const  mortgage : Mortgage =  {
      catagoty : "Interest Savings with a Non-Monthly Payment Plan",
      term : 134.88,
      ammortizationPeriod : 456
    }
    return mortgage;
  }

  public calculateTotalSavingsInterest(paymentPlanObject: PaymentPlan) : Mortgage {
    const  mortgage : Mortgage =  {
      catagoty : "Total Savings in Interest",
      term : 2134.88,
      ammortizationPeriod : 1456
    }
    return mortgage;
  }

}
