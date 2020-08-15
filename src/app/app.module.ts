import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MortgageCalculatorComponent } from './mortgage-calculator/mortgage-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    MortgageCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MortgageCalculatorComponent]
})
export class AppModule { }
