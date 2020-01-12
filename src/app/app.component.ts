import { Component } from '@angular/core';
import { CurrencyService } from './service/currency.service';
import { CurrencyEnum, CurrencyResponse, CurrencyDto } from './model/currencyModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currencyApp';

  amount: number;
  currencyList: any;
  sourceCurrency: CurrencyEnum;
  targetCurrency: CurrencyEnum;
  enableSubmit: boolean = false;
  exchanged: CurrencyResponse;

  formattedAmout: string;
  formattedExchanged: string;

  constructor(private currencyService: CurrencyService) {
    this.getEnums();
  }

  getEnums() {
    this.currencyService.getCurrencyList().subscribe(data => {
      this.currencyList = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }


  parseSource(value: string) {
    this.sourceCurrency = CurrencyEnum[value];
    this.checkInputsValidation();
  }
  parseTarget(value: string) {
    this.targetCurrency = CurrencyEnum[value];
    this.checkInputsValidation();
  }

  modelChanged(newObj) {
    this.amount = newObj;
    this.checkInputsValidation();
  }

  checkInputsValidation() {

    this.enableSubmit = false;
    if (!!this.amount && !!this.amount.toString() && this.amount.toString().length > 0 && !!this.sourceCurrency && !!this.targetCurrency) {
      this.enableSubmit = true;
    }
  }

  calculateExchange() {
    let currencyDto: CurrencyDto = new CurrencyDto;
    currencyDto.source = this.sourceCurrency;
    currencyDto.target = this.targetCurrency;
    currencyDto.value = this.amount;

    this.currencyService.calculateExchange(currencyDto).subscribe((data: CurrencyResponse) => {
      this.exchanged = data;
      console.log();
      this.formattedAmout = new Intl.NumberFormat('en-IN', { style: 'currency', currency: this.sourceCurrency }).format(this.amount);
      this.formattedExchanged = new Intl.NumberFormat('en-IN', { style: 'currency', currency: this.targetCurrency }).format(this.exchanged.exchangedValue);
      console.log(this.formattedAmout.concat(" is exchanged as " + this.formattedExchanged));
    }, err => {
      console.log(err);
    });
  }

}
