import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCard';
import { ResponseModel } from 'src/app/models/responseModel';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  customerId:number;
  cardOwner:string;
  creditCardNumber:string;
  expirationDate:string;
  cVV:string;
  creditCard:CreditCard;
  constructor(private creditCardService:CreditCardService, private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  addCreditCard(){
    let creditCard:CreditCard = {
      customerId:this.customerId,
      cardOwner:this.cardOwner,
      creditCardNumber:this.creditCardNumber,
      expirationDate:this.expirationDate,
      cVV:this.cVV,
    };
    this.creditCardService.addCreditCard(creditCard).subscribe(response => {
      this.toastrService.success("Car rental process has been completed successfully");
   });
  }
}
