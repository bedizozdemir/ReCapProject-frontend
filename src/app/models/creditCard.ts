export interface CreditCard{
    creditCardId?:number;
    customerId:number;
    cardOwner:string
    creditCardNumber:string;
    expirationDate:string;
    cVV:string;
}